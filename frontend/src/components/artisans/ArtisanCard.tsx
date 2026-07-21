import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { CATEGORY_LIST } from "@/lib/constants";
import type { Artisan } from "@/lib/types";

export function categoryLabel(slug: string) {
  return CATEGORY_LIST.find((c) => c.slug === slug)?.label ?? slug;
}

export function ArtisanCard({ artisan, wide = false }: { artisan: Artisan; wide?: boolean }) {
  return (
    <Link
      href={`/artisans/${artisan._id}`}
      className={`block flex-shrink-0 overflow-hidden rounded-2xl border border-line-soft bg-white transition-all hover:shadow-xl hover:-translate-y-0.5 ${
        wide ? "w-full" : "w-[300px] snap-start"
      }`}
    >
      <div className="relative flex h-[150px] items-center justify-center border-b border-line-soft bg-[oklch(97%_0.008_55)]">
        <span className="font-mono text-[10px] text-ink-faint">photo</span>
        {artisan.verifiedId && (
          <span className="absolute left-3 top-3">
            <Badge tone="accent">✓ Verified</Badge>
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="mb-1 flex items-baseline justify-between">
          <span className="font-display text-[16px] font-bold">{artisan.name}</span>
          <span className="text-[13px] font-bold">
            <span className="text-amber-500">★</span> {artisan.rating}
          </span>
        </div>
        <div className="mb-3 text-[13px] text-ink-soft">
          {categoryLabel(artisan.category)} · {artisan.area}
        </div>
        <div className="flex justify-between border-t border-line-soft pt-3 text-xs text-ink-soft">
          <span>{artisan.jobsCount} jobs done</span>
          <span>~{artisan.response}</span>
        </div>
      </div>
    </Link>
  );
}
