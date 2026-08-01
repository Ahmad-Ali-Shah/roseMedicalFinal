import type { ReactNode } from "react";

export interface AdminPageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions
}: AdminPageHeaderProps) {
  return (
    <header className="admin-page-header">
      <div className="admin-page-header__copy">
        <p className="page-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description ? <p className="admin-page-header__description">{description}</p> : null}
      </div>
      {actions ? <AdminActionGroup>{actions}</AdminActionGroup> : null}
    </header>
  );
}

export function AdminActionGroup({ children }: { children: ReactNode }) {
  return <div className="admin-action-group">{children}</div>;
}
