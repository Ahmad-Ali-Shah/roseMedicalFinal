"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
      disabled={!ready}
      aria-busy={!ready}
      onClick={() => {
        addInquiryItem(item);
        setAdded(true);
      }}
    >
      Add to inquiry
    </button>
  );
}
