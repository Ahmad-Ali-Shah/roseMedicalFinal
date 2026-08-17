import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { Reveal, Stagger, StaggerItem } from "@/features/motion";
import type { AboutComplianceItem, AboutPageModel } from "../about.data";

function ComplianceIcon({ id }: { id: AboutComplianceItem["id"] }): ReactElement {
  const common = {
    width: 34,
    height: 34,
    viewBox: "0 0 34 34",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
  };

  switch (id) {
    case "regulations":
      return (
        <svg {...common}>
          <path d="M9 5.5h13l4 4v19H9z" />
          <path d="M22 5.5v5h5M12.5 15h10M12.5 19h8M12.5 23h7" />
        </svg>
      );
    case "legal-system":
      return (
        <svg {...common}>
          <path d="M17 5v22M9 9h16M12 9l-5 8h10zM22 9l-5 8h10zM11 27h12" />
        </svg>
      );
    case "standards":
      return (
        <svg {...common}>
          <rect x="7" y="5.5" width="20" height="23" rx="2" />
          <path d="m11 12 2 2 4-4M18.5 13h5M11 20h12M11 24h9" />
        </svg>
      );
    case "law":
      return (
        <svg {...common}>
          <path d="m8 12 9-6 4 6-9 6zM18.5 18.5l7.5 7.5M7 27h15" />
        </svg>
      );
    case "rules":
      return (
        <svg {...common}>
          <rect x="7" y="6" width="20" height="22" rx="2" />
          <path d="M11 12h3M17 12h6M11 17h3M17 17h6M11 22h3M17 22h6" />
        </svg>
      );
    case "requirements":
      return (
        <svg {...common}>
          <path d="M10 5.5h14v23H10z" />
          <path d="m13 12 1.8 1.8 3.4-3.8M19.5 13h2.5M13 19h9M13 23h7" />
        </svg>
      );
  }
}

export function AboutCompliance({
  model
}: {
  model: AboutPageModel["compliance"];
}): ReactElement {
  return (
    <Section
      className="about-client-compliance"
      tone="paper"
      data-section="about-client-compliance"
      aria-labelledby="about-client-compliance-title"
    >
      <Container size="wide">
        <Reveal direction="up">
          <h2 id="about-client-compliance-title">{model.title}</h2>
        </Reveal>
        <div className="about-client-compliance__sequence">
          <span className="about-client-compliance__connector" aria-hidden="true" />
          <Stagger as="ul" className="about-client-compliance__grid" interval={0.055}>
            {model.items.map((item) => (
              <StaggerItem as="li" key={item.id}>
                <div className="about-client-compliance__item" data-about-compliance-item={item.id}>
                  <span className="about-client-compliance__icon" aria-hidden="true">
                    <ComplianceIcon id={item.id} />
                  </span>
                  <span>{item.label}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
