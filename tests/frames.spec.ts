import {test,expect,Locator} from "@playwright/test"
// /<iframe id="pact1" src="https://selectorshub.com/iframe-and-nested-iframe/" height="400px"></iframe>
test("Verifcation of frame method1",async({page})=>{
    await page.goto("https://selectorshub.com/iframe-scenario/")

    //Method 1 page.frame() using name or url
    const frame = page.frame({url:"https://selectorshub.com/iframe-and-nested-iframe/"})
    if(frame){
        page.getByPlaceholder(/First Crush/i).fill("Darshan")
    }else{
        console.log("Frame doesn't exist")
    }
   
    await page.waitForTimeout(4000)




})

test.only("Verification of frame method2 with nested frames",async({page})=>{
    await page.goto("https://selectorshub.com/iframe-scenario/",{waitUntil:"domcontentloaded"})
    const frame1 = page.frameLocator("(//iframe[@id='pact1'])[1]")

    await frame1.locator("#inp_val").fill("Darshan")
    const frame2 = frame1.frameLocator("#pact2")
    await frame2.getByPlaceholder("Current Crush Name").fill("Suraj")
    const frame3 = frame2.frameLocator("#pact3")
    await frame3.getByPlaceholder("Destiny").fill("California")


})