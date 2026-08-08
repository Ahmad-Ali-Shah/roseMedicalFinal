"use client";

import { useRef, useState, type ChangeEvent, type PointerEvent } from "react";
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

const OUTPUT_SIZE = 1200;
const MIN_CROP_SIZE = 0.15;

function clampCrop(next: CropRect): CropRect {
  const size = Math.min(Math.max(next.size, MIN_CROP_SIZE), 1);
  const x = Math.min(Math.max(next.x, 0), 1 - size);
  const y = Math.min(Math.max(next.y, 0), 1 - size);
  return { x, y, size };
}

export function ProductImageUploadForm({
  productId,
  familySlug,
  productSlug
}: ProductImageUploadFormProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState<CropRect>({ x: 0.1, y: 0.1, size: 0.8 });
  const [dragOrigin, setDragOrigin] = useState<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    setDragOrigin({ startX: event.clientX, startY: event.clientY, origX: crop.x, origY: crop.y });
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragOrigin || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const dx = (event.clientX - dragOrigin.startX) / rect.width;
    const dy = (event.clientY - dragOrigin.startY) / rect.height;
    setCrop((prev) => clampCrop({ x: dragOrigin.origX + dx, y: dragOrigin.origY + dy, size: prev.size }));
  }

  function handlePointerUp() {
    setDragOrigin(null);
  }

  function adjustZoom(delta: number) {
    setCrop((prev) => clampCrop({ ...prev, size: prev.size + delta }));
  }

  function rotateBy(deltaDeg: number) {
    setRotation((prev) => (prev + deltaDeg + 360) % 360);
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
      const rotated90 = rotation === 90 || rotation === 270;
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
          <div
            ref={stageRef}
            className="admin-image-crop-stage"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Selected product image preview"
              className="admin-image-crop-preview"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
            <div
              className="admin-image-crop-box"
              style={{
                left: `${crop.x * 100}%`,
                top: `${crop.y * 100}%`,
                width: `${crop.size * 100}%`,
                height: `${crop.size * 100}%`
              }}
            />
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
