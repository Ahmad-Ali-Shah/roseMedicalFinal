from __future__ import annotations

import argparse
from pathlib import Path
from PIL import Image, ImageOps

DESKTOP_MAX = (1920, 1080)
MOBILE_MAX = (960, 1200)
QUALITY = 88


def render(source: Path, output: Path, max_size: tuple[int, int]) -> None:
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        image.thumbnail(max_size, Image.Resampling.LANCZOS)
        output.parent.mkdir(parents=True, exist_ok=True)
        image.save(output, "WEBP", quality=QUALITY, method=6)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("sources", nargs=4, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()

    for index, source in enumerate(args.sources, start=1):
        if not source.is_file():
            raise SystemExit(f"Missing hero source: {source}")
        stem = f"home-hero-{index:02d}"
        render(source, args.output / f"{stem}-desktop.webp", DESKTOP_MAX)
        render(source, args.output / f"{stem}-mobile.webp", MOBILE_MAX)


if __name__ == "__main__":
    main()
