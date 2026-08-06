"use client";

import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import { getLocaleFromPathname } from "./locales";

export function LocalizedText({ en, ar }: { en: string; ar: string }): ReactElement {
  return <>{getLocaleFromPathname(usePathname()) === "ar" ? ar : en}</>;
}
