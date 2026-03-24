import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "נכסים להשקעה בחו\"ל",
  description: "חפשו נכסים להשקעה ביוון וקפריסין. סינון לפי מחיר, סוג נכס, תשואה צפויה ומיקום.",
  openGraph: {
    title: "נכסים להשקעה בחו\"ל | MANAIO",
    description: "חפשו נכסים להשקעה ביוון וקפריסין.",
  },
};

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
