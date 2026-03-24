import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendAgentLeadNotification } from "@/lib/email";
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

  try {
    const body = await request.json();
    const { property_id, name, email, phone, investment_budget, message, buyer_id, agent_id } = body;

    // Validate buyer_id is a valid UUID if provided (prevent injection of arbitrary IDs)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (buyer_id && !uuidRegex.test(buyer_id)) {
      return NextResponse.json({ error: "Invalid buyer_id" }, { status: 400 });
    }
    if (agent_id && !uuidRegex.test(agent_id)) {
      return NextResponse.json({ error: "Invalid agent_id" }, { status: 400 });
    }

    // Validate agent_id actually belongs to the property (prevent lead hijacking)
    if (property_id && agent_id) {
      const { data: propertyRow } = await supabaseAdmin
        .from("properties")
        .select("agent_id")
        .eq("id", property_id)
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
      property_id: property_id || null,
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      investment_budget: sanitizedBudget,
      message: sanitizedMessage,
      buyer_id: buyer_id || null,
      agent_id: agent_id || null,
      ip_address: ip,
      status: "sent",
    }).select().single();

    if (error) {
      console.error("Lead insert error:", error);
      return NextResponse.json({ error: "Failed to submit lead" }, { status: 500 });
    }

    let conversationId: string | null = null;

    // If buyer is logged in and agent exists — create/find conversation + send first message
    if (buyer_id && agent_id && property_id) {
      try {
        // Find or create conversation
        const { data: existing } = await supabase
          .from("conversations")
          .select("id")
          .eq("property_id", property_id)
          .eq("buyer_id", buyer_id)
          .eq("agent_id", agent_id)
          .single();

        if (existing) {
          conversationId = existing.id;
        } else {
          const { data: created } = await supabase
            .from("conversations")
            .insert({ property_id, buyer_id, agent_id })
            .select("id")
            .single();
          if (created) conversationId = created.id;
        }

        // Send first message with lead details
        if (conversationId) {
          const firstMessage = [
            `שלום, אני מתעניין/ת בנכס הזה.`,
            `תקציב השקעה: ${sanitizedBudget}`,
            sanitizedMessage ? `\n${sanitizedMessage}` : "",
          ].filter(Boolean).join("\n");

          await supabase.from("messages").insert({
            conversation_id: conversationId,
            sender_id: buyer_id,
            content: firstMessage,
          });
        }

        // Create in-app notification for the agent
        await supabase.from("notifications").insert({
          user_id: agent_id,
          type: "lead_update",
          title: "ליד חדש התקבל",
          body: `${sanitizedName} מתעניין/ת בנכס שלך (תקציב: ${sanitizedBudget})`,
          link: "/dashboard/agent?tab=leads",
        });
      } catch (err) {
        // Non-critical — lead is already saved, don't fail the request
        console.error("Conversation/notification error:", err);
      }
    }

    // Send email to the AGENT (not admin) — so they know to check the platform
    if (process.env.RESEND_API_KEY && agent_id) {
      // Look up agent email
      const { data: agentProfile } = await supabase
        .from("profiles")
        .select("email, full_name")
        .eq("id", agent_id)
        .single();

      if (agentProfile?.email) {
        sendAgentLeadNotification({
          agentEmail: agentProfile.email,
          agentName: agentProfile.full_name || "סוכן",
          buyerName: sanitizedName,
          budget: sanitizedBudget,
          message: sanitizedMessage || undefined,
        }).catch((err) => console.error("Agent email error:", err));
      }
    }

    return NextResponse.json({
      success: true,
      lead,
      conversationId,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
