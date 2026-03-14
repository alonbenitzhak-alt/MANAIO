import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "נכסים להשקעה בחו\"ל",
  description: "חפשו נכסים להשקעה ביוון, קפריסין, גאורגיה ופורטוגל. סינון לפי מחיר, סוג נכס, תשואה צפויה ומיקום.",
  openGraph: {
    title: "נכסים להשקעה בחו\"ל | NESTIGO",
    description: "חפשו נכסים להשקעה ביוון, קפריסין, גאורגיה ופורטוגל.",
  },
};

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
