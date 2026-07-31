import type { ReactElement } from "react";

export function FamilyNoResultsState(): ReactElement {
  return (
    <div className="family-no-results-state" aria-label="No-results preview">
      <p className="public-eyebrow">No matching products</p>
      <h2>No instruments match these filters.</h2>
      <p>Clear the active filters or search by a product code from the catalogue.</p>
      <button className="button button--primary button--standard" disabled>
        Clear filters — available next phase
      </button>
    </div>
  );
}
