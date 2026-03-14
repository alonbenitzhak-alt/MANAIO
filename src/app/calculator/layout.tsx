import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מחשבון תשואה",
  description: "חשבו את התשואה הצפויה על השקעת נדל\"ן בחו\"ל. מחשבון ROI אינטראקטיבי עם פירוט שנתי מלא.",
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
