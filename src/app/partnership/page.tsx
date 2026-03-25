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
              {isHe ? "5. עמלות ותגמול" : "5. Fees and Compensation"}
            </h2>
            <p>
              {isHe
                ? "פרטי העמלות וסכמת התגמול יפורטו במסמך נפרד שיסוכם עם כל סוכן בנפרד בהתאם לתנאים הספציפיים."
                : "Commission details and compensation structure will be detailed in a separate document to be agreed with each agent individually according to specific conditions."}
            </p>
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
              {isHe ? "לשאלות בנוגע להסכם זה, ניתן לפנות אלינו דרך " : "For questions regarding this agreement, reach us via "}
              <a
                href={`https://wa.me/972586836555?text=${encodeURIComponent("שלום, יש לי שאלה בנוגע להסכם השותפות של MANAIO")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 font-semibold hover:underline"
              >
                WhatsApp
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
