import { expect, test, type Page } from "@playwright/test";

const LAPTOP_VIEWPORTS = [
  { width: 1280, height: 720 },
  { width: 1366, height: 768 }
] as const;

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const geometry = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));

  expect(geometry.scrollWidth, JSON.stringify(geometry)).toBeLessThanOrEqual(
    geometry.clientWidth
  );
}

for (const viewport of LAPTOP_VIEWPORTS) {
  test(`shared internal density ${viewport.width}x${viewport.height}`, async ({
    page
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "Geometry runs once in desktop Chromium."
    );
    await page.setViewportSize(viewport);
    await page.goto("/about");

    const compactPadding = await page.locator(".about-hero").evaluate(
      (node) => Number.parseFloat(getComputedStyle(node).paddingTop)
    );
    expect(compactPadding).toBeLessThanOrEqual(48);
    await expectNoHorizontalOverflow(page);
  });
}
