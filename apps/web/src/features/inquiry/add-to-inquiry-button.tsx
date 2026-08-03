"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { addInquiryItem, type InquiryItem } from "./inquiry-store";

export function AddToInquiryButton({
  item,
  className = "button button--primary button--standard product-add-preview"
}: {
  item: InquiryItem;
  className?: string;
}) {
  const [ready, setReady] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence initial={false} mode="wait">
      {added ? (
        <motion.span
          className="add-to-inquiry-transition"
          key="added"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
        >
          <Link href="/inquiry" className={className}>
            Added · View inquiry
          </Link>
        </motion.span>
      ) : (
        <motion.span
          className="add-to-inquiry-transition"
          key="add"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            className={className}
            disabled={!ready}
            aria-busy={!ready}
            onClick={() => {
              addInquiryItem(item);
              setAdded(true);
            }}
          >
            Add to inquiry
          </button>
        </motion.span>
      )}
    </AnimatePresence>
  );
}
