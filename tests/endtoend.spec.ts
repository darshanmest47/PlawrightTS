import {test,expect,Locator} from "@playwright/test"

test("Verification of end to end scenrio",async({page})=>{
    await page.goto("https://blazedemo.com/",{waitUntil:"domcontentloaded"})
    await page.locator("//select[@name='fromPort']").click();
    await page.selectOption("//select[@name='fromPort']","San Diego")
    await page.waitForTimeout(5000)
    await page.locator("//select[@name='toPort']").click();
    await page.selectOption("//select[@name='toPort']","London")
    await page.locator("input[value='Find Flights']").click();

    let priceArray:any[] = [];
    const rows :Locator[] =await page.locator("table.table tr").all();

    for(const row of rows.slice(1)){
     const datas = await row.locator("td").all();

     for(const data of datas){
        const val:string=await data.innerText();
        if(val.includes("$")){
            priceArray.push(val);
        }
     }
    }

    console.log(priceArray)
    const replacedArr:number[]=priceArray.map(e=>parseFloat(e.replace("$","")))
    const sorted = [...replacedArr].sort((a,b)=> a-b);
    console.log(sorted)
    let minValue = "$"+Math.min(...sorted);
    console.log("Minimum value is ",minValue)
    await page.waitForTimeout(5000)
    await page.locator(`//td[contains(text(),'${minValue}')]/preceding-sibling::td/input[@type='submit']`).click();
    await page.locator("input#inputName").fill("Darshan")
    await page.locator("input#address").fill("1234 ave")
    await page.locator("input#city").fill("San Diego")
    await page.locator("input#state").fill("California")
    await page.locator("input#zipCode").fill("60001")
    await page.locator("input#creditCardNumber").fill("4616800048594452")
    await page.locator("input#creditCardMonth").fill("11")
    await page.locator("input#creditCardYear").fill("2024")
    await page.getByLabel("Name on Card").fill("DARSHAN MESTA")
    await page.locator("input[value='Purchase Flight']").click()
    await expect(page.getByRole("heading",{name:/Thank you for your purchase today!/i})).toBeVisible()



})