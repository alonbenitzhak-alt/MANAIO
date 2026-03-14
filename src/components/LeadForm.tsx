"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import ChatWindow from "@/components/ChatWindow";

export default function LeadForm({ propertyId, agentId, agentName }: { propertyId: string; agentId?: string; agentName?: string }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    investment_budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property_id: propertyId,
          ...form,
          buyer_id: user?.id || null,
          agent_id: agentId || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to submit");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({ name: "", email: "", phone: "", investment_budget: "", message: "" });

      // If a conversation was created, open chat
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  // After success with conversation — show chat
  if (status === "success" && conversationId) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden" style={{ height: "500px" }}>
        <ChatWindow
          conversationId={conversationId}
          onClose={() => {
            setConversationId(null);
            setStatus("idle");
          }}
          otherName={agentName || t("chat.agent")}
        />
      </div>
    );
  }

  // After success without conversation (anonymous user)
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

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-1">{t("detail.requestDetails")}</h3>
      <p className="text-sm text-gray-500 mb-6">{t("detail.formSubtitle")}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.name")}</label>
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder={t("form.namePlaceholder")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.email")}</label>
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder={t("form.emailPlaceholder")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.phone")}</label>
          <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder={t("form.phonePlaceholder")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.budget")}</label>
          <select required value={form.investment_budget} onChange={(e) => setForm({ ...form, investment_budget: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white">
            <option value="">{t("form.budgetPlaceholder")}</option>
            <option value="50000-100000">€50,000 - €100,000</option>
            <option value="100000-250000">€100,000 - €250,000</option>
            <option value="250000-500000">€250,000 - €500,000</option>
            <option value="500000+">€500,000+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.message")}</label>
          <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none" placeholder={t("form.messagePlaceholder")} />
        </div>
        <button type="submit" disabled={status === "loading"} className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {status === "loading" ? t("form.submitting") : t("form.submit")}
        </button>
        {status === "error" && <p className="text-red-500 text-sm text-center">{errorMsg || t("form.error")}</p>}
      </form>
    </div>
  );
}
