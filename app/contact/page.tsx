import type { Metadata } from "next";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import { LinkedInIcon, XIcon, GitHubIcon, SocialLink } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/mockData";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Dipak Shaw — questions, collaboration, or just to say hello.",
  openGraph: {
    title: "Contact | Power Solution",
    description: "Get in touch with Dipak Shaw.",
    url: "https://powersolution.dev/contact",
  },
  alternates: { canonical: "https://powersolution.dev/contact" },
};

const contactDetails = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "hello@powersolution.dev",
    href: "mailto:hello@powersolution.dev",
    color: "#007aff",
  },
  {
    icon: <MapPin size={18} />,
    label: "Location",
    value: "United Kingdom",
    href: null,
    color: "#34c759",
  },
  {
    icon: <MessageSquare size={18} />,
    label: "Response time",
    value: "Within 24 hours",
    href: null,
    color: "#ff9f0a",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
              Get In Touch
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold mb-3"
              style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}
            >
              Let&rsquo;s Talk
            </h1>
            <p className="text-base max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
              Have a question, a collaboration idea, or just want to say hello? Drop me a message and I&rsquo;ll get back to you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

            {/* Contact form */}
            <ContactForm />

            {/* Sidebar info */}
            <div className="flex flex-col gap-4">

              {/* Contact details */}
              <GlassCard padding="md">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-tertiary)" }}>
                  Contact Info
                </p>
                <div className="flex flex-col gap-4">
                  {contactDetails.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div
                        className="p-2 rounded-lg shrink-0"
                        style={{ background: `${item.color}18`, color: item.color }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm font-medium hover:underline" style={{ color: "var(--text-primary)" }}>
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Social links */}
              <GlassCard padding="md">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-tertiary)" }}>
                  Follow Along
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
                    style={{ background: "#0077B5", color: "#fff" }}
                  >
                    <LinkedInIcon size={18} />
                    <div>
                      <p className="text-sm font-semibold leading-none">LinkedIn</p>
                      <p className="text-xs opacity-80 mt-0.5">Connect professionally</p>
                    </div>
                  </a>
                  <a
                    href={siteConfig.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
                    style={{ background: "#000000", color: "#fff" }}
                  >
                    <XIcon size={18} />
                    <div>
                      <p className="text-sm font-semibold leading-none">X / Twitter</p>
                      <p className="text-xs opacity-80 mt-0.5">@dipakshaw</p>
                    </div>
                  </a>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
                    style={{ background: "#24292e", color: "#fff" }}
                  >
                    <GitHubIcon size={18} />
                    <div>
                      <p className="text-sm font-semibold leading-none">GitHub</p>
                      <p className="text-xs opacity-80 mt-0.5">Open source projects</p>
                    </div>
                  </a>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
