export interface Author {
  name: string;
  avatar: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  tags: string[];
  author: Author;
  date: string;
  readTime: number;
  coverImage: string;
  featured: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  icon: string;
  accentColor: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  title: string;
  url: string;
  author: string;
  bio: string;
  email: string;
  location: string;
  social: {
    github?: string;
    linkedin: string;
    twitter: string;
  };
}
