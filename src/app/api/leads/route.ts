import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendAdminLeadNotification } from "@/lib/email";
import { validateOrigin } from "@/lib/csrf";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseServiceKey) {
  console.error("SUPABASE_SERVICE_ROLE_KEY is not set — leads API will not function");
}

const RATE_LIMIT = 5;
const RATE_WINDOW_SEC = 60;

// Validation helpers
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function sanitize(str: string): string {
  return str.trim().replace(/<[^>]*>/g, "").slice(0, 1000);
}

export async function POST(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  if (!supabaseServiceKey) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // DB-based rate limiting (works across serverless instances)
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  const windowStart = new Date(Date.now() - RATE_WINDOW_SEC * 1000).toISOString();
  const { count } = await supabaseAdmin
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", windowStart);
  if ((count ?? 0) >= RATE_LIMIT) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Optional auth — if Bearer token provided, pull name/email from profile
  let profileName: string | null = null;
  let profileEmail: string | null = null;
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (token) {
    const { data: { user: authUser } } = await supabaseAdmin.auth.getUser(token);
    if (authUser) {
      const { data: prof } = await supabaseAdmin
        .from("profiles")
        .select("full_name, email")
        .eq("id", authUser.id)
        .single();
      profileName = prof?.full_name || authUser.email || null;
      profileEmail = prof?.email || authUser.email || null;
    }
  }

  try {
    const body = await request.json();
    const { property_id, name: bodyName, email: bodyEmail, phone, investment_budget, message, buyer_id, agent_id } = body;

    // Use profile data if available (authenticated), else fall back to body
    const name = profileName || bodyName;
    const email = profileEmail || bodyEmail;

    // Validate buyer_id is a valid UUID if provided (prevent injection of arbitrary IDs)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (buyer_id && !uuidRegex.test(buyer_id)) {
      return NextResponse.json({ error: "Invalid buyer_id" }, { status: 400 });
    }
    if (agent_id && !uuidRegex.test(agent_id)) {
      return NextResponse.json({ error: "Invalid agent_id" }, { status: 400 });
    }
    // If property_id is not a valid UUID (e.g. demo property "1"), treat as null
    const safePropertyId = property_id && uuidRegex.test(property_id) ? property_id : null;

    // Validate agent_id actually belongs to the property (prevent lead hijacking)
    if (safePropertyId && agent_id) {
      const { data: propertyRow } = await supabaseAdmin
        .from("properties")
        .select("agent_id")
        .eq("id", safePropertyId)
        .single();
      if (propertyRow && propertyRow.agent_id !== agent_id) {
        return NextResponse.json({ error: "Invalid agent_id for this property" }, { status: 400 });
      }
    }

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name is required (min 2 characters)" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
      return NextResponse.json({ error: "Valid phone number is required" }, { status: 400 });
    }
    if (!investment_budget || typeof investment_budget !== "string") {
      return NextResponse.json({ error: "Investment budget is required" }, { status: 400 });
    }

    const supabase = supabaseAdmin;

    const sanitizedName = sanitize(name);
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = sanitize(phone);
    const sanitizedBudget = sanitize(investment_budget);
    const sanitizedMessage = message ? sanitize(message) : null;

    // Save lead to DB (always — admin sees all leads in panel)
    const { data: lead, error } = await supabase.from("leads").insert({
      property_id: safePropertyId,
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      investment_budget: sanitizedBudget,
      message: sanitizedMessage,
      buyer_id: buyer_id || null,
      agent_id: agent_id || null,
      status: "sent",
    }).select().single();

    if (error) {
      console.error("Lead insert error:", error);
      return NextResponse.json({ error: "Failed to submit lead" }, { status: 500 });
    }

    // Store ip_address separately — non-critical, column may not exist in all environments
    if (ip !== "unknown") {
      try { await supabase.from("leads").update({ ip_address: ip }).eq("id", lead.id); } catch {}
    }

    // Notify admin by email
    if (process.env.RESEND_API_KEY) {
      let propertyTitle: string | undefined;
      let propertyUrl: string | undefined;
      if (safePropertyId) {
        const { data: prop } = await supabase.from("properties").select("title").eq("id", safePropertyId).single();
        if (prop?.title) propertyTitle = prop.title;
        propertyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/properties/${safePropertyId}`;
      }
      let agentName: string | undefined;
      let agentPhone: string | undefined;
      if (lead.agent_id) {
        const { data: agentProfile } = await supabase
          .from("profiles")
          .select("full_name, phone")
          .eq("id", lead.agent_id)
          .single();
        if (agentProfile) {
          agentName = agentProfile.full_name;
          agentPhone = agentProfile.phone;
        }
      }
      sendAdminLeadNotification({
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        budget: sanitizedBudget,
        message: sanitizedMessage,
        propertyTitle,
        propertyUrl,
        agentName,
        agentPhone,
      }).catch((err) => console.error("Admin lead email error:", err));
    }

    return NextResponse.json({ success: true, lead });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
