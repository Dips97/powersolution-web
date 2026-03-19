"use client";

import { useState } from "react";
import FilterPills from "@/components/home/CategoriesGrid";
import FeaturedPosts from "@/components/home/FeaturedPosts";
import LatestPosts from "@/components/home/LatestPosts";
import type { Post, Category } from "@/lib/types";

interface HomeContentProps {
  featuredPost: Post | null;
  latestPosts: Post[];
  categories: Category[];
}

export default function HomeContent({ featuredPost, latestPosts, categories }: HomeContentProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <>
      {featuredPost && <FeaturedPosts post={featuredPost} categories={categories} />}
      <FilterPills categories={categories} posts={latestPosts} activeCategory={activeCategory} onSelect={setActiveCategory} />
      <LatestPosts posts={latestPosts} categories={categories} filterCategory={activeCategory} />
    </>
  );
}
