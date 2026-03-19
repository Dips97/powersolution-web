'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import GlassBadge from '@/components/ui/GlassBadge';
import { ArrowRight, Globe, Zap } from 'lucide-react';

const floatingCards = [
  { emoji: '🤖', text: 'Anthropic Claude Guide', delay: 0,   x: '4%',  y: '22%' },
  { emoji: '⚡', text: 'Power Platform + AI',    delay: 1.2, x: '68%', y: '12%' },
  { emoji: '☁️', text: 'Azure OpenAI Service',  delay: 0.7, x: '74%', y: '62%' },
  { emoji: '🔥', text: 'Gemini API in Node.js', delay: 1.8, x: '2%',  y: '68%' },
  { emoji: '🛠️', text: 'SharePoint SPFx Tips',   delay: 2.4, x: '36%', y: '8%'  },
];

const spring = { type: 'spring' as const, stiffness: 180, damping: 22 };

export default function HeroSection() {
  return (
    <section
      className="mesh-bg relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
      aria-label="Hero"
    >
      {/* Background blobs */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full opacity-60" style={{ width: '55%', height: '55%', top: '-10%', left: '-5%',  background: 'radial-gradient(circle, var(--blob-1), transparent 70%)', animation: 'mesh-drift-1 20s ease-in-out infinite' }} />
        <div className="absolute rounded-full opacity-50" style={{ width: '50%', height: '50%', top: '5%',   right: '-10%', background: 'radial-gradient(circle, var(--blob-2), transparent 70%)', animation: 'mesh-drift-2 25s ease-in-out infinite' }} />
        <div className="absolute rounded-full opacity-50" style={{ width: '45%', height: '45%', bottom: '0%', right: '15%', background: 'radial-gradient(circle, var(--blob-3), transparent 70%)', animation: 'mesh-drift-3 22s ease-in-out infinite' }} />
        <div className="absolute rounded-full opacity-40" style={{ width: '40%', height: '40%', bottom: '5%', left: '5%',   background: 'radial-gradient(circle, var(--blob-4), transparent 70%)', animation: 'mesh-drift-4 28s ease-in-out infinite' }} />
      </div>

      {/* Floating topic cards — desktop only */}
      {floatingCards.map((card) => (
        <motion.div
          key={card.text}
          className="absolute hidden xl:block pointer-events-none"
          style={{ left: card.x, top: card.y }}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: [0, -12, 0], scale: 1 }}
          transition={{
            opacity: { delay: card.delay, duration: 0.6 },
            scale:   { delay: card.delay, duration: 0.6 },
            y: { delay: card.delay, duration: 5 + card.delay * 0.4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <GlassCard padding="sm" className="flex items-center gap-2 whitespace-nowrap text-sm font-medium">
            <span>{card.emoji}</span>
            <span style={{ color: 'var(--text-primary)' }}>{card.text}</span>
          </GlassCard>
        </motion.div>
      ))}

      {/* ── Scattered hero content ── */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">

        {/* Row 1 — eyebrow badge drifts left */}
        <motion.div
          className="self-start ml-2 sm:ml-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...spring, delay: 0.05 }}
        >
          <GlassBadge color="#007aff">
            <Globe size={12} />
            Power Platform · Azure · AI Expert
          </GlassBadge>
        </motion.div>

        {/* Row 2 — big title, slightly right */}
        <motion.h1
          className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-center self-end mr-0 sm:mr-4 max-w-2xl"
          style={{
            fontFamily: 'var(--font-display, serif)',
            background: 'linear-gradient(135deg, var(--text-primary) 40%, var(--accent) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
        >
          Turning Complex Tech into Clear Solutions
        </motion.h1>

        {/* Row 3 — description as glass pill, drifts left */}
        <motion.div
          className="mt-6 self-start sm:self-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...spring, delay: 0.28 }}
        >
          <GlassCard padding="sm" className="max-w-xl">
            <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              From Microsoft Power Platform &amp; SharePoint to OpenAI, Anthropic Claude, Google Gemini &amp; Azure — real-world guides by a Digital Transform Enthusiast.
            </p>
          </GlassCard>
        </motion.div>

        {/* Row 4 — CTA buttons drift right */}
        <motion.div
          className="mt-6 flex flex-wrap gap-3 self-end sm:self-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...spring, delay: 0.4 }}
        >
          <a
            href="/blog"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105"
            style={{ background: 'var(--accent)', boxShadow: '0 4px 16px rgba(0,122,255,0.35)' }}
          >
            Explore Blog
            <ArrowRight size={16} />
          </a>
          <a
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold glass-card transition-transform hover:scale-105"
            style={{ color: 'var(--text-primary)' }}
          >
            Contact
          </a>
        </motion.div>

        {/* Row 5 — stat pills scattered */}
        <motion.div
          className="mt-7 flex flex-wrap justify-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.52 }}
        >
          {[
            { label: '40+ Articles', icon: '📚', offset: 'mt-2' },
            { label: 'Power Platform', icon: '⚡', offset: '' },
            { label: 'Azure & AI', icon: '☁️', offset: 'mt-3' },
            { label: 'OpenAI · Claude · Gemini', icon: '🤖', offset: '' },
          ].map(({ label, icon, offset }) => (
            <div key={label} className={offset}>
              <GlassBadge>
                <span className="text-sm">{icon}</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</span>
              </GlassBadge>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
