import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

const adminLinks = [
  ["Overview", "/admin"], ["Products", "/admin/products"], ["Families", "/admin/families"],
  ["Catalogues", "/admin/catalogues"], ["Media", "/admin/media"], ["Inquiries", "/admin/inquiries"],
  ["Messages", "/admin/messages"], ["Website Content", "/admin/content"], ["Contact Details", "/admin/contact-details"],
  ["Publishing", "/admin/publishing"], ["Revisions", "/admin/revisions"], ["Settings", "/admin/settings"]
] as const;

function AdminNavigation({ label }: { label: string }) {
  return (
    <nav aria-label={label}>
      <ul className="nav-list">
        {adminLinks.map(([text, href]) => <li key={href}><Link className="nav-link" href={href}>{text}</Link></li>)}
      </ul>
    </nav>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <Link className="brand" href="/admin">ROSA</Link>
          <p className="route-eyebrow">Administration</p>
        </div>
        <div className="admin-sidebar__nav"><AdminNavigation label="Admin navigation" /></div>
      </aside>
      <div className="admin-workspace">
        <header className="admin-topbar">
          <div className="admin-topbar__workspace"><strong>Single owner workspace</strong></div>
          <details className="admin-mobile-navigation">
            <summary>Admin menu</summary>
            <AdminNavigation label="Mobile admin navigation" />
          </details>
          <div className="cluster">
            <ButtonLink href="/" variant="secondary" size="small">Preview public site</ButtonLink>
            <div className="admin-topbar__identity">
              <span className="admin-avatar" aria-hidden="true">MA</span>
              <div><strong>Owner</strong><div className="field__hint">Secure session</div></div>
            </div>
          </div>
        </header>
        <main className="admin-content" id="main-content">{children}</main>
      </div>
    </div>
  );
}
