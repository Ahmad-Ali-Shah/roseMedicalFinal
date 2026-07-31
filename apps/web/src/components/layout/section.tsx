import type { HTMLAttributes } from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: "warm" | "paper" | "mist" | "dark";
  spacing?: "standard" | "compact";
}

export function Section({ tone = "warm", spacing = "standard", className = "", ...props }: SectionProps) {
  const spacingClass = spacing === "compact" ? "section--compact" : "";
  return <section className={`section section--${tone} ${spacingClass} ${className}`.trim()} {...props} />;
}
