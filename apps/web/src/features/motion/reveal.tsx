"use client";

import type {
  HTMLAttributes,
  PropsWithChildren,
  ReactElement
} from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASING
} from "./motion.config";
import type { MotionDirection } from "./types";

type RevealTag = "div" | "section" | "header" | "span" | "li";

type RevealProps = PropsWithChildren<
  Omit<HTMLAttributes<HTMLElement>, "children"> & {
    as?: RevealTag;
    direction?: MotionDirection;
    delay?: number;
    once?: boolean;
  }
>;

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

function variants(direction: MotionDirection): Variants {
  return {
    hidden: {
      opacity: 1,
      filter: "blur(4px)",
      ...offset(direction)
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0
    }
  };
}

export function Reveal({
  as = "div",
  children,
  className,
  direction = "up",
  delay = 0,
  once = true,
  ...rest
}: RevealProps): ReactElement {
  const shouldReduceMotion = useReducedMotion() === true;
  const shared = {
    ...rest,
    className,
    "data-motion": "reveal",
    "data-motion-direction": direction,
    initial: shouldReduceMotion ? false : "hidden",
    whileInView: "visible",
    viewport: { once, amount: 0.18, margin: "0px 0px -8% 0px" },
    variants: variants(direction),
    transition: {
      duration: MOTION_DURATION.section,
      delay,
      ease: [...MOTION_EASING.standard]
    }
  };

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
