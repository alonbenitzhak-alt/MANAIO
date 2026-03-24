import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { validateOrigin } from "@/lib/csrf";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL || "MANAIO <noreply@mymanaio.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mymanaio.com";

export async function POST(req: NextRequest) {
  const originError = validateOrigin(req);
  if (originError) {
    console.error("[notify-admin-new-buyer] Origin blocked:", req.headers.get("origin"));
    return originError;
  }

  try {
    const { email, name } = await req.json();
    const key = process.env.RESEND_API_KEY;
    if (!key || !ADMIN_EMAIL) {
      console.error("[notify-admin-new-buyer] Missing env: RESEND_API_KEY=", !!key, "ADMIN_EMAIL=", !!ADMIN_EMAIL);
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(key);
    console.log("[notify-admin-new-buyer] Sending to:", ADMIN_EMAIL, "from:", FROM_EMAIL);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `MANAIO - משקיע חדש נרשם: ${escapeHtml(name)}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">משקיע חדש נרשם לפלטפורמה</h2>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 16px 0;">
            <p style="margin: 4px 0;"><strong>שם:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 4px 0;"><strong>אימייל:</strong> ${escapeHtml(email)}</p>
          </div>
          <a href="${SITE_URL}/admin" style="display: inline-block; padding: 14px 28px; background-color: #1e3a5f; color: white; text-decoration: none; border-radius: 10px; margin-top: 12px; font-weight: bold;">לפאנל הניהול</a>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">הודעה אוטומטית מפלטפורמת MANAIO</p>
        </div>
      `,
    });
    console.log("[notify-admin-new-buyer] Email sent successfully");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[notify-admin-new-buyer] Error:", err);
    return NextResponse.json({ ok: true });
  }
}
