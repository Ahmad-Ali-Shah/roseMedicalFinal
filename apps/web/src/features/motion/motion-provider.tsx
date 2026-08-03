"use client";

import type { PropsWithChildren, ReactElement } from "react";
import { MotionConfig, type Transition } from "motion/react";
import { MOTION_DURATION, MOTION_EASING } from "./motion.config";

export function MotionProvider({ children }: PropsWithChildren): ReactElement {
  const transition: Transition = {
    duration: MOTION_DURATION.component,
    ease: MOTION_EASING.standard
  };

  return (
    <MotionConfig reducedMotion="user" transition={transition}>
      {children}
    </MotionConfig>
  );
}
