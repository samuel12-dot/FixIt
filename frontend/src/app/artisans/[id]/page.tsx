import { notFound } from "next/navigation";
import { ArtisanProfileClient } from "@/components/artisans/ArtisanProfileClient";
import type { Artisan, Review } from "@/lib/types";

async function getArtisan(id: string) {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
  const res = await fetch(`${base}/artisans/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return (await res.json()) as { artisan: Artisan; reviews: Review[] };
}

export default async function ArtisanProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getArtisan(id);
  if (!data) notFound();
  return <ArtisanProfileClient artisan={data.artisan} reviews={data.reviews} />;
}
