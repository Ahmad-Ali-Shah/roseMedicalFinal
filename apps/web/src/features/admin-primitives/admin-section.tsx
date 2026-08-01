import { useId, type HTMLAttributes, type ReactNode } from "react";
import { AdminActionGroup } from "./admin-page-header";

export interface AdminSectionHeaderProps {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
}

export function AdminSectionHeader({
  id,
  title,
  eyebrow,
  description,
  actions
}: AdminSectionHeaderProps) {
  return (
    <header className="admin-section-header">
      <div>
        {eyebrow ? <p className="page-eyebrow">{eyebrow}</p> : null}
        <h2 id={id}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <AdminActionGroup>{actions}</AdminActionGroup> : null}
    </header>
  );
}

export interface AdminSectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AdminSection({
  title,
  eyebrow,
  description,
  actions,
  children,
  className = "",
  ...props
}: AdminSectionProps) {
  const headingId = useId();
  return (
    <section
      className={`admin-section ${className}`.trim()}
      aria-labelledby={title ? headingId : undefined}
      {...props}
    >
      {title ? (
        <AdminSectionHeader
          id={headingId}
          title={title}
          eyebrow={eyebrow}
          description={description}
          actions={actions}
        />
      ) : null}
      {children}
    </section>
  );
}
