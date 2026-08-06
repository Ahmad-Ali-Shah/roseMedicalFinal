"use client";

import { useEffect, type ReactElement } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "./locales";

export function LocaleDocumentController(): ReactElement | null {
  const locale = getLocaleFromPathname(usePathname());

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
