import { expect, test, type Locator, type Page } from "@playwright/test";

const VIEWPORTS = [
  [360, 800],
  [390, 844],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [1280, 720],
  [1366, 768],
  [1440, 900],
  [1536, 864],
  [1920, 1080],
  [2560, 1440]
] as const;

async function expectInside(parent: Locator, child: Locator): Promise<void> {
  const [parentBox, childBox] = await Promise.all([parent.boundingBox(), child.boundingBox()]);
  expect(parentBox).not.toBeNull();
  expect(childBox).not.toBeNull();
  expect(childBox!.x).toBeGreaterThanOrEqual(parentBox!.x - 1);
  expect(childBox!.x + childBox!.width).toBeLessThanOrEqual(parentBox!.x + parentBox!.width + 1);
  expect(childBox!.y).toBeGreaterThanOrEqual(parentBox!.y - 1);
  expect(childBox!.y + childBox!.height).toBeLessThanOrEqual(parentBox!.y + parentBox!.height + 1);
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  expect(await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  )).toBe(false);
}

for (const [width, height] of VIEWPORTS) {
  test(`${width}x${height} homepage responsive acceptance`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Geometry matrix runs once in desktop Chromium; touch behavior is covered separately.");
    await page.setViewportSize({ width, height });
    await page.goto("/");

    await expectNoHorizontalOverflow(page);

    const hero = page.locator("[data-section='home-hero']");
    const family = page.locator("[data-section='family-discovery']");
    const gallery = page.locator("[data-home-family-gallery]");
    await expect(hero).toBeVisible();
    await expect(family).toBeVisible();
    await expect(gallery).toBeVisible();
    await expect(page.locator("[data-section='comprehensive-plans']")).toBeAttached();
    await expect(page.locator("[data-section='securing-confidence']")).toBeAttached();

    await expectInside(hero, hero.locator(".home-hero__title"));
    for (const cta of await hero.locator(".home-hero__actions a").all()) {
      await expectInside(hero, cta);
    }

    for (const dot of await hero.locator(".home-hero-carousel__dot").all()) {
      const box = await dot.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
      await expectInside(hero, dot);
    }

    const panels = gallery.locator("[data-family-panel]");
    await expect(panels).toHaveCount(5);
    for (const panel of await panels.all()) {
      await expect(panel.locator(".home-family-gallery__media--catalogue-cover")).toBeVisible();
    }

    if (width <= 768) {
      expect(await gallery.evaluate((node) => getComputedStyle(node).overflowX)).toBe("auto");
    }

    if (width === 1280 || width === 1366) {
      const continuationRatio = await family.evaluate((node) => node.getBoundingClientRect().top / innerHeight);
      expect(continuationRatio).toBeGreaterThanOrEqual(0.55);
      expect(continuationRatio).toBeLessThanOrEqual(0.72);
    }

    if (width >= 1920) {
      const heroBox = await hero.boundingBox();
      expect(heroBox).not.toBeNull();
      expect(heroBox!.height).toBeLessThanOrEqual(864);
    }

    await testInfo.attach(`home-${width}x${height}`, {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png"
    });
  });
}
