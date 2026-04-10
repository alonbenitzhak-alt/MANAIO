"use client";

import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { useLanguage } from "@/lib/LanguageContext";

interface ShareButtonsProps {
  url?: string;
  title?: string;
  message?: string; // custom WhatsApp message
}

export default function ShareButtons({ url, title, message }: ShareButtonsProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const pageUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = message || title || pageUrl;
  const waText = encodeURIComponent(`${shareText}\n${pageUrl}`);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = pageUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        title={t("share.whatsapp")}
        className="w-9 h-9 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl flex items-center justify-center transition-colors"
      >
        <SiWhatsapp className="w-4 h-4" />
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        title={t("share.facebook")}
        className="w-9 h-9 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl flex items-center justify-center transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        title={t("share.linkedin")}
        className="w-9 h-9 bg-[#0A66C2] hover:bg-[#0958a8] text-white rounded-xl flex items-center justify-center transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      {/* Copy link */}
      <button
        onClick={handleCopy}
        title={copied ? t("share.copied") : t("share.copyLink")}
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
          copied ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-600"
        }`}
      >
        {copied ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
