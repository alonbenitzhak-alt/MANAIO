"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const SUBJECTS = [
  { value: "general", label: "שאלה כללית" },
  { value: "property", label: "שאלה על נכס ספציפי" },
  { value: "agent", label: "הצטרפות כסוכן" },
  { value: "investment", label: "ייעוץ השקעות" },
  { value: "technical", label: "תקלה טכנית" },
  { value: "other", label: "אחר" },
];

export default function ContactPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [form, setForm] = useState({ subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { "Authorization": `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ subject: form.subject, message: form.message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "שגיאה בשליחה");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({ subject: "", message: "" });
    } catch {
      setErrorMsg("שגיאת רשת, נסה שנית");
      setStatus("error");
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">נדרשת כניסה לחשבון</h1>
          <p className="text-gray-500 mb-6 leading-relaxed">כדי לשלוח פנייה, יש להיות מחובר לחשבון.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/login" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
              כניסה
            </Link>
            <Link href="/register/buyer" className="border border-primary-600 text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors">
              הרשמה
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">הפנייה נשלחה בהצלחה!</h1>
          <p className="text-gray-500 mb-6">נחזור אליך בהקדם. תשובתנו תישלח לאזור האישי שלך.</p>
          <Link href="/" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
            חזרה לדף הבית
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">צור קשר</h1>
          <p className="text-gray-500">נשמח לענות על כל שאלה</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">נושא הפנייה</label>
            <select
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
            >
              <option value="">בחר נושא...</option>
              {SUBJECTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">הודעה</label>
            <textarea
              required
              rows={5}
              minLength={10}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
              placeholder="כתוב את פנייתך כאן..."
            />
          </div>

          {status === "error" && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "שולח..." : "שלח פנייה"}
          </button>
        </form>
      </div>
    </div>
  );
}
