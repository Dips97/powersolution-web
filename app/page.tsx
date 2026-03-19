import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import HomeContent from "@/components/home/HomeContent";
import NewsletterSection from "@/components/home/NewsletterSection";
import { getWpPosts, getWpCategories } from "@/lib/wordpress";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Power Solution — Power Platform, Azure, AI & SharePoint Blog",
  description:
    "Expert guides on Power Apps, Power Automate, SharePoint, Azure, OpenAI, Anthropic Claude and Google Gemini — written by Dipak Shaw, Digital Transform Enthusiast.",
};

export default async function Home() {
  const [allPosts, categories] = await Promise.all([getWpPosts(), getWpCategories()]);

  const featuredPost = allPosts.find((p) => p.featured) ?? allPosts[0] ?? null;
  const latestPosts = featuredPost
    ? allPosts.filter((p) => p.id !== featuredPost.id)
    : allPosts;

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HomeContent featuredPost={featuredPost} latestPosts={latestPosts} categories={categories} />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
