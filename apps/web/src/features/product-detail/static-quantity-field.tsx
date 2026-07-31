import type { ReactElement } from "react";

export function StaticQuantityField({ value }: { value: number }): ReactElement {
  return (
    <div className="static-quantity-field" aria-label="Quantity preview">
      <span className="static-quantity-field__label">Quantity</span>
      <div className="static-quantity-field__controls">
        <button disabled aria-label="Decrease quantity activates in the interaction phase">−</button>
        <output aria-label="Selected quantity">{value}</output>
        <button disabled aria-label="Increase quantity activates in the interaction phase">+</button>
      </div>
    </div>
  );
}
