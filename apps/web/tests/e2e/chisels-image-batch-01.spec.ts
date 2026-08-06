import { expect, test } from "@playwright/test";
import {
  expectImageLoaded,
  expectImageSource,
  expectNoHorizontalOverflow
} from "./catalogue-media-assertions";

const LOCAL_CHISELS_AVIF = /^\/media\/catalogue-preview\/chisels\/[a-z0-9-]+\.avif$/;
const LOCAL_CHISELS_WEBP = /^\/media\/catalogue-preview\/chisels\/[a-z0-9-]+\.webp$/;

test.describe("Chisels Batch 01 production media", () => {
  test.setTimeout(120_000);

  test("renders media for all 20 Chisels records", async ({ page }) => {
    const response = await page.goto("/products/chisels");
    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toHaveText("Chisels");

    const cards = page.locator("[data-product-card]");
    const pictures = cards.locator("picture");
    const avifSources = pictures.locator('source[type="image/avif"]');
    const images = pictures.locator("img");

    await expect(cards).toHaveCount(20);
    await expect(pictures).toHaveCount(20);
    await expect(avifSources).toHaveCount(16);
    for (let index = 0; index < 16; index += 1) {
      expect(await avifSources.nth(index).getAttribute("srcset")).toMatch(LOCAL_CHISELS_AVIF);
      await expectImageSource(images.nth(index), LOCAL_CHISELS_WEBP);
    }
    for (let index = 0; index < 20; index += 1) {
      await expectImageLoaded(images.nth(index));
    }
    await expectNoHorizontalOverflow(page);
  });

  test("renders the first Batch 01 detail route with local media and exact catalogue data", async ({ page }) => {
    const response = await page.goto("/products/chisels/osteotomes-13-5cm");
    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toHaveText("Osteotomes");
    await expect(page.getByText("36-6301", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("13.5 cm · 4 mm", { exact: false }).first()).toBeVisible();

    const primaryPicture = page.locator(".product-gallery__primary picture");
    const primarySource = primaryPicture.locator('source[type="image/avif"]');
    const primaryImage = primaryPicture.locator("img");
    await expect(primarySource).toHaveAttribute("srcset", "/media/catalogue-preview/chisels/chisels-osteotomes-13-5cm.avif");
    await expectImageSource(primaryImage, "/media/catalogue-preview/chisels/chisels-osteotomes-13-5cm.webp");
    await expectImageLoaded(primaryImage);
    expect(await primaryImage.evaluate((element) => getComputedStyle(element).objectFit)).toBe("contain");
    await expectNoHorizontalOverflow(page);
  });
});
