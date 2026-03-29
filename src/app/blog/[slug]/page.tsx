"use client";

import { use } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { blogPosts } from "@/lib/blogData";
import Link from "next/link";
import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import ShareButtons from "@/components/ShareButtons";

const ALLOWED_TAGS = ["h2", "h3", "p", "strong", "em", "ul", "ol", "li", "a", "br"];
const ALLOWED_ATTRS: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "target", "rel"],
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { lang, t } = useLanguage();

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={post.cover} alt={lang === "he" ? post.title.he : post.title.en} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-lg mb-3 inline-block">
              {lang === "he" ? post.category.he : post.category.en}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              {lang === "he" ? post.title.he : post.title.en}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Meta */}
        <div className="flex items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6 flex-wrap">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>{new Date(post.date).toLocaleDateString(lang === "he" ? "he-IL" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>·</span>
            <span>{post.readTime} {t("blog.minRead")}</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{t("share.label")}</span>
            <ShareButtons title={lang === "he" ? post.title.he : post.title.en} />
          </div>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed
            prose-h2:text-xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-8 prose-h2:mb-3
            prose-p:mb-4 prose-strong:text-gray-900"
          dir={lang === "he" ? "rtl" : "ltr"}
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(lang === "he" ? post.content.he : post.content.en, {
              allowedTags: ALLOWED_TAGS,
              allowedAttributes: ALLOWED_ATTRS,
            }),
          }}
        />

        {/* CTA */}
        <div className="mt-12 bg-primary-50 border border-primary-100 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-primary-800 mb-2">
            {lang === "he" ? "מוכנים להתחיל להשקיע?" : "Ready to Start Investing?"}
          </h3>
          <p className="text-primary-600 mb-4">
            {lang === "he" ? "עיינו בנכסים הזמינים ומצאו את ההשקעה המתאימה לכם" : "Browse available properties and find the right investment for you"}
          </p>
          <Link href="/properties" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors inline-block">
            {t("nav.browseInvestments")}
          </Link>
        </div>

        {/* More Articles */}
        {otherPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              {lang === "he" ? "מאמרים נוספים" : "More Articles"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherPosts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <img src={p.cover} alt={lang === "he" ? p.title.he : p.title.en} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="p-4">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {lang === "he" ? p.title.he : p.title.en}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{p.readTime} {t("blog.minRead")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <Link href="/blog" className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
            ← {lang === "he" ? "חזרה לבלוג" : "Back to Blog"}
          </Link>
        </div>
      </div>
    </>
  );
}
