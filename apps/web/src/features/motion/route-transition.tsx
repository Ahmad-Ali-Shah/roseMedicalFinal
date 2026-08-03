"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren, ReactElement } from "react";
import { motion, useReducedMotion, type Transition } from "motion/react";
import { MOTION_DURATION, MOTION_EASING } from "./motion.config";

export function RouteTransition({ children }: PropsWithChildren): ReactElement {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion() === true;
  const transition: Transition = {
    duration: MOTION_DURATION.component,
    ease: MOTION_EASING.standard
  };

  return (
    <motion.div
      key={pathname}
      data-motion="route-transition"
      initial={reduceMotion ? false : { opacity: 1, y: 8, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
