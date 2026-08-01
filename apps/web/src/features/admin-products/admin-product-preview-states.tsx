import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import { AdminAlert } from "@/features/admin-primitives";

const disclaimer = "No validation or operation occurred in this static preview.";

function ProductPreviewState({
  title,
  tone = "warning",
  children,
  actions
}: {
  title: string;
  tone?: "neutral" | "warning" | "danger";
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="admin-operational-preview" data-preview-only="true">
      <h2>{title}</h2>
      <AdminAlert tone={tone} title="Preview-only state">{children}</AdminAlert>
      <p>{disclaimer}</p>
      {actions ? <div className="admin-management-actions">{actions}</div> : null}
    </section>
  );
}

export function AdminProductListLoadingPreview() {
  return <ProductPreviewState title="Product-list loading preview">A future live collection may show a loading state.</ProductPreviewState>;
}

export function AdminProductNoMatchesPreview() {
  return <ProductPreviewState title="No-matching-products preview">A future search may return no matching records.</ProductPreviewState>;
}

export function AdminProductsLoadFailurePreview() {
  return <ProductPreviewState title="Product data-load failure preview" tone="danger">A future live request may fail without changing saved records.</ProductPreviewState>;
}

export function AdminProductDuplicateCodePreview() {
  return <ProductPreviewState title="Duplicate-code validation preview" tone="danger">A future backend may reject a product code already assigned to another record.</ProductPreviewState>;
}

export function AdminProductMissingImagePreview() {
  return <ProductPreviewState title="Missing-image validation preview">A future publishing workflow may require a managed main image.</ProductPreviewState>;
}

export function AdminProductTitleWarningPreview() {
  return <ProductPreviewState title="Long-title warning preview">A future editor may request card and mobile-layout review for unusually long names.</ProductPreviewState>;
}

export function AdminProductSensitiveClaimPreview() {
  return <ProductPreviewState title="Sensitive-claim warning preview" tone="danger">A future validation workflow may flag unsupported certification, manufacturing, ownership, award or clinical claims.</ProductPreviewState>;
}

export function AdminProductArchiveConfirmationPreview() {
  return (
    <ProductPreviewState
      title="Archive or delete confirmation preview"
      tone="danger"
      actions={
        <>
          <Button variant="secondary" disabled>Cancel</Button>
          <Button variant="danger" disabled>Archive instead</Button>
        </>
      }
    >
      A future authenticated workflow must explain references and irreversible consequences before deletion.
    </ProductPreviewState>
  );
}

export function AdminProductPublishConfirmationPreview() {
  return (
    <ProductPreviewState
      title="Publish confirmation preview"
      actions={
        <>
          <Button variant="secondary" disabled>Return to review</Button>
          <Button disabled>Publish product</Button>
        </>
      }
    >
      A future authenticated workflow must list affected public locations before publication.
    </ProductPreviewState>
  );
}
