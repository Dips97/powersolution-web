import type { Post, Category } from "./types";

const WP_API = "https://powersolution.dev/wp-json/wp/v2";

/* ── Category accent colours ── */
const CATEGORY_COLORS: Record<number, string> = {
  132: "#5856d6", // Artificial Intelligence
  18:  "#ff9f0a", // Business Software
  19:  "#34c759", // C#
  20:  "#0078d4", // Microsoft
  196: "#5856d6", // Microsoft Copilot Studio
  21:  "#007aff", // Power Automate
  22:  "#007aff", // PowerApps
  23:  "#ff9f0a", // Productivity
  24:  "#bf5af2", // SharePoint
  25:  "#5ac8fa", // SQL
  98:  "#ff9f0a", // Updates & Announcements
  1:   "#8e8e93", // Uncategorized
};

const CATEGORY_ICONS: Record<number, string> = {
  132: "BrainCircuit",
  18:  "AppWindow",
  19:  "Code2",
  20:  "Cloud",
  196: "BrainCircuit",
  21:  "Zap",
  22:  "AppWindow",
  23:  "Sparkles",
  24:  "Layers",
  25:  "Database",
  98:  "Bell",
  1:   "FileText",
};

/* ── Raw WP types ── */
interface WpPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories: number[];
  tags: number[];
  featured_media: number;
  sticky: boolean;
  author: number;
  jetpack_featured_media_url: string;
}

interface WpCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

interface WpTag {
  id: number;
  name: string;
  slug: string;
}

/* ── Helpers ── */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function calcReadTime(html: string): number {
  const words = stripHtml(html).split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const DIPAK: Post["author"] = {
  name: "Dipak Shaw",
  avatar: "https://picsum.photos/seed/dipak/40/40",
};

/* ── Author type ── */
export interface WpAuthorInfo {
  name: string;
  bio: string;
  avatar96: string;
  link: string;
}

/* ── In-memory cache ── */
let _categoriesCache: Category[] | null = null;
let _authorCache: WpAuthorInfo | null | undefined = undefined;

/* ─────────────────────────────────────────── */
/*  Public API                                  */
/* ─────────────────────────────────────────── */

export async function getWpCategories(): Promise<Category[]> {
  if (_categoriesCache) return _categoriesCache;

  try {
    const res = await fetch(
      `${WP_API}/categories?per_page=100&hide_empty=true`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`categories fetch ${res.status}`);
    const data: WpCategory[] = await res.json();

    _categoriesCache = data
      .filter((c) => c.id !== 1) // exclude Uncategorized
      .map((c) => ({
        id: c.id,
        name: stripHtml(c.name),
        slug: c.slug,
        description: stripHtml(c.description),
        postCount: c.count,
        icon: CATEGORY_ICONS[c.id] ?? "FileText",
        accentColor: CATEGORY_COLORS[c.id] ?? "#007aff",
      }));

    return _categoriesCache;
  } catch {
    return [];
  }
}

export async function getWpPosts(): Promise<Post[]> {
  try {
    const [postsRes, categories] = await Promise.all([
      fetch(
        `${WP_API}/posts?per_page=100&status=publish&orderby=date&order=desc`,
        { next: { revalidate: 300 } }
      ),
      getWpCategories(),
    ]);

    if (!postsRes.ok) throw new Error(`posts fetch ${postsRes.status}`);
    const data: WpPost[] = await postsRes.json();

    return data.map((p) => wpPostToPost(p, categories));
  } catch {
    return [];
  }
}

export async function getWpPost(
  slug: string
): Promise<{ post: Post; htmlContent: string } | null> {
  try {
    const [postsRes, categories] = await Promise.all([
      fetch(`${WP_API}/posts?slug=${encodeURIComponent(slug)}&status=publish`, {
        next: { revalidate: 300 },
      }),
      getWpCategories(),
    ]);

    if (!postsRes.ok) return null;
    const data: WpPost[] = await postsRes.json();
    if (!data.length) return null;

    const p = data[0];

    // Fetch tag names for this post
    let tags: string[] = [];
    if (p.tags.length) {
      try {
        const tagRes = await fetch(
          `${WP_API}/tags?include=${p.tags.join(",")}&per_page=20`,
          { next: { revalidate: 3600 } }
        );
        if (tagRes.ok) {
          const tagData: WpTag[] = await tagRes.json();
          tags = tagData.map((t) => t.name);
        }
      } catch { /* skip tags on error */ }
    }

    const post = wpPostToPost(p, categories, tags);
    return { post, htmlContent: p.content.rendered };
  } catch {
    return null;
  }
}

export async function getWpPostSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      `${WP_API}/posts?per_page=100&status=publish&_fields=slug`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data: { slug: string }[] = await res.json();
    return data.map((p) => p.slug);
  } catch {
    return [];
  }
}

export async function getWpAuthor(): Promise<WpAuthorInfo | null> {
  if (_authorCache !== undefined) return _authorCache;
  try {
    const res = await fetch(`${WP_API}/users?per_page=1&who=authors`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`users ${res.status}`);
    const data = (await res.json()) as Array<{
      name: string;
      description: string;
      avatar_urls: Record<string, string>;
      link: string;
    }>;
    if (!data.length) { _authorCache = null; return null; }
    const u = data[0];
    _authorCache = {
      name: stripHtml(u.name),
      bio: stripHtml(u.description) || "Writing about Power Platform, Microsoft Azure, SharePoint, and the latest in AI.",
      avatar96: u.avatar_urls?.["96"] ?? u.avatar_urls?.["48"] ?? "https://secure.gravatar.com/avatar/?d=mp&s=96",
      link: u.link,
    };
    return _authorCache;
  } catch {
    _authorCache = null;
    return null;
  }
}

/* ── Shared mapper ── */
function wpPostToPost(
  p: WpPost,
  categories: Category[],
  tags: string[] = []
): Post {
  const catId = p.categories[0];
  const cat = categories.find((c) => c.id === catId);

  const coverImage =
    p.jetpack_featured_media_url ||
    `https://picsum.photos/seed/${p.slug}/800/450`;

  return {
    id: p.id,
    slug: p.slug,
    title: stripHtml(p.title.rendered),
    excerpt: stripHtml(p.excerpt.rendered),
    category: cat?.name ?? "General",
    categorySlug: cat?.slug ?? "general",
    tags,
    author: DIPAK,
    date: p.date.slice(0, 10),
    readTime: calcReadTime(p.content.rendered),
    coverImage,
    featured: p.sticky,
  };
}
