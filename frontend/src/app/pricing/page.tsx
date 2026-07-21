import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const STEPS = [
  { num: "1", title: "You pay into escrow", text: "At booking, your payment is held securely by FixIt — not sent to the artisan yet." },
  { num: "2", title: "Artisan does the job", text: "They can see the funds are secured, so they start with confidence." },
  { num: "3", title: "You confirm it's done", text: "Happy with the work? Release the payment with one tap." },
  { num: "✓", title: "Artisan gets paid", text: "Funds are released instantly. If there's a problem, they stay protected." },
];

const FEES = [
  { label: "Service price", value: "Set by artisan" },
  { label: "Booking fee (customer)", value: "₦0 – free" },
  { label: "Service fee (artisan)", value: "10% per job" },
  { label: "Escrow protection", value: "Included free", highlight: true },
];

const PAYMENT_METHODS = [
  { icon: "▭", label: "Debit / credit card", bg: "bg-[oklch(95%_0.04_230)]", color: "text-[oklch(52%_0.14_240)]" },
  { icon: "⇄", label: "Bank transfer", bg: "bg-accent-soft", color: "text-accent-dark" },
  { icon: "◈", label: "USSD", bg: "bg-amber-soft", color: "text-amber-700" },
  { icon: "◱", label: "FixIt wallet", bg: "bg-[oklch(95%_0.04_40)]", color: "text-[oklch(52%_0.13_35)]" },
];

export default function PricingPage() {
  return (
    <div>
      <section className="py-14 text-center">
        <Container className="max-w-[900px]">
          <Badge tone="accent" className="mb-4.5">
            How payment works
          </Badge>
          <h1 className="font-display mb-4 text-[32px] sm:text-[44px] font-extrabold leading-[1.05] tracking-[-1.5px]">
            Your money, protected at every step.
          </h1>
          <p className="mx-auto max-w-[560px] text-[18px] leading-relaxed text-[oklch(46%_0.02_260)]">
            FixIt holds your payment in escrow and only releases it when you&apos;re satisfied. Here&apos;s
            exactly how it works.
          </p>
        </Container>
      </section>

      <section className="pb-10">
        <Container className="max-w-[1000px] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className={`rounded-2xl border bg-white p-6 ${i === 3 ? "border-[oklch(90%_0.02_158)]" : "border-line-soft"}`}
            >
              <div
                className={`font-display mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl font-extrabold ${
                  i === 3 ? "bg-green text-white" : "bg-accent-soft text-accent-dark"
                }`}
              >
                {s.num}
              </div>
              <div className="font-display mb-1.5 font-bold">{s.title}</div>
              <div className="text-sm leading-relaxed text-ink-soft">{s.text}</div>
            </div>
          ))}
        </Container>
      </section>

      <section className="pb-10">
        <Container className="max-w-[1000px] grid gap-6 sm:grid-cols-2">
          <div className="rounded-[18px] border border-line-soft bg-white p-7">
            <h2 className="font-display mb-4 text-xl font-bold">Fee breakdown</h2>
            <div className="flex flex-col">
              {FEES.map((f, i) => (
                <div
                  key={f.label}
                  className={`flex justify-between py-3.5 text-sm ${i < FEES.length - 1 ? "border-b border-line-soft" : ""}`}
                >
                  <span className="text-[oklch(46%_0.02_260)]">{f.label}</span>
                  <span className={`font-bold ${f.highlight ? "text-emerald-700" : ""}`}>{f.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-[10px] bg-amber-soft px-3.5 py-3 text-[13px] leading-relaxed text-amber-800">
              Customers pay only the service price. Our small fee comes from the artisan side.
            </div>
          </div>
          <div className="rounded-[18px] border border-line-soft bg-white p-7">
            <h2 className="font-display mb-4 text-xl font-bold">Ways to pay</h2>
            <div className="flex flex-col gap-3">
              {PAYMENT_METHODS.map((m) => (
                <div key={m.label} className="flex items-center gap-3 rounded-xl border border-line-soft px-4 py-3.5 text-sm font-semibold">
                  <span className={`flex h-8.5 w-8.5 items-center justify-center rounded-lg ${m.bg} ${m.color}`}>
                    {m.icon}
                  </span>
                  {m.label}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line-soft bg-neutral-50 py-14">
        <Container className="max-w-[1000px]">
          <h2 className="font-display mb-6 text-xl font-bold tracking-tight">Refunds &amp; disputes</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-line-soft bg-white p-6">
              <div className="font-display mb-2 font-bold">If a job goes wrong</div>
              <div className="text-sm leading-relaxed text-ink-soft">
                Don&apos;t release payment. Open a dispute from the order screen. Your funds stay in escrow
                while our support team reviews photos, chat history and both sides.
              </div>
            </div>
            <div className="rounded-2xl border border-line-soft bg-white p-6">
              <div className="font-display mb-2 font-bold">Getting a refund</div>
              <div className="text-sm leading-relaxed text-ink-soft">
                If the job wasn&apos;t done as agreed, you&apos;re refunded to your original payment method.
                Most refunds are processed within 3–5 business days.
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/search">
              <Button size="lg">Book with confidence</Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
