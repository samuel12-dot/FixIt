"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, inputClass } from "@/components/ui/Field";
import { useAuth, ApiError } from "@/lib/auth-context";

const PERKS = [
  { icon: "✓", text: "Only ID-verified artisans" },
  { icon: "₦", text: "Payment held safely until you're happy" },
  { icon: "★", text: "Real reviews from real jobs" },
];

export default function SignUpPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit() {
    setErrors({});
    setLoading(true);
    try {
      await signup(form);
      setDone(true);
    } catch (err) {
      if (err instanceof ApiError && err.errors) setErrors(err.errors);
      else setErrors({ form: err instanceof Error ? err.message : "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-10 sm:py-14">
      <Container className="max-w-[960px] grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Badge tone="accent" className="mb-4.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green text-[10px] text-white">
              ✓
            </span>
            Free to join · No booking fees
          </Badge>
          <h1 className="font-display mb-3.5 text-[32px] sm:text-[38px] font-extrabold leading-[1.05] tracking-[-1px]">
            Create your FixIt account.
          </h1>
          <p className="mb-6.5 max-w-[400px] text-[16px] leading-relaxed text-ink-soft">
            Book verified artisans, track jobs in real time, and keep every payment protected in escrow.
          </p>
          <div className="flex flex-col gap-3.5">
            {PERKS.map((p) => (
              <div key={p.text} className="flex items-center gap-2.5 text-sm text-[oklch(40%_0.02_260)]">
                <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-accent-soft text-[13px] font-bold text-accent-dark">
                  {p.icon}
                </span>
                {p.text}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] border border-line bg-white p-7 shadow-[0_16px_40px_-24px_oklch(40%_0.03_260_/_0.35)]">
          {done ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4.5 flex h-14 w-14 items-center justify-center rounded-full bg-green-soft text-2xl font-bold text-emerald-700">
                ✓
              </div>
              <h2 className="font-display mb-2 text-xl font-bold">Welcome to FixIt!</h2>
              <p className="mb-5.5 text-sm leading-relaxed text-ink-soft">
                Your account is ready. Let&apos;s find you a verified artisan.
              </p>
              <Button className="w-full" onClick={() => router.push("/search")}>
                Find an artisan
              </Button>
            </div>
          ) : (
            <>
              <button className="mb-4 w-full rounded-xl border border-line py-3.5 text-sm font-semibold text-[oklch(34%_0.02_260)] hover:bg-neutral-50">
                Continue with Google
              </button>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-line-soft" />
                <span className="text-xs text-ink-faint">or sign up with email</span>
                <div className="h-px flex-1 bg-line-soft" />
              </div>

              <Field label="Full name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your name"
                  className={inputClass}
                />
              </Field>
              <Field label="Email address" error={errors.email}>
                <input
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </Field>
              <Field label="Phone number" error={errors.phone}>
                <input
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="080 0000 0000"
                  className={inputClass}
                />
              </Field>
              <Field label="Password" error={errors.password}>
                <input
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  type="password"
                  placeholder="At least 6 characters"
                  className={inputClass}
                />
              </Field>
              {errors.form && <div className="mb-3 text-sm text-red-600">{errors.form}</div>}

              <Button className="mb-3.5 w-full" size="lg" disabled={loading} onClick={submit}>
                {loading ? "Creating account…" : "Create account"}
              </Button>
              <div className="mb-4 text-center text-xs leading-relaxed text-ink-faint">
                By continuing you agree to FixIt&apos;s Terms and Privacy Policy.
              </div>
              <div className="text-center text-sm text-ink-soft">
                Already have an account?{" "}
                <Link href="/signin" className="font-semibold text-accent-dark">
                  Sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
