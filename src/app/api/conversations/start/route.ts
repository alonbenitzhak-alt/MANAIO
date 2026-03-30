import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabaseAdmin = createClient(supabaseUrl, serviceKey);

  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  let buyerId: string;
  let agentId: string;

  if (profile.role === "admin") {
    // Admin initiates chat with any user
    const { target_user_id } = await req.json();
    if (!target_user_id) return NextResponse.json({ error: "Missing target_user_id" }, { status: 400 });
    agentId = user.id;
    buyerId = target_user_id;
  } else if (profile.role === "agent") {
    // Agent initiates chat with admin
    const { data: adminProfile } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("role", "admin")
      .limit(1)
      .single();
    if (!adminProfile) return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    agentId = user.id;
    buyerId = adminProfile.id;
  } else {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Check for existing conversation between these two
  const { data: existing } = await supabaseAdmin
    .from("conversations")
    .select("id")
    .eq("buyer_id", buyerId)
    .eq("agent_id", agentId)
    .limit(1)
    .single();

  if (existing) return NextResponse.json({ conversationId: existing.id });

  const { data: conv, error } = await supabaseAdmin
    .from("conversations")
    .insert({ buyer_id: buyerId, agent_id: agentId })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ conversationId: conv.id });
}
