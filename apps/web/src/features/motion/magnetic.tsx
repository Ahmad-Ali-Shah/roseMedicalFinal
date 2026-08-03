"use client";

import type { PointerEvent, PropsWithChildren, ReactElement } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

interface MagneticProps extends PropsWithChildren {
  className?: string;
  strength?: number;
}

export function Magnetic({
  children,
  className,
  strength = 0.16
}: MagneticProps): ReactElement {
  const reduceMotion = useReducedMotion() === true;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.35 });

  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * strength);
    y.set((event.clientY - bounds.top - bounds.height / 2) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={className}
      data-motion="magnetic"
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{ x: reduceMotion ? 0 : springX, y: reduceMotion ? 0 : springY }}
    >
      {children}
    </motion.div>
  );
}
