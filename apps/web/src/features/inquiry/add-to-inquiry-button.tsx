"use client";

import Link from "next/link";
import { useState } from "react";
import { addInquiryItem, type InquiryItem } from "./inquiry-store";

export function AddToInquiryButton({
  item,
  className = "button button--primary button--standard product-add-preview"
}: {
  item: InquiryItem;
  className?: string;
}) {
  const [added, setAdded] = useState(false);

  if (added) {
    return (
      <Link href="/inquiry" className={className}>
        Added · View inquiry
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        addInquiryItem(item);
        setAdded(true);
      }}
    >
      Add to inquiry
    </button>
  );
}
