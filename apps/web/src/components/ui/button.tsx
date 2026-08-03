import Link from "next/link";
import type { Route } from "next";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
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

export type ButtonLinkProps<T extends string> = PropsWithChildren<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> & {
    href: Route<T>;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
  }
>;

export function ButtonLink<T extends string>({
  href,
  variant = "primary",
  size = "standard",
  className = "",
  children,
  ...props
}: ButtonLinkProps<T>) {
  return (
    <Link
      className={`button button--${variant} button--${size} ${className}`.trim()}
      data-button="true"
      href={href}
      {...props}
    >
      <span className="button__label">{children}</span>
    </Link>
  );
}
