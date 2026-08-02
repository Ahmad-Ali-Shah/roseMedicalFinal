import { Button, ButtonLink } from "@/components/ui";
import {
  AdminAlert,
  AdminFieldPreview,
  AdminFilterPreview,
  AdminPageHeader,
  AdminSearchPreview,
  AdminSection,
  AdminTextareaPreview,
  AdminToolbar
} from "@/features/admin-primitives";
import { familyHref, productHref } from "@/features/public-catalogue";
import {
  getAdminContentBlocks,
  getAdminHomepageComposition
} from "./admin-content-model";

const PROTECTED_LAYOUT_ITEMS = [
  "Page creation",
  "Section placement or order",
  "Navigation",
  "Templates",
  "Components",
  "ROSA identity",
  "Typography",
  "Colours",
  "Spacing",
  "Cards",
  "Motion",
  "HTML",
  "CSS"
] as const;

const safeId = (value: string) => value.replace(/[^a-z0-9]+/gi, "-").toLowerCase();

export function AdminContentPage() {
  const blocks = getAdminContentBlocks();
  const composition = getAdminHomepageComposition();

  return (
    <div className="admin-content-page">
      <AdminPageHeader
        eyebrow="Website Content"
        title="Edit approved content, not the design."
        description="This source-backed inventory shows current public copy. It is not a live content-management system."
        actions={<Button disabled>Save draft</Button>}
      />

      <AdminAlert tone="warning" title="Static content source">
        Public and admin compositions read the same frontend values. No draft, review, preview-build or publishing state is connected.
      </AdminAlert>

      <AdminToolbar label="Website content controls">
        <AdminSearchPreview label="Search content blocks" placeholder="Search page or field" />
        <AdminFilterPreview id="content-page-filter" label="Page" options={["All pages", "Homepage", "About", "Procurement Support", "Contact", "Global"]} />
        <AdminFilterPreview id="content-type-filter" label="Content type" options={["All types", "Label", "Short text", "Long text"]} />
      </AdminToolbar>

      <AdminSection
        eyebrow="Source-backed records"
        title="Approved textual blocks"
        description="English values are current frontend output. Arabic values have not been supplied."
      >
        <div className="admin-content-blocks">
          {blocks.map((block) => (
            <article className="admin-content-block" data-admin-content-block="true" key={block.blockKey}>
              <header className="admin-content-block__header">
                <div>
                  <p className="page-eyebrow">{block.pageKey}</p>
                  <h3>{block.label}</h3>
                  <p>{block.affectedComponent} · {block.sensitivity}</p>
                </div>
                <ButtonLink href={block.publicHref} variant="quiet" size="small">View public page</ButtonLink>
              </header>

              <div className="admin-content-block__fields">
                {block.fields.map((field) => {
                  const id = `${safeId(block.blockKey)}-${safeId(field.fieldKey)}`;
                  const common = {
                    id,
                    label: `${field.label} — English`,
                    value: field.englishValue,
                    hint: field.characterGuidance
                  };
                  return (
                    <div className="admin-content-field-pair" key={field.fieldKey}>
                      {field.fieldType === "long-text" ? (
                        <AdminTextareaPreview {...common} />
                      ) : (
                        <AdminFieldPreview {...common} />
                      )}
                      <AdminFieldPreview
                        id={`${id}-ar`}
                        label={`${field.label} — Arabic`}
                        value="Not supplied"
                        direction="rtl"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="admin-management-actions">
                <Button size="small" variant="secondary" disabled>Edit</Button>
                <Button size="small" variant="secondary" disabled>Save draft</Button>
                <Button size="small" variant="secondary" disabled>Preview changes</Button>
                <Button size="small" disabled>Submit for review</Button>
              </div>
            </article>
          ))}
        </div>
      </AdminSection>

      <AdminSection
        eyebrow="Homepage"
        title="Current frontend composition"
        description="These families and products come from existing source selectors. They are not saved featured assignments."
      >
        <div className="admin-home-composition">
          <div>
            <h3>Product families</h3>
            <ol className="admin-composition-list">
              {composition.families.map((family) => (
                <li key={family.slug}>
                  <span>{String(family.sequence).padStart(2, "0")}</span>
                  <ButtonLink href={familyHref(family.slug)} variant="quiet" size="small">{family.name}</ButtonLink>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3>Current product selection</h3>
            <ul className="admin-composition-list">
              {composition.products.map((product) => (
                <li key={product.id}>
                  <span>{product.code}</span>
                  <ButtonLink href={productHref(product)} variant="quiet" size="small">{product.name}</ButtonLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AdminSection>

      <AdminSection eyebrow="Protected system" title="Layout and design remain outside content editing.">
        <ul className="admin-protected-list">
          {PROTECTED_LAYOUT_ITEMS.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </AdminSection>

      <AdminAlert tone="warning" title="Legal templates remain protected">
        Privacy and Terms require client confirmation and qualified legal review. They are not ordinary editable content blocks.
      </AdminAlert>
    </div>
  );
}
