"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface SplashImage {
  url: string;
  location: string;
  location_he: string;
}

const SPLASH_IMAGES: SplashImage[] = [
  { url: "/splash-1.jpg", location: "Athens, Greece", location_he: "אתונה, יוון" },
  { url: "/splash-2.jpg", location: "Mykonos, Greece", location_he: "מיקונוס, יוון" },
  { url: "/splash-3.jpg", location: "Crete, Greece", location_he: "כרתים, יוון" },
  { url: "/splash-4.jpg", location: "Limassol, Cyprus", location_he: "לימסול, קפריסין" },
  { url: "/splash-5.jpg", location: "Paphos, Cyprus", location_he: "פאפוס, קפריסין" },
  { url: "/splash-6.jpg", location: "Santorini, Greece", location_he: "סנטוריני, יוון" },
  { url: "/splash-7.jpg", location: "Thessaloniki, Greece", location_he: "סלוניקי, יוון" },
  { url: "/splash-8.jpg", location: "Nicosia, Cyprus", location_he: "ניקוסיה, קפריסין" },
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
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-700 ${
        phase === "fadeOut" ? "opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundImage: selectedImage ? `url('${selectedImage.url}')` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Enhanced gradient overlay for better contrast */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.15) 100%)"
      }} />

      {/* Logo & Tagline Container with semi-transparent background */}
      <div className="relative z-10 flex flex-col items-center gap-4">

        {/* Background blur/dark overlay behind content */}
        <div className="absolute -inset-8 rounded-2xl bg-black/30 backdrop-blur-sm -z-10" />

        {/* Logo with Drop Shadow */}
        <div
          style={{
            animation: "logoEntry 0.8s ease-out forwards",
            marginBottom: "-15px",
          }}
        >
          <img
            src="/logo.svg"
            alt="MANAIO"
            className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
            style={{
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
            }}
          />
        </div>

        {/* Tagline with Text Shadow & Semi-transparent Background */}
        <div
          className={`transition-all duration-1000 ease-out ${
            phase === "slogan" || phase === "fadeOut"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <p
            className="text-3xl sm:text-4xl font-bold tracking-wide px-8 py-4 rounded-xl text-white"
            style={{
              backgroundColor: "rgba(0,0,0,0.45)",
              textShadow: "0 3px 10px rgba(0,0,0,0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {t("splash.tagline")}
          </p>
        </div>
      </div>

      {/* Location Label */}
      {selectedImage && (
        <div
          className={`absolute bottom-28 transition-all duration-1000 ease-out relative z-10 ${
            phase === "slogan" || phase === "fadeOut"
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span
              className="text-sm font-semibold text-white px-4 py-1.5 rounded-full backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                textShadow: "0 1px 4px rgba(0,0,0,0.7)",
              }}
            >
              {lang === "he" ? selectedImage.location_he : selectedImage.location}
            </span>
          </div>
        </div>
      )}

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
