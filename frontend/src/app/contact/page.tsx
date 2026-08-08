"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { apiFetch, ApiError } from "@/lib/api";

const SUBJECTS = ["General enquiry", "Booking issue", "Payment & escrow", "Become an artisan", "Report a problem"];

const CONTACT_CARDS = [
  { icon: "✆", title: "Call us", text: "+234 800 349 6483", bg: "bg-accent-soft", color: "text-accent-dark" },
  { icon: "◐", title: "WhatsApp", text: "Chat with support, 8am–8pm", bg: "bg-green-soft", color: "text-sky-700" },
  { icon: "✉", title: "Email", text: "hello@fixit.ng", bg: "bg-[oklch(95%_0.04_230)]", color: "text-[oklch(52%_0.14_240)]" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: SUBJECTS[0], message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit() {
    setErrors({});
    setLoading(true);
    try {
      await apiFetch("/contact", { method: "POST", body: form });
      setSent(true);
    } catch (err) {
      if (err instanceof ApiError && err.errors) setErrors(err.errors);
      else setErrors({ form: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-12 pb-16">
      <Container className="max-w-[1100px]">
        <h1 className="font-display mb-2.5 text-[32px] sm:text-[40px] font-extrabold tracking-[-1.5px]">
          Get in touch
        </h1>
        <p className="mb-9 max-w-[520px] text-[17px] leading-relaxed text-[oklch(46%_0.02_260)]">
          Questions, feedback or need a hand with a booking? We&apos;re here to help.
        </p>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-[18px] border border-line-soft bg-white p-7 shadow-[0_12px_32px_-24px_oklch(40%_0.03_260_/_0.35)]">
            {sent ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-4.5 flex h-14 w-14 items-center justify-center rounded-full bg-green-soft text-2xl font-bold text-sky-700">
                  ✓
                </div>
                <h2 className="font-display mb-2 text-xl font-bold">Message sent</h2>
                <p className="text-sm leading-relaxed text-ink-soft">
                  Thanks for reaching out — our team typically replies within a few hours during support
                  hours.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 flex flex-wrap gap-4">
                  <div className="min-w-[180px] flex-1">
                    <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Name</label>
                    <input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-[11px] border border-line px-3.5 py-3 text-[15px]"
                    />
                    {errors.name && <div className="mt-1.5 text-xs text-red-600">{errors.name}</div>}
                  </div>
                  <div className="min-w-[180px] flex-1">
                    <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Email</label>
                    <input
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-[11px] border border-line px-3.5 py-3 text-[15px]"
                    />
                    {errors.email && <div className="mt-1.5 text-xs text-red-600">{errors.email}</div>}
                  </div>
                </div>
                <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => set("subject", e.target.value)}
                  className="mb-4 w-full rounded-[11px] border border-line bg-white px-3.5 py-3 text-[15px]"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
                  How can we help?
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="Tell us what's going on…"
                  rows={5}
                  className="mb-1.5 w-full resize-y rounded-[11px] border border-line px-3.5 py-3 text-[15px]"
                />
                {errors.message && <div className="mb-2.5 text-xs text-red-600">{errors.message}</div>}
                {errors.form && <div className="mb-2.5 text-sm text-red-600">{errors.form}</div>}
                <Button className="mt-3 w-full" size="lg" disabled={loading} onClick={submit}>
                  {loading ? "Sending…" : "Send message"}
                </Button>
              </>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {CONTACT_CARDS.map((c) => (
              <div key={c.title} className="flex items-center gap-3.5 rounded-2xl border border-line-soft bg-white p-5">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${c.bg} ${c.color}`}>
                  {c.icon}
                </div>
                <div>
                  <div className="font-bold text-sm">{c.title}</div>
                  <div className="text-[13px] text-ink-soft">{c.text}</div>
                </div>
              </div>
            ))}
            <div className="flex min-h-[150px] items-center justify-center rounded-2xl border border-[oklch(93%_0.01_55)] bg-[oklch(97%_0.008_55)]">
              <span className="font-mono text-[11px] text-ink-soft">map — 14 Admiralty Way, Lekki</span>
            </div>
            <div className="rounded-2xl border border-line-soft bg-white p-5">
              <div className="mb-2 font-bold text-sm">Support hours</div>
              <div className="text-[13px] leading-loose text-ink-soft">
                Mon–Fri 8:00am – 8:00pm
                <br />
                Sat–Sun 9:00am – 6:00pm
              </div>
              <div className="mt-3 text-[13px]">
                Prefer to self-serve?{" "}
                <Link href="/help" className="font-semibold text-accent-dark">
                  Browse the Help Center →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
