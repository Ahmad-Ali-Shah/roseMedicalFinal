import { Button, ButtonLink } from "@/components/ui";
import {
  AdminAlert,
  AdminFilterPreview,
  AdminPageHeader,
  AdminSearchPreview,
  AdminSection,
  AdminStatusBadge,
  AdminToolbar
} from "@/features/admin-primitives";
import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/lib/supabase/types";
import {
  adminProductHref,
  adminCatalogueHref,
  adminFamilyHref
} from "@/features/admin-management-routing/admin-management-hrefs";
import { toFamilySlug } from "@/lib/family-slug";

import { uploadMediaAsset } from "./actions";

interface MediaProductRow {
  id: string;
  name_en: string;
  slug: string;
  categories: { slug: string } | null;
}

const adminProductsHrefFallback = "/admin/products" as const;

export async function AdminMediaPage() {
  const supabase = await createClient();
  const [prodRes, catRes] = await Promise.all([
    supabase
      .from("products")
      .select("id, name_en, slug, categories(slug)")
      .order("name_en", { ascending: true }),
    supabase.from("categories").select("id, name_en, slug").is("deleted_at", null).order("sort_order", { ascending: true })
  ]);

  const products = (prodRes.data || []) as unknown as MediaProductRow[];
  const categories = (catRes.data || []) as Category[];

  return (
    <div className="admin-media-page">
      <AdminPageHeader
        eyebrow="Media library"
        title="Purpose-led media requirements."
        description="Upload and manage brand, catalogue, product and family media assets."
      />

      <AdminAlert tone="info" title="Live Database Connection">
        Media requirements are dynamically generated from the {products.length} live products and {categories.length} live categories in Supabase.
      </AdminAlert>

      <AdminSection title="Upload Media Asset" description="Upload images or documents to Supabase Storage.">
        <form action={uploadMediaAsset} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1rem", background: "#111", borderRadius: "0.5rem", border: "1px solid #333" }}>
          <input type="file" name="file" required style={{ color: "white" }} />
          <Button type="submit">Upload asset to Supabase Storage</Button>
        </form>
      </AdminSection>

      <AdminToolbar label="Media collection controls">
        <AdminSearchPreview label="Search media" placeholder="Requirement or usage location" />
        <AdminFilterPreview id="admin-media-type" label="Requirement type" options={["All requirement types", "Product", "Catalogue cover", "Family imagery"]} />
        <AdminFilterPreview id="admin-media-completeness" label="Completeness" options={["All completeness","Awaiting managed asset"]} />
      </AdminToolbar>

      <AdminSection
        title={`Product media requirements — ${products.length}`}
        description="Requirement labels come from the live products table. They are not uploaded assets."
      >
        <div className="admin-media-requirements">
          {products.map((item) => (
            <article className="admin-media-requirement-card" data-admin-media-requirement="true" key={item.id}>
              <p className="page-eyebrow">Requirement</p>
              <h3>{item.name_en} product media requirement</h3>
              <p>{item.name_en} placeholder</p>
              <AdminStatusBadge tone="warning">Awaiting managed asset</AdminStatusBadge>
              <ButtonLink
                href={item.categories ? adminProductHref({ familySlug: toFamilySlug(item.categories.slug), slug: item.slug }) : adminProductsHrefFallback}
                variant="quiet"
                size="small"
              >
                Open related record
              </ButtonLink>
            </article>
          ))}
        </div>
      </AdminSection>

      <AdminSection
        title={`Catalogue cover requirements — ${categories.length}`}
        description="Cover labels come from the live categories table."
      >
        <div className="admin-media-requirements">
          {categories.map((item) => (
            <article className="admin-media-requirement-card" data-admin-media-requirement="true" key={`cat-${item.id}`}>
              <p className="page-eyebrow">Requirement</p>
              <h3>{item.name_en} cover requirement</h3>
              <p>{item.name_en} technical catalogue</p>
              <AdminStatusBadge tone="warning">Awaiting managed asset</AdminStatusBadge>
              <ButtonLink href={adminCatalogueHref(toFamilySlug(item.slug))} variant="quiet" size="small">Open related record</ButtonLink>
            </article>
          ))}
        </div>
      </AdminSection>

      <AdminSection
        title={`Family imagery requirements — ${categories.length}`}
        description="One unresolved presentation requirement is derived for each live category."
      >
        <div className="admin-media-requirements">
          {categories.map((item) => (
            <article className="admin-media-requirement-card" data-admin-media-requirement="true" key={`fam-${item.id}`}>
              <p className="page-eyebrow">Requirement</p>
              <h3>{item.name_en} family imagery requirement</h3>
              <p>No managed asset registered</p>
              <AdminStatusBadge tone="warning">Awaiting managed asset</AdminStatusBadge>
              <ButtonLink href={adminFamilyHref(toFamilySlug(item.slug))} variant="quiet" size="small">Open related record</ButtonLink>
            </article>
          ))}
        </div>
      </AdminSection>

      <AdminAlert tone="neutral" title="Protected ROSA identity">
        The ROSA logo and protected identity system sit outside ordinary media management and are not counted as media assets or requirements.
      </AdminAlert>
    </div>
  );
}
