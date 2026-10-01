/// <reference types="node" />
import { test, expect } from "@playwright/test";
import * as XLSX from "xlsx";
import * as fs from "fs";

const path = "tests/files/exceldata.xlsx";
const workbook = XLSX.readFile(path);
const sheetName = workbook.SheetNames[1];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

test.describe("Data driven testing using xlsx", () => {
  for (const { firstname, lastname, serialnumber } of data) {
    test(`testing using ${firstname}`, async () => {
      console.log(`firstname is ${firstname}`);
      console.log(`lastname is ${lastname}`);
      console.log(`serial no is ${Number(serialnumber)}`);
    });
  }
});
