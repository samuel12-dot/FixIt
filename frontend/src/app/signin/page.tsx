"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { BackLink } from "@/components/layout/BackLink";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { inputClass } from "@/components/ui/Field";
import { useAuth, ApiError } from "@/lib/auth-context";

const PERKS = [
  { icon: "✓", text: "Every artisan ID-verified" },
  { icon: "₦", text: "Payment protected in escrow" },
  { icon: "★", text: "Real reviews, honest ratings" },
];

export default function SignInPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError("");
    setLoading(true);
    try {
      await login(method === "phone" ? { phone, password } : { email, password });
      router.push("/search");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <BackLink href="/" label="Home" />
      <section className="py-10 sm:py-14">
      <Container className="max-w-[960px] grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Badge tone="accent" className="mb-4.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green text-[10px] text-white">
              ✓
            </span>
            Trusted by 40,000+ Lagos residents
          </Badge>
          <h1 className="font-display mb-3.5 text-[32px] sm:text-[38px] font-extrabold leading-[1.05] tracking-[-1px]">
            Welcome back.
          </h1>
          <p className="mb-6.5 max-w-[400px] text-[16px] leading-relaxed text-ink-soft">
            Sign in to book verified artisans, track your jobs and manage your escrow-protected payments.
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
          <div className="mb-5.5 flex gap-1.5 rounded-xl bg-neutral-50 p-1.5">
            <button
              onClick={() => setMethod("phone")}
              className={`flex-1 rounded-[9px] py-2.5 text-sm font-semibold ${
                method === "phone" ? "bg-white text-ink shadow-sm" : "text-ink-soft"
              }`}
            >
              Phone
            </button>
            <button
              onClick={() => setMethod("email")}
              className={`flex-1 rounded-[9px] py-2.5 text-sm font-semibold ${
                method === "email" ? "bg-white text-ink shadow-sm" : "text-ink-soft"
              }`}
            >
              Email
            </button>
          </div>

          {method === "phone" ? (
            <div className="mb-4.5">
              <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Phone number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="080 0000 0000"
                className={inputClass}
              />
            </div>
          ) : (
            <div className="mb-4.5">
              <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Email address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          )}

          <div className="mb-1.5 flex items-baseline justify-between">
            <label className="text-[13px] font-semibold text-ink-soft">Password</label>
            <span className="cursor-pointer text-xs font-semibold text-accent-dark">Forgot?</span>
          </div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            className={`${inputClass} mb-5`}
          />

          {error && <div className="mb-3.5 text-sm text-red-600">{error}</div>}

          <Button className="mb-4 w-full" size="lg" disabled={loading} onClick={submit}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>

          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-line-soft" />
            <span className="text-xs text-ink-faint">or</span>
            <div className="h-px flex-1 bg-line-soft" />
          </div>
          <button className="w-full rounded-xl border border-line py-3.5 text-sm font-semibold text-[oklch(34%_0.02_260)] hover:bg-neutral-50">
            Continue with Google
          </button>

          <div className="mt-5 text-center text-sm text-ink-soft">
            New to FixIt?{" "}
            <Link href="/join" className="font-semibold text-accent-dark">
              Become an artisan
            </Link>
          </div>
        </div>
      </Container>
      </section>
    </>
  );
}
