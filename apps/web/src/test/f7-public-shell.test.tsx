import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PublicShell } from "@/components/layout/public-shell";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("F7 premium public shell", () => {
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
    expect(html).toContain('aria-label="Primary navigation"');
    expect(html).toContain('aria-label="Footer navigation"');
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
});
