import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Clock, Calendar,
  AppWindow, Layers, Cloud, BrainCircuit, BookOpen, Sparkles,
  Zap, Globe, Mail
} from "lucide-react";
import { LinkedInIcon, XIcon, GitHubIcon } from "@/components/ui/SocialIcons";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import { siteConfig, mockCategories, mockPosts } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Dipak Shaw — Digital Transform Enthusiast writing about Power Platform, Microsoft Azure, SharePoint, OpenAI, Anthropic Claude, and Google Gemini.",
  openGraph: {
    title: "About Dipak Shaw | Power Solution",
    description: "Digital Transform Enthusiast writing about Power Platform, Azure & AI.",
    url: "https://powersolution.dev/about",
  },
  alternates: { canonical: "https://powersolution.dev/about" },
};

const categoryIcons: Record<string, React.ReactNode> = {
  AppWindow: <AppWindow size={22} />,
  Layers: <Layers size={22} />,
  Cloud: <Cloud size={22} />,
  BrainCircuit: <BrainCircuit size={22} />,
  BookOpen: <BookOpen size={22} />,
  Sparkles: <Sparkles size={22} />,
};

const stats = [
  { value: "40+", label: "Articles Published" },
  { value: "6", label: "Topic Areas" },
  { value: "5+", label: "Years Experience" },
  { value: "10K+", label: "Readers Monthly" },
];

const recentPosts = mockPosts.slice(0, 4);

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>

        {/* ── Hero ── */}
        <section className="max-w-5xl mx-auto px-6 pt-28 pb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">

            {/* Avatar */}
            <div className="relative shrink-0">
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-40"
                style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))", transform: "scale(1.15)" }}
              />
              <Image
                src="https://picsum.photos/seed/dipak-shaw-profile/160/160"
                alt="Dipak Shaw"
                width={160}
                height={160}
                className="relative rounded-full"
                style={{ border: "3px solid var(--glass-border)", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
                priority
              />
              {/* Online dot */}
              <span
                className="absolute bottom-2 right-2 w-5 h-5 rounded-full"
                style={{ background: "#34c759", border: "3px solid var(--bg-primary)" }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(0,122,255,0.12)", color: "var(--accent)" }}
                >
                  <Zap size={10} className="inline mr-1" />
                  Power Solution
                </span>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(52,199,89,0.12)", color: "#34c759" }}
                >
                  Open to collaborations
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl font-bold mb-1"
                style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}
              >
                Dipak Shaw
              </h1>
              <p className="text-base font-medium mb-4" style={{ color: "var(--accent)" }}>
                {siteConfig.tagline}
              </p>
              <p className="text-sm leading-relaxed max-w-xl mx-auto md:mx-0 mb-6" style={{ color: "var(--text-secondary)" }}>
                {siteConfig.bio}
              </p>

              {/* Social + contact */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105"
                  style={{ background: "#0077B5", color: "#fff" }}
                >
                  <LinkedInIcon size={14} /> LinkedIn
                </a>
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105"
                  style={{ background: "#000000", color: "#fff" }}
                >
                  <XIcon size={14} /> @dipakshaw
                </a>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105"
                  style={{ background: "#24292e", color: "#fff" }}
                >
                  <GitHubIcon size={14} /> GitHub
                </a>
                <a
                  href="https://powersolution.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105"
                  style={{ background: "var(--glass-bg)", color: "var(--text-primary)", border: "1px solid var(--glass-border)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
                >
                  <Globe size={14} /> powersolution.dev
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <GlassCard key={s.label} padding="md" className="text-center">
                <p
                  className="text-3xl font-bold mb-1"
                  style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "var(--font-display, serif)" }}
                >
                  {s.value}
                </p>
                <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{s.label}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ── Expertise ── */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}>
            What I Write About
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>
            Six topic areas — from Microsoft Power Platform to the latest generative AI.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCategories.map((cat) => (
              <Link key={cat.slug} href={`/#topics`}>
                <GlassCard hover padding="md" className="h-full group">
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2.5 rounded-xl shrink-0"
                      style={{ background: `${cat.accentColor}18`, color: cat.accentColor }}
                    >
                      {categoryIcons[cat.icon] ?? <AppWindow size={22} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1 group-hover:underline" style={{ color: "var(--text-primary)" }}>
                        {cat.name}
                      </h3>
                      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-tertiary)" }}>
                        {cat.description}
                      </p>
                      <p className="text-xs font-semibold mt-2" style={{ color: cat.accentColor }}>
                        {cat.postCount} articles
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Recent writing ── */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}>
              Recent Writing
            </h2>
            <Link href="/blog" className="flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all" style={{ color: "var(--accent)" }}>
              All articles <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentPosts.map((post) => {
              const color = mockCategories.find((c) => c.slug === post.categorySlug)?.accentColor ?? "#007aff";
              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <GlassCard hover padding="sm" className="flex items-start gap-4">
                    <div className="relative shrink-0 overflow-hidden rounded-xl" style={{ width: 72, height: 52 }}>
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="72px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: `${color}18`, color }}
                      >
                        {post.category}
                      </span>
                      <h3
                        className="text-sm font-semibold mt-1 line-clamp-1 group-hover:underline decoration-1 underline-offset-2"
                        style={{ color: "var(--text-primary)", fontFamily: "var(--font-display, serif)" }}
                      >
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: "var(--text-tertiary)" }}>
                        <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(post.date)}</span>
                        <span className="flex items-center gap-1"><Clock size={10} />{post.readTime} min</span>
                      </div>
                    </div>
                    <ArrowRight size={14} className="shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 mt-2" style={{ color }} />
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <GlassCard padding="lg" className="text-center" style={{ background: `linear-gradient(135deg, rgba(0,122,255,0.08), rgba(88,86,214,0.08))`, border: "1px solid rgba(0,122,255,0.2)" }}>
            <Mail size={28} className="mx-auto mb-3" style={{ color: "var(--accent)" }} />
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}>
              Stay in the loop
            </h2>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
              Get new articles on Power Platform, Azure &amp; AI delivered to your inbox. No spam, unsubscribe any time.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
              style={{ background: "var(--accent)", color: "#fff", boxShadow: "0 4px 16px rgba(0,122,255,0.3)" }}
            >
              Subscribe to the newsletter <ArrowRight size={14} />
            </Link>
          </GlassCard>
        </section>

      </main>
      <Footer />
    </>
  );
}
