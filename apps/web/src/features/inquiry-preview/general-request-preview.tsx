import type { ReactElement } from "react";
import { Button } from "@/components/ui";

export function GeneralRequestPreview(): ReactElement {
  return (
    <aside className="general-request-preview" aria-labelledby="general-request-title">
      <div>
        <p className="general-request-preview__eyebrow">
          General procurement request
        </p>
        <h2 id="general-request-title">
          Cannot find a product in the catalogue?
        </h2>
        <p>
          Additional product codes and requirements can be added once inquiry
          notes are activated.
        </p>
      </div>
      <Button variant="secondary" disabled>
        Add general note
      </Button>
    </aside>
  );
}
