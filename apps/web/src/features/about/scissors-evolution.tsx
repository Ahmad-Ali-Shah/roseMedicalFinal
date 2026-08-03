import type { ReactElement } from "react";
import { MediaFrame, Reveal, Stagger, StaggerItem } from "@/features/motion";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";

export const SCISSORS_EVOLUTION_STAGES = [
  {
    number: "01",
    title: "Foundational form",
    copy: "Paired blades and a central pivot established the basic cutting mechanism that still defines surgical scissors."
  },
  {
    number: "02",
    title: "Controlled cutting",
    copy: "Refined joint, handle and blade proportions improved leverage, balance and the control available to the user."
  },
  {
    number: "03",
    title: "Procedure-specific profiles",
    copy: "Straight and curved forms, together with sharp and blunt point combinations, created more specialised working profiles."
  },
  {
    number: "04",
    title: "Material and finish refinement",
    copy: "Edge durability, surface finish and handling became increasingly important parts of instrument specification and selection."
  },
  {
    number: "05",
    title: "Contemporary catalogue selection",
    copy: "Modern procurement distinguishes length, finish, direction and point profile through exact catalogue configurations and codes."
  }
] as const;

export function ScissorsEvolution(): ReactElement {
  return (
    <div className="scissors-evolution" data-scissors-evolution>
      <Reveal direction="up" className="scissors-evolution__introduction">
        <p className="page-eyebrow">Instrument evolution</p>
        <h2>How surgical scissors became more specialised.</h2>
        <p>
          This sequence describes the progression of instrument design, not a Rosa company
          chronology. It highlights how form and specification became more precise for
          professional selection.
        </p>
      </Reveal>

      <div className="scissors-evolution__layout">
        <Reveal direction="up" className="scissors-evolution__media-reveal" delay={0.06}>
          <MediaFrame
            alt="Scissor form and craftsmanship image reserved for final approved photography"
            aspect="portrait"
            tone="mist"
            overlay="soft"
            mediaSlot="about-scissors-evolution"
            className="scissors-evolution__media story-media-frame"
          >
            <ProductMediaPlaceholder
              label="Replaceable scissor evolution image"
              aspect="portrait"
              decorative
              className="story-media-frame__placeholder"
            />
          </MediaFrame>
        </Reveal>

        <Stagger
          as="ol"
          className="scissors-evolution__timeline"
          aria-label="Scissors design evolution"
          interval={0.075}
        >
          {SCISSORS_EVOLUTION_STAGES.map((stage) => (
            <StaggerItem
              as="li"
              key={stage.number}
              className="scissors-evolution__stage"
              data-scissors-evolution-stage={stage.number}
            >
              <span className="scissors-evolution__number" aria-hidden="true">
                {stage.number}
              </span>
              <div>
                <h3>{stage.title}</h3>
                <p>{stage.copy}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
