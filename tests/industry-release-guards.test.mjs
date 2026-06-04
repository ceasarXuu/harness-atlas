import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { homePages } from "../src/data/home.mjs";

const root = new URL("..", import.meta.url).pathname;

function read(path) {
  return readFileSync(path, "utf8");
}

function getExactFieldValues(block, field) {
  const regex = new RegExp(`^- ${field}: (.+)$`, "gm");
  return [...block.matchAll(regex)].map((match) => match[1]);
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
  const reportRelativePath = `vs_review/${reviewFile}`;
  const reportDate = reviewFile.slice(0, 10);
  const metadataEndIndex = report.indexOf("\n## Round ");
  const metadataBlock = metadataEndIndex >= 0 ? report.slice(0, metadataEndIndex) : report;
  const finalConclusionIndex = report.lastIndexOf("\n## Final Conclusion");
  const lastRoundIndex = report.lastIndexOf("\n## Round ");
  const lastClosureIndex = report.lastIndexOf("\n### Closure Status");
  const candidateAuditIndex = report.lastIndexOf("\n### Candidate Audit");
  const candidateAuditEndIndex = lastClosureIndex > candidateAuditIndex ? lastClosureIndex : report.length;
  const candidateAuditBlock = candidateAuditIndex >= 0 ? report.slice(candidateAuditIndex, candidateAuditEndIndex) : "";
  const terminalClosure = lastClosureIndex >= 0 && finalConclusionIndex > lastClosureIndex
    ? report.slice(lastClosureIndex, finalConclusionIndex)
    : "";

  assert.doesNotThrow(
    () => execFileSync("git", ["ls-files", "--error-unmatch", reportRelativePath], { cwd: root }),
    `latest industry update review report should be tracked in git: ${reportRelativePath}`,
  );

  assert.deepEqual(
    getExactFieldValues(metadataBlock, "Status"),
    ["passed"],
    "latest industry update review report metadata should contain exactly one authoritative passed status",
  );
  assert.deepEqual(
    getExactFieldValues(metadataBlock, "Screening run date"),
    [reportDate],
    "latest industry update review report metadata should bind the screening run date to the report filename date",
  );
  assert.ok(
    reportDate >= latestDate,
    "latest industry update review report should not predate the current feed latest date",
  );
  assert.doesNotMatch(
    report,
    /^\|[^\n]*\|\s*pending\s*\|\s*pending\s*\|\s*pending\s*\|\s*pending\s*\|?$/m,
    "latest industry update review report should not keep pending table placeholders",
  );
  assert.doesNotMatch(report, /^- pending\b/m, "latest industry update review report should not keep pending list placeholders");
  assert.doesNotMatch(report, /^Pending review\.$/m, "latest industry update review report should not keep a pending conclusion");
  assert.match(report, /^### Candidate Audit\b/m, "latest industry update review report should include a candidate audit section");
  assert.match(
    candidateAuditBlock,
    /^\| Source \| Visible Date \| Candidate Title \| Gate Result \| Decision \| Reason \|$/m,
    "latest industry update review report should keep the candidate audit header",
  );
  assert.match(
    candidateAuditBlock,
    /^\| .+ \| .+ \| .+ \| .+ \| .+ \| .+ \|$/m,
    "latest industry update review report should include at least one structured candidate audit row",
  );
  assert.deepEqual(
    getExactFieldValues(terminalClosure, "Feed latest date"),
    [latestDate],
    "latest industry update review should bind the terminal closure to the current feed latest date",
  );
  for (const href of latestDateHrefs) {
    assert.ok(terminalClosure.includes(href), `terminal closure should cover current latest-date href ${href}`);
  }
  assert.ok(lastClosureIndex > lastRoundIndex, "latest industry update review report should include a terminal closure status after the latest round");
  assert.deepEqual(
    getExactFieldValues(terminalClosure, "Accepted blocking findings fixed"),
    ["yes"],
    "terminal closure should confirm accepted blocking findings are fixed exactly once",
  );
  assert.deepEqual(
    getExactFieldValues(terminalClosure, "Blocking re-review completed"),
    ["yes"],
    "terminal closure should confirm blocking re-review completed exactly once",
  );
  assert.deepEqual(
    getExactFieldValues(terminalClosure, "Blocking re-review passed"),
    ["yes"],
    "terminal closure should confirm blocking re-review passed exactly once",
  );
  assert.deepEqual(
    getExactFieldValues(terminalClosure, "Validation result"),
    ["passed"],
    "terminal closure should record exactly one passing validation result",
  );
  assert.deepEqual(
    getExactFieldValues(terminalClosure, "Allowed to proceed"),
    ["yes"],
    "latest industry update review report should explicitly allow release exactly once in the terminal closure status",
  );
  assert.match(report, /^## Final Conclusion\b/m, "latest industry update review report should include a final conclusion heading");
  assert.ok(finalConclusionIndex > lastRoundIndex, "latest industry update review report should place final conclusion after the latest round");
});
