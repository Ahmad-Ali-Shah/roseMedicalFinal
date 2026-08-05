# Shared Layouts

## RootLayout

- Source: `apps/web/src/app/layout.tsx`
- Renders: Loads Inter/Lora, global styles, skip link, and MotionProvider.

```tsx
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { MotionProvider } from "@/features/motion";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });

export const metadata: Metadata = {
  title: { default: "ROSA", template: "%s | ROSA" },
  description: "Medical instruments supplier and procurement partner."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`} data-scroll-behavior="smooth">
      <body>
        <MotionProvider>
          <a className="skip-link" href="#main-content">Skip to content</a>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}

```

## PublicLayout

- Source: `apps/web/src/app/(public)/layout.tsx`
- Renders: Wraps every public route with PublicShell.

```tsx
import { PublicShell } from "@/components/layout/public-shell";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <PublicShell>{children}</PublicShell>;
}

```

## PublicShell

- Source: `apps/web/src/components/layout/public-shell.tsx`
- Renders: Global public header, navigation, route-transition main region, and footer.

```tsx
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { RouteTransition, ScrollHeaderController } from "@/features/motion";
import { PUBLIC_CONTENT_VALUES } from "@/features/public-content-registry";
import { Container } from "./container";
import {
  MobileNavigation,
  type NavigationItem
} from "./mobile-navigation";

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
                  <Link className="nav-link" href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="cluster site-header__actions">
            {utilityLinks.map(([label, href]) => (
              <Link className="nav-link" href={href} key={href}>{label}</Link>
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
          <span>Â© ROSA. Replace legal and company details after verification.</span>
          <span>English first Â· Arabic-ready structure</span>
        </Container>
      </footer>
    </>
  );
}

```

## MobileNavigation

- Source: `apps/web/src/components/layout/mobile-navigation.tsx`
- Renders: Accessible animated mobile navigation curtain.

```tsx
"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ReactElement
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/button";
import { MOTION_DURATION, MOTION_EASING } from "@/features/motion";

export type NavigationItem = readonly [label: string, href: Route<string>];

interface MobileNavigationProps {
  primaryLinks: readonly NavigationItem[];
  utilityLinks: readonly NavigationItem[];
}

export function MobileNavigation({
  primaryLinks,
  utilityLinks
}: MobileNavigationProps): ReactElement {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() === true;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const close = () => setOpenPath(null);

  return (
    <div className="mobile-navigation">
      <button
        ref={triggerRef}
        type="button"
        className="mobile-navigation__trigger"
        aria-expanded={open}
        aria-controls="rosa-mobile-navigation"
        onClick={() => setOpenPath(open ? null : pathname)}
      >
        <span>Menu</span>
        <span className="mobile-navigation__trigger-lines" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              className="mobile-navigation__backdrop"
              aria-label="Close menu"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              ref={panelRef}
              id="rosa-mobile-navigation"
              className="mobile-navigation__panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={reduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: MOTION_DURATION.section,
                ease: MOTION_EASING.emphasized
              }}
            >
              <div className="mobile-navigation__panel-header">
                <Link className="brand" href="/" onClick={close}>ROSA</Link>
                <button type="button" className="mobile-navigation__close" onClick={close}>
                  Close
                </button>
              </div>
              <nav aria-label="Mobile navigation">
                <ul className="mobile-navigation__links">
                  {[...primaryLinks, ...utilityLinks].map(([label, href], index) => (
                    <motion.li
                      key={href}
                      initial={reduceMotion ? false : { opacity: 1, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: reduceMotion ? 0 : 0.08 + index * 0.045,
                        duration: MOTION_DURATION.component,
                        ease: MOTION_EASING.standard
                      }}
                    >
                      <Link href={href} onClick={close}>{label}</Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <ButtonLink href="/request-quotation" onClick={close}>
                Request a quote
              </ButtonLink>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

```

## Container

- Source: `apps/web/src/components/layout/container.tsx`
- Renders: Width-constrained horizontal layout primitive.

```tsx
import type { HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "wide" | "standard" | "reading";
}

export function Container({ size = "standard", className = "", ...props }: ContainerProps) {
  return <div className={`container container--${size} ${className}`.trim()} {...props} />;
}

```

## Section

- Source: `apps/web/src/components/layout/section.tsx`
- Renders: Vertical public-section wrapper.

```tsx
import type { HTMLAttributes } from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: "warm" | "paper" | "mist" | "dark";
  spacing?: "standard" | "compact";
}

export function Section({ tone = "warm", spacing = "standard", className = "", ...props }: SectionProps) {
  const spacingClass = spacing === "compact" ? "section--compact" : "";
  return <section className={`section section--${tone} ${spacingClass} ${className}`.trim()} {...props} />;
}

```

## Stack

- Source: `apps/web/src/components/layout/stack.tsx`
- Renders: Vertical rhythm primitive.

```tsx
import type { CSSProperties, HTMLAttributes } from "react";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: string;
}

export function Stack({ gap, style, className = "", ...props }: StackProps) {
  const nextStyle = gap ? ({ ...style, "--stack-gap": gap } as CSSProperties) : style;
  return <div className={`stack ${className}`.trim()} style={nextStyle} {...props} />;
}

```

## Grid

- Source: `apps/web/src/components/layout/grid.tsx`
- Renders: Responsive grid primitive.

```tsx
import type { CSSProperties, HTMLAttributes } from "react";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
  gap?: string;
}

export function Grid({ columns = 2, gap, style, className = "", ...props }: GridProps) {
  const nextStyle = gap ? ({ ...style, "--grid-gap": gap } as CSSProperties) : style;
  return <div className={`layout-grid layout-grid--${columns} ${className}`.trim()} style={nextStyle} {...props} />;
}

```

## AdminShell

- Source: `apps/web/src/components/layout/admin-shell.tsx`
- Renders: Shared owner-workspace shell.

```tsx
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
        <main className="admin-content" id="main-content">{children}</main>
      </div>
    </div>
  );
}

