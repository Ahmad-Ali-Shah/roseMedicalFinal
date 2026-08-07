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
import { uploadProductMedia } from "./actions";

export function AdminProductEditorPage({
  model
}: {
  model: AdminProductEditorModel;
}) {
  const { family, product } = model;

  return (
    <div className="admin-product-editor">
      <AdminPageHeader
        eyebrow="Live product record"
        title={product.name}
        description="This page reads the same canonical Supabase product record used by the public catalogue."
        actions={
          <>
            <AdminStatusBadge tone="success">Live record</AdminStatusBadge>
            <ButtonLink href={model.publicHref} variant="secondary">View public product</ButtonLink>
            <ButtonLink href={model.publicFamilyHref} variant="quiet">View public family</ButtonLink>
          </>
        }
      />

      <AdminAlert tone="neutral" title="Protected catalogue identity">
        Product identity, family, codes and documented options stay read-only while the source-of-truth migration is being verified. Primary product media is the supported operational edit on this page.
      </AdminAlert>

      <AdminFormSection
        title="Identity"
        description="These values come from the live canonical product record. Arabic product copy has not been verified for admin editing."
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
        description="The product keeps its verified catalogue family and page reference during migration."
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
        title="Primary product image"
        description="Replacing this image updates the canonical product media relationship used by public product surfaces."
      >
        <div className="admin-media-requirement-panel">
          <ProductMediaPlaceholder
            label={product.mediaLabel}
            aspect="landscape"
            src={product.mediaPath}
            fallbackSrc={product.mediaFallbackPath}
            spriteIndex={product.mediaIndex}
          />
          <div>
            <p className="page-eyebrow">Current media</p>
            <h3>{product.mediaLabel}</h3>
            <form action={uploadProductMedia} className="admin-media-upload-form">
              <input type="hidden" name="product_id" value={product.id} />
              <input type="hidden" name="family_slug" value={product.familySlug} />
              <input type="hidden" name="product_slug" value={product.slug} />
              <input
                type="file"
                name="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                required
              />
              <div className="admin-management-actions">
                <Button type="submit">Replace primary image</Button>
              </div>
            </form>
          </div>
        </div>
      </AdminSection>

      <AdminSection
        title="Public context"
        description="These links show the same live product record in its public catalogue context."
      >
        <div className="admin-card-actions">
          <ButtonLink href={model.publicHref}>Open current product page</ButtonLink>
          <ButtonLink href={model.publicFamilyHref} variant="secondary">Open current family page</ButtonLink>
        </div>
      </AdminSection>

      <AdminProductCompleteness items={model.completeness} />
    </div>
  );
}
