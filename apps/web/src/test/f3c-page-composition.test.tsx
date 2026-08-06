import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  resolvePublicPage,
  resolvePublicPageKind
} from "@/features/public-routing/resolve-public-page";

function renderRoute(key: string, title: string) {
  return renderToStaticMarkup(
    resolvePublicPage({ key, path: `/${key}`, title })
  );
}

describe("F3C public compositions", () => {
  it("preserves the established route-kind inventory", () => {
    expect(resolvePublicPageKind("catalogues")).toBe("catalogues");
    expect(resolvePublicPageKind("inquiry")).toBe("inquiry-empty");
    expect(resolvePublicPageKind("request-quotation")).toBe(
      "quotation-blocked"
    );
  });

  it("renders five catalogues with owner-supplied PDF downloads", () => {
    const html = renderRoute("catalogues", "Technical catalogues");
    expect((html.match(/data-catalogue-document=/g) ?? [])).toHaveLength(5);
    expect((html.match(/download="rosa-/g) ?? [])).toHaveLength(5);
    expect(html).not.toContain("PDF not available online");
    expect(html).not.toContain("[Month Year]");
  });

  it("renders a hydration-safe live inquiry shell", () => {
    const html = renderRoute("inquiry", "Instrument inquiry");
    expect(html).toContain("Loading inquiry");
    expect(html).not.toContain("18-0644");
    expect(html).not.toContain("data-preview-only");
  });

  it("renders a hydration-safe live quotation shell", () => {
    const html = renderRoute("request-quotation", "Request a quotation");
    expect(html).toContain("Loading quotation request");
    expect(html).not.toContain("Request submitted");
    expect(html).not.toContain("RM-2026");
    expect(html).not.toContain("data-preview-only");
  });
});
