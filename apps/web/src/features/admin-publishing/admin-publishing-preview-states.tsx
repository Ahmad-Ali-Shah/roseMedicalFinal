import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import { AdminAlert, AdminStatusBadge } from "@/features/admin-primitives";

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

export function AdminPublishingPopulatedQueuePreview() {
  return <PreviewFrame title="Populated publishing queue preview"><article><h3>Example content block</h3><AdminStatusBadge tone="review">Review</AdminStatusBadge></article></PreviewFrame>;
}

export function AdminPublishingValidationFailuresPreview() {
  return <PreviewFrame title="Validation-failure queue preview"><AdminAlert tone="warning" title="Example validation warning">An example sensitive claim requires review.</AdminAlert></PreviewFrame>;
}

export function AdminPublishingReviewDetailPreview() {
  return <PreviewFrame title="Publishing review-detail preview"><p>EXAMPLE-CONTENT · proposed field comparison</p><Button disabled>Approve example</Button></PreviewFrame>;
}

export function AdminPublishingReauthenticationPreview() {
  return <PreviewFrame title="Owner re-authentication preview"><Button disabled>Re-authenticate owner</Button></PreviewFrame>;
}

export function AdminPublishingConfirmationPreview() {
  return <PreviewFrame title="Explicit publish-confirmation preview"><Button disabled>Publish example change</Button></PreviewFrame>;
}

export function AdminPublishingFailurePreview() {
  return <PreviewFrame title="Publish-failure preview"><AdminAlert tone="danger" title="Example publish failure">No public content was changed.</AdminAlert></PreviewFrame>;
}

export function AdminPublishingSuccessPreview() {
  return <PreviewFrame title="Publish-success preview"><AdminAlert tone="success" title="Example success state">A future backend-confirmed result would appear here.</AdminAlert></PreviewFrame>;
}

export function AdminPublishingRecentListPreview() {
  return <PreviewFrame title="Recently-published list preview"><ul><li>Example content block</li><li>EXAMPLE-CATALOGUE</li></ul></PreviewFrame>;
}
