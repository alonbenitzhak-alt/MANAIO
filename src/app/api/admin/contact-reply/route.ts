import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendContactReplyToUser } from "@/lib/email";
import { validateOrigin } from "@/lib/csrf";

function sanitize(str: string): string {
  return str.trim().replace(/<[^>]*>/g, "").slice(0, 5000);
}

export async function POST(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Verify caller is admin
  const cookieHeader = request.headers.get("cookie") || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { cookie: cookieHeader } },
  });
  const { data: { user } } = await userClient.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { submission_id, reply, close } = await request.json();

    if (!submission_id || typeof submission_id !== "string") {
      return NextResponse.json({ error: "submission_id required" }, { status: 400 });
    }
    if (!reply || typeof reply !== "string" || reply.trim().length < 2) {
      return NextResponse.json({ error: "תשובה קצרה מדי" }, { status: 400 });
    }

    const sanitizedReply = sanitize(reply);

    // Fetch the submission
    const { data: submission } = await supabase
      .from("contact_submissions")
      .select("*")
      .eq("id", submission_id)
      .single();

    if (!submission) return NextResponse.json({ error: "Submission not found" }, { status: 404 });

    // Update submission with reply and optionally close it
    await supabase.from("contact_submissions").update({
      admin_reply: sanitizedReply,
      replied_at: new Date().toISOString(),
      ...(close ? { status: "closed" } : {}),
    }).eq("id", submission_id);

    // Send reply email to user
    if (process.env.RESEND_API_KEY) {
      sendContactReplyToUser({
        userName: submission.name,
        userEmail: submission.email,
        originalMessage: submission.message,
        adminReply: sanitizedReply,
      }).catch((err) => console.error("Contact reply email error:", err));
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const cookieHeader = request.headers.get("cookie") || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { cookie: cookieHeader } },
  });
  const { data: { user } } = await userClient.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { submission_id, status } = await request.json();
    if (!submission_id || !["open", "closed"].includes(status)) {
      return NextResponse.json({ error: "Invalid params" }, { status: 400 });
    }
    await supabase.from("contact_submissions").update({ status }).eq("id", submission_id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
