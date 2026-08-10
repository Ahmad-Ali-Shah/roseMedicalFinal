import type { Route } from "next";
import {
  AdminAlert,
  AdminPageHeader,
} from "@/features/admin-primitives";
import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/lib/supabase/types";
import { adminCatalogueHref } from "@/features/admin-management-routing/admin-management-hrefs";
import { toFamilySlug } from "@/lib/family-slug";

import { AdminCataloguesCollection } from "./admin-catalogues-collection";

export interface LiveCatalogueRow {
  familySlug: string;
  sequence: string;
  familyName: string;
  familyNameAr: string;
  name: string;
  description: string;
  coverLabel: string;
  sourceStatus: string;
  availability: "Public PDF path registered" | "Awaiting publication";
  publicCataloguesHref: Route<string>;
  publicFamilyHref: Route<string>;
  adminHref: Route<string>;
}

export async function AdminCataloguesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .is("deleted_at", null)
    .order("sort_order", { ascending: true });

  const categories = (data || []) as Category[];

  const rows: LiveCatalogueRow[] = categories.map((cat, index) => {
    const seq = String(index + 1).padStart(2, "0");
    const publicCataloguesHref = "/catalogues" as Route<string>;
    const publicFamilyHref = `/products?category=${cat.slug}` as Route<string>;
    const adminHref = adminCatalogueHref(toFamilySlug(cat.slug));

    return {
      familySlug: cat.slug,
      sequence: seq,
      familyName: cat.name_en,
      familyNameAr: cat.name_ar?.trim() || cat.name_en,
      name: `${cat.name_en} technical catalogue`,
      description: `Catalogue for ${cat.name_en} instruments.`,
      coverLabel: "Technical family catalogue",
      sourceStatus: "Live DB Record",
      availability: "Awaiting publication",
      publicCataloguesHref,
      publicFamilyHref,
      adminHref
    };
  });

  return (
    <div className="admin-catalogues-page">
      <AdminPageHeader
        eyebrow="Catalogues"
        title="Browse technical catalogues."
        description="Review each family catalogue and the products linked to it."
      />

      <AdminAlert tone="info" title="Catalogue records">
        {rows.length} family catalogues are available.
      </AdminAlert>
      <AdminCataloguesCollection rows={rows} />
    </div>
  );
}
