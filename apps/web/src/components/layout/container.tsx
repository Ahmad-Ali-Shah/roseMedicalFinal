import type { HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "wide" | "standard" | "reading";
}

export function Container({ size = "standard", className = "", ...props }: ContainerProps) {
  return <div className={`container container--${size} ${className}`.trim()} {...props} />;
}
