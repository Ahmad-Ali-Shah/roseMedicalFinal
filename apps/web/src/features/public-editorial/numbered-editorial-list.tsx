import type { ReactElement } from "react";

export interface NumberedEditorialItem {
  sequence: string;
  title: string;
  description?: string;
}

export function NumberedEditorialList({
  items,
  ariaLabel,
  kind,
  className = ""
}: {
  items: readonly NumberedEditorialItem[];
  ariaLabel: string;
  kind: string;
  className?: string;
}): ReactElement {
  return (
    <ol
      className={`numbered-editorial-list ${className}`.trim()}
      aria-label={ariaLabel}
    >
      {items.map((item) => (
        <li
          key={`${item.sequence}-${item.title}`}
          data-editorial-item={item.sequence}
          data-editorial-kind={kind}
        >
          <span className="numbered-editorial-list__sequence" aria-hidden="true">
            {item.sequence}
          </span>
          <div className="numbered-editorial-list__content">
            <h3>{item.title}</h3>
            {item.description ? <p>{item.description}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
