"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode
} from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASING
} from "./motion.config";

type StaggerTag = "div" | "ul" | "ol";
type StaggerItemTag = "div" | "li" | "article";

interface StaggerItemProps extends PropsWithChildren<Omit<HTMLAttributes<HTMLElement>, "children">> {
  as?: StaggerItemTag;
  order?: number;
}

const itemVariants: Variants = {
  hidden: {
    opacity: 1,
    filter: "blur(3px)",
    y: MOTION_DISTANCE.mobile
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: MOTION_DURATION.section,
      ease: [...MOTION_EASING.standard]
    }
  }
};

export function StaggerItem({
  as = "div",
  children,
  order = 0,
  className,
  style,
  ...rest
}: StaggerItemProps): ReactElement {
  const shared = {
    ...rest,
    className,
    "data-motion": "stagger-item",
    style: {
      ...style,
      "--motion-order": order
    } as CSSProperties,
    variants: itemVariants
  };

  switch (as) {
    case "li":
      return <motion.li {...shared}>{children}</motion.li>;
    case "article":
      return <motion.article {...shared}>{children}</motion.article>;
    case "div":
      return <motion.div {...shared}>{children}</motion.div>;
  }
}

interface StaggerProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  as?: StaggerTag;
  children: ReactNode;
  interval?: number;
  once?: boolean;
}

export function Stagger({
  as = "div",
  children,
  className,
  interval = 0.07,
  once = true,
  ...rest
}: StaggerProps): ReactElement {
  const shouldReduceMotion = useReducedMotion() === true;
  const indexedChildren = Children.map(children, (child, index) => {
    if (!isValidElement<StaggerItemProps>(child) || child.type !== StaggerItem) {
      return child;
    }

    return cloneElement(child, { order: index });
  });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: interval,
        delayChildren: 0.02
      }
    }
  };

  const shared = {
    ...rest,
    className,
    "data-motion": "stagger",
    initial: shouldReduceMotion ? false : "hidden",
    whileInView: "visible",
    viewport: { once, amount: 0.12, margin: "0px 0px -6% 0px" },
    variants: containerVariants
  };

  switch (as) {
    case "ul":
      return <motion.ul {...shared}>{indexedChildren}</motion.ul>;
    case "ol":
      return <motion.ol {...shared}>{indexedChildren}</motion.ol>;
    case "div":
      return <motion.div {...shared}>{indexedChildren}</motion.div>;
  }
}
