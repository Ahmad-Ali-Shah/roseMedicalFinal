"use client";

import { useCallback, useEffect, useRef, useState, type ChangeEvent, type PointerEvent } from "react";
import { Button } from "@/components/ui";
import { uploadProductMedia } from "./actions";

interface ProductImageUploadFormProps {
  productId: string;
  familySlug: string;
  productSlug: string;
}

interface CropRect {
  x: number;
  y: number;
  size: number;
}

interface DisplayRect {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

const OUTPUT_SIZE = 1200;
const MIN_CROP_SIZE = 0.1;

function clampCrop(next: CropRect): CropRect {
  const size = Math.min(Math.max(next.size, MIN_CROP_SIZE), 1);
  const x = Math.min(Math.max(next.x, 0), 1 - size);
  const y = Math.min(Math.max(next.y, 0), 1 - size);
  return { x, y, size };
}

function computeDisplayRect(naturalW: number, naturalH: number, rotated90: boolean): DisplayRect {
  const w0 = naturalW >= naturalH ? 1 : naturalW / naturalH;
  const h0 = naturalW >= naturalH ? naturalH / naturalW : 1;
  const width = rotated90 ? h0 : w0;
  const height = rotated90 ? w0 : h0;
  return {
    width,
    height,
    offsetX: (1 - width) / 2,
    offsetY: (1 - height) / 2
  };
}

export function ProductImageUploadForm({
  productId,
  familySlug,
  productSlug
}: ProductImageUploadFormProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState<CropRect>({ x: 0.1, y: 0.1, size: 0.8 });
  const [display, setDisplay] = useState<DisplayRect>({ width: 1, height: 1, offsetX: 0, offsetY: 0 });
  const [dragMode, setDragMode] = useState<"move" | "resize" | null>(null);
  const [dragOrigin, setDragOrigin] = useState<{ startX: number; startY: number; orig: CropRect } | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const rotated90 = rotation === 90 || rotation === 270;

  const recomputeDisplay = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth || !img.naturalHeight) return;
    setDisplay(computeDisplayRect(img.naturalWidth, img.naturalHeight, rotated90));
  }, [rotated90]);

  useEffect(() => {
    recomputeDisplay();
  }, [recomputeDisplay]);

  function resetTool() {
    setRotation(0);
    setCrop({ x: 0.1, y: 0.1, size: 0.8 });
    setError(null);
    setSuccess(false);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    resetTool();
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleImageLoad() {
    recomputeDisplay();
  }

  function handleMoveStart(event: PointerEvent<HTMLDivElement>) {
    setDragMode("move");
    setDragOrigin({ startX: event.clientX, startY: event.clientY, orig: crop });
    event.currentTarget.setPointerCapture(event.pointerId);
    event.stopPropagation();
  }

  function handleResizeStart(event: PointerEvent<HTMLDivElement>) {
    setDragMode("resize");
    setDragOrigin({ startX: event.clientX, startY: event.clientY, orig: crop });
    event.currentTarget.setPointerCapture(event.pointerId);
    event.stopPropagation();
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragOrigin || !dragMode || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const dxImg = (event.clientX - dragOrigin.startX) / (rect.width * display.width);
    const dyImg = (event.clientY - dragOrigin.startY) / (rect.height * display.height);

    if (dragMode === "move") {
      setCrop(clampCrop({ x: dragOrigin.orig.x + dxImg, y: dragOrigin.orig.y + dyImg, size: dragOrigin.orig.size }));
    } else {
      const delta = Math.max(dxImg, dyImg);
      setCrop(clampCrop({ x: dragOrigin.orig.x, y: dragOrigin.orig.y, size: dragOrigin.orig.size + delta }));
    }
  }

  function handlePointerEnd() {
    setDragOrigin(null);
    setDragMode(null);
  }

  function adjustZoom(delta: number) {
    setCrop((prev) => clampCrop({ ...prev, size: prev.size + delta }));
  }

  function rotateBy(deltaDeg: number) {
    setRotation((prev) => (prev + deltaDeg + 360) % 360);
    setCrop({ x: 0.1, y: 0.1, size: 0.8 });
  }

  function handleCancel() {
    setImageSrc(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSave() {
    const img = imgRef.current;
    if (!img) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const naturalW = img.naturalWidth;
      const naturalH = img.naturalHeight;
      const sourceW = rotated90 ? naturalH : naturalW;
      const sourceH = rotated90 ? naturalW : naturalH;

      const rotatedCanvas = document.createElement("canvas");
      rotatedCanvas.width = sourceW;
      rotatedCanvas.height = sourceH;
      const rotatedCtx = rotatedCanvas.getContext("2d");
      if (!rotatedCtx) throw new Error("This browser does not support canvas image processing.");
      rotatedCtx.translate(sourceW / 2, sourceH / 2);
      rotatedCtx.rotate((rotation * Math.PI) / 180);
      rotatedCtx.drawImage(img, -naturalW / 2, -naturalH / 2);

      const cropSizePx = crop.size * Math.min(sourceW, sourceH);
      const cropXPx = crop.x * sourceW;
      const cropYPx = crop.y * sourceH;

      const outputCanvas = document.createElement("canvas");
      outputCanvas.width = OUTPUT_SIZE;
      outputCanvas.height = OUTPUT_SIZE;
      const outputCtx = outputCanvas.getContext("2d");
      if (!outputCtx) throw new Error("This browser does not support canvas image processing.");
      outputCtx.drawImage(
        rotatedCanvas,
        cropXPx,
        cropYPx,
        cropSizePx,
        cropSizePx,
        0,
        0,
        OUTPUT_SIZE,
        OUTPUT_SIZE
      );

      const blob: Blob = await new Promise((resolve, reject) => {
        outputCanvas.toBlob(
          (result) => (result ? resolve(result) : reject(new Error("The cropped image could not be processed."))),
          "image/webp",
          0.92
        );
      });

      const file = new File([blob], `${productSlug}.webp`, { type: "image/webp" });
      const formData = new FormData();
      formData.set("product_id", productId);
      formData.set("family_slug", familySlug);
      formData.set("product_slug", productSlug);
      formData.set("file", file);

      await uploadProductMedia(formData);

      setSuccess(true);
      setImageSrc(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The image could not be saved. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const boxStyle = {
    left: `${(display.offsetX + crop.x * display.width) * 100}%`,
    top: `${(display.offsetY + crop.y * display.height) * 100}%`,
    width: `${crop.size * display.width * 100}%`,
    height: `${crop.size * display.height * 100}%`
  };

  return (
    <div className="admin-media-upload-form">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileChange}
      />

      {imageSrc && (
        <div className="admin-image-crop-tool">
          <div ref={stageRef} className="admin-image-crop-stage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Selected product image preview"
              className="admin-image-crop-preview"
              style={{ transform: `rotate(${rotation}deg)` }}
              onLoad={handleImageLoad}
              draggable={false}
            />
            <div
              className="admin-image-crop-box"
              style={boxStyle}
              onPointerDown={handleMoveStart}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
            >
              <div className="admin-image-crop-grid" />
              <div
                className="admin-image-crop-handle"
                onPointerDown={handleResizeStart}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnd}
                onPointerCancel={handlePointerEnd}
              />
            </div>
          </div>

          <div className="admin-image-crop-controls">
            <Button type="button" variant="secondary" onClick={() => rotateBy(-90)}>Rotate left</Button>
            <Button type="button" variant="secondary" onClick={() => rotateBy(90)}>Rotate right</Button>
            <Button type="button" variant="secondary" onClick={() => adjustZoom(-0.05)}>Zoom in</Button>
            <Button type="button" variant="secondary" onClick={() => adjustZoom(0.05)}>Zoom out</Button>
          </div>

          <div className="admin-management-actions">
            <Button type="button" onClick={handleSave} disabled={saving}>
              {saving ? "Saving\u2026" : "Save cropped image"}
            </Button>
            <Button type="button" variant="quiet" onClick={handleCancel} disabled={saving}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {error && (
        <p className="admin-image-crop-error" role="alert">
          {error}
        </p>
      )}
      {success && <p className="admin-image-crop-success">Image saved.</p>}
    </div>
  );
}
