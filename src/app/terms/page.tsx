"use client";

import { useLanguage } from "@/lib/LanguageContext";
import PageHero from "@/components/PageHero";

export default function TermsPage() {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  return (
    <>
      <PageHero>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            {isHe ? "תנאי שימוש" : "Terms of Service"}
          </h1>
          <p className="text-white/80 mt-2">
            {isHe ? "עדכון אחרון: מרץ 2026" : "Last updated: March 2026"}
          </p>
        </div>
      </PageHero>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray max-w-none space-y-8">
          {isHe ? (
            <>
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. כללי</h2>
                <p className="text-gray-600 leading-relaxed">
                  ברוכים הבאים ל-MANAIO. תנאי שימוש אלה מסדירים את השימוש באתר ובשירותים שלנו. בעצם השימוש באתר, אתם מסכימים לתנאים אלה במלואם. אם אינכם מסכימים, אנא הימנעו משימוש באתר.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. תיאור השירות</h2>
                <p className="text-gray-600 leading-relaxed">
                  MANAIO היא פלטפורמה מקוונת המחברת בין משקיעי נדל&quot;ן ישראלים לבין סוכני נדל&quot;ן בינלאומיים. הפלטפורמה מציגה מידע על נכסים למכירה ומאפשרת יצירת קשר בין הצדדים. MANAIO אינה צד לעסקה ואינה מתווכת עסקאות נדל&quot;ן.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. הרשמה וחשבון</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>עליכם לספק מידע מדויק ועדכני בעת ההרשמה</li>
                  <li>אתם אחראים לשמירה על סודיות הסיסמה שלכם</li>
                  <li>אתם אחראים לכל פעילות המתבצעת תחת החשבון שלכם</li>
                  <li>אנו שומרים על הזכות לסגור חשבונות שמפרים את תנאי השימוש</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. תנאים לסוכנים</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>סוכנים מתחייבים לפרסם מידע מדויק ועדכני על נכסים</li>
                  <li>סוכנים נושאים באחריות הבלעדית לתוכן שהם מפרסמים</li>
                  <li>פניות משקיעים מנוהלות על ידי צוות MANAIO ומועברות לסוכן לפי שיקול דעת MANAIO</li>
                  <li>פרסום מידע מטעה או כוזב עלול לגרום לסגירת החשבון</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. תנאים למשקיעים</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>המידע באתר הוא לצורכי מידע כללי בלבד ואינו מהווה ייעוץ השקעות</li>
                  <li>מומלץ לבצע בדיקת נאותות עצמאית לפני כל השקעה</li>
                  <li>MANAIO אינה אחראית לתוצאות כלכליות של עסקאות שנסגרו</li>
                  <li>נתוני התשואה המוצגים הם הערכות בלבד ואינם מבטיחים תשואה עתידית</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. הגבלת אחריות</h2>
                <p className="text-gray-600 leading-relaxed">
                  MANAIO משמשת כפלטפורמת חיבור בלבד. איננו אחראים ל: דיוק המידע שמפורסם על ידי סוכנים, איכות הנכסים, תוצאות עסקאות, או כל נזק ישיר או עקיף הנובע משימוש בפלטפורמה. השימוש בפלטפורמה הוא על אחריותכם בלבד.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. קניין רוחני</h2>
                <p className="text-gray-600 leading-relaxed">
                  כל התוכן באתר, כולל עיצוב, לוגו, טקסטים וגרפיקה, הם קניינה של MANAIO או של מעניקי הרישיון שלנו. אין לשכפל, להפיץ או להשתמש בתוכן ללא אישור מראש ובכתב.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. שימוש אסור</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>שימוש בבוטים, סקרייפרים או כלים אוטומטיים ללא אישור</li>
                  <li>פרסום תוכן לא חוקי, מטעה או פוגעני</li>
                  <li>ניסיון לגשת לאזורים מוגנים ללא הרשאה</li>
                  <li>שימוש בפלטפורמה לספאם או שליחת הודעות לא רצויות</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. שינויים בתנאים</h2>
                <p className="text-gray-600 leading-relaxed">
                  אנו שומרים על הזכות לעדכן תנאים אלה בכל עת. שינויים מהותיים יפורסמו באתר. המשך השימוש באתר לאחר שינוי מהווה הסכמה לתנאים המעודכנים.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. דין וסמכות שיפוט</h2>
                <p className="text-gray-600 leading-relaxed">
                  תנאים אלה כפופים לחוקי מדינת ישראל. כל מחלוקת תידון בבתי המשפט המוסמכים בתל אביב-יפו.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. יצירת קשר</h2>
                <p className="text-gray-600 leading-relaxed">
                  לשאלות בנוגע לתנאי שימוש אלה:<br />
                  אימייל: <a href="mailto:legal@mymanaio.com" className="text-primary-600 hover:underline">legal@mymanaio.com</a>
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. General</h2>
                <p className="text-gray-600 leading-relaxed">
                  Welcome to MANAIO. These Terms of Service govern your use of our website and services. By using the site, you agree to these terms in full. If you do not agree, please refrain from using the site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  MANAIO is an online platform connecting Israeli real estate investors with international real estate agents. The platform displays property information and facilitates communication between parties. MANAIO is not a party to any transaction and does not broker real estate deals.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Registration and Account</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>You must provide accurate and up-to-date information during registration</li>
                  <li>You are responsible for maintaining the confidentiality of your password</li>
                  <li>You are responsible for all activity under your account</li>
                  <li>We reserve the right to close accounts that violate these terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Agent Terms</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Agents commit to publishing accurate and current property information</li>
                  <li>Agents bear sole responsibility for the content they publish</li>
                  <li>Investor inquiries are managed by the MANAIO team and forwarded to agents at MANAIO's discretion</li>
                  <li>Publishing misleading or false information may result in account closure</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Investor Terms</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Information on the site is for general informational purposes only and does not constitute investment advice</li>
                  <li>Independent due diligence is recommended before any investment</li>
                  <li>MANAIO is not responsible for the financial outcomes of closed transactions</li>
                  <li>Displayed ROI figures are estimates only and do not guarantee future returns</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed">
                  MANAIO serves as a connection platform only. We are not responsible for: accuracy of information published by agents, property quality, transaction outcomes, or any direct or indirect damages arising from use of the platform. Use of the platform is at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
                <p className="text-gray-600 leading-relaxed">
                  All content on the site, including design, logos, text, and graphics, are the property of MANAIO or our licensors. Reproduction, distribution, or use of content without prior written consent is prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Prohibited Use</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Using bots, scrapers, or automated tools without permission</li>
                  <li>Publishing illegal, misleading, or offensive content</li>
                  <li>Attempting to access restricted areas without authorization</li>
                  <li>Using the platform for spam or unsolicited messages</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to update these terms at any time. Material changes will be posted on the site. Continued use of the site after a change constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
                <p className="text-gray-600 leading-relaxed">
                  These terms are governed by the laws of the State of Israel. Any disputes shall be adjudicated by the competent courts in Tel Aviv-Jaffa.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  For questions about these Terms of Service:<br />
                  Email: <a href="mailto:legal@mymanaio.com" className="text-primary-600 hover:underline">legal@mymanaio.com</a>
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
}
