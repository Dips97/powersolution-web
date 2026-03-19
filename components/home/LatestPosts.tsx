"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Calendar } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import type { Post, Category } from "@/lib/types";
import { useState, useEffect } from "react";

function getCategoryColor(slug: string, categories: Category[]): string {
  return categories.find((c) => c.slug === slug)?.accentColor ?? "#007aff";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface LatestPostsProps {
  posts: Post[];
  categories: Category[];
  filterCategory?: string | null;
}

export default function LatestPosts({ posts: allPosts, categories, filterCategory }: LatestPostsProps) {
  const posts = filterCategory
    ? allPosts.filter((p) => p.categorySlug === filterCategory)
    : allPosts;

  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    if (window.matchMedia("(max-width: 639px)").matches) {
      setVisibleCount(6);
    }
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    setVisibleCount(isMobile ? 6 : 9);
  }, [filterCategory]);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20" aria-labelledby="latest-heading">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            id="latest-heading"
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}
          >
            Latest Articles
            {filterCategory && (
              <span className="ml-2 text-base font-normal" style={{ color: "var(--text-tertiary)" }}>
                — {categories.find((c) => c.slug === filterCategory)?.name}
              </span>
            )}
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-tertiary)" }}>
            {posts.length} article{posts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <a
          href="/blog"
          className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
          style={{ color: "var(--accent)" }}
        >
          View all <ArrowRight size={14} />
        </a>
      </div>

      {/* Grid */}
      {posts.length === 0 ? (
        <p className="text-sm py-12 text-center" style={{ color: "var(--text-tertiary)" }}>
          No articles in this category yet.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visiblePosts.map((post, i) => {
                const color = getCategoryColor(post.categorySlug, categories);
                return (
                  <motion.a
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 220, damping: 26 }}
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
                        {/* Gradient overlay */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.45) 100%)",
                          }}
                        />
                        {/* Category badge pinned on image */}
                        <span
                          className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{
                            background: `${color}dd`,
                            color: "#fff",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                          }}
                        >
                          {post.category}
                        </span>
                      </div>

                      {/* Card body */}
                      <div className="flex flex-col flex-1 gap-2 p-4">
                        <h3
                          className="font-semibold text-sm leading-snug line-clamp-2 group-hover:underline decoration-1 underline-offset-2 transition-all"
                          style={{ color: "var(--text-primary)", fontFamily: "var(--font-display, serif)" }}
                        >
                          {post.title}
                        </h3>
                        <p
                          className="text-xs leading-relaxed line-clamp-2 flex-1"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          {post.excerpt}
                        </p>

                        {/* Footer meta */}
                        <div
                          className="flex items-center justify-between text-xs mt-2 pt-3"
                          style={{ borderTop: "1px solid var(--separator)", color: "var(--text-tertiary)" }}
                        >
                          <div className="flex items-center gap-1.5">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                            <span>{post.author.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar size={10} />
                              {formatDate(post.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={10} />
                              {post.readTime} min
                            </span>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </div>

          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount((c) => c + 6)}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  color: "var(--text-primary)",
                  boxShadow: "0 2px 12px var(--glass-shadow)",
                }}
              >
                Load More
                <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  ({posts.length - visibleCount} remaining)
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
