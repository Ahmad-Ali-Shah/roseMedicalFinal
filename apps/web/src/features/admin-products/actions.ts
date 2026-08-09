"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearCatalogueProjectionCache } from "@/features/catalogue-live/catalogue-live.cache";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  replacePrimaryProductImage,
  type ProductMediaStorage,
  type ProductMediaWriteRepository
} from "./product-media-write";

function formString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function uploadProductMedia(formData: FormData) {
  const productId = formString(formData, "product_id");
  const familySlug = formString(formData, "family_slug");
  const productSlug = formString(formData, "product_slug");
  const fileValue = formData.get("file");

  if (!(fileValue instanceof File)) {
    throw new Error("Choose a valid product image.");
  }

  await requireAdminUser();
  const admin = createAdminClient();

  const repository: ProductMediaWriteRepository = {
    async findProductIdentity(id) {
      const { data: product, error: productError } = await admin
        .from("products")
        .select("id,slug,is_active,category_id")
        .eq("id", id)
        .maybeSingle();

      if (productError) {
        throw new Error(`Product identity lookup failed: ${productError.message}`);
      }
      if (!product || !product.category_id) return null;

      const { data: category, error: categoryError } = await admin
        .from("categories")
        .select("slug")
        .eq("id", product.category_id)
        .maybeSingle();

      if (categoryError) {
        throw new Error(`Product family lookup failed: ${categoryError.message}`);
      }
      if (!category) return null;

      return {
        id: product.id,
        dbSlug: product.slug,
        familySlug: category.slug,
        isActive: product.is_active
      };
    },

    async findPrimaryImages(id) {
      const { data, error } = await admin
        .from("product_images")
        .select("id,image_path")
        .eq("product_id", id)
        .eq("sort_order", 0);

      if (error) {
        throw new Error(`Primary image lookup failed: ${error.message}`);
      }

      return (data ?? []).map((row) => ({
        id: row.id,
        imagePath: row.image_path
      }));
    },

    async updateImagePathEverywhere({ oldImagePath, newImagePath }) {
      const { data, error } = await admin
        .from("product_images")
        .update({ image_path: newImagePath })
        .eq("image_path", oldImagePath)
        .select("id");

      if (error) {
        throw new Error(`Linked image update failed: ${error.message}`);
      }

      return { updatedCount: data?.length ?? 0 };
    }
  };

  const storage: ProductMediaStorage = {
    async upload({ path, file, contentType }) {
      const bucket = admin.storage.from("product-media");
      const { error } = await bucket.upload(path, file, {
        upsert: false,
        contentType,
        cacheControl: "31536000"
      });
      if (error) {
        throw new Error(`Product image upload failed: ${error.message}`);
      }

      const { data } = bucket.getPublicUrl(path);
      if (!data.publicUrl) {
        throw new Error("Product image upload did not produce a public URL.");
      }
      return { publicUrl: data.publicUrl };
    },

    async remove(path) {
      const { error } = await admin.storage.from("product-media").remove([path]);
      if (error) {
        throw new Error(`Product image cleanup failed: ${error.message}`);
      }
    }
  };

  await replacePrimaryProductImage(
    { productId, familySlug, productSlug, file: fileValue },
    { repository, storage }
  );

  clearCatalogueProjectionCache();
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/search");
  revalidatePath(`/products/${familySlug}`);
  revalidatePath(`/products/${familySlug}/${productSlug}`);
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${familySlug}/${productSlug}`);
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createProduct(formData: FormData) {
  const familySlug = formString(formData, "family_slug");
  const nameEn = formString(formData, "name_en");
  const itemCode = formString(formData, "item_code");
  const descriptionEn = formString(formData, "description_en");
  const nameAr = formString(formData, "name_ar");
  const requestedSlug = formString(formData, "slug");

  if (!familySlug || !nameEn || !itemCode) {
    throw new Error("Family, name, and item code are required.");
  }

  await requireAdminUser();
  const admin = createAdminClient();

  const { data: category, error: categoryError } = await admin
    .from("categories")
    .select("id")
    .eq("slug", familySlug)
    .maybeSingle();

  if (categoryError) {
    throw new Error(`Family lookup failed: ${categoryError.message}`);
  }
  if (!category) {
    throw new Error(`Unknown family: ${familySlug}`);
  }

  const slug = slugify(requestedSlug || itemCode || nameEn);
  if (!slug) {
    throw new Error("Could not generate a valid slug from the item code or name.");
  }

  const { data: product, error: insertError } = await admin
    .from("products")
    .insert({
      category_id: category.id,
      item_code: itemCode,
      name_en: nameEn,
      name_ar: nameAr || nameEn,
      description_en: descriptionEn || null,
      is_active: false,
      slug,
      stock_status: "available",
      sell_mode: "quote"
    })
    .select("id,slug")
    .single();

  if (insertError) {
    if (insertError.code === "23505") {
      throw new Error(`Slug "${slug}" is already used — try a different item code or name.`);
    }
    throw new Error(`Product creation failed: ${insertError.message}`);
  }

  clearCatalogueProjectionCache();
  revalidatePath("/admin/products");

  redirect(`/admin/products/${familySlug}/${product.slug}`);
}

export async function activateProduct(formData: FormData) {
  const productId = formString(formData, "product_id");
  const familySlug = formString(formData, "family_slug");
  const productSlug = formString(formData, "product_slug");

  if (!productId) {
    throw new Error("Missing product id.");
  }

  await requireAdminUser();
  const admin = createAdminClient();

  const { error } = await admin
    .from("products")
    .update({ is_active: true })
    .eq("id", productId);

  if (error) {
    throw new Error(`Product activation failed: ${error.message}`);
  }

  clearCatalogueProjectionCache();
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/search");
  revalidatePath(`/products/${familySlug}`);
  revalidatePath(`/products/${familySlug}/${productSlug}`);
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${familySlug}/${productSlug}`);
}