```

## RoutePlaceholder

- Source: `apps/web/src/components/layout/route-placeholder.tsx`
- Renders: Fallback route presentation.

```tsx
import { ButtonLink, Card, Status } from "@/components/ui";
import { Container, Grid, Section, Stack } from "@/components/layout";

export interface RoutePlaceholderProps {
  eyebrow: string;
  title: string;
  path: string;
  note?: string;
}

export function RoutePlaceholder({ eyebrow, title, path, note = "This route now uses the shared Rosa layout and design foundations. Detailed Figma composition arrives in the next static-page layer." }: RoutePlaceholderProps) {
  const isAdmin = path.startsWith("/admin");
  return (
    <Section className="route-placeholder" tone="warm" aria-labelledby="route-title">
      <Container size="wide">
        <Stack gap="2rem">
          <div>
            <p className="route-eyebrow">{eyebrow}</p>
            <h1 className="route-title" id="route-title">{title}</h1>
            <p className="route-path"><code>{path}</code></p>
          </div>
          <Grid columns={2}>
            <div className="placeholder-panel" aria-label="Reserved Figma composition area">{note}</div>
            <Stack>
              <Card>
                <Stack>
                  <Status tone={isAdmin ? "review" : "neutral"}>{isAdmin ? "Admin foundation" : "Public foundation"}</Status>
                  <h2>Stable structure before page detail.</h2>
                  <p>Containers, section rhythm, responsive grids, controls, surfaces, focus states, navigation and footer behavior are now shared across routes.</p>
                </Stack>
              </Card>
              <Card tone="mist">
                <Stack>
                  <p className="route-eyebrow">Next layer</p>
                  <p>Static Figma sections and neutral media placeholders will replace this foundation preview route by route.</p>
                  <div className="cluster">
                    <ButtonLink href={isAdmin ? "/admin" : "/products"}>Continue</ButtonLink>
                    {!isAdmin && <ButtonLink href="/request-quotation" variant="secondary">Request a quote</ButtonLink>}
                  </div>
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Stack>
      </Container>
    </Section>
  );
}

```

## Layout exports

- Source: `apps/web/src/components/layout/index.ts`
- Renders: Public exports for shared layouts.

```tsx
export * from "./container";
export * from "./grid";
export * from "./section";
export * from "./stack";

```
