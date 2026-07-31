import type { ReactElement, ReactNode } from "react";

export interface SectionHeadingProps {
  id?: string;
  level: 2 | 3;
  eyebrow?: string;
  title: string;
  copy?: string;
  action?: ReactNode;
  align?: "start" | "center";
}

export function SectionHeading({
  id,
  level,
  eyebrow,
  title,
  copy,
  action,
  align = "start"
}: SectionHeadingProps): ReactElement {
  const heading = level === 2
    ? <h2 className="public-section-heading__title" id={id}>{title}</h2>
    : <h3 className="public-section-heading__title" id={id}>{title}</h3>;

  return (
    <div className={`public-section-heading public-section-heading--${align}`}>
      <div className="public-section-heading__content">
        {eyebrow ? <p className="public-eyebrow">{eyebrow}</p> : null}
        {heading}
        {copy ? <p className="public-section-heading__copy">{copy}</p> : null}
      </div>
      {action ? <div className="public-section-heading__action">{action}</div> : null}
    </div>
  );
}
