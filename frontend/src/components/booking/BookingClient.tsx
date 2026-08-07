"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BackLink } from "@/components/layout/BackLink";
import { Button } from "@/components/ui/Button";
import { categoryLabel } from "@/components/artisans/ArtisanCard";
import { URGENCY_MULT, URGENCY_OPTIONS } from "@/lib/constants";
import { apiFetch, ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { Artisan, Booking } from "@/lib/types";

const STEPS = ["Details", "Schedule", "Address", "Review"];

export function BookingClient({ artisan }: { artisan: Artisan }) {
  const { user, token, ready } = useAuth();
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState(1);
  const [issueDesc, setIssueDesc] = useState("");
  const [urgency, setUrgency] = useState<string>("Standard");
  const [slotLabel, setSlotLabel] = useState(params.get("slot") || "");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  const calloutFee = 3000;
  const mult = URGENCY_MULT[urgency] || 1;
  const laborMin = Math.round(artisan.priceMin * mult);
  const laborMax = Math.round(artisan.priceMax * mult);
  const estimateMin = calloutFee + laborMin;
  const estimateMax = calloutFee + laborMax;

  if (ready && !user) {
    return (
      <section className="py-16">
        <Container className="max-w-[480px] text-center">
          <div className="rounded-2xl border border-line-soft bg-white p-9">
            <h1 className="font-display mb-2.5 text-2xl font-bold tracking-tight">Sign in to book</h1>
            <p className="mb-6 text-sm leading-relaxed text-ink-soft">
              Create a free account or sign in to book {artisan.name} and keep your payment protected in
              escrow.
            </p>
            <div className="flex justify-center gap-3">
              <Link href="/signin">
                <Button variant="secondary">Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  async function confirmPayment() {
    setError("");
    if (!address || !phone) {
      setError("Please fill in your address and phone number");
      setStep(3);
      return;
    }
    if (!slotLabel) {
      setError("Please pick a date & time");
      setStep(2);
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch<{ booking: Booking }>("/bookings", {
        method: "POST",
        token,
        body: {
          artisanId: artisan._id,
          category: artisan.category,
          issueDesc,
          urgency,
          slotLabel,
          address,
          phone,
          calloutFee,
        },
      });
      setConfirmed(res.booking);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (confirmed) {
    return (
      <section className="py-10 pb-16">
        <Container className="max-w-[1000px]">
          <div className="rounded-[20px] border border-line-soft bg-white p-12 text-center shadow-[0_12px_32px_-20px_oklch(40%_0.03_260_/_0.3)]">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-soft text-2xl font-bold text-emerald-700">
              ✓
            </div>
            <h1 className="font-display mb-2.5 text-2xl font-bold tracking-tight">Booking confirmed</h1>
            <p className="mb-1.5 text-[15px] text-ink-soft">
              ₦{estimateMin}–{estimateMax} is held securely in escrow.
            </p>
            <p className="mb-7 text-[15px] text-ink-soft">
              {artisan.name} has been notified and will confirm shortly.
            </p>
            <Button onClick={() => router.push(`/orders/${confirmed._id}`)}>Track your order</Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <BackLink href={`/artisans/${artisan._id}`} label="Profile" />
      <section className="py-5 pb-16">
      <Container className="max-w-[1000px]">
        <h1 className="font-display mb-1.5 text-[28px] font-bold tracking-tight">Book {artisan.name}</h1>
        <div className="mb-7 text-sm text-ink-soft">
          {categoryLabel(artisan.category)} · {artisan.area}, Lagos
        </div>

        <div className="mb-7 flex gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1">
              <div className={`mb-2 h-[5px] rounded-full ${i + 1 <= step ? "bg-accent" : "bg-line"}`} />
              <div className={`text-xs font-semibold ${i + 1 <= step ? "text-accent-dark" : "text-ink-faint"}`}>
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-7 lg:grid-cols-[1fr_300px]">
          <div className="rounded-[18px] border border-line-soft bg-white p-6">
            {step === 1 && (
              <>
                <div className="mb-4 font-bold text-[16px]">Service details</div>
                <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
                  Describe the problem
                </label>
                <textarea
                  value={issueDesc}
                  onChange={(e) => setIssueDesc(e.target.value)}
                  placeholder="e.g. Sockets in the living room tripping the breaker"
                  rows={4}
                  className="mb-4.5 w-full resize-y rounded-[11px] border border-line p-3 text-sm"
                />
                <label className="mb-2 block text-[13px] font-semibold text-ink-soft">Urgency</label>
                <div className="flex flex-wrap gap-2.5">
                  {URGENCY_OPTIONS.map((u) => (
                    <button
                      key={u}
                      onClick={() => setUrgency(u)}
                      className={`rounded-[10px] border px-4 py-2.5 text-[13px] font-semibold ${
                        urgency === u
                          ? "border-accent bg-accent-soft text-accent-dark"
                          : "border-line bg-white text-ink-soft"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-4 font-bold text-[16px]">Pick a date &amp; time</div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
                  {artisan.availability.map((d) => (
                    <div key={d.day} className="rounded-xl bg-neutral-50 p-3">
                      <div className="mb-2 text-[13px] font-bold">{d.day}</div>
                      <div className="flex flex-col gap-1.5">
                        {d.slots.map((s) => {
                          const label = `${d.day}, ${s.time}`;
                          const active = slotLabel === label;
                          return (
                            <button
                              key={s.time}
                              disabled={s.disabled}
                              onClick={() => setSlotLabel(label)}
                              className={`rounded-lg border p-1.5 text-xs ${
                                s.disabled
                                  ? "cursor-not-allowed border-line-soft bg-white text-ink-faint"
                                  : active
                                  ? "border-accent bg-accent-soft text-accent-dark"
                                  : "cursor-pointer border-line bg-white text-ink hover:border-accent"
                              }`}
                            >
                              {s.time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="mb-4 font-bold text-[16px]">Address &amp; contact</div>
                <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Address</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House/street, area, Lagos"
                  className="mb-4 w-full rounded-[11px] border border-line p-3 text-sm"
                />
                <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">Phone number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="080..."
                  className="w-full rounded-[11px] border border-line p-3 text-sm"
                />
              </>
            )}

            {step === 4 && (
              <>
                <div className="mb-4 font-bold text-[16px]">Review &amp; pay</div>
                <div className="mb-5 flex flex-col gap-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Service</span>
                    <span className="font-semibold">
                      {urgency} · {categoryLabel(artisan.category)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Date &amp; time</span>
                    <span className="font-semibold">{slotLabel || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-ink-soft">Address</span>
                    <span className="text-right font-semibold">{address || "Not provided"}</span>
                  </div>
                </div>
                <div className="mb-5 flex gap-2 rounded-xl bg-accent-soft p-3.5 text-[13px] leading-relaxed text-accent-dark">
                  <span>ⓘ</span>
                  <span>
                    This is an estimate. The artisan confirms the final price after inspecting the job
                    on-site — you approve any change before paying more.
                  </span>
                </div>
                {error && <div className="mb-3.5 text-sm text-red-600">{error}</div>}
                <Button className="w-full" size="lg" disabled={loading} onClick={confirmPayment}>
                  {loading ? "Processing…" : `Pay ₦${estimateMin}–${estimateMax} into escrow`}
                </Button>
              </>
            )}

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="rounded-[10px] border border-line px-4.5 py-2.5 text-sm font-semibold disabled:opacity-40"
              >
                Back
              </button>
              {step < 4 && (
                <button
                  onClick={() => setStep((s) => Math.min(4, s + 1))}
                  className="rounded-[10px] bg-emerald-950 px-5.5 py-2.5 text-sm font-semibold text-white"
                >
                  Continue
                </button>
              )}
            </div>
          </div>

          <div>
            <div className="sticky top-[88px] rounded-2xl border border-line-soft bg-white p-5">
              <div className="mb-4 font-bold text-sm">Price estimate</div>
              <div className="mb-2.5 flex justify-between text-[13px]">
                <span className="text-ink-soft">Call-out fee</span>
                <span>₦{calloutFee}</span>
              </div>
              <div className="mb-3.5 flex justify-between text-[13px]">
                <span className="text-ink-soft">Est. labor</span>
                <span>
                  ₦{laborMin}–{laborMax}
                </span>
              </div>
              <div className="mb-4 flex justify-between border-t border-line-soft pt-3.5 text-[15px] font-bold">
                <span>Total estimate</span>
                <span>
                  ₦{estimateMin}–{estimateMax}
                </span>
              </div>
              <div className="flex gap-1.5 text-xs leading-relaxed text-ink-soft">
                <span className="text-green">✓</span>
                <span>Held in escrow until you confirm the job is complete.</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
      </section>
    </>
  );
}
