"use client";

import { Suspense, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/lib/PropertiesContext";
import { useLanguage } from "@/lib/LanguageContext";
import PageHero from "@/components/PageHero";

const ITEMS_PER_PAGE = 12;

function PropertiesContent() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const { properties } = useProperties();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState({
    country: searchParams.get("country") || "",
    priceRange: searchParams.get("budget") || "",
    propertyType: searchParams.get("type") || "",
    minBedrooms: searchParams.get("minBedrooms") || "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    setCurrentPage(1);
    return properties.filter((p) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match =
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          (p.property_number && p.property_number.includes(q));
        if (!match) return false;
      }
      if (filters.country && p.country !== filters.country) return false;
      if (filters.propertyType && p.property_type !== filters.propertyType) return false;
      if (filters.priceRange) {
        const max = parseInt(filters.priceRange);
        if (p.price > max) return false;
      }
      if (filters.minBedrooms) {
        const min = parseInt(filters.minBedrooms);
        if (p.bedrooms < min) return false;
      }
      return true;
    });
  }, [filters, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const uniqueTypes = [...new Set(properties.map((p) => p.property_type))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Search bar */}
      <div className="mb-4">
        <div className="relative">
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("properties.search")}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">{t("properties.filter.country")}</label>
          <select value={filters.country} onChange={(e) => setFilters({ ...filters, country: e.target.value })} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-primary-500 outline-none bg-white">
            <option value="">{t("properties.filter.allCountries")}</option>
            <option value="Greece">{t("footer.greece")}</option>
            <option value="Cyprus">{t("footer.cyprus")}</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">{t("properties.filter.maxPrice")}</label>
          <select value={filters.priceRange} onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-primary-500 outline-none bg-white">
            <option value="">{t("properties.filter.anyPrice")}</option>
            <option value="100000">{t("properties.filter.upTo")} €100,000</option>
            <option value="200000">{t("properties.filter.upTo")} €200,000</option>
            <option value="350000">{t("properties.filter.upTo")} €350,000</option>
            <option value="500000">{t("properties.filter.upTo")} €500,000</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">{t("properties.filter.type")}</label>
          <select value={filters.propertyType} onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-primary-500 outline-none bg-white">
            <option value="">{t("properties.filter.allTypes")}</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>{t(`propertyType.${type.toLowerCase()}`) || type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">{t("properties.filter.bedrooms")}</label>
          <select value={filters.minBedrooms} onChange={(e) => setFilters({ ...filters, minBedrooms: e.target.value })} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-primary-500 outline-none bg-white">
            <option value="">{t("properties.filter.any")}</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={() => setFilters({ country: "", priceRange: "", propertyType: "", minBedrooms: "" })}
            className="w-full text-sm text-primary-600 font-semibold border border-primary-200 rounded-lg py-2.5 hover:bg-primary-50 transition-colors"
          >
            {t("properties.filter.clear")}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-500">
          {t("properties.showing").replace("{count}", filtered.length.toString()).replace("{noun}", filtered.length === 1 ? t("properties.property") : t("properties.propertiesNoun"))}
        </div>
        <Link
          href="/properties/map"
          className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 bg-primary-50 px-4 py-2 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6.553 3.276A1 1 0 0121 20.382V9.618a1 1 0 00-1.447-.894L15 11m0 0l6-3.618m-6 3.618v10" />
          </svg>
          📍 Map View
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p className="text-gray-500 text-lg">{t("properties.noResults")}</p>
          <p className="text-gray-400 text-sm mt-1">{t("properties.noResultsSub")}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {paginated.map((p) => (<PropertyCard key={p.id} property={p} />))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => { setCurrentPage((p) => p - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ←
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`w-9 h-9 rounded-xl text-sm font-semibold transition-colors ${
                    page === currentPage
                      ? "bg-primary-600 text-white"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => { setCurrentPage((p) => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function PropertiesPageHeader() {
  const { t } = useLanguage();
  const { properties } = useProperties();
  return (
    <PageHero>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("properties.title")}</h1>
        <p className="text-white/80 text-lg">
          {t("properties.subtitle").replace("{count}", properties.length.toString())}
        </p>
      </div>
    </PageHero>
  );
}

export default function PropertiesPage() {
  return (
    <>
      <PropertiesPageHeader />
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">{/* loading */}</div>}>
        <PropertiesContent />
      </Suspense>
    </>
  );
}
