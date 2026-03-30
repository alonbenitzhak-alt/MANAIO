"use client";

import Link from "next/link";
import { countries } from "@/data/countries";
import { useProperties } from "@/lib/PropertiesContext";
import { useLanguage } from "@/lib/LanguageContext";
import PageHero from "@/components/PageHero";

export default function CountriesPage() {
  const { properties } = useProperties();
  const { t, lang } = useLanguage();

  const localName = (c: (typeof countries)[number]) => {
    if (lang === "he") return c.name_he || c.name;
    if (lang === "el") return c.name_el || c.name;
    if (lang === "ru") return c.name_ru || c.name;
    if (lang === "ar") return c.name_ar || c.name;
    return c.name;
  };

  const localDescription = (c: (typeof countries)[number]) => {
    if (lang === "he") return c.description_he || c.description;
    if (lang === "el") return c.description_el || c.description;
    if (lang === "ru") return c.description_ru || c.description;
    if (lang === "ar") return c.description_ar || c.description;
    return c.description;
  };

  const localHighlights = (c: (typeof countries)[number]) => {
    if (lang === "he") return c.highlights_he || c.highlights;
    if (lang === "el") return c.highlights_el || c.highlights;
    if (lang === "ru") return c.highlights_ru || c.highlights;
    if (lang === "ar") return c.highlights_ar || c.highlights;
    return c.highlights;
  };

  return (
    <>
      <PageHero>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("countries.title")}</h1>
          <p className="text-white/80 text-lg">{t("countries.subtitle")}</p>
        </div>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {countries.map((country) => {
            const countryProperties = properties.filter((p) => p.country === country.name);

            if (country.comingSoon) {
              return (
                <div
                  key={country.slug}
                  className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 opacity-80 cursor-not-allowed"
                >
                  {/* Coming Soon badge */}
                  <div className="absolute top-4 end-4 z-10 bg-gold-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    {t("countries.comingSoon")}
                  </div>
                  <div className="relative h-56 overflow-hidden">
                    <img src={country.image} alt={localName(country)} className="w-full h-full object-cover grayscale-[30%]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-5">
                      <h2 className="text-white text-2xl font-bold">{localName(country)}</h2>
                      <p className="text-white/70 text-sm">
                        {t("countries.launchingSoon")}
                      </p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">{localDescription(country)}</p>
                    <ul className="space-y-1.5">
                      {localHighlights(country).slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                          <svg className="w-4 h-4 text-gray-300 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={country.slug}
                href={`/countries/${country.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={country.image} alt={localName(country)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <h2 className="text-white text-2xl font-bold">{localName(country)}</h2>
                    <p className="text-white/80 text-sm">
                      {countryProperties.length} {t("countries.available")} {countryProperties.length === 1 ? t("properties.property") : t("properties.propertiesNoun")}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{localDescription(country)}</p>
                  <ul className="space-y-1.5">
                    {localHighlights(country).slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-accent-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
