import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { PUBLIC_CONTENT_VALUES } from "@/features/public-content-registry";
import { Container } from "./container";

const primaryLinks = [
  ["Products", "/products"],
  ["Catalogues", "/catalogues"],
  ["About", "/about"],
  ["Contact", "/contact"]
] as const;

const utilityLinks = [
  ["Search", "/search"],
  ["Inquiry (0)", "/inquiry"]
] as const;

const familyLinks = [
  ["Knives", "/products/knives"],
  ["Scissors", "/products/scissors"],
  ["Punches", "/products/punches"],
  ["Chisels", "/products/chisels"],
  ["Cutters", "/products/cutters"]
] as const;

function NavigationLinks({ includeQuote = false }: { includeQuote?: boolean }) {
  return (
    <ul className="nav-list">
      {primaryLinks.map(([label, href]) => <li key={href}><Link className="nav-link" href={href}>{label}</Link></li>)}
      {utilityLinks.map(([label, href]) => <li key={href}><Link className="nav-link" href={href}>{label}</Link></li>)}
      {includeQuote && <li><ButtonLink href="/request-quotation" size="small">Request a quote</ButtonLink></li>}
    </ul>
  );
}

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="site-header">
        <Container className="site-header__bar" size="wide">
          <Link className="brand" href="/" aria-label="Rosa homepage">ROSA</Link>
          <nav className="site-header__nav" aria-label="Primary navigation">
            <ul className="nav-list">
              {primaryLinks.map(([label, href]) => <li key={href}><Link className="nav-link" href={href}>{label}</Link></li>)}
            </ul>
          </nav>
          <div className="cluster site-header__actions">
            {utilityLinks.map(([label, href]) => <Link className="nav-link" href={href} key={href}>{label}</Link>)}
            <ButtonLink href="/request-quotation" size="small">Request a quote</ButtonLink>
          </div>
          <details className="mobile-navigation">
            <summary>Menu</summary>
            <nav className="mobile-navigation__panel" aria-label="Mobile navigation"><NavigationLinks includeQuote /></nav>
          </details>
        </Container>
      </header>
      <main className="page-main" id="main-content">{children}</main>
      <footer className="site-footer">
        <Container className="site-footer__grid" size="wide">
          <div className="site-footer__brand stack">
            <Link className="brand" href="/">ROSA</Link>
            <p>{PUBLIC_CONTENT_VALUES.footerDescription.copy}</p>
            <ButtonLink href="/request-quotation" size="small">Request a quote</ButtonLink>
          </div>
          <nav aria-label="Product families">
            <p className="site-footer__title">Products</p>
            <ul className="site-footer__links">
              {familyLinks.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
              <li><Link href="/catalogues">Catalogues</Link></li>
            </ul>
          </nav>
          <nav aria-label="Company navigation">
            <p className="site-footer__title">Company</p>
            <ul className="site-footer__links">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/procurement-support">Procurement support</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>
          <nav aria-label="Footer navigation">
            <p className="site-footer__title">Support</p>
            <ul className="site-footer__links">
              <li><Link href="/inquiry">Inquiry</Link></li>
              <li><Link href="/search">Search</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
            </ul>
          </nav>
        </Container>
        <Container className="site-footer__bottom cluster" size="wide">
          <span>© ROSA. Replace legal and company details after verification.</span>
          <span>English first · Arabic-ready structure</span>
        </Container>
      </footer>
    </>
  );
}
