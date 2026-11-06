import { test, expect } from "@playwright/test";

// Verifies that an empty cart shows the "No coffee, go add some." message.
test("Check that an empty cart shows the 'No coffee, go add some.' message", async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");
  // Cart link and checkout button should be visible on the main page.
  await expect
    .soft(page.getByRole("link", { name: "Cart page" }))
    .toBeVisible();
  await expect.soft(page.locator('[data-test="checkout"]')).toBeVisible();
  // Open the cart without adding anything and check the empty-state text.
  await page.getByRole("link", { name: "Cart page" }).click();
  await expect.soft(page.getByText("No coffee, go add some.")).toBeVisible();
});
