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
  nameAr: string;
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
    nameAr: family.name,
    introduction: family.introduction,
    catalogueLabel: family.catalogueLabel,
    productCount: CATALOGUE_PRODUCTS.filter(
      (product) => product.familySlug === family.slug
    ).length,
    publicHref: familyHref(family.slug),
    adminHref: adminFamilyHref(family.slug)
  }));
}

export async function getLiveAdminFamilyRows(): Promise<readonly AdminFamilyRow[]> {
  const supabase = await createClient();
  const [categoriesResult, productsResult, settingsResult] = await Promise.all([
    supabase.from("categories").select("id,slug,name_en,name_ar,sort_order").is("deleted_at", null).order("sort_order"),
    supabase.from("products").select("category_id"),
    supabase.from("site_settings").select("key,value_en")
  ]);

  if (categoriesResult.error) throw new Error(`Family list failed: ${categoriesResult.error.message}`);
  if (productsResult.error) throw new Error(`Product counts failed: ${productsResult.error.message}`);

  const products = productsResult.data ?? [];
  const settings = settingsResult.data ?? [];
  return (categoriesResult.data ?? []).flatMap((category, index): AdminFamilyRow[] => {
    if (!isFamilySlug(category.slug)) return [];
    const slug = toFamilySlug(category.slug);
    const fallback = CATALOGUE_FAMILIES.find((family) => family.slug === slug);
    const introduction = settings.find((setting) => setting.key === `family_introduction_${slug}`)?.value_en?.trim()
      || fallback?.introduction
      || "";
    return [{
      slug,
      sequence: String(index + 1).padStart(2, "0") as AdminFamilyRow["sequence"],
      name: category.name_en,
      nameAr: category.name_ar?.trim() || category.name_en,
      introduction,
      catalogueLabel: `${category.name_en} catalogue`,
      productCount: products.filter((product) => product.category_id === category.id).length,
      publicHref: familyHref(slug),
      adminHref: adminFamilyHref(slug)
    }];
  });
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
  nameAr: string;
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
  const categoryNameAr = category?.name_ar?.trim() || categoryName;
  const categoryImage = category?.image_path || null;
  const { data: introductionSetting } = await supabase
    .from("site_settings")
    .select("value_en")
    .eq("key", `family_introduction_${slug}`)
    .maybeSingle();

  let products: AdminFamilyEditorProduct[] = [];

  if (category?.id) {
    const { data: productRows } = await supabase
      .from("products")
      .select("id, name_en, item_code, slug")
      .eq("category_id", category.id)
      .order("name_en", { ascending: true });

    const familyPrefix = `${slug}-`;
    products = (productRows || []).map((p) => ({
      id: p.id,
      name: p.name_en,
      code: p.item_code || "",
      familySlug: slug,
      slug: p.slug.startsWith(familyPrefix) ? p.slug.slice(familyPrefix.length) : p.slug
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
    nameAr: categoryNameAr,
    introduction: introductionSetting?.value_en?.trim() || fallbackFamily?.introduction || "",
    catalogueLabel: `${categoryName} catalogue`,
    imagePath: categoryImage,
    products,
    productCount: products.length,
    publicHref: familyHref(slug),
    adminCatalogueHref: adminCatalogueHref(slug),
    pdfAvailability: document?.pdfPath ? "Public PDF path registered" : "Awaiting publication"
  };
}
