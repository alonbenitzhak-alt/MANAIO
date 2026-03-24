import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";
import { validateOrigin } from "@/lib/csrf";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export async function POST(req: NextRequest) {
  const originError = validateOrigin(req);
  if (originError) {
    console.error("[welcome] Origin blocked:", req.headers.get("origin"));
    return originError;
  }

  try {
    const { email, name } = await req.json();
    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    console.log("[welcome] Sending welcome email to:", email);
    await sendWelcomeEmail({ email, name: typeof name === "string" ? name.slice(0, 200) : email });
    console.log("[welcome] Welcome email sent successfully");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[welcome] Error:", err);
    return NextResponse.json({ success: false });
  }
}
