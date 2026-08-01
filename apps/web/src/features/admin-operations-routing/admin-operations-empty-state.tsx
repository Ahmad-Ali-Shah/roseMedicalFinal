import { useId } from "react";

export interface AdminOperationsEmptyStateProps {
  title: string;
  description: string;
  supportingText: string;
}

export function AdminOperationsEmptyState({
  title,
  description,
  supportingText
}: AdminOperationsEmptyStateProps) {
  const headingId = useId();

  return (
    <section
      className="admin-operations-empty-state"
      aria-labelledby={headingId}
    >
      <p className="page-eyebrow">Live records unavailable</p>
      <h2 id={headingId}>{title}</h2>
      <p>{description}</p>
      <p className="admin-operations-empty-state__support">
        {supportingText}
      </p>
    </section>
  );
}
