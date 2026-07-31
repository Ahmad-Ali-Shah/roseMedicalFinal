import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FamilyFilterPreview } from "@/features/family-listing/family-filter-preview";
import { FamilyLoadingState } from "@/features/family-listing/family-loading-state";
import { FamilyNoResultsState } from "@/features/family-listing/family-no-results-state";

describe("F3B family control previews", () => {
  it("renders native output and disabled semantics without a form", () => {
    const html = renderToStaticMarkup(
      <><FamilyFilterPreview /><FamilyNoResultsState /></>
    );
    expect(html).toContain("<output");
    expect(html).toContain("disabled");
    expect(html).not.toContain("<form");
  });

  it("exposes reusable loading and no-results state labels", () => {
    const html = renderToStaticMarkup(
      <><FamilyLoadingState /><FamilyNoResultsState /></>
    );
    expect(html).toContain("Catalogue loading-state preview");
    expect(html).toContain("No-results preview");
  });
});
