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

test("industry feed entries pass harness editorial policy gates", () => {
  const forbiddenFraming = [
    /gartner/i,
    /magic quadrant/i,
    /\bleader(?:s|ship)?\b/i,
    /融资|估值|资本/,
    /\b(?:funding|valuation|series [a-z])\b/i,
    /\bpartnership\b|合作/,
    /\bcustomer(?:s)?\b|客户采用|\benterprise adoption\b/i,
    /pwc|dell/i,
  ];
  const removedSources = [
    "https://www.anthropic.com/news/series-h",
    "https://openai.com/index/gartner-2026-agentic-coding-leader/",
    "https://openai.com/index/dell-codex-enterprise-partnership/",
    "https://www.anthropic.com/news/pwc-expanded-partnership",
    "https://blog.google/innovation-and-ai/technology/ai/io-2026-keynote-moment-videos/",
    "https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/",
    "https://www.anthropic.com/news/finance-agents",
  ];
  const harnessSignals = [
    /\b(?:architecture|runtime|workflow|tool|tools|state|memory|permission|policy|sandbox|subagent|hook|mcp|sdk|api|tracing|eval|benchmark|review|agent loop|orchestration|isolation|governance|protocol|automation)\b/i,
    /架构|运行时|工作流|工具|状态|记忆|权限|策略|沙箱|隔离|协议|评估|测评|基准|闭环|编排|治理|审查|接口|连接层|防御/,
  ];

  for (const locale of Object.keys(homePages)) {
    const updates = homePages[locale].sections.find((item) => item.id === "industry").updates;

    for (const update of updates) {
      const framing = `${update.title} ${update.tag} ${update.description}`;
      const body = `${update.title} ${update.tag} ${update.description}`;
      assert.ok(!removedSources.includes(update.href), `${locale} update should not reintroduce removed peripheral source: ${update.href}`);
      assert.ok(!forbiddenFraming.some((pattern) => pattern.test(framing)), `${locale} update should not frame peripheral news: ${update.title}`);
      assert.ok(harnessSignals.some((pattern) => pattern.test(body)), `${locale} update should name a concrete harness mechanism: ${update.title}`);
    }
  }
});
