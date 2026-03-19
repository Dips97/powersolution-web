"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Zap } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import SearchOverlay from "@/components/ui/SearchOverlay";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  const path = href.split("#")[0];
  if (!path || path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(path + "/");
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          padding: scrolled ? "8px 0" : "16px 0",
          background: "var(--glass-bg)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid var(--glass-border)",
          boxShadow: scrolled ? "0 4px 20px var(--glass-shadow)" : "none",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg" style={{ fontFamily: "var(--font-display, serif)" }}>
            <Zap size={20} fill="var(--accent)" style={{ color: "var(--accent)" }} />
            <span style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Power Solution
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href, pathname);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      color: active ? "var(--accent)" : "var(--text-secondary)",
                      background: active ? "rgba(0,122,255,0.1)" : "transparent",
                    }}
                  >
                    {link.label}
                    {active && (
                      <span
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="glass-card p-2 rounded-full cursor-pointer transition-all hover:scale-105"
              style={{ borderRadius: "999px" }}
            >
              <Search size={16} style={{ color: "var(--text-secondary)" }} />
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen
              ? <X size={22} style={{ color: "var(--text-primary)" }} />
              : <Menu size={22} style={{ color: "var(--text-primary)" }} />}
          </button>
        </nav>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-1" style={{ borderTop: "1px solid var(--separator)" }}>
            {navLinks.map((link) => {
              const active = isActive(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    color: active ? "var(--accent)" : "var(--text-primary)",
                    background: active ? "rgba(0,122,255,0.1)" : "transparent",
                    borderLeft: active ? "3px solid var(--accent)" : "3px solid transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-3 mt-2">
              <ThemeToggle />
            </div>
          </div>
        )}
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
