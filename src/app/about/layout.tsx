import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "אודות NESTIGO",
  description: "הכירו את NESTIGO - הפלטפורמה המובילה להשקעות נדל\"ן בינלאומיות למשקיעים ישראלים. הצוות שלנו, המשימה והחזון.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
