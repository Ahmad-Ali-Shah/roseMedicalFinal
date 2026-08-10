import { ButtonLink } from "@/components/ui";
import {
  AdminFieldPreview,
  AdminPageHeader,
  AdminSection
} from "@/features/admin-primitives";
import type { AdminCatalogueEditorModel } from "./admin-catalogue-model";

export function AdminCatalogueDetailPage({
  model
}: {
  model: AdminCatalogueEditorModel;
}) {
  const { family, document } = model;

  return (
    <div className="admin-catalogue-detail">
      <AdminPageHeader
        eyebrow="Catalogue source record"
        title={document.name}
        description="Review catalogue metadata and its public family relationship."
        actions={
          <>
            <ButtonLink href={model.publicCataloguesHref} variant="secondary">Public catalogues</ButtonLink>
            <ButtonLink href={model.publicFamilyHref} variant="quiet">Public family</ButtonLink>
          </>
        }
      />

      <AdminSection title="Document metadata">
        <div className="admin-editor-grid">
          <AdminFieldPreview id={`catalogue-${family.slug}-family`} label="Family" value={family.name} />
          <AdminFieldPreview id={`catalogue-${family.slug}-name`} label="Document name" value={document.name} />
          <AdminFieldPreview id={`catalogue-${family.slug}-source`} label="Record type" value="Family catalogue" />
        </div>
        <p>{document.description}</p>
      </AdminSection>

    </div>
  );
}
