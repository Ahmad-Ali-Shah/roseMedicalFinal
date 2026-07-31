import Link from "next/link";
import type { Route } from "next";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "quiet" | "danger";
type ButtonSize = "standard" | "small";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant = "primary", size = "standard", className = "", type = "button", ...props }: ButtonProps) {
  return <button className={`button button--${variant} button--${size} ${className}`.trim()} type={type} {...props} />;
}

export interface ButtonLinkProps extends PropsWithChildren {
  href: Route;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function ButtonLink({ href, variant = "primary", size = "standard", className = "", children }: ButtonLinkProps) {
  return <Link className={`button button--${variant} button--${size} ${className}`.trim()} href={href}>{children}</Link>;
}
