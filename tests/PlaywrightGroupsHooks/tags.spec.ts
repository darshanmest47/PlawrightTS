import { test, expect } from "@playwright/test";

test("First test", { tag: ["@smoke", "@regression"] }, async () => {
  console.log("Running with tag smoke and regression");
});

test("Second test", { tag: ["@regression"] }, async () => {
  console.log("Running with tag regression");
});

test("Third test", { tag: ["@smoke"] }, async () => {
  console.log("Running with tag smoke");
});
