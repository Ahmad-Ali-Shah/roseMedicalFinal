"use client";

import { useEffect, useState, type ReactElement } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/features/localization/locales";
import {
  INQUIRY_CHANGE_EVENT,
  getInquiryLineCount,
  readInquiry
} from "./inquiry-store";

export function InquiryCountLabel(): ReactElement {
  const [count, setCount] = useState(0);
  const arabic = getLocaleFromPathname(usePathname()) === "ar";
  const label = arabic ? "الاستفسار" : "Inquiry";

  useEffect(() => {
    const synchronize = () => setCount(getInquiryLineCount(readInquiry()));
    synchronize();
    window.addEventListener(INQUIRY_CHANGE_EVENT, synchronize);
    window.addEventListener("storage", synchronize);
    return () => {
      window.removeEventListener(INQUIRY_CHANGE_EVENT, synchronize);
      window.removeEventListener("storage", synchronize);
    };
  }, []);

  return (
    <span aria-label={arabic ? `${label}، ${count}` : `Inquiry, ${count} ${count === 1 ? "item" : "items"}`}>
      {label} ({count})
    </span>
  );
}
