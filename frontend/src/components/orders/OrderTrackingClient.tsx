"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BackLink } from "@/components/layout/BackLink";
import { Button } from "@/components/ui/Button";
import { categoryLabel } from "@/components/artisans/ArtisanCard";
import { apiFetch, ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { Booking, ChatMessage } from "@/lib/types";

const STEP_LABELS = ["Booked", "Accepted", "En route", "In progress"];
const STATUS_TO_STEP: Record<string, number> = {
  pending: 0,
  accepted: 1,
  en_route: 2,
  in_progress: 3,
  completed: 3,
};

const QUICK_REPLIES = ["What time will you arrive?", "Please call when you're close", "Thank you!"];

export function OrderTrackingClient({ bookingId }: { bookingId: string }) {
  const { user, token, ready } = useAuth();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewSent, setReviewSent] = useState(false);

  const load = useCallback(async () => {
    if (!token) return;
    try {
      const res = await apiFetch<{ booking: Booking; messages: ChatMessage[] }>(`/bookings/${bookingId}`, {
        token,
      });
      setBooking(res.booking);
      setMessages(res.messages);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [bookingId, token]);

  useEffect(() => {
    if (ready && token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- async load sets state once data arrives
      load();
    }
  }, [ready, token, load]);

  async function advance() {
    if (!token) return;
    const res = await apiFetch<{ booking: Booking }>(`/bookings/${bookingId}/advance`, {
      method: "PATCH",
      token,
    });
    setBooking(res.booking);
  }

  async function release() {
    if (!token) return;
    const res = await apiFetch<{ booking: Booking }>(`/bookings/${bookingId}/release`, {
      method: "POST",
      token,
    });
    setBooking(res.booking);
  }

  async function sendMessage(text: string) {
    if (!token || !text.trim()) return;
    setDraft("");
    const res = await apiFetch<{ messages: ChatMessage[] }>(`/bookings/${bookingId}/messages`, {
      method: "POST",
      token,
      body: { text },
    });
    setMessages((prev) => [...prev, ...res.messages]);
  }

  async function submitReview() {
    if (!token) return;
    await apiFetch(`/bookings/${bookingId}/review`, {
      method: "POST",
      token,
      body: { stars: reviewStars, text: reviewText },
    });
    setReviewSent(true);
  }

  if (ready && !user) {
    return (
      <section className="py-16">
        <Container className="max-w-[480px] text-center">
          <div className="rounded-2xl border border-line-soft bg-white p-9">
            <h1 className="font-display mb-2.5 text-2xl font-bold tracking-tight">Sign in required</h1>
            <p className="mb-6 text-sm text-ink-soft">Sign in to view this order.</p>
            <Link href="/signin">
              <Button>Sign in</Button>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  if (loading || !ready) {
    return (
      <section className="py-16 text-center text-ink-soft">
        <Container>Loading order…</Container>
      </section>
    );
  }

  if (error || !booking) {
    return (
      <section className="py-16 text-center text-ink-soft">
        <Container>{error || "Order not found"}</Container>
      </section>
    );
  }

  const activeStep = STATUS_TO_STEP[booking.status] ?? 0;
  const canRelease = !booking.paymentReleased && booking.status === "in_progress";
  const canAdvance = booking.status !== "in_progress" && booking.status !== "completed";
  const firstName = booking.artisan.name.split(" ")[0];

  return (
    <>
      <BackLink href={`/artisans/${booking.artisan._id}`} label="Profile" />
      <section className="py-5 pb-16">
      <Container className="max-w-[1100px]">
        <h1 className="font-display mb-1 text-[26px] font-bold tracking-tight">Order #{booking.orderCode}</h1>
        <div className="mb-7 text-sm text-ink-soft">
          {categoryLabel(booking.category)} with {booking.artisan.name} · {booking.address}
        </div>

        <div className="mb-6 rounded-[18px] border border-line-soft bg-white p-7">
          <div className="flex flex-col sm:flex-row">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex flex-1 items-center">
                <div className="flex shrink-0 flex-col items-center gap-2">
                  <div
                    className={`flex h-9.5 w-9.5 items-center justify-center rounded-full border-2 text-[15px] font-bold ${
                      i < activeStep || (i === activeStep && booking.status === "completed")
                        ? "border-green bg-green text-white"
                        : i === activeStep
                        ? "border-accent bg-accent text-white"
                        : "border-line bg-white text-ink-faint"
                    }`}
                  >
                    {i < activeStep || booking.status === "completed" ? "✓" : i + 1}
                  </div>
                  <div className="whitespace-nowrap text-center text-xs font-semibold text-ink-soft">
                    {label}
                  </div>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className={`mt-[-19px] h-0.5 flex-1 rounded-full ${
                      i < activeStep ? "bg-green" : "bg-line"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-4">
            <div className="rounded-[18px] border border-line-soft bg-white p-5">
              <div className="mb-3.5 font-bold text-sm">Chat with {firstName}</div>
              <div className="mb-3.5 flex max-h-[280px] flex-col gap-2.5 overflow-y-auto">
                {messages.map((m) => (
                  <div
                    key={m._id}
                    className={`max-w-[80%] rounded-2xl border px-3.5 py-2.5 text-sm leading-snug ${
                      m.from === "customer"
                        ? "self-end border-accent bg-accent text-white"
                        : "self-start border-line-soft bg-neutral-50 text-ink"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="mb-2.5 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="rounded-full bg-accent-soft px-3.5 py-1.5 text-xs font-semibold text-accent-dark"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(draft)}
                  placeholder="Type a message…"
                  className="flex-1 rounded-[10px] border border-line px-3 py-2.5 text-sm"
                />
                <button
                  onClick={() => sendMessage(draft)}
                  className="rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-bold text-white"
                >
                  Send
                </button>
              </div>
            </div>

            {canAdvance && (
              <button
                onClick={advance}
                className="self-start rounded-[10px] border border-dashed border-line px-3.5 py-2 text-xs text-ink-soft"
              >
                Demo: simulate next status update →
              </button>
            )}

            {booking.status === "completed" && !reviewSent && (
              <div className="rounded-[18px] border border-line-soft bg-white p-5">
                <div className="mb-3 font-bold text-sm">Leave a review for {firstName}</div>
                <div className="mb-3 flex gap-1 text-xl text-amber-500">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setReviewStars(n)} className="cursor-pointer">
                      {n <= reviewStars ? "★" : <span className="text-line">★</span>}
                    </button>
                  ))}
                </div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="How was the job?"
                  rows={3}
                  className="mb-3 w-full rounded-[11px] border border-line p-3 text-sm"
                />
                <Button onClick={submitReview} disabled={!reviewText.trim()}>
                  Submit review
                </Button>
              </div>
            )}
            {reviewSent && (
              <div className="rounded-[18px] border border-line-soft bg-white p-5 text-sm text-ink-soft">
                ✓ Thanks for your review!
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3.5 rounded-[18px] border border-line-soft bg-white p-4.5">
              <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl border border-[oklch(93%_0.01_55)] bg-[oklch(97%_0.008_55)]">
                <span className="font-mono text-[8px] text-ink-soft">photo</span>
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm">{booking.artisan.name}</div>
                <div className="text-xs text-ink-soft">{categoryLabel(booking.category)}</div>
              </div>
              <button className="rounded-[10px] border border-line px-4 py-2 text-xs font-semibold">
                Call
              </button>
            </div>

            <div className="rounded-[18px] border border-line-soft bg-white p-5">
              <div className="mb-1 text-[13px] text-ink-soft">Amount in escrow</div>
              <div className="font-display mb-4 text-2xl font-bold">
                ₦{booking.artisan.priceMin}–{booking.artisan.priceMax}
              </div>
              {booking.paymentReleased ? (
                <div className="flex items-center gap-2 rounded-[10px] bg-green-soft px-3 py-3 text-[13px] font-semibold text-sky-700">
                  ✓ Payment released to {firstName}
                </div>
              ) : canRelease ? (
                <Button className="w-full" onClick={release}>
                  Confirm complete &amp; release payment
                </Button>
              ) : (
                <div className="text-xs leading-relaxed text-ink-soft">
                  Payment releases once the job is marked complete. You&apos;ll be asked to confirm first.
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
      </section>
    </>
  );
}
