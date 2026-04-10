"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const MAX_QUESTIONS = 10;

const QUICK_QUESTIONS: Record<string, string[]> = {
  he: [
    "מה התשואה הצפויה ביוון?",
    "איך עובדת ויזת הזהב?",
    "מה עדיף — יוון או קפריסין?",
    "מה עלויות הרכישה?",
  ],
  en: [
    "What are the expected yields in Greece?",
    "How does the Golden Visa work?",
    "Greece or Cyprus — which is better?",
    "What are the buying costs?",
  ],
  el: [
    "Ποιες είναι οι αναμενόμενες αποδόσεις στην Ελλάδα;",
    "Πώς λειτουργεί η Golden Visa;",
    "Ελλάδα ή Κύπρος — τι είναι καλύτερο;",
    "Ποιο είναι το κόστος αγοράς;",
  ],
  ru: [
    "Какова ожидаемая доходность в Греции?",
    "Как работает Золотая виза?",
    "Греция или Кипр — что лучше?",
    "Какие расходы при покупке?",
  ],
  ar: [
    "ما العوائد المتوقعة في اليونان؟",
    "كيف تعمل التأشيرة الذهبية؟",
    "اليونان أم قبرص — أيهما أفضل؟",
    "ما تكاليف الشراء؟",
  ],
};

export default function AIChatWidget() {
  const { profile, loading } = useAuth();
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // WhatsApp configuration - update with your company's WhatsApp number
  const whatsappNumber = "972501234567"; // Replace with actual WhatsApp number
  const whatsappMessage = encodeURIComponent(
    lang === "he" ? "שלום, אני מעוניין בעזרה בנושא השקעה" :
    lang === "el" ? "Γεια σας, ενδιαφέρομαι να λάβω βοήθεια σχετικά με μια επένδυση" :
    lang === "ru" ? "Привет, я заинтересован в помощи по инвестициям" :
    lang === "ar" ? "مرحبا، أنا مهتم بالمساعدة فيما يتعلق بالاستثمار" :
    "Hello, I'm interested in getting help with investments"
  );
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const userMessages = messages.filter((m) => m.role === "user").length;
  const limitReached = userMessages >= MAX_QUESTIONS;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  if (loading || !profile) return null;

  const sendMessage = async (text: string) => {
    if (!text.trim() || thinking || limitReached) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setThinking(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: t("ai.chat.error") }]);
    } finally {
      setThinking(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const quickQuestions = QUICK_QUESTIONS[lang] || QUICK_QUESTIONS.en;
  const remaining = MAX_QUESTIONS - userMessages;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {/* WhatsApp Button */}
      {showWhatsApp && (
        <div className="relative group">
          <a
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center text-white"
            title="Chat on WhatsApp"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378l-.361.214-3.741-.982.998 3.645-.235.364a9.864 9.864 0 001.512 5.147l.359.361 3.699.914-1.035-3.982.313-.368a5.92 5.92 0 002.84-5.119c0-3.263-2.612-5.9-5.81-5.9m7.021-.188c1.675.029 3.29.703 4.533 1.968 1.243 1.266 1.94 2.881 1.91 4.556-.034 3.639-3.043 6.628-6.679 6.628h-.016c-1.088-.02-2.159-.225-3.168-.601l-3.652.964 1.04-3.797c-.609-1.231-.942-2.601-.922-4.042.030-3.639 3.043-6.628 6.679-6.628l.036.001z" />
            </svg>
          </a>
          <button
            onClick={() => setShowWhatsApp(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-400 text-white rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ×
          </button>
        </div>
      )}

      {open && (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden" style={{ height: 500 }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-800 to-primary-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{t("ai.chat.title")}</p>
                <p className="text-primary-200 text-xs">{t("ai.chat.subtitle")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-200 text-xs">{remaining}/{MAX_QUESTIONS}</span>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" dir="rtl">
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="text-center py-4">
                  <p className="text-sm font-medium text-gray-700">{t("ai.chat.askTitle")}</p>
                  <p className="text-xs text-gray-400 mt-1">{t("ai.chat.askSubtitle")}</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="text-right text-sm bg-white border border-gray-200 hover:border-primary-400 hover:bg-primary-50 text-gray-700 px-3 py-2.5 rounded-xl transition-colors leading-snug"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[82%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary-600 text-white rounded-br-sm"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-end">
                <div className="bg-white border border-gray-200 px-4 py-2.5 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            {limitReached && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                <p className="text-xs text-amber-700 font-medium mb-2">
                  {lang === "he" ? "הגעת למגבלת השאלות בשיחה זו" :
                   lang === "el" ? "Έφτασες το όριο ερωτήσεων" :
                   lang === "ru" ? "Достигнут лимит вопросов" :
                   lang === "ar" ? "وصلت إلى حد الأسئلة" :
                   "You've reached the question limit for this session"}
                </p>
                <a
                  href="/contact"
                  className="text-xs font-semibold text-primary-600 underline"
                >
                  {lang === "he" ? "פנה אלינו לייעוץ מעמיק" :
                   lang === "el" ? "Επικοινωνήστε για εκτεταμένη συμβουλή" :
                   lang === "ru" ? "Свяжитесь с нами для детальной консультации" :
                   lang === "ar" ? "تواصل معنا للحصول على استشارة مفصلة" :
                   "Contact us for in-depth advice"}
                </a>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {!limitReached && (
            <form onSubmit={handleSend} className="p-3 border-t border-gray-200 bg-white flex gap-2" dir="rtl">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("ai.chat.placeholder")}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                disabled={thinking}
              />
              <button type="submit" disabled={!input.trim() || thinking}
                className="bg-primary-600 text-white px-3 py-2 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50">
                <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          )}
        </div>
      )}

      {/* Bubble button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 bg-gradient-to-br from-primary-700 to-primary-500 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center text-white"
        title={t("ai.chat.buttonTitle")}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )}
      </button>
    </div>
  );
}
