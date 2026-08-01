import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui";
import {
  AdminNavigation,
  AdminWorkspaceHeader
} from "@/features/admin-navigation";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__identity">
          <Link className="admin-sidebar__brand" href="/admin">ROSA</Link>
          <p>Owner workspace</p>
        </div>
        <AdminNavigation />
        <ButtonLink href="/" variant="secondary" size="small" className="admin-sidebar__public-link">
          View public website
        </ButtonLink>
      </aside>
      <div className="admin-workspace">
        <AdminWorkspaceHeader />
        <div className="admin-workspace__warning" role="status">
          Static preview. Production access requires server-enforced owner authentication.
        </div>
        <main className="admin-content" id="main-content">{children}</main>
      </div>
    </div>
  );
}
