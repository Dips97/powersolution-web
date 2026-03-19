import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogContent from "@/components/blog/BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "All articles on Power Platform, Microsoft Azure, SharePoint, and AI — including OpenAI, Anthropic Claude, and Google Gemini. Written by Dipak Shaw.",
  openGraph: {
    title: "Blog | Power Solution",
    description: "All articles on Power Platform, Azure, SharePoint & AI.",
    url: "https://powersolution.dev/blog",
  },
  alternates: { canonical: "https://powersolution.dev/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
        <BlogContent />
      </main>
      <Footer />
    </>
  );
}
