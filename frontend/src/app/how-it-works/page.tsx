"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { HIW_ARTISAN, HIW_CUSTOMER } from "@/lib/constants";

const CHECKS = [
  { num: "CHECK 01", title: "Government ID", text: "A valid NIN or driver's licence is confirmed against the person applying." },
  { num: "CHECK 02", title: "Skill certification", text: "Proof of training or a practical assessment for their specific trade." },
  { num: "CHECK 03", title: "Ongoing reviews", text: "Ratings are monitored — consistently poor work loses the verified badge." },
];

export default function HowItWorksPage() {
  const [tab, setTab] = useState<"customers" | "artisans">("customers");
  const steps = tab === "customers" ? HIW_CUSTOMER : HIW_ARTISAN;

  return (
    <div>
      <section className="py-14 text-center">
        <Container className="max-w-[900px]">
          <h1 className="font-display mb-4 text-[32px] sm:text-[44px] font-extrabold leading-[1.05] tracking-[-1.5px]">
            How FixIt works
          </h1>
          <p className="mx-auto mb-7 max-w-[560px] text-[18px] leading-relaxed text-[oklch(46%_0.02_260)]">
            The same platform protects both sides of every job. See how it works for you.
          </p>
          <div className="inline-flex gap-1.5 rounded-xl border border-line-soft bg-neutral-50 p-1.5">
            <button
              onClick={() => setTab("customers")}
              className={`rounded-[9px] px-5.5 py-2.5 text-sm font-bold ${
                tab === "customers" ? "bg-accent text-white" : "text-ink-soft"
              }`}
            >
              For customers
            </button>
            <button
              onClick={() => setTab("artisans")}
              className={`rounded-[9px] px-5.5 py-2.5 text-sm font-bold ${
                tab === "artisans" ? "bg-accent text-white" : "text-ink-soft"
              }`}
            >
              For artisans
            </button>
          </div>
        </Container>
      </section>

      <section className="pb-10">
        <Container className="max-w-[1000px] flex flex-col gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="grid items-center gap-7 rounded-[20px] border border-line-soft bg-white p-7 sm:grid-cols-[64px_1fr_1fr]"
            >
              <div className="font-display flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-2xl font-extrabold text-accent-dark">
                {st.num}
              </div>
              <div>
                <div className="font-display mb-2 text-xl font-bold">{st.title}</div>
                <div className="text-[15px] leading-relaxed text-ink-soft">{st.text}</div>
              </div>
              <div className="flex min-h-[150px] items-center justify-center rounded-2xl border border-[oklch(93%_0.01_55)] bg-[oklch(97%_0.008_55)]">
                <span className="font-mono text-[11px] text-ink-soft">screenshot.png</span>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="border-t border-line-soft bg-neutral-50 py-14">
        <Container className="max-w-[1000px]">
          <h2 className="font-display mb-2 text-center text-2xl font-bold tracking-tight">
            The verification process
          </h2>
          <p className="mb-8 text-center text-[15px] text-ink-soft">
            Every artisan clears three checks before their first job.
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {CHECKS.map((c) => (
              <div key={c.num} className="rounded-2xl border border-line-soft bg-white p-6">
                <div className="font-display mb-2.5 text-sm font-extrabold text-accent-dark">{c.num}</div>
                <div className="font-display mb-1.5 font-bold">{c.title}</div>
                <div className="text-sm leading-relaxed text-ink-soft">{c.text}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="max-w-[1000px]">
          <div className="rounded-[24px] bg-emerald-950 p-8 text-white sm:p-11">
            <Badge tone="dark" className="mb-4.5">
              Escrow protection
            </Badge>
            <h2 className="font-display mb-5 text-[28px] font-extrabold tracking-tight">
              How escrow protects both sides
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <div className="font-display mb-1.5 font-bold text-white">For the customer</div>
                <div className="text-sm leading-relaxed text-emerald-200/90">
                  Your money leaves your account but doesn&apos;t reach the artisan until you confirm the job
                  is done. If it goes wrong, it&apos;s refundable.
                </div>
              </div>
              <div>
                <div className="font-display mb-1.5 font-bold text-white">For the artisan</div>
                <div className="text-sm leading-relaxed text-emerald-200/90">
                  You can see the funds are secured before you start work — so you never chase payment or get
                  stiffed after a completed job.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
