import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { SectionHeading } from "@/features/public-catalogue";
import type { HomeProcurementModel } from "../homepage.data";

export function ProcurementSupport({ model }: { model: HomeProcurementModel }): ReactElement {
  return (
    <Section tone="paper" data-section="procurement-support" aria-labelledby="procurement-support-title">
      <Container size="wide">
        <SectionHeading
          level={2}
          eyebrow={model.eyebrow}
          title={model.title}
          copy={model.copy}
        />
        <div className="procurement-editorial">
          <div className="procurement-editorial__visual" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <div className="procurement-editorial__copy">
            <p className="public-eyebrow">{model.detailEyebrow}</p>
            <h3 className="procurement-editorial__title">{model.detailTitle}</h3>
            <p className="procurement-editorial__body">{model.detailCopy}</p>
            <ol className="procurement-steps">
              {model.steps.map((step, index) => (
                <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
