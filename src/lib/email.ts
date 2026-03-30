import { Resend } from "resend";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const FROM_EMAIL = process.env.FROM_EMAIL || "MANAIO <noreply@mymanaio.com>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
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
        <h2 style="color: #1e3a5f;">שלום ${escapeHtml(data.agentName)},</h2>
        <p>יש לך פנייה חדשה מפלטפורמת MANAIO!</p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>שם המשקיע:</strong> ${escapeHtml(data.buyerName)}</p>
          <p style="margin: 4px 0;"><strong>תקציב השקעה:</strong> ${escapeHtml(data.budget)}</p>
          ${data.message ? `<p style="margin: 4px 0;"><strong>הודעה:</strong> ${escapeHtml(data.message)}</p>` : ""}
        </div>
        <p>המשקיע ממתין לך בצ'אט הפנימי. היכנס לפלטפורמה כדי להמשיך את השיחה:</p>
        <a href="${SITE_URL}/dashboard/agent?tab=chats" style="display: inline-block; padding: 14px 28px; background-color: #1e3a5f; color: white; text-decoration: none; border-radius: 10px; margin-top: 12px; font-weight: bold;">כניסה לצ'אט</a>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">הודעה אוטומטית מפלטפורמת MANAIO</p>
      </div>
    `,
  });
}

const SUBJECT_LABELS: Record<string, string> = {
  general: "שאלה כללית",
  property: "שאלה על נכס ספציפי",
  agent: "הצטרפות כסוכן",
  investment: "ייעוץ השקעות",
  technical: "תקלה טכנית",
  other: "אחר",
};

const ROLE_LABELS: Record<string, string> = {
  agent: "סוכן",
  buyer: "משקיע",
  admin: "אדמין",
};

export async function sendContactNotification(contact: {
  name: string;
  email: string;
  message: string;
  subject?: string;
  userRole?: string;
  submissionId?: string;
}) {
  const resend = getResend();
  if (!ADMIN_EMAIL) return;

  const subjectLabel = contact.subject ? (SUBJECT_LABELS[contact.subject] || contact.subject) : "כללי";
  const roleLabel = contact.userRole ? (ROLE_LABELS[contact.userRole] || contact.userRole) : "";
  const adminUrl = `${SITE_URL}/admin?tab=contacts`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `MANAIO - פנייה חדשה${roleLabel ? ` מ${roleLabel}` : ""}: ${escapeHtml(contact.name)}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a5f;">פנייה חדשה התקבלה</h2>
        <div style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
          ${roleLabel ? `<span style="background: #dbeafe; color: #1d4ed8; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: bold;">${roleLabel}</span>` : ""}
          <span style="background: #f1f5f9; color: #475569; padding: 4px 12px; border-radius: 20px; font-size: 13px;">${escapeHtml(subjectLabel)}</span>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>שם:</strong> ${escapeHtml(contact.name)}</p>
          <p style="margin: 4px 0;"><strong>אימייל:</strong> ${escapeHtml(contact.email)}</p>
          <p style="margin: 8px 0 4px;"><strong>הודעה:</strong></p>
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; white-space: pre-wrap;">${escapeHtml(contact.message)}</div>
        </div>
        <a href="${adminUrl}" style="display: inline-block; padding: 12px 22px; background-color: #1e3a5f; color: white; text-decoration: none; border-radius: 10px; font-weight: bold;">📋 טפל בפנייה בפאנל</a>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">הודעה אוטומטית מפלטפורמת MANAIO</p>
      </div>
    `,
  });
}

export async function sendContactReplyToUser(data: {
  userName: string;
  userEmail: string;
  originalMessage: string;
  adminReply: string;
}) {
  const resend = getResend();
  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.userEmail,
    subject: `MANAIO - קיבלת תשובה לפנייתך`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a5f;">שלום ${escapeHtml(data.userName)},</h2>
        <p>צוות MANAIO ענה לפנייתך!</p>

        <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 20px; margin: 16px 0;">
          <p style="margin: 0 0 8px; font-weight: bold; color: #166534;">תשובת הצוות:</p>
          <div style="white-space: pre-wrap; color: #1a1a1a;">${escapeHtml(data.adminReply)}</div>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 16px 0;">
          <p style="margin: 0 0 8px; font-size: 13px; color: #64748b;">פנייתך המקורית:</p>
          <div style="font-size: 13px; color: #64748b; white-space: pre-wrap;">${escapeHtml(data.originalMessage)}</div>
        </div>

        <p style="margin-bottom: 16px;">לשאלות נוספות, ניתן לפנות שוב דרך האזור האישי:</p>
        <a href="${SITE_URL}/contact" style="display: inline-block; padding: 12px 22px; background-color: #1e3a5f; color: white; text-decoration: none; border-radius: 10px; font-weight: bold;">כניסה לאזור האישי</a>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">הודעה אוטומטית מפלטפורמת MANAIO</p>
      </div>
    `,
  });
}

