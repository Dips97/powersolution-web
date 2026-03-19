import Image from "next/image";
import { Clock, User, ArrowRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GlassBadge from "@/components/ui/GlassBadge";
import { featuredPost, mockCategories } from "@/lib/mockData";

function getCategoryColor(slug: string): string {
  return mockCategories.find((c) => c.slug === slug)?.accentColor ?? "#007aff";
}

export default function FeaturedPosts() {
  const post = featuredPost;
  if (!post) return null;
  const color = getCategoryColor(post.categorySlug);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8" aria-labelledby="featured-heading">
      <h2
        id="featured-heading"
        className="text-2xl font-bold mb-6"
        style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}
      >
        Featured Article
      </h2>

      <a href={`/blog/${post.slug}`} className="group block">
        <GlassCard hover padding="sm" className="flex flex-col md:flex-row gap-0 overflow-hidden" style={{ padding: 0 }}>
          {/* Cover image */}
          <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto overflow-hidden rounded-t-[19px] md:rounded-l-[19px] md:rounded-tr-none">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4 p-6 md:p-8 flex-1 justify-center">
            <GlassBadge color={color}>{post.category}</GlassBadge>
            <h3
              className="font-bold text-xl md:text-2xl leading-snug"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-display, serif)" }}
            >
              {post.title}
            </h3>
            <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--text-secondary)" }}>
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-tertiary)" }}>
              <span className="flex items-center gap-1"><User size={11} />{post.author.name}</span>
              <span className="flex items-center gap-1"><Clock size={11} />{post.readTime} min read</span>
              <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium" style={{ color }}>
              Read article <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </GlassCard>
      </a>
    </section>
  );
}
