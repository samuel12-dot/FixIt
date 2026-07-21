"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { inputClass } from "@/components/ui/Field";
import { CATEGORY_LIST } from "@/lib/constants";
import { apiFetch, ApiError } from "@/lib/api";

export default function JoinPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", trade: CATEGORY_LIST[0].label, area: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit() {
    if (!form.name || !form.area || !form.phone) {
      setError("Please fill in every field");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await apiFetch("/artisans/apply", { method: "POST", body: form });
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-9 sm:py-14">
      <Container className="max-w-[720px]">
        {done ? (
          <div className="rounded-[20px] border border-line bg-white p-10 text-center shadow-[0_12px_32px_-18px_oklch(40%_0.03_260_/_0.3)] sm:p-12">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-soft text-2xl font-bold text-emerald-700">
              ✓
            </div>
            <h1 className="font-display mb-2.5 text-2xl font-bold tracking-tight">You&apos;re on the list</h1>
            <p className="mb-6.5 text-[15px] leading-relaxed text-ink-soft">
              We&apos;ll verify your ID and certification, then reach out to activate your profile.
              Verification usually takes 2–3 days.
            </p>
            <Button onClick={() => router.push("/")}>Back to home</Button>
          </div>
        ) : (
          <>
            <Badge tone="accent" className="mb-4.5">
              Join the network
            </Badge>
            <h1 className="font-display mb-3 text-[32px] sm:text-[40px] font-extrabold leading-[1.05] tracking-[-1px]">
              Get more jobs. Get paid on time.
            </h1>
            <p className="mb-7 max-w-[560px] text-[16px] leading-relaxed text-ink-soft">
              Join Lagos&apos;s verified artisan network. Escrow means you always get paid for completed
              work — and a verified badge brings you more customers.
            </p>
            <div className="rounded-[18px] border border-line bg-white p-6 shadow-[0_12px_32px_-20px_oklch(40%_0.03_260_/_0.3)]">
              <div className="mb-4.5">
                <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Full name</label>
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div className="mb-4.5 flex flex-wrap gap-4">
                <div className="min-w-[180px] flex-1">
                  <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Trade</label>
                  <select
                    value={form.trade}
                    onChange={(e) => set("trade", e.target.value)}
                    className={`${inputClass} bg-white`}
                  >
                    {CATEGORY_LIST.map((c) => (
                      <option key={c.slug} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="min-w-[150px] flex-1">
                  <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Area</label>
                  <input
                    value={form.area}
                    onChange={(e) => set("area", e.target.value)}
                    placeholder="e.g. Surulere"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="mb-5.5">
                <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Phone number</label>
                <input
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="080..."
                  className={inputClass}
                />
              </div>
              {error && <div className="mb-3.5 text-sm text-red-600">{error}</div>}
              <Button className="w-full" size="lg" disabled={loading} onClick={submit}>
                {loading ? "Submitting…" : "Apply to join"}
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
