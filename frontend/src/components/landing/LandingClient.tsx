"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArtisanCard } from "@/components/artisans/ArtisanCard";
import {
  CALC_BASE,
  FAQS,
  HIW_CUSTOMER,
  LAGOS_AREAS,
  SERVICE_SUGGESTIONS,
  TESTIMONIALS,
  URGENCY_MULT,
  URGENCY_OPTIONS,
} from "@/lib/constants";
import type { Artisan, Category } from "@/lib/types";

const STATS = [
  { value: "2,400+", label: "Verified artisans" },
  { value: "18,600", label: "Jobs completed" },
  { value: "₦480M", label: "Protected in escrow" },
  { value: "4.8 ★", label: "Average rating" },
];

const TRUST = [
  { icon: "✓", title: "Verified artisans only", text: "Every artisan's government ID and skill certification is checked before they can take jobs." },
  { icon: "₦", title: "Escrow-held payment", text: "Your money is held securely and released to the artisan only once you confirm the job is done." },
  { icon: "★", title: "Honest ratings", text: "Reviews come only from customers who booked and paid through FixIt — no fake ratings." },
];

function formatNaira(n: number) {
  return `₦${Math.round(n / 500) * 500}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace("₦,", "₦");
}

export function LandingClient({
  categories,
  featuredArtisans,
}: {
  categories: Category[];
  featuredArtisans: Artisan[];
}) {
  const router = useRouter();
  const [service, setService] = useState("");
  const [area, setArea] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [calcCategory, setCalcCategory] = useState(categories[0]?.slug || "ac");
  const [calcUrgency, setCalcUrgency] = useState<string>("Standard");
  const carouselRef = useRef<HTMLDivElement>(null);

  const suggestions = service
    ? SERVICE_SUGGESTIONS.filter((s) => s.toLowerCase().includes(service.toLowerCase())).slice(0, 5)
    : SERVICE_SUGGESTIONS.slice(0, 5);

  function doSearch(q?: string, a?: string) {
    const params = new URLSearchParams();
    if (q ?? service) params.set("q", q ?? service);
    if (a ?? area) params.set("area", a ?? area);
    router.push(`/search?${params.toString()}`);
  }

  const calcRange = CALC_BASE[calcCategory] || [4000, 15000];
  const mult = URGENCY_MULT[calcUrgency] || 1;
  const calcLabel = categories.find((c) => c.slug === calcCategory)?.label || "service";

  function scrollCarousel(dir: number) {
    carouselRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  return (
    <div>
      {/* HERO */}
      <section className="pt-16 pb-12">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <Badge tone="accent" className="mb-5">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green text-[10px] text-white">
                ✓
              </span>
              2,400+ verified artisans in Lagos
            </Badge>
            <h1 className="font-display mb-4 text-[38px] sm:text-[54px] font-extrabold leading-[1.02] tracking-[-1.5px]">
              Get it fixed right, the first time.
            </h1>
            <p className="mb-8 max-w-[500px] text-[17px] sm:text-[18px] leading-relaxed text-ink-soft">
              Book verified electricians, plumbers, AC and generator technicians across Lagos. Clear pricing
              upfront — your payment stays protected until the job is done.
            </p>

            <div className="relative flex flex-wrap gap-2 rounded-2xl border border-line bg-white p-2 shadow-[0_12px_32px_-14px_oklch(40%_0.03_260_/_0.25)]">
              <div className="relative min-w-[180px] flex-1">
                <input
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  placeholder="What do you need fixed?"
                  className="w-full rounded-[11px] bg-neutral-50 px-3.5 py-3.5 text-[15px] outline-none"
                />
                {showSuggestions && (
                  <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 rounded-xl border border-line-soft bg-white p-1.5 shadow-xl">
                    {suggestions.map((s) => (
                      <div
                        key={s}
                        onMouseDown={() => {
                          setService(s);
                          doSearch(s);
                        }}
                        className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-accent-soft"
                      >
                        <span className="text-ink-faint">⌕</span>
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative min-w-[150px]">
                <button
                  onClick={() => setLocationOpen((v) => !v)}
                  className="flex h-full w-full items-center justify-between gap-2 rounded-[11px] bg-neutral-50 px-3.5 py-3.5 text-[15px] text-ink"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-accent">◍</span>
                    {area || "All areas"}
                  </span>
                  <span className="text-[10px] text-ink-faint">▾</span>
                </button>
                {locationOpen && (
                  <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 min-w-[180px] rounded-xl border border-line-soft bg-white p-1.5 shadow-xl">
                    {LAGOS_AREAS.map((loc) => (
                      <div
                        key={loc}
                        onClick={() => {
                          setArea(loc);
                          setLocationOpen(false);
                        }}
                        className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-accent-soft"
                      >
                        {loc}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button onClick={() => doSearch()} size="lg">
                Search
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-6">
              <div className="flex items-center gap-1.5 text-sm text-ink-soft">
                <span className="font-bold text-green">✓</span>ID-verified artisans
              </div>
              <div className="flex items-center gap-1.5 text-sm text-ink-soft">
                <span className="font-bold text-green">✓</span>Escrow-protected payment
              </div>
              <div className="flex items-center gap-1.5 text-sm text-ink-soft">
                <span className="font-bold text-amber-500">★</span>Real customer ratings
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[22px] border border-[oklch(92%_0.01_55)] bg-[oklch(97%_0.008_55)]">
            <Image
              src="/images/artisan-at-work.png"
              alt="Artisan at work"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-5 left-5 flex items-center gap-2.5 rounded-2xl bg-white p-3.5 shadow-lg">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-soft font-bold text-emerald-700">
                ✓
              </div>
              <div>
                <div className="text-[13px] font-bold">Verified & insured</div>
                <div className="text-xs text-ink-soft">Every artisan, every job</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* STATS */}
      <section>
        <Container>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line-soft bg-line-soft sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white p-6">
                <div className="font-display text-[28px] font-extrabold tracking-tight text-accent-dark">
                  {s.value}
                </div>
                <div className="mt-0.5 text-[13px] text-ink-soft">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CATEGORIES */}
      <section className="py-14">
        <Container>
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight">Popular services</h2>
            <Link href="/services" className="text-sm font-semibold text-accent-dark">
              View all services →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <div
                key={cat._id}
                onClick={() => router.push(`/search?category=${cat.slug}`)}
                onMouseEnter={() => setHovered(cat.slug)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer rounded-2xl border border-line-soft bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl font-display text-[16px] font-bold"
                  style={{ background: cat.iconBg, color: cat.iconColor }}
                >
                  {cat.abbr}
                </div>
                <div className="mb-1 font-bold">{cat.label}</div>
                <div className="text-[13px] text-ink-soft">{cat.desc}</div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    hovered === cat.slug ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="mt-3.5 flex flex-col gap-2 border-t border-line-soft pt-3.5 text-[13px]">
                    <div className="flex justify-between">
                      <span className="text-ink-soft">Typical price</span>
                      <span className="font-bold">{cat.priceRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-soft">Responds in</span>
                      <span className="font-bold">{cat.response}</span>
                    </div>
                    <div className="mt-1 font-bold text-accent-dark">Browse {cat.label}s →</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TRUST */}
      <section className="border-y border-line-soft bg-neutral-50">
        <Container className="py-14">
          <h2 className="font-display mb-1.5 text-2xl font-bold tracking-tight">Why Lagos trusts FixIt</h2>
          <p className="mb-8 text-[15px] text-ink-soft">The old problems with hiring artisans — solved.</p>
          <div className="grid gap-5 sm:grid-cols-3">
            {TRUST.map((t) => (
              <div key={t.title} className="rounded-2xl border border-line-soft bg-white p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-lg font-bold text-accent-dark">
                  {t.icon}
                </div>
                <div className="mb-1.5 font-bold">{t.title}</div>
                <div className="text-sm leading-relaxed text-ink-soft">{t.text}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-b border-line-soft bg-neutral-50">
        <Container className="py-14">
          <h2 className="font-display mb-1.5 text-2xl font-bold tracking-tight">What customers say</h2>
          <p className="mb-8 text-[15px] text-ink-soft">Real reviews from real Lagos jobs.</p>
          <div className="grid gap-5 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-line-soft bg-white p-6">
                <div className="mb-3 text-amber-500">{"★".repeat(t.stars)}</div>
                <div className="mb-4 text-[15px] leading-relaxed text-[oklch(34%_0.02_260)]">
                  &ldquo;{t.text}&rdquo;
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft font-bold text-accent-dark">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-xs text-ink-soft">{t.area}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* COVERAGE */}
      <section className="py-14">
        <Container>
          <h2 className="font-display mb-1.5 text-2xl font-bold tracking-tight">Available across Lagos</h2>
          <p className="mb-6 text-[15px] text-ink-soft">Verified artisans on the mainland and island.</p>
          <div className="flex flex-wrap gap-2.5">
            {LAGOS_AREAS.map((a) => (
              <div
                key={a}
                onClick={() => doSearch("", a)}
                className="cursor-pointer rounded-full border border-line px-4.5 py-2 text-sm font-medium text-[oklch(38%_0.02_260)] transition-colors hover:border-accent hover:text-accent-dark"
              >
                {a}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14">
        <Container>
          <h2 className="font-display mb-1.5 text-2xl font-bold tracking-tight">How it works</h2>
          <p className="mb-10 text-[15px] text-ink-soft">Four simple steps from broken to fixed.</p>
          <div className="relative grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-[8%] right-[8%] top-[26px] hidden h-0.5 bg-line lg:block" />
            {HIW_CUSTOMER.map((step, i) => (
              <div key={step.num} className="relative">
                <div
                  className={`mb-4 flex h-[54px] w-[54px] items-center justify-center rounded-full border-4 border-white font-display text-xl font-extrabold text-white shadow-[0_0_0_1px_oklch(90%_0.02_158)] ${
                    i === 3 ? "bg-green" : "bg-accent"
                  }`}
                >
                  {i === 3 ? "✓" : step.num}
                </div>
                <div className="font-display mb-2 font-bold">{step.title}</div>
                <div className="text-sm leading-relaxed text-ink-soft">{step.text}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURED ARTISANS */}
      {featuredArtisans.length > 0 && (
        <section className="py-10">
          <Container>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display mb-1.5 text-2xl font-bold tracking-tight">
                  Top-rated artisans this week
                </h2>
                <p className="text-[15px] text-ink-soft">Verified professionals your neighbours are booking.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCarousel(-1)}
                  className="flex h-10.5 w-10.5 items-center justify-center rounded-full border border-line bg-white hover:border-accent"
                >
                  ←
                </button>
                <button
                  onClick={() => scrollCarousel(1)}
                  className="flex h-10.5 w-10.5 items-center justify-center rounded-full border border-line bg-white hover:border-accent"
                >
                  →
                </button>
              </div>
            </div>
            <div ref={carouselRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-5 snap-x [scrollbar-width:none]">
              {featuredArtisans.map((a) => (
                <ArtisanCard key={a._id} artisan={a} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* PRICE CALCULATOR */}
      <section className="py-10">
        <Container>
          <div className="grid items-center gap-9 rounded-[24px] border border-line-soft bg-neutral-50 p-8 sm:p-10 lg:grid-cols-2">
            <div>
              <Badge tone="accent" className="mb-4">
                Price transparency
              </Badge>
              <h2 className="font-display mb-2.5 text-[28px] font-bold tracking-tight">
                Know the price before you sign up.
              </h2>
              <p className="mb-6 text-[15px] leading-relaxed text-ink-soft">
                Pick a service and urgency to see a realistic estimate. No account needed, no surprises later.
              </p>
              <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Service</label>
              <select
                value={calcCategory}
                onChange={(e) => setCalcCategory(e.target.value)}
                className="mb-4.5 w-full rounded-[11px] border border-line bg-white px-3.5 py-3 text-[15px]"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </select>
              <label className="mb-2 block text-[13px] font-semibold text-ink-soft">Urgency</label>
              <div className="flex flex-wrap gap-2.5">
                {URGENCY_OPTIONS.map((u) => (
                  <button
                    key={u}
                    onClick={() => setCalcUrgency(u)}
                    className={`rounded-[10px] px-4 py-2.5 text-[13px] font-semibold border ${
                      calcUrgency === u
                        ? "border-accent bg-accent-soft text-accent-dark"
                        : "border-line bg-white text-ink-soft"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-[18px] border border-line bg-white p-8 text-center shadow-[0_16px_40px_-26px_oklch(40%_0.03_260_/_0.4)]">
              <div className="mb-1.5 text-[13px] text-ink-soft">Estimated range for {calcLabel}</div>
              <div className="font-display mb-2 text-[34px] font-extrabold tracking-tight text-accent-dark">
                {formatNaira(calcRange[0] * mult)}–{formatNaira(calcRange[1] * mult)}
              </div>
              <div className="mb-5.5 text-[13px] leading-relaxed text-ink-soft">
                Includes call-out. Final price is confirmed after the artisan inspects the job on-site.
              </div>
              <Button onClick={() => doSearch("", "")} className="w-full">
                Find {calcLabel}s near me
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* FOR ARTISANS */}
      <section className="py-10">
        <Container>
          <div className="grid overflow-hidden rounded-[24px] border border-line-soft lg:grid-cols-2">
            <div className="bg-emerald-950 p-9 sm:p-11 text-white">
              <Badge tone="dark" className="mb-4.5">
                For artisans
              </Badge>
              <h2 className="font-display mb-3.5 text-[30px] font-extrabold leading-tight tracking-tight">
                Turn your skill into steady income.
              </h2>
              <p className="mb-6.5 text-[16px] leading-relaxed text-emerald-200/90">
                Join 2,400+ verified artisans getting matched with paying customers across Lagos — and get paid
                on time, every time, through escrow.
              </p>
              <div className="mb-7.5 flex flex-col gap-3.5">
                {[
                  "Guaranteed payment for completed work",
                  "A verified badge that wins more jobs",
                  "You set your own rates and schedule",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-3 text-[15px]">
                    <span className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-green text-[13px] font-bold text-white">
                      ✓
                    </span>
                    {t}
                  </div>
                ))}
              </div>
              <Link href="/for-artisans">
                <Button variant="dark">Start earning with FixIt →</Button>
              </Link>
            </div>
            <div className="flex flex-col justify-center gap-5 bg-[oklch(97%_0.008_158)] p-9 sm:p-11">
              <div className="rounded-2xl border border-line-soft bg-white p-6">
                <div className="mb-1 text-[13px] text-ink-soft">Average monthly earnings</div>
                <div className="font-display text-[32px] font-extrabold tracking-tight text-accent-dark">
                  ₦180,000+
                </div>
                <div className="mt-1 text-[13px] text-ink-soft">for active, top-rated artisans</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-line-soft bg-white p-5">
                  <div className="font-display text-2xl font-extrabold">0%</div>
                  <div className="text-[13px] text-ink-soft">joining fee</div>
                </div>
                <div className="rounded-2xl border border-line-soft bg-white p-5">
                  <div className="font-display text-2xl font-extrabold">48 hrs</div>
                  <div className="text-[13px] text-ink-soft">to get verified</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <Container className="max-w-[820px]">
          <h2 className="font-display mb-1.5 text-center text-2xl font-bold tracking-tight">
            Questions? Answered.
          </h2>
          <p className="mb-8 text-center text-[15px] text-ink-soft">
            The things people ask most before their first booking.
          </p>
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <div key={f.q} className="overflow-hidden rounded-2xl border border-line-soft bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left"
                >
                  <span className="font-display font-bold">{f.q}</span>
                  <span className="shrink-0 text-xl text-accent-dark">{openFaq === i ? "−" : "+"}</span>
                </button>
                <div className={`overflow-hidden transition-all ${openFaq === i ? "max-h-40" : "max-h-0"}`}>
                  <div className="px-5 pb-4.5 text-sm leading-relaxed text-[oklch(46%_0.02_260)]">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-sm text-ink-soft">
            Still stuck? <Link href="/help" className="font-semibold text-accent-dark">Visit the Help Center</Link>{" "}
            or <Link href="/contact" className="font-semibold text-accent-dark">contact us</Link>.
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-16">
        <Container>
          <div className="rounded-[24px] bg-accent px-8 py-13 text-center sm:px-10">
            <h2 className="font-display mb-3 text-[28px] sm:text-[34px] font-extrabold tracking-tight text-white">
              Something broken? Fix it today.
            </h2>
            <p className="mx-auto mb-7 max-w-[520px] text-[16px] leading-relaxed text-accent-soft">
              Find a verified artisan near you in minutes. Clear pricing, protected payment, real reviews.
            </p>
            <Button variant="secondary" size="lg" onClick={() => doSearch()}>
              Find an artisan
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
