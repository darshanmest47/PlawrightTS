import {
  test,
  expect,
  chromium,
  Browser,
  BrowserContext,
  Page,
  Locator,
} from "@playwright/test";

/*Following are the annotations in playwright
  test.skip(), test.slow(), test.fixme(),test.only(),test.fail()

*/

// We will use the concept of context here
test("Only this will be executed", async () => {
  let browser: Browser = await chromium.launch(); //creates a new browser
  let context: BrowserContext = await browser.newContext(); // creates a new context
  let page: Page = await context.newPage(); // creates a new page

  await page.goto("https://www.demoblaze.com/");
  await page.waitForLoadState("domcontentloaded"); // waits until the page is loaded completely
  let categories: Locator = page.getByRole("link", { name: "CATEGORIES" });
  await expect(categories).toContainText("CATEGORIES");

  // In a context we can open multiple pages
});

// Default skip
test.skip("This test will be skipped", async ({ page }) => {
  await page.goto("https://www.flipkart.com");
  await page.waitForLoadState("domcontentloaded");
});

// Skipping based on condition
test("Skipping the test based on condition", async ({ page, browserName }) => {
  test.skip(
    browserName === "chromium",
    "Skipping the tests as this will be executed only on other browsers apart from chrome",
  );
  console.log(
    `Skipping the test as browser name is ${browserName} and is not matching`,
  );
});

// This will also be skipped as this will be taken care in upcoming release
test.fixme("This is an unimplemented test and will be implemented later", async ({
  page,
}) => {
  page.goto("https://www.amazon.com");
});

// This will intentionally fail the test
test("This will intentionally fail the tests", async ({ page }) => {
  test.fail();
  await page.goto("https://www.irctc.com");
});

//This will  slodown the test to 3X of global timeout
test.only("This will slowdown our test", async ({ page }) => {
  test.slow();
  await page.goto("https://www.irctc.com");
});
