import type { ReactElement } from "react";
import { Button, ButtonLink } from "@/components/ui";

export function SearchNoResultsPreview(): ReactElement {
  return (
    <section className="search-state-preview search-no-results-preview" data-preview-only="true" aria-labelledby="search-no-results-title">
      <p className="page-eyebrow">Global search</p>
      <h2 id="search-no-results-title">No instruments matched “thoracic clamp”.</h2>
      <p>Try a product code, a broader family name, or browse all listed products.</p>
      <div className="f3d-action-row">
        <Button disabled>Clear Search</Button>
        <ButtonLink href="/products" variant="secondary">Browse all products</ButtonLink>
      </div>
    </section>
  );
}
