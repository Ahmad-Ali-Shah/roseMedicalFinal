import { describe, expect, it } from "vitest";
import {
  centeredCrop,
  clampCrop,
  createCropGeometry,
  cropToDisplayRect,
  cropToSourceRect
} from "@/features/admin-products/product-image-crop";

describe("admin product image crop geometry", () => {
  it("centers a square crop inside a landscape image", () => {
    const geometry = createCropGeometry(2400, 1200, 0);
    const crop = centeredCrop(geometry, 0.8);
    const display = cropToDisplayRect(crop, geometry);

    expect(geometry.display).toEqual({ width: 1, height: 0.5, offsetX: 0, offsetY: 0.25 });
    expect(crop.x).toBeCloseTo(0.3);
    expect(crop.y).toBeCloseTo(0.1);
    expect(crop.size).toBe(0.8);
    expect(display.width).toBeCloseTo(0.4);
    expect(display.height).toBeCloseTo(0.4);
    expect(display.offsetX).toBeCloseTo(0.3);
    expect(display.offsetY).toBeCloseTo(0.3);
  });

  it("keeps portrait and rotated selections square", () => {
    const portrait = createCropGeometry(1200, 2400, 0);
    const rotated = createCropGeometry(2400, 1200, 90);

    for (const geometry of [portrait, rotated]) {
      const display = cropToDisplayRect(centeredCrop(geometry, 0.8), geometry);
      expect(display.width).toBeCloseTo(display.height);
      expect(display.offsetX).toBeCloseTo(0.3);
      expect(display.offsetY).toBeCloseTo(0.3);
    }
  });

  it("clamps movement against the true rectangular source extents", () => {
    const geometry = createCropGeometry(2400, 1200, 0);
    const crop = clampCrop({ x: 0.9, y: 0.9, size: 0.8 }, geometry);
    expect(crop.x).toBeCloseTo(0.6);
    expect(crop.y).toBeCloseTo(0.2);
    expect(crop.size).toBe(0.8);
  });

  it("exports the same square represented by the display selection", () => {
    const geometry = createCropGeometry(2400, 1200, 0);
    const source = cropToSourceRect(centeredCrop(geometry, 0.8), geometry);

    expect(source.x).toBeCloseTo(720);
    expect(source.y).toBeCloseTo(120);
    expect(source.size).toBeCloseTo(960);
  });
});
