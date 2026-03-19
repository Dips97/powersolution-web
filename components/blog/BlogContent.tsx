"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, Calendar, ArrowRight, SlidersHorizontal } from "lucide-react";
import { mockPosts, mockCategories } from "@/lib/mockData";
import GlassCard from "@/components/ui/GlassCard";

function getCategoryColor(slug: string): string {
  return mockCategories.find((c) => c.slug === slug)?.accentColor ?? "#007aff";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogContent() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let posts = [...mockPosts];
    if (activeCategory) posts = posts.filter((p) => p.categorySlug === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return posts;
  }, [query, activeCategory]);

  const activeColor = activeCategory ? getCategoryColor(activeCategory) : "var(--accent)";

  return (
    <>
      {/* ── Page hero ── */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
              All Writing
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}
            >
              The Blog
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--text-tertiary)" }}>
              {mockPosts.length} articles on Power Platform, Azure, SharePoint &amp; AI
            </p>
          </div>

          {/* Search bar */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl w-full md:w-80"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <Search size={16} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "var(--text-primary)", caretColor: "var(--accent)" }}
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Clear search">
                <X size={14} style={{ color: "var(--text-tertiary)" }} />
              </button>
            )}
          </div>
        </div>

        {/* ── Filter pills ── */}
        <div className="flex items-center gap-2 flex-wrap">
          <SlidersHorizontal size={13} style={{ color: "var(--text-tertiary)" }} />
          <button
            onClick={() => setActiveCategory(null)}
            className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
            style={{
              background: !activeCategory ? "var(--accent)" : "var(--glass-bg)",
              color: !activeCategory ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${!activeCategory ? "var(--accent)" : "var(--glass-border)"}`,
            }}
          >
            All ({mockPosts.length})
          </button>
          {mockCategories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(isActive ? null : cat.slug)}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: isActive ? cat.accentColor : "var(--glass-bg)",
                  color: isActive ? "#fff" : "var(--text-secondary)",
                  border: `1px solid ${isActive ? cat.accentColor : "var(--glass-border)"}`,
                }}
              >
                {cat.name} ({cat.postCount})
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Results ── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold" style={{ color: "var(--text-primary)" }}>No articles found</p>
            <p className="text-sm mt-1" style={{ color: "var(--text-tertiary)" }}>
              Try a different search term or topic filter
            </p>
            <button
              onClick={() => { setQuery(""); setActiveCategory(null); }}
              className="mt-4 text-sm font-medium"
              style={{ color: "var(--accent)" }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs mb-6" style={{ color: "var(--text-tertiary)" }}>
              Showing {filtered.length} of {mockPosts.length} articles
              {activeCategory && ` in ${mockCategories.find((c) => c.slug === activeCategory)?.name}`}
              {query && ` matching "${query}"`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((post, i) => {
                  const color = getCategoryColor(post.categorySlug);
                  return (
                    <motion.a
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ delay: i * 0.04, type: "spring", stiffness: 220, damping: 26 }}
                      className="group block"
                    >
                      <GlassCard hover padding="none" className="overflow-hidden flex flex-col h-full">
                        {/* Cover image */}
                        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div
                            className="absolute inset-0"
                            style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.4) 100%)" }}
                          />
                          {/* Featured badge */}
                          {post.featured && (
                            <span
                              className="absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: "rgba(255,204,0,0.9)", color: "#1c1c1e" }}
                            >
                              ★ Featured
                            </span>
                          )}
                          <span
                            className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: `${color}dd`, color: "#fff", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
                          >
                            {post.category}
                          </span>
                        </div>

                        {/* Card body */}
                        <div className="flex flex-col flex-1 gap-2 p-4">
                          <h2
                            className="font-semibold text-sm leading-snug line-clamp-2 group-hover:underline decoration-1 underline-offset-2"
                            style={{ color: "var(--text-primary)", fontFamily: "var(--font-display, serif)" }}
                          >
                            {post.title}
                          </h2>
                          <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: "var(--text-tertiary)" }}>
                            {post.excerpt}
                          </p>
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-1">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={{ background: "var(--glass-bg)", color: "var(--text-tertiary)", border: "1px solid var(--separator)" }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          {/* Footer */}
                          <div
                            className="flex items-center justify-between text-xs mt-2 pt-3"
                            style={{ borderTop: "1px solid var(--separator)", color: "var(--text-tertiary)" }}
                          >
                            <div className="flex items-center gap-1.5">
                              <Image src={post.author.avatar} alt={post.author.name} width={18} height={18} className="rounded-full" />
                              <span>{post.author.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(post.date)}</span>
                              <span className="flex items-center gap-1"><Clock size={10} />{post.readTime} min</span>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.a>
                  );
                })}
              </AnimatePresence>
            </div>
          </>
        )}
      </section>
    </>
  );
}
