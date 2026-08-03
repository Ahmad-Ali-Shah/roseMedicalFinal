"use client";

import type { PointerEvent, PropsWithChildren, ReactElement } from "react";
import { useReducedMotion } from "motion/react";

interface SpotlightSurfaceProps extends PropsWithChildren {
  className?: string;
}

export function SpotlightSurface({
  children,
  className
}: SpotlightSurfaceProps): ReactElement {
  const reduceMotion = useReducedMotion() === true;

  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty("--spotlight-x", `${x}%`);
    event.currentTarget.style.setProperty("--spotlight-y", `${y}%`);
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--spotlight-x");
    event.currentTarget.style.removeProperty("--spotlight-y");
  }

  return (
    <div
      className={className}
      data-motion="spotlight"
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </div>
  );
}
