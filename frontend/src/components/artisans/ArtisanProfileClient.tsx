"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { BackLink } from "@/components/layout/BackLink";
import { Button } from "@/components/ui/Button";
import { categoryLabel } from "./ArtisanCard";
import type { Artisan, Review } from "@/lib/types";

const TABS = [
  { id: "portfolio", label: "Portfolio" },
  { id: "reviews", label: "Reviews" },
  { id: "pricing", label: "Pricing" },
  { id: "availability", label: "Availability" },
] as const;

const NOUN: Record<string, string> = {
  electrician: "wiring",
  plumber: "pipework",
  ac: "AC unit",
  generator: "generator",
  carpenter: "furniture",
  painter: "painting",
};

export function ArtisanProfileClient({ artisan, reviews }: { artisan: Artisan; reviews: Review[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("portfolio");
  const firstName = artisan.name.split(" ")[0];
  const noun = NOUN[artisan.category] || "job";

  const pricing = [
    { service: "Call-out / inspection", min: 3000, max: 3000 },
    { service: `Standard ${noun} repair`, min: artisan.priceMin, max: Math.round(artisan.priceMin * 1.6) },
    { service: `Full ${noun} job`, min: Math.round(artisan.priceMax * 0.7), max: artisan.priceMax },
  ];

  return (
    <>
      <BackLink href="/search" label="Results" />
      <section className="py-5 pb-16">
      <Container>
        <div className="mb-6 flex flex-wrap gap-6 rounded-[20px] border border-line-soft bg-white p-7">
          <div className="flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-2xl border border-[oklch(93%_0.01_55)] bg-[oklch(97%_0.008_55)]">
            <span className="font-mono text-[10px] text-ink-soft">photo</span>
          </div>
          <div className="min-w-[230px] flex-1">
            <h1 className="font-display mb-1.5 text-[30px] font-bold tracking-tight">{artisan.name}</h1>
            <div className="mb-3.5 text-[15px] text-ink-soft">
              {categoryLabel(artisan.category)} · {artisan.area}, Lagos
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {artisan.verifiedId && (
                <>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-soft px-2.5 py-1 text-xs font-bold text-sky-700">
                    ✓ ID verified
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-soft px-2.5 py-1 text-xs font-bold text-sky-700">
                    ✓ Skill certified
                  </span>
                </>
              )}
              <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-bold text-[oklch(40%_0.02_260)]">
                {artisan.jobsCount} jobs completed
              </span>
            </div>
            <div className="flex flex-wrap gap-5 text-sm text-[oklch(38%_0.02_260)]">
              <span className="inline-flex items-center gap-1">
                <span className="text-amber-500">★</span>
                {artisan.rating} ({artisan.reviewsCount} reviews)
              </span>
              <span>Responds in {artisan.response}</span>
              <span>{artisan.distance} km away</span>
            </div>
          </div>
        </div>

        <div className="grid gap-7 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="mb-6 flex gap-1 border-b border-line-soft">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`border-b-2 px-4 py-3 text-sm font-semibold ${
                    tab === t.id ? "border-accent text-accent-dark" : "border-transparent text-ink-soft"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "portfolio" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {artisan.portfolio.map((p) => (
                  <div key={p.title} className="overflow-hidden rounded-2xl border border-line-soft bg-white">
                    <div className="flex h-[140px] items-center justify-center border-b border-[oklch(93%_0.01_55)] bg-[oklch(97%_0.008_55)]">
                      <span className="font-mono text-[10px] text-ink-soft">before/after.jpg</span>
                    </div>
                    <div className="p-3.5">
                      <div className="mb-1 font-bold text-sm">{p.title}</div>
                      <div className="text-[13px] text-ink-soft">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "reviews" && (
              <div className="flex flex-col gap-3.5">
                {reviews.map((r) => (
                  <div key={r._id} className="rounded-2xl border border-line-soft bg-white p-4">
                    <div className="mb-2 flex justify-between">
                      <span className="font-bold text-sm">{r.customerName}</span>
                      <span className="text-amber-500 text-[13px]">{"★".repeat(r.stars)}</span>
                    </div>
                    <div className="mb-1.5 text-sm leading-relaxed text-[oklch(40%_0.02_260)]">{r.text}</div>
                    <div className="text-xs text-ink-faint">
                      {new Date(r.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                ))}
                {reviews.length === 0 && <div className="text-sm text-ink-soft">No reviews yet.</div>}
              </div>
            )}

            {tab === "pricing" && (
              <div className="overflow-hidden rounded-2xl border border-line-soft bg-white">
                {pricing.map((pr) => (
                  <div
                    key={pr.service}
                    className="flex justify-between border-b border-line-soft px-4.5 py-3.5 text-sm last:border-b-0"
                  >
                    <span>{pr.service}</span>
                    <span className="font-bold">
                      ₦{pr.min}–{pr.max}
                    </span>
                  </div>
                ))}
                <div className="bg-accent-soft px-4.5 py-3.5 text-[13px] text-ink-soft">
                  Final price is confirmed after the artisan inspects the work on-site.
                </div>
              </div>
            )}

            {tab === "availability" && (
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
                {artisan.availability.map((d) => (
                  <div key={d.day} className="rounded-2xl border border-line-soft bg-white p-3">
                    <div className="mb-2 text-[13px] font-bold">{d.day}</div>
                    <div className="flex flex-col gap-1.5">
                      {d.slots.map((s) => (
                        <button
                          key={s.time}
                          disabled={s.disabled}
                          onClick={() => router.push(`/book/${artisan._id}?slot=${encodeURIComponent(`${d.day}, ${s.time}`)}`)}
                          className={`rounded-lg border p-1.5 text-xs ${
                            s.disabled
                              ? "cursor-not-allowed border-line-soft bg-neutral-50 text-ink-faint"
                              : "cursor-pointer border-line-soft bg-white text-ink hover:border-accent"
                          }`}
                        >
                          {s.time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="sticky top-[88px] rounded-2xl border border-line-soft bg-white p-5 shadow-[0_12px_32px_-22px_oklch(40%_0.03_260_/_0.3)]">
              <div className="mb-1 text-[13px] text-ink-soft">Typical price range</div>
              <div className="font-display mb-4 text-2xl font-bold">
                ₦{artisan.priceMin}–{artisan.priceMax}
              </div>
              <Button className="mb-3.5 w-full" onClick={() => router.push(`/book/${artisan._id}`)}>
                Book {firstName}
              </Button>
              <div className="flex gap-1.5 text-xs leading-relaxed text-ink-soft">
                <span className="font-bold text-green">✓</span>
                <span>Your payment is held in escrow and only released after you confirm the job is done.</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
      </section>
    </>
  );
}
