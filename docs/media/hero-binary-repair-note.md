# Hero binary repair note

The compact homepage uses the four client-selected monochrome surgical-instrument banners from `apps/web/public/media/editorial/home-hero/client-v5/`.

The earlier failure was not a CSS or focal-point problem: several committed WebPs were truncated. Their RIFF headers declared a larger file size than the Git blob actually contained, so browsers could not decode them reliably. A later safety repair restored decodable files, but the interim desktop derivatives were only about 600×204 and were too small for a full-width production hero.

The current desktop contract keeps the exact user-supplied banner masters at source resolution in AVIF, with complete WebP fallbacks sized for broad compatibility:

- AVIF masters: `1738×592`, `1738×592`, `1738×592`, and `1440×720`;
- WebP desktop fallbacks: `1200×409`, `1200×409`, `1200×409`, and `1200×600`;
- mobile: dedicated WebP crops at `474×592`, `474×592`, `474×592`, and `576×720`.

The hero `<picture>` selects the dedicated mobile WebP under `40rem`, prefers the source-resolution AVIF master on larger screens, and retains the desktop WebP as the final fallback. The next desktop slide preloader follows the AVIF master path so supported browsers do not preload one format and then render another.

Punches is likewise served from one direct local WebP (`/media/families/homepage-covers/punches-family-cover.webp`) generated from page 1 of the supplied Punches catalogue, avoiding the previous AVIF/SVG fallback chain.

The media regression contract validates complete `RIFF` / `WEBP` containers, asserts the desktop fallback and mobile dimensions, validates the AVIF `ftypavif`/`ispe` master dimensions, and checks that the hero source model exposes the AVIF master path. This guards both interrupted-binary corruption and accidental reintroduction of low-resolution masters.
