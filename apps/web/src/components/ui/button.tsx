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
  prefetch?: boolean | null;
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
  prefetch,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  "aria-current": ariaCurrent
}: ButtonLinkProps<T>) {
  return (
    <Link
      className={`button button--${variant} button--${size} ${className}`.trim()}
      data-button="true"
      href={href}
      {...(prefetch === undefined ? {} : { prefetch })}
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
