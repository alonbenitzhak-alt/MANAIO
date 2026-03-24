"use client";

import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

export default function PartnershipPage() {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
        <div className="mb-8 text-center">
          <img src="/logo.svg" alt="MANAIO" className="h-12 w-auto mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900">
            {isHe ? "הסכם שותפות — סוכן נדל\"ן" : "Partnership Agreement — Real Estate Agent"}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            {isHe ? "גרסה 1.0 | בתוקף מ-1 בינואר 2025" : "Version 1.0 | Effective January 1, 2025"}
          </p>
        </div>

        <div dir={isHe ? "rtl" : "ltr"} className="prose prose-sm max-w-none text-gray-700 space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            {isHe
              ? "מסמך זה נמצא בעריכה סופית. הנוסח המחייב יפורסם בקרוב. הגשת בקשת הצטרפות מהווה הסכמה לעקרונות המפורטים להלן."
              : "This document is under final review. The binding version will be published shortly. Submitting a registration application constitutes agreement to the principles outlined below."}
          </div>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "1. הצדדים להסכם" : "1. Parties to the Agreement"}
            </h2>
            <p>
              {isHe
                ? "הסכם זה נכרת בין חברת MANAIO (להלן: \"החברה\") לבין הסוכן הנדל\"ן הנרשם לפלטפורמה (להלן: \"הסוכן\")."
                : "This agreement is entered into between MANAIO (hereinafter: \"the Company\") and the real estate agent registering on the platform (hereinafter: \"the Agent\")."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "2. מהות השיתוף" : "2. Nature of the Partnership"}
            </h2>
            <p>
              {isHe
                ? "החברה מעמידה לרשות הסוכן פלטפורמה דיגיטלית לשיווק נכסי נדל\"ן בחו\"ל למשקיעים ישראלים. הסוכן מתחייב לפעול בהתאם לכללי האתיקה המקצועית ולדרישות הרגולציה הרלוונטיות."
                : "The Company provides the Agent with a digital platform for marketing international real estate properties to Israeli investors. The Agent undertakes to act in accordance with professional ethics and applicable regulatory requirements."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "3. תנאי קבלה" : "3. Acceptance Criteria"}
            </h2>
            <ul className="list-disc ps-5 space-y-1">
              <li>{isHe ? "רישיון תיווך בתוקף בישראל או במדינת המוצא" : "Valid broker license in Israel or country of origin"}</li>
              <li>{isHe ? "ניסיון של שנה לפחות בתחום הנדל\"ן" : "At least one year of experience in real estate"}</li>
              <li>{isHe ? "אישור בדיקת רקע על ידי MANAIO" : "Background check approval by MANAIO"}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "4. התחייבויות הסוכן" : "4. Agent Obligations"}
            </h2>
            <ul className="list-disc ps-5 space-y-1">
              <li>{isHe ? "פרסום מידע מדויק ומעודכן על הנכסים" : "Publishing accurate and up-to-date property information"}</li>
              <li>{isHe ? "מענה ללידים תוך 24 שעות" : "Responding to leads within 24 hours"}</li>
              <li>{isHe ? "שמירה על סודיות פרטי הלקוחות" : "Maintaining client data confidentiality"}</li>
              <li>{isHe ? "עמידה בדיני הגנת הצרכן והנדל\"ן החלים" : "Compliance with applicable consumer protection and real estate laws"}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "5. לידים, עמלות ותגמול" : "5. Leads, Fees and Compensation"}
            </h2>

            <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">
              {isHe ? "5.1 לידים — ללא עלות" : "5.1 Leads — At No Cost"}
            </h3>
            <p>
              {isHe
                ? "החברה מעבירה לסוכן לידים (פניות רוכשים פוטנציאליים) ללא כל תשלום מראש. הסוכן אינו משלם עבור קבלת ליד, ואינו מחויב בדמי מינוי, עמלת פרסום או כל תשלום אחר בגין עצם הפניה."
                : "The Company forwards leads (inquiries from potential buyers) to the Agent at no upfront cost. The Agent pays nothing to receive a lead and is not subject to subscription fees, listing fees, or any other payment for the referral itself."}
            </p>
            <ul className="list-disc ps-5 space-y-1 mt-2 text-sm">
              <li>
                {isHe
                  ? "לידים מועברים ישירות למייל ו/או וואטסאפ של הסוכן בזמן אמת."
                  : "Leads are delivered directly to the Agent's email and/or WhatsApp in real time."}
              </li>
              <li>
                {isHe
                  ? "הסוכן מתחייב להשיב לכל ליד תוך 24 שעות לכל היותר."
                  : "The Agent commits to responding to every lead within a maximum of 24 hours."}
              </li>
              <li>
                {isHe
                  ? "לידים שלא טופלו תוך 48 שעות עשויים להועבר לסוכן אחר לפי שיקול דעת החברה."
                  : "Leads not handled within 48 hours may be reassigned to another agent at the Company's discretion."}
              </li>
            </ul>

            <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">
              {isHe ? "5.2 עמלת הצלחה — 10% מעמלת המתווך" : "5.2 Success Fee — 10% of Agent Commission"}
            </h3>
            <p>
              {isHe
                ? "במקרה של סגירת עסקה שמקורה בליד שהועבר על ידי MANAIO, תגבה החברה עמלת הצלחה בשיעור של 10% (עשרה אחוזים) מתוך עמלת התיווך שגבה הסוכן מהלקוח — ולא מהרוכש."
                : "In the event of a deal closing that originated from a lead forwarded by MANAIO, the Company will charge a success fee of 10% (ten percent) of the brokerage commission received by the Agent from the client — and not from the buyer."}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-3 text-sm text-blue-800">
              <strong>{isHe ? "דוגמה מספרית:" : "Numerical example:"}</strong>{" "}
              {isHe
                ? "נכס נמכר ב-€200,000. עמלת הסוכן היא 3% = €6,000. עמלת MANAIO: 10% מ-€6,000 = €600 בלבד. הסוכן שומר על €5,400."
                : "A property sells for €200,000. The agent's commission is 3% = €6,000. MANAIO's fee: 10% of €6,000 = €600 only. The agent retains €5,400."}
            </div>
            <ul className="list-disc ps-5 space-y-1 mt-3 text-sm">
              <li>
                {isHe
                  ? "העמלה משולמת לחברה תוך 14 יום מיום קבלת התשלום המלא מהלקוח."
                  : "The fee is paid to the Company within 14 days of receiving full payment from the client."}
              </li>
              <li>
                {isHe
                  ? "הסוכן מחויב לדווח לחברה על כל עסקה שנסגרה שמקורה בליד מ-MANAIO."
                  : "The Agent is obligated to report to the Company every closed deal that originated from a MANAIO lead."}
              </li>
              <li>
                {isHe
                  ? "אי-דיווח על עסקה שנסגרה מהווה הפרה יסודית של הסכם זה."
                  : "Failure to report a closed deal constitutes a material breach of this agreement."}
              </li>
              <li>
                {isHe
                  ? "אין עמלה על עסקאות שלא נסגרו, ללא קשר למספר הלידים שנמסרו."
                  : "No fee is charged on deals that did not close, regardless of the number of leads delivered."}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "6. סיום ההתקשרות" : "6. Termination"}
            </h2>
            <p>
              {isHe
                ? "כל צד רשאי לסיים את ההסכם בהודעה מוקדמת של 30 יום. החברה רשאית להשעות או לבטל חשבון סוכן באופן מידי במקרה של הפרת תנאי ההסכם."
                : "Either party may terminate the agreement with 30 days' notice. The Company may immediately suspend or terminate an agent account in case of breach of agreement terms."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "7. דין החל" : "7. Governing Law"}
            </h2>
            <p>
              {isHe
                ? "הסכם זה כפוף לדיני מדינת ישראל. כל סכסוך יובא לפני בתי המשפט המוסמכים בתל אביב."
                : "This agreement is governed by the laws of the State of Israel. Any dispute shall be brought before the competent courts in Tel Aviv."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "8. יצירת קשר" : "8. Contact"}
            </h2>
            <p>
              {isHe ? "לשאלות בנוגע להסכם זה:" : "For questions regarding this agreement:"}
              {" "}
              <a href="mailto:agents@mymanaio.com" className="text-primary-600 font-semibold hover:underline">
                agents@mymanaio.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <Link
            href="/register/agent"
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors"
          >
            {isHe ? "חזרה להרשמה" : "Back to Registration"}
          </Link>
        </div>
      </div>
    </div>
  );
}
