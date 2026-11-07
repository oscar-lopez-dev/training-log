import { expect, test } from "@playwright/test";

test("the home page lists the three Routine presets by days per week", async ({ page }) => {
  await page.goto("/");

  const presets = page.getByRole("listitem").filter({ has: page.getByRole("heading") });
  await expect(presets.getByRole("heading")).toHaveText([
    "3-day Full Body",
    "4-day Upper/Lower",
    "5-day Push, Pull, Legs, Upper, Lower",
  ]);
  await expect(presets.nth(1)).toContainText("Upper A");
});
