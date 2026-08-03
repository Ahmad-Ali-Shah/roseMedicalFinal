import { expect, test, type Page } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page) {
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(hasOverflow).toBe(false);
}

test("product discovery and detail keep their premium hierarchy and behavior", async ({ page }) => {
  const productsResponse = await page.goto("/products");
  expect(productsResponse?.ok()).toBe(true);

  await expect(
    page.getByRole("heading", { name: "Medical instruments, organised for procurement." })
  ).toBeVisible();
  await expect(page.locator("[data-section='family-index'] [data-motion='stagger-item']")).toHaveCount(5);
  await expect(page.locator("[data-section='product-preview-grid'] [data-motion='stagger-item']")).toHaveCount(3);
  await expect(page.getByRole("link", { name: "Search by product name or code" })).toHaveAttribute("href", "/search");
  await expectNoHorizontalOverflow(page);

  const familyResponse = await page.goto("/products/knives");
  expect(familyResponse?.ok()).toBe(true);

  await expect(page.getByRole("heading", { name: "Knives", level: 1 })).toBeVisible();
  await expect(page.locator("[data-product-card]")).toHaveCount(4);
  await expect(page.getByRole("link", { name: /View details/ }).first()).toHaveAttribute(
    "href",
    "/products/knives/scalpel-handle-no-3"
  );
  await expect(page.locator("[data-motion='tilt']")).not.toHaveCount(0);
  await expectNoHorizontalOverflow(page);

  const detailResponse = await page.goto("/products/knives/scalpel-handle-no-3");
  expect(detailResponse?.ok()).toBe(true);

  await expect(page.getByRole("heading", { name: "Scalpel Handle No. 3", level: 1 })).toBeVisible();
  await expect(page.getByText("Product code 18-0644")).toBeVisible();
  await expect(page.locator("[data-motion='reveal']")).not.toHaveCount(0);
  await expect(page.locator("[data-motion='stagger']")).not.toHaveCount(0);

  const addButton = page.getByRole("button", { name: "Add to inquiry" }).first();
  await expect(addButton).toBeEnabled();
  await addButton.click();
  await expect(page.getByRole("link", { name: "Added · View inquiry" }).first()).toHaveAttribute(
    "href",
    "/inquiry"
  );
  await expectNoHorizontalOverflow(page);
});
