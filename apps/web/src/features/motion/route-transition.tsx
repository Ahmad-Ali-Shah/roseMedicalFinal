"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren, ReactElement } from "react";
import { motion, type Transition } from "motion/react";
import { MOTION_DURATION, MOTION_EASING } from "./motion.config";

export function RouteTransition({ children }: PropsWithChildren): ReactElement {
  const pathname = usePathname();
  const transition: Transition = {
    duration: MOTION_DURATION.component,
    ease: MOTION_EASING.standard
  };

  return (
    <motion.div
      key={pathname}
      data-motion="route-transition"
      initial={{ opacity: 0.985, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
