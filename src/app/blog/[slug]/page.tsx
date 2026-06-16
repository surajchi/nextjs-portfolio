import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { SITE } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import MarkdownContent from "@/components/MarkdownContent";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const url = `${SITE.url}/blog/${post.slug}/`;
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [SITE.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: { "@type": "Person", name: SITE.author, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}/`,
  };

  return (
    <article className="py-28 px-6 max-w-2xl mx-auto relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors hover:text-[var(--accent-color)]"
        style={{ color: "var(--text-muted)" }}
      >
        <ArrowLeft size={15} /> Back to all articles
      </Link>

      {/* Gold accent bar */}
      <div
        className="w-10 h-0.5 mb-6 rounded"
        style={{
          background:
            "linear-gradient(90deg, var(--accent-color), var(--accent-2))",
        }}
      />

      <div className="flex items-center gap-3 mb-4">
        <Badge variant="gold">Article</Badge>
        <time
          dateTime={post.date}
          className="text-xs font-mono-custom tracking-wide"
          style={{ color: "var(--text-muted)" }}
        >
          {formatDate(post.date)}
        </time>
      </div>

      <h1
        className="font-display text-3xl md:text-4xl font-bold mb-4 leading-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {post.title}
      </h1>

      <p
        className="text-base leading-relaxed mb-10"
        style={{ color: "var(--text-muted)" }}
      >
        {post.summary}
      </p>

      <MarkdownContent content={post.content} />
    </article>
  );
}
