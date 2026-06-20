import {test,expect,Locator} from "@playwright/test"

test("Verification of dialogs",async({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/")
  
  //dialog handler is needed bcz playwright dismisses alerts by default
  page.on('dialog',(dialog)=>{
    console.log(dialog.message())
    console.log(dialog.defaultValue())
    console.log(dialog.type())
    dialog.accept()
  })


  await page.locator("#alertBtn").click()
})


test("Verification of confirmation dialog",async({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/")

   page.on('dialog',(dialog)=>{
    console.log(dialog.type())
    console.log(dialog.message())
    console.log(dialog.defaultValue())
    dialog.dismiss()
   })
  await page.locator("#confirmBtn").click();

  const msg = await page.locator('#demo').innerText();
  expect(msg).toContain("Cancel")

})

test.only("Verification of prompt button",async({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/")

 page.on('dialog',(dialog)=>{
    console.log(dialog.type())
    console.log(dialog.message())
    console.log(dialog.defaultValue())
    dialog.accept('Darshan')
 })
  await page.locator("#promptBtn").click();

  const msg = await page.locator('#demo').innerText();
  console.log("Message is ",msg)
  expect(msg).toContain("Darshan")

})