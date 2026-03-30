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

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "1. הצדדים להסכם" : "1. Parties to the Agreement"}
            </h2>
            <p>
              {isHe
                ? "הסכם זה נכרת בין MANAIO (mymanaio.com) לבין הסוכן הנדל\"ן הנרשם לפלטפורמה (להלן: \"הסוכן\")."
                : "This agreement is entered into between MANAIO (mymanaio.com) and the real estate agent registering on the platform (hereinafter: \"the Agent\")."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "2. מהות השיתוף" : "2. Nature of the Partnership"}
            </h2>
            <p>
              {isHe
                ? "MANAIO מעמידה לרשות הסוכן פלטפורמה דיגיטלית לשיווק נכסי נדל\"ן בחו\"ל למשקיעים ישראלים. הפלטפורמה כוללת דף נכס מקצועי, חשיפה למשקיעים רשומים, וניהול לידים ממוחשב. הסוכן פועל כגורם עצמאי ואינו עובד של MANAIO."
                : "MANAIO provides the Agent with a digital platform for marketing international real estate to Israeli investors. The platform includes a professional property page, exposure to registered investors, and digital lead management. The Agent operates as an independent party and is not an employee of MANAIO."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "3. תנאי קבלה" : "3. Acceptance Criteria"}
            </h2>
            <ul className="list-disc ps-5 space-y-1">
              <li>{isHe ? "רישיון תיווך בתוקף בישראל או במדינת הנכסים" : "Valid broker license in Israel or in the country of the listed properties"}</li>
              <li>{isHe ? "ניסיון של שנה לפחות בתחום הנדל\"ן" : "At least one year of experience in real estate"}</li>
              <li>{isHe ? "הגשת תעודת זהות ורישיון תיווך לצורך אימות" : "Submission of ID card and broker license for verification"}</li>
              <li>{isHe ? "אישור MANAIO לאחר בדיקת המסמכים" : "MANAIO approval following document review"}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "4. התחייבויות הסוכן" : "4. Agent Obligations"}
            </h2>
            <ul className="list-disc ps-5 space-y-1">
              <li>{isHe ? "פרסום מידע מדויק, מעודכן ואמיתי על הנכסים" : "Publishing accurate, up-to-date and truthful property information"}</li>
              <li>{isHe ? "מענה ללידים שהתקבלו תוך 24 שעות לכל היותר" : "Responding to received leads within 24 hours at most"}</li>
              <li>{isHe ? "שמירה על סודיות מוחלטת של פרטי הלקוחות" : "Maintaining strict confidentiality of client information"}</li>
              <li>{isHe ? "עמידה בדיני הגנת הצרכן, הנדל\"ן והפרטיות החלים" : "Compliance with applicable consumer protection, real estate and privacy laws"}</li>
              <li>{isHe ? "אי העברת לידים לגורמים שלישיים ללא אישור מפורש" : "Not transferring leads to third parties without explicit approval"}</li>
              <li>{isHe ? "עדכון הפלטפורמה בכל שינוי מהותי בנכס (מחיר, זמינות וכד')" : "Updating the platform on any material change to a property (price, availability, etc.)"}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "5. עמלות ותגמול" : "5. Fees and Compensation"}
            </h2>
            <p>
              {isHe
                ? "בשלב ההשקה הנוכחי, גישה לפלטפורמה ולידים ניתנת לסוכנים ללא עלות. MANAIO שומרת על הזכות להציג מודל עמלות מעודכן בהתראה מוקדמת של 30 יום. כל שינוי במודל יחול רק על לידים שיתקבלו לאחר מועד ההודעה."
                : "During the current launch phase, platform access and leads are provided to agents at no cost. MANAIO reserves the right to introduce an updated fee model with 30 days' prior notice. Any model change will apply only to leads received after the notice date."}
            </p>
            <p className="mt-3">
              {isHe
                ? "אישור התנאים מהווה הסכמה בזאת כי החברה MANAIO אינה אחראית לתוצאות כלכליות כלשהן מהשימוש בפלטפורמה או מהעסקאות שתוצאתן. הסוכן מושתק מלטעון כל טענה שהיא כלפי החברה בקשר להפסדים כלכליים, הכנסות שלא התממשו או כל נזק כלכלי אחר."
                : "Acceptance of these terms constitutes an agreement that MANAIO is not responsible for any economic or financial results from the use of the platform or transactions conducted. The Agent waives any and all claims against the Company regarding financial losses, lost income, or any other economic damage."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "6. אחריות ואי-תחרות" : "6. Liability and Non-Competition"}
            </h2>
            <p>
              {isHe
                ? "MANAIO אינה אחראית לתוצאות עסקאות שנעשו בין הסוכן ללקוחות. הסוכן מצהיר כי הנכסים שיפרסם הם חוקיים ושיש לו הרשאה לשווקם. הסוכן מתחייב שלא ליצור קשר ישיר עם לקוחות הפלטפורמה לצרכי שיווק מחוץ לפלטפורמה."
                : "MANAIO is not responsible for the outcomes of transactions between the Agent and clients. The Agent declares that the properties they list are legal and that they are authorized to market them. The Agent undertakes not to contact platform clients directly for marketing purposes outside the platform."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "7. סיום ההתקשרות" : "7. Termination"}
            </h2>
            <p>
              {isHe
                ? "כל צד רשאי לסיים את ההסכם בהודעה מוקדמת של 30 יום. MANAIO רשאית להשעות או לסגור חשבון סוכן באופן מידי במקרה של הפרת תנאי ההסכם, פרסום מידע כוזב, או פגיעה בלקוחות הפלטפורמה."
                : "Either party may terminate the agreement with 30 days' written notice. MANAIO may immediately suspend or close an agent account in cases of breach of agreement terms, publication of false information, or harm to platform clients."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "8. סמכות משפטית" : "8. Legal Jurisdiction"}
            </h2>
            <p>
              {isHe
                ? "במקרה של הפרה של הסכם זה, מסוכם בזה כי הסמכות המשפטית המקומית נתונה לבית המשפט השלום או בית המשפט המחוזי בתל אביב (לפי עניין)."
                : "In case of breach of this agreement, it is agreed that the local legal jurisdiction shall be with the District Court or Labor Court in Tel Aviv (as applicable)."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "9. דין החל" : "9. Governing Law"}
            </h2>
            <p>
              {isHe
                ? "הסכם זה כפוף לדיני מדינת ישראל."
                : "This agreement is governed by the laws of the State of Israel."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "10. יצירת קשר" : "10. Contact"}
            </h2>
            <p>
              {isHe ? "לשאלות בנוגע להסכם זה ניתן לפנות אלינו בוואצאפ:" : "For questions regarding this agreement, contact us on WhatsApp:"}
              {" "}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "972586836555"}?text=${encodeURIComponent(isHe ? "היי, יש לי שאלה לגבי הסכם השותפות" : "Hi, I have a question about the partnership agreement")}`}
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
