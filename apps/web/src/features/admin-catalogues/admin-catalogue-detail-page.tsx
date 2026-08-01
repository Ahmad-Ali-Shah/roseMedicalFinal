import { Button, ButtonLink } from "@/components/ui";
import {
  AdminAlert,
  AdminFieldPreview,
  AdminPageHeader,
  AdminSection,
  AdminStatusBadge
} from "@/features/admin-primitives";
import type { AdminCatalogueEditorModel } from "./admin-catalogue-model";

export function AdminCatalogueDetailPage({
  model
}: {
  model: AdminCatalogueEditorModel;
}) {
  const { family, document } = model;
  const hasPdf = Boolean(document.pdfPath);

  return (
    <div className="admin-catalogue-detail">
      <AdminPageHeader
        eyebrow="Catalogue source record"
        title={document.name}
        description="Read-only technical document metadata derived from the current catalogue registry."
        actions={
          <>
            <AdminStatusBadge tone={hasPdf ? "neutral" : "warning"}>{model.availability}</AdminStatusBadge>
            <ButtonLink href={model.publicCataloguesHref} variant="secondary">Public catalogues</ButtonLink>
            <ButtonLink href={model.publicFamilyHref} variant="quiet">Public family</ButtonLink>
          </>
        }
      />

      <AdminAlert tone="warning" title="Static file-management composition">
        No upload or replacement operation is active in this static composition.
      </AdminAlert>

      <AdminSection title="Document metadata">
        <div className="admin-editor-grid">
          <AdminFieldPreview id={`catalogue-${family.slug}-family`} label="Family" value={family.name} />
          <AdminFieldPreview id={`catalogue-${family.slug}-name`} label="Document name" value={document.name} />
          <AdminFieldPreview id={`catalogue-${family.slug}-source`} label="Source classification" value={document.sourceStatus} />
          <AdminFieldPreview id={`catalogue-${family.slug}-cover`} label="Cover requirement" value={document.coverLabel} />
        </div>
        <p>{document.description}</p>
      </AdminSection>

      <AdminSection title="Cover requirement">
        <div className="admin-catalogue-cover-requirement" role="img" aria-label={document.coverLabel}>
          <span>{document.sequence}</span>
          <strong>{document.coverLabel}</strong>
          <p>No managed cover asset is registered.</p>
        </div>
      </AdminSection>

      <AdminSection title="PDF availability">
        <div className="admin-file-management-panel">
          <AdminStatusBadge tone={hasPdf ? "neutral" : "warning"}>{model.availability}</AdminStatusBadge>
          <p>{hasPdf ? "A public PDF path is registered." : "No public PDF path is registered."}</p>
          <p>No upload or replacement operation is active in this static composition.</p>
          <p>Future safe replacement must retain the last verified public file until a replacement succeeds.</p>
          <div className="admin-management-actions">
            <Button disabled>Upload catalogue</Button>
            <Button variant="secondary" disabled>Replace catalogue</Button>
            <Button variant="quiet" disabled>Remove catalogue</Button>
            <Button variant="secondary" disabled>Publish catalogue</Button>
            <Button variant="secondary" disabled>Begin safe replacement</Button>
          </div>
        </div>
      </AdminSection>
    </div>
  );
}
