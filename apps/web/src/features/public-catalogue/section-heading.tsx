import type { ReactElement, ReactNode } from "react";
import { Reveal, TextReveal } from "@/features/motion";

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
    ? <TextReveal as="h2" className="public-section-heading__title" id={id} text={title} />
    : <TextReveal as="h3" className="public-section-heading__title" id={id} text={title} />;

  return (
    <Reveal
      className={`public-section-heading public-section-heading--${align}`}
      direction="up"
    >
      <div className="public-section-heading__content">
        {eyebrow ? <p className="public-eyebrow">{eyebrow}</p> : null}
        {heading}
        {copy ? <p className="public-section-heading__copy">{copy}</p> : null}
      </div>
      {action ? <div className="public-section-heading__action">{action}</div> : null}
    </Reveal>
  );
}
