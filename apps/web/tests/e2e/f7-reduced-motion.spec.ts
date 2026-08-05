import { expect, test, type Page } from "@playwright/test";

const STORAGE_KEY = "rosa-medical-inquiry-v1";
const SEEDED_ITEM = {
  id: "product_scalpel_handle_3",
  familySlug: "knives",
  slug: "scalpel-handle-no-3",
  name: "Scalpel Handle No. 3",
  code: "18-0644",
  size: "14.5 cm",
  variant: "Standard",
  quantity: 1,
  notes: ""
};

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(
    ({ key, item }) => window.localStorage.setItem(key, JSON.stringify([item])),
    { key: STORAGE_KEY, item: SEEDED_ITEM }
  );
});

function collectHydrationErrors(page: Page): string[] {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (
      message.type() === "error"
      && /hydrated|hydration|server rendered html/i.test(message.text())
    ) {
      errors.push(message.text());
    }
  });

  return errors;
}

async function expectMotionSettled(page: Page) {
  await expect.poll(async () => page.evaluate(() => {
    const selectors = [
      '[data-motion="reveal"]',
      '[data-motion="stagger-item"]',
      '[data-motion="text-reveal"]',
      '[data-motion="route-transition"]',
      '[data-motion="magnetic"]',
      '[data-motion="tilt"]',
      '[data-motion="mobile-inquiry-bar"]',
      '[data-motion="quotation-form-fields"]',
      ".text-reveal__segment"
    ].join(",");

    return [...document.querySelectorAll<HTMLElement>(selectors)]
      .map((element) => {
        const style = window.getComputedStyle(element);
        return {
          element: element.dataset.motion || element.className,
          opacity: style.opacity,
          filter: style.filter,
          transform: style.transform
        };
      })
      .filter((item) => (
        Number(item.opacity) < 0.99
        || item.filter !== "none"
        || item.transform !== "none"
      ));
  })).toEqual([]);
}

test("reduced motion keeps public content settled and navigation functional", async ({ page }) => {
  const hydrationErrors = collectHydrationErrors(page);
  const homeResponse = await page.goto("/");
  expect(homeResponse?.ok()).toBe(true);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expectMotionSettled(page);

  const productsLink = page
    .locator("[data-section='home-hero']")
    .getByRole("link", { name: "Explore Products" });
  await expect(productsLink).toBeVisible();
  await Promise.all([
    page.waitForURL(/\/products$/),
    productsLink.click()
  ]);
  await expect(
    page.getByRole("heading", { name: "Medical instruments, organised for procurement.", level: 1 })
  ).toBeVisible();
  await expectMotionSettled(page);

  const productResponse = await page.goto("/products/knives/scalpel-handle-no-3");
  expect(productResponse?.ok()).toBe(true);
  await expect(page.getByRole("heading", { name: "Scalpel Handle No. 3", level: 1 })).toBeVisible();
  await expectMotionSettled(page);

  const aboutResponse = await page.goto("/about");
  expect(aboutResponse?.ok()).toBe(true);
  await expect(
    page.getByRole("heading", { name: "A clearer way to source medical instruments.", level: 1 })
  ).toBeVisible();
  await expectMotionSettled(page);
  expect(hydrationErrors).toEqual([]);
});

test("reduced motion keeps inquiry and quotation conversion content immediately usable", async ({ page }) => {
  const hydrationErrors = collectHydrationErrors(page);
  const inquiryResponse = await page.goto("/inquiry");
  expect(inquiryResponse?.ok()).toBe(true);
  await expect(page.getByRole("heading", { name: "Review your product inquiry.", level: 1 })).toBeVisible();
  await expect(page.locator("[data-inquiry-line]")).toHaveCount(1);
  await expectMotionSettled(page);

  await page.getByRole("link", { name: "Proceed to request" }).click();
  await expect(page.getByRole("heading", { name: "Send your product requirements.", level: 1 })).toBeVisible();
  await expect(page.locator("[data-quotation-fieldset]")).toHaveCount(3);
  await expect(page.locator("[data-motion='quotation-form-fields']")).toHaveCount(1);
  await expect(page.getByLabel("Customer name")).toBeEditable();
  await expectMotionSettled(page);
  expect(hydrationErrors).toEqual([]);
});
