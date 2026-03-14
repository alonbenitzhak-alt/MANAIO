"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

export default function CookieBanner() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const isHe = lang === "he";

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg px-4 py-4 md:py-3"
      dir={isHe ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-xl shrink-0">🍪</span>
          <p className="text-sm text-gray-600 leading-relaxed">
            {isHe ? (
              <>
                אנו משתמשים בעוגיות לשיפור חוויית הגלישה ולניתוח תנועת האתר.{" "}
                <Link href="/privacy" className="text-primary-600 hover:underline font-medium">
                  מדיניות הפרטיות
                </Link>
              </>
            ) : (
              <>
                We use cookies to improve your browsing experience and analyze site traffic.{" "}
                <Link href="/privacy" className="text-primary-600 hover:underline font-medium">
                  Privacy Policy
                </Link>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg transition-colors"
          >
            {isHe ? "דחה" : "Decline"}
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            {isHe ? "אישור" : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
