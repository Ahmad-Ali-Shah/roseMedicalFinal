"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type AriaRole,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode
} from "react";
import { motion, type MotionStyle, type Variants } from "motion/react";
import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASING
} from "./motion.config";

type StaggerTag = "div" | "ul" | "ol";
type StaggerItemTag = "div" | "li" | "article";
type DataAttributeValue = string | number | boolean | undefined;

interface SemanticMotionProps {
  className?: string;
  id?: string;
  role?: AriaRole;
  tabIndex?: number;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  [attribute: `data-${string}`]: DataAttributeValue;
}

interface StaggerItemProps extends PropsWithChildren, SemanticMotionProps {
  as?: StaggerItemTag;
  order?: number;
  interval?: number;
  once?: boolean;
}

function itemVariants(order: number, interval: number): Variants {
  return {
    hidden: {
      opacity: 1,
      y: MOTION_DISTANCE.mobile
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_DURATION.section,
        delay: Math.min(order, 5) * interval,
        ease: MOTION_EASING.standard
      }
    }
  };
}

export function StaggerItem({
  as = "div",
  children,
  order = 0,
  interval = 0.045,
  once = true,
  className,
  id,
  role,
  tabIndex,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  ...dataAttributes
}: StaggerItemProps): ReactElement {
  const style = { "--motion-order": order } as MotionStyle;
  const shared = {
    ...dataAttributes,
    ...(className ? { className } : {}),
    ...(id ? { id } : {}),
    ...(role ? { role } : {}),
    ...(tabIndex === undefined ? {} : { tabIndex }),
    ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
    ...(ariaLabelledby ? { "aria-labelledby": ariaLabelledby } : {}),
    ...(ariaDescribedby ? { "aria-describedby": ariaDescribedby } : {}),
    "data-motion": "stagger-item",
    style,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once, amount: 0.15, margin: "0px 0px -5% 0px" },
    variants: itemVariants(order, interval)
  } as const;

  switch (as) {
    case "li":
      return <motion.li {...shared}>{children}</motion.li>;
    case "article":
      return <motion.article {...shared}>{children}</motion.article>;
    case "div":
      return <motion.div {...shared}>{children}</motion.div>;
  }
}

interface StaggerProps extends SemanticMotionProps {
  as?: StaggerTag;
  children: ReactNode;
  interval?: number;
  once?: boolean;
}

export function Stagger({
  as = "div",
  children,
  className,
  id,
  role,
  tabIndex,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  interval = 0.055,
  once = true,
  ...dataAttributes
}: StaggerProps): ReactElement {
  const indexedChildren = Children.map(children, (child, index) => {
    if (!isValidElement<StaggerItemProps>(child) || child.type !== StaggerItem) {
      return child;
    }

    return cloneElement(child, { order: index, interval, once });
  });
  const shared = {
    ...dataAttributes,
    ...(className ? { className } : {}),
    ...(id ? { id } : {}),
    ...(role ? { role } : {}),
    ...(tabIndex === undefined ? {} : { tabIndex }),
    ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
    ...(ariaLabelledby ? { "aria-labelledby": ariaLabelledby } : {}),
    ...(ariaDescribedby ? { "aria-describedby": ariaDescribedby } : {}),
    "data-motion": "stagger"
  } as const;

  switch (as) {
    case "ul":
      return <motion.ul {...shared}>{indexedChildren}</motion.ul>;
    case "ol":
      return <motion.ol {...shared}>{indexedChildren}</motion.ol>;
    case "div":
      return <motion.div {...shared}>{indexedChildren}</motion.div>;
  }
}
