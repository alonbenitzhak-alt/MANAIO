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

const FROM_EMAIL = process.env.FROM_EMAIL || "MANAIO <noreply@mymanaio.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mymanaio.com";

export async function POST(req: NextRequest) {
  const originError = validateOrigin(req);
  if (originError) return originError;

  try {
    const { email, name, approved } = await req.json();
    if (!email || typeof email !== "string") return NextResponse.json({ ok: true });
    if (!name || typeof name !== "string") return NextResponse.json({ ok: true });
    const key = process.env.RESEND_API_KEY;
    if (!key) return NextResponse.json({ ok: true });

    const resend = new Resend(key);

    if (approved) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "MANAIO - החשבון שלכם אושר",
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a5f;">שלום ${escapeHtml(name)},</h2>
            <p style="font-size: 18px;">🎉 בקשת ההצטרפות שלכם כסוכן ב-MANAIO <strong>אושרה!</strong></p>
            <p>כעת תוכלו להתחבר ולהתחיל לפרסם נכסים, לקבל לידים ולנהל את הפעילות שלכם בפלטפורמה.</p>
            <a href="${SITE_URL}/dashboard/agent" style="display: inline-block; padding: 14px 28px; background-color: #16a34a; color: white; text-decoration: none; border-radius: 10px; margin-top: 12px; font-weight: bold;">כניסה לדשבורד</a>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">בברכה, צוות MANAIO</p>
          </div>
        `,
      });
    } else {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "MANAIO - עדכון לגבי בקשת ההצטרפות שלכם",
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a5f;">שלום ${escapeHtml(name)},</h2>
            <p>לצערנו, לא הצלחנו לאשר את בקשת ההצטרפות שלכם כסוכן בשלב זה.</p>
            <p>לפרטים נוספים או לשאלות, אנא פנו אלינו:</p>
            <a href="mailto:agents@mymanaio.com" style="color: #1e3a5f; font-weight: bold;">agents@mymanaio.com</a>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">בברכה, צוות MANAIO</p>
          </div>
        `,
      });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
