"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const FOUNDING_SPOTS_LEFT = 12;

export default function AgentsLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t, dir } = useLanguage();

  const spotsText = t("agents.hero.spotsLeft").replace("{spots}", String(FOUNDING_SPOTS_LEFT));

  const benefits = [
    { color: "bg-blue-100 text-blue-700", label: "IL", titleKey: "agents.benefit1.title", descKey: "agents.benefit1.desc" },
    { color: "bg-violet-100 text-violet-700", label: "AI", titleKey: "agents.benefit2.title", descKey: "agents.benefit2.desc" },
    { color: "bg-primary-100 text-primary-700", label: "CRM", titleKey: "agents.benefit3.title", descKey: "agents.benefit3.desc" },
    { color: "bg-green-100 text-green-700", label: "ROI", titleKey: "agents.benefit4.title", descKey: "agents.benefit4.desc" },
    { color: "bg-amber-100 text-amber-700", label: "INT", titleKey: "agents.benefit5.title", descKey: "agents.benefit5.desc" },
    { color: "bg-emerald-100 text-emerald-700", label: "WA", titleKey: "agents.benefit6.title", descKey: "agents.benefit6.desc" },
  ];

  const steps = [
    { num: "01", titleKey: "agents.step1.title", descKey: "agents.step1.desc" },
    { num: "02", titleKey: "agents.step2.title", descKey: "agents.step2.desc" },
    { num: "03", titleKey: "agents.step3.title", descKey: "agents.step3.desc" },
    { num: "04", titleKey: "agents.step4.title", descKey: "agents.step4.desc" },
  ];

  const faqKeys = [
    { qKey: "agents.faq1.q", aKey: "agents.faq1.a" },
    { qKey: "agents.faq2.q", aKey: "agents.faq2.a" },
    { qKey: "agents.faq3.q", aKey: "agents.faq3.a" },
    { qKey: "agents.faq4.q", aKey: "agents.faq4.a" },
    { qKey: "agents.faq5.q", aKey: "agents.faq5.a" },
    { qKey: "agents.faq6.q", aKey: "agents.faq6.a" },
  ];

  const forItems = [
    "agents.for.item1",
    "agents.for.item2",
    "agents.for.item3",
    "agents.for.item4",
  ];

  return (
    <div dir={dir} className="min-h-screen bg-white font-sans">

      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-primary-950 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1600&h=900&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-sm font-semibold px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            {spotsText}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            {t("agents.hero.title1")}<br />
            <span className="text-primary-400">{t("agents.hero.title2")}</span>
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("agents.hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register/agent"
              className="bg-primary-500 hover:bg-primary-400 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all shadow-lg shadow-primary-900/40"
            >
              {t("agents.hero.cta")}
            </Link>
            <a
              href="#how-it-works"
              className="border border-white/30 hover:border-white/60 text-white font-semibold text-lg px-10 py-4 rounded-xl transition-all"
            >
              {t("agents.hero.howItWorks")}
            </a>
          </div>

          <p className="mt-6 text-white/40 text-sm">{t("agents.hero.disclaimer")}</p>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section className="bg-primary-600 text-white py-5">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-8 text-center text-sm font-medium">
          <div>{t("agents.social.countries")}</div>
          <div>{t("agents.social.audience")}</div>
          <div>{t("agents.social.noCost")}</div>
          <div>{t("agents.social.approval")}</div>
        </div>
      </section>

      {/* ─── THE DEAL ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {t("agents.deal.title")}
          </h2>
          <p className="text-gray-500 text-lg mb-14 max-w-xl mx-auto">
            {t("agents.deal.subtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="text-4xl font-black text-gray-900 mb-2">₪0</div>
              <div className="font-bold text-gray-700 mb-2">{t("agents.deal.free.label")}</div>
              <div className="text-sm text-gray-400">{t("agents.deal.free.desc")}</div>
            </div>
            <div className="bg-primary-600 text-white rounded-2xl p-8 shadow-xl shadow-primary-200 scale-105">
              <div className="text-4xl font-black mb-2">{t("agents.deal.commission.value")}</div>
              <div className="font-bold mb-2">{t("agents.deal.commission.label")}</div>
              <div className="text-primary-200 text-sm">{t("agents.deal.commission.desc")}</div>
              <div className="mt-4 bg-white/20 rounded-lg px-3 py-2 text-xs font-bold">
                {t("agents.deal.commission.badge")}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="text-4xl font-black text-gray-900 mb-2">{t("agents.deal.unlimited.value")}</div>
              <div className="font-bold text-gray-700 mb-2">{t("agents.deal.unlimited.label")}</div>
              <div className="text-sm text-gray-400">{t("agents.deal.unlimited.desc")}</div>
            </div>
          </div>

          <p className="mt-8 text-gray-400 text-sm">
            {t("agents.deal.example")}
          </p>
        </div>
      </section>

      {/* ─── WHY IT WORKS ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              {t("agents.why.title")}
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              {t("agents.why.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl text-xs font-black tracking-wide mb-3 ${b.color}`}>
                  {b.label}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t(b.titleKey)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(b.descKey)}</p>
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
              {t("agents.steps.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-xl flex items-center justify-center text-lg font-black mx-auto mb-4">
                  {s.num}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t(s.titleKey)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(s.descKey)}</p>
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
                {t("agents.for.title")}
              </h2>
              <div className="space-y-4">
                {forItems.map((key, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</div>
                    <span className="text-gray-700">{t(key)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200">
              <div className="text-primary-600 font-bold text-sm mb-3 uppercase tracking-wide">{t("agents.founder.label")}</div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("agents.founder.text1")}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t("agents.founder.text2")}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">MANAIO</div>
                  <div className="text-gray-500 text-xs">{t("agents.founder.tag")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">{t("agents.faq.title")}</h2>
          <div className="space-y-3">
            {faqKeys.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-right"
                >
                  <span className="font-semibold text-gray-900">{t(faq.qKey)}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 mr-3 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {t(faq.aKey)}
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
            {spotsText}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            {t("agents.cta.title")}
          </h2>
          <p className="text-primary-200 text-lg mb-10 max-w-xl mx-auto">
            {t("agents.cta.subtitle")}
          </p>
          <Link
            href="/register/agent"
            className="inline-block bg-white text-primary-600 hover:bg-gray-50 font-bold text-xl px-14 py-5 rounded-xl transition-all shadow-2xl"
          >
            {t("agents.cta.button")}
          </Link>
          <p className="mt-6 text-primary-300 text-sm">
            {t("agents.cta.questions")}{" "}
            <span className="underline opacity-80">agents [at] mymanaio [dot] com</span>
          </p>
        </div>
      </section>

      {/* ─── MINIMAL FOOTER ─── */}
      <footer className="bg-gray-900 text-gray-500 py-8 text-center text-sm">
        <div className="flex justify-center mb-4">
          <img src="/logo.svg" alt="MANAIO" className="h-8 w-auto opacity-60" />
        </div>
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/terms" className="hover:text-white transition-colors">{t("footer.terms")}</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">{t("footer.privacy")}</Link>
          <Link href="/partnership" className="hover:text-white transition-colors">{t("admin.partnershipAgreement")}</Link>
          <Link href="/contact" className="hover:text-white transition-colors">{t("footer.contact")}</Link>
        </div>
        <p>© {new Date().getFullYear()} MANAIO. {t("footer.rights")}</p>
      </footer>
    </div>
  );
}
