import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

let pathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname
}));

import { PublicShell } from "@/components/layout/public-shell";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("F7 premium public shell", () => {
  beforeEach(() => {
    pathname = "/";
  });

  it("preserves one stable header, main and footer", () => {
    const html = renderToStaticMarkup(
      <PublicShell><p>Public page content</p></PublicShell>
    );

    expect((html.match(/<header/g) ?? [])).toHaveLength(1);
    expect((html.match(/<main/g) ?? [])).toHaveLength(1);
    expect((html.match(/<footer/g) ?? [])).toHaveLength(1);
    expect(html).toContain("Public page content");
    expect(html).toContain('data-scroll-header="true"');
    expect(html).toContain('data-motion="route-transition"');
  });

  it("uses an accessible button-driven mobile curtain", () => {
    const html = renderToStaticMarkup(
      <PublicShell><p>Content</p></PublicShell>
    );

    expect(html).not.toContain("<details");
    expect(html).not.toContain("<summary");
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('aria-controls="rosa-mobile-navigation"');
    expect(html).toContain("Menu");
  });

  it("preserves all approved navigation and quotation actions", () => {
    const html = renderToStaticMarkup(
      <PublicShell><p>Content</p></PublicShell>
    );

    for (const label of [
      "Products",
      "Catalogues",
      "About",
      "Contact",
      "Search",
      "Inquiry",
      "Request a quote"
    ]) {
      expect(html).toContain(label);
    }
    expect(html).toContain('aria-label="Primary navigation / التنقل الرئيسي"');
    expect(html).toContain('aria-label="Footer navigation / روابط التذييل"');
  });

  it("implements Escape close, focus return and route-close behavior", () => {
    const mobile = source("src/components/layout/mobile-navigation.tsx");
    expect(mobile).toContain('event.key === "Escape"');
    expect(mobile).toContain("triggerRef.current?.focus()");
    expect(mobile).toContain("usePathname()");
    expect(mobile).toContain("document.body.style.overflow");
  });

  it("keeps button labels stable inside polish spans", () => {
    const button = source("src/components/ui/button.tsx");
    expect(button).toContain('className="button__label"');
    const html = renderToStaticMarkup(
      <PublicShell><p>Content</p></PublicShell>
    );
    expect(html).toContain("Request a quote");
  });

  it("marks one parent navigation link for nested public routes", () => {
    pathname = "/products/knives";
    const html = renderToStaticMarkup(
      <PublicShell><p>Knives catalogue</p></PublicShell>
    );

    expect((html.match(/aria-current="page"/g) ?? [])).toHaveLength(1);
    expect(html).toMatch(/<a class="nav-link" aria-current="page"[^>]*href="\/products"/);
  });

  it("keeps the homepage header readable before the first scroll without changing height", () => {
    const styles = source("src/styles/f7-premium-polish.css");

    expect(styles).not.toMatch(
      /body:has\(\.public-page--home\) \.site-header\[data-scrolled="false"\][^{]*\{[^}]*background:\s*transparent/s
    );
    expect(styles).not.toMatch(
      /\.site-header\[data-scrolled="true"\] \.site-header__bar\s*\{[^}]*min-height/s
    );
  });

  it("keeps the root error boundary independent of router work-store context", () => {
    const errorBoundary = source("src/app/error.tsx");
    const rootLayout = source("src/app/layout.tsx");

    expect(errorBoundary).not.toContain('from "next/navigation"');
    expect(errorBoundary).not.toContain("LocaleLink");
    expect(errorBoundary).toContain("window.location.pathname");
    expect(errorBoundary).toContain('href={ar ? "/ar" : "/"}');
    expect(rootLayout).not.toContain("LocalizedText");
    expect(rootLayout).toContain('className="skip-link__label skip-link__label--ar"');
  });

  it("provides a standalone global error boundary for root-layout failures", () => {
    const path = join(process.cwd(), "src/app/global-error.tsx");
    expect(existsSync(path)).toBe(true);

    const globalError = readFileSync(path, "utf8");
    expect(globalError).not.toContain('from "next/navigation"');
    expect(globalError).toContain("<html");
    expect(globalError).toContain("<body>");
    expect(globalError).toContain("unstable_retry");
  });
});
