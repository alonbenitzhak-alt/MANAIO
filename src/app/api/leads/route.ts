import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendLeadNotification } from "@/lib/email";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Simple in-memory rate limiter (per IP, 5 leads per minute)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// Validation helpers
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function sanitize(str: string): string {
  return str.trim().replace(/<[^>]*>/g, "").slice(0, 1000);
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { property_id, name, email, phone, investment_budget, message, buyer_id, agent_id } = body;

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

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase.from("leads").insert({
      property_id: property_id || null,
      name: sanitize(name),
      email: email.trim().toLowerCase(),
      phone: sanitize(phone),
      investment_budget: sanitize(investment_budget),
      message: message ? sanitize(message) : null,
      buyer_id: buyer_id || null,
      agent_id: agent_id || null,
      status: "sent",
    }).select().single();

    if (error) {
      console.error("Lead insert error:", error);
      return NextResponse.json({ error: "Failed to submit lead" }, { status: 500 });
    }

    // Send email notifications (non-blocking)
    if (process.env.RESEND_API_KEY) {
      sendLeadNotification({
        name: sanitize(name),
        email: email.trim().toLowerCase(),
        phone: sanitize(phone),
        investment_budget: sanitize(investment_budget),
        message: message ? sanitize(message) : undefined,
      }).catch((err) => console.error("Email send error:", err));
    }

    return NextResponse.json({ success: true, lead: data });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
