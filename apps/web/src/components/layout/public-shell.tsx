import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { RouteTransition, ScrollHeaderController } from "@/features/motion";
import { PUBLIC_CONTENT_VALUES } from "@/features/public-content-registry";
import { Container } from "./container";
import {
  MobileNavigation,
  type NavigationItem
} from "./mobile-navigation";
import { PublicNavigationLink } from "./public-navigation-link";

const primaryLinks = [
  ["Products", "/products"],
  ["Catalogues", "/catalogues"],
  ["About", "/about"],
  ["Contact", "/contact"]
] as const satisfies readonly NavigationItem[];

const utilityLinks = [
  ["Search", "/search"],
  ["Inquiry (0)", "/inquiry"]
] as const satisfies readonly NavigationItem[];

const familyLinks = [
  ["Knives", "/products/knives"],
  ["Scissors", "/products/scissors"],
  ["Punches", "/products/punches"],
  ["Chisels", "/products/chisels"],
  ["Cutters", "/products/cutters"]
] as const;

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollHeaderController>
        <Container className="site-header__bar" size="wide">
          <Link className="brand" href="/" aria-label="Rosa homepage">ROSA</Link>
          <nav className="site-header__nav" aria-label="Primary navigation">
            <ul className="nav-list">
              {primaryLinks.map(([label, href]) => (
                <li key={href}>
                  <PublicNavigationLink href={href} label={label} />
                </li>
              ))}
            </ul>
          </nav>
          <div className="cluster site-header__actions">
            {utilityLinks.map(([label, href]) => (
              <PublicNavigationLink href={href} label={label} key={href} />
            ))}
            <ButtonLink href="/request-quotation" size="small">Request a quote</ButtonLink>
          </div>
          <MobileNavigation primaryLinks={primaryLinks} utilityLinks={utilityLinks} />
        </Container>
      </ScrollHeaderController>
      <main className="page-main" id="main-content">
        <RouteTransition>{children}</RouteTransition>
      </main>
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
