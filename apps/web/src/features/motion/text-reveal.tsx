"use client";

import type { ReactElement } from "react";
import { motion, type Variants } from "motion/react";
import { MOTION_DURATION, MOTION_EASING } from "./motion.config";

type TextRevealTag = "h1" | "h2" | "h3" | "p" | "span";
type TextRevealMode = "words" | "lines";

interface TextRevealProps {
  as?: TextRevealTag;
  text: string;
  className?: string;
  id?: string;
  mode?: TextRevealMode;
  delay?: number;
}

const wordVariants: Variants = {
  hidden: { opacity: 1, y: "0.92em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.section,
      ease: MOTION_EASING.emphasized
    }
  }
};

export function TextReveal({
  as = "h2",
  text,
  className,
  id,
  mode = "words",
  delay = 0
}: TextRevealProps): ReactElement {
  const segments = mode === "lines" ? text.split("\n") : text.split(/\s+/);
  const content = segments.map((segment, index) => (
    <span className="text-reveal__clip" aria-hidden="true" key={`${segment}-${index}`}>
      <motion.span
        className="text-reveal__segment"
        variants={wordVariants}
        style={{ display: "inline-block" }}
      >
        {segment}
        {mode === "words" && index < segments.length - 1 ? "\u00a0" : null}
      </motion.span>
    </span>
  ));
  const shared = {
    ...(className ? { className } : {}),
    ...(id ? { id } : {}),
    "aria-label": text,
    "data-motion": "text-reveal",
    "data-text-mode": mode,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.45 },
    variants: {
      hidden: {},
      visible: {
        transition: {
          delayChildren: delay,
          staggerChildren: mode === "words" ? 0.04 : 0.075
        }
      }
    }
  } as const;

  switch (as) {
    case "h1":
      return <motion.h1 {...shared}>{content}</motion.h1>;
    case "h2":
      return <motion.h2 {...shared}>{content}</motion.h2>;
    case "h3":
      return <motion.h3 {...shared}>{content}</motion.h3>;
    case "p":
      return <motion.p {...shared}>{content}</motion.p>;
    case "span":
      return <motion.span {...shared}>{content}</motion.span>;
  }
}
