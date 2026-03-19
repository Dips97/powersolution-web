"use client";

import { useState } from "react";
import FilterPills from "@/components/home/CategoriesGrid";
import FeaturedPosts from "@/components/home/FeaturedPosts";
import LatestPosts from "@/components/home/LatestPosts";

export default function HomeContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <>
      <FeaturedPosts />
      <FilterPills activeCategory={activeCategory} onSelect={setActiveCategory} />
      <LatestPosts filterCategory={activeCategory} />
    </>
  );
}
