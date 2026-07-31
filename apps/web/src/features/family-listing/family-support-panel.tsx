import type { ReactElement } from "react";
import { ProcurementPanel } from "@/features/public-catalogue";

export function FamilySupportPanel(): ReactElement {
  return (
    <ProcurementPanel
      eyebrow="Procurement support"
      title="Need help identifying an instrument?"
      copy="Send a general request with the catalogue reference or a concise description."
      primary={{ label: "Request support", href: "/contact" }}
      tone="dark"
    />
  );
}
