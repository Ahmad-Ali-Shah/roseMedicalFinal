# Theme and Design Tokens

## Compact token summary

### Product tone

Rosa is a professional medical-instrument procurement brand. The visual system is editorial, restrained, precise, warm-neutral, and materially grounded. It must not read as generic SaaS, playful consumer commerce, neon tech, or an effects showcase.

### Color palette

| Token | Value | Use |
|---|---:|---|
| `--color-rosa-red` | `#e00815` | Primary action and brand signal |
| `--color-rosa-red-dark` | `#b9000b` | Hover/deeper brand accent |
| `--color-ink` | `#191917` | Primary copy and dark surfaces |
| `--color-ink-soft` | `#2d2d2a` | Secondary dark tone |
| `--color-warm-white` | `#f9f7f2` | Page background |
| `--color-paper` | `#ffffff` | Cards and sheets |
| `--color-mist` | `#f1f1ee` | Quiet surface |
| `--color-steel` | `#646b70` | Muted/interface text |
| `--color-border` | `#d7d7d1` | Hairlines and structure |
| success/warning/danger | green, amber, red surfaces | Semantic feedback only |

### Typography

- Editorial/display: Lora via `--font-editorial`; used for large page and section statements.
- Interface/body: Inter via `--font-interface`; used for navigation, controls, technical content, labels, and body copy.
- Display weight is generally 400 with tight line-height; interface labels are compact, bold, and often uppercase with tracking.

### Layout and spacing

- Containers: 80rem wide, 72rem standard, 46rem reading.
- Page gutter: `clamp(1.25rem, 4vw, 5rem)`.
- Spacing scale: 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4rem.
- Section rhythm: `clamp(4.5rem, 9vw, 8rem)`.
- Key responsive thresholds: 36rem, 44rem, 48rem, 56rem, 64rem, and 70rem; additional legacy/public thresholds at 520, 640, 700, 720, 900, and 960px.

### Shape and depth

- Controls: 0.25rem radius.
- Surfaces: 0.125rem radius.
- Depth is restrained: one lifted shadow `0 1.25rem 3.5rem rgb(25 25 23 / 0.08)`, hairline borders, paper stacking, and small transforms.
- Avoid pill-heavy layouts except compact semantic status chips.

### Motion contract

- Micro 160ms, component 280ms, section 580ms, hero 960ms.
- Standard ease `cubic-bezier(0.22, 1, 0.36, 1)`; emphasized ease `cubic-bezier(0.16, 1, 0.3, 1)`.
- Travel: 12px mobile, 24px desktop, 36px hero maximum.
- Preferred properties: opacity and transform, with restrained blur only during entrances.
- Motion hierarchy: hero sequence > section entrances > hover/focus micro-interactions.
- Reduced motion must render all content immediately in its settled state; coarse pointers remove magnetic, tilt, and spotlight tracking.
- No persistent decorative loops, full-page smooth scrolling, WebGL, GSAP, Three.js, Lenis, glitch, or neon effects.

### Framework and CSS architecture

- Next.js 16 App Router, React 19, TypeScript.
- Tailwind CSS 4 is available through PostCSS, but existing public presentation is primarily Rosa-owned global CSS.
- Motion for React `motion@12.42.2` is the sole animation runtime.
- Imported F7 stylesheets own premium homepage/product/story/conversion presentation, with `f7-premium-polish.css` deliberately last in the cascade.

## Raw source dumps

### `apps/web/src/styles/tokens.css`

```css
:root {
  --color-rosa-red: #e00815;
  --color-rosa-red-dark: #b9000b;
  --color-ink: #191917;
  --color-ink-soft: #2d2d2a;
  --color-warm-white: #f9f7f2;
  --color-paper: #ffffff;
  --color-mist: #f1f1ee;
  --color-steel: #646b70;
  --color-border: #d7d7d1;
  --color-success: #1f6b45;
  --color-success-surface: #e9f5ed;
  --color-warning: #9a5b00;
  --color-warning-surface: #fff5df;
  --color-danger-surface: #fff0f1;

  --font-editorial: var(--font-lora), Georgia, serif;
  --font-interface: var(--font-inter), Arial, sans-serif;

  --container-wide: 80rem;
  --container-standard: 72rem;
  --container-reading: 46rem;
  --page-gutter: clamp(1.25rem, 4vw, 5rem);

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-section: clamp(4.5rem, 9vw, 8rem);

  --radius-control: 0.25rem;
  --radius-surface: 0.125rem;
  --shadow-lifted: 0 1.25rem 3.5rem rgb(25 25 23 / 0.08);

  --motion-micro: 160ms;
  --motion-component: 280ms;
  --motion-section: 580ms;
  --motion-hero: 960ms;
  --motion-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --motion-ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1);
  --motion-distance: 1.5rem;
  --motion-distance-mobile: 0.75rem;
  --transition-fast: var(--motion-micro) var(--motion-ease);
}

```

