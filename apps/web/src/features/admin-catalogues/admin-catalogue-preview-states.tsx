import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import { AdminAlert } from "@/features/admin-primitives";

function CataloguePreview({
  title,
  children,
  actions
}: {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="admin-operational-preview" data-preview-only="true">
      <h2>{title}</h2>
      <AdminAlert tone="warning" title="Preview-only state">{children}</AdminAlert>
      <p>No upload or replacement occurred in this static preview.</p>
      {actions ? <div className="admin-management-actions">{actions}</div> : null}
    </section>
  );
}

export function AdminCatalogueUploadSelectionPreview() {
  return <CataloguePreview title="Catalogue upload-selection preview">A future owner may select a replacement file after authentication and validation exist.</CataloguePreview>;
}

export function AdminCatalogueProcessingPreview() {
  return <CataloguePreview title="Catalogue processing preview">A future upload pipeline may expose processing progress without replacing the current verified public file.</CataloguePreview>;
}

export function AdminCatalogueReplacementPendingPreview() {
  return <CataloguePreview title="Catalogue replacement-pending preview">A future replacement may remain pending while the current verified public file stays available.</CataloguePreview>;
}

export function AdminCatalogueReplacementFailurePreview() {
  return <CataloguePreview title="Catalogue replacement-failure preview">A future failed replacement must leave the current public file unchanged.</CataloguePreview>;
}

export function AdminCatalogueSafeReplacementPreview() {
  return (
    <CataloguePreview
      title="Safe-replacement confirmation preview"
      actions={
        <>
          <Button variant="secondary" disabled>Cancel</Button>
          <Button disabled>Begin safe replacement</Button>
        </>
      }
    >
      A future confirmation must explain that the existing verified file remains public until replacement succeeds.
    </CataloguePreview>
  );
}
