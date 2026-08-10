import { Button, ButtonLink } from "@/components/ui";
import {
  AdminAlert,
  AdminField,
  AdminPageHeader,
  AdminSection,
  AdminStatusBadge,
  AdminTextareaField
} from "@/features/admin-primitives";
import { adminProductHref } from "@/features/admin-management-routing/admin-management-hrefs";
import { saveFamily } from "./actions";
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
        description="Edit the family name and public English introduction."
        actions={
          <>
            <AdminStatusBadge tone="neutral">Live record</AdminStatusBadge>
            <ButtonLink href={model.publicHref} variant="secondary">View public family</ButtonLink>
            <ButtonLink href={model.adminCatalogueHref} variant="quiet">Open catalogue record</ButtonLink>
          </>
        }
      />

      <AdminAlert tone="info" title="Live family record">
        Arabic falls back to the English family name when no Arabic value is supplied.
      </AdminAlert>

      <form action={saveFamily} className="admin-family-edit-form">
        <input type="hidden" name="slug" value={model.slug} />
        <AdminSection title="Family details">
          <div className="admin-editor-grid">
            <AdminField id={`admin-family-${model.slug}-name-en`} name="name_en" label="Family name — English" defaultValue={model.name} required />
            <AdminField id={`admin-family-${model.slug}-name-ar`} name="name_ar" label="Family name — Arabic" defaultValue={model.nameAr || model.name} direction="rtl" />
            <AdminTextareaField id={`admin-family-${model.slug}-intro-en`} name="introduction_en" label="Introduction — English" defaultValue={model.introduction} rows={4} required />
          </div>
          <div className="admin-card-actions"><Button type="submit">Save family</Button></div>
        </AdminSection>
      </form>

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

    </div>
  );
}
