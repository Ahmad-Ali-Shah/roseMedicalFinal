import type { ReactElement } from "react";
import type { ProductSpecificationRow } from "./product-detail.data";

export function ProductSpecificationTable({
  rows
}: {
  rows: readonly ProductSpecificationRow[];
}): ReactElement {
  return (
    <section className="product-specifications" aria-labelledby="product-specifications-title">
      <p className="public-eyebrow">Technical information</p>
      <h2 id="product-specifications-title">Specifications and available options.</h2>
      <div className="product-specification-table__frame">
        <table className="product-specification-table">
          <caption>Catalogue-backed product specifications</caption>
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
