import { LandingClient } from "@/components/landing/LandingClient";
import type { Artisan, Category } from "@/lib/types";

async function getData() {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
  try {
    const [categoriesRes, artisansRes] = await Promise.all([
      fetch(`${base}/categories`, { cache: "no-store" }),
      fetch(`${base}/artisans?sort=rating`, { cache: "no-store" }),
    ]);
    const categories: Category[] = categoriesRes.ok ? (await categoriesRes.json()).categories : [];
    const artisans: Artisan[] = artisansRes.ok ? (await artisansRes.json()).artisans : [];
    return { categories, featuredArtisans: artisans.slice(0, 6) };
  } catch {
    return { categories: [], featuredArtisans: [] };
  }
}

export default async function Home() {
  const { categories, featuredArtisans } = await getData();
  return <LandingClient categories={categories} featuredArtisans={featuredArtisans} />;
}
