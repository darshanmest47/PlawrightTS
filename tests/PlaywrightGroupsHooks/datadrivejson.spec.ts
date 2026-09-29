/// <reference types="node" />
import { test, expect } from "@playwright/test";
import * as fs from "fs";
import { json } from "stream/consumers";

const jsonPath = "tests/files/testdata.json";
const files = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

test.describe("Reading from json file", async () => {
  for (const { firstname, lastname, serialno } of files) {
    test(`Jsontest using ${firstname}`, async () => {
      console.log(firstname);
      console.log(lastname);
      console.log(serialno);
    });
  }
});
