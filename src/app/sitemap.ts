import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mymanaio.com";

const staticPages = [
  "",
  "/properties",
  "/countries",
  "/countries/greece",
  "/countries/cyprus",
  "/countries/georgia",
  "/countries/portugal",
  "/calculator",
  "/compare",
  "/blog",
  "/blog/guide-to-investing-in-greek-real-estate",
  "/blog/tax-benefits-international-real-estate",
  "/blog/georgia-emerging-market-opportunity",
  "/blog/portugal-nhr-program-explained",
  "/blog/cyprus-residency-through-investment",
  "/blog/5-mistakes-first-time-international-investors",
  "/about",
  "/how-it-works",
  "/contact",
  "/register/buyer",
  "/register/agent",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/properties" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/properties" ? 0.9 : 0.7,
  }));

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: properties } = await supabase
      .from("properties")
      .select("id, updated_at")
      .eq("status", "active");

    const propertyEntries: MetadataRoute.Sitemap = (properties || []).map((p) => ({
      url: `${BASE_URL}/properties/${p.id}`,
      lastModified: new Date(p.updated_at ?? new Date()),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticEntries, ...propertyEntries];
  } catch {
    return staticEntries;
  }
}
