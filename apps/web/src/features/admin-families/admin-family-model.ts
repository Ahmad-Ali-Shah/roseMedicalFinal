import { createClient } from "@/lib/supabase/server";
import { familyHref, type FamilySlug } from "@/features/public-catalogue";
import {
  adminCatalogueHref,
  adminFamilyHref
} from "@/features/admin-management-routing/admin-management-hrefs";
import { getCatalogueDocument } from "@/features/catalogues";
import { isFamilySlug, toFamilySlug } from "@/lib/family-slug";
import {
  CATALOGUE_FAMILIES,
  CATALOGUE_PRODUCTS,
  type CatalogueFamilyRecord
} from "@/features/catalogue-registry";

export interface AdminFamilyRow {
  slug: CatalogueFamilyRecord["slug"];
  sequence: CatalogueFamilyRecord["sequence"];
  name: string;
  introduction: string;
  catalogueLabel: string;
  productCount: number;
  publicHref: ReturnType<typeof familyHref>;
  adminHref: ReturnType<typeof adminFamilyHref>;
}

export function getAdminFamilyRows(): readonly AdminFamilyRow[] {
  return CATALOGUE_FAMILIES.map((family): AdminFamilyRow => ({
    slug: family.slug,
    sequence: family.sequence,
    name: family.name,
    introduction: family.introduction,
    catalogueLabel: family.catalogueLabel,
    productCount: CATALOGUE_PRODUCTS.filter(
      (product) => product.familySlug === family.slug
    ).length,
    publicHref: familyHref(family.slug),
    adminHref: adminFamilyHref(family.slug)
  }));
}

export interface AdminFamilyEditorProduct {
  id: string;
  name: string;
  code: string;
  familySlug: FamilySlug;
  slug: string;
}

export interface AdminFamilyEditorModel {
  slug: FamilySlug;
  name: string;
  introduction: string;
  catalogueLabel: string;
  imagePath: string | null;
  products: readonly AdminFamilyEditorProduct[];
  productCount: number;
  publicHref: ReturnType<typeof familyHref>;
  adminCatalogueHref: ReturnType<typeof adminCatalogueHref>;
  pdfAvailability: "Public PDF path registered" | "Awaiting publication";
}

export async function getAdminFamilyEditor(
  familySlugParam: string
): Promise<AdminFamilyEditorModel | undefined> {
  if (!isFamilySlug(familySlugParam)) return undefined;
  const slug = toFamilySlug(familySlugParam);

  const supabase = await createClient();
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .is("deleted_at", null)
    .maybeSingle();

  const fallbackFamily = CATALOGUE_FAMILIES.find((f) => f.slug === slug);
  if (!category && !fallbackFamily) return undefined;

  const categoryName = category?.name_en || fallbackFamily?.name || slug;
  const categoryImage = category?.image_path || null;

  let products: AdminFamilyEditorProduct[] = [];

  if (category?.id) {
    const { data: productRows } = await supabase
      .from("products")
      .select("id, name_en, item_code, slug")
      .eq("category_id", category.id)
      .order("name_en", { ascending: true });

    products = (productRows || []).map((p) => ({
      id: p.id,
      name: p.name_en,
      code: p.item_code || "",
      familySlug: slug,
      slug: p.slug
    }));
  } else {
    products = CATALOGUE_PRODUCTS.filter((p) => p.familySlug === slug).map((p) => ({
      id: p.id,
      name: p.name,
      code: p.code,
      familySlug: slug,
      slug: p.slug
    }));
  }

  const document = getCatalogueDocument(slug);

  return {
    slug,
    name: categoryName,
    introduction: fallbackFamily?.introduction || "Live category managed from Supabase.",
    catalogueLabel: `${categoryName} catalogue`,
    imagePath: categoryImage,
    products,
    productCount: products.length,
    publicHref: familyHref(slug),
    adminCatalogueHref: adminCatalogueHref(slug),
    pdfAvailability: document?.pdfPath ? "Public PDF path registered" : "Awaiting publication"
  };
}
