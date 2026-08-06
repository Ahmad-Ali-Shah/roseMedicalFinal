import { expect, type Locator, type Page } from "@playwright/test";

export function decodeRenderedImageSource(value: string | null): string {
  if (!value) return "";

  const parsed = new URL(value, "http://rosa.local");
  if (parsed.pathname !== "/_next/image") return value;

  return parsed.searchParams.get("url") ?? "";
}

export async function expectImageSource(
  image: Locator,
  expected: string | RegExp
): Promise<void> {
  await expect
    .poll(async () => decodeRenderedImageSource(await image.getAttribute("src")))
    .toMatch(expected);
}

export async function expectImageLoaded(image: Locator): Promise<void> {
  await image.scrollIntoViewIfNeeded();
  await expect
    .poll(
      () =>
        image.evaluate(
          (element) =>
            element instanceof HTMLImageElement
            && element.complete
            && element.naturalWidth > 0
            && element.naturalHeight > 0
        ),
      { timeout: 10_000 }
    )
    .toBe(true);
}

export async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    )
  ).toBe(false);
}
