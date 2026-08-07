import { Button, ButtonLink } from "@/components/ui";
import {
  AdminAlert,
  AdminFieldPreview,
  AdminLocaleFieldPair,
  AdminPageHeader,
  AdminSection,
  AdminStatusBadge,
  AdminTextareaPreview
} from "@/features/admin-primitives";
import { adminProductHref } from "@/features/admin-management-routing/admin-management-hrefs";
import { uploadFamilyHeroImage } from "./actions";
import type { AdminFamilyEditorModel } from "./admin-family-model";

export function AdminFamilyEditorPage({
  model
}: {
  model: AdminFamilyEditorModel;
}) {
  return (
    <div className="admin-family-editor">
      <AdminPageHeader
        eyebrow="Family record"
        title={model.name}
        description="Live family data from Supabase. Product membership and hero image are editable; text content is not yet."
        actions={
          <>
            <AdminStatusBadge tone="neutral">Live record</AdminStatusBadge>
            <ButtonLink href={model.publicHref} variant="secondary">View public family</ButtonLink>
            <ButtonLink href={model.adminCatalogueHref} variant="quiet">Open catalogue record</ButtonLink>
          </>
        }
      />

      <AdminAlert tone="info" title="Live Database Connection">
        This family and its {model.productCount} products are read live from Supabase.
      </AdminAlert>

      <AdminSection title="Identity" description="Text fields are not yet editable — schema addition required for family introduction copy.">
        <div className="admin-editor-grid">
          <AdminLocaleFieldPair
            id={`admin-family-${model.slug}-name`}
            label="Family name"
            englishValue={model.name}
            arabicValue="Not supplied"
          />
          <AdminTextareaPreview
            id={`admin-family-${model.slug}-intro-en`}
            label="Introduction — English"
            value={model.introduction}
          />
          <AdminFieldPreview
            id={`admin-family-${model.slug}-catalogue-label`}
            label="Catalogue label"
            value={model.catalogueLabel}
          />
        </div>
      </AdminSection>

      <AdminSection
        title={`${model.productCount} products`}
        description="Membership is derived live from the products table (category_id)."
      >
        <ol className="admin-family-products">
          {model.products.map((product) => (
            <li key={product.id}>
              <div>
                <strong>{product.name}</strong>
                <span>{product.code}</span>
              </div>
              <ButtonLink href={adminProductHref(product)} variant="quiet" size="small">
                Open product editor
              </ButtonLink>
            </li>
          ))}
        </ol>
      </AdminSection>

      <AdminSection title="Presentation requirements">
        <div className="admin-editor-grid">
          <article className="admin-requirement-panel">
            <p className="page-eyebrow">Family imagery</p>
            <h3>{model.imagePath ? "Hero image on file" : "No hero image registered"}</h3>
            {model.imagePath ? (
              <img
                src={model.imagePath}
                alt={`${model.name} hero`}
                style={{ maxWidth: "100%", borderRadius: 8, marginBottom: 12 }}
              />
            ) : (
              <p>No managed asset registered.</p>
            )}
            <form action={uploadFamilyHeroImage}>
              <input type="hidden" name="slug" value={model.slug} />
              <input type="file" name="file" accept="image/*" required />
              <Button type="submit">Upload hero media</Button>
            </form>
          </article>
          <article className="admin-requirement-panel">
            <p className="page-eyebrow">Catalogue PDF</p>
            <h3>{model.pdfAvailability}</h3>
            <p>Requires a pdf_path column on categories before this can be wired up.</p>
            <Button variant="secondary" disabled>Replace catalogue PDF</Button>
          </article>
        </div>
      </AdminSection>

      <AdminSection
        title="Future workflow actions"
        description="Text save, preview, publication and featured-product selection are not yet connected."
      >
        <div className="admin-management-actions">
          <Button disabled>Save draft (text)</Button>
          <Button variant="secondary" disabled>Preview family changes</Button>
          <Button variant="secondary" disabled>Publish changes</Button>
          <Button variant="quiet" disabled>Select featured products</Button>
        </div>
      </AdminSection>
    </div>
  );
}
