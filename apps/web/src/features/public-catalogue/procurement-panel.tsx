import Link from "next/link";
import type { Route } from "next";
import type { ReactElement } from "react";
import { ButtonLink } from "@/components/ui/button";

export interface ProcurementPanelProps<
  TPrimary extends string,
  TSecondary extends string = TPrimary
> {
  eyebrow?: string;
  title: string;
  copy: string;
  primary: { label: string; href: Route<TPrimary> };
  secondary?: { label: string; href: Route<TSecondary> };
  tone?: "paper" | "dark";
  className?: string;
}

export function ProcurementPanel<
  TPrimary extends string,
  TSecondary extends string = TPrimary
>({
  eyebrow,
  title,
  copy,
  primary,
  secondary,
  tone = "paper",
  className = ""
}: ProcurementPanelProps<TPrimary, TSecondary>): ReactElement {
  return (
    <div className={`procurement-panel procurement-panel--${tone} ${className}`.trim()}>
      <div className="procurement-panel__content">
        {eyebrow ? <p className="public-eyebrow">{eyebrow}</p> : null}
        <h2 className="procurement-panel__title">{title}</h2>
        <p className="procurement-panel__copy">{copy}</p>
      </div>
      <div className="procurement-panel__actions">
        <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
        {secondary ? <Link className="text-link" href={secondary.href}>{secondary.label}</Link> : null}
      </div>
    </div>
  );
}
