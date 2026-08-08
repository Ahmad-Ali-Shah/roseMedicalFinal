import { randomUUID } from "node:crypto";
import { FAMILY_SLUGS, type FamilySlug } from "@/features/public-catalogue";

const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const PUBLIC_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const IMAGE_EXTENSION_BY_MIME = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif"
} as const;

type SupportedImageMime = keyof typeof IMAGE_EXTENSION_BY_MIME;

export interface ProductIdentityForMediaWrite {
  id: string;
  dbSlug: string;
  familySlug: string;
  isActive: boolean;
}

export interface PrimaryProductImageRow {
  id: string;
  imagePath: string;
}

export interface ProductMediaWriteRepository {
  findProductIdentity(productId: string): Promise<ProductIdentityForMediaWrite | null>;
  findPrimaryImages(productId: string): Promise<readonly PrimaryProductImageRow[]>;
  updatePrimaryImage(input: {
    imageId: string;
    productId: string;
    imagePath: string;
  }): Promise<void>;
}

export interface ProductMediaStorage {
  upload(input: {
    path: string;
    file: File;
    contentType: SupportedImageMime;
  }): Promise<{ publicUrl: string }>;
  remove(path: string): Promise<void>;
}

export interface ReplacePrimaryProductImageInput {
  productId: string;
  familySlug: string;
  productSlug: string;
  file: File;
}

export interface ReplacePrimaryProductImageDependencies {
  repository: ProductMediaWriteRepository;
  storage: ProductMediaStorage;
  createObjectId?: () => string;
}

function isFamilySlug(value: string): value is FamilySlug {
  return (FAMILY_SLUGS as readonly string[]).includes(value);
}

function validateInput(input: ReplacePrimaryProductImageInput): {
  familySlug: FamilySlug;
  productSlug: string;
  contentType: SupportedImageMime;
  extension: string;
} {
  if (!UUID_PATTERN.test(input.productId)) {
    throw new Error("A valid product ID is required.");
  }
  if (!isFamilySlug(input.familySlug)) {
    throw new Error("A valid product family is required.");
  }
  if (!PUBLIC_SLUG_PATTERN.test(input.productSlug)) {
    throw new Error("A valid public product slug is required.");
  }
  if (!(input.file instanceof File) || input.file.size <= 0) {
    throw new Error("Choose a non-empty product image.");
  }
  if (input.file.size > MAX_IMAGE_BYTES) {
    throw new Error("Product images must be 3 MiB or smaller.");
  }

  const contentType = input.file.type as SupportedImageMime;
  const extension = IMAGE_EXTENSION_BY_MIME[contentType];
  if (!extension) {
    throw new Error("Unsupported product image type.");
  }

  return {
    familySlug: input.familySlug,
    productSlug: input.productSlug,
    contentType,
    extension
  };
}

export async function replacePrimaryProductImage(
  input: ReplacePrimaryProductImageInput,
  dependencies: ReplacePrimaryProductImageDependencies
): Promise<{
  publicUrl: string;
  storagePath: string;
  previousImagePath: string;
}> {
  const validated = validateInput(input);
  const identity = await dependencies.repository.findProductIdentity(input.productId);
  const expectedDbSlug = `${validated.familySlug}-${validated.productSlug}`;

  if (
    !identity ||
    !identity.isActive ||
    identity.id !== input.productId ||
    identity.familySlug !== validated.familySlug ||
    identity.dbSlug !== expectedDbSlug
  ) {
    throw new Error("Product identity mismatch; media replacement was not started.");
  }

  const primaryImages = await dependencies.repository.findPrimaryImages(input.productId);
  if (primaryImages.length !== 1) {
    throw new Error(
      `Expected exactly one primary image row before replacement; found ${primaryImages.length}.`
    );
  }

  const primaryImage = primaryImages[0]!;
  const objectId = (dependencies.createObjectId ?? randomUUID)();
  const storagePath = `products/${input.productId}/${objectId}.${validated.extension}`;
  const uploaded = await dependencies.storage.upload({
    path: storagePath,
    file: input.file,
    contentType: validated.contentType
  });

  try {
    await dependencies.repository.updatePrimaryImage({
      imageId: primaryImage.id,
      productId: input.productId,
      imagePath: uploaded.publicUrl
    });
  } catch (error) {
    try {
      await dependencies.storage.remove(storagePath);
    } catch (cleanupError) {
      console.error(
        "Product media compensation cleanup failed:",
        cleanupError
      );
    }
    throw error;
  }

  return {
    publicUrl: uploaded.publicUrl,
    storagePath,
    previousImagePath: primaryImage.imagePath
  };
}
