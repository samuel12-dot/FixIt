"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "./Container";
import { CATEGORY_LIST, LAGOS_AREAS } from "@/lib/constants";
import { apiFetch } from "@/lib/api";

const SOCIAL_LINKS = [
  { label: "f", name: "Facebook" },
  { label: "IG", name: "Instagram" },
  { label: "X", name: "X" },
  { label: "in", name: "LinkedIn" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState(false);

  async function submit() {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErr(true);
      return;
    }
    setErr(false);
    try {
      await apiFetch("/newsletter", { method: "POST", body: { email } });
      setSent(true);
    } catch {
      setErr(true);
    }
  }

  return (
    <footer className="bg-sky-950 text-white">
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr] mb-10">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-white/10">
                <span className="font-display text-[17px] font-extrabold">F</span>
              </span>
              <span className="font-display text-[20px] font-extrabold">FixIt</span>
            </div>
            <p className="text-sm text-sky-200/80 leading-relaxed max-w-[220px] mb-5">
              Verified artisans, escrow-protected payments, across Lagos.
            </p>
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map((s) => (
                <button
                  key={s.name}
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-900 text-[13px] font-bold text-white hover:bg-sky-800"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[13px] font-bold mb-3.5">Services</div>
            <div className="flex flex-col gap-2.5 text-sm text-sky-200/80">
              {CATEGORY_LIST.map((c) => (
                <Link key={c.slug} href={`/search?category=${c.slug}`} className="hover:text-white">
                  {c.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[13px] font-bold mb-3.5">Service areas</div>
            <div className="flex flex-col gap-2.5 text-sm text-sky-200/80">
              {LAGOS_AREAS.map((a) => (
                <Link key={a} href={`/search?area=${a}`} className="hover:text-white">
                  {a}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[13px] font-bold mb-3.5">Company</div>
            <div className="flex flex-col gap-2.5 text-sm text-sky-200/80">
              <Link href="/about" className="hover:text-white">
                About us
              </Link>
              <Link href="/for-artisans" className="hover:text-white">
                For artisans
              </Link>
              <Link href="/pricing" className="hover:text-white">
                How payment works
              </Link>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
              <Link href="/help" className="hover:text-white">
                Help center
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact us
              </Link>
            </div>
          </div>

          <div>
            <div className="text-[13px] font-bold mb-3.5">Get the app</div>
            <div className="flex flex-col gap-2.5 mb-5.5">
              <button className="flex items-center gap-2.5 rounded-[10px] border border-sky-800 px-3.5 py-2.5 text-left hover:border-sky-600">
                <svg viewBox="0 0 384 512" className="h-4.5 w-4.5 fill-white" aria-hidden="true">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                <span>
                  <span className="block text-[10px] text-sky-300">Download on the</span>
                  <span className="block text-sm font-bold text-white">App Store</span>
                </span>
              </button>
              <button className="flex items-center gap-2.5 rounded-[10px] border border-sky-800 px-3.5 py-2.5 text-left hover:border-sky-600">
                <span className="text-base">▶</span>
                <span>
                  <span className="block text-[10px] text-sky-300">Get it on</span>
                  <span className="block text-sm font-bold text-white">Google Play</span>
                </span>
              </button>
            </div>

            <div className="text-[13px] font-bold mb-2.5">Newsletter</div>
            {sent ? (
              <div className="text-[13px] text-sky-300 flex items-center gap-1.5">
                ✓ You&apos;re subscribed. Welcome!
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className={`min-w-0 flex-1 rounded-[9px] border bg-sky-900 px-3 py-2.5 text-[13px] text-white outline-none ${
                      err ? "border-red-400" : "border-sky-700"
                    }`}
                  />
                  <button
                    onClick={submit}
                    className="whitespace-nowrap rounded-[9px] bg-green px-3.5 py-2.5 text-[13px] font-bold text-white"
                  >
                    Join
                  </button>
                </div>
                {err && <div className="mt-1.5 text-xs text-red-300">Enter a valid email address</div>}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-sky-800 pt-6 text-[13px] text-sky-300/80">
          <span>© 2026 FixIt · Lagos, Nigeria</span>
          <div className="flex gap-5">
            <span className="cursor-pointer hover:text-white">Privacy</span>
            <span className="cursor-pointer hover:text-white">Terms</span>
            <span className="cursor-pointer hover:text-white">Cookies</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
