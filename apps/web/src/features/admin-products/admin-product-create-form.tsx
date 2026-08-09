import { Button } from "@/components/ui";
import { AdminField, AdminFormSection, AdminSelectField, AdminTextareaField } from "@/features/admin-primitives";
import { getAdminFamilyRows } from "@/features/admin-families";
import { createProduct } from "./actions";

type AdminFamilyRow = ReturnType<typeof getAdminFamilyRows>[number];

export function AdminProductCreateForm({
  families
}: {
  families: readonly AdminFamilyRow[];
}) {
  return (
    <form action={createProduct} className="admin-product-create-form">
      <AdminFormSection
        title="New product"
        description="Products are created as drafts (inactive) and won't appear on the public catalogue until activated from the product editor."
      >
        <div className="admin-editor-grid">
          <AdminSelectField
            id="admin-new-product-family"
            name="family_slug"
            label="Instrument family"
            options={families.map((family) => ({ value: family.slug, label: family.name }))}
            required
          />
          <AdminField
            id="admin-new-product-name-en"
            name="name_en"
            label="Product name — English"
            required
          />
          <AdminField
            id="admin-new-product-name-ar"
            name="name_ar"
            label="Product name — Arabic"
            direction="rtl"
          />
          <AdminField
            id="admin-new-product-item-code"
            name="item_code"
            label="Item code"
            required
          />
          <AdminField
            id="admin-new-product-slug"
            name="slug"
            label="URL slug"
            hint="Leave blank to generate automatically from the product name."
          />
          <AdminTextareaField
            id="admin-new-product-description-en"
            name="description_en"
            label="Short description — English"
          />
        </div>
      </AdminFormSection>

      <div className="admin-card-actions">
        <Button type="submit">Create draft product</Button>
      </div>
    </form>
  );
}
