import Link from "next/link";
import { Zap } from "lucide-react";
import { LinkedInIcon, XIcon, GitHubIcon, SocialLink } from "@/components/ui/SocialIcons";
import { siteConfig, mockCategories } from "@/lib/mockData";

export default function Footer() {
  return (
    <footer
      className="mt-8"
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderTop: "1px solid var(--glass-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <Zap size={18} fill="var(--accent)" style={{ color: "var(--accent)" }} />
              <span style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "var(--font-display, serif)" }}>
                Power Solution
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
              {siteConfig.tagline} — writing about Power Platform, Azure, SharePoint &amp; AI.
            </p>

            {/* Filled brand social icons */}
            <div className="flex gap-2">
              <SocialLink href={siteConfig.social.linkedin} label="LinkedIn" bg="#0077B5" size="sm">
                <LinkedInIcon size={16} />
              </SocialLink>
              <SocialLink href={siteConfig.social.twitter} label="X / Twitter" bg="#000000" size="sm">
                <XIcon size={16} />
              </SocialLink>
              <SocialLink href={siteConfig.social.github} label="GitHub" bg="#24292e" size="sm">
                <GitHubIcon size={16} />
              </SocialLink>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Topics</h3>
            <ul className="space-y-2">
              {mockCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/${cat.slug}`} className="text-sm transition-colors hover:underline" style={{ color: "var(--text-secondary)" }}>
                    {cat.name}
                    <span className="ml-1 text-xs" style={{ color: "var(--text-tertiary)" }}>({cat.postCount})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm transition-colors hover:underline" style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 text-center text-xs" style={{ borderTop: "1px solid var(--separator)", color: "var(--text-tertiary)" }}>
          © {new Date().getFullYear()} Power Solution · {siteConfig.author} · Built with Next.js
        </div>
      </div>
    </footer>
  );
}
