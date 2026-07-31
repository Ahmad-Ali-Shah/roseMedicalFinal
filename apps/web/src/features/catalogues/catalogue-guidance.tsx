import type { ReactElement } from "react";
import { ButtonLink } from "@/components/ui";

export function CatalogueGuidance(): ReactElement {
  return (
    <aside className="catalogue-guidance" aria-labelledby="catalogue-guidance-title">
      <div>
        <p className="catalogue-guidance__eyebrow">From PDF to quotation</p>
        <h2 id="catalogue-guidance-title">
          Found a product code in a catalogue?
        </h2>
        <p>
          Search the code online or include it directly in a general quotation
          request.
        </p>
      </div>
      <div className="catalogue-guidance__actions">
        <ButtonLink href="/search" variant="secondary">
          Search products
        </ButtonLink>
        <ButtonLink href="/request-quotation">
          Start a quotation request
        </ButtonLink>
      </div>
    </aside>
  );
}
