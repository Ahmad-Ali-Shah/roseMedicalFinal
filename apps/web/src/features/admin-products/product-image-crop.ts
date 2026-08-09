export interface CropRect {
  x: number;
  y: number;
  size: number;
}

export interface DisplayRect {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

export interface CropGeometry {
  sourceWidth: number;
  sourceHeight: number;
  display: DisplayRect;
}

export interface PixelCropRect {
  x: number;
  y: number;
  size: number;
}

export const MIN_CROP_SIZE = 0.1;

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

function cropExtents(size: number, geometry: CropGeometry) {
  const side = size * Math.min(geometry.sourceWidth, geometry.sourceHeight);
  return {
    width: side / geometry.sourceWidth,
    height: side / geometry.sourceHeight
  };
}

export function createCropGeometry(
  naturalWidth: number,
  naturalHeight: number,
  rotation: number
): CropGeometry {
  if (naturalWidth <= 0 || naturalHeight <= 0) {
    throw new Error("Crop geometry requires positive image dimensions.");
  }

  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const rotated90 = normalizedRotation === 90 || normalizedRotation === 270;
  const sourceWidth = rotated90 ? naturalHeight : naturalWidth;
  const sourceHeight = rotated90 ? naturalWidth : naturalHeight;
  const longestSide = Math.max(sourceWidth, sourceHeight);
  const width = sourceWidth / longestSide;
  const height = sourceHeight / longestSide;

  return {
    sourceWidth,
    sourceHeight,
    display: {
      width,
      height,
      offsetX: (1 - width) / 2,
      offsetY: (1 - height) / 2
    }
  };
}

export function clampCrop(next: CropRect, geometry: CropGeometry): CropRect {
  const size = clamp(next.size, MIN_CROP_SIZE, 1);
  const extents = cropExtents(size, geometry);

  return {
    x: clamp(next.x, 0, 1 - extents.width),
    y: clamp(next.y, 0, 1 - extents.height),
    size
  };
}

export function centeredCrop(geometry: CropGeometry, size = 0.8): CropRect {
  const clampedSize = clamp(size, MIN_CROP_SIZE, 1);
  const extents = cropExtents(clampedSize, geometry);
  return {
    x: (1 - extents.width) / 2,
    y: (1 - extents.height) / 2,
    size: clampedSize
  };
}

export function cropToDisplayRect(crop: CropRect, geometry: CropGeometry): DisplayRect {
  const side = crop.size * Math.min(geometry.display.width, geometry.display.height);
  return {
    width: side,
    height: side,
    offsetX: geometry.display.offsetX + crop.x * geometry.display.width,
    offsetY: geometry.display.offsetY + crop.y * geometry.display.height
  };
}

export function cropToSourceRect(crop: CropRect, geometry: CropGeometry): PixelCropRect {
  return {
    x: crop.x * geometry.sourceWidth,
    y: crop.y * geometry.sourceHeight,
    size: crop.size * Math.min(geometry.sourceWidth, geometry.sourceHeight)
  };
}
