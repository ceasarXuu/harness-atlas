import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import test from "node:test";
import { getNav, localeMessages, locales, navModel } from "../src/data/site.mjs";

const root = new URL("..", import.meta.url).pathname;
const docs = join(root, "docs");
const courseLessonPages = Array.from({ length: 11 }, (_, index) => {
  return `course-${String(index + 1).padStart(2, "0")}.html`;
});

const requiredPages = [
  "course.html",
  ...courseLessonPages,
  "course-other-glossary.html",
  "products.html",
  "standards.html",
  "patterns.html",
  "research.html",
  "timeline.html",
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

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, "\n")
    .replace(/\s+/g, " ")
    .trim();
}

test("Pages site exposes first-class sections beyond the homepage", () => {
  const index = readDocsFile("index.html");
  const homepageEntryPages = [
    "course.html",
    "course-01.html",
    "course-other-glossary.html",
    "products.html",
    "standards.html",
    "patterns.html",
    "research.html",
    "timeline.html",
    "references.html",
  ];

  for (const page of requiredPages) {
    assert.ok(
      existsSync(join(docs, page)),
      `missing docs/${page} for GitHub Pages navigation`,
    );
  }

  for (const page of homepageEntryPages) {
    assert.match(index, new RegExp(`href="${page}"`), `index should link ${page}`);
  }
  assert.equal(existsSync(join(docs, "glossary.html")), false, "glossary should not be a standalone docs page");
  assert.equal(existsSync(join(docs, "course-practice.html")), false, "practice checklist should be removed");
  assert.equal(existsSync(join(docs, "course-modules.html")), false, "course outline page should be removed");
  assert.match(index, /href="course-other-glossary\.html"/, "index should link glossary as a learning subpage");
  assert.doesNotMatch(index, /href="[^"]*#search"/, "homepage should not expose search anchors");
});

