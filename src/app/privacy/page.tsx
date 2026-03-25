"use client";

import { useLanguage } from "@/lib/LanguageContext";
import PageHero from "@/components/PageHero";

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  return (
    <>
      <PageHero>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            {isHe ? "מדיניות פרטיות" : "Privacy Policy"}
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. מבוא</h2>
                <p className="text-gray-600 leading-relaxed">
                  MANAIO (&quot;אנחנו&quot;, &quot;שלנו&quot;, &quot;החברה&quot;) מחויבת להגן על פרטיותכם. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, מאחסנים ומגנים על המידע האישי שלכם בעת השימוש באתר ובשירותים שלנו.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. מידע שאנו אוספים</h2>
                <p className="text-gray-600 leading-relaxed mb-3">אנו אוספים את סוגי המידע הבאים:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>מידע הרשמה:</strong> שם, כתובת אימייל, מספר טלפון, שם חברה (לסוכנים)</li>
                  <li><strong>פרטי פנייה:</strong> תקציב השקעה, הודעות, העדפות נכסים</li>
                  <li><strong>נתוני שימוש:</strong> עמודים שנצפו, נכסים שנשמרו, פעולות באתר</li>
                  <li><strong>מידע טכני:</strong> כתובת IP, סוג דפדפן, מכשיר</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. כיצד אנו משתמשים במידע</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>מתן השירותים המבוקשים, לרבות חיבור בין משקיעים לסוכנים</li>
                  <li>שליחת עדכונים על נכסים חדשים, שינויי מחירים והתראות רלוונטיות</li>
                  <li>שיפור חוויית המשתמש והשירותים שלנו</li>
                  <li>עמידה בדרישות חוקיות ורגולטוריות</li>
                  <li>מניעת הונאות ושמירה על אבטחת הפלטפורמה</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. שיתוף מידע</h2>
                <p className="text-gray-600 leading-relaxed mb-3">אנו משתפים מידע אישי רק במקרים הבאים:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>צוות MANAIO:</strong> כאשר אתם שולחים פנייה על נכס, הפרטים מועברים לצוות MANAIO בלבד לטיפול ישיר</li>
                  <li><strong>ספקי שירות:</strong> שירותי אחסון (Supabase/Vercel), ניתוח נתונים</li>
                  <li><strong>דרישה חוקית:</strong> כאשר אנו מחויבים לכך על פי דין</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-3">אנו לא מוכרים את המידע האישי שלכם לצדדים שלישיים.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. אבטחת מידע</h2>
                <p className="text-gray-600 leading-relaxed">
                  אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע שלכם, כולל הצפנת נתונים, גישה מבוקרת, וניטור מתמשך. עם זאת, אף שיטת אבטחה אינה מושלמת, ואנו לא יכולים להבטיח אבטחה מוחלטת.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. עוגיות (Cookies)</h2>
                <p className="text-gray-600 leading-relaxed">
                  אנו משתמשים בעוגיות חיוניות לתפעול האתר (אימות, שמירת העדפות שפה). אנו עשויים להשתמש גם בעוגיות ניתוח לשיפור השירות.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. הזכויות שלכם (GDPR)</h2>
                <p className="text-gray-600 leading-relaxed mb-3">על פי תקנת הגנת הנתונים הכללית (GDPR), יש לכם את הזכויות הבאות:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>זכות גישה - לבקש עותק של המידע שאנו מחזיקים עליכם</li>
                  <li>זכות תיקון - לבקש תיקון מידע שגוי</li>
                  <li>זכות מחיקה - לבקש מחיקת המידע שלכם</li>
                  <li>זכות הגבלה - להגביל את עיבוד המידע שלכם</li>
                  <li>זכות ניידות - לקבל את המידע שלכם בפורמט מובנה</li>
                  <li>זכות התנגדות - להתנגד לעיבוד המידע שלכם</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-3">
                  למימוש זכויותיכם, צרו קשר בכתובת: <a href="mailto:privacy@mymanaio.com" className="text-primary-600 hover:underline">privacy@mymanaio.com</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. שמירת מידע</h2>
                <p className="text-gray-600 leading-relaxed">
                  אנו שומרים את המידע שלכם כל עוד החשבון שלכם פעיל או לפי הצורך לספק את השירותים. ניתן לבקש מחיקת חשבון בכל עת.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. שינויים במדיניות</h2>
                <p className="text-gray-600 leading-relaxed">
                  אנו עשויים לעדכן מדיניות זו מעת לעת. שינויים מהותיים יפורסמו באתר ו/או ישלחו באימייל.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. יצירת קשר</h2>
                <p className="text-gray-600 leading-relaxed">
                  לשאלות בנוגע למדיניות פרטיות זו, ניתן לפנות אלינו:<br />
                  אימייל: <a href="mailto:privacy@mymanaio.com" className="text-primary-600 hover:underline">privacy@mymanaio.com</a>
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  MANAIO (&quot;we&quot;, &quot;our&quot;, &quot;the Company&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when using our website and services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Registration data:</strong> Name, email address, phone number, company name (for agents)</li>
                  <li><strong>Inquiry details:</strong> Investment budget, messages, property preferences</li>
                  <li><strong>Usage data:</strong> Pages viewed, saved properties, site actions</li>
                  <li><strong>Technical data:</strong> IP address, browser type, device</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Providing requested services, including connecting investors with agents</li>
                  <li>Sending updates about new properties, price changes, and relevant notifications</li>
                  <li>Improving user experience and our services</li>
                  <li>Complying with legal and regulatory requirements</li>
                  <li>Preventing fraud and maintaining platform security</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
                <p className="text-gray-600 leading-relaxed mb-3">We share personal information only in the following cases:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>MANAIO team:</strong> When you submit an inquiry about a property, your details are passed exclusively to the MANAIO team for direct handling</li>
                  <li><strong>Service providers:</strong> Hosting (Supabase/Vercel), analytics</li>
                  <li><strong>Legal requirements:</strong> When required by law</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-3">We do not sell your personal information to third parties.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-600 leading-relaxed">
                  We implement reasonable security measures to protect your information, including data encryption, controlled access, and ongoing monitoring. However, no security method is perfect, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  We use essential cookies for site operation (authentication, language preferences). We may also use analytics cookies to improve the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights (GDPR)</h2>
                <p className="text-gray-600 leading-relaxed mb-3">Under the General Data Protection Regulation (GDPR), you have the following rights:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Right of access - request a copy of the data we hold about you</li>
                  <li>Right to rectification - request correction of inaccurate data</li>
                  <li>Right to erasure - request deletion of your data</li>
                  <li>Right to restriction - restrict processing of your data</li>
                  <li>Right to portability - receive your data in a structured format</li>
                  <li>Right to object - object to the processing of your data</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-3">
                  To exercise your rights, contact us at: <a href="mailto:privacy@mymanaio.com" className="text-primary-600 hover:underline">privacy@mymanaio.com</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
                <p className="text-gray-600 leading-relaxed">
                  We retain your information as long as your account is active or as needed to provide services. You can request account deletion at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Policy Changes</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this policy from time to time. Material changes will be posted on the site and/or sent by email.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  For questions about this Privacy Policy, contact us:<br />
                  Email: <a href="mailto:privacy@mymanaio.com" className="text-primary-600 hover:underline">privacy@mymanaio.com</a>
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
}
