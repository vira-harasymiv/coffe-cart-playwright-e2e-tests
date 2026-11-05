import { test, expect } from "@playwright/test";

test("Check page content: 9 different items should be shown", async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");
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
