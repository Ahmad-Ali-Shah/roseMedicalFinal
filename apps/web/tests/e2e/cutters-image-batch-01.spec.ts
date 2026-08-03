import { expect, test } from "@playwright/test";
import {
  expectImageLoaded,
  expectImageSource,
  expectNoHorizontalOverflow
} from "./catalogue-media-assertions";

const LOCAL_CUTTERS_AVIF = /^\/media\/catalogue-preview\/cutters\/[a-z0-9-]+\.avif$/;
const LOCAL_CUTTERS_WEBP = /^\/media\/catalogue-preview\/cutters\/[a-z0-9-]+\.webp$/;

test.describe("Cutters Batch 01 production media", () => {
  test.setTimeout(120_000);

  test("renders 13 local Batch 01 images alongside the preserved SC-01T record", async ({ page }) => {
    const response = await page.goto("/products/cutters");
    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toHaveText("Cutters");

    const cards = page.locator("[data-product-card]");
    const pictures = cards.locator("picture");
    const avifSources = pictures.locator('source[type="image/avif"]');
    const images = pictures.locator("img");

    await expect(cards).toHaveCount(14);
    await expect(pictures).toHaveCount(13);
    for (let index = 0; index < 13; index += 1) {
      expect(await avifSources.nth(index).getAttribute("srcset")).toMatch(LOCAL_CUTTERS_AVIF);
      await expectImageSource(images.nth(index), LOCAL_CUTTERS_WEBP);
      await expectImageLoaded(images.nth(index));
    }
    await expect(page.getByText("SC-01T", { exact: true }).first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("renders the preserved Liston route with local media and exact catalogue data", async ({ page }) => {
    const response = await page.goto("/products/cutters/liston");
    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toHaveText("Liston");
    await expect(page.getByText("36-5101", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("14.0 cm", { exact: false }).first()).toBeVisible();

    const primaryPicture = page.locator(".product-gallery__primary picture");
    const primarySource = primaryPicture.locator('source[type="image/avif"]');
    const primaryImage = primaryPicture.locator("img");
    await expect(primarySource).toHaveAttribute("srcset", "/media/catalogue-preview/cutters/cutters-liston-straight.avif");
    await expectImageSource(primaryImage, "/media/catalogue-preview/cutters/cutters-liston-straight.webp");
    await expectImageLoaded(primaryImage);
    expect(await primaryImage.evaluate((element) => getComputedStyle(element).objectFit)).toBe("contain");
    await expectNoHorizontalOverflow(page);
  });
});
