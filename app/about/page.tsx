import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Clock, Calendar,
  AppWindow, Layers, Cloud, BrainCircuit, BookOpen, Sparkles,
  Zap, Globe, Mail, MapPin, Award, GraduationCap,
  Code2, Database, Bot, BarChart3, CheckCircle2,
} from "lucide-react";
import { LinkedInIcon, XIcon } from "@/components/ui/SocialIcons";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import { siteConfig } from "@/lib/mockData";
import { getWpPosts, getWpCategories, getWpAuthor } from "@/lib/wordpress";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Dipak Shaw — Senior Power Platform & AI Consultant with 7+ years delivering enterprise solutions for ADNOC Drilling, Johnson & Johnson, and Miral Experiences.",
  openGraph: {
    title: "About Dipak Shaw | Power Solution",
    description: "Senior Power Platform & AI Consultant — 280+ solutions, 7+ years, ADNOC · J&J · Miral.",
    url: "https://powersolution.dev/about",
  },
  alternates: { canonical: "https://powersolution.dev/about" },
};

const categoryIcons: Record<string, React.ReactNode> = {
  AppWindow: <AppWindow size={22} />,
  Layers: <Layers size={22} />,
  Cloud: <Cloud size={22} />,
  BrainCircuit: <BrainCircuit size={22} />,
  BookOpen: <BookOpen size={22} />,
  Sparkles: <Sparkles size={22} />,
  Zap: <Zap size={22} />,
  Database: <Database size={22} />,
  Code2: <Code2 size={22} />,
  Bot: <Bot size={22} />,
};

const stats = [
  { value: "280+", label: "Solutions Delivered" },
  { value: "795+", label: "Hrs/Month Saved" },
  { value: "7+", label: "Years Experience" },
  { value: "10K+", label: "Readers Monthly" },
];

const achievements = [
  { metric: "795+ hrs/month", desc: "Saved across ADNOC Drilling via 15+ Power Apps solutions", icon: "⚡" },
  { metric: "80+ hrs/analyst/month", desc: "Saved at Johnson & Johnson via Azure OpenAI Q&A app", icon: "🤖" },
  { metric: "280+ solutions", desc: "Enterprise solutions delivered across Oil & Gas, Healthcare & Theme Parks", icon: "🏆" },
  { metric: "40+ hrs/month", desc: "Support time saved at Miral Experiences with Copilot Knowledge Assistant", icon: "☁️" },
];

const experience = [
  {
    role: "Lead Power Apps Consultant",
    company: "ADNOC Drilling",
    period: "Jan 2026 – Present",
    location: "Abu Dhabi, UAE",
    color: "#007aff",
    bullets: [
      "Leading next-gen AI-augmented Power Platform transformation across drilling & well operations",
      "Architecting Canvas & Model-driven Apps integrated with Azure OpenAI for predictive rig insights",
      "Leading cross-functional team of 4 developers; setting ALM standards & CI/CD pipelines",
      "Driving Copilot Studio agent rollout — reducing HSE query resolution from 48 hrs to under 2 hrs",
    ],
  },
  {
    role: "Sr. Power Platform Consultant",
    company: "ZS Associates (via PruTech Solutions)",
    period: "Jun 2025 – Nov 2026",
    location: "Pune, India",
    color: "#34c759",
    bullets: [
      "Built AI Q&A Canvas App for J&J embedded in Power BI using GPT-4o with RLS & audit logs — saving ~80 hrs/analyst/month",
      "Delivered self-serve AI Forecasting Tool orchestrating XGBoost, SARIMA & ARIMAX pipelines for multi-year business planning",
    ],
  },
  {
    role: "Sr. Power Platform Consultant",
    company: "Miral Experiences",
    period: "Apr 2025 – Jun 2025",
    location: "Abu Dhabi, UAE",
    color: "#bf5af2",
    bullets: [
      "Built Copilot-powered Knowledge Assistant & HR Onboarding Assistant integrated with SharePoint",
      "Reduced support workload by 40+ hrs/month across UAE's leading theme park operator",
      "Established governance & adoption frameworks for Power Platform and Copilot rollouts",
    ],
  },
  {
    role: "Sr. Power Apps & Power BI Consultant",
    company: "ADNOC Drilling",
    period: "Dec 2021 – Jan 2025",
    location: "Abu Dhabi, UAE",
    color: "#ff9f0a",
    bullets: [
      "Transport Timesheet App: Digitised time & payroll for 500+ staff, reducing payroll errors by 95%",
      "SAP Fiori → Power Platform Migration: Saved ~200 hrs/month in CAPA tracking with live Power BI",
      "DSMS: Centralised rig & well operations data in Dataverse — 795+ hrs/month total time savings",
      "Led team of 3 developers; ran UAT sessions with 200+ end users",
    ],
  },
  {
    role: "SharePoint / Power Apps Consultant",
    company: "Evolvous Infotech Pvt. Ltd.",
    period: "May 2021 – Dec 2021",
    location: "Calgary, Canada (Remote)",
    color: "#5ac8fa",
    bullets: [
      "Designed SPFx web parts and Power Apps solutions, reducing process cycle times by 35% for SME clients",
    ],
  },
];

