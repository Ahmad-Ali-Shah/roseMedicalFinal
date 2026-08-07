import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SearchPage } from "@/features/search";
import {
  SEARCH_PREVIEW_RESULTS,
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
    const html = renderToStaticMarkup(
      <SearchPage products={SEARCH_PREVIEW_RESULTS} />
    );
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
    expect((html.match(/data-search-family-shortcut=/g) ?? [])).toHaveLength(5);
    expect((html.match(/data-motion="reveal"/g) ?? [])).toHaveLength(1);
    expect((html.match(/data-motion="stagger"/g) ?? [])).toHaveLength(1);
    expect((html.match(/data-motion="stagger-item"/g) ?? [])).toHaveLength(5);
    expect(html).toContain('name="q"');
    expect(html).toContain('type="submit"');
    expect(html).not.toContain('readOnly=""');
    expect(html).not.toContain("18-0644");
    expect(html).not.toContain("2 results");
    expect(html).not.toContain("Search could not be completed");
  });

  it("searches only the catalogue supplied by the server boundary", () => {
    const html = renderToStaticMarkup(
      <SearchPage products={[SEARCH_PREVIEW_RESULTS[1]!]} initialQuery="bard" />
    );

    expect((html.match(/data-search-result=/g) ?? [])).toHaveLength(1);
    expect(html).toContain("18-0650");
    expect(html).not.toContain("18-0644");
  });

  it("renders source-backed desktop and mobile search results", () => {
    const desktop = renderToStaticMarkup(<SearchResultsPreview />);
    const mobile = renderToStaticMarkup(<SearchMobileResultsPreview />);
    const expectedMedia =
      SEARCH_PREVIEW_RESULTS[0]?.mediaFallbackPath ??
      SEARCH_PREVIEW_RESULTS[0]?.mediaPath;

    expect((desktop.match(/data-search-result=/g) ?? [])).toHaveLength(2);
    expect((mobile.match(/data-search-result=/g) ?? [])).toHaveLength(2);
    expect(desktop).toContain('href="/products/knives/scalpel-handle-no-3"');
    expect(desktop).toContain('href="/products/knives/bard-parker-handle"');
    expect(desktop).toContain("18-0644");
    expect(desktop).toContain("18-0650");
    expect(desktop).toContain("Add to inquiry");
    expect(desktop).not.toContain("disabled");
    expect(expectedMedia).toBeTruthy();
    expect(desktop).toContain(expectedMedia!);
    expect(mobile).toContain(expectedMedia!);
    expect(mobile).toContain("data-mobile-search-preview");
  });

  it("marks every non-default state as preview-only", () => {
    const html = renderToStaticMarkup(<><SearchTypingPreview /><SearchLoadingPreview /><SearchNoResultsPreview /><SearchErrorPreview /></>);
    expect((html.match(/data-preview-only=/g) ?? [])).toHaveLength(4);
    expect(html).not.toContain("onChange");
  });
});
