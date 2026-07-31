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
  it("mounts only the truthful F3C route states", () => {
    expect(resolvePublicPageKind("catalogues")).toBe("catalogues");
    expect(resolvePublicPageKind("inquiry")).toBe("inquiry-empty");
    expect(resolvePublicPageKind("request-quotation")).toBe(
      "quotation-blocked"
    );
  });

  it("renders five catalogues and no fake PDF link", () => {
    const html = renderRoute("catalogues", "Technical catalogues");
    expect((html.match(/data-catalogue-document=/g) ?? [])).toHaveLength(5);
    expect(html).toContain("PDF not available online");
    expect(html).not.toContain("[Month Year]");
  });

  it("keeps populated inquiry products off the normal inquiry route", () => {
    const html = renderRoute("inquiry", "Instrument inquiry");
    expect(html).toContain("Your inquiry list is empty.");
    expect(html).not.toContain("18-0644");
    expect(html).not.toContain("data-preview-only");
  });

  it("keeps the quotation form and success state off the normal route", () => {
    const html = renderRoute("request-quotation", "Request a quotation");
    expect(html).toContain("Select instruments before requesting a quotation.");
    expect(html).not.toContain("<form");
    expect(html).not.toContain("Request submitted");
    expect(html).not.toContain("RM-2026");
  });
});
