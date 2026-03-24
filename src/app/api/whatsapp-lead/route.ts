import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { validateOrigin } from "@/lib/csrf";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: NextRequest) {
  const originError = validateOrigin(req);
  if (originError) return originError;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  try {
    const { property_id, property_title, agent_id } = await req.json();

    // Validate UUIDs if provided
    if (agent_id && !uuidRegex.test(agent_id)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, serviceKey);
    await supabase.from("whatsapp_leads").insert({
      property_id: property_id || null,
      property_title: typeof property_title === "string" ? property_title.slice(0, 500) : null,
      agent_id: agent_id || null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
