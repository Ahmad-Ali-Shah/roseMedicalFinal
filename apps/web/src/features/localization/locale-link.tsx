"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactElement } from "react";
import { getLocaleFromPathname, localizePath } from "./locales";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export function LocaleLink({
  href,
  prefetch = false,
  ...props
}: LocaleLinkProps): ReactElement {
  const locale = getLocaleFromPathname(usePathname());
  return (
    <Link
      href={localizePath(href, locale) as Route<string>}
      prefetch={prefetch}
      {...props}
    />
  );
}
