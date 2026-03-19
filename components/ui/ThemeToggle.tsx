"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

const THEMES = [
  { value: "light",  label: "Light",  Icon: Sun,     color: "#ff9f0a" },
  { value: "dark",   label: "Dark",   Icon: Moon,    color: "var(--accent)" },
  { value: "system", label: "System", Icon: Monitor, color: "var(--text-secondary)" },
] as const;

const NEXT: Record<string, string> = { light: "dark", dark: "system", system: "light" };

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-20 h-8" aria-hidden="true" />;

  const current = THEMES.find((t) => t.value === theme) ?? THEMES[2];
  const { Icon, label, color } = current;

  return (
    <button
      onClick={() => setTheme(NEXT[theme ?? "system"] ?? "light")}
      aria-label={`Theme: ${label}. Click to switch.`}
      className="glass-card flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer"
      style={{ borderRadius: "999px" }}
    >
      <span className="transition-transform duration-300">
        <Icon size={15} style={{ color }} />
      </span>
      <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
        {label}
      </span>
    </button>
  );
}
