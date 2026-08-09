import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { MILESTONES, TEAM } from "@/lib/constants";

const VALUES = [
  { icon: "✓", title: "Trust is earned", text: "Every artisan is verified. Every review is real. No shortcuts on safety.", bg: "bg-accent-soft", color: "text-accent-dark" },
  { icon: "₦", title: "Fairness both ways", text: "Customers get honest prices. Artisans get paid fully and on time.", bg: "bg-amber-soft", color: "text-amber-700" },
  { icon: "◍", title: "Built for Lagos", text: "We know the areas, the traffic, the realities. This is made here, for here.", bg: "bg-[oklch(95%_0.04_230)]", color: "text-[oklch(52%_0.14_240)]" },
  { icon: "↑", title: "Raising the trade", text: "We help skilled artisans build real businesses and reputations.", bg: "bg-[oklch(95%_0.04_40)]", color: "text-[oklch(52%_0.13_35)]" },
];

const STATS = [
  { value: "2,400+", label: "Verified artisans" },
  { value: "18,600", label: "Jobs completed" },
  { value: "6", label: "Lagos zones covered" },
  { value: "98%", label: "Jobs completed happily" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-line-soft bg-[oklch(97%_0.012_242)]">
        <Container className="max-w-[900px] py-16 text-center">
          <Badge tone="accent" className="mb-4.5">
            Our story
          </Badge>
          <h1 className="font-display mb-4 text-[32px] sm:text-[46px] font-extrabold leading-[1.05] tracking-[-1.5px]">
            We&apos;re fixing how Lagos gets things fixed.
          </h1>
          <p className="mx-auto max-w-[620px] text-[18px] leading-relaxed text-[oklch(46%_0.02_260)]">
            Hiring an artisan in Lagos meant guessing at prices, hoping they&apos;d show up, and no way to
            know who to trust. We built FixIt to change that — for good.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[20px] border border-[oklch(93%_0.01_55)] bg-[oklch(97%_0.008_55)]">
            <Image
              src="/images/founder-story.png"
              alt="A FixIt artisan with his tool bag beside the FixIt van in Lagos"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display mb-4 text-[28px] font-bold tracking-tight">Why artisan trust is broken</h2>
            <p className="mb-4 text-[15px] leading-[1.65] text-[oklch(46%_0.02_260)]">
              It started with a flooded kitchen and three plumbers who each quoted wildly different prices —
              one demanded full payment upfront, then vanished. It&apos;s a story almost every Lagosian knows.
            </p>
            <p className="text-[15px] leading-[1.65] text-[oklch(46%_0.02_260)]">
              The problem was never a shortage of skilled artisans. Lagos is full of them. The problem was{" "}
              <strong>trust</strong>: no verification, no accountability, no protection for anyone&apos;s
              money. So we built the layer that was missing.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-line-soft bg-neutral-50">
        <Container className="max-w-[900px] py-16 text-center">
          <div className="font-display mb-2 text-xl font-bold text-accent-dark">Our mission</div>
          <h2 className="font-display text-[24px] sm:text-[32px] font-extrabold leading-snug tracking-tight">
            To make every home repair in Lagos safe, fairly priced, and worry-free — for customers and
            artisans alike.
          </h2>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="font-display mb-7 text-center text-2xl font-bold tracking-tight">
            What we stand for
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-line-soft bg-white p-6.5">
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl font-bold text-lg ${v.bg} ${v.color}`}>
                  {v.icon}
                </div>
                <div className="font-display mb-1.5 font-bold">{v.title}</div>
                <div className="text-sm leading-relaxed text-ink-soft">{v.text}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <h2 className="font-display mb-7 text-center text-2xl font-bold tracking-tight">The team</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((t) => (
              <div key={t.name} className="text-center">
                <div className="mb-3.5 flex aspect-square items-center justify-center rounded-[18px] border border-[oklch(93%_0.01_55)] bg-[oklch(97%_0.008_55)]">
                  <span className="font-mono text-xs text-ink-soft">photo</span>
                </div>
                <div className="font-display font-bold">{t.name}</div>
                <div className="text-[13px] text-ink-soft">{t.role}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container className="max-w-[820px]">
          <h2 className="font-display mb-7 text-2xl font-bold tracking-tight">Our journey so far</h2>
          <div className="flex flex-col">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full bg-accent" />
                  {i < MILESTONES.length - 1 && <div className="w-0.5 flex-1 min-h-[24px] bg-[oklch(90%_0.02_242)]" />}
                </div>
                <div className="pb-7">
                  <div className="font-display mb-0.5 text-[15px] font-extrabold text-accent-dark">{m.year}</div>
                  <div className="font-display mb-1 font-bold">{m.title}</div>
                  <div className="text-sm leading-relaxed text-ink-soft">{m.text}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line-soft bg-line-soft sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white p-6.5">
                <div className="font-display text-[28px] font-extrabold text-accent-dark">{s.value}</div>
                <div className="text-[13px] text-ink-soft">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
