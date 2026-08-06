"use client";

import type { Route } from "next";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import { ButtonLink, type ButtonLinkProps } from "@/components/ui/button";
import { getLocaleFromPathname, localizePath } from "./locales";

type Props = Omit<ButtonLinkProps<string>, "href"> & { href: string };

export function LocalizedButtonLink({ href, ...props }: Props): ReactElement {
  const locale = getLocaleFromPathname(usePathname());
  return <ButtonLink href={localizePath(href, locale) as Route<string>} {...props} />;
}
