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
import type { Product, Category } from "@/lib/supabase/types";

export async function AdminMediaPage() {
  const supabase = await createClient();
  const [prodRes, catRes] = await Promise.all([
    supabase.from("products").select("id, name_en, slug").order("name_en", { ascending: true }),
    supabase.from("categories").select("id, name_en, slug").is("deleted_at", null).order("sort_order", { ascending: true })
  ]);

  const products = (prodRes.data || []) as Product[];
  const categories = (catRes.data || []) as Category[];

  return (
    <div className="admin-media-page">
      <AdminPageHeader
        eyebrow="Media library"
        title="Purpose-led media requirements."
        description="The workspace records where managed assets will be needed without fabricating files or upload history."
        actions={<Button disabled>Upload media</Button>}
      />

      <AdminAlert tone="info" title="Live Database Connection">
        Media requirements are dynamically generated from the {products.length} live products and {categories.length} live categories in Supabase.
      </AdminAlert>

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
              <ButtonLink href="/admin/products" variant="quiet" size="small">Open related record</ButtonLink>
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
              <ButtonLink href="/admin/catalogues" variant="quiet" size="small">Open related record</ButtonLink>
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
              <ButtonLink href="/admin/families" variant="quiet" size="small">Open related record</ButtonLink>
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
