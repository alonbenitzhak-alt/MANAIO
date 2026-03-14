import { Resend } from "resend";

const FROM_EMAIL = process.env.FROM_EMAIL || "NESTIGO <noreply@mymanaio.com>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "alon.benitzhak@gmail.com";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  phone: string;
  investment_budget: string;
  property_title?: string;
  message?: string;
}) {
  const resend = getResend();

  // Notify admin about new lead
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `ליד חדש מ-NESTIGO: ${lead.name}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a5f;">ליד חדש התקבל!</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">שם:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">אימייל:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">טלפון:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.phone}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">תקציב:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.investment_budget}</td></tr>
          ${lead.property_title ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">נכס:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.property_title}</td></tr>` : ""}
          ${lead.message ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">הודעה:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.message}</td></tr>` : ""}
        </table>
        <p style="color: #666; margin-top: 20px;">נשלח מ-NESTIGO | <a href="https://mymanaio.com/admin">פאנל ניהול</a></p>
      </div>
    `,
  });

  // Send confirmation to the lead
  await resend.emails.send({
    from: FROM_EMAIL,
    to: lead.email,
    subject: "NESTIGO - קיבלנו את פנייתך!",
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a5f;">שלום ${lead.name},</h2>
        <p>תודה שפנית אלינו! קיבלנו את בקשתך ונחזור אליך בהקדם.</p>
        ${lead.property_title ? `<p>פנייתך לגבי הנכס: <strong>${lead.property_title}</strong></p>` : ""}
        <p>בינתיים, מוזמן/ת לעיין בנכסים נוספים באתר שלנו.</p>
        <a href="https://mymanaio.com/properties" style="display: inline-block; padding: 12px 24px; background-color: #1e3a5f; color: white; text-decoration: none; border-radius: 8px; margin-top: 10px;">צפייה בנכסים</a>
        <p style="color: #666; margin-top: 30px;">בברכה,<br/>צוות NESTIGO</p>
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
    subject: `הודעת צור קשר מ-NESTIGO: ${contact.name}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a5f;">הודעה חדשה מטופס צור קשר</h2>
        <p><strong>שם:</strong> ${contact.name}</p>
        <p><strong>אימייל:</strong> ${contact.email}</p>
        <p><strong>הודעה:</strong></p>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${contact.message}</div>
        <p style="color: #666; margin-top: 20px;">נשלח מ-NESTIGO</p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(user: { email: string; name: string }) {
  const resend = getResend();
  await resend.emails.send({
    from: FROM_EMAIL,
    to: user.email,
    subject: "ברוכים הבאים ל-NESTIGO!",
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a5f;">שלום ${user.name},</h2>
        <p>ברוכים הבאים ל-NESTIGO - פלטפורמת ההשקעות המובילה בנדל"ן בינלאומי!</p>
        <p>עכשיו תוכל/י:</p>
        <ul>
          <li>לעיין בנכסים ביוון, קפריסין, גאורגיה ופורטוגל</li>
          <li>לשמור נכסים למועדפים</li>
          <li>לחשב תשואה צפויה</li>
          <li>ליצור קשר עם סוכנים מקצועיים</li>
        </ul>
        <a href="https://mymanaio.com/properties" style="display: inline-block; padding: 12px 24px; background-color: #1e3a5f; color: white; text-decoration: none; border-radius: 8px; margin-top: 10px;">התחל לגלות נכסים</a>
        <p style="color: #666; margin-top: 30px;">בברכה,<br/>צוות NESTIGO</p>
      </div>
    `,
  });
}
