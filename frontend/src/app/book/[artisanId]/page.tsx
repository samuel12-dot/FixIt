import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BookingClient } from "@/components/booking/BookingClient";
import type { Artisan } from "@/lib/types";

async function getArtisan(id: string) {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
  const res = await fetch(`${base}/artisans/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return ((await res.json()) as { artisan: Artisan }).artisan;
}

export default async function BookPage({ params }: { params: Promise<{ artisanId: string }> }) {
  const { artisanId } = await params;
  const artisan = await getArtisan(artisanId);
  if (!artisan) notFound();
  return (
    <Suspense>
      <BookingClient artisan={artisan} />
    </Suspense>
  );
}
