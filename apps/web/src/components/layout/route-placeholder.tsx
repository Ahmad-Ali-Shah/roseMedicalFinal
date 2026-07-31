import { ButtonLink, Card, Status } from "@/components/ui";
import { Container, Grid, Section, Stack } from "@/components/layout";

export interface RoutePlaceholderProps {
  eyebrow: string;
  title: string;
  path: string;
  note?: string;
}

export function RoutePlaceholder({ eyebrow, title, path, note = "This route now uses the shared Rosa layout and design foundations. Detailed Figma composition arrives in the next static-page layer." }: RoutePlaceholderProps) {
  const isAdmin = path.startsWith("/admin");
  return (
    <Section className="route-placeholder" tone="warm" aria-labelledby="route-title">
      <Container size="wide">
        <Stack gap="2rem">
          <div>
            <p className="route-eyebrow">{eyebrow}</p>
            <h1 className="route-title" id="route-title">{title}</h1>
            <p className="route-path"><code>{path}</code></p>
          </div>
          <Grid columns={2}>
            <div className="placeholder-panel" aria-label="Reserved Figma composition area">{note}</div>
            <Stack>
              <Card>
                <Stack>
                  <Status tone={isAdmin ? "review" : "neutral"}>{isAdmin ? "Admin foundation" : "Public foundation"}</Status>
                  <h2>Stable structure before page detail.</h2>
                  <p>Containers, section rhythm, responsive grids, controls, surfaces, focus states, navigation and footer behavior are now shared across routes.</p>
                </Stack>
              </Card>
              <Card tone="mist">
                <Stack>
                  <p className="route-eyebrow">Next layer</p>
                  <p>Static Figma sections and neutral media placeholders will replace this foundation preview route by route.</p>
                  <div className="cluster">
                    <ButtonLink href={isAdmin ? "/admin" : "/products"}>Continue</ButtonLink>
                    {!isAdmin && <ButtonLink href="/request-quotation" variant="secondary">Request a quote</ButtonLink>}
                  </div>
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Stack>
      </Container>
    </Section>
  );
}
