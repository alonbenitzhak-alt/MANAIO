"use client";

import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/lib/PropertiesContext";
import { useFavorites } from "@/lib/FavoritesContext";
import { useLanguage } from "@/lib/LanguageContext";
import PageHero from "@/components/PageHero";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const { t } = useLanguage();
  const { properties } = useProperties();
  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <>
      <PageHero>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("favorites.title")}</h1>
          <p className="text-white/80 text-lg">
            {t("favorites.count").replace("{count}", favorites.length.toString()).replace("{noun}", favorites.length === 1 ? t("properties.property") : t("properties.propertiesNoun"))}
          </p>
        </div>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {favoriteProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-gray-500 text-lg">{t("favorites.empty")}</p>
            <p className="text-gray-400 text-sm mt-1 mb-6">{t("favorites.emptySub")}</p>
            <Link href="/properties" className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors">
              {t("favorites.browse")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteProperties.map((p) => (<PropertyCard key={p.id} property={p} />))}
          </div>
        )}
      </div>
    </>
  );
}
