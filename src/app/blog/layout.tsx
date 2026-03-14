import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "בלוג ומדריכים",
  description: "מדריכים, טיפים וניתוחי שוק על השקעות נדל\"ן בחו\"ל. מיסוי, רגולציה, תושבות ועוד.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
