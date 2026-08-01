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
import type { AdminFamilyEditorModel } from "./admin-family-model";

export function AdminFamilyEditorPage({
  model
}: {
  model: AdminFamilyEditorModel;
}) {
  return (
    <div className="admin-family-editor">
      <AdminPageHeader
        eyebrow="Family source record"
        title={model.family.name}
        description="Read-only family data and product membership derived from the current catalogue registry."
        actions={
          <>
            <AdminStatusBadge tone="neutral">Source record</AdminStatusBadge>
            <ButtonLink href={model.publicHref} variant="secondary">View public family</ButtonLink>
            <ButtonLink href={model.adminCatalogueHref} variant="quiet">Open catalogue record</ButtonLink>
          </>
        }
      />

      <AdminAlert tone="warning" title="Static family composition">
        No family content, imagery, featured assignment or catalogue file can be changed here.
      </AdminAlert>

      <AdminSection title="Identity" description="Arabic family content has not been supplied.">
        <div className="admin-editor-grid">
          <AdminLocaleFieldPair
            id={`admin-family-${model.family.slug}-name`}
            label="Family name"
            englishValue={model.family.name}
            arabicValue="Not supplied"
          />
          <AdminTextareaPreview
            id={`admin-family-${model.family.slug}-intro-en`}
            label="Introduction — English"
            value={model.family.introduction}
          />
          <AdminTextareaPreview
            id={`admin-family-${model.family.slug}-intro-ar`}
            label="Introduction — Arabic"
            value="Not supplied"
            direction="rtl"
          />
          <AdminFieldPreview
            id={`admin-family-${model.family.slug}-sequence`}
            label="Sequence"
            value={model.family.sequence}
          />
          <AdminFieldPreview
            id={`admin-family-${model.family.slug}-catalogue-label`}
            label="Catalogue label"
            value={model.family.catalogueLabel}
          />
        </div>
      </AdminSection>

      <AdminSection
        title={`${model.productCount} source products`}
        description="Membership is derived from the current product registry."
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
            <h3>Family imagery requirement — no managed asset registered</h3>
            <p>This is a derived presentation requirement, not a source media record.</p>
            <Button disabled>Upload hero media</Button>
          </article>
          <article className="admin-requirement-panel">
            <p className="page-eyebrow">Catalogue PDF</p>
            <h3>{model.pdfAvailability}</h3>
            <p>Availability is derived only from the catalogue document’s public PDF path.</p>
            <Button variant="secondary" disabled>Replace catalogue PDF</Button>
          </article>
        </div>
      </AdminSection>

      <AdminSection
        title="Future workflow actions"
        description="No save, preview, publication or featured-product workflow is connected."
      >
        <div className="admin-management-actions">
          <Button disabled>Save draft</Button>
          <Button variant="secondary" disabled>Preview family changes</Button>
          <Button variant="secondary" disabled>Publish changes</Button>
          <Button variant="quiet" disabled>Select featured products</Button>
        </div>
      </AdminSection>
    </div>
  );
}
