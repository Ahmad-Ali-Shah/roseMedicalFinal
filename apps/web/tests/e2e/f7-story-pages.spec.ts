import { expect, test, type Page } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page) {
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(hasOverflow).toBe(false);
}

test("About, procurement and catalogue stories remain complete and media-ready", async ({ page }) => {
  const aboutResponse = await page.goto("/about");
  expect(aboutResponse?.ok()).toBe(true);
  await expect(
    page.getByRole("heading", { name: "A clearer way to source medical instruments.", level: 1 })
  ).toBeVisible();
  await expect(page.locator("[data-media-slot='about-hero']")).toHaveAttribute("data-media-state", "placeholder");
  await expect(page.locator("[data-media-slot='about-procurement']")).toHaveAttribute("data-media-state", "placeholder");
  await expect(page.locator("[data-supported-buyer]")).toHaveCount(4);
  await expectNoHorizontalOverflow(page);

  const procurementResponse = await page.goto("/procurement-support");
  expect(procurementResponse?.ok()).toBe(true);
  await expect(
    page.getByRole("heading", { name: "Prepare a clearer instrument request.", level: 1 })
  ).toBeVisible();
  await expect(page.locator("[data-editorial-kind='procurement-step']")).toHaveCount(6);
  await expect(page.locator("[data-information-item]")).toHaveCount(6);
  await expect(page.locator("[data-media-slot='procurement-support-hero']")).toHaveAttribute(
    "data-media-state",
    "placeholder"
  );
  await expectNoHorizontalOverflow(page);

  const cataloguesResponse = await page.goto("/catalogues");
  expect(cataloguesResponse?.ok()).toBe(true);
  await expect(
    page.getByRole("heading", {
      name: "Document-led browsing, connected to the product experience.",
      level: 1
    })
  ).toBeVisible();
  await expect(page.locator("[data-catalogue-document]")).toHaveCount(5);
  await expect(page.getByRole("button", { name: "PDF not available online" })).toHaveCount(5);
  await expect(page.locator("[data-motion='tilt']")).toHaveCount(5);
  await expectNoHorizontalOverflow(page);
});

test("contact and legal utilities stay usable, explicit and calm", async ({ page }) => {
  const contactResponse = await page.goto("/contact");
  expect(contactResponse?.ok()).toBe(true);
  await expect(
    page.getByRole("heading", { name: "Send a general business message.", level: 1 })
  ).toBeVisible();
  await expect(page.getByRole("form", { name: "General contact form preview" })).toBeVisible();
  await expect(page.getByLabel("Name")).toBeEditable();
  await expect(page.getByLabel("Email")).toBeEditable();
  await expect(page.getByRole("button", { name: "Send Message" })).toBeEnabled();
  await expect(page.locator("[data-media-slot='contact-location']")).toHaveAttribute(
    "data-media-state",
    "placeholder"
  );
  await expect(page.getByText("Awaiting client confirmation").first()).toBeVisible();
  await expectNoHorizontalOverflow(page);

  const privacyResponse = await page.goto("/privacy");
  expect(privacyResponse?.ok()).toBe(true);
  await expect(page.getByRole("heading", { name: "Privacy Policy", level: 1 })).toBeVisible();
  await expect(page.locator("[data-legal-section]")).toHaveCount(9);
  await expect(page.getByText("Last updated: awaiting client and legal approval")).toBeVisible();
  await page.locator("[data-legal-section='policy-updates']").scrollIntoViewIfNeeded();
  await expect(page.locator("[data-legal-section='policy-updates']")).toBeVisible();
  await expectNoHorizontalOverflow(page);

  const termsResponse = await page.goto("/terms");
  expect(termsResponse?.ok()).toBe(true);
  await expect(page.getByRole("heading", { name: "Terms of Website Use", level: 1 })).toBeVisible();
  await expect(page.locator("[data-legal-section]")).toHaveCount(11);
  await page.locator("[data-legal-section='contact']").scrollIntoViewIfNeeded();
  await expect(page.locator("[data-legal-section='contact']")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Not launch-ready legal advice." })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
