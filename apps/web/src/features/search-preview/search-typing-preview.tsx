import type { ReactElement } from "react";
import { SEARCH_PREVIEW_QUERY, SEARCH_PREVIEW_RESULTS } from "./search-preview-model";

export function SearchTypingPreview(): ReactElement {
  return (
    <section className="search-state-preview" data-preview-only="true" aria-labelledby="search-typing-title">
      <p className="page-eyebrow">Global search</p>
      <h2 id="search-typing-title">Search preview for “{SEARCH_PREVIEW_QUERY}”</h2>
      <label className="search-state-preview__field">
        <span>Search the catalogue</span>
        <input type="search" readOnly value={SEARCH_PREVIEW_QUERY} />
      </label>
      <p>This static example shows the source-backed identities that a future search interaction may return.</p>
      <ul className="search-typing-preview__identities">
        {SEARCH_PREVIEW_RESULTS.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <span>{product.familySlug} · Code {product.code}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
