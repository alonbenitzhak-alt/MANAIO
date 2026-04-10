"use client";

import Link from "next/link";
import Image from "next/image";
import { Property } from "@/lib/types";
import { useFavorites } from "@/lib/FavoritesContext";
import { useLanguage } from "@/lib/LanguageContext";

const COUNTRY_KEY: Record<string, string> = {
  Greece: "footer.greece",
  Cyprus: "footer.cyprus",
  Georgia: "footer.georgia",
  Portugal: "footer.portugal",
};

export default function PropertyCard({ property }: { property: Property }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t, lang } = useLanguage();
  const favorited = isFavorite(property.id);
  const displayTitle = property.translations?.[lang]?.title ?? (lang === "he" ? property.title_he : undefined) ?? property.title;

  const countryLabel = COUNTRY_KEY[property.country] ? t(COUNTRY_KEY[property.country]) : property.country;
  const locationLabel = `${property.city}, ${countryLabel}`;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 border border-gray-100 group hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={displayTitle}
          fill
          priority={property.is_demo}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          quality={90}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Demo badge */}
        {property.is_demo && (
          <div className="absolute top-3 start-3 z-10">
            <span className="bg-red-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
              {t("property.demo")}
            </span>
          </div>
        )}

        {/* Property number badge */}
        {property.property_number && (
          <div className="absolute bottom-3 start-3 z-10">
            <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              #{property.property_number}
            </span>
          </div>
        )}

        {/* ROI badge */}
        {property.expected_roi > 0 && (
          <div className="absolute top-3 end-3">
            <span className="bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {property.expected_roi}% {t("property.avgRoi")}
            </span>
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={() => toggleFavorite(property.id)}
          className="absolute bottom-3 end-3 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-sm hover:scale-110"
        >
          <svg
            className={`w-4.5 h-4.5 ${favorited ? "text-red-500 fill-red-500" : "text-gray-400"} transition-colors`}
            fill={favorited ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg leading-snug mb-1 line-clamp-2 group-hover:text-primary-700 transition-colors">
          {displayTitle}
        </h3>

        {/* City, Country in Hebrew */}
        <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {locationLabel}
        </p>

        {/* Stats row - 4 columns */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {/* Bedrooms */}
          <div className="flex flex-col items-center text-center">
            <svg className="w-4 h-4 text-gray-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs font-semibold text-gray-900">{property.bedrooms}</span>
            <span className="text-xs text-gray-500">{t("card.bedrooms")}</span>
          </div>

          {/* Square meters */}
          {property.area_sqm && (
            <div className="flex flex-col items-center text-center">
              <svg className="w-4 h-4 text-gray-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <span className="text-xs font-semibold text-gray-900">{property.area_sqm}</span>
              <span className="text-xs text-gray-500">{t("card.sqm")}</span>
            </div>
          )}

          {/* ROI */}
          <div className="flex flex-col items-center text-center">
            <svg className="w-4 h-4 text-emerald-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-xs font-semibold text-emerald-600">{property.expected_roi}%</span>
            <span className="text-xs text-gray-500">{t("card.roi")}</span>
          </div>

          {/* Furnished */}
          {property.furnished !== undefined && (
            <div className="flex flex-col items-center text-center">
              <svg className="w-4 h-4 text-gray-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-xs font-semibold text-gray-900">{property.furnished ? "✓" : "✗"}</span>
              <span className="text-xs text-gray-500">{property.furnished ? t("card.furnished") : t("card.unfurnished")}</span>
            </div>
          )}
        </div>

        {/* Amenities highlights - show first 3 */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {property.amenities.slice(0, 3).map((amenity) => (
              <span key={amenity} className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-gray-500 text-xs px-2 py-1">+{property.amenities.length - 3}</span>
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{t("card.price")}</p>
            <span className="text-2xl font-black text-gray-900">€{property.price.toLocaleString()}</span>
          </div>
          <Link
            href={`/properties/${property.id}`}
            className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-700 transition-all duration-200 hover:shadow-lg hover:shadow-primary-200 active:scale-95"
          >
            {t("card.cta")}
          </Link>
        </div>

      </div>
    </div>
  );
}
