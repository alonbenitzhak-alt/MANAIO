import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function verifyAdmin(req: NextRequest) {
  if (!supabaseServiceKey) return null;
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return null;
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  if (!user) return null;
  const { data: profile } = await supabaseAdmin.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return null;
  return supabaseAdmin;
}

export async function GET(req: NextRequest) {
  const supabaseAdmin = await verifyAdmin(req);
  if (!supabaseAdmin) {
    return NextResponse.json({ error: supabaseServiceKey ? "Unauthorized" : "Service unavailable" }, { status: supabaseServiceKey ? 401 : 503 });
  }

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("id, email, full_name, phone, company, license_url, id_url, partnership_signed, created_at")
    .eq("role", "agent")
    .or("approved.is.null,approved.eq.false")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 });
  return NextResponse.json({ agents: data });
}

export async function PATCH(req: NextRequest) {
  const supabaseAdmin = await verifyAdmin(req);
  if (!supabaseAdmin) {
    return NextResponse.json({ error: supabaseServiceKey ? "Unauthorized" : "Service unavailable" }, { status: supabaseServiceKey ? 401 : 503 });
  }

  const { id, action } = await req.json();
  if (!id || !["approve", "reject"].includes(action)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const update = action === "approve"
    ? { approved: true }
    : { approved: false, role: "buyer" };

  const { error } = await supabaseAdmin.from("profiles").update(update).eq("id", id);
  if (error) return NextResponse.json({ error: "Update failed" }, { status: 500 });

  return NextResponse.json({ success: true });
}
