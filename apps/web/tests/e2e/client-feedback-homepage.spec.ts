import { expect, test, type Page } from "@playwright/test";

async function nextSectionRatio(page: Page): Promise<number> {
  return page.evaluate(() => {
    const next = document.querySelector<HTMLElement>("[data-section='family-discovery']");
    if (!next) throw new Error("Family discovery missing");
    return next.getBoundingClientRect().top / innerHeight;
  });
}

test("1366x768 exposes roughly 8-15 percent continuation after the hero", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");
  const ratio = await nextSectionRatio(page);
  expect(ratio).toBeGreaterThanOrEqual(0.84);
  expect(ratio).toBeLessThanOrEqual(0.92);
});

test("390x844 keeps message CTA and image inside a compact integrated hero", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  await expect(page.locator(".home-hero__title")).toBeVisible();
  await expect(page.locator("[data-media-slot='homepage-hero-active']")).toBeVisible();
  const hero = await page.locator("[data-section='home-hero']").boundingBox();
  expect(hero).not.toBeNull();
  expect(hero!.height).toBeLessThan(760);
});

test("hero dot click selects the requested slide", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  await expect(page.locator("[data-section='home-hero']")).toHaveAttribute("data-active-slide", "precision-instruments");
  await page.locator(".home-hero-carousel__dot").nth(1).click();
  await expect(page.locator("[data-section='home-hero']")).toHaveAttribute("data-active-slide", "clinical-instrument-context");
});
