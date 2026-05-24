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
  ];

  for (const label of forbiddenEnglishUi) {
    assert.doesNotMatch(visibleText, new RegExp(`\\b${label}\\b`), `${label} should be localized on the Chinese homepage`);
  }
});
