import Link from "next/link";
import type { ReactNode } from "react";

export function AdminOwnerAccessFrame({
  eyebrow,
  title,
  description,
  children,
  footer
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <article className="admin-auth-card">
      <Link className="admin-auth-card__brand" href="/">ROSA</Link>
      <p className="page-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="admin-auth-card__description">{description}</p>
      {children}
      <footer className="admin-auth-card__footer">{footer}</footer>
    </article>
  );
}
