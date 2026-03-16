"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";
import { blogPosts } from "@/lib/blogData";

const categoryKeys = [
  { key: "all", enValue: "All" },
  { key: "guides", enValue: "Guides" },
  { key: "taxation", enValue: "Taxation" },
  { key: "marketAnalysis", enValue: "Market Analysis" },
  { key: "residency", enValue: "Residency" },
  { key: "tips", enValue: "Tips" },
];

export default function BlogPage() {
  const { t, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const baseLang = lang === "he" ? "he" : "en";
  const filtered = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category.en === selectedCategory);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-800 to-primary-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("blog.title")}</h1>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">{t("blog.subtitle")}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categoryKeys.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.enValue)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.enValue
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t(`blog.cat.${cat.key}`)}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative overflow-hidden">
                <img
                  src={post.cover}
                  alt={post.title[baseLang]}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-lg">
                  {post.category[baseLang]}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span>{new Date(post.date).toLocaleDateString(lang === "he" || lang === "ar" ? "he-IL" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                  <span>·</span>
                  <span>{post.readTime} {t("blog.minRead")}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {post.title[baseLang]}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                  {post.excerpt[baseLang]}
                </p>
                <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                  {t("blog.readMore")} →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">{t("blog.noArticles")}</p>
          </div>
        )}
      </div>
    </>
  );
}
