"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LeadForm({ propertyId }: { propertyId: string }) {
  const { t } = useLanguage();
  const { user, profile } = useAuth();
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (profile?.phone) setPhone(profile.phone);
  }, [profile]);

  // Not logged in — show login gate
  if (!user) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 text-center">
        <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{t("detail.requestDetails")}</h3>
        <p className="text-sm text-gray-500 mb-5">{t("form.loginToSubmit")}</p>
        <div className="flex gap-3 justify-center">
          <Link href="/login" className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors">
            {t("nav.login")}
          </Link>
          <Link href="/register/buyer" className="border border-primary-600 text-primary-600 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-50 transition-colors">
            {t("nav.register")}
          </Link>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="bg-accent-50 border border-accent-500/20 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t("form.thankYou")}</h3>
        <p className="text-gray-600">{t("form.thankYouSub")}</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { "Authorization": `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({
          property_id: propertyId,
          phone,
          investment_budget: budget,
          message,
          buyer_id: user.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || t("form.error"));
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg(t("form.error"));
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-1">{t("detail.requestDetails")}</h3>
      <p className="text-sm text-gray-500 mb-5">{t("detail.formSubtitle")}</p>

      {/* Auto-filled sender info */}
      <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 mb-5">
        <div className="w-9 h-9 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
          {(profile?.full_name || user.email || "?").charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{profile?.full_name || "—"}</p>
          <p className="text-xs text-gray-400 truncate">{user.email}</p>
        </div>
        <span className="ml-auto text-xs text-gray-400 shrink-0">{t("form.autoFilled")}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.phone")}</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            placeholder={t("form.phonePlaceholder")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.budget")}</label>
          <select
            required
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
          >
            <option value="">{t("form.budgetPlaceholder")}</option>
            <option value="50000-100000">€50,000 - €100,000</option>
            <option value="100000-250000">€100,000 - €250,000</option>
            <option value="250000-500000">€250,000 - €500,000</option>
            <option value="500000+">€500,000+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.message")}</label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
            placeholder={t("form.messagePlaceholder")}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? t("form.submitting") : t("form.submit")}
        </button>
        <p className="text-xs text-gray-400 text-center leading-relaxed">{t("form.connectorDisclaimer")}</p>
        {status === "error" && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
      </form>
    </div>
  );
}
