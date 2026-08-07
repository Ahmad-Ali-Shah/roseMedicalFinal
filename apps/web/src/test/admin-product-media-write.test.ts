import { describe, expect, it, vi } from "vitest";
import {
  replacePrimaryProductImage,
  type ProductMediaStorage,
  type ProductMediaWriteRepository
} from "@/features/admin-products/product-media-write";

const productId = "550e8400-e29b-41d4-a716-446655440000";

function imageFile(type = "image/png", size = 128): File {
  return new File([new Uint8Array(size)], "unsafe-name.exe", { type });
}

function dependencies(overrides?: {
  identity?: Awaited<ReturnType<ProductMediaWriteRepository["findProductIdentity"]>>;
  primaryImages?: Awaited<ReturnType<ProductMediaWriteRepository["findPrimaryImages"]>>;
  updateError?: Error;
}) {
  const repository: ProductMediaWriteRepository = {
    findProductIdentity: vi.fn(async () =>
      overrides?.identity === undefined
        ? {
            id: productId,
            dbSlug: "cutters-liston",
            familySlug: "cutters",
            isActive: true
          }
        : overrides.identity
    ),
    findPrimaryImages: vi.fn(async () =>
      overrides?.primaryImages ?? [
        { id: "image-row-1", imagePath: "/media/old-liston.avif" }
      ]
    ),
    updatePrimaryImage: vi.fn(async () => {
      if (overrides?.updateError) throw overrides.updateError;
    })
  };

  const storage: ProductMediaStorage = {
    upload: vi.fn(async ({ path }) => ({
      publicUrl: `https://example.supabase.co/storage/v1/object/public/product-media/${path}`
    })),
    remove: vi.fn(async () => undefined)
  };

  return { repository, storage };
}

describe("safe product primary-media replacement", () => {
  it("validates identity and existing primary row before upload", async () => {
    const deps = dependencies();
    const result = await replacePrimaryProductImage(
      {
        productId,
        familySlug: "cutters",
        productSlug: "liston",
        file: imageFile()
      },
      { ...deps, createObjectId: () => "new-object" }
    );

    expect(deps.repository.findProductIdentity).toHaveBeenCalledWith(productId);
    expect(deps.repository.findPrimaryImages).toHaveBeenCalledWith(productId);
    expect(deps.storage.upload).toHaveBeenCalledWith({
      path: `products/${productId}/new-object.png`,
      file: expect.any(File),
      contentType: "image/png"
    });
    expect(deps.repository.updatePrimaryImage).toHaveBeenCalledWith({
      imageId: "image-row-1",
      productId,
      imagePath: result.publicUrl
    });
    expect(deps.storage.remove).not.toHaveBeenCalled();
    expect(result.previousImagePath).toBe("/media/old-liston.avif");
  });

  it("rejects an identity mismatch before touching storage", async () => {
    const deps = dependencies({
      identity: {
        id: productId,
        dbSlug: "cutters-cleveland",
        familySlug: "cutters",
        isActive: true
      }
    });

    await expect(
      replacePrimaryProductImage(
        { productId, familySlug: "cutters", productSlug: "liston", file: imageFile() },
        { ...deps, createObjectId: () => "new-object" }
      )
    ).rejects.toThrow(/identity mismatch/i);
    expect(deps.storage.upload).not.toHaveBeenCalled();
  });

  it("rejects missing or duplicate primary rows before upload", async () => {
    const missing = dependencies({ primaryImages: [] });
    const duplicate = dependencies({
      primaryImages: [
        { id: "one", imagePath: "/media/one.avif" },
        { id: "two", imagePath: "/media/two.avif" }
      ]
    });

    for (const deps of [missing, duplicate]) {
      await expect(
        replacePrimaryProductImage(
          { productId, familySlug: "cutters", productSlug: "liston", file: imageFile() },
          { ...deps, createObjectId: () => "new-object" }
        )
      ).rejects.toThrow(/exactly one primary image/i);
      expect(deps.storage.upload).not.toHaveBeenCalled();
    }
  });

  it("derives safe extensions from MIME and rejects invalid files", async () => {
    const deps = dependencies();

    await expect(
      replacePrimaryProductImage(
        { productId: "not-a-uuid", familySlug: "cutters", productSlug: "liston", file: imageFile() },
        { ...deps, createObjectId: () => "new-object" }
      )
    ).rejects.toThrow(/product id/i);

    await expect(
      replacePrimaryProductImage(
        { productId, familySlug: "cutters", productSlug: "liston", file: imageFile("image/gif") },
        { ...deps, createObjectId: () => "new-object" }
      )
    ).rejects.toThrow(/image type/i);

    await expect(
      replacePrimaryProductImage(
        {
          productId,
          familySlug: "cutters",
          productSlug: "liston",
          file: imageFile("image/jpeg", 8 * 1024 * 1024 + 1)
        },
        { ...deps, createObjectId: () => "new-object" }
      )
    ).rejects.toThrow(/8 mib/i);
  });

  it("removes only the newly uploaded object when the database update fails", async () => {
    const deps = dependencies({ updateError: new Error("update failed") });

    await expect(
      replacePrimaryProductImage(
        { productId, familySlug: "cutters", productSlug: "liston", file: imageFile() },
        { ...deps, createObjectId: () => "new-object" }
      )
    ).rejects.toThrow("update failed");

    expect(deps.storage.remove).toHaveBeenCalledWith(
      `products/${productId}/new-object.png`
    );
    expect(deps.storage.remove).toHaveBeenCalledTimes(1);
  });
});
