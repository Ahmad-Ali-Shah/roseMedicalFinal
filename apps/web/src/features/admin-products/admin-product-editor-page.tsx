import { Button, ButtonLink } from "@/components/ui";
import {
  AdminAlert,
  AdminFieldPreview,
  AdminFormSection,
  AdminLocaleFieldPair,
  AdminPageHeader,
  AdminSection,
  AdminStatusBadge,
  AdminTextareaPreview
} from "@/features/admin-primitives";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";
import type { AdminProductEditorModel } from "./admin-product-model";
import { AdminProductCompleteness } from "./admin-product-completeness";
import { AdminProductOptions } from "./admin-product-options";

export function AdminProductEditorPage({
  model
}: {
  model: AdminProductEditorModel;
}) {
  const { family, product } = model;

  return (
    <div className="admin-product-editor">
      <AdminPageHeader
        eyebrow="Product source record"
        title={product.name}
        description="Read-only catalogue data derived from the current frontend registry."
        actions={
          <>
            <AdminStatusBadge tone="neutral">Source record</AdminStatusBadge>
            <ButtonLink href={model.publicHref} variant="secondary">View public product</ButtonLink>
            <ButtonLink href={model.publicFamilyHref} variant="quiet">View public family</ButtonLink>
          </>
        }
      />

      <AdminAlert tone="warning" title="Static source registry">
        This editor does not save, review, publish, archive, delete or upload content.
      </AdminAlert>

      <AdminFormSection
        title="Identity"
        description="English values come from the source registry. Arabic values have not been supplied."
      >
        <div className="admin-editor-grid">
          <AdminLocaleFieldPair
            id={`admin-product-${product.id}-name`}
            label="Product name"
            englishValue={product.name}
            arabicValue="Not supplied"
          />
          <AdminFieldPreview
            id={`admin-product-${product.id}-code`}
            label="Product code"
            value={product.code}
          />
          <AdminFieldPreview
            id={`admin-product-${product.id}-family`}
            label="Instrument family"
            value={family.name}
          />
          <AdminTextareaPreview
            id={`admin-product-${product.id}-description-en`}
            label="Short description — English"
            value={product.description ?? "Not documented in source"}
          />
          <AdminTextareaPreview
            id={`admin-product-${product.id}-description-ar`}
            label="Short description — Arabic"
            value="Not supplied"
            direction="rtl"
          />
        </div>
      </AdminFormSection>

      <AdminProductOptions groups={model.optionGroups} />

      <AdminSection
        title="Catalogue reference"
        description="Reference data is shown exactly as supplied by the current registry."
      >
        <dl className="admin-definition-grid">
          <div><dt>Catalogue family</dt><dd>{product.catalogueReference.family}</dd></div>
          <div><dt>Page or section</dt><dd>{product.catalogueReference.page ?? "Not supplied"}</dd></div>
        </dl>
        <div className="admin-card-actions">
          <ButtonLink href={model.adminCatalogueHref} variant="secondary">Open catalogue record</ButtonLink>
          <ButtonLink href={model.publicFamilyHref} variant="quiet">View public family</ButtonLink>
        </div>
      </AdminSection>

      <AdminSection
        title="Media requirement"
        description="The source contains a presentation requirement label, not a managed upload."
      >
        <div className="admin-media-requirement-panel">
          <ProductMediaPlaceholder label={product.mediaLabel} aspect="landscape" />
          <div>
            <p className="page-eyebrow">Source media label</p>
            <h3>{product.mediaLabel}</h3>
            <p>No managed media file is registered.</p>
            <div className="admin-management-actions">
              <Button disabled>Upload media</Button>
              <Button variant="secondary" disabled>Replace media</Button>
            </div>
          </div>
        </div>
      </AdminSection>

      <AdminSection
        title="Public context"
        description="These links show the current source-backed public composition, not an unpublished draft preview."
      >
        <div className="admin-card-actions">
          <ButtonLink href={model.publicHref}>Open current product page</ButtonLink>
          <ButtonLink href={model.publicFamilyHref} variant="secondary">Open current family page</ButtonLink>
        </div>
      </AdminSection>

      <AdminProductCompleteness items={model.completeness} />

      <AdminSection
        title="Future workflow actions"
        description="These actions remain unavailable until owner authentication, persistence and publishing workflows exist."
      >
        <div className="admin-management-actions">
          <Button disabled>Save draft</Button>
          <Button variant="secondary" disabled>Submit for review</Button>
          <Button variant="secondary" disabled>Publish</Button>
          <Button variant="quiet" disabled>Archive</Button>
          <Button variant="danger" disabled>Delete</Button>
        </div>
      </AdminSection>
    </div>
  );
}