const certifications = [
  { name: "Power Platform Functional Consultant Associate", code: "PL-200", color: "#007aff" },
  { name: "Power Platform Developer Associate", code: "PL-400", color: "#5856d6" },
  { name: "Power Platform Fundamentals", code: "PL-900", color: "#34c759" },
  { name: "SQL — Querying and Developing Databases", code: "SQL", color: "#ff9f0a" },
];

const skillGroups = [
  {
    label: "Power Platform",
    icon: <AppWindow size={16} />,
    color: "#007aff",
    skills: ["Power Apps (Canvas, Model-driven, PCF)", "Power Automate (Cloud & RPA)", "Power BI / Fabric", "Dataverse", "Power Pages", "Copilot Studio"],
  },
  {
    label: "Gen AI & Azure",
    icon: <Bot size={16} />,
    color: "#5856d6",
    skills: ["Azure OpenAI (GPT-4o, GPT-4)", "Claude (Anthropic)", "Prompt Engineering", "LLM Agent Design", "Azure AI Services", "Microsoft Copilot"],
  },
  {
    label: "ML & Data",
    icon: <BarChart3 size={16} />,
    color: "#5ac8fa",
    skills: ["XGBoost · SARIMA · ARIMAX", "Python (NumPy, Pandas, scikit-learn)", "Power Query / DAX", "MAPE / SMAPE Backtesting", "Microsoft Fabric"],
  },
  {
    label: "Dev & Integration",
    icon: <Code2 size={16} />,
    color: "#34c759",
    skills: ["TypeScript / JavaScript / React", "SharePoint SPFx", "REST APIs & Custom Connectors", "SQL (MS SQL, PostgreSQL)", "Azure Functions & Logic Apps"],
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function AboutPage() {
  const [allPosts, categories, wpAuthor] = await Promise.all([
    getWpPosts(),
    getWpCategories(),
    getWpAuthor(),
  ]);

  const recentPosts = allPosts.slice(0, 4);
  const avatarSrc = wpAuthor?.avatar96 ?? "https://secure.gravatar.com/avatar/?d=mp&s=160";
  const bio = wpAuthor?.bio ?? siteConfig.bio;

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>

        {/* ── Hero ── */}
        <section className="max-w-5xl mx-auto px-6 pt-28 pb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-40"
                style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))", transform: "scale(1.15)" }}
              />
              <Image
                src={avatarSrc}
                alt="Dipak Shaw"
                width={160}
                height={160}
                className="relative rounded-full"
                style={{ border: "3px solid var(--glass-border)", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
                priority
              />
              <span
                className="absolute bottom-2 right-2 w-5 h-5 rounded-full"
                style={{ background: "#34c759", border: "3px solid var(--bg-primary)" }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(0,122,255,0.12)", color: "var(--accent)" }}>
                  <Zap size={10} className="inline mr-1" />Power Solution
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(52,199,89,0.12)", color: "#34c759" }}>
                  Open to collaborations
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(255,159,10,0.12)", color: "#ff9f0a" }}>
                  <MapPin size={10} className="inline mr-1" />{siteConfig.location}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold mb-1" style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}>
                Dipak Shaw
              </h1>
              <p className="text-base font-semibold mb-1" style={{ color: "var(--accent)" }}>{siteConfig.title}</p>
              <p className="text-sm mb-1" style={{ color: "var(--text-tertiary)" }}>Microsoft-certified · Azure OpenAI · 7+ years · 280+ solutions delivered</p>
              <p className="text-sm leading-relaxed max-w-xl mx-auto md:mx-0 mb-5 mt-3" style={{ color: "var(--text-secondary)" }}>
                {bio}
              </p>

              {/* Contact row */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4 text-xs" style={{ color: "var(--text-tertiary)" }}>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1 hover:underline" style={{ color: "var(--text-secondary)" }}>
                  <Mail size={12} />{siteConfig.email}
                </a>
                <span>·</span>
                <a href={siteConfig.url} className="flex items-center gap-1 hover:underline" style={{ color: "var(--text-secondary)" }}>
                  <Globe size={12} />powersolution.dev
                </a>
              </div>

              {/* Social buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105"
                  style={{ background: "#0077B5", color: "#fff" }}>
                  <LinkedInIcon size={14} /> LinkedIn
                </a>
                <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105"
                  style={{ background: "#000000", color: "#fff" }}>
                  <XIcon size={14} /> @heydipak26
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <GlassCard key={s.label} padding="md" className="text-center">
                <p className="text-3xl font-bold mb-1" style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "var(--font-display, serif)" }}>
                  {s.value}
                </p>
                <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{s.label}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ── Key Achievements ── */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}>Key Achievements</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>Measurable ROI delivered across enterprise clients.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((a) => (
              <GlassCard key={a.metric} padding="md" className="flex items-start gap-4">
                <span className="text-2xl shrink-0">{a.icon}</span>
                <div>
                  <p className="font-bold text-sm" style={{ color: "var(--accent)", fontFamily: "var(--font-display, serif)" }}>{a.metric}</p>
                  <p className="text-xs leading-relaxed mt-0.5" style={{ color: "var(--text-secondary)" }}>{a.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ── Experience ── */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}>Experience</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>7+ years building enterprise solutions across UAE, India & Canada.</p>
          <div className="flex flex-col gap-4">
            {experience.map((job) => (
              <GlassCard key={job.company + job.period} padding="md" className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: job.color }} />
                <div className="pl-4">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="font-bold text-sm" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display, serif)" }}>{job.role}</p>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: job.color }}>{job.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{job.period}</p>
                      <p className="text-xs flex items-center gap-1 justify-end mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                        <MapPin size={10} />{job.location}
                      </p>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {job.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        <CheckCircle2 size={12} className="shrink-0 mt-0.5" style={{ color: job.color }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ── Technical Skills ── */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}>Technical Skills</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>Core competencies across the full Power Platform & AI stack.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillGroups.map((group) => (
              <GlassCard key={group.label} padding="md">
                <div className="flex items-center gap-2 mb-3" style={{ color: group.color }}>
                  {group.icon}
                  <p className="font-semibold text-sm">{group.label}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span key={skill} className="text-xs px-2.5 py-1 rounded-full" style={{ background: `${group.color}18`, color: group.color, border: `1px solid ${group.color}30` }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ── Certifications ── */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}>Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <GlassCard key={cert.code} padding="md" className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl shrink-0" style={{ background: `${cert.color}18` }}>
                  <Award size={20} style={{ color: cert.color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{cert.name}</p>
                  <p className="text-xs mt-0.5 font-medium" style={{ color: cert.color }}>Microsoft · {cert.code}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ── What I Write About ── */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}>What I Write About</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-tertiary)" }}>
            {categories.length} topic areas — from Microsoft Power Platform to the latest generative AI.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link key={cat.slug} href="/#topics">
                <GlassCard hover padding="md" className="h-full group">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl shrink-0" style={{ background: `${cat.accentColor}18`, color: cat.accentColor }}>
                      {categoryIcons[cat.icon] ?? <AppWindow size={22} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1 group-hover:underline" style={{ color: "var(--text-primary)" }}>{cat.name}</h3>
                      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-tertiary)" }}>{cat.description}</p>
                      <p className="text-xs font-semibold mt-2" style={{ color: cat.accentColor }}>{cat.postCount} articles</p>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Education ── */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}>Education</h2>
          <GlassCard padding="md" className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl shrink-0" style={{ background: "rgba(88,86,214,0.12)" }}>
              <GraduationCap size={22} style={{ color: "#5856d6" }} />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Bachelor of Computer Application (Information Technology)</p>
              <p className="text-xs mt-0.5" style={{ color: "#5856d6" }}>Himalayan Garhwal University · 2018 – 2021</p>
            </div>
          </GlassCard>
        </section>

        {/* ── Recent Writing ── */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}>Recent Writing</h2>
            <Link href="/blog" className="flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all" style={{ color: "var(--accent)" }}>
              All articles <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentPosts.map((post) => {
              const color = categories.find((c) => c.slug === post.categorySlug)?.accentColor ?? "#007aff";
              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <GlassCard hover padding="sm" className="flex items-start gap-4">
                    <div className="relative shrink-0 overflow-hidden rounded-xl" style={{ width: 72, height: 52 }}>
                      <Image src={post.coverImage} alt={post.title} fill sizes="72px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${color}18`, color }}>
                        {post.category}
                      </span>
                      <h3 className="text-sm font-semibold mt-1 line-clamp-1 group-hover:underline decoration-1 underline-offset-2" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display, serif)" }}>
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: "var(--text-tertiary)" }}>
                        <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(post.date)}</span>
                        <span className="flex items-center gap-1"><Clock size={10} />{post.readTime} min</span>
                      </div>
                    </div>
                    <ArrowRight size={14} className="shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 mt-2" style={{ color }} />
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <GlassCard padding="lg" className="text-center" style={{ background: "linear-gradient(135deg, rgba(0,122,255,0.08), rgba(88,86,214,0.08))", border: "1px solid rgba(0,122,255,0.2)" }}>
            <Mail size={28} className="mx-auto mb-3" style={{ color: "var(--accent)" }} />
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}>Stay in the loop</h2>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
              Get new articles on Power Platform, Azure &amp; AI delivered to your inbox. No spam, unsubscribe any time.
            </p>
            <Link href="/#newsletter" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105" style={{ background: "var(--accent)", color: "#fff", boxShadow: "0 4px 16px rgba(0,122,255,0.3)" }}>
              Subscribe to the newsletter <ArrowRight size={14} />
            </Link>
          </GlassCard>
        </section>

      </main>
      <Footer />
    </>
  );
}
