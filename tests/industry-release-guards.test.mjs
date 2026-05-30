import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { homePages } from "../src/data/home.mjs";

const root = new URL("..", import.meta.url).pathname;

function read(path) {
  return readFileSync(path, "utf8");
}

function decodeHtml(text) {
  return text
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function parseFeedRows(html) {
  return [...html.matchAll(/<article class="update-row"[\s\S]*?<\/article>/g)].map((match) => {
    const row = match[0];
    const dateTime = row.match(/<time [^>]*datetime="([^"]+)"/)?.[1] ?? "";
    const date = decodeHtml(row.match(/<time [^>]*>[\s\S]*?([^<]+)<\/time>/)?.[1]?.trim() ?? "");
    const title = decodeHtml(row.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1]?.trim() ?? "");
    const description = decodeHtml(row.match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1]?.trim() ?? "");
    const metaBlock = row.match(/<span class="update-meta"[\s\S]*?<\/span>\s*<a class="source-link-label"/)?.[0] ?? "";
    const meta = [...metaBlock.matchAll(/<span[^>]*>([^<]+)<\/span>/g)].map((item) => decodeHtml(item[1].trim()));
    const href = row.match(/<a class="source-link-label" href="([^"]+)"/)?.[1] ?? "";

    return {
      date,
      dateTime,
      title,
      tag: meta[0] ?? "",
      sourceName: meta[1] ?? "",
      description,
      href,
    };
  });
}

test("generated docs industry feed stays byte-for-byte aligned with source data", () => {
  const fixtures = [
    ["index.html", "zh-CN"],
    ["en.html", "en"],
  ];

  for (const [page, locale] of fixtures) {
    const html = read(join(root, "docs", page));
    const renderedRows = parseFeedRows(html);
    const sourceRows = homePages[locale].sections.find((item) => item.id === "industry").updates;

    assert.equal(renderedRows.length, sourceRows.length, `${page} should render every source feed row`);
    renderedRows.forEach((row, index) => {
      const source = sourceRows[index];
      for (const field of ["date", "dateTime", "title", "tag", "description", "href", "sourceName"]) {
        assert.equal(row[field], source[field], `${page} row ${index} should match source ${field}`);
      }
    });
  }
});

test("latest industry update review report is closed before release", () => {
  const reviewDir = join(root, "vs_review");
  const reviewFile = readdirSync(reviewDir)
    .filter((entry) => /^\d{4}-\d{2}-\d{2}-industry-updates-.*-review\.md$/.test(entry))
    .sort()
    .at(-1);
  const updates = homePages["zh-CN"].sections.find((item) => item.id === "industry").updates;
  const latestDate = updates[0]?.dateTime;
  const latestDateHrefs = updates.filter((item) => item.dateTime === latestDate).map((item) => item.href);

  assert.ok(reviewFile, "industry update release should keep a review report");
  const report = read(join(reviewDir, reviewFile));

  assert.match(report, /- Status: passed\b/, "latest industry update review report should be closed as passed");
  assert.doesNotMatch(report, /- Status: open\b/, "latest industry update review report should not stay open");
  assert.doesNotMatch(report, /^\| pending\b/m, "latest industry update review report should not keep pending table placeholders");
  assert.doesNotMatch(report, /^- pending\b/m, "latest industry update review report should not keep pending list placeholders");
  assert.doesNotMatch(report, /^Pending review\.$/m, "latest industry update review report should not keep a pending conclusion");
  assert.match(report, new RegExp(`- Feed latest date: ${latestDate}\\b`), "latest industry update review should bind to the current feed latest date");
  for (const href of latestDateHrefs) {
    assert.ok(report.includes(href), `latest industry update review should cover current latest-date href ${href}`);
  }
  assert.match(report, /- Allowed to proceed: yes\b/, "latest industry update review report should explicitly allow release");
  assert.match(report, /## Final Conclusion/, "latest industry update review report should include a final conclusion");
});
