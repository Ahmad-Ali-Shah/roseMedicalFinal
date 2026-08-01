import type { ReactElement } from "react";
import { SEARCH_PREVIEW_QUERY, SEARCH_PREVIEW_RESULTS } from "./search-preview-model";
import { SearchResultPreview } from "./search-result-preview";

export function SearchResultsPreview(): ReactElement {
  return (
    <section className="search-state-preview search-results-preview" data-preview-only="true" aria-labelledby="search-results-title">
      <p className="page-eyebrow">Global search</p>
      <h2 id="search-results-title">Search results for “{SEARCH_PREVIEW_QUERY}”</h2>
      <label className="search-state-preview__field">
        <span>Search the catalogue</span>
        <input type="search" readOnly value={SEARCH_PREVIEW_QUERY} />
      </label>
      <output>{SEARCH_PREVIEW_RESULTS.length} results</output>
      <div className="search-results-preview__list">
        {SEARCH_PREVIEW_RESULTS.map((product) => (
          <SearchResultPreview key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
