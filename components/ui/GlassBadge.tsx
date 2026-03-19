import { ReactNode } from "react";

interface GlassBadgeProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export default function GlassBadge({ children, color, className = "" }: GlassBadgeProps) {
  return (
    <span
      className={`glass-badge ${className}`}
      style={color ? { color, borderColor: `${color}40` } : undefined}
    >
      {children}
    </span>
  );
}
