import type { ReactElement } from "react";

export interface ProductMediaPlaceholderProps {
  label: string;
  decorative?: boolean;
  aspect?: "landscape" | "portrait" | "square";
  className?: string;
}

export function ProductMediaPlaceholder({
  label,
  decorative = false,
  aspect = "landscape",
  className = ""
}: ProductMediaPlaceholderProps): ReactElement {
  return (
    <div
      className={`product-media-placeholder product-media-placeholder--${aspect} ${className}`.trim()}
      aria-hidden={decorative ? "true" : undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
    >
      <span className="product-media-placeholder__axis" aria-hidden="true" />
      <span className="product-media-placeholder__instrument" aria-hidden="true" />
      {!decorative ? <span className="product-media-placeholder__label">{label}</span> : null}
    </div>
  );
}
