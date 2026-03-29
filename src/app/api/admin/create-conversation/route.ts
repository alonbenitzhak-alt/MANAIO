import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  // Verify admin
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { buyer_id, submission_id } = await request.json();
  if (!buyer_id || !submission_id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Check if submission already has a conversation
  const { data: existing } = await supabaseAdmin
    .from("contact_submissions")
    .select("conversation_id")
    .eq("id", submission_id)
    .single();

  if (existing?.conversation_id) {
    return NextResponse.json({ conversationId: existing.conversation_id });
  }

  // Create conversation — service role bypasses RLS, property_id optional
  const insertPayload: Record<string, string> = {
    buyer_id,
    agent_id: user.id,
  };

  const { data: conv, error } = await supabaseAdmin
    .from("conversations")
    .insert(insertPayload)
    .select()
    .single();

  if (error) {
    console.error("Create conversation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Link conversation to contact_submission
  await supabaseAdmin
    .from("contact_submissions")
    .update({ conversation_id: conv.id })
    .eq("id", submission_id);

  return NextResponse.json({ conversationId: conv.id });
}
