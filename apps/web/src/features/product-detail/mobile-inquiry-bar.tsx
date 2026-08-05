"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion } from "motion/react";
import { AddToInquiryButton, type InquiryItem } from "@/features/inquiry";

export function MobileInquiryBar({ item }: { item: InquiryItem }): ReactElement {
  const reduceMotion = useReducedMotion() === true;

  return (
    <motion.aside
      className="mobile-inquiry-bar"
      aria-label="Inquiry action"
      data-motion="mobile-inquiry-bar"
      initial={reduceMotion ? false : { opacity: 0.96, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <span>Quotation required</span>
      <AddToInquiryButton
        item={item}
        className="button button--primary button--standard"
      />
    </motion.aside>
  );
}
