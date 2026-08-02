import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import { AdminAlert } from "@/features/admin-primitives";

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

export function AdminRevisionPopulatedListPreview() {
  return <PreviewFrame title="Populated revision-list preview"><ul><li>Example revision A</li><li>Example revision B</li></ul></PreviewFrame>;
}

export function AdminRevisionFieldComparisonPreview() {
  return <PreviewFrame title="Revision field-comparison preview"><div className="admin-preview-comparison"><p>Example previous value</p><p>Example proposed value</p></div></PreviewFrame>;
}

export function AdminRevisionRestoreConfirmationPreview() {
  return <PreviewFrame title="Restore-confirmation preview"><Button disabled>Restore EXAMPLE-REVISION</Button></PreviewFrame>;
}

export function AdminRevisionRestoreFailurePreview() {
  return <PreviewFrame title="Restore-failure preview"><AdminAlert tone="danger" title="Example restore failure">No revision was restored.</AdminAlert></PreviewFrame>;
}

export function AdminRevisionRestoreSuccessPreview() {
  return <PreviewFrame title="Restore-success preview"><AdminAlert tone="success" title="Example success state">A future backend-confirmed revision would appear here.</AdminAlert></PreviewFrame>;
}
