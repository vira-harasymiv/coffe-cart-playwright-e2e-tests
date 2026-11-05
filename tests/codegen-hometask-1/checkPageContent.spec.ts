import { test, expect } from "@playwright/test";

// Verifies the menu lists all 9 coffee items with their name, price format, and description.
test("Check page content: 9 different items should be shown", async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");
  // Aria snapshot of the menu list: each item's heading (name + price) and ingredients text.
  // Prices are matched by pattern (\$\d+\.\d+) so the test does not break on price changes.
  await expect(page.locator("#app")).toMatchAriaSnapshot(`
    - list:
      - listitem:
        - heading /Espresso \\$\\d+\\.\\d+/ [level=4]
        - text: espresso
      - listitem:
        - heading /Espresso Macchiato \\$\\d+\\.\\d+/ [level=4]
        - text: espresso milk foam
      - listitem:
        - heading /Cappuccino \\$\\d+\\.\\d+/ [level=4]
        - text: espresso steamed milk milk foam
      - listitem:
        - heading /Mocha \\$\\d+\\.\\d+/ [level=4]
        - text: espresso chocolate syrup steamed milk whipped cream
      - listitem:
        - heading /Flat White \\$\\d+\\.\\d+/ [level=4]
        - text: espresso steamed milk
      - listitem:
        - heading /Americano \\$\\d+\\.\\d+/ [level=4]
        - text: espresso water
      - listitem:
        - heading /Cafe Latte \\$\\d+\\.\\d+/ [level=4]
        - text: espresso steamed milk milk foam
      - listitem:
        - heading /Espresso Con Panna \\$\\d+\\.\\d+/ [level=4]
        - text: espresso whipped cream
      - listitem:
        - heading /Cafe Breve \\$\\d+\\.\\d+/ [level=4]
        - text: espresso steamed milk steamed cream milk foam
    `);
});
