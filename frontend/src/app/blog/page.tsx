import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import type { BlogPost } from "@/lib/types";

const POST_IMAGES = ["/images/post-1.png", "/images/post-2.png", "/images/post-3.png", "/images/post-4.png", "/images/post-5.png"];

async function getPosts() {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
  try {
    const res = await fetch(`${base}/blog`, { cache: "no-store" });
    return res.ok ? ((await res.json()).posts as BlogPost[]) : [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <section className="py-12 pb-16">
      <Container>
        <h1 className="font-display mb-2.5 text-[32px] sm:text-[40px] font-extrabold tracking-[-1.5px]">
          The FixIt Blog
        </h1>
        <p className="mb-9 max-w-[520px] text-[17px] leading-relaxed text-[oklch(46%_0.02_260)]">
          Home care tips, honest price guides, and the story of building trust in Lagos.
        </p>

        {featured && (
          <Link
            href={`/blog/${featured._id}`}
            className="mb-9 grid overflow-hidden rounded-[20px] border border-line-soft transition-shadow hover:shadow-xl sm:grid-cols-[1.2fr_1fr]"
          >
            <div className="relative min-h-[220px] overflow-hidden border-b border-[oklch(93%_0.01_55)] bg-[oklch(97%_0.008_55)] sm:min-h-[280px] sm:border-b-0 sm:border-r">
              <Image
                src="/images/featured-post.png"
                alt={featured.title}
                fill
                sizes="(min-width: 640px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-9">
              <span className="mb-3.5 inline-flex w-fit rounded-full bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent-dark">
                {featured.cat}
              </span>
              <h2 className="font-display mb-3 text-[22px] sm:text-[26px] font-extrabold leading-snug tracking-tight">
                {featured.title}
              </h2>
              <p className="mb-4 text-[15px] leading-relaxed text-ink-soft">{featured.excerpt}</p>
              <div className="text-[13px] text-ink-faint">
                {featured.date} · {featured.read} read
              </div>
            </div>
          </Link>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Link
              key={p._id}
              href={`/blog/${p._id}`}
              className="overflow-hidden rounded-2xl border border-line-soft bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative h-[160px] overflow-hidden border-b border-[oklch(93%_0.01_55)] bg-[oklch(97%_0.008_55)]">
                <Image
                  src={POST_IMAGES[i % POST_IMAGES.length]}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <span className="mb-3 inline-flex rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-bold text-[oklch(45%_0.02_260)]">
                  {p.cat}
                </span>
                <div className="font-display mb-2 text-[17px] font-bold leading-snug">{p.title}</div>
                <div className="mb-3.5 text-sm leading-relaxed text-ink-soft">{p.excerpt}</div>
                <div className="text-xs text-ink-faint">
                  {p.date} · {p.read} read
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
