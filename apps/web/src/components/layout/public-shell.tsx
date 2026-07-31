import Link from "next/link";

const links = [
  ["Products", "/products"],
  ["Catalogues", "/catalogues"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Search", "/search"],
  ["Inquiry", "/inquiry"]
] as const;

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="site-header">
        <div className="shell-row">
          <Link className="brand" href="/">ROSA</Link>
          <nav aria-label="Primary navigation">
            <ul className="nav-list">
              {links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
            </ul>
          </nav>
        </div>
      </header>
      <main className="page-main" id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="shell-row">
          <p>ROSA — medical instruments supplier and procurement partner.</p>
          <nav aria-label="Footer navigation">
            <ul className="nav-list"><li><Link href="/privacy">Privacy</Link></li><li><Link href="/terms">Terms</Link></li></ul>
          </nav>
        </div>
      </footer>
    </>
  );
}
