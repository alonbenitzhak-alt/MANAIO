"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const SUBJECTS = [
  { he: "שאלה כללית", en: "General Question", el: "Γενική Ερώτηση", ru: "Общий вопрос", ar: "سؤال عام", value: "general" },
  { he: "שאלה על נכס ספציפי", en: "Question about Property", el: "Ερώτηση για Ακίνητο", ru: "Вопрос о недвижимости", ar: "سؤال عن العقار", value: "property" },
  { he: "הצטרפות כסוכן", en: "Join as Agent", el: "Εγγραφή ως Πράκτορας", ru: "Присоединиться как агент", ar: "الانضمام كوكيل", value: "agent" },
  { he: "ייעוץ השקעות", en: "Investment Advice", el: "Συμβουλές Επένδυσης", ru: "Инвестиционные консультации", ar: "استشارات الاستثمار", value: "investment" },
  { he: "תקלה טכנית", en: "Technical Issue", el: "Τεχνικό Ζήτημα", ru: "Техническая проблема", ar: "مشكلة تقنية", value: "technical" },
  { he: "אחר", en: "Other", el: "Άλλο", ru: "Другое", ar: "آخر", value: "other" },
];

export default function ContactPage() {
  const { t, lang } = useLanguage();
  const { user, profile } = useAuth();
  const adminWhatsapp = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "972586836555";
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

  // Helper to get subject label in current language
  const getSubjectLabel = (value: string) => {
    const subject = SUBJECTS.find(s => s.value === value);
    return subject ? (subject[lang as keyof typeof subject] || subject.en) : value;
  };

  // Show quick contact options even without login
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          {/* Left side: Contact info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {lang === "he" && "צור קשר"}
              {lang === "en" && "Get in Touch"}
              {lang === "el" && "Επικοινωνία"}
              {lang === "ru" && "Связаться с нами"}
              {lang === "ar" && "تواصل معنا"}
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {lang === "he" && "יש לך שאלה? אנו כאן כדי לעזור לך. צור קשר איתנו דרך WhatsApp או השתתף בטופס להלן."}
              {lang === "en" && "Have a question? We're here to help. Contact us via WhatsApp or fill out the form below."}
              {lang === "el" && "Έχετε ερώτηση; Είμαστε εδώ για να σας βοηθήσουμε. Επικοινωνήστε μαζί μας μέσω WhatsApp ή συμπληρώστε την παρακάτω φόρμα."}
              {lang === "ru" && "У вас есть вопрос? Мы здесь, чтобы помочь. Свяжитесь с нами через WhatsApp или заполните форму ниже."}
              {lang === "ar" && "هل لديك سؤال؟ نحن هنا للمساعدة. اتصل بنا عبر WhatsApp أو ملء النموذج أدناه."}
            </p>

            {/* WhatsApp button */}
            <a
              href={`https://wa.me/${adminWhatsapp.replace(/\s+/g, "").replace(/^\+/, "")}?text=${encodeURIComponent(
                lang === "he" ? "שלום, יש לי שאלה על MANAIO" :
                lang === "en" ? "Hello, I have a question about MANAIO" :
                lang === "el" ? "Γεια σας, έχω μια ερώτηση σχετικά με το MANAIO" :
                lang === "ru" ? "Привет, у меня есть вопрос о MANAIO" :
                "مرحبا، لدي سؤال حول MANAIO"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors mb-6"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.934c-4.487 2.59-5.968 7.093-5.968 7.093s1.503 4.477 7.093 5.968c.929.305 1.929.465 2.965.465a9.87 9.87 0 004.27-.933s4.477-1.503 5.968-7.093c-.001 0-1.504-4.477-7.093-5.968" />
              </svg>
              {lang === "he" && "צור קשר ב-WhatsApp"}
              {lang === "en" && "Contact us via WhatsApp"}
              {lang === "el" && "Επικοινωνήστε μέσω WhatsApp"}
              {lang === "ru" && "Связаться через WhatsApp"}
              {lang === "ar" && "تواصل عبر WhatsApp"}
            </a>

            <p className="text-sm text-gray-500">
              {lang === "he" && "או התחברו כדי לשלוח פנייה רשמית:"}
              {lang === "en" && "Or sign in to submit a formal inquiry:"}
              {lang === "el" && "Ή συνδεθείτε για να υποβάλετε επίσημη αίτηση:"}
              {lang === "ru" && "Или войдите, чтобы отправить официальный запрос:"}
              {lang === "ar" && "أو تسجيل الدخول لتقديم طلب رسمي:"}
            </p>
            <div className="flex gap-3 mt-4">
              <Link href="/login" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
                {lang === "he" && "כניסה"}
                {lang === "en" && "Sign In"}
                {lang === "el" && "Σύνδεση"}
                {lang === "ru" && "Войти"}
                {lang === "ar" && "تسجيل الدخول"}
              </Link>
              <Link href="/register/buyer" className="border border-primary-600 text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors">
                {lang === "he" && "הרשמה"}
                {lang === "en" && "Sign Up"}
                {lang === "el" && "Εγγραφή"}
                {lang === "ru" && "Зарегистрироваться"}
                {lang === "ar" && "التسجيل"}
              </Link>
            </div>
          </div>

          {/* Right side: Contact form for logged-in users */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {lang === "he" && "שליחת הודעה"}
              {lang === "en" && "Send a Message"}
              {lang === "el" && "Αποστολή Μηνύματος"}
              {lang === "ru" && "Отправить Сообщение"}
              {lang === "ar" && "إرسال رسالة"}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {lang === "he" && "התחברו כדי לשלוח הודעה רשמית"}
              {lang === "en" && "Sign in to send a formal message"}
              {lang === "el" && "Συνδεθείτε για να αποστείλετε επίσημο μήνυμα"}
              {lang === "ru" && "Войдите, чтобы отправить официальное сообщение"}
              {lang === "ar" && "تسجيل الدخول لإرسال رسالة رسمية"}
            </p>
            <Link href="/login" className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors inline-block text-center">
              {lang === "he" && "כניסה כדי לשלוח הודעה"}
              {lang === "en" && "Sign In to Send"}
              {lang === "el" && "Σύνδεση για Αποστολή"}
              {lang === "ru" && "Войти для отправки"}
              {lang === "ar" && "تسجيل الدخول للإرسال"}
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
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {lang === "he" && "הפנייה נשלחה בהצלחה!"}
            {lang === "en" && "Message Sent Successfully!"}
            {lang === "el" && "Το μήνυμα στάλθηκε με επιτυχία!"}
            {lang === "ru" && "Сообщение отправлено успешно!"}
            {lang === "ar" && "تم إرسال الرسالة بنجاح!"}
          </h1>
          <p className="text-gray-500 mb-6">
            {lang === "he" && "נחזור אליך בהקדם. תשובתנו תישלח לאזור האישי שלך."}
            {lang === "en" && "We'll get back to you soon. Our response will be sent to your account."}
            {lang === "el" && "Θα επιστρέψουμε σύντομα. Η απάντησή μας θα σταλεί στο λογαριασμό σας."}
            {lang === "ru" && "Мы свяжемся с вами в ближайшее время. Наш ответ будет отправлен на ваш аккаунт."}
            {lang === "ar" && "سنتواصل معك قريباً. سيتم إرسال ردنا إلى حسابك."}
          </p>
          <Link href="/" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
            {lang === "he" && "חזרה לדף הבית"}
            {lang === "en" && "Back to Home"}
            {lang === "el" && "Επιστροφή στην Αρχική"}
            {lang === "ru" && "Вернуться на главную"}
            {lang === "ar" && "العودة إلى الصفحة الرئيسية"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Form */}
        <div>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {lang === "he" && "צור קשר"}
              {lang === "en" && "Contact Us"}
              {lang === "el" && "Επικοινωνία"}
              {lang === "ru" && "Свяжитесь с нами"}
              {lang === "ar" && "تواصل معنا"}
            </h1>
            <p className="text-gray-600">
              {lang === "he" && "נשמח לענות על כל שאלה"}
              {lang === "en" && "We'd love to answer any questions"}
              {lang === "el" && "Χαιρόμαστε να απαντήσουμε σε οποιεσδήποτε ερωτήσεις"}
              {lang === "ru" && "Мы рады ответить на любые вопросы"}
              {lang === "ar" && "يسعدنا الإجابة على أي أسئلة"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-5">
            {/* Auto-filled sender info */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
              <div className="w-9 h-9 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                {(profile?.full_name || user.email || "?").charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{profile?.full_name || "—"}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
              <span className="ml-auto text-xs text-gray-400 shrink-0">
                {lang === "he" && "ממלא אוטומטית"}
                {lang === "en" && "Auto-filled"}
                {lang === "el" && "Αυτόματη συμπλήρωση"}
                {lang === "ru" && "Заполняется автоматически"}
                {lang === "ar" && "ملء تلقائي"}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === "he" && "נושא הפנייה"}
                {lang === "en" && "Subject"}
                {lang === "el" && "Θέμα"}
                {lang === "ru" && "Тема"}
                {lang === "ar" && "الموضوع"}
              </label>
              <select
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
              >
                <option value="">
                  {lang === "he" && "בחר נושא..."}
                  {lang === "en" && "Select a subject..."}
                  {lang === "el" && "Επιλέξτε ένα θέμα..."}
                  {lang === "ru" && "Выберите тему..."}
                  {lang === "ar" && "اختر موضوعاً..."}
                </option>
                {SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value}>{getSubjectLabel(s.value)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang === "he" && "הודעה"}
                {lang === "en" && "Message"}
                {lang === "el" && "Μήνυμα"}
                {lang === "ru" && "Сообщение"}
                {lang === "ar" && "الرسالة"}
              </label>
              <textarea
                required
                rows={5}
                minLength={10}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                placeholder={
                  lang === "he" ? "כתוב את פנייתך כאן..." :
                  lang === "en" ? "Write your message here..." :
                  lang === "el" ? "Γράψτε το μήνυμά σας εδώ..." :
                  lang === "ru" ? "Напишите здесь свое сообщение..." :
                  "اكتب رسالتك هنا..."
                }
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
              {lang === "he" && (status === "loading" ? "שולח..." : "שלח פנייה")}
              {lang === "en" && (status === "loading" ? "Sending..." : "Send Message")}
              {lang === "el" && (status === "loading" ? "Αποστολή..." : "Αποστολή Μηνύματος")}
              {lang === "ru" && (status === "loading" ? "Отправка..." : "Отправить")}
              {lang === "ar" && (status === "loading" ? "جاري الإرسال..." : "إرسال")}
            </button>
          </form>
        </div>

        {/* Right side: Quick contact via WhatsApp */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200 flex flex-col justify-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
              <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.934c-4.487 2.59-5.968 7.093-5.968 7.093s1.503 4.477 7.093 5.968c.929.305 1.929.465 2.965.465a9.87 9.87 0 004.27-.933s4.477-1.503 5.968-7.093c-.001 0-1.504-4.477-7.093-5.968" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {lang === "he" && "צור קשר ישירות"}
              {lang === "en" && "Quick Contact"}
              {lang === "el" && "Γρήγορη Επικοινωνία"}
              {lang === "ru" && "Быстрая связь"}
              {lang === "ar" && "تواصل سريع"}
            </h2>
            <p className="text-gray-700 mb-6">
              {lang === "he" && "אם תרצה לשוחח איתנו במהירות, פנה אלינו ב-WhatsApp"}
              {lang === "en" && "If you want to chat with us quickly, reach out via WhatsApp"}
              {lang === "el" && "Αν θέλετε να μιλήσετε μαζί μας γρήγορα, επικοινωνήστε μέσω WhatsApp"}
              {lang === "ru" && "Если вы хотите быстро пообщаться с нами, свяжитесь через WhatsApp"}
              {lang === "ar" && "إذا كنت تريد الدردشة معنا بسرعة، اتصل بنا عبر WhatsApp"}
            </p>
          </div>

          <a
            href={`https://wa.me/${adminWhatsapp.replace(/\s+/g, "").replace(/^\+/, "")}?text=${encodeURIComponent(
              lang === "he" ? "שלום, יש לי שאלה" :
              lang === "en" ? "Hello, I have a question" :
              lang === "el" ? "Γεια σας, έχω μια ερώτηση" :
              lang === "ru" ? "Привет, у меня есть вопрос" :
              "مرحبا، لدي سؤال"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.934c-4.487 2.59-5.968 7.093-5.968 7.093s1.503 4.477 7.093 5.968c.929.305 1.929.465 2.965.465a9.87 9.87 0 004.27-.933s4.477-1.503 5.968-7.093c-.001 0-1.504-4.477-7.093-5.968" />
            </svg>
            {lang === "he" && "שוחח בוואצאפ"}
            {lang === "en" && "Chat on WhatsApp"}
            {lang === "el" && "Συνομιλία στο WhatsApp"}
            {lang === "ru" && "Чат в WhatsApp"}
            {lang === "ar" && "الدردشة على WhatsApp"}
          </a>

          <p className="text-sm text-gray-600 mt-6 text-center">
            {lang === "he" && "זמן תגובה בדרך כלל: פחות מ-1 שעה"}
            {lang === "en" && "Typical response time: Less than 1 hour"}
            {lang === "el" && "Συνήθης χρόνος απάντησης: Λιγότερο από 1 ώρα"}
            {lang === "ru" && "Типичное время ответа: менее 1 часа"}
            {lang === "ar" && "وقت الرد العادي: أقل من ساعة واحدة"}
          </p>
        </div>
      </div>
    </div>
  );
}
