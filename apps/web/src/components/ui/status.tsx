import type { HTMLAttributes } from "react";

export interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "review" | "ready" | "published" | "danger";
}

export function Status({ tone = "neutral", className = "", ...props }: StatusProps) {
  return <span className={`status status--${tone} ${className}`.trim()} {...props} />;
}
