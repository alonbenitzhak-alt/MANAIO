import { Resend } from "resend";

const FROM_EMAIL = process.env.FROM_EMAIL || "MANAIO <noreply@mymanaio.com>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "alon.benitzhak@gmail.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mymanaio.com";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

// Notify the AGENT (not admin) about a new lead — directs them to the platform
export async function sendAgentLeadNotification(data: {
  agentEmail: string;
  agentName: string;
  buyerName: string;
  budget: string;
  message?: string;
}) {
  const resend = getResend();

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.agentEmail,
    subject: `MANAIO - ליד חדש: ${data.buyerName}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a5f;">שלום ${data.agentName},</h2>
        <p>יש לך פנייה חדשה מפלטפורמת MANAIO!</p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>שם המשקיע:</strong> ${data.buyerName}</p>
          <p style="margin: 4px 0;"><strong>תקציב השקעה:</strong> ${data.budget}</p>
          ${data.message ? `<p style="margin: 4px 0;"><strong>הודעה:</strong> ${data.message}</p>` : ""}
        </div>
        <p>המשקיע ממתין לך בצ'אט הפנימי. היכנס לפלטפורמה כדי להמשיך את השיחה:</p>
        <a href="${SITE_URL}/dashboard/agent?tab=chats" style="display: inline-block; padding: 14px 28px; background-color: #1e3a5f; color: white; text-decoration: none; border-radius: 10px; margin-top: 12px; font-weight: bold;">כניסה לצ'אט</a>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">הודעה אוטומטית מפלטפורמת MANAIO</p>
      </div>
    `,
  });
}

export async function sendContactNotification(contact: {
  name: string;
  email: string;
  message: string;
}) {
  const resend = getResend();
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `הודעת צור קשר מ-MANAIO: ${contact.name}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a5f;">הודעה חדשה מטופס צור קשר</h2>
        <p><strong>שם:</strong> ${contact.name}</p>
        <p><strong>אימייל:</strong> ${contact.email}</p>
        <p><strong>הודעה:</strong></p>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${contact.message}</div>
        <p style="color: #666; margin-top: 20px;">נשלח מ-MANAIO</p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(user: { email: string; name: string }) {
  const resend = getResend();
  await resend.emails.send({
    from: FROM_EMAIL,
    to: user.email,
    subject: "ברוכים הבאים ל-MANAIO!",
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a5f;">שלום ${user.name},</h2>
        <p>ברוכים הבאים ל-MANAIO - פלטפורמת ההשקעות המובילה בנדל"ן בינלאומי!</p>
        <p>עכשיו תוכל/י:</p>
        <ul>
          <li>לעיין בנכסים ביוון, קפריסין, גאורגיה ופורטוגל</li>
          <li>לשמור נכסים למועדפים</li>
          <li>לחשב תשואה צפויה</li>
          <li>ליצור קשר עם סוכנים מקצועיים</li>
        </ul>
        <a href="https://mymanaio.com/properties" style="display: inline-block; padding: 12px 24px; background-color: #1e3a5f; color: white; text-decoration: none; border-radius: 8px; margin-top: 10px;">התחל לגלות נכסים</a>
        <p style="color: #666; margin-top: 30px;">בברכה,<br/>צוות MANAIO</p>
      </div>
    `,
  });
}
