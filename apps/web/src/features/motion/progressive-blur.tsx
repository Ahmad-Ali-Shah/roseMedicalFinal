import type { ReactElement } from "react";

type BlurEdge = "top" | "right" | "bottom" | "left";

export function ProgressiveBlur({
  edge,
  className
}: {
  edge: BlurEdge;
  className?: string;
}): ReactElement {
  return (
    <span
      aria-hidden="true"
      className={className}
      data-blur-edge={edge}
      data-motion="progressive-blur"
    />
  );
}
