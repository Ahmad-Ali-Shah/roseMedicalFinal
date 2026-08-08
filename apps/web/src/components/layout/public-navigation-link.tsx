"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import type { ReactElement, ReactNode } from "react";
import { getLocaleFromPathname, localizePath, stripLocalePath } from "@/features/localization/locales";

export function isPublicNavigationActive(pathname: string, href: string): boolean {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function PublicNavigationLink({
  href,
  label
}: {
  href: Route<string>;
  label: ReactNode;
}): ReactElement {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const active = isPublicNavigationActive(stripLocalePath(pathname), href);

  return (
    <Link
      className="nav-link"
      href={localizePath(href, locale) as Route<string>}
      prefetch={false}
      aria-current={active ? "page" : undefined}
      data-navigation-state={active ? "active" : "idle"}
    >
      {label}
    </Link>
  );
}
