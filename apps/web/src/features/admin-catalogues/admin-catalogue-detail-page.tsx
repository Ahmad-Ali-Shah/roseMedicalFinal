import { Button, ButtonLink } from "@/components/ui";
import {
  AdminAlert,
  AdminFieldPreview,
  AdminPageHeader,
  AdminSection,
  AdminStatusBadge
} from "@/features/admin-primitives";
import type { AdminCatalogueEditorModel } from "./admin-catalogue-model";

import { uploadCataloguePdf } from "./actions";

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
        description="Technical document metadata and PDF asset management."
        actions={
          <>
            <AdminStatusBadge tone={hasPdf ? "neutral" : "warning"}>{model.availability}</AdminStatusBadge>
            <ButtonLink href={model.publicCataloguesHref} variant="secondary">Public catalogues</ButtonLink>
            <ButtonLink href={model.publicFamilyHref} variant="quiet">Public family</ButtonLink>
          </>
        }
      />

      <AdminAlert tone={hasPdf ? "info" : "warning"} title={hasPdf ? "Live Catalogue Asset Connected" : "Catalogue PDF Upload Required"}>
        {hasPdf ? "Public PDF is available and downloadable." : "Upload a PDF file to link it with this catalogue."}
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

      <AdminSection title="PDF availability & Upload">
        <div className="admin-file-management-panel">
          <AdminStatusBadge tone={hasPdf ? "neutral" : "warning"}>{model.availability}</AdminStatusBadge>
          <p>{hasPdf ? "A public PDF path is registered." : "No public PDF path is registered."}</p>

          <form action={uploadCataloguePdf} style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input type="hidden" name="slug" value={family.slug} />
            <input type="file" name="file" accept="application/pdf" required style={{ color: "white" }} />
            <div className="admin-management-actions">
              <Button type="submit">Upload / Replace catalogue PDF</Button>
            </div>
          </form>
        </div>
      </AdminSection>
    </div>
  );
}
