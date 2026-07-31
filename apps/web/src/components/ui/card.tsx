import type { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  tone?: "paper" | "mist" | "dark";
  interactive?: boolean;
}

export function Card({ tone = "paper", interactive = false, className = "", ...props }: CardProps) {
  return <article className={`card card--${tone} ${interactive ? "card--interactive" : ""} ${className}`.trim()} {...props} />;
}
