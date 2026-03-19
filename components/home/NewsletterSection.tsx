"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Check } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { siteConfig } from "@/lib/mockData";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section id="newsletter" className="px-6 py-16" aria-labelledby="newsletter-heading">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
      >
        {/* Author card */}
        <GlassCard padding="md" className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0" style={{ outline: "2px solid var(--accent)", outlineOffset: "2px" }}>
            <Image
              src="https://picsum.photos/seed/dipak-shaw-author/100/100"
              alt={siteConfig.author}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
              {siteConfig.author}
            </p>
            <p className="text-sm font-medium" style={{ color: "var(--accent)" }}>
              {siteConfig.tagline}
            </p>
            <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
              {siteConfig.bio}
            </p>
          </div>
        </GlassCard>

        {/* Newsletter card */}
        <GlassCard padding="lg" className="flex flex-col items-center gap-5 text-center">
          <div className="p-3 rounded-2xl" style={{ background: "rgba(0,122,255,0.12)" }}>
            <Mail size={26} style={{ color: "var(--accent)" }} />
          </div>

          <div>
            <h2
              id="newsletter-heading"
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}
            >
              Stay Ahead of the Curve
            </h2>
            <p className="text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
              Get the latest Power Platform, Azure &amp; AI insights — OpenAI, Anthropic, Gemini &amp; more — straight to your inbox.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full"
              style={{ background: "rgba(52,199,89,0.15)", color: "#34c759" }}
            >
              <Check size={16} />
              <span className="font-medium text-sm">You&apos;re subscribed!</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                aria-label="Email address"
                className="glass-input flex-1 w-full"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-semibold text-white shrink-0 transition-transform hover:scale-105 cursor-pointer"
                style={{ background: "var(--accent)" }}
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            No spam. Unsubscribe anytime.
          </p>
        </GlassCard>
      </motion.div>
    </section>
  );
}
