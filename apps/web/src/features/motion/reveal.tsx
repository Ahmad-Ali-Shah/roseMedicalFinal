"use client";

import type { AriaRole, PropsWithChildren, ReactElement } from "react";
import { motion, type Transition, type Variants } from "motion/react";
import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASING
} from "./motion.config";
import type { MotionDirection } from "./types";

type RevealTag = "div" | "section" | "header" | "span" | "li";

interface RevealProps extends PropsWithChildren {
  as?: RevealTag;
  className?: string;
  id?: string;
  role?: AriaRole;
  tabIndex?: number;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-hidden"?: boolean;
  direction?: MotionDirection;
  delay?: number;
  once?: boolean;
}

function offset(direction: MotionDirection) {
  const distance = MOTION_DISTANCE.desktop;

  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    case "none":
      return {};
  }
}

function revealVariants(direction: MotionDirection): Variants {
  return {
    hidden: {
      opacity: 1,
      filter: "blur(3px)",
      ...offset(direction)
    },
    visible: {
      opacity: 1,
      filter: "none",
      x: 0,
      y: 0
    }
  };
}

export function Reveal({
  as = "div",
  children,
  className,
  id,
  role,
  tabIndex,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  "aria-hidden": ariaHidden,
  direction = "up",
  delay = 0,
  once = true
}: RevealProps): ReactElement {
  const transition: Transition = {
    duration: MOTION_DURATION.section,
    delay,
    ease: MOTION_EASING.standard
  };
  const shared = {
    ...(className ? { className } : {}),
    ...(id ? { id } : {}),
    ...(role ? { role } : {}),
    ...(tabIndex === undefined ? {} : { tabIndex }),
    ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
    ...(ariaLabelledby ? { "aria-labelledby": ariaLabelledby } : {}),
    ...(ariaDescribedby ? { "aria-describedby": ariaDescribedby } : {}),
    ...(ariaHidden === undefined ? {} : { "aria-hidden": ariaHidden }),
    "data-motion": "reveal",
    "data-motion-direction": direction,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once, amount: 0.18, margin: "0px 0px -8% 0px" },
    variants: revealVariants(direction),
    transition
  } as const;

  switch (as) {
    case "section":
      return <motion.section {...shared}>{children}</motion.section>;
    case "header":
      return <motion.header {...shared}>{children}</motion.header>;
    case "span":
      return <motion.span {...shared}>{children}</motion.span>;
    case "li":
      return <motion.li {...shared}>{children}</motion.li>;
    case "div":
      return <motion.div {...shared}>{children}</motion.div>;
  }
}