### `apps/web/src/styles/base.css`

```css
* { box-sizing: border-box; }
html { background: var(--color-warm-white); color: var(--color-ink); scroll-behavior: smooth; }
body { margin: 0; min-width: 20rem; background: var(--color-warm-white); color: var(--color-ink); font-family: var(--font-interface); line-height: 1.55; text-rendering: optimizeLegibility; }
a { color: inherit; }
img, svg { display: block; max-width: 100%; }
button, input, textarea, select { font: inherit; }
button { color: inherit; }
h1, h2, h3, p { margin-block-start: 0; }
h1, h2, h3 { text-wrap: balance; }
p { text-wrap: pretty; }
code { font-size: 0.9em; }
::selection { background: color-mix(in srgb, var(--color-rosa-red) 22%, white); }
:focus-visible { outline: 3px solid color-mix(in srgb, var(--color-rosa-red) 55%, white); outline-offset: 3px; }
.skip-link { position: fixed; inset: 1rem auto auto 1rem; z-index: 200; transform: translateY(-220%); border: 1px solid var(--color-ink); background: var(--color-paper); padding: 0.75rem 1rem; }
.skip-link:focus { transform: translateY(0); }
.visually-hidden { position: absolute !important; width: 1px !important; height: 1px !important; padding: 0 !important; margin: -1px !important; overflow: hidden !important; clip: rect(0, 0, 0, 0) !important; white-space: nowrap !important; border: 0 !important; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
}

```

### `apps/web/src/styles/components.css`

```css
.button { min-height: 2.875rem; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); border: 1px solid transparent; border-radius: var(--radius-control); padding: 0.72rem 1.1rem; font-weight: 750; line-height: 1; text-decoration: none; cursor: pointer; transition: background-color var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast), transform var(--transition-fast); }
.button:hover { transform: translateY(-1px); }
.button--primary { border-color: var(--color-rosa-red); background: var(--color-rosa-red); color: white; }
.button--primary:hover { border-color: var(--color-rosa-red-dark); background: var(--color-rosa-red-dark); }
.button--secondary { border-color: var(--color-ink); background: transparent; color: var(--color-ink); }
.button--secondary:hover { background: var(--color-ink); color: white; }
.button--quiet { background: transparent; color: var(--color-ink); }
.button--danger { border-color: var(--color-rosa-red); background: var(--color-danger-surface); color: var(--color-rosa-red-dark); }
.button--small { min-height: 2.5rem; padding: 0.58rem 0.9rem; font-size: 0.86rem; }
.button[disabled], .button[aria-disabled="true"] { cursor: not-allowed; opacity: 0.5; transform: none; }

.field { display: grid; gap: var(--space-2); }
.field__label { font-size: 0.76rem; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; }
.field__control { width: 100%; min-height: 3rem; border: 1px solid var(--color-border); border-radius: var(--radius-control); background: var(--color-paper); color: var(--color-ink); padding: 0.75rem 0.9rem; }
textarea.field__control { min-height: 8rem; resize: vertical; }
.field__control:hover { border-color: var(--color-steel); }
.field__control:focus { border-color: var(--color-rosa-red); outline: 2px solid color-mix(in srgb, var(--color-rosa-red) 18%, transparent); outline-offset: 0; }
.field__control[aria-invalid="true"] { border-color: var(--color-rosa-red); background: var(--color-danger-surface); }
.field__hint, .field__error { margin: 0; font-size: 0.82rem; }
.field__hint { color: var(--color-steel); }
.field__error { color: var(--color-rosa-red-dark); font-weight: 650; }

.card { border: 1px solid var(--color-border); border-radius: var(--radius-surface); background: var(--color-paper); padding: var(--space-5); }
.card--mist { background: var(--color-mist); }
.card--dark { border-color: var(--color-ink); background: var(--color-ink); color: var(--color-paper); }
.card--interactive { transition: border-color var(--transition-fast), transform var(--transition-fast); }
.card--interactive:hover { border-color: var(--color-ink); transform: translateY(-2px); }
.status { display: inline-flex; align-items: center; width: fit-content; min-height: 1.75rem; border-radius: 999px; padding: 0.3rem 0.62rem; font-size: 0.72rem; font-weight: 800; }
.status--neutral { background: var(--color-mist); color: var(--color-ink); }
.status--review { background: var(--color-warning-surface); color: var(--color-warning); }
.status--ready, .status--published { background: var(--color-success-surface); color: var(--color-success); }
.status--danger { background: var(--color-danger-surface); color: var(--color-rosa-red-dark); }
.alert { border: 1px solid var(--color-border); border-radius: var(--radius-surface); background: var(--color-paper); padding: var(--space-5); }
.alert--warning { border-color: color-mix(in srgb, var(--color-warning) 45%, var(--color-border)); background: var(--color-warning-surface); }
.alert--danger { border-color: var(--color-rosa-red); background: var(--color-danger-surface); }
.alert--success { border-color: color-mix(in srgb, var(--color-success) 42%, var(--color-border)); background: var(--color-success-surface); }
.alert__title { margin-bottom: var(--space-2); font-size: 0.78rem; font-weight: 850; letter-spacing: 0.04em; text-transform: uppercase; }
.alert__body { margin: 0; }

.route-placeholder { padding-block: var(--space-section); }
.route-eyebrow { margin-bottom: var(--space-4); color: var(--color-rosa-red); font-size: 0.75rem; font-weight: 850; letter-spacing: 0.08em; text-transform: uppercase; }
.route-title { max-width: 15ch; margin-bottom: var(--space-4); font-family: var(--font-editorial); font-size: clamp(2.65rem, 7vw, 5.75rem); font-weight: 400; line-height: 0.98; }
.route-path { color: var(--color-steel); }
.placeholder-panel { min-height: 20rem; display: grid; place-items: center; border: 1px solid var(--color-border); background: var(--color-mist); padding: var(--space-7); color: var(--color-steel); text-align: center; }

```

