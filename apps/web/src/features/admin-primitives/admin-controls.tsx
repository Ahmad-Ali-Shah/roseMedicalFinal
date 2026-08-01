import { useId, type ReactNode } from "react";
import { Button } from "@/components/ui";

export interface AdminToolbarProps {
  label: string;
  children: ReactNode;
}

export function AdminToolbar({ label, children }: AdminToolbarProps) {
  return <section className="admin-toolbar" aria-label={label}>{children}</section>;
}

export interface AdminSearchPreviewProps {
  id?: string;
  label: string;
  placeholder?: string;
}

export function AdminSearchPreview({ id, label, placeholder }: AdminSearchPreviewProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  return (
    <div className="admin-control-preview">
      <label htmlFor={controlId}>{label}</label>
      <input
        id={controlId}
        type="search"
        value=""
        placeholder={placeholder}
        readOnly
        aria-readonly="true"
      />
      <p className="field__hint">Search preview — not connected</p>
    </div>
  );
}

export interface AdminFilterPreviewProps {
  id: string;
  label: string;
  options: readonly string[];
}

export function AdminFilterPreview({ id, label, options }: AdminFilterPreviewProps) {
  return (
    <div className="admin-control-preview">
      <label htmlFor={id}>{label}</label>
      <select id={id} disabled defaultValue={options[0] ?? ""}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </div>
  );
}

export interface AdminPaginationPreviewProps {
  label?: string;
}

export function AdminPaginationPreview({ label = "Collection pagination" }: AdminPaginationPreviewProps) {
  return (
    <section className="admin-pagination-preview" aria-label={label}>
      <Button size="small" variant="secondary" disabled>Previous</Button>
      <p>Pagination preview — live collection unavailable</p>
      <Button size="small" variant="secondary" disabled>Next</Button>
    </section>
  );
}
