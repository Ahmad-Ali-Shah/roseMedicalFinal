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

export function AdminContentBlockEditorPreview() {
  return <PreviewFrame title="Example content block editor"><AdminFieldPreview id="example-content-title" label="Title" value="Example content block" /><Button disabled>Save draft</Button></PreviewFrame>;
}

export function AdminContentLocaleEditingPreview() {
  return <PreviewFrame title="English and Arabic editing preview"><AdminLocaleFieldPair id="example-locale" label="Example heading" englishValue="Example content block" arabicValue="Not supplied" /></PreviewFrame>;
}

export function AdminContentValidationWarningPreview() {
  return <PreviewFrame title="Content validation warning preview"><AdminAlert tone="warning" title="Example validation warning">The proposed copy exceeds its guidance. No validation engine ran.</AdminAlert></PreviewFrame>;
}

export function AdminContentSensitiveCopyWarningPreview() {
  return <PreviewFrame title="Sensitive-copy warning preview"><AdminAlert tone="warning" title="Additional review required">Example ownership or certification wording requires qualified review.</AdminAlert></PreviewFrame>;
}

export function AdminContentSaveLoadingPreview() {
  return <PreviewFrame title="Content save-loading preview"><Button disabled>Saving example content</Button></PreviewFrame>;
}

export function AdminContentSaveFailurePreview() {
  return <PreviewFrame title="Content save-failure preview"><AdminAlert tone="danger" title="Example save failure">No content was stored.</AdminAlert></PreviewFrame>;
}

export function AdminContentSaveConfirmationPreview() {
  return <PreviewFrame title="Content save-confirmation preview"><Button disabled>Confirm example save</Button></PreviewFrame>;
}

export function AdminContentReviewConfirmationPreview() {
  return <PreviewFrame title="Submit-for-review confirmation preview"><Button disabled>Submit example block for review</Button></PreviewFrame>;
}

export function AdminContentPublicComparisonPreview() {
  return <PreviewFrame title="Public-preview comparison"><div className="admin-preview-comparison"><p>Current: Example content block</p><p>Proposed: Example content block — revised</p></div></PreviewFrame>;
}
