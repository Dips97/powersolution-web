"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import type { Category } from "@/lib/types";
import type { Post } from "@/lib/types";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

function getCategoryColor(slug: string, categories: Category[]): string {
  return categories.find((c) => c.slug === slug)?.accentColor ?? "#007aff";
}

function highlight(text: string, query: string): string {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(`(${escaped})`, "gi"), "**$1**");
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} style={{ background: "var(--accent)", color: "#fff", borderRadius: "3px", padding: "0 2px" }}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function searchPosts(query: string, allPosts: Post[]): Post[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return allPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchPosts(query, allPosts);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery("");
      // Fetch posts from WP REST API on first open
      if (allPosts.length === 0) {
        Promise.all([
          fetch("https://powersolution.dev/wp-json/wp/v2/posts?per_page=100&status=publish&orderby=date&order=desc").then(r => r.json()),
          fetch("https://powersolution.dev/wp-json/wp/v2/categories?per_page=100&hide_empty=true").then(r => r.json()),
        ]).then(([posts, cats]) => {
          setCategories(cats.filter((c: Category & { id: number }) => c.id !== 1));
          setAllPosts(posts.map((p: Record<string, unknown>) => {
            const catId = (p.categories as number[])[0];
            const cat = cats.find((c: Category & { id: number }) => c.id === catId);
            return {
              id: p.id as number,
              slug: p.slug as string,
              title: String(p.title && (p.title as { rendered: string }).rendered).replace(/<[^>]*>/g, ''),
              excerpt: String(p.excerpt && (p.excerpt as { rendered: string }).rendered).replace(/<[^>]*>/g, '').trim().slice(0, 160),
              category: cat ? String(cat.name).replace(/&amp;/g, '&') : 'General',
              categorySlug: cat ? cat.slug : 'general',
              tags: [],
              author: { name: 'Dipak Shaw', avatar: '' },
              date: String(p.date).slice(0, 10),
              readTime: 5,
              coverImage: String(p.jetpack_featured_media_url || ''),
              featured: Boolean(p.sticky),
            };
          }));
        }).catch(() => {});
      }
    }
  }, [open, allPosts.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[10vh]"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="w-full max-w-xl"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--glass-border)",
              borderRadius: "20px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid var(--separator)" }}>
              <Search size={18} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, topics, tags…"
                className="flex-1 bg-transparent outline-none text-base"
                style={{ color: "var(--text-primary)", caretColor: "var(--accent)" }}
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear" style={{ color: "var(--text-tertiary)" }}>
                  <X size={16} />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-xs font-medium px-2 py-1 rounded-md"
                style={{ color: "var(--text-tertiary)", background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
              >
                Esc
              </button>
            </div>

            {/* Results */}
            <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
              {query.trim() === "" ? (
                <p className="text-center text-sm py-10" style={{ color: "var(--text-tertiary)" }}>
                  Start typing to search…
                </p>
              ) : results.length === 0 ? (
                <p className="text-center text-sm py-10" style={{ color: "var(--text-tertiary)" }}>
                  No results for &ldquo;{query}&rdquo;
                </p>
              ) : (
                <ul>
                  {results.map((post, i) => {
                    const color = getCategoryColor(post.categorySlug, categories);
                    return (
                      <li key={post.id}>
                        <a
                          href={`/blog/${post.slug}`}
                          onClick={onClose}
                          className="flex items-start gap-3 px-4 py-3 group transition-colors"
                          style={{
                            borderBottom: i < results.length - 1 ? "1px solid var(--separator)" : "none",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--glass-bg)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5"
                            style={{ background: `${color}20`, color }}
                          >
                            {post.category}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold leading-snug line-clamp-1" style={{ color: "var(--text-primary)" }}>
                              <HighlightedText text={post.title} query={query} />
                            </p>
                            <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "var(--text-tertiary)" }}>
                              <HighlightedText text={post.excerpt} query={query} />
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: "var(--text-tertiary)" }}>
                              <Clock size={9} />
                              <span>{post.readTime} min read</span>
                            </div>
                          </div>
                          <ArrowRight size={14} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" style={{ color }} />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer hint */}
            {results.length > 0 && (
              <div className="px-4 py-2 text-xs" style={{ borderTop: "1px solid var(--separator)", color: "var(--text-tertiary)" }}>
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