test("Every public docs page has shared navigation and a unique heading", () => {
  for (const page of ["index.html", ...requiredPages]) {
    const html = readDocsFile(page);
    assert.match(html, /<nav class="nav"/, `${page} should include global nav`);
    assert.match(html, /<h1[^>]*>[\s\S]*?<\/h1>/, `${page} should include an h1`);
    assert.match(html, /href="course\.html"/, `${page} should link Course`);
    assert.match(html, /href="products\.html"/, `${page} should link Products`);
    assert.doesNotMatch(html, /href="glossary\.html"/, `${page} should not link standalone Glossary`);
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

test("Chinese pages localize page chrome, cards, and accessibility labels", () => {
  const chinesePages = requiredPages.filter((page) => page !== "en.html");
  const forbiddenChineseUi = [
    /aria-label="Main navigation"/,
    /aria-label="Harness Atlas Home"/,
    />Official Docs</,
    />Papers</,
    />Blogs</,
    />Changelogs</,
    />Frameworks</,
    />Comparison</,
    />Interaction</,
    />Context</,
    />Tools</,
    />Execution</,
    />Evaluation</,
    />Governance</,
    /HARNESS_ATLAS \/ PRODUCTS/,
    /HARNESS_ATLAS \/ STANDARDS/,
    /HARNESS_ATLAS \/ PATTERNS/,
    /HARNESS_ATLAS \/ RESEARCH/,
    /HARNESS_ATLAS \/ TIMELINE/,
    /HARNESS_ATLAS \/ REFERENCES/,
    /HARNESS_ATLAS \/ COURSE/,
  ];

  for (const page of ["index.html", ...chinesePages]) {
    const html = readDocsFile(page);
    assert.match(html, /<html lang="zh-CN"/, `${page} should declare Chinese language`);
    assert.match(html, /aria-label="主导航"/, `${page} should localize main navigation aria label`);
    assert.match(html, /aria-label="Harness Atlas 首页"/, `${page} should localize home aria label`);

    for (const pattern of forbiddenChineseUi) {
      assert.doesNotMatch(html, pattern, `${page} contains non-localized UI: ${pattern}`);
    }
  }
});

test("English page has an explicit language boundary", () => {
  const html = readDocsFile("en.html");
  const textWithoutLanguageSwitch = visibleText(html).replace(/中文/g, "");

  assert.match(html, /<html lang="en"/, "English page should declare English language");
  assert.match(html, /aria-label="Main navigation"/, "English page should keep English navigation aria label");
  assert.match(html, /Detailed section pages are currently maintained in Chinese\./);
  assert.doesNotMatch(textWithoutLanguageSwitch, /[\u4e00-\u9fff]/, "English page should not leak Chinese UI text beyond the language switch");
});

test("Chinese and English top navigation have matching structure", () => {
  const navByPage = {};

  for (const page of ["index.html", "en.html"]) {
    const html = readDocsFile(page);
    const nav = html.match(/<nav class="nav"[\s\S]*?<\/nav>/)?.[0] ?? "";
    navByPage[page] = [...nav.matchAll(/<a [^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)]
      .map((match) => ({ href: match[1], label: match[2] }));
  }

  assert.deepEqual(navByPage["index.html"].map((item) => item.label), ["首页", "学习", "图谱", "EN", "GitHub"]);
  assert.deepEqual(navByPage["en.html"].map((item) => item.label), ["HOME", "COURSE", "ATLAS", "中文", "GITHUB"]);
  assert.equal(navByPage["index.html"].length, navByPage["en.html"].length, "localized top nav should expose the same number of tabs");
  assert.deepEqual(
    navByPage["index.html"].map((item) => item.href),
    ["./", "course.html", "products.html", "en.html", "https://github.com/ceasarXuu/harness-atlas"],
  );
  assert.deepEqual(
    navByPage["en.html"].map((item) => item.href),
    ["./", "course.html", "products.html", "index.html", "https://github.com/ceasarXuu/harness-atlas"],
  );
  assert.doesNotMatch(readDocsFile("en.html"), /<section id="search" class="section">/);
});

test("Top navigation is generated from one locale-aware schema", () => {
  const keys = navModel.map((item) => item.key);

  assert.deepEqual(keys, ["home", "course", "atlas", "locale", "github"]);
  assert.deepEqual(locales, ["zh-CN", "en"]);

  for (const locale of locales) {
    assert.deepEqual(Object.keys(localeMessages[locale].nav), keys, `${locale} nav copy should match nav schema keys`);
    assert.deepEqual(getNav(locale).map((item) => item.key), keys, `${locale} generated nav should preserve schema order`);

    for (const item of getNav(locale)) {
      assert.ok(item.href, `${locale}.${item.key} should have a href`);
      assert.ok(item.label, `${locale}.${item.key} should have a label`);
    }
  }
});

test("Chinese homepage merges industry updates into the first-scroll experience", () => {
  const html = readDocsFile("index.html");
  const nav = html.match(/<nav class="nav"[\s\S]*?<\/nav>/)?.[0] ?? "";
  const navLabels = [...nav.matchAll(/<a [^>]*>([^<]+)<\/a>/g)].map((match) => match[1]);

  assert.deepEqual(navLabels, ["首页", "学习", "图谱", "EN", "GitHub"]);
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
  const learningPages = [
    ["course.html", "学习路线"],
    ["course-01.html", "Agent Harness 定义"],
    ["course-02.html", "Context Engineering"],
    ["course-03.html", "Tools and MCP"],
    ["course-04.html", "Skills and Workflows"],
    ["course-05.html", "State, Memory and Session"],
    ["course-06.html", "Planning and Execution Loop"],
    ["course-07.html", "Multi-agent Orchestration"],
    ["course-08.html", "Evaluation and Benchmark"],
    ["course-09.html", "Security, Permission and Governance"],
    ["course-10.html", "Product Architecture"],
    ["course-11.html", "Future of Harness"],
    ["course-other-glossary.html", "术语表"],
  ];

  for (const [page, heading] of learningPages) {
    const html = readDocsFile(page);
    const sidebar = html.match(/<aside class="learn-sidebar"[\s\S]*?<\/aside>/)?.[0] ?? "";

    assert.match(html, /<section class="section learn-shell">/, `${page} should use the two-column shell`);
    assert.match(html, /<aside class="learn-sidebar"/, `${page} should include a sidebar`);
    assert.match(html, /<nav class="learn-nav"/, `${page} sidebar should contain directory navigation`);
    assert.match(html, new RegExp(`<h1 class="content-title">${heading}</h1>`), `${page} should render its learning subpage`);
    assert.match(html, /class="learn-content"/, `${page} should include a main content panel`);
    assert.match(sidebar, /href="course\.html"/);
    assert.match(sidebar, /href="course-01\.html"/);
    assert.match(sidebar, /href="course-11\.html"/);
    assert.match(sidebar, /href="course-other-glossary\.html"/);
    assert.match(sidebar, />其他</);
    assert.doesNotMatch(sidebar, /href="#/);
    assert.doesNotMatch(sidebar, /href="patterns\.html"/);
    assert.doesNotMatch(sidebar, /href="course-practice\.html"/);
  }
});

test("Section pages start directly with content instead of top heading blocks", () => {
  const sectionPages = [
    "course.html",
    ...courseLessonPages,
    "course-other-glossary.html",
    "products.html",
    "standards.html",
    "patterns.html",
    "research.html",
    "timeline.html",
    "references.html",
  ];

  for (const page of sectionPages) {
    const html = readDocsFile(page);
    assert.doesNotMatch(html, /<section class="hero/, `${page} should not use a hero block`);
    assert.doesNotMatch(html, /<section class="page-heading">/, `${page} should not use a separate page heading block`);
    assert.match(html, /<main>\s*<section class="section/, `${page} should start main content immediately`);
  }
});
