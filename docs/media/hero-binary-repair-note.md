# Hero binary repair note

The compact homepage serves the four client-selected monochrome surgical-instrument banners from `apps/web/public/media/editorial/home-hero/client-v5/` as direct WebP files for both desktop and mobile presentation.

The earlier failure was not a CSS/focal-point problem: several committed WebPs were truncated. Their RIFF headers declared a larger file size than the Git blob actually contained, so browsers could not decode them reliably. A later safety repair restored decodable files, but those interim desktop derivatives were only about 600×204 and were too small for a full-width production hero.

The current `client-v5` derivatives are rebuilt from the exact user-supplied banner masters at source-level resolution:

- desktop: `1738×592`, `1738×592`, `1738×592`, and `1440×720`;
- mobile: dedicated tall crops at `474×592`, `474×592`, `474×592`, and `576×720`.

Punches is likewise served from one direct local WebP (`/media/families/homepage-covers/punches-family-cover.webp`) generated from page 1 of the supplied Punches catalogue, avoiding the previous AVIF/SVG fallback chain.

The media regression contract validates `RIFF` / `WEBP` signatures, requires the RIFF-declared byte length to equal the actual file length, and asserts the hero raster dimensions. This guards both interrupted-binary corruption and accidental reintroduction of low-resolution safety derivatives.
