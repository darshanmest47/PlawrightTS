import {test,expect,Locator} from "@playwright/test"

test("Verification of locators",async({page})=>{
   await page.goto("https://testautomationpractice.blogspot.com/",{waitUntil:"domcontentloaded"})

   await page.getByPlaceholder("Enter Name").fill("Darshan")
   await page.getByLabel("Male",{exact:true}).click()
   await page.getByText("Sunday").click();
   await page.getByRole("checkbox",{name:"Wednesday"}).click();

   //if data-testid attribute is available then we can use page.getByTestId() and f the attribute is 
   //changed then we can configure the same in playwright.config.ts under use{}
   
   //dropdown
//    page.locator("#colors").selectOption("blue")

   page.selectOption("#colors","red")
      await page.waitForTimeout(5000)

})


test("Verification of getByAltText",async({page})=>{
   await page.goto("https://www.toolsqa.com/",{waitUntil:"domcontentloaded"})
   await page.getByAltText("Test Project").nth(0).click();
   await page.waitForTimeout(4000)

})