import type { ReactElement } from "react";
import { Button } from "@/components/ui";

export function SearchErrorPreview(): ReactElement {
  return (
    <section className="search-state-preview search-error-preview" data-preview-only="true" aria-labelledby="search-error-title">
      <p className="page-eyebrow">Global search</p>
      <h2 id="search-error-title">Search could not be completed in this preview.</h2>
      <p>No real network attempt is represented. A later interactive state can preserve the query and allow retry.</p>
      <Button disabled>Try Again</Button>
    </section>
  );
}
