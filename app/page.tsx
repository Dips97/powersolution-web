import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import HomeContent from "@/components/home/HomeContent";
import NewsletterSection from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "Power Solution — Power Platform, Azure, AI & SharePoint Blog",
  description:
    "Expert guides on Power Apps, Power Automate, SharePoint, Azure, OpenAI, Anthropic Claude and Google Gemini — written by Dipak Shaw, Digital Transform Enthusiast.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HomeContent />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
