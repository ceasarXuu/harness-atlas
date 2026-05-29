import assert from "node:assert/strict";
import test from "node:test";
import { homePages } from "../src/data/home.mjs";

test("localized industry feed records keep matching source identity", () => {
  const zhUpdates = homePages["zh-CN"].sections.find((item) => item.id === "industry").updates;
  const enUpdates = homePages.en.sections.find((item) => item.id === "industry").updates;

  assert.equal(zhUpdates.length, enUpdates.length, "localized feeds should keep the same record count");
  zhUpdates.forEach((update, index) => {
    const counterpart = enUpdates[index];
    for (const field of ["date", "dateTime", "href", "sourceName"]) {
      assert.equal(counterpart[field], update[field], `localized feed record ${index} should keep matching ${field}`);
    }
  });
});
