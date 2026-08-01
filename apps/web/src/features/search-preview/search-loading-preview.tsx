import type { ReactElement } from "react";

export function SearchLoadingPreview(): ReactElement {
  return (
    <section className="search-state-preview search-loading-preview" data-preview-only="true" aria-labelledby="search-loading-title">
      <p className="page-eyebrow">Global search</p>
      <h2 id="search-loading-title">Search loading preview</h2>
      <div className="search-loading-preview__rows" aria-hidden="true">
        {[1, 2, 3].map((row) => (
          <div key={row} className="search-loading-preview__row">
            <span />
            <span />
          </div>
        ))}
      </div>
    </section>
  );
}
