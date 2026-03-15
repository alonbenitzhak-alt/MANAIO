"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/lib/PropertiesContext";
import { countries } from "@/data/countries";
import { useLanguage } from "@/lib/LanguageContext";

export default function HomePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { properties } = useProperties();
  const [search, setSearch] = useState({ country: "", city: "", budget: "" });
  const featured = properties.slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.country) params.set("country", search.country);
    if (search.budget) params.set("budget", search.budget);
    router.push(`/properties?${params.toString()}`);
  };

  const steps = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: t("home.steps.browse.title"),
      desc: t("home.steps.browse.desc"),
      color: "from-blue-500 to-primary-600",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: t("home.steps.request.title"),
      desc: t("home.steps.request.desc"),
      color: "from-violet-500 to-purple-600",
      bg: "bg-violet-50",
      text: "text-violet-600",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t("home.steps.consult.title"),
      desc: t("home.steps.consult.desc"),
      color: "from-emerald-500 to-green-600",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t("home.steps.invest.title"),
      desc: t("home.steps.invest.desc"),
      color: "from-amber-500 to-gold-600",
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
  ];

  const stats = [
    {
      value: "4",
      label: t("home.stats.countries"),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      ),
    },
    {
      value: "50+",
      label: t("home.stats.properties"),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      value: "12%",
      label: t("home.stats.avgRoi"),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      value: "€68K",
      label: t("home.stats.startingFrom"),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }} />
        </div>
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40 relative">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-primary-100 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              {t("home.hero.badge") || "השקעות נדל\"ן בינלאומיות"}
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 tracking-tight">
              {t("home.hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-primary-200 mb-10 leading-relaxed max-w-2xl">
              {t("home.hero.subtitle")}
            </p>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl p-4 md:p-5 shadow-2xl shadow-black/30 max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-3"
          >
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">{t("home.search.country")}</label>
              <select
                value={search.country}
                onChange={(e) => setSearch({ ...search, country: e.target.value })}
                className="w-full text-gray-900 text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50 hover:bg-white transition-colors"
              >
                <option value="">{t("home.search.allCountries")}</option>
                <option value="Greece">Greece</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Georgia">Georgia</option>
                <option value="Portugal">Portugal</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">{t("home.search.city")}</label>
              <input
                type="text"
                placeholder={t("home.search.anyCity")}
                value={search.city}
                onChange={(e) => setSearch({ ...search, city: e.target.value })}
                className="w-full text-gray-900 text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50 hover:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">{t("home.search.budget")}</label>
              <select
                value={search.budget}
                onChange={(e) => setSearch({ ...search, budget: e.target.value })}
                className="w-full text-gray-900 text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-primary-500 outline-none bg-gray-50 hover:bg-white transition-colors"
              >
                <option value="">{t("home.search.anyBudget")}</option>
                <option value="100000">{t("home.search.upTo")} €100,000</option>
                <option value="250000">{t("home.search.upTo")} €250,000</option>
                <option value="500000">{t("home.search.upTo")} €500,000</option>
                <option value="1000000">{t("home.search.upTo")} €1,000,000</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2.5 rounded-xl font-bold text-sm hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25 active:scale-95"
              >
                {t("home.search.button")}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-px">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2 px-6 py-2">
              <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-1">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 text-center font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold text-primary-600 uppercase tracking-widest mb-3 bg-primary-50 px-4 py-1.5 rounded-full">
            {t("home.featured.badge") || "נכסים מובחרים"}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">{t("home.featured.title")}</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("home.featured.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        <div className="text-center mt-14">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2.5 bg-gray-900 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            {t("home.featured.browseAll")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-gray-50 to-primary-50/30 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold text-primary-600 uppercase tracking-widest mb-3 bg-white px-4 py-1.5 rounded-full shadow-sm border border-primary-100">
              {t("home.howItWorks.badge") || "איך זה עובד"}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">{t("home.howItWorks.title")}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              {t("home.howItWorks.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative bg-white rounded-3xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                {/* Step number */}
                <div className="absolute top-5 end-5 w-7 h-7 rounded-full bg-gray-100 text-gray-400 text-xs font-black flex items-center justify-center">
                  {i + 1}
                </div>
                {/* Icon */}
                <div className={`w-14 h-14 ${step.bg} ${step.text} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                  {step.icon}
                </div>
                <div className={`text-xs font-bold ${step.text} mb-1.5 uppercase tracking-wide`}>
                  {t("home.howItWorks.step")} {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold text-primary-600 uppercase tracking-widest mb-3 bg-primary-50 px-4 py-1.5 rounded-full">
            {t("home.countries.badge") || "יעדי השקעה"}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">{t("home.countries.title")}</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("home.countries.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {countries.map((c) => (
            <Link
              key={c.slug}
              href={`/countries/${c.slug}`}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-1"
            >
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              {/* Property count badge */}
              <div className="absolute top-4 start-4">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
                  {properties.filter((p) => p.country === c.name).length} {t("home.countries.properties")}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-black text-xl leading-tight">{c.name}</h3>
                <div className="flex items-center gap-1.5 mt-1.5 text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                  <span>{t("home.countries.explore") || "לגילוי →"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500 rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full opacity-15 blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-primary-200 mb-6">
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {t("home.cta.badge") || "תשואה ממוצעת 12% בשנה"}
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-5 leading-tight">
            {t("home.cta.title")}
          </h2>
          <p className="text-primary-200 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("home.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-800 px-8 py-3.5 rounded-2xl font-bold hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
            >
              {t("home.cta.button")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/register/agent"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded-2xl font-semibold hover:bg-white/20 transition-all active:scale-95"
            >
              {t("home.cta.agentButton") || "הצטרפו כסוכן"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
