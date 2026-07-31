import type { ReactElement } from "react";

const FILTERS = [
  ["Size", "All sizes"],
  ["Direction", "All directions"],
  ["Variant", "All variants"],
  ["Catalogue section", "All sections"]
] as const;

export function FamilyFilterPreview(): ReactElement {
  return (
    <aside className="family-filter-preview" aria-label="Product filter preview">
      <p className="public-eyebrow">Filter products</p>
      <dl>
        {FILTERS.map(([label, value]) => (
          <div className="family-filter-preview__row" key={label}>
            <dt>{label}</dt>
            <dd><output>{value}</output><span aria-hidden="true">⌄</span></dd>
          </div>
        ))}
      </dl>
      <button className="disabled-text-action" disabled>Clear filters — available next phase</button>
    </aside>
  );
}