export async function sendAdminLeadNotification(data: {
  name: string;
  email: string;
  phone: string;
  budget: string;
  message?: string | null;
  propertyTitle?: string;
  propertyUrl?: string;
  agentName?: string;
  agentPhone?: string;
}) {
  const resend = getResend();
  if (!ADMIN_EMAIL) return;

  const forwardMessage = [
    `היי ${data.agentName || "סוכן"}, יש ליד חדש עבורך מ-MANAIO!`,
    ``,
    data.propertyTitle ? `נכס: ${data.propertyTitle}` : "",
    `שם המשקיע: ${data.name}`,
    `טלפון: ${data.phone}`,
    `אימייל: ${data.email}`,
    `תקציב: ${data.budget}`,
    data.message ? `הודעה: ${data.message}` : "",
  ].filter(Boolean).join("\n");

  const agentWhatsappUrl = data.agentPhone
    ? `https://wa.me/${data.agentPhone.replace(/\D/g, "")}?text=${encodeURIComponent(forwardMessage)}`
    : null;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `MANAIO - פנייה חדשה: ${escapeHtml(data.name)}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a5f;">פנייה חדשה התקבלה</h2>
        ${data.propertyTitle ? `<p style="color: #64748b;">נכס: <strong>${escapeHtml(data.propertyTitle)}</strong></p>` : ""}
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>שם:</strong> ${escapeHtml(data.name)}</p>
          <p style="margin: 4px 0;"><strong>אימייל:</strong> ${escapeHtml(data.email)}</p>
          <p style="margin: 4px 0;"><strong>טלפון:</strong> ${escapeHtml(data.phone)}</p>
          <p style="margin: 4px 0;"><strong>תקציב:</strong> ${escapeHtml(data.budget)}</p>
          ${data.message ? `<p style="margin: 4px 0;"><strong>הודעה:</strong> ${escapeHtml(data.message)}</p>` : ""}
        </div>
        <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 16px;">
          ${data.propertyUrl ? `<a href="${data.propertyUrl}" style="display: inline-block; padding: 12px 22px; background-color: #1e3a5f; color: white; text-decoration: none; border-radius: 10px; font-weight: bold;">🏠 צפה בנכס</a>` : ""}
          <a href="${SITE_URL}/admin" style="display: inline-block; padding: 12px 22px; background-color: #475569; color: white; text-decoration: none; border-radius: 10px; font-weight: bold;">לפאנל הניהול</a>
        </div>
        ${agentWhatsappUrl ? `
        <div style="margin-top: 20px; padding: 16px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px;">
          <p style="margin: 0 0 10px; font-weight: bold; color: #166534;">העברה לסוכן: ${escapeHtml(data.agentName || "")}</p>
          <a href="${agentWhatsappUrl}" style="display: inline-block; padding: 12px 22px; background-color: #25D366; color: white; text-decoration: none; border-radius: 10px; font-weight: bold;">📲 שלח לסוכן בווטסאפ</a>
        </div>
        ` : ""}
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">הודעה אוטומטית מפלטפורמת MANAIO</p>
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
        <h2 style="color: #1e3a5f;">שלום ${escapeHtml(user.name)},</h2>
        <p>ברוכים הבאים ל-MANAIO - פלטפורמת ההשקעות המובילה בנדל"ן בינלאומי!</p>
        <p>עכשיו תוכל/י:</p>
        <ul>
          <li>לעיין בנכסים ביוון וקפריסין</li>
          <li>לשמור נכסים למועדפים</li>
          <li>לחשב תשואה צפויה</li>
          <li>ליצור קשר עם סוכנים מקצועיים</li>
        </ul>
        <a href="${SITE_URL}/properties" style="display: inline-block; padding: 12px 24px; background-color: #1e3a5f; color: white; text-decoration: none; border-radius: 8px; margin-top: 10px;">התחל לגלות נכסים</a>
        <p style="color: #666; margin-top: 30px;">בברכה,<br/>צוות MANAIO</p>
      </div>
    `,
  });
}

export async function sendAdminChatNotification(data: {
  senderName: string;
  senderEmail: string;
  senderRole: string;
  recipientName: string;
  messageContent: string;
  conversationId: string;
}) {
  const resend = getResend();
  if (!ADMIN_EMAIL) return;

  const adminDashboardUrl = `${SITE_URL}/admin`;
  const roleLabel = ROLE_LABELS[data.senderRole] || data.senderRole;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `MANAIO - הודעה חדשה בצ'אט: ${escapeHtml(data.senderName)}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a5f;">הודעה חדשה בצ'אט הפרטי</h2>
        <div style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
          <span style="background: #dbeafe; color: #1d4ed8; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: bold;">${roleLabel}</span>
          <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 13px;">צ'אט פרטי</span>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>משלח:</strong> ${escapeHtml(data.senderName)}</p>
          <p style="margin: 4px 0;"><strong>אימייל:</strong> ${escapeHtml(data.senderEmail)}</p>
          <p style="margin: 4px 0;"><strong>אל:</strong> ${escapeHtml(data.recipientName)}</p>
          <p style="margin: 8px 0 4px;"><strong>הודעה:</strong></p>
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; white-space: pre-wrap; max-height: 300px; overflow-y: auto;">${escapeHtml(data.messageContent)}</div>
        </div>
        <a href="${adminDashboardUrl}" style="display: inline-block; padding: 12px 22px; background-color: #1e3a5f; color: white; text-decoration: none; border-radius: 10px; font-weight: bold;">📋 לפאנל הניהול</a>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">הודעה אוטומטית מפלטפורמת MANAIO</p>
      </div>
    `,
  });
}
