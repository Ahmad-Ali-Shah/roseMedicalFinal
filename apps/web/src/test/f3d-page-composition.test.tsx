import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { resolvePublicPage } from "@/features/public-routing/resolve-public-page";

describe("F3D public page composition", () => {
  it.each([
    ["about", "A clearer way to source medical instruments."],
    ["procurement-support", "Prepare a clearer instrument request."],
    ["contact", "Send a general business message."],
    ["search", "Find an instrument."],
    ["privacy", "Privacy Policy"],
    ["terms", "Terms of Website Use"]
  ] as const)("renders %s with one heading", (key, heading) => {
    const html = renderToStaticMarkup(
      resolvePublicPage({ key, path: `/${key}`, title: heading })
    );

    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect(html).toContain(heading);
    expect(html).not.toContain("Route scaffold");
  });

  it("keeps normal contact and search routes separate from preview-only states", () => {
    const contact = renderToStaticMarkup(
      resolvePublicPage({ key: "contact", path: "/contact", title: "Contact" })
    );
    const search = renderToStaticMarkup(
      resolvePublicPage({ key: "search", path: "/search", title: "Search" })
    );

    expect(contact).not.toContain("data-preview-only");
    expect(contact).not.toContain("Message received");
    expect(search).not.toContain("data-search-result");
    expect(search).not.toContain("data-preview-only");
  });
});
