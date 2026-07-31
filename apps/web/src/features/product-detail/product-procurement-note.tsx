import type { ReactElement } from "react";

export function ProductProcurementNote(): ReactElement {
  return (
    <aside className="product-procurement-note" aria-labelledby="product-note-title">
      <div>
        <p className="public-eyebrow">Procurement note</p>
        <h2 id="product-note-title">Need another size, finish or packing configuration?</h2>
        <p>Add the closest listed option during the interaction phase, then describe the requirement in the line note.</p>
      </div>
      <button className="button button--secondary button--standard" disabled>
        Add with note — available next phase
      </button>
    </aside>
  );
}
