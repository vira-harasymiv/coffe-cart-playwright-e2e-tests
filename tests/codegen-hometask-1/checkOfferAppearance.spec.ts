import { test, expect } from "@playwright/test";

test("Check if the offer appears after adding 3 cups of espresso", async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso"]').click();
  await expect.soft(page.locator("#app")).toMatchAriaSnapshot(`
    - text: It's your lucky day! Get an extra cup of Mocha for $4. espresso chocolate syrup steamed milk whipped cream
    - button "Yes, of course!"
    - button "Nah, I'll skip."
    `);
});
