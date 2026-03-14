import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          העמוד לא נמצא
        </h1>
        <p className="text-gray-500 mb-8">
          מצטערים, העמוד שחיפשתם לא קיים או שהוסר. אולי תמצאו את מה שאתם מחפשים בעמודים הבאים:
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors"
          >
            חזרה לדף הבית
          </Link>
          <Link
            href="/properties"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            צפו בנכסים
          </Link>
        </div>
      </div>
    </div>
  );
}