### `apps/web/src/app/globals.css`

```css
@import "tailwindcss";
@import "../styles/tokens.css";
@import "../styles/base.css";
@import "../styles/layout.css";
@import "../styles/components.css";
@import "../styles/public-pages.css";
@import "../styles/f3b-pages.css";
@import "../styles/f3b-safety.css";
@import "../styles/f3c-pages.css";
@import "../styles/f3d-pages.css";
@import "../styles/f3d-safety.css";
@import "../styles/f3e-admin-foundation.css";
@import "../styles/f3e-b-catalogue-management.css";
@import "../styles/f3e-c-operations.css";
@import "../styles/f3e-d-governance.css";
@import "../styles/f7-conversion-polish.css";
@import "../styles/f7-story-polish.css";
@import "../styles/f7-scissors-evolution.css";
@import "../styles/catalogue-media.css";
@import "../styles/f7-product-polish.css";
@import "../styles/f7-reduced-motion-closeout.css";
@import "../styles/f7-premium-polish.css";

```

### `apps/web/src/features/motion/motion.config.ts`

```ts
import type { MotionEasingTuple, MotionIntensity } from "./types";

export const MOTION_DURATION = {
  micro: 0.16,
  component: 0.28,
  section: 0.58,
  hero: 0.96
} as const;

export const MOTION_EASING = {
  standard: [0.22, 1, 0.36, 1] as MotionEasingTuple,
  emphasized: [0.16, 1, 0.3, 1] as MotionEasingTuple
} as const;

export const MOTION_DISTANCE = {
  mobile: 12,
  desktop: 24,
  hero: 36
} as const;

export const MOTION_INTENSITY: Record<MotionIntensity, number> = {
  subtle: 0.55,
  standard: 1,
  hero: 1.35
};

```

### `apps/web/package.json`

```json
{
  "name": "@rosa/web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:foundation": "node --test src/test/*.static.test.mjs",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@rosa/contracts": "workspace:*",
    "@supabase/ssr": "^0.12.4",
    "@supabase/supabase-js": "^2.111.0",
    "motion": "^12.42.2",
    "next": "16.2.11",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "zod": "^4.0.0"
  },
  "devDependencies": {
    "@opennextjs/cloudflare": "latest",
    "@playwright/test": "^1.57.0",
    "@tailwindcss/postcss": "^4.1.0",
    "@types/node": "^24.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "16.2.11",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.9.0",
    "vitest": "^3.2.0",
    "wrangler": "^4.118.0"
  }
}

```

### `apps/web/postcss.config.mjs`

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {}
  }
};

export default config;

```
