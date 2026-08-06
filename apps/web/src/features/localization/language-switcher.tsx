"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import { getLocaleFromPathname, localizePath } from "./locales";

export function LanguageSwitcher({ onNavigate }: { onNavigate?: () => void }): ReactElement {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const nextLocale = locale === "ar" ? "en" : "ar";

  return (
    <Link
      className="language-switcher"
      href={localizePath(pathname, nextLocale) as Route<string>}
      hrefLang={nextLocale}
      lang={nextLocale}
      dir={nextLocale === "ar" ? "rtl" : "ltr"}
      {...(onNavigate ? { onClick: onNavigate } : {})}
      aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
    >
      {locale === "ar" ? "English" : "العربية"}
    </Link>
  );
}
