"use client";

import Link from "next/link";
import { useState } from "react";

const FOUNDING_SPOTS_LEFT = 12;

export default function AgentsLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const benefits = [
    {
      icon: "🇮🇱",
      title: "קהל ישראלי מוכן לקנות",
      desc: "ישראלים מחפשים נדל\"ן באירופה בקצב שיא. MANAIO מביאה אותם ישירות אליך — בעברית, עם הסבר, עם בקשה ספציפית.",
    },
    {
      icon: "🤖",
      title: "AI שעובד בשמך 24/7",
      desc: "עוזר חכם עונה ללקוחות שלך בעברית גם בשעה 2 לפנות בוקר. הלקוח מקבל מענה, אתה מקבל ליד חם.",
    },
    {
      icon: "💬",
      title: "תקשורת ישירה בפלטפורמה",
      desc: "צ'אט חי בין קונה לסוכן. הלקוח שואל, אתה עונה. בלי אימיילים אבודים, בלי WhatsApp שמתבלגן.",
    },
    {
      icon: "📊",
      title: "ניהול לידים מסודר",
      desc: "כל פנייה מתועדת עם שם, תקציב, סטטוס. תדע בדיוק איפה כל לקוח בתהליך.",
    },
    {
      icon: "🌍",
      title: "נוכחות בינלאומית",
      desc: "הנכסים שלך מוצגים בעברית, אנגלית, יוונית, רוסית וערבית — אוטומטית.",
    },
    {
      icon: "📱",
      title: "WhatsApp מובנה",
      desc: "כפתור WhatsApp על כל נכס עם הודעה מוכנה. לקוח לוחץ — אתה מקבל פנייה ישירה.",
    },
  ];

  const steps = [
    { num: "01", title: "נרשם בחינם", desc: "יוצר פרופיל סוכן, מעלה רישיון ואישור זהות. תהליך אישור תוך 48 שעות." },
    { num: "02", title: "מעלה נכסים", desc: "מוסיף תמונות, מחיר, ROI, פרטים. המערכת מתרגמת לעברית אוטומטית." },
    { num: "03", title: "מקבל לידים", desc: "משקיעים ישראלים פונים ישירות אליך. אתה מנהל, עונה, סוגר עסקה." },
    { num: "04", title: "משלם רק על עסקה", desc: "עמלה לפלטפורמה רק כשנסגרה עסקה. לא לפני." },
  ];

  const faqs = [
    {
      q: "כמה עולה הצטרפות?",
      a: "אפס. ההרשמה, הפרופיל, העלאת נכסים, וניהול לידים — הכל חינם. אנחנו לוקחים 10% מהעמלה שלך רק כשנסגרת עסקה שהגיעה מהפלטפורמה.",
    },
    {
      q: "איך אתם יודעים שנסגרה עסקה?",
      a: "על בסיס אמון. אנחנו עובדים עם סוכנים מקצועיים שמבינים שהתמשכות ארוכת טווח בפלטפורמה שווה הרבה יותר ממניעת עמלה אחת. בעתיד נוסיף מנגנון דיווח מסודר.",
    },
    {
      q: "מאיפה מגיעים הלקוחות?",
      a: "ישראלים שמחפשים ספציפית השקעות נדל\"ן בחו\"ל. לא גולשים אקראיים — אנשים שנכנסו למחשבון ROI, ביקרו בדף מדינה, ומעוניינים לקנות.",
    },
    {
      q: "האם צריך רישיון ישראלי?",
      a: "לא. אנחנו עובדים עם סוכנים מקומיים ביוון, קפריסין, גאורגיה ופורטוגל עם רישיון תקף במדינתם.",
    },
    {
      q: "מה המשמעות של 'שותף מייסד'?",
      a: "15 הסוכנים הראשונים שנרשמים נועלים את תנאי העמלה 10% לתמיד. כשהפלטפורמה תגדל ותנאים ישתנו — אתה נשאר על 10%.",
    },
    {
      q: "כמה נכסים אפשר להעלות?",
      a: "אין הגבלה. שותפי מייסדים יכולים להעלות כמה נכסים שרוצים ללא תשלום.",
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-white font-sans">

      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-primary-950 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1600&h=900&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-sm font-semibold px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            נותרו {FOUNDING_SPOTS_LEFT} מקומות לשותפי מייסדים
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            הצג את הנכסים שלך<br />
            <span className="text-primary-400">לאלפי משקיעים ישראלים</span>
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            MANAIO היא הפלטפורמה הישראלית הראשונה להשקעות נדל"ן בחו"ל.
            הצטרף חינם. שלם רק כשסגרת עסקה.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register/agent"
              className="bg-primary-500 hover:bg-primary-400 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all shadow-lg shadow-primary-900/40"
            >
              הצטרף עכשיו — בחינם
            </Link>
            <a
              href="#how-it-works"
              className="border border-white/30 hover:border-white/60 text-white font-semibold text-lg px-10 py-4 rounded-xl transition-all"
            >
              איך זה עובד?
            </a>
          </div>

          <p className="mt-6 text-white/40 text-sm">ללא כרטיס אשראי · ללא התחייבות חודשית</p>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section className="bg-primary-600 text-white py-5">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-8 text-center text-sm font-medium">
          <div>🏘️ <span className="font-bold">4 מדינות</span> — יוון, קפריסין, גאורגיה, פורטוגל</div>
          <div>🇮🇱 <span className="font-bold">קהל ישראלי</span> ממוקד ואיכותי</div>
          <div>🔒 <span className="font-bold">ללא עלות חודשית</span> — שלם רק על עסקה</div>
          <div>⚡ <span className="font-bold">אישור תוך 48 שעות</span></div>
        </div>
      </section>

      {/* ─── THE DEAL ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            המודל הכי הוגן שיש
          </h2>
          <p className="text-gray-500 text-lg mb-14 max-w-xl mx-auto">
            אנחנו מרוויחים רק כשאתה מרוויח. כך פשוט.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="text-4xl font-black text-gray-900 mb-2">₪0</div>
              <div className="font-bold text-gray-700 mb-2">הצטרפות ופרופיל</div>
              <div className="text-sm text-gray-400">הרשמה, בניית פרופיל, העלאת נכסים</div>
            </div>
            <div className="bg-primary-600 text-white rounded-2xl p-8 shadow-xl shadow-primary-200 scale-105">
              <div className="text-4xl font-black mb-2">10%</div>
              <div className="font-bold mb-2">מהעמלה שלך</div>
              <div className="text-primary-200 text-sm">רק על עסקאות שנסגרו דרך הפלטפורמה</div>
              <div className="mt-4 bg-white/20 rounded-lg px-3 py-2 text-xs font-bold">
                תנאי שותף מייסד — נעול לתמיד
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="text-4xl font-black text-gray-900 mb-2">∞</div>
              <div className="font-bold text-gray-700 mb-2">נכסים ולידים</div>
              <div className="text-sm text-gray-400">ללא הגבלה על נכסים, לידים או פניות</div>
            </div>
          </div>

          <p className="mt-8 text-gray-400 text-sm">
            דוגמה: עסקה על נכס €200,000 עם עמלה 3% = €6,000 עמלה לסוכן → €600 לפלטפורמה
          </p>
        </div>
      </section>

      {/* ─── WHY IT WORKS ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              למה MANAIO עובדת
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              בנינו את כל מה שסוכן צריך כדי לעבוד עם ישראלים — בלי הכאב
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              מתחילים תוך 48 שעות
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-xl flex items-center justify-center text-lg font-black mx-auto mb-4">
                  {s.num}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO IS IT FOR ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                לסוכנים שמבינים שהשוק הישראלי הוא הזדמנות
              </h2>
              <div className="space-y-4">
                {[
                  "מתווכים ביוון, קפריסין, גאורגיה, פורטוגל",
                  "סוכנים שכבר עובדים עם ישראלים ורוצים עוד",
                  "משרדי נדל\"ן שמחפשים ערוץ דיגיטלי ממוקד",
                  "יזמים עם פרויקטים חדשים שרוצים חשיפה לישראלים",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200">
              <div className="text-primary-600 font-bold text-sm mb-3 uppercase tracking-wide">על המייסד</div>
              <p className="text-gray-700 leading-relaxed mb-4">
                MANAIO נבנתה על ידי ישראלי עם ניסיון ישיר בהשקעות נדל"ן ביוון ובהכרת הקהל הישראלי.
              </p>
              <p className="text-gray-700 leading-relaxed">
                אני יודע מה ישראלים שואלים, מה הם מחפשים, ומה גורם להם לסגור עסקה. הפלטפורמה בנויה מהניסיון הזה.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">MANAIO</div>
                  <div className="text-gray-500 text-xs">ישראלי · יוון · נדל"ן בינלאומי</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">שאלות נפוצות</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-right"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 mr-3 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 bg-primary-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            נותרו {FOUNDING_SPOTS_LEFT} מקומות לשותפי מייסדים
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            מוכן לקבל לידים ישראלים?
          </h2>
          <p className="text-primary-200 text-lg mb-10 max-w-xl mx-auto">
            הצטרף בחינם עכשיו. נעל 10% לתמיד. התחל לקבל פניות מישראלים שרוצים לקנות.
          </p>
          <Link
            href="/register/agent"
            className="inline-block bg-white text-primary-600 hover:bg-gray-50 font-bold text-xl px-14 py-5 rounded-xl transition-all shadow-2xl"
          >
            הצטרף כשותף מייסד — חינם
          </Link>
          <p className="mt-6 text-primary-300 text-sm">
            שאלות? כתוב לנו:{" "}
            <a href="mailto:agents@mymanaio.com" className="underline hover:text-white">
              agents@mymanaio.com
            </a>
          </p>
        </div>
      </section>

      {/* ─── MINIMAL FOOTER ─── */}
      <footer className="bg-gray-900 text-gray-500 py-8 text-center text-sm">
        <div className="flex justify-center mb-4">
          <img src="/logo.svg" alt="MANAIO" className="h-8 w-auto opacity-60" />
        </div>
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/terms" className="hover:text-white transition-colors">תנאי שימוש</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">פרטיות</Link>
          <Link href="/partnership" className="hover:text-white transition-colors">הסכם שותפות</Link>
          <Link href="/contact" className="hover:text-white transition-colors">צור קשר</Link>
        </div>
        <p>© {new Date().getFullYear()} MANAIO. כל הזכויות שמורות.</p>
      </footer>
    </div>
  );
}
