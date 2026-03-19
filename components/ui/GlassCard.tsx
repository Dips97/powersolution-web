import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  tint?: string;
  padding?: "none" | "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function GlassCard({
  children,
  className = "",
  hover = false,
  tint,
  padding = "md",
  style,
}: GlassCardProps) {
  const tintStyle: React.CSSProperties = tint
    ? { boxShadow: `0 8px 32px ${tint}22, inset 0 1px 0 rgba(255,255,255,0.15)` }
    : {};

  return (
    <div
      className={`glass-card ${hover ? "glass-card-hover" : ""} ${paddingMap[padding]} ${className}`}
      style={{ ...tintStyle, ...style }}
    >
      {children}
    </div>
  );
}
