import Link from "next/link";

const adminLinks = [
  ["Overview", "/admin"], ["Products", "/admin/products"], ["Families", "/admin/families"],
  ["Catalogues", "/admin/catalogues"], ["Media", "/admin/media"], ["Inquiries", "/admin/inquiries"],
  ["Messages", "/admin/messages"], ["Website Content", "/admin/content"], ["Contact Details", "/admin/contact-details"],
  ["Publishing", "/admin/publishing"], ["Revisions", "/admin/revisions"], ["Settings", "/admin/settings"]
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-grid">
      <aside className="admin-sidebar">
        <Link className="brand" href="/admin">ROSA</Link>
        <p className="route-eyebrow">Administration</p>
        <nav aria-label="Admin navigation"><ul className="nav-list">{adminLinks.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>
      </aside>
      <main className="admin-content" id="main-content">{children}</main>
    </div>
  );
}
