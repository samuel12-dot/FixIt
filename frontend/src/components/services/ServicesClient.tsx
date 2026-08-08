"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { Category } from "@/lib/types";

export function ServicesClient({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [detailSlug, setDetailSlug] = useState(categories[0]?.slug || "");

  const filtered = filter === "all" ? categories : categories.filter((c) => c.slug === filter);
  const detail = categories.find((c) => c.slug === detailSlug) || categories[0];

  return (
    <div>
      <section className="pb-6 pt-12">
        <Container>
          <h1 className="font-display mb-2.5 text-[32px] sm:text-[40px] font-extrabold tracking-[-1.5px]">
            Services
          </h1>
          <p className="mb-7 max-w-[560px] text-[17px] leading-relaxed text-[oklch(46%_0.02_260)]">
            Browse every trade on FixIt. Every artisan verified, every price shown upfront.
          </p>
          <div className="mb-8 flex flex-wrap gap-2.5">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full border px-4.5 py-2.5 text-sm font-semibold ${
                filter === "all" ? "border-accent bg-accent-soft text-accent-dark" : "border-line bg-white text-ink-soft"
              }`}
            >
              All services
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setFilter(c.slug)}
                className={`rounded-full border px-4.5 py-2.5 text-sm font-semibold ${
                  filter === c.slug ? "border-accent bg-accent-soft text-accent-dark" : "border-line bg-white text-ink-soft"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((sv) => (
              <div
                key={sv.slug}
                onClick={() => setDetailSlug(sv.slug)}
                className={`cursor-pointer rounded-2xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                  detailSlug === sv.slug ? "border-accent" : "border-line-soft"
                }`}
              >
                <div className="mb-3.5 flex items-center gap-3">
                  <div
                    className="flex h-11.5 w-11.5 items-center justify-center rounded-xl font-display text-base font-bold"
                    style={{ background: sv.iconBg, color: sv.iconColor }}
                  >
                    {sv.abbr}
                  </div>
                  <div className="font-display text-lg font-bold">{sv.label}</div>
                </div>
                <div className="mb-4 min-h-11 text-sm leading-relaxed text-ink-soft">{sv.longDesc}</div>
                <div className="flex flex-col gap-2 border-t border-line-soft pt-3.5 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Price range</span>
                    <span className="font-bold">{sv.priceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Typical duration</span>
                    <span className="font-bold">{sv.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Available now</span>
                    <span className="font-bold text-sky-700">{sv.available} artisans</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {detail && (
        <section className="border-t border-line-soft bg-neutral-50 py-12">
          <Container>
            <div className="mb-2.5 text-[13px] font-bold uppercase tracking-wide text-accent-dark">
              Service detail
            </div>
            <div className="grid gap-9 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <div className="mb-4.5 flex items-center gap-3.5">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl font-display text-[19px] font-bold"
                    style={{ background: detail.iconBg, color: detail.iconColor }}
                  >
                    {detail.abbr}
                  </div>
                  <h2 className="font-display text-[28px] font-extrabold tracking-tight">{detail.label}</h2>
                </div>
                <p className="mb-6 text-[16px] leading-relaxed text-[oklch(46%_0.02_260)]">{detail.longDesc}</p>
                <div className="font-display mb-3 font-bold">What&apos;s included</div>
                <div className="flex flex-col gap-2.5">
                  {[
                    "On-site inspection and honest diagnosis",
                    "Upfront quote before any work begins",
                    "Escrow-protected payment",
                    "Workmanship backed by ratings",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-sm text-[oklch(38%_0.02_260)]">
                      <span className="font-bold text-green">✓</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-line-soft bg-white p-6 shadow-[0_16px_40px_-26px_oklch(40%_0.03_260_/_0.4)]">
                <div className="mb-1 text-[13px] text-ink-soft">Typical price range</div>
                <div className="font-display mb-4 text-2xl font-extrabold text-accent-dark">
                  {detail.priceRange}
                </div>
                <div className="mb-5 flex flex-col gap-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Response time</span>
                    <span className="font-bold">{detail.response}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Typical duration</span>
                    <span className="font-bold">{detail.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Available now</span>
                    <span className="font-bold text-sky-700">{detail.available} artisans</span>
                  </div>
                </div>
                <Button className="w-full" onClick={() => router.push(`/search?category=${detail.slug}`)}>
                  Find {detail.label}s
                </Button>
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
