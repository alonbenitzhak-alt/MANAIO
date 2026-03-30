"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useProperties } from "@/lib/PropertiesContext";
import { useLanguage } from "@/lib/LanguageContext";

const MapComponent = dynamic(() => import("@/components/PropertyMapView"), { ssr: false });

export default function PropertiesMapPage() {
  const { properties } = useProperties();
  const { t, dir } = useLanguage();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const mapProperties = useMemo(() => {
    const countryCoords: Record<string, [number, number]> = {
      "Greece": [39.074208, 21.824312],
      "Cyprus": [34.9249, 33.4299],
      "Georgia": [42.3154, 43.3569],
      "Portugal": [39.3999, -8.2245],
    };

    return properties.map((p) => ({
      ...p,
      coords: countryCoords[p.country] || [0, 0],
    }));
  }, [properties]);

  return (
    <>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary-600">{t("detail.home")}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{t("properties.title")}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">📍 Map</span>
        </div>
      </div>

      <div dir={dir} className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Map */}
        <div className="flex-1 relative">
          <MapComponent properties={mapProperties} selectedId={selectedProperty} />
        </div>

        {/* Sidebar */}
        <div className="lg:w-96 bg-white border-l border-gray-200 overflow-y-auto flex flex-col">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
            <h2 className="text-lg font-bold text-gray-900">{t("properties.title")}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {properties.length} {t("properties.propertiesNoun")}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {mapProperties.map((property) => (
              <button
                key={property.id}
                onClick={() => setSelectedProperty(property.id)}
                className={`w-full text-left p-4 border-b border-gray-100 hover:bg-primary-50 transition-colors ${
                  selectedProperty === property.id ? "bg-primary-100 border-l-4 border-l-primary-600" : ""
                }`}
              >
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
                  {property.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  📍 {property.city}, {property.country}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-primary-600">
                    €{property.price.toLocaleString()}
                  </span>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-semibold">
                    {property.expected_roi}% ROI
                  </span>
                </div>
                <Link
                  href={`/properties/${property.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block mt-3 text-xs text-primary-600 font-semibold hover:underline"
                >
                  {t("detail.viewDetails")} →
                </Link>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
