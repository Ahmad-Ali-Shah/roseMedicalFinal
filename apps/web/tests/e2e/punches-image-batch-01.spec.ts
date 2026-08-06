import { expect, test } from "@playwright/test";
import {
  expectImageLoaded,
  expectImageSource,
  expectNoHorizontalOverflow
} from "./catalogue-media-assertions";

const LOCAL_PUNCHES_AVIF = /^\/media\/catalogue-preview\/punches\/[a-z0-9-]+\.avif$/;
const LOCAL_PUNCHES_WEBP = /^\/media\/catalogue-preview\/punches\/[a-z0-9-]+\.webp$/;

test.describe("Punches Batch 01 candidate media", () => {
  test.setTimeout(120_000);

  test("renders media for all 15 Punches records", async ({ page }) => {
    const response = await page.goto("/products/punches");
    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toHaveText("Punches");

    const cards = page.locator("[data-product-card]");
    const pictures = cards.locator("picture");
    const avifSources = pictures.locator('source[type="image/avif"]');
    const images = pictures.locator("img");

    await expect(cards).toHaveCount(15);
    await expect(pictures).toHaveCount(15);
    await expect(avifSources).toHaveCount(14);
    for (let index = 0; index < 14; index += 1) {
      expect(await avifSources.nth(index).getAttribute("srcset")).toMatch(LOCAL_PUNCHES_AVIF);
      await expectImageSource(images.nth(index), LOCAL_PUNCHES_WEBP);
    }
    for (let index = 0; index < 15; index += 1) {
      await expectImageLoaded(images.nth(index));
    }
    await expect(page.getByText("Biopsy Punch", { exact: true }).first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("renders the established Yeoman route with local media and exact catalogue data", async ({ page }) => {
    const response = await page.goto("/products/punches/yeoman");
    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toHaveText("Yeoman Punch");
    await expect(page.getByText("21-1001", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("28.0 cm", { exact: false }).first()).toBeVisible();

    const primaryPicture = page.locator(".product-gallery__primary picture");
    const primarySource = primaryPicture.locator('source[type="image/avif"]');
    const primaryImage = primaryPicture.locator("img");
    await expect(primarySource).toHaveAttribute("srcset", "/media/catalogue-preview/punches/punches-yeoman-21-10.avif");
    await expectImageSource(primaryImage, "/media/catalogue-preview/punches/punches-yeoman-21-10.webp");
    await expectImageLoaded(primaryImage);
    expect(await primaryImage.evaluate((element) => getComputedStyle(element).objectFit)).toBe("contain");
    await expectNoHorizontalOverflow(page);
  });
});
