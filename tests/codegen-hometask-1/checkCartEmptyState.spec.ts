import { test, expect } from "@playwright/test";

// Verifies that an empty cart shows the "No coffee, go add some." message.
test("empty cart - 'No coffee, go add some.' message should be shown", async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");

  await expect
    .soft(page.getByRole("link", { name: "Cart page" }))
    .toBeVisible();
  await expect.soft(page.locator('[data-test="checkout"]')).toBeVisible();

  await page.getByRole("link", { name: "Cart page" }).click();
  await expect.soft(page.getByText("No coffee, go add some.")).toBeVisible();
});
