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


test("homepage family gallery keeps the approved five-family order and image-name-only content", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.goto("/");
  const gallery = page.locator("[data-home-family-gallery]");
  await gallery.scrollIntoViewIfNeeded();
  await expect(gallery.locator("[data-family-panel]")).toHaveCount(5);
  expect(await gallery.locator("[data-family-panel]").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-family")))).toEqual([
    "knives", "scissors", "punches", "chisels", "cutters"
  ]);
  await expect(page.locator("[data-section='family-discovery'] .public-section-heading__copy")).toHaveCount(0);
  await expect(gallery.getByText("Explore collection")).toHaveCount(0);
});

test("1024 fine-pointer layout uses accordion and focus expands Chisels", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/");
  const gallery = page.locator("[data-home-family-gallery]");
  await gallery.scrollIntoViewIfNeeded();
  expect(await gallery.evaluate((node) => getComputedStyle(node).overflowX)).toBe("hidden");
  const panels = gallery.locator("[data-family-panel]");
  const firstBefore = await panels.nth(0).boundingBox();
  const secondBefore = await panels.nth(1).boundingBox();
  expect(firstBefore!.width).toBeGreaterThan(secondBefore!.width);
  await panels.filter({ has: page.getByRole("heading", { name: "Chisels" }) }).getByRole("link").focus();
  await page.waitForTimeout(650);
  const chisel = await gallery.locator("[data-family='chisels']").boundingBox();
  const inactive = await gallery.locator("[data-family='scissors']").boundingBox();
  expect(chisel!.width).toBeGreaterThan(inactive!.width);
});

test("tablet gallery is a native swipe rail with a next-card sliver", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "tablet");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/");
  const gallery = page.locator("[data-home-family-gallery]");
  await gallery.scrollIntoViewIfNeeded();
  const galleryBox = await gallery.boundingBox();
  const first = await gallery.locator("[data-family-panel]").first().boundingBox();
  const second = await gallery.locator("[data-family-panel]").nth(1).boundingBox();
  expect(await gallery.evaluate((node) => getComputedStyle(node).overflowX)).toBe("auto");
  expect(first!.width / galleryBox!.width).toBeGreaterThanOrEqual(0.82);
  expect(first!.width / galleryBox!.width).toBeLessThanOrEqual(0.86);
  expect(second!.x).toBeLessThan(galleryBox!.x + galleryBox!.width);
});

test("coarse pointer keeps the family rail even at wide width", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/");
  const gallery = page.locator("[data-home-family-gallery]");
  await gallery.scrollIntoViewIfNeeded();
  expect(await gallery.evaluate((node) => getComputedStyle(node).overflowX)).toBe("auto");
});
