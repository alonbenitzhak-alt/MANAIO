import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { LayoutWrapper } from "./layout-wrapper";

export const metadata: Metadata = {
  title: "NESTIGO - השקעות נדל\"ן גלובליות למשקיעים ישראלים",
  description:
    "הדרך שלך להשקעות בעולם. השקיעו בנכסים ביוון, קפריסין, גאורגיה ופורטוגל עם ליווי מומחים ותמחור שקוף.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Providers>
          <LayoutWrapper>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
