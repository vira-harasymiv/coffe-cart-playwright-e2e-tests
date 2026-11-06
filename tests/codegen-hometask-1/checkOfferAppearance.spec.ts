import { test, expect } from "@playwright/test";

// Verifies that the Mocha extra-cup offer appears once 3 Espressos are in the cart.
test("adding 3 cups of espresso - the offer should appear", async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");
  // Add three Espressos to trigger the offer.
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso"]').click();
  // Check the offer text and its Yes/No buttons via an aria snapshot.
  await expect.soft(page.locator("#app")).toMatchAriaSnapshot(`
    - text: It's your lucky day! Get an extra cup of Mocha for $4. espresso chocolate syrup steamed milk whipped cream
    - button "Yes, of course!"
    - button "Nah, I'll skip."
    `);
});
