import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הצטרפו כמתווכים | MANAIO - פלטפורמת הצמדה ישראלים",
  description: "הצטרפו כשותף מייסד בחינם. קבלו לידים ישראלים מותאמים לנכסיכם. תשלום על לידים בלבד בעתיד עם 70% הנחה נעולה לתמיד.",
  keywords: ["מתווך", "נדלן ביוון", "לידים", "סוכן נדלן", "השקעה בחו\"ל", "מתווכי ביוון"],
  openGraph: {
    type: "website",
    title: "הצטרפו כמתווכים | MANAIO",
    description: "קבלו לידים ישראלים מותאמים. שימוש חינם עכשיו, 70% הנחה לתמיד.",
    images: [
      {
        url: "https://manaio.com/logo.svg",
        width: 400,
        height: 400,
        alt: "MANAIO Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "הצטרפו כמתווכים | MANAIO",
    description: "קבלו לידים ישראלים. חינם עכשיו, עמלה בעתיד עם 70% הנחה.",
  },
};

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
