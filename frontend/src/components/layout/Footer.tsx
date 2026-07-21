"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "./Container";
import { CATEGORY_LIST, LAGOS_AREAS } from "@/lib/constants";
import { apiFetch } from "@/lib/api";

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
    <footer className="bg-emerald-950 text-white">
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-white/10">
                <span className="font-display text-[17px] font-extrabold">F</span>
              </span>
              <span className="font-display text-[20px] font-extrabold">FixIt</span>
            </div>
            <p className="text-sm text-emerald-200/80 leading-relaxed max-w-[220px]">
              Verified artisans, escrow-protected payments, across Lagos.
            </p>
          </div>

          <div>
            <div className="text-[13px] font-bold mb-3.5">Services</div>
            <div className="flex flex-col gap-2.5 text-sm text-emerald-200/80">
              {CATEGORY_LIST.map((c) => (
                <Link key={c.slug} href={`/search?category=${c.slug}`} className="hover:text-white">
                  {c.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[13px] font-bold mb-3.5">Service areas</div>
            <div className="flex flex-col gap-2.5 text-sm text-emerald-200/80">
              {LAGOS_AREAS.map((a) => (
                <Link key={a} href={`/search?area=${a}`} className="hover:text-white">
                  {a}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[13px] font-bold mb-3.5">Company</div>
            <div className="flex flex-col gap-2.5 text-sm text-emerald-200/80 mb-5">
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

            <div className="text-[13px] font-bold mb-2.5">Newsletter</div>
            {sent ? (
              <div className="text-[13px] text-emerald-300 flex items-center gap-1.5">
                ✓ You&apos;re subscribed. Welcome!
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className={`min-w-0 flex-1 rounded-[9px] border bg-emerald-900 px-3 py-2.5 text-[13px] text-white outline-none ${
                      err ? "border-red-400" : "border-emerald-700"
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

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-emerald-800 pt-6 text-[13px] text-emerald-300/80">
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
