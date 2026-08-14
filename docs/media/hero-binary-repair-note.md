# Hero binary repair note

The compact homepage now serves the four client-selected monochrome surgical-instrument banners from `apps/web/public/media/editorial/home-hero/client-v5/` as direct WebP files for both desktop and mobile presentation.

The earlier failure was not a CSS/focal-point problem: several committed WebPs were truncated. Their RIFF headers declared a larger file size than the Git blob actually contained, so browsers could not decode them reliably. The damaged binaries were replaced from the exact user-supplied banner masters.

Punches is likewise served from one direct local WebP (`/media/families/homepage-covers/punches-family-cover.webp`) generated from the supplied Punches catalogue cover, avoiding the previous AVIF/SVG fallback chain.

The media regression contract now validates `RIFF` / `WEBP` signatures and requires the RIFF-declared byte length to equal the actual file length. This guards the exact interrupted-binary regression rather than only checking that a file exists.
