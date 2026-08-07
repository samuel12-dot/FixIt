"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "./Container";

export function BackLink({ href, label }: { href?: string; label: string }) {
  const router = useRouter();
  const content = (
    <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-ink">
      <span>←</span>
      <span>{label}</span>
    </span>
  );

  return (
    <div className="pt-4.5">
      <Container>
        {href ? (
          <Link href={href}>{content}</Link>
        ) : (
          <button onClick={() => router.back()}>{content}</button>
        )}
      </Container>
    </div>
  );
}
