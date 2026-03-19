"use client";

import {
  AppWindow, Layers, Cloud, BrainCircuit, BookOpen, Sparkles,
  Zap, Database, Code2, Bell, FileText, Bot, LucideIcon,
} from "lucide-react";
import type { Category, Post } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  AppWindow, Layers, Cloud, BrainCircuit, BookOpen, Sparkles,
  Zap, Database, Code2, Bell, FileText, Bot,
};

interface FilterPillsProps {
  categories: Category[];
  posts: Post[];
  activeCategory: string | null;
  onSelect: (slug: string | null) => void;
}

export default function FilterPills({ categories, posts, activeCategory, onSelect }: FilterPillsProps) {
  const totalCount = posts.length;

  return (
    <section className="max-w-7xl mx-auto px-6 pt-10 pb-4" id="topics" aria-label="Filter by topic">
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-tertiary)" }}>
        Filter by Topic
      </p>
      <div className="flex flex-wrap gap-2">
        {/* All pill */}
        <button
          onClick={() => onSelect(null)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
          style={{
            background: activeCategory === null ? "var(--accent)" : "var(--glass-bg)",
            color: activeCategory === null ? "#fff" : "var(--text-secondary)",
            border: "1px solid",
            borderColor: activeCategory === null ? "var(--accent)" : "var(--glass-border)",
            backdropFilter: "blur(20px)",
          }}
        >
          All
          <span className="text-xs opacity-70">({totalCount})</span>
        </button>

        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? AppWindow;
          const isActive = activeCategory === cat.slug;
          const catCount = posts.filter((p) => p.categorySlug === cat.slug).length;
          if (catCount === 0) return null;
          return (
            <button
              key={cat.slug}
              onClick={() => onSelect(isActive ? null : cat.slug)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: isActive ? cat.accentColor : "var(--glass-bg)",
                color: isActive ? "#fff" : "var(--text-secondary)",
                border: "1px solid",
                borderColor: isActive ? cat.accentColor : "var(--glass-border)",
                backdropFilter: "blur(20px)",
              }}
            >
              <Icon size={13} style={{ color: isActive ? "#fff" : cat.accentColor }} />
              {cat.name}
              <span className="text-xs opacity-70">({catCount})</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
