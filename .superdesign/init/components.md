# Shared UI Components

Framework: React 19 with Next.js 16 App Router. The UI layer is Rosa-owned rather than a prebuilt component package. Styling is global CSS with project tokens and Tailwind 4 in the build pipeline.

## Alert

- Source: `apps/web/src/components/ui/alert.tsx`
- Purpose: Semantic status/feedback banner with tone variants.

```tsx
import type { HTMLAttributes, ReactNode } from "react";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "neutral" | "warning" | "danger" | "success";
  title: string;
  children: ReactNode;
}

export function Alert({ tone = "neutral", title, children, className = "", ...props }: AlertProps) {
  return (
    <div className={`alert alert--${tone} ${className}`.trim()} role={tone === "danger" ? "alert" : "status"} {...props}>
      <p className="alert__title">{title}</p>
      <div className="alert__body">{children}</div>
    </div>
  );
}

```

## Button and ButtonLink

- Source: `apps/web/src/components/ui/button.tsx`
- Purpose: Primary action primitives with variant and size contracts.

```tsx
import Link from "next/link";
import type { Route } from "next";
import type {
  AriaAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
  PropsWithChildren
} from "react";

type ButtonVariant = "primary" | "secondary" | "quiet" | "danger";
type ButtonSize = "standard" | "small";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "standard",
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant} button--${size} ${className}`.trim()}
      data-button="true"
      type={type}
      {...props}
    >
      <span className="button__label">{children}</span>
    </button>
  );
}

export type ButtonLinkProps<T extends string> = PropsWithChildren<{
  href: Route<T>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  target?: "_self" | "_blank" | "_parent" | "_top";
  rel?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-current"?: AriaAttributes["aria-current"];
}>;

export function ButtonLink<T extends string>({
  href,
  variant = "primary",
  size = "standard",
  className = "",
  children,
  onClick,
  target,
  rel,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  "aria-current": ariaCurrent
}: ButtonLinkProps<T>) {
  return (
    <Link
      className={`button button--${variant} button--${size} ${className}`.trim()}
      data-button="true"
      href={href}
      {...(onClick ? { onClick } : {})}
      {...(target ? { target } : {})}
      {...(rel ? { rel } : {})}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
      {...(ariaDescribedby ? { "aria-describedby": ariaDescribedby } : {})}
      {...(ariaCurrent === undefined ? {} : { "aria-current": ariaCurrent })}
    >
      <span className="button__label">{children}</span>
    </Link>
  );
}

```

## Card

- Source: `apps/web/src/components/ui/card.tsx`
- Purpose: Shared bordered content surface.

```tsx
import type { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  tone?: "paper" | "mist" | "dark";
  interactive?: boolean;
}

export function Card({ tone = "paper", interactive = false, className = "", ...props }: CardProps) {
  return <article className={`card card--${tone} ${interactive ? "card--interactive" : ""} ${className}`.trim()} {...props} />;
}

```

## Field

- Source: `apps/web/src/components/ui/field.tsx`
- Purpose: Form field wrapper, label, hint, and error presentation.

```tsx
import type { InputHTMLAttributes } from "react";

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function Field({ label, hint, error, id, className = "", ...props }: FieldProps) {
  const fieldId = id ?? props.name;
  if (!fieldId) throw new Error("Field requires an id or name.");
  const descriptionId = `${fieldId}-description`;
  return (
    <div className={`field ${className}`.trim()}>
      <label className="field__label" htmlFor={fieldId}>{label}</label>
      <input
        className="field__control"
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={hint || error ? descriptionId : undefined}
        {...props}
      />
      {(error || hint) && <p className={error ? "field__error" : "field__hint"} id={descriptionId}>{error ?? hint}</p>}
    </div>
  );
}

```

## Status

- Source: `apps/web/src/components/ui/status.tsx`
- Purpose: Compact status indicator.

```tsx
import type { HTMLAttributes } from "react";

export interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "review" | "ready" | "published" | "danger";
}

export function Status({ tone = "neutral", className = "", ...props }: StatusProps) {
  return <span className={`status status--${tone} ${className}`.trim()} {...props} />;
}

```

## UI exports

- Source: `apps/web/src/components/ui/index.ts`
- Purpose: Public exports for shared UI primitives.

```tsx
export * from "./alert";
export * from "./button";
export * from "./card";
export * from "./field";
export * from "./status";

```
