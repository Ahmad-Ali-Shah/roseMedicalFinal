import { expect, test } from "@playwright/test";
import {
  expectImageLoaded,
  expectImageSource,
  expectNoHorizontalOverflow
} from "./catalogue-media-assertions";

const LOCAL_KNIVES_AVIF = /^\/media\/catalogue-preview\/knives\/[a-z0-9-]+\.avif$/;
const LOCAL_KNIVES_WEBP = /^\/media\/catalogue-preview\/knives\/[a-z0-9-]+\.webp$/;

test.describe("Knives Batch 01 production media", () => {
  test.setTimeout(120_000);

  test("renders media for all 22 Knives records", async ({ page }) => {
    const response = await page.goto("/products/knives");
    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toHaveText("Knives");

    const cards = page.locator("[data-product-card]");
    const pictures = cards.locator("picture");
    const avifSources = pictures.locator('source[type="image/avif"]');
    const images = pictures.locator("img");

    await expect(cards).toHaveCount(22);
    await expect(pictures).toHaveCount(22);
    await expect(avifSources).toHaveCount(18);
    for (let index = 0; index < 18; index += 1) {
      expect(await avifSources.nth(index).getAttribute("srcset")).toMatch(LOCAL_KNIVES_AVIF);
      await expectImageSource(images.nth(index), LOCAL_KNIVES_WEBP);
    }
    for (let index = 0; index < 22; index += 1) {
      await expectImageLoaded(images.nth(index));
    }
    await expect(page.getByText("Bard Parker Handle", { exact: true }).first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("renders the first Batch 01 detail route with local media and exact catalogue data", async ({ page }) => {
    const response = await page.goto("/products/knives/number-3");
    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toHaveText("Scalpel Handle No. 3");
    await expect(page.getByText("18-0103", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("12.0 cm", { exact: false }).first()).toBeVisible();

    const primaryPicture = page.locator(".product-gallery__primary picture");
    const primarySource = primaryPicture.locator('source[type="image/avif"]');
    const primaryImage = primaryPicture.locator("img");
    await expect(primarySource).toHaveAttribute("srcset", "/media/catalogue-preview/knives/knives-number-3.avif");
    await expectImageSource(primaryImage, "/media/catalogue-preview/knives/knives-number-3.webp");
    await expectImageLoaded(primaryImage);
    expect(await primaryImage.evaluate((element) => getComputedStyle(element).objectFit)).toBe("contain");
    await expectNoHorizontalOverflow(page);
  });
});
