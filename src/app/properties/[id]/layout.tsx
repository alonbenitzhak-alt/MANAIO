import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mymanaio.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: p } = await supabase
      .from("properties")
      .select("title, title_he, description, description_he, images, price, country, city")
      .eq("id", id)
      .single();

    if (!p) return { title: "נכס להשקעה | MANAIO" };

    const title = p.title_he || p.title;
    const location = [p.city, p.country].filter(Boolean).join(", ");
    const fullTitle = `${title} – ${location} | MANAIO`;
    const rawDesc = p.description_he || p.description || "";
    const description =
      rawDesc.slice(0, 155) ||
      `נכס להשקעה ב${location}. מחיר: €${p.price?.toLocaleString()}`;
    const image = p.images?.[0];

    return {
      title: fullTitle,
      description,
      openGraph: {
        title: fullTitle,
        description,
        url: `${BASE_URL}/properties/${id}`,
        ...(image && { images: [{ url: image, width: 1200, height: 630, alt: title }] }),
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: fullTitle,
        description,
        ...(image && { images: [image] }),
      },
    };
  } catch {
    return { title: "נכס להשקעה | MANAIO" };
  }
}

export default function PropertyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
