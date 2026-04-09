"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const SPLASH_IMAGES = [
  "/splash-1.jpg", // Boats/Sea
  "/splash-2.jpg", // Sunset/Mountains
];

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<"logo" | "slogan" | "fadeOut">("logo");
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    // Pick random background image
    const randomImage = SPLASH_IMAGES[Math.floor(Math.random() * SPLASH_IMAGES.length)];
    setBackgroundImage(randomImage);
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
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.08) 100%)"
      }} />

      {/* Logo & Tagline Container with semi-transparent background */}
      <div className="relative z-10 flex flex-col items-center gap-4">

        {/* Background blur/dark overlay behind content */}
        <div className="absolute -inset-8 rounded-2xl bg-black/30 backdrop-blur-sm -z-10" />

        {/* Logo with Drop Shadow */}
        <div
          style={{
            animation: "logoEntry 0.8s ease-out forwards",
          }}
        >
          <img
            src="/logo.svg"
            alt="MANAIO"
            className="w-64 h-64 sm:w-80 sm:h-80 object-contain"
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
            className="text-3xl sm:text-4xl font-bold tracking-wide px-6 py-3 rounded-lg text-white"
            style={{
              backgroundColor: "rgba(0,0,0,0.4)",
              textShadow: "0 2px 8px rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
            }}
          >
            {t("splash.tagline")}
          </p>
        </div>
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
