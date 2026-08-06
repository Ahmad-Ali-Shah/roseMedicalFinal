"use client";

import type { PointerEvent, PropsWithChildren, ReactElement } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type TiltTag = "div" | "article";

interface TiltSurfaceProps extends PropsWithChildren {
  as?: TiltTag;
  className?: string;
  maxDegrees?: number;
}

export function TiltSurface({
  as = "div",
  children,
  className,
  maxDegrees = 2.5
}: TiltSurfaceProps): ReactElement {
  const reduceMotion = useReducedMotion() === true;
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 24, mass: 0.4 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 24, mass: 0.4 });

  function move(event: PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(horizontal * maxDegrees * 2);
    rotateX.set(vertical * maxDegrees * -2);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const shared = {
    ...(className ? { className } : {}),
    "data-motion": "tilt",
    onPointerMove: move,
    onPointerLeave: reset,
    onPointerCancel: reset,
    style: {
      transformPerspective: 900,
      rotateX: springX,
      rotateY: springY
    }
  } as const;

  return as === "article"
    ? <motion.article {...shared}>{children}</motion.article>
    : <motion.div {...shared}>{children}</motion.div>;
}
