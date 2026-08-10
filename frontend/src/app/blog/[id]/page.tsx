import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { BlogPost } from "@/lib/types";

const ARTICLE_HERO_IMAGES = [
  "/images/article-hero-1.png",
  "/images/article-hero-2.png",
  "/images/article-hero-3.png",
  "/images/article-hero-4.png",
  "/images/article-hero-5.png",
];

function heroImageFor(id: string) {
  const hash = Array.from(id).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return ARTICLE_HERO_IMAGES[hash % ARTICLE_HERO_IMAGES.length];
}

async function getPost(id: string) {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
  const res = await fetch(`${base}/blog/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return ((await res.json()).post) as BlogPost;
}

export default async function BlogArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  const paragraphs = post.content.split(". ").reduce<string[]>((acc, sentence, i, arr) => {
    const withDot = i < arr.length - 1 ? `${sentence}.` : sentence;
    if (i % 2 === 0) acc.push(withDot);
    else acc[acc.length - 1] += ` ${withDot}`;
    return acc;
  }, []);

  return (
    <article className="py-10 pb-16">
      <Container className="max-w-[720px]">
        <Link href="/blog" className="mb-6 flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-ink">
          <span>←</span>All articles
        </Link>
        <span className="mb-4 inline-flex rounded-full bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent-dark">
          {post.cat}
        </span>
        <h1 className="font-display mb-4 text-[28px] sm:text-[36px] font-extrabold leading-[1.1] tracking-tight">
          {post.title}
        </h1>
        <div className="mb-7 flex items-center gap-3 border-b border-line-soft pb-6">
          <div className="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-accent-soft font-bold text-accent-dark">
            F
          </div>
          <div>
            <div className="text-sm font-bold">FixIt Editorial</div>
            <div className="text-[13px] text-ink-faint">
              {post.date} · {post.read} read
            </div>
          </div>
        </div>
        <div className="relative mb-7 aspect-3/2 overflow-hidden rounded-2xl border border-[oklch(93%_0.01_55)] bg-[oklch(97%_0.008_55)]">
          <Image
            src={heroImageFor(post._id)}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col gap-5 text-[17px] leading-[1.75] text-[oklch(34%_0.02_260)]">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-9 rounded-2xl bg-accent p-7 text-center text-white">
          <div className="font-display mb-2 text-xl font-extrabold">Need a hand with this?</div>
          <p className="mb-4.5 text-sm text-accent-soft">Book a verified technician near you today.</p>
          <Link href="/search">
            <Button variant="secondary">Find a technician</Button>
          </Link>
        </div>
      </Container>
    </article>
  );
}
