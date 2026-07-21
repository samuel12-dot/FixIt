"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { categoryLabel } from "@/components/artisans/ArtisanCard";
import { apiFetch } from "@/lib/api";
import { responseMinutes } from "@/lib/response-time";
import type { Artisan, Category } from "@/lib/types";

const RATING_OPTIONS = [
  { label: "Any", value: 0 },
  { label: "3.5+", value: 3.5 },
  { label: "4.0+", value: 4 },
  { label: "4.5+", value: 4.5 },
];

export function SearchClient() {
  const params = useSearchParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);

  const initialCategory = params.get("category");
  const [selectedCats, setSelectedCats] = useState<Set<string>>(
    new Set(initialCategory ? [initialCategory] : [])
  );
  const [priceMax, setPriceMax] = useState(30000);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");

  const q = params.get("q") || "";
  const area = params.get("area") || "";

  useEffect(() => {
    Promise.all([
      apiFetch<{ categories: Category[] }>("/categories"),
      apiFetch<{ artisans: Artisan[] }>("/artisans"),
    ])
      .then(([c, a]) => {
        setCategories(c.categories);
        setArtisans(a.artisans);
      })
      .finally(() => setLoading(false));
  }, []);

  function toggleCategory(slug: string) {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  function resetFilters() {
    setSelectedCats(new Set());
    setPriceMax(30000);
    setMinRating(0);
    setVerifiedOnly(false);
  }

  const filtered = useMemo(() => {
    let list = artisans.filter((a) => {
      if (selectedCats.size > 0 && !selectedCats.has(a.category)) return false;
      if (a.priceMin > priceMax) return false;
      if (a.rating < minRating) return false;
      if (verifiedOnly && !a.verifiedId) return false;
      if (area && a.area.toLowerCase() !== area.toLowerCase()) return false;
      if (q) {
        const needle = q.toLowerCase();
        const haystack = `${a.name} ${a.category} ${a.area} ${categoryLabel(a.category)}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      return true;
    });

    list = [...list];
    switch (sortBy) {
      case "price":
        list.sort((x, y) => x.priceMin - y.priceMin);
        break;
      case "rating":
        list.sort((x, y) => y.rating - x.rating);
        break;
      case "response":
        list.sort((x, y) => responseMinutes(x.response) - responseMinutes(y.response));
        break;
      default:
        list.sort((x, y) => y.rating - x.rating || y.jobsCount - x.jobsCount);
    }
    return list;
  }, [artisans, selectedCats, priceMax, minRating, verifiedOnly, area, q, sortBy]);

  const title = area ? `Artisans in ${area}` : q ? `Results for "${q}"` : "Find an artisan";

  return (
    <section className="py-6 pb-16">
      <Container>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[28px] font-bold tracking-tight">{title}</h1>
            <div className="text-sm text-ink-soft">
              {loading ? "Loading…" : `${filtered.length} verified artisans found`}
            </div>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-[11px] border border-line bg-white px-3.5 py-2.5 text-sm"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="price">Sort: Lowest price</option>
            <option value="rating">Sort: Highest rated</option>
            <option value="response">Sort: Fastest response</option>
          </select>
        </div>

        <div className="grid gap-7 lg:grid-cols-[260px_1fr]">
          <aside>
            <div className="sticky top-[88px] rounded-2xl border border-line-soft bg-white p-5">
              <div className="mb-4 font-bold">Filters</div>
              <div className="mb-2.5 text-[13px] font-semibold text-ink-soft">Category</div>
              <div className="mb-5 flex flex-col gap-2.5">
                {categories.map((cat) => (
                  <label key={cat.slug} className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedCats.has(cat.slug)}
                      onChange={() => toggleCategory(cat.slug)}
                      className="h-4 w-4 accent-accent"
                    />
                    {cat.label}
                  </label>
                ))}
              </div>

              <div className="mb-2.5 text-[13px] font-semibold text-ink-soft">Max price: ₦{priceMax}</div>
              <input
                type="range"
                min={3000}
                max={30000}
                step={1000}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="mb-5 w-full accent-accent"
              />

              <div className="mb-2.5 text-[13px] font-semibold text-ink-soft">Minimum rating</div>
              <div className="mb-5 flex gap-1.5">
                {RATING_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setMinRating(opt.value)}
                    className={`flex-1 rounded-[9px] border py-2 text-[13px] font-semibold ${
                      minRating === opt.value
                        ? "border-accent bg-accent-soft text-accent-dark"
                        : "border-line bg-white text-ink-soft"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="h-4 w-4 accent-accent"
                />
                Verified ID only
              </label>

              <button
                onClick={resetFilters}
                className="mt-4 w-full rounded-[10px] border border-line py-2.5 text-[13px] font-semibold text-ink-soft hover:bg-neutral-50"
              >
                Reset filters
              </button>
            </div>
          </aside>

          <div className="flex flex-col gap-3.5">
            {filtered.map((a) => (
              <div
                key={a._id}
                className="flex gap-4 rounded-2xl border border-line-soft bg-white p-4.5 transition-shadow hover:shadow-lg"
              >
                <div className="flex h-[92px] w-[92px] shrink-0 items-center justify-center rounded-[14px] border border-[oklch(93%_0.01_55)] bg-[oklch(97%_0.008_55)]">
                  <span className="font-mono text-[9px] text-ink-soft">photo</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="font-bold text-[17px]">{a.name}</span>
                    {a.verifiedId && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-soft px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <div className="mb-2.5 text-[13px] text-ink-soft">
                    {categoryLabel(a.category)} · {a.area}
                  </div>
                  <div className="flex flex-wrap gap-3.5 text-[13px] text-[oklch(38%_0.02_260)]">
                    <span className="inline-flex items-center gap-1">
                      <span className="text-amber-500">★</span>
                      {a.rating} ({a.reviewsCount})
                    </span>
                    <span>
                      ₦{a.priceMin}–{a.priceMax}
                    </span>
                    <span>Responds in {a.response}</span>
                    <span>{a.distance} km away</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2">
                  <Link href={`/book/${a._id}`}>
                    <Button>Book</Button>
                  </Link>
                  <Link href={`/artisans/${a._id}`}>
                    <Button variant="secondary">Profile</Button>
                  </Link>
                </div>
              </div>
            ))}

            {!loading && filtered.length === 0 && (
              <div className="rounded-2xl border border-line-soft bg-white px-5 py-15 text-center">
                <div className="mb-1.5 font-bold">No artisans match those filters</div>
                <div className="text-sm text-ink-soft">Try widening your price range or clearing a filter.</div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
