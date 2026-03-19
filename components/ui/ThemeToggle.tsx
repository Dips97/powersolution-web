"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-16 h-8" aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="glass-card flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer"
      style={{ borderRadius: "999px" }}
    >
      <span
        className="transition-transform duration-300"
        style={{ transform: isDark ? "rotate(0deg)" : "rotate(-30deg)" }}
      >
        {isDark ? (
          <Moon size={15} style={{ color: "var(--accent)" }} />
        ) : (
          <Sun size={15} style={{ color: "#ff9f0a" }} />
        )}
      </span>
      <span
        className="text-xs font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
