import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;
const docs = join(root, "docs");

const requiredPages = [
  "course.html",
  "products.html",
  "standards.html",
  "patterns.html",
  "research.html",
  "timeline.html",
  "glossary.html",
  "references.html",
  "en.html",
];

function readDocsFile(path) {
  return readFileSync(join(docs, path), "utf8");
}

function localHtmlLinks(html) {
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  return hrefs.filter((href) => {
    if (href.startsWith("#")) return false;
    if (/^[a-z]+:\/\//i.test(href)) return false;
    if (href.startsWith("mailto:")) return false;
    return true;
  });
}

test("Pages site exposes first-class sections beyond the homepage", () => {
  const index = readDocsFile("index.html");

  for (const page of requiredPages) {
    assert.ok(
      existsSync(join(docs, page)),
      `missing docs/${page} for GitHub Pages navigation`,
    );
    assert.match(index, new RegExp(`href="${page}"`), `index should link ${page}`);
  }
});

test("Every public docs page has shared navigation and a unique heading", () => {
  for (const page of ["index.html", ...requiredPages]) {
    const html = readDocsFile(page);
    assert.match(html, /<nav class="nav"/, `${page} should include global nav`);
    assert.match(html, /<h1[^>]*>[\s\S]*?<\/h1>/, `${page} should include an h1`);
    assert.match(html, /href="course\.html"/, `${page} should link Course`);
    assert.match(html, /href="products\.html"/, `${page} should link Products`);
    assert.match(html, /href="glossary\.html"/, `${page} should link Glossary`);
  }
});

test("Public docs pages do not contain broken local links", () => {
  for (const page of ["index.html", ...requiredPages]) {
    const html = readDocsFile(page);
    for (const href of localHtmlLinks(html)) {
      const target = href.split("#")[0] || page;
      const absoluteTarget = normalize(join(docs, dirname(page), target));
      assert.ok(
        absoluteTarget.startsWith(docs),
        `${page} link ${href} should stay inside docs or use an absolute URL`,
      );
      assert.ok(existsSync(absoluteTarget), `${page} link ${href} is broken`);
    }
  }
});

test("Chinese homepage localizes visible navigation, buttons, and section labels", () => {
  const html = readDocsFile("index.html");
  const visibleText = html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, "\n");

  const forbiddenEnglishUi = [
    "HOME",
    "COURSE",
    "PRODUCTS",
    "STANDARDS",
    "PATTERNS",
    "RESEARCH",
    "TIMELINE",
    "GLOSSARY",
    "REFERENCES",
    "ENTER ATLAS",
    "PRODUCT MAP",
    "VIEW SOURCE",
    "WHY HARNESS MATTERS",
    "ARCHITECTURE MATRIX",
    "COURSE MAP",
    "ATLAS SECTIONS",
    "AUDIENCE",
    "WITHOUT HARNESS",
    "WITH HARNESS",
    "MAINTAINED BY",
    "MODEL",
    "CONTEXT",
    "TOOLS",
    "STATE",
    "EVAL",
    "POLICY",
    "Context",
    "Tools",
    "State",
    "Planning",
    "Memory",
    "Evaluation",
    "Human",
    "Governance",
    "DEV",
    "INDIE",
    "PM",
    "TEAM",
    "行业时间线",
  ];

  for (const label of forbiddenEnglishUi) {
    assert.doesNotMatch(visibleText, new RegExp(`\\b${label}\\b`), `${label} should be localized on the Chinese homepage`);
  }
});

test("Chinese homepage merges industry updates into the first-scroll experience", () => {
  const html = readDocsFile("index.html");
  const nav = html.match(/<nav class="nav"[\s\S]*?<\/nav>/)?.[0] ?? "";
  const navLabels = [...nav.matchAll(/<a [^>]*>([^<]+)<\/a>/g)].map((match) => match[1]);

  assert.deepEqual(navLabels, ["首页", "学习", "图谱", "搜索", "EN", "GitHub"]);
  assert.doesNotMatch(nav, />术语表</);
  assert.doesNotMatch(nav, />行业动态</);

  assert.match(html, /<section class="hero home-hero">/, "homepage hero should use peek-sized hero class");
  assert.match(
    html,
    /<\/section>\s*<section id="industry" class="section updates-flow">/,
    "industry updates should immediately follow the hero",
  );
  assert.match(html, /<p class="section-kicker">最新行业动态<\/p>/);
  assert.match(html, /href="timeline\.html"/, "homepage should still link to the full updates page");
});

test("Learning page exposes a left-side directory navigation", () => {
  const html = readDocsFile("course.html");

  assert.match(html, /<section class="section learn-shell">/, "learning page should use the two-column shell");
  assert.match(html, /<aside class="learn-sidebar"/, "learning page should include a sidebar");
  assert.match(html, /<nav class="learn-nav"/, "learning sidebar should contain directory navigation");
  assert.match(html, /学习路线/);
  assert.match(html, /主线课程/);
  assert.match(html, /术语表/);
  assert.match(html, /实践检查清单/);
  assert.match(html, /<section class="page-heading">/, "learning page should use a compact page heading");
  assert.match(html, /class="learn-content"/, "learning page should include a main content panel");
});

test("Section pages use compact page headings instead of hero blocks", () => {
  const sectionPages = [
    "course.html",
    "products.html",
    "standards.html",
    "patterns.html",
    "research.html",
    "timeline.html",
    "glossary.html",
    "references.html",
  ];

  for (const page of sectionPages) {
    const html = readDocsFile(page);
    assert.doesNotMatch(html, /<section class="hero/, `${page} should not use a hero block`);
    assert.match(html, /<section class="page-heading">/, `${page} should use compact page heading`);
  }
});
