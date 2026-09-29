/// <reference types="node" />
import { test, expect } from "@playwright/test";
import * as fs from "fs";
import { parse } from "csv-parse/sync";

interface UserTestData {
  firstname: string;
  lastname: string;
  serialnumber: string;
}

const filename = "tests/files/users.csv";
const files = parse(fs.readFileSync(filename, "utf-8"), {
  columns: true,
  skip_empty_lines: true,
}) as UserTestData[];

test.describe("Reading from csv file", async () => {
  for (const { firstname, lastname, serialnumber } of files) {
    test(`Reading from csv with ${firstname}`, async () => {
      console.log(firstname);
      console.log(lastname);
      console.log(serialnumber);
    });
  }
});
