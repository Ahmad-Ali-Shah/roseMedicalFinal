import type { ReactElement } from "react";
import { SEARCH_PREVIEW_QUERY, SEARCH_PREVIEW_RESULTS } from "./search-preview-model";
import { SearchResultPreview } from "./search-result-preview";

export function SearchMobileResultsPreview(): ReactElement {
  return (
    <section
      className="search-state-preview search-mobile-results-preview"
      data-preview-only="true"
      data-mobile-search-preview="true"
      aria-labelledby="search-mobile-results-title"
    >
      <p className="page-eyebrow">Search</p>
      <h2 id="search-mobile-results-title">Mobile results preview</h2>
      <label className="search-state-preview__field">
        <span>Search the catalogue</span>
        <input type="search" readOnly value={SEARCH_PREVIEW_QUERY} />
      </label>
      <output>{SEARCH_PREVIEW_RESULTS.length} results</output>
      <div className="search-mobile-results-preview__list">
        {SEARCH_PREVIEW_RESULTS.map((product) => (
          <SearchResultPreview key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
