import Link from "next/link";
import type { Route } from "next";

export interface AdminStatProps {
  label: string;
  value: string | number;
  href?: Route<string>;
  note?: string;
}

export function AdminStat({ label, value, href, note }: AdminStatProps) {
  const content = (
    <>
      <span className="admin-stat__label">{label}</span>
      <strong className="admin-stat__value">{value}</strong>
      {note ? <span className="admin-stat__note">{note}</span> : null}
    </>
  );

  return href ? (
    <Link className="admin-stat" href={href}>{content}</Link>
  ) : (
    <div className="admin-stat">{content}</div>
  );
}

export function AdminUnresolvedMetric({ label }: { label: string }) {
  return (
    <div className="admin-unresolved-metric">
      <span className="admin-unresolved-metric__label">{label}</span>
      <strong>Awaiting live data</strong>
    </div>
  );
}
