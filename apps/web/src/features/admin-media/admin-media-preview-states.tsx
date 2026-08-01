import type { ReactNode } from "react";
import { AdminAlert } from "@/features/admin-primitives";

function MediaPreview({
  title,
  children,
  tone = "warning"
}: {
  title: string;
  children: ReactNode;
  tone?: "neutral" | "warning" | "danger";
}) {
  return (
    <section className="admin-operational-preview" data-preview-only="true">
      <h2>{title}</h2>
      <AdminAlert tone={tone} title="Preview-only state">{children}</AdminAlert>
      <p>No upload, validation or replacement occurred in this static preview.</p>
    </section>
  );
}

export function AdminMediaUploadSelectionPreview() {
  return <MediaPreview title="Media upload-selection preview">A future owner may choose a supported file after authentication and storage integration exist.</MediaPreview>;
}

export function AdminMediaUnsupportedFormatPreview() {
  return <MediaPreview title="Unsupported-format warning preview" tone="danger">A future upload validator may reject an unsupported format before storage.</MediaPreview>;
}

export function AdminMediaPossibleDuplicatePreview() {
  return <MediaPreview title="Possible-duplicate warning preview">A future media service may ask the owner to review a possible duplicate.</MediaPreview>;
}

export function AdminMediaProtectedAssetPreview() {
  return <MediaPreview title="Protected-asset warning preview" tone="danger">A future media manager must prevent ordinary deletion or replacement of protected ROSA identity assets.</MediaPreview>;
}

export function AdminMediaImageInUsePreview() {
  return <MediaPreview title="Image-in-use warning preview">A future replacement workflow must identify affected public locations before confirmation.</MediaPreview>;
}
