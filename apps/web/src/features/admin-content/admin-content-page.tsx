import { Button, ButtonLink } from "@/components/ui";
import { AdminPageHeader } from "@/features/admin-primitives/admin-page-header";
import { AdminAlert } from "@/features/admin-primitives/admin-feedback";
import {
  AdminFilterPreview,
  AdminSearchPreview,
  AdminToolbar
} from "@/features/admin-primitives/admin-controls";
import { AdminSection } from "@/features/admin-primitives/admin-section";
import {
  AdminFieldPreview,
  AdminTextareaPreview
} from "@/features/admin-primitives/admin-fields";
import { familyHref, productHref } from "@/features/public-catalogue";
import {
  getAdminContentBlocks,
  getAdminHomepageComposition
} from "./admin-content-model";
import { createClient } from "@/lib/supabase/server";
import type { SiteSetting } from "@/lib/supabase/types";

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

import { saveSiteContent } from "./actions";

export async function AdminContentPage() {
  const supabase = await createClient();
  const { data: settingsData } = await supabase.from("site_settings").select("*");
  const settings = (settingsData || []) as SiteSetting[];
  
  // Helper to get setting value by key
  const getSetting = (key: string) => settings.find(s => s.key === key)?.value_en || "";
  const getSettingAr = (key: string) => settings.find(s => s.key === key)?.value_ar || "";

  const blocks = getAdminContentBlocks();
  const composition = getAdminHomepageComposition();

  return (
    <div className="admin-content-page">
      <AdminPageHeader
        eyebrow="Website Content"
        title="Edit approved content, not the design."
        description="This composition reflects live content from the Supabase database."
        actions={<ButtonLink href="/" variant="secondary">View live public site</ButtonLink>}
      />

      <AdminAlert tone="info" title="Live Database Connection">
        Content values are pulled dynamically from the site_settings table in Supabase.
      </AdminAlert>

      <AdminToolbar label="Website content controls">
        <AdminSearchPreview label="Search content blocks" placeholder="Search page or field" />
        <AdminFilterPreview id="content-page-filter" label="Page" options={["All pages", "Homepage", "About", "Procurement Support", "Contact", "Global"]} />
        <AdminFilterPreview id="content-type-filter" label="Content type" options={["All types", "Label", "Short text", "Long text"]} />
      </AdminToolbar>

      <AdminSection
        eyebrow="Source-backed records"
        title="Approved textual blocks"
        description="English values are live from the database. Arabic values can be supplied below."
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
                  const liveValueEn = getSetting(field.fieldKey) || field.englishValue;
                  const liveValueAr = getSettingAr(field.fieldKey) || getSetting(`${field.fieldKey}_ar`) || "";

                  return (
                    <form action={saveSiteContent} className="admin-content-field-pair" key={field.fieldKey} style={{ marginBottom: "1rem" }}>
                      <input type="hidden" name="key" value={field.fieldKey} />
                      
                      {field.fieldType === "long-text" ? (
                        <div style={{ width: "100%", marginBottom: "0.5rem" }}>
                          <label style={{ display: "block", fontSize: "0.875rem", color: "#aaa", marginBottom: "0.25rem" }}>{field.label} — English</label>
                          <textarea
                            name="value_en"
                            defaultValue={liveValueEn}
                            rows={3}
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", background: "#111", border: "1px solid #333", color: "white", fontFamily: "inherit" }}
                          />
                        </div>
                      ) : (
                        <div style={{ width: "100%", marginBottom: "0.5rem" }}>
                          <label style={{ display: "block", fontSize: "0.875rem", color: "#aaa", marginBottom: "0.25rem" }}>{field.label} — English</label>
                          <input
                            type="text"
                            name="value_en"
                            defaultValue={liveValueEn}
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", background: "#111", border: "1px solid #333", color: "white", fontFamily: "inherit" }}
                          />
                        </div>
                      )}

                      <div style={{ width: "100%", marginBottom: "0.5rem" }}>
                        <label style={{ display: "block", fontSize: "0.875rem", color: "#aaa", marginBottom: "0.25rem" }}>{field.label} — Arabic</label>
                        <input
                          type="text"
                          name="value_ar"
                          defaultValue={liveValueAr}
                          placeholder="Arabic translation"
                          dir="rtl"
                          style={{ width: "100%", padding: "0.5rem", borderRadius: "0.375rem", background: "#111", border: "1px solid #333", color: "white", fontFamily: "inherit" }}
                        />
                      </div>

                      <div className="admin-management-actions" style={{ marginTop: "0.5rem" }}>
                        <Button size="small" type="submit">Save block content</Button>
                      </div>
                    </form>
                  );
                })}
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
                  <span>{family.sequence}</span>
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
