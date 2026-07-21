"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth-context";
import { CATEGORY_LIST } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/for-artisans", label: "For artisans" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About us" },
  { href: "/pricing", label: "How payment works" },
  { href: "/blog", label: "Blog" },
  { href: "/help", label: "Help center" },
  { href: "/contact", label: "Contact us" },
];

export function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  function closeAll() {
    setServicesOpen(false);
    setCompanyOpen(false);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-white/90 backdrop-blur-md">
      <Container className="flex items-center justify-between gap-5 py-4">
        <Link href="/" onClick={closeAll} className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-accent">
            <span className="font-display text-[17px] font-extrabold text-white">F</span>
          </span>
          <span className="font-display text-[20px] font-extrabold tracking-tight">FixIt</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-[15px] font-medium text-ink-soft">
          <Link href="/search" className="hover:text-ink">
            Find an artisan
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link href="/services" className="flex items-center gap-1 hover:text-ink">
              Services <span className="text-[10px] text-ink-faint">▾</span>
            </Link>
            {servicesOpen && (
              <div className="absolute left-[-16px] top-full pt-3.5">
                <div className="grid w-[280px] grid-cols-2 gap-0.5 rounded-2xl border border-line-soft bg-white p-2 shadow-xl">
                  {CATEGORY_LIST.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/search?category=${cat.slug}`}
                      onClick={closeAll}
                      className="rounded-lg px-3 py-2.5 text-sm font-semibold text-ink hover:bg-neutral-50"
                    >
                      {cat.label}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    onClick={closeAll}
                    className="col-span-2 rounded-lg py-2.5 text-center text-[13px] font-bold text-accent-dark hover:bg-accent-soft"
                  >
                    View all services →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <Link href="/about" className="flex items-center gap-1 hover:text-ink">
              Company <span className="text-[10px] text-ink-faint">▾</span>
            </Link>
            {companyOpen && (
              <div className="absolute left-[-16px] top-full pt-3.5">
                <div className="flex w-[190px] flex-col gap-0.5 rounded-2xl border border-line-soft bg-white p-2 shadow-xl">
                  {COMPANY_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeAll}
                      className="rounded-lg px-3 py-2.5 text-sm font-semibold text-ink hover:bg-neutral-50"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm font-semibold text-ink-soft">Hi, {user.name.split(" ")[0]}</span>
              <Button
                variant="secondary"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link href="/signin" className="text-[15px] font-semibold text-ink-soft hover:text-ink">
                Sign in
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="flex md:hidden h-10 w-10 items-center justify-center rounded-[10px] border border-line"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <div className="w-4">
            <div className="h-0.5 bg-ink mb-1" />
            <div className="h-0.5 bg-ink mb-1" />
            <div className="h-0.5 bg-ink" />
          </div>
        </button>
      </Container>

      {mobileOpen && (
        <div className="flex md:hidden flex-col gap-1 border-t border-line-soft px-6 pb-5 pt-2 text-[15px] font-medium max-h-[70vh] overflow-y-auto">
          <Link href="/search" onClick={closeAll} className="py-2.5 text-ink">
            Find an artisan
          </Link>
          <Link href="/services" onClick={closeAll} className="py-2.5 text-ink">
            Services
          </Link>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeAll} className="py-2.5 text-ink">
              {link.label}
            </Link>
          ))}
          {COMPANY_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeAll} className="py-2.5 text-ink">
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex gap-2.5">
            {user ? (
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  logout();
                  closeAll();
                  router.push("/");
                }}
              >
                Sign out
              </Button>
            ) : (
              <>
                <Link href="/signin" className="flex-1" onClick={closeAll}>
                  <Button variant="secondary" className="w-full">
                    Sign in
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1" onClick={closeAll}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
