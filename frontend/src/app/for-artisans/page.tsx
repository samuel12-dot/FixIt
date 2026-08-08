"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const WHY = [
  { icon: "₦", title: "Always get paid", text: "Escrow secures the money before you start — no more chasing customers.", bg: "bg-accent-soft", color: "text-accent-dark" },
  { icon: "✓", title: "Win more work", text: "A verified badge and good ratings put you in front of more customers.", bg: "bg-green-soft", color: "text-sky-700" },
  { icon: "◷", title: "Work on your terms", text: "Set your own rates, hours and service area. Accept the jobs you want.", bg: "bg-amber-soft", color: "text-amber-700" },
  { icon: "↑", title: "Grow your name", text: "Build a public profile and reputation that follows you across Lagos.", bg: "bg-[oklch(95%_0.04_230)]", color: "text-[oklch(52%_0.14_240)]" },
];

const NEEDS = [
  "A valid government ID (NIN or driver's licence)",
  "Proof of training or experience in your trade",
  "A smartphone to receive and manage jobs",
  "Your own tools and willingness to do great work",
];

const APPLY_STEPS = [
  { num: "1", title: "Submit your details", text: "Fill in the short application with your trade and area." },
  { num: "2", title: "Get verified", text: "We check your ID and certification — usually within 48 hours." },
  { num: "✓", title: "Start earning", text: "Your profile goes live and jobs start coming in." },
];

const STORIES = [
  { text: "I used to spend half my day finding work. Now the jobs come to me and I've doubled what I earn in a month.", name: "Sunday A.", role: "Electrician · Ikeja" },
  { text: "The escrow means I never worry about payment. Once I see it's secured, I focus on doing the job well.", name: "Grace O.", role: "AC Technician · Lekki" },
  { text: "My verified badge and 200+ reviews mean customers pick me first. It's changed my whole business.", name: "Ibrahim K.", role: "Plumber · Surulere" },
];

export default function ForArtisansPage() {
  const [jobs, setJobs] = useState(12);
  const weekly = jobs * 9500;
  const monthly = weekly * 4;

  function naira(n: number) {
    return `₦${Math.round(n).toLocaleString()}`;
  }

  return (
    <div>
      <section className="bg-sky-950 text-white">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Badge tone="dark" className="mb-4.5">
              For artisans
            </Badge>
            <h1 className="font-display mb-4 text-[34px] sm:text-[48px] font-extrabold leading-[1.03] tracking-[-1.5px]">
              Your skills. More jobs. Guaranteed pay.
            </h1>
            <p className="mb-7 max-w-[480px] text-[18px] leading-relaxed text-sky-200/90">
              Join 2,400+ verified artisans across Lagos getting matched with customers who are ready to pay
              — safely, through escrow.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/join">
                <Button variant="dark">Apply to join</Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="ghost" className="border border-sky-700 text-white hover:text-white">
                  See how it works
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex min-h-[300px] items-center justify-center rounded-[20px] border border-sky-800 bg-sky-900">
            <span className="font-mono text-xs text-sky-300">artisan-portrait.jpg</span>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="max-w-[1000px]">
          <div className="rounded-[24px] border border-line-soft bg-neutral-50 p-8 sm:p-10">
            <h2 className="font-display mb-2 text-center text-2xl font-bold tracking-tight">
              Estimate your earnings
            </h2>
            <p className="mb-7 text-center text-[15px] text-ink-soft">
              See what a typical FixIt week could add up to.
            </p>
            <div className="grid items-center gap-9 lg:grid-cols-2">
              <div>
                <label className="mb-3.5 block text-sm font-semibold text-[oklch(38%_0.02_260)]">
                  Jobs per week: <span className="font-bold text-accent-dark">{jobs}</span>
                </label>
                <input
                  type="range"
                  min={2}
                  max={40}
                  step={1}
                  value={jobs}
                  onChange={(e) => setJobs(Number(e.target.value))}
                  className="mb-4 w-full accent-accent"
                />
                <div className="text-[13px] leading-relaxed text-ink-soft">
                  Based on an average completed job value of about ₦9,500. Your actual rates are always
                  yours to set.
                </div>
              </div>
              <div className="rounded-2xl border border-line-soft bg-white p-7 text-center shadow-[0_16px_40px_-26px_oklch(40%_0.03_260_/_0.4)]">
                <div className="mb-1.5 text-[13px] text-ink-soft">Estimated monthly earnings</div>
                <div className="font-display mb-1 text-[38px] font-extrabold tracking-tight text-accent-dark">
                  {naira(monthly)}
                </div>
                <div className="text-[13px] text-ink-soft">about {naira(weekly)} per week</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <h2 className="font-display mb-7 text-center text-2xl font-bold tracking-tight">
            Why artisans choose FixIt
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.title} className="rounded-2xl border border-line-soft bg-white p-6.5">
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl font-bold text-lg ${w.bg} ${w.color}`}>
                  {w.icon}
                </div>
                <div className="font-display mb-1.5 font-bold">{w.title}</div>
                <div className="text-sm leading-relaxed text-ink-soft">{w.text}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line-soft bg-neutral-50 py-14">
        <Container className="max-w-[1100px] grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-display mb-4.5 text-xl font-bold tracking-tight">What you&apos;ll need</h2>
            <div className="flex flex-col gap-3">
              {NEEDS.map((n) => (
                <div key={n} className="flex items-center gap-3 rounded-xl border border-line-soft bg-white p-4 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent-dark">
                    ✓
                  </span>
                  {n}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display mb-4.5 text-xl font-bold tracking-tight">How to apply</h2>
            <div className="flex flex-col">
              {APPLY_STEPS.map((s, i) => (
                <div key={s.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`font-display flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                        i === APPLY_STEPS.length - 1 ? "bg-green" : "bg-accent"
                      }`}
                    >
                      {s.num}
                    </div>
                    {i < APPLY_STEPS.length - 1 && <div className="min-h-5 w-0.5 flex-1 bg-[oklch(90%_0.02_242)]" />}
                  </div>
                  <div className="pb-5.5">
                    <div className="font-display mb-0.5 text-[15px] font-bold">{s.title}</div>
                    <div className="text-sm leading-relaxed text-ink-soft">{s.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <h2 className="font-display mb-7 text-center text-2xl font-bold tracking-tight">
            Artisans who made the switch
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {STORIES.map((s) => (
              <div key={s.name} className="rounded-2xl border border-line-soft bg-white p-6">
                <div className="mb-4 text-[15px] leading-relaxed text-[oklch(34%_0.02_260)]">
                  &ldquo;{s.text}&rdquo;
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-accent-soft font-bold text-accent-dark">
                    {s.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{s.name}</div>
                    <div className="text-xs text-ink-soft">{s.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-9 text-center">
            <Link href="/join">
              <Button size="lg">Apply to become an artisan</Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
