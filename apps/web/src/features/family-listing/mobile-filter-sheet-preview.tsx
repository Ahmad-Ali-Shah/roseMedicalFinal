import type { ReactElement } from "react";
import { FamilyFilterPreview } from "./family-filter-preview";

export function MobileFilterSheetPreview(): ReactElement {
  return (
    <aside className="mobile-filter-sheet-preview" aria-label="Filter preview">
      <header>
        <p className="public-eyebrow">Catalogue filters</p>
        <h2>Refine the product list.</h2>
      </header>
      <FamilyFilterPreview />
      <button className="button button--primary button--standard" disabled>
        Apply filters — available next phase
      </button>
    </aside>
  );
}
