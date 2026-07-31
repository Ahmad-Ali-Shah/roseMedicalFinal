import type { ReactElement } from "react";

export function FamilyDiscoveryShell({
  searchLabel,
  countLabel
}: {
  searchLabel: string;
  countLabel: string;
}): ReactElement {
  return (
    <section className="family-discovery-shell" aria-label="Catalogue discovery preview">
      <label className="family-search-preview">
        <span>{searchLabel}</span>
        <input readOnly value="Product name or code" aria-describedby="family-controls-note" />
      </label>
      <div className="family-sort-preview">
        <span>Sort</span>
        <output>Recommended</output>
        <span aria-hidden="true">⌄</span>
      </div>
      <button className="family-mobile-filter-trigger" disabled>
        Filters (0)
      </button>
      <strong className="family-mobile-result-count">{countLabel}</strong>
      <p id="family-controls-note" className="family-discovery-shell__note">
        Search, sort and filters activate in the interaction phase.
      </p>
    </section>
  );
}
