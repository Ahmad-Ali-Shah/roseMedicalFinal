"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { addInquiryItem, type InquiryItem } from "./inquiry-store";
import { getLocaleFromPathname, localizePath } from "@/features/localization/locales";
import type { Route } from "next";

export function AddToInquiryButton({
  item,
  className = "button button--primary button--standard product-add-preview"
}: {
  item: InquiryItem;
  className?: string;
}) {
  const [added, setAdded] = useState(false);
  const arabic = getLocaleFromPathname(usePathname()) === "ar";

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
          <Link href={localizePath("/inquiry", arabic ? "ar" : "en") as Route<string>} className={className}>
            {arabic ? "تمت الإضافة · عرض الاستفسار" : "Added · View inquiry"}
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
            onClick={() => {
              addInquiryItem(item);
              setAdded(true);
            }}
          >
            {arabic ? "أضف إلى الاستفسار" : "Add to inquiry"}
          </button>
        </motion.span>
      )}
    </AnimatePresence>
  );
}
