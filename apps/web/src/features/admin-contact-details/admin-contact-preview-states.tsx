import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import {
  AdminAlert,
  AdminFieldPreview,
  AdminLocaleFieldPair
} from "@/features/admin-primitives";

function PreviewFrame({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section data-preview-only="true" className="admin-governance-preview">
      <p className="page-eyebrow">Demonstration preview only</p>
      <h2>{title}</h2>
      <p>No content, contact, publishing, revision or setting operation occurred in this static preview.</p>
      {children}
    </section>
  );
}

export function AdminContactEditedDraftPreview() {
  return <PreviewFrame title="Edited contact draft preview"><AdminLocaleFieldPair id="example-contact-address" label="Address" englishValue="Example address" arabicValue="Not supplied" /></PreviewFrame>;
}

export function AdminContactUnresolvedValidationPreview() {
  return <PreviewFrame title="Unresolved-value validation preview"><AdminFieldPreview id="example-contact-email" label="Email" value="" error="Example value requires confirmation." /></PreviewFrame>;
}

export function AdminContactAffectedLocationsPreview() {
  return <PreviewFrame title="Affected-location comparison preview"><ul><li>Public Contact page</li><li>Public footer contact column — not implemented</li></ul></PreviewFrame>;
}

export function AdminContactSaveLoadingPreview() {
  return <PreviewFrame title="Contact save-loading preview"><Button disabled>Saving example contact details</Button></PreviewFrame>;
}

export function AdminContactSaveFailurePreview() {
  return <PreviewFrame title="Contact save-failure preview"><AdminAlert tone="danger" title="Example save failure">No contact value was stored.</AdminAlert></PreviewFrame>;
}

export function AdminContactReviewConfirmationPreview() {
  return <PreviewFrame title="Contact review-confirmation preview"><Button disabled>Submit example contact details</Button></PreviewFrame>;
}

export function AdminContactPublicationConfirmationPreview() {
  return <PreviewFrame title="Contact publication-confirmation preview"><Button disabled>Publish example contact details</Button></PreviewFrame>;
}
