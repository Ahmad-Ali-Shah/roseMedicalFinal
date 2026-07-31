export interface RoutePlaceholderProps {
  eyebrow: string;
  title: string;
  path: string;
  note?: string;
}

export function RoutePlaceholder({ eyebrow, title, path, note = "Layer 0 establishes routing and layout boundaries before detailed design implementation." }: RoutePlaceholderProps) {
  return (
    <section className="route-placeholder" aria-labelledby="route-title">
      <p className="route-eyebrow">{eyebrow}</p>
      <h1 className="route-title" id="route-title">{title}</h1>
      <p className="route-path"><code>{path}</code></p>
      <div className="placeholder-panel" aria-label="Reserved Figma composition area">{note}</div>
    </section>
  );
}
