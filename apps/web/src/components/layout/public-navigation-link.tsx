"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

export function isPublicNavigationActive(pathname: string, href: string): boolean {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function PublicNavigationLink({
  href,
  label
}: {
  href: Route<string>;
  label: string;
}): ReactElement {
  const pathname = usePathname();
  const active = isPublicNavigationActive(pathname, href);

  return (
    <Link
      className="nav-link"
      href={href}
      aria-current={active ? "page" : undefined}
      data-navigation-state={active ? "active" : "idle"}
    >
      {label}
    </Link>
  );
}
