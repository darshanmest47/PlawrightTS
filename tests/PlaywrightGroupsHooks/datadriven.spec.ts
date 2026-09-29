import { test, expect } from "@playwright/test";

const datas = [
  ["Darshan", "Mesta", 1],
  ["Suraj", "Mesta", 2],
];
/* Data is stored in two dimensional array */

test.describe.configure({ mode: "serial" });

test.describe("Data driven testing using array", async () => {
  for (const [name, lname, sno] of datas) {
    test(`Data driven test using ${name}`, async () => {
      console.log(`First name is ${name}`);
      console.log(`Last name is ${name}`);
      console.log(`Serial number is ${name}`);
    });
  }
});
