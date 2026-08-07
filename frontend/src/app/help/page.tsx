"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { apiFetch } from "@/lib/api";
import type { HelpArticle } from "@/lib/types";

const HELP_CATS = [
  { id: "getting-started", label: "Getting started", count: 8 },
  { id: "payments", label: "Payments & escrow", count: 11 },
  { id: "verification", label: "Verification & trust", count: 6 },
  { id: "bookings", label: "Bookings & scheduling", count: 9 },
  { id: "disputes", label: "Disputes & refunds", count: 7 },
  { id: "artisans", label: "For artisans", count: 12 },
];

export default function HelpPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("payments");
  const [articles, setArticles] = useState<HelpArticle[]>([]);
  const [popularArticles, setPopularArticles] = useState<HelpArticle[]>([]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    else params.set("cat", cat);
    apiFetch<{ articles: HelpArticle[] }>(`/help?${params.toString()}`).then((res) =>
      setArticles(res.articles)
    );
  }, [query, cat]);

  useEffect(() => {
    apiFetch<{ articles: HelpArticle[] }>("/help/popular").then((res) =>
      setPopularArticles(res.articles)
    );
  }, []);

  const heading = query ? `Results for "${query}"` : HELP_CATS.find((c) => c.id === cat)?.label || "Help";

  return (
    <div>
      <section className="border-b border-line-soft bg-[oklch(97%_0.012_158)] py-14">
        <Container className="max-w-[760px] text-center">
          <h1 className="font-display mb-4.5 text-[28px] sm:text-[38px] font-extrabold tracking-[-1.5px]">
            How can we help?
          </h1>
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search help articles…"
              className="w-full rounded-2xl border border-line px-4.5 py-4 pl-11 text-base shadow-[0_12px_32px_-18px_oklch(40%_0.03_260_/_0.3)] outline-none"
            />
            <span className="pointer-events-none absolute left-4.5 top-1/2 -translate-y-1/2 text-ink-soft">
              ⌕
            </span>
          </div>
        </Container>
      </section>

      <section className="py-10 pb-16">
        <Container className="max-w-[1100px] grid gap-9 lg:grid-cols-[240px_1fr]">
          <aside>
            <div className="mb-3 text-[13px] font-bold text-ink-soft">Categories</div>
            <div className="flex flex-col gap-1">
              {HELP_CATS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCat(c.id);
                    setQuery("");
                  }}
                  className={`flex items-center justify-between rounded-[10px] px-3.5 py-2.5 text-left text-sm ${
                    cat === c.id && !query ? "bg-accent-soft font-bold text-accent-dark" : "font-medium text-ink"
                  }`}
                >
                  <span>{c.label}</span>
                  <span className="text-xs text-ink-faint">{c.count}</span>
                </button>
              ))}
            </div>
          </aside>

          <div>
            <h2 className="font-display mb-4.5 text-xl font-bold">{heading}</h2>
            {articles.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-line px-5 py-12 text-center text-ink-soft">
                <div className="font-display mb-1.5 font-bold text-ink">No articles found</div>
                <div className="text-sm">Try different words, or contact support below.</div>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {articles.map((a) => (
                  <div
                    key={a._id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-line-soft bg-white px-4.5 py-4 text-[15px] font-semibold hover:border-accent"
                  >
                    {a.title}
                    <span className="shrink-0 text-accent-dark">→</span>
                  </div>
                ))}
              </div>
            )}

            {popularArticles.length > 0 && (
              <div className="mt-5">
                <div className="mb-3 text-[13px] font-bold text-ink-soft">Popular articles</div>
                <div className="flex flex-col gap-2">
                  {popularArticles.map((a) => (
                    <div key={a._id} className="cursor-pointer text-sm font-semibold text-accent-dark">
                      {a.title}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-emerald-950 p-7 text-white">
              <div>
                <div className="font-display mb-1 text-lg font-bold">Still need help?</div>
                <div className="text-sm text-emerald-200/90">Our support team is one message away.</div>
              </div>
              <Link href="/contact">
                <Button variant="dark">Contact support</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
