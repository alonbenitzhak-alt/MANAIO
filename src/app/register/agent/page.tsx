"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AgentRegisterPage() {
  const { signIn, signUp, user } = useAuth();
  const { t, lang } = useLanguage();
  const router = useRouter();
  const [mode, setMode] = useState<"register" | "login">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [agreedToPartnership, setAgreedToPartnership] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (user) {
    router.push("/dashboard/agent");
    return null;
  }

  const isHe = lang === "he";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    const ALLOWED_EXTENSIONS = ["pdf", "jpg", "jpeg", "png", "webp"];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    const validateFile = (file: File): string | null => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return isHe ? "סוג קובץ לא מורשה. יש להעלות PDF או תמונה (JPG/PNG)" : "Invalid file type. Please upload PDF or image (JPG/PNG)";
      }
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return isHe ? "סיומת קובץ לא מורשית" : "Invalid file extension";
      }
      if (file.size > MAX_FILE_SIZE) {
        return isHe ? "הקובץ גדול מדי. גודל מקסימלי: 5MB" : "File too large. Max size: 5MB";
      }
      return null;
    };

    if (mode === "register") {
      if (!licenseFile) {
        setError(isHe ? "יש להעלות רישיון תיווך" : "Please upload your broker license");
        setLoading(false);
        return;
      }
      const licenseErr = validateFile(licenseFile);
      if (licenseErr) { setError(licenseErr); setLoading(false); return; }

      if (!idFile) {
        setError(isHe ? "יש להעלות תעודת זהות" : "Please upload your ID card");
        setLoading(false);
        return;
      }
      const idErr = validateFile(idFile);
      if (idErr) { setError(idErr); setLoading(false); return; }
      if (!agreedToPartnership) {
        setError(isHe ? "יש לאשר את הסכם השותפות" : "Please agree to the partnership agreement");
        setLoading(false);
        return;
      }

      const { error: signUpError } = await signUp(email, password, "agent");
      if (signUpError) {
        setError(signUpError);
        setLoading(false);
        return;
      }

      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setSubmitted(true);
        setLoading(false);
        return;
      }

      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          const updates: Record<string, unknown> = {
            approved: false,
            full_name: fullName,
            phone,
            company,
            partnership_signed: agreedToPartnership,
          };

          // Upload license (store path only — admin accesses via signed URL)
          const licenseExt = licenseFile.name.split(".").pop()?.toLowerCase();
          const licensePath = `${currentUser.id}/license.${licenseExt}`;
          const { data: licenseUpload } = await supabase.storage
            .from("agent-licenses")
            .upload(licensePath, licenseFile, { upsert: true });
          if (licenseUpload) {
            updates.license_url = licensePath;
          }

          // Upload ID card (store path only — admin accesses via signed URL)
          const idExt = idFile.name.split(".").pop()?.toLowerCase();
          const idPath = `${currentUser.id}/id.${idExt}`;
          const { data: idUpload } = await supabase.storage
            .from("agent-licenses")
            .upload(idPath, idFile, { upsert: true });
          if (idUpload) {
            updates.id_url = idPath;
          }

          await supabase.from("profiles").update(updates).eq("id", currentUser.id);

          fetch("/api/notify-admin-new-agent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name: fullName || email, company }),
          }).catch(() => null);
        }
      } catch {
        // Storage not configured — registration still proceeds
      }

      setSubmitted(true);
    } else {
      const { error } = await signIn(email, password);
      if (error) setError(error);
      else router.push("/dashboard/agent");
    }
    setLoading(false);
  };

  const fileInputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100";

  return (
    /* Modal overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-block mb-4">
              <img src="/logo.svg" alt="MANAIO" className="h-12 w-auto mx-auto" />
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === "register"
                ? (isHe ? "הרשמה כסוכן נדל\"ן" : "Register as Agent")
                : t("auth.signIn")}
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              {mode === "register"
                ? (isHe ? "צרו חשבון והתחילו לפרסם נכסים" : "Create an account and start listing properties")
                : t("auth.signInDesc")}
            </p>
          </div>

          {/* Pending approval screen */}
          {submitted ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-amber-800 mb-3">
                {isHe ? "הבקשה נשלחה לבדיקה" : "Application Submitted"}
              </h3>
              <p className="text-amber-700 text-sm leading-relaxed mb-4">
                {isHe
                  ? "תודה על ההרשמה! הבקשה שלכם נמצאת בבדיקה על ידי צוות MANAIO. נחזור אליכם תוך 1-2 ימי עסקים לאחר אישור רישיון התיווך וחוזה השותפות."
                  : "Thank you for registering! Your application is being reviewed by the MANAIO team. We will get back to you within 1-2 business days after verifying your broker license and partnership agreement."}
              </p>
              <p className="text-xs text-amber-600">
                {isHe ? "שאלות? צרו קשר: " : "Questions? Contact us: "}
                <a href="mailto:agents@mymanaio.com" className="font-semibold underline">agents@mymanaio.com</a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.name")}</label>
                      <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t("form.namePlaceholder")} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.phone")}</label>
                      <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t("form.phonePlaceholder")} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {isHe ? "שם חברה" : "Company Name"}
                    </label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder={isHe ? "שם החברה שלכם (לא חובה)" : "Your company name (optional)"} />
                  </div>

                  {/* Document uploads */}
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isHe ? "רישיון תיווך *" : "Broker License *"}
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setLicenseFile(e.target.files?.[0] || null)}
                        className={fileInputClass}
                        required
                      />
                      <p className="text-xs text-gray-400 mt-0.5">
                        {isHe ? "PDF, JPG או PNG — עד 5MB" : "PDF, JPG or PNG — up to 5MB"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isHe ? "תעודת זהות *" : "ID Card *"}
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setIdFile(e.target.files?.[0] || null)}
                        className={fileInputClass}
                        required
                      />
                      <p className="text-xs text-gray-400 mt-0.5">
                        {isHe ? "PDF, JPG או PNG — עד 5MB" : "PDF, JPG or PNG — up to 5MB"}
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.email")}</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t("form.emailPlaceholder")} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("auth.password")}</label>
                <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t("auth.passwordPlaceholder")} />
              </div>

              {/* Partnership Agreement */}
              {mode === "register" && (
                <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3">
                  <input
                    type="checkbox"
                    id="partnership"
                    checked={agreedToPartnership}
                    onChange={(e) => setAgreedToPartnership(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-primary-600 rounded"
                  />
                  <label htmlFor="partnership" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                    {isHe ? (
                      <>קראתי ואני מסכים/ה לתנאי{" "}
                        <Link href="/partnership" target="_blank" className="text-primary-600 font-semibold hover:underline">
                          הסכם השותפות
                        </Link>{" "}
                        עם חברת MANAIO
                      </>
                    ) : (
                      <>I have read and agree to the{" "}
                        <Link href="/partnership" target="_blank" className="text-primary-600 font-semibold hover:underline">
                          Partnership Agreement
                        </Link>{" "}
                        with MANAIO
                      </>
                    )}
                  </label>
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button type="submit" disabled={loading} className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors disabled:opacity-50">
                {loading ? t("auth.pleaseWait") : mode === "register" ? (isHe ? "שלח בקשת הרשמה" : "Submit Application") : t("auth.signIn")}
              </button>
            </form>
          )}

          {!submitted && (
            <>
              <div className="mt-5 text-center text-sm text-gray-500">
                {mode === "register" ? (
                  <>
                    {t("auth.hasAccount")}{" "}
                    <button onClick={() => { setMode("login"); setError(""); }} className="text-primary-600 font-semibold hover:underline">{t("auth.signIn")}</button>
                  </>
                ) : (
                  <>
                    {t("auth.noAccount")}{" "}
                    <button onClick={() => { setMode("register"); setError(""); }} className="text-primary-600 font-semibold hover:underline">{t("auth.signUp")}</button>
                  </>
                )}
              </div>
              <div className="mt-3 text-center">
                <Link href="/register/buyer" className="text-sm text-gray-400 hover:text-primary-600 transition-colors">
                  {isHe ? "משקיע? הירשמו כאן →" : "Investor? Register here →"}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
