"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<"logo" | "slogan" | "fadeOut">("logo");

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
        backgroundImage: `url('https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1920&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle gradient overlay for text readability only at top and bottom */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.15) 100%)"
      }} />
      {/* Logo */}
      <div
        className="relative z-10"
        style={{
          animation: "logoEntry 0.8s ease-out forwards",
        }}
      >
        <img
          src="/logo.svg"
          alt="MANAIO"
          className="w-64 h-64 sm:w-80 sm:h-80 object-contain drop-shadow-2xl"
        />
      </div>

      {/* Hebrew Tagline */}
      <div
        className={`mt-6 text-center transition-all duration-1000 ease-out relative z-10 ${
          phase === "slogan" || phase === "fadeOut"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <p className="text-3xl sm:text-4xl font-bold text-white tracking-wide drop-shadow-lg">
          {t("splash.tagline")}
        </p>
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
