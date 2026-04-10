"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface SplashImage {
  url: string;
  location_en: string;
  location_he: string;
  location_el: string;
  location_ru: string;
  location_ar: string;
}

const SPLASH_IMAGES: SplashImage[] = [
  { url: "/splash-1.jpg", location_en: "Cape Greco, Cyprus", location_he: "קייפ גרקו, קפריסין", location_el: "Ακρωτήρι Γρέκο, Κύπρος", location_ru: "Мыс Греко, Кипр", location_ar: "كيب جريكو، قبرص" },
  { url: "/splash-2.jpg", location_en: "Meteora, Greece", location_he: "מטאורה, יוון", location_el: "Μετέωρα, Ελλάδα", location_ru: "Метеора, Греция", location_ar: "ميتيورا، اليونان" },
  { url: "/splash-3.jpg", location_en: "Koniitsa, Greece", location_he: "קוניטצה, יוון", location_el: "Κόνιτσα, Ελλάδα", location_ru: "Конница, Греция", location_ar: "كونيتسا، اليونان" },
  { url: "/splash-4.jpg", location_en: "Volos, Greece", location_he: "ויקוס, יוון", location_el: "Βόλος, Ελλάδα", location_ru: "Волос, Греция", location_ar: "فولوس، اليونان" },
  { url: "/splash-5.jpg", location_en: "Mount Olympus, Greece", location_he: "הר אולימפוס, יוון", location_el: "Όρος Όλυμπος, Ελλάδα", location_ru: "Гора Олимп, Греция", location_ar: "جبل أولمبوس، اليونان" },
  { url: "/splash-6.jpg", location_en: "Mount Olympus, Greece", location_he: "הר אולימפוס, יוון", location_el: "Όρος Όλυμπος, Ελλάδα", location_ru: "Гора Олимп, Греция", location_ar: "جبل أولمبوس، اليونان" },
  { url: "/splash-7.jpg", location_en: "Palaios Panteleimonas, Greece", location_he: "פליאוס פנדלימונאס, יוון", location_el: "Παλαιός Παντελεήμονας, Ελλάδα", location_ru: "Старый Пантелеймон, Греция", location_ar: "باليوس بانتليمونا، اليونان" },
  { url: "/splash-8.jpg", location_en: "Aegina, Greece", location_he: "אגינה, יוון", location_el: "Αίγινα, Ελλάδα", location_ru: "Эгина, Греция", location_ar: "إيجينا، اليونان" },
];

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const { t, lang } = useLanguage();
  const [phase, setPhase] = useState<"logo" | "slogan" | "fadeOut">("logo");
  const [selectedImage, setSelectedImage] = useState<SplashImage | null>(null);

  useEffect(() => {
    // Pick random background image
    const randomImage = SPLASH_IMAGES[Math.floor(Math.random() * SPLASH_IMAGES.length)];
    setSelectedImage(randomImage);
  }, []);

  useEffect(() => {
    // Logo appears immediately, then show slogan after 800ms
    const sloganTimer = setTimeout(() => setPhase("slogan"), 800);
    // Start fade out after 2.5s
    const fadeTimer = setTimeout(() => setPhase("fadeOut"), 2500);
    // Remove splash after fade completes
    const doneTimer = setTimeout(() => onFinish(), 3300);

    return () => {
      clearTimeout(sloganTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[200] transition-opacity duration-700 ${
        phase === "fadeOut" ? "opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundImage: selectedImage ? `url('${selectedImage.url}')` : "none",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#1a1a1a",
      }}
    >
      {/* Enhanced gradient overlay for better contrast - lighter on mobile */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.08) 100%)"
      }} />

      {/* Logo - positioned at top center */}
      <div className="absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div
          style={{
            animation: "logoEntry 0.8s ease-out forwards",
          }}
        >
          <img
            src="/logo.svg"
            alt="MANAIO"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            style={{
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
            }}
          />
        </div>
      </div>

      {/* Tagline & Location Container - positioned lower, more transparent */}
      <div className="absolute inset-0 flex flex-col items-center justify-end z-10 px-4 sm:px-0 pb-16 sm:pb-20">

        {/* Tagline with minimal background */}
        <div
          className={`transition-all duration-1000 ease-out relative ${
            phase === "slogan" || phase === "fadeOut"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <p
            className="text-lg sm:text-2xl font-bold tracking-wide px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-lg text-white"
            style={{
              backgroundColor: "rgba(0,0,0,0.25)",
              textShadow: "0 2px 6px rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {t("splash.tagline")}
          </p>
        </div>

        {/* Location Label */}
        {selectedImage && (
          <div
            className={`transition-all duration-1000 ease-out relative z-10 px-4 mt-3 sm:mt-4 ${
              phase === "slogan" || phase === "fadeOut"
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
          <div className="flex items-center gap-1 sm:gap-1.5">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span
              className="text-xs font-medium text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full backdrop-blur-sm whitespace-nowrap"
              style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                textShadow: "0 1px 3px rgba(0,0,0,0.5)",
              }}
            >
              {lang === "he" ? selectedImage.location_he :
               lang === "el" ? selectedImage.location_el :
               lang === "ru" ? selectedImage.location_ru :
               lang === "ar" ? selectedImage.location_ar :
               selectedImage.location_en}
            </span>
          </div>
        </div>
        )}
      </div>

      {/* Subtle loading dots */}
      <div
        className={`absolute bottom-12 flex gap-2 transition-opacity duration-500 relative z-10 ${
          phase === "fadeOut" ? "opacity-0" : "opacity-60"
        }`}
      >
        <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>

    </div>
  );
}
