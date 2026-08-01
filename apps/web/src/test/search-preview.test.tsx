import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  SEARCH_PREVIEW_RESULTS,
  SearchDefaultPage,
  SearchErrorPreview,
  SearchLoadingPreview,
  SearchMobileResultsPreview,
  SearchNoResultsPreview,
  SearchResultsPreview,
  SearchTypingPreview
} from "@/features/search-preview";

describe("F3D search default and preview data", () => {
  it("resolves the approved preview products from the catalogue registry", () => {
    expect(SEARCH_PREVIEW_RESULTS.map((product) => product.code)).toEqual([
      "18-0644",
      "18-0650"
    ]);
  });

  it("renders discovery only on the normal search page", () => {
    const html = renderToStaticMarkup(<SearchDefaultPage />);

    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect((html.match(/data-search-family-shortcut=/g) ?? [])).toHaveLength(5);
    expect(html).toContain("readonly");
    expect(html).not.toContain("18-0644");
    expect(html).not.toContain("2 results");
    expect(html).not.toContain("Search could not be completed");
  });

  it("renders source-backed desktop and mobile search results", () => {
    const desktop = renderToStaticMarkup(<SearchResultsPreview />);
    const mobile = renderToStaticMarkup(<SearchMobileResultsPreview />);

    expect((desktop.match(/data-search-result=/g) ?? [])).toHaveLength(2);
    expect((mobile.match(/data-search-result=/g) ?? [])).toHaveLength(2);
    expect(desktop).toContain('href="/products/knives/scalpel-handle-no-3"');
    expect(desktop).toContain('href="/products/knives/bard-parker-handle"');
    expect(desktop).toContain("18-0644");
    expect(desktop).toContain("18-0650");
    expect(desktop).toContain("disabled");
    expect(mobile).toContain("data-mobile-search-preview");
  });

  it("marks every non-default state as preview-only", () => {
    const html = renderToStaticMarkup(
      <>
        <SearchTypingPreview />
        <SearchLoadingPreview />
        <SearchNoResultsPreview />
        <SearchErrorPreview />
      </>
    );

    expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(4);
    expect(html).not.toContain("onChange");
  });
});
