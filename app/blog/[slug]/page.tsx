import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight, Mail } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import { LinkedInIcon, XIcon, GitHubIcon } from "@/components/ui/SocialIcons";
import { mockPosts, mockCategories, siteConfig } from "@/lib/mockData";
import { getPostContent } from "@/lib/content";
import type { ArticleContent } from "@/lib/content";

/* ─── Static params ─── */
export async function generateStaticParams() {
  return mockPosts.map((p) => ({ slug: p.slug }));
}

/* ─── Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = mockPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://powersolution.dev/blog/${post.slug}`,
      images: [{ url: post.coverImage, width: 800, height: 450, alt: post.title }],
      type: "article",
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.coverImage] },
    alternates: { canonical: `https://powersolution.dev/blog/${post.slug}` },
  };
}

/* ─── Content renderer ─── */
function ArticleBody({ blocks }: { blocks: ArticleContent }) {
  return (
    <div className="prose-custom">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: "0.75rem" }}>
                {block.content}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)", fontSize: "1.1rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem" }}>
                {block.content}
              </h3>
            );
          case "p":
            return (
              <p key={i} style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1rem", fontSize: "0.95rem" }}>
                {block.content}
              </p>
            );
          case "ul":
            return (
              <ul key={i} style={{ marginBottom: "1rem", paddingLeft: "1.25rem" }}>
                {block.items?.map((item, j) => (
                  <li key={j} style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "0.35rem", fontSize: "0.95rem" }}>
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} style={{ marginBottom: "1rem", paddingLeft: "1.25rem" }}>
                {block.items?.map((item, j) => (
                  <li key={j} style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "0.35rem", fontSize: "0.95rem" }}>
                    {item}
                  </li>
                ))}
              </ol>
            );
          case "code":
            return (
              <div key={i} style={{ marginBottom: "1.25rem" }}>
                {block.language && (
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--text-tertiary)",
                      padding: "6px 14px 0",
                      background: "var(--bg-secondary)",
                      borderRadius: "12px 12px 0 0",
                      border: "1px solid var(--glass-border)",
                      borderBottom: "none",
                    }}
                  >
                    {block.language}
                  </div>
                )}
                <pre
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: block.language ? "0 0 12px 12px" : "12px",
                    padding: "16px",
                    overflowX: "auto",
                    fontSize: "0.82rem",
                    lineHeight: 1.7,
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  <code>{block.content}</code>
                </pre>
              </div>
            );
          case "callout":
            const calloutColors: Record<string, { bg: string; border: string; icon: string }> = {
              info: { bg: "rgba(0,122,255,0.08)", border: "rgba(0,122,255,0.3)", icon: "ℹ️" },
              tip: { bg: "rgba(52,199,89,0.08)", border: "rgba(52,199,89,0.3)", icon: "💡" },
              warning: { bg: "rgba(255,159,10,0.08)", border: "rgba(255,159,10,0.3)", icon: "⚠️" },
            };
            const cv = calloutColors[block.variant ?? "info"];
            return (
              <div
                key={i}
                style={{
                  background: cv.bg,
                  border: `1px solid ${cv.border}`,
                  borderRadius: "12px",
                  padding: "14px 16px",
                  marginBottom: "1rem",
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: "1rem", flexShrink: 0 }}>{cv.icon}</span>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                  {block.content}
                </p>
              </div>
            );
          case "divider":
            return (
              <hr
                key={i}
                style={{ border: "none", borderTop: "1px solid var(--separator)", margin: "2rem 0" }}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/* ─── Page ─── */
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = mockPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = getPostContent(slug);
  const color = mockCategories.find((c) => c.slug === post.categorySlug)?.accentColor ?? "#007aff";

  const related = mockPosts
    .filter((p) => p.categorySlug === post.categorySlug && p.slug !== post.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author.name, url: siteConfig.url + "/about" },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/blog/${post.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>

        {/* ── Hero cover ── */}
        <div className="relative w-full" style={{ height: "55vh", minHeight: "320px", maxHeight: "520px" }}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 100%)" }}
          />
          {/* Breadcrumb */}
          <div className="absolute top-0 left-0 right-0 pt-24 px-6">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <ArrowLeft size={12} /> Back to Blog
              </Link>
            </div>
          </div>
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
            <div className="max-w-4xl mx-auto">
              <span
                className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
                style={{ background: `${color}dd`, color: "#fff", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
              >
                {post.category}
              </span>
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-white"
                style={{ fontFamily: "var(--font-display, serif)", textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
              >
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* ── Article layout ── */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8">

            {/* Main content */}
            <div>
              {/* Meta bar */}
              <GlassCard padding="sm" className="mb-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Image src={post.author.avatar} alt={post.author.name} width={32} height={32} className="rounded-full" />
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{post.author.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Author</p>
                  </div>
                </div>
                <div className="h-8 w-px" style={{ background: "var(--separator)" }} />
                <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-tertiary)" }}>
                  <Calendar size={12} />
                  <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-tertiary)" }}>
                  <Clock size={12} />
                  <span>{post.readTime} min read</span>
                </div>
              </GlassCard>

              {/* Excerpt */}
              <p
                className="text-base leading-relaxed mb-8 font-medium"
                style={{ color: "var(--text-secondary)", borderLeft: `3px solid ${color}`, paddingLeft: "1rem" }}
              >
                {post.excerpt}
              </p>

              {/* Article body */}
              <ArticleBody blocks={content} />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6" style={{ borderTop: "1px solid var(--separator)" }}>
                <Tag size={13} style={{ color: "var(--text-tertiary)" }} />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ background: "var(--glass-bg)", color: "var(--text-secondary)", border: "1px solid var(--glass-border)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author card */}
              <GlassCard padding="md" className="mt-8 flex items-start gap-4">
                <Image src={post.author.avatar} alt={post.author.name} width={56} height={56} className="rounded-full shrink-0" />
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display, serif)" }}>
                    {post.author.name}
                  </p>
                  <p className="text-xs mt-0.5 mb-2" style={{ color: "var(--accent)" }}>{siteConfig.tagline}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-tertiary)" }}>{siteConfig.bio}</p>
                  <Link href="/about" className="inline-flex items-center gap-1 text-xs font-medium mt-3" style={{ color: "var(--accent)" }}>
                    More about Dipak <ArrowRight size={11} />
                  </Link>
                </div>
              </GlassCard>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 flex flex-col gap-4">
                {/* Article info */}
                <GlassCard padding="sm">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-tertiary)" }}>
                    Article Info
                  </p>
                  <dl className="flex flex-col gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                    <div>
                      <dt style={{ color: "var(--text-tertiary)" }}>Category</dt>
                      <dd className="font-medium mt-0.5" style={{ color }}>{post.category}</dd>
                    </div>
                    <div>
                      <dt style={{ color: "var(--text-tertiary)" }}>Published</dt>
                      <dd className="font-medium mt-0.5">{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</dd>
                    </div>
                    <div>
                      <dt style={{ color: "var(--text-tertiary)" }}>Reading time</dt>
                      <dd className="font-medium mt-0.5">{post.readTime} minutes</dd>
                    </div>
                  </dl>
                </GlassCard>

                {/* Tags sidebar */}
                <GlassCard padding="sm">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-tertiary)" }}>Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>

                {/* Author card */}
                <GlassCard padding="sm">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-tertiary)" }}>Written by</p>
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={44}
                      height={44}
                      className="rounded-full shrink-0"
                      style={{ border: "2px solid var(--glass-border)" }}
                    />
                    <div>
                      <p className="text-sm font-semibold leading-tight" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display, serif)" }}>
                        {post.author.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--accent)" }}>{siteConfig.tagline}</p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-tertiary)" }}>
                    {siteConfig.bio}
                  </p>
                  {/* Social handles */}
                  <div className="flex gap-2">
                    <a
                      href={siteConfig.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="flex items-center justify-center p-1.5 rounded-lg transition-all hover:scale-110"
                      style={{ background: "#0077B5", color: "#fff" }}
                    >
                      <LinkedInIcon size={14} />
                    </a>
                    <a
                      href={siteConfig.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X / Twitter"
                      className="flex items-center justify-center p-1.5 rounded-lg transition-all hover:scale-110"
                      style={{ background: "#000000", color: "#fff" }}
                    >
                      <XIcon size={14} />
                    </a>
                    <a
                      href={siteConfig.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="flex items-center justify-center p-1.5 rounded-lg transition-all hover:scale-110"
                      style={{ background: "#24292e", color: "#fff" }}
                    >
                      <GitHubIcon size={14} />
                    </a>
                    <Link
                      href="/about"
                      className="ml-auto text-xs font-medium flex items-center gap-1 transition-colors hover:underline"
                      style={{ color: "var(--accent)" }}
                    >
                      Profile <ArrowRight size={10} />
                    </Link>
                  </div>
                </GlassCard>

                {/* Newsletter subscribe */}
                <GlassCard padding="sm" style={{ background: "linear-gradient(135deg, rgba(0,122,255,0.08), rgba(88,86,214,0.08))", border: "1px solid rgba(0,122,255,0.2)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,122,255,0.12)" }}>
                      <Mail size={14} style={{ color: "var(--accent)" }} />
                    </div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Stay in the loop</p>
                  </div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                    Get new articles on Power Platform, Azure &amp; AI delivered straight to your inbox.
                  </p>
                  <Link
                    href="/#newsletter"
                    className="flex items-center justify-center gap-1.5 w-full py-2 rounded-full text-xs font-semibold text-white transition-all hover:scale-[1.02]"
                    style={{ background: "var(--accent)", boxShadow: "0 3px 10px rgba(0,122,255,0.3)" }}
                  >
                    Subscribe <ArrowRight size={11} />
                  </Link>
                </GlassCard>

              </div>
            </aside>
          </div>

          {/* ── Related posts ── */}
          {related.length > 0 && (
            <section className="mt-16 pt-8" style={{ borderTop: "1px solid var(--separator)" }}>
              <h2
                className="text-xl font-bold mb-6"
                style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}
              >
                More in {post.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((rp) => {
                  const rColor = mockCategories.find((c) => c.slug === rp.categorySlug)?.accentColor ?? "#007aff";
                  return (
                    <Link key={rp.id} href={`/blog/${rp.slug}`} className="group block">
                      <GlassCard hover padding="none" className="overflow-hidden flex flex-col h-full">
                        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                          <Image
                            src={rp.coverImage}
                            alt={rp.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.4) 100%)" }} />
                          <span
                            className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: `${rColor}dd`, color: "#fff", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
                          >
                            {rp.category}
                          </span>
                        </div>
                        <div className="p-3 flex flex-col gap-1 flex-1">
                          <h3
                            className="text-sm font-semibold leading-snug line-clamp-2 group-hover:underline decoration-1 underline-offset-2"
                            style={{ color: "var(--text-primary)", fontFamily: "var(--font-display, serif)" }}
                          >
                            {rp.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-auto pt-2 text-xs" style={{ color: "var(--text-tertiary)" }}>
                            <Clock size={10} />{rp.readTime} min
                          </div>
                        </div>
                      </GlassCard>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
