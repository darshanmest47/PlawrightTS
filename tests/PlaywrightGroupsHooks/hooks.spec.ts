import {
  test,
  expect,
  chromium,
  Page,
  Browser,
  BrowserContext,
  Locator,
} from "@playwright/test";

/*Following hooks are available in playwright
beforeEach() ----> before each @test
afterEach() ----> after each @test
beforeAll() -----> before all @test
afterAll() ------> after all @test
*/
let page: Page;
let browser: Browser;
test.beforeAll("Executing before all the test methods", async () => {
  browser = await chromium.launch();
  let context: BrowserContext = await browser.newContext();
  page = await context.newPage();
});

test.afterAll("Executing after all the test methods", async () => {
  test.setTimeout(10000);
  if (browser) {
    await browser.close();
  }
});

test.beforeEach("Executing before each test method", async () => {
  await page.goto("https://www.demoblaze.com/index.html");
  await page.waitForLoadState("domcontentloaded");

  await page.getByRole("link", { name: "Log in" }).click();
  await expect(page.locator("#loginusername")).toBeVisible();
  await page.locator("#loginusername").fill("darshan@1234");
  await page.locator("#loginpassword").fill("TST@1234");
  await page.getByRole("button", { name: "Log in" }).click();
});

test.afterEach("Executing after each test method", async () => {
  await page.getByRole("link", { name: "Log out" }).click();
});

//for serial mode:serial , for parallel mode : parallel
test.describe.configure({ mode: "serial" });

test.describe("Cart Functionality", () => {
  test("Adding the product to the cart", async ({}) => {
    await page.getByRole("link", { name: "Samsung galaxy s6" }).click();
    await page.waitForTimeout(3000);

    page.on("dialog", async (dialog) => {
      console.log(`Message is ${dialog.message()}`);
      console.log(dialog.defaultValue());
      await dialog.accept();
      console.log("Dialog has been accepted successfully");
    });
    await expect(page.getByRole("link", { name: "Add to cart" })).toBeVisible();

    const [dialogObject] = await Promise.all([
      page.waitForEvent("dialog"), // Wait for the dialog to open, evaluate, and fire your console logs
      page.getByRole("link", { name: "Add to cart" }).click(), // The action that triggers the dialog
    ]);

    await page.getByRole("link", { name: "Cart", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
  });

  test("Deleting the products from the cart", async () => {
    await page.getByRole("link", { name: "Cart", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
    const firstDeleteButton = page
      .getByRole("link", { name: "Delete" })
      .first();

    while (await firstDeleteButton.isVisible()) {
      await firstDeleteButton.click();
      console.log("An item has been deleted successfully");
      await page.waitForTimeout(2000);
    }

    await expect(firstDeleteButton).not.toBeVisible();
    console.log("All items have been completely cleared from the cart!");
  });
});
