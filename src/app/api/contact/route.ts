import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { sendContactNotification } from "@/lib/email";
import { validateOrigin } from "@/lib/csrf";

function sanitize(str: string): string {
  return str.trim().replace(/<[^>]*>/g, "").slice(0, 2000);
}

const VALID_SUBJECTS = ["general", "property", "agent", "investment", "technical", "other"];

export async function POST(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  // Require authenticated user
  const authHeader = request.headers.get("authorization") || request.headers.get("x-supabase-auth");
  const cookieHeader = request.headers.get("cookie") || "";
  const supabaseUserClient = createSupabaseClient(
    supabaseUrl,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    { global: { headers: { cookie: cookieHeader, ...(authHeader ? { authorization: authHeader } : {}) } } }
  );
  const { data: { user } } = await supabaseUserClient.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  // Fetch user profile for name, email, role
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("full_name, email, role")
    .eq("id", user.id)
    .single();

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Rate limit: 3 per minute per user
  const windowStart = new Date(Date.now() - 60_000).toISOString();
  const { count } = await supabaseAdmin
    .from("contact_submissions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", windowStart);
  if ((count ?? 0) >= 3) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { subject, message } = body;

    if (!subject || !VALID_SUBJECTS.includes(subject)) {
      return NextResponse.json({ error: "נושא הפנייה חסר" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "ההודעה קצרה מדי (מינימום 10 תווים)" }, { status: 400 });
    }

    const sanitizedMessage = sanitize(message);
    const sanitizedSubject = sanitize(subject);
    const userName = profile?.full_name || user.email || "משתמש";
    const userEmail = profile?.email || user.email || "";
    const userRole = profile?.role || "buyer";

    const { data: submission, error } = await supabaseAdmin.from("contact_submissions").insert({
      name: userName,
      email: userEmail,
      message: sanitizedMessage,
      subject: sanitizedSubject,
      user_id: user.id,
      user_role: userRole,
      status: "open",
      ip_address: ip,
    }).select().single();

    if (error) {
      console.error("Contact insert error:", error);
      return NextResponse.json({ error: "שגיאה בשמירת הפנייה" }, { status: 500 });
    }

    // Notify admin by email
    if (process.env.RESEND_API_KEY) {
      sendContactNotification({
        name: userName,
        email: userEmail,
        message: sanitizedMessage,
        subject: sanitizedSubject,
        userRole,
        submissionId: submission.id,
      }).catch((err) => console.error("Contact email error:", err));
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
