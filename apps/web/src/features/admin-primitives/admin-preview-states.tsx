import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import { AdminAlert } from "./admin-feedback";

function PreviewSection({ title, children, busy }: { title: string; children: ReactNode; busy?: boolean }) {
  return (
    <section className="admin-preview-state" data-preview-only="true" aria-busy={busy || undefined}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function AdminLoadingPreview({ label }: { label: string }) {
  return (
    <PreviewSection title={`${label} loading preview`} busy>
      <p>Loading indicators appear while a live collection request is pending.</p>
      <div className="admin-preview-skeletons" aria-hidden="true"><span /><span /><span /></div>
    </PreviewSection>
  );
}

export function AdminEmptyState({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <PreviewSection title={title}>
      <p>{description}</p>
      {children}
    </PreviewSection>
  );
}

export function AdminErrorPreview({ title }: { title: string }) {
  return (
    <PreviewSection title={title}>
      <AdminAlert tone="danger" title="Data-load failure preview">
        No live request was attempted in this static state.
      </AdminAlert>
    </PreviewSection>
  );
}

export function AdminUnauthorizedPreview() {
  return (
    <PreviewSection title="Unauthorized-session preview">
      <AdminAlert tone="warning" title="Owner authentication required">
        No session or route protection is represented.
      </AdminAlert>
    </PreviewSection>
  );
}

export interface AdminConfirmationResult {
  reference?: string;
  message?: string;
}

export interface AdminConfirmationPreviewProps {
  kind: "save" | "delete" | "publish";
  result?: AdminConfirmationResult;
}

export function AdminConfirmationPreview({ kind, result }: AdminConfirmationPreviewProps) {
  return (
    <PreviewSection title={`${kind} confirmation preview`}>
      <h3>Confirmation details appear after a successful operation.</h3>
      <p>{result?.message ?? "No change has been made in this static preview."}</p>
      {result?.reference ? <p>Reference: {result.reference}</p> : null}
      <Button disabled>{kind === "delete" ? "Confirm deletion" : kind === "publish" ? "Confirm publication" : "Confirm save"}</Button>
    </PreviewSection>
  );
}
