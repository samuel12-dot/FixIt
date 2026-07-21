import { ServicesClient } from "@/components/services/ServicesClient";
import type { Category } from "@/lib/types";

async function getCategories() {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
  try {
    const res = await fetch(`${base}/categories`, { cache: "no-store" });
    return res.ok ? ((await res.json()).categories as Category[]) : [];
  } catch {
    return [];
  }
}

export default async function ServicesPage() {
  const categories = await getCategories();
  return <ServicesClient categories={categories} />;
}
