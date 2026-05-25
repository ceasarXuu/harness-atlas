import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import test from "node:test";
import { homePages } from "../src/data/home.mjs";
import { getNav, githubStars, localeMessages, locales, navModel } from "../src/data/site.mjs";

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

function textContent(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function harnessMapText(html) {
  const map = html.match(/<aside class="system-card harness-map"[\s\S]*?<\/aside>/)?.[0] ?? "";
  return textContent(map);
}

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? sourceFiles(path) : [path];
  });
}

test("Pages site exposes first-class sections beyond the homepage", () => {
  const index = readDocsFile("index.html");
  const homepageEntryPages = [
    "course.html",
    "research.html",
    "timeline.html",
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
  assert.doesNotMatch(index, /href="course-other-glossary\.html"/, "homepage should not link glossary after removing learning path module");
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
    "Planning",
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
    />Execution</,
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
  assert.doesNotMatch(textWithoutLanguageSwitch, /[\u4e00-\u9fff]/, "English page should not leak Chinese UI text beyond the language switch");
});

test("Localized homepages use the same component structure", () => {
  const zh = readDocsFile("index.html");
  const en = readDocsFile("en.html");
  const sectionSignature = (html) => {
    return [...html.matchAll(/<section(?: id="([^"]+)")? class="([^"]+)"/g)]
      .map((match) => ({ id: match[1] ?? "", className: match[2] }));
  };
  const cardCounts = (html) => {
    return [...html.matchAll(/<section(?: id="([^"]+)")? class="[^"]*"[\s\S]*?<\/section>/g)]
      .map((match) => ({
        id: match[1] ?? "",
        cards: [...match[0].matchAll(/class="cell"/g)].length,
        updates: [...match[0].matchAll(/class="update-row"/g)].length,
      }));
  };

  assert.deepEqual(sectionSignature(zh), sectionSignature(en), "localized homepages should render the same sections in the same order");
  assert.deepEqual(cardCounts(zh), cardCounts(en), "localized homepages should render the same repeated component counts");
  assert.doesNotMatch(en, /VIEW SOURCE/, "English homepage should not add a language-only source button");
  assert.deepEqual(sectionSignature(zh).map((section) => section.id), ["", "industry"], "homepages should stay focused on hero and industry updates");
  assert.match(zh, /class="hero-audience"/, "homepage audience copy should live inside hero");
  assert.match(en, /class="hero-audience"/, "English homepage audience copy should live inside hero");
  assert.doesNotMatch(zh, /class="badge"/, "homepage should not duplicate the equation in a badge");
  assert.doesNotMatch(en, /class="badge"/, "English homepage should not duplicate the equation in a badge");
  assert.doesNotMatch(zh, /<section id="atlas"/, "homepage should not keep a standalone ecosystem atlas section");
  assert.doesNotMatch(zh, /<section id="evidence"/, "homepage should not keep a standalone research/source section");
  assert.doesNotMatch(zh, /<section id="learn"/, "homepage should not keep a standalone learning path section");
  assert.doesNotMatch(zh, /<p class="section-kicker">适合读者<\/p>/, "homepage should not keep audience as a heavy standalone section");
});

test("Homepage runtime map copy is localized without changing structure", () => {
  const chineseMap = harnessMapText(readDocsFile("index.html"));
  const englishMap = harnessMapText(readDocsFile("en.html"));

  assert.match(chineseMap, /运行时图/);
  assert.match(chineseMap, /任务 \/ 目标 \/ 规格/);
  assert.match(chineseMap, /基础能力 模型/);
  assert.match(chineseMap, /上下文/);
  assert.match(chineseMap, /工具/);
  assert.match(chineseMap, /状态/);
  assert.match(chineseMap, /策略/);
  assert.match(chineseMap, /评估/);
  assert.match(chineseMap, /记忆/);
  assert.match(chineseMap, /计划 执行 观察 验证 修复/);
  assert.match(chineseMap, /受控 Agent 工作/);
  assert.doesNotMatch(chineseMap, /task \/ goal \/ spec/i);
  assert.doesNotMatch(chineseMap, /base capability/i);
  assert.doesNotMatch(chineseMap, /controlled agent work/i);

  assert.match(englishMap, /runtime\.map/);
  assert.match(englishMap, /task \/ goal \/ spec/);
  assert.match(englishMap, /base capability MODEL/i);
  assert.match(englishMap, /plan act observe verify repair/i);
  assert.match(englishMap, /controlled agent work/i);
  assert.equal(
    (readDocsFile("index.html").match(/class="ring-node/g) ?? []).length,
    (readDocsFile("en.html").match(/class="ring-node/g) ?? []).length,
    "localized runtime maps should keep the same node count",
  );
});

test("Homepage industry feed uses short linked update records", () => {
  for (const locale of Object.keys(homePages)) {
    const section = homePages[locale].sections.find((item) => item.id === "industry");
    assert.ok(section, `${locale} should define an industry updates section`);
    assert.ok(section.updates.length >= 3, `${locale} should keep a useful homepage feed`);

    for (const update of section.updates) {
      assert.ok(update.href, `${locale} update should have a link`);
      assert.ok(update.date, `${locale} update should have a display date`);
      assert.ok(update.dateTime, `${locale} update should have a machine-readable date`);
      assert.ok(update.title, `${locale} update should have a title`);
      assert.ok(update.tag, `${locale} update should have a tag`);
      assert.ok(update.description, `${locale} update should have a description`);
      assert.ok(update.title.length <= 80, `${locale} update title should stay short`);
      assert.ok(update.tag.length <= 24, `${locale} update tag should stay short`);
      assert.ok(update.description.length <= 200, `${locale} update description should stay under 200 characters`);
    }
  }

  for (const page of ["index.html", "en.html"]) {
    const html = readDocsFile(page);
    const rows = [...html.matchAll(/<a class="update-row"[\s\S]*?<\/a>/g)].map((match) => match[0]);

    assert.equal(rows.length, 3, `${page} should render three industry feed rows`);
    for (const row of rows) {
      assert.match(row, /href="[^"]+"/, `${page} update row should be linked`);
      assert.match(row, /<time [^>]*datetime="[^"]+"[^>]*>[\s\S]*?<\/time>/, `${page} update row should render a date`);
      assert.match(row, /<h3[^>]*>[\s\S]*?<\/h3>/, `${page} update row should render a title`);
      assert.match(row, /class="update-tag"/, `${page} update row should render a tag`);
      assert.match(row, /<p[^>]*>[\s\S]*?<\/p>/, `${page} update row should render a description`);
    }
  }
});

test("Astro pages, layouts, and components do not hard-code localized UI copy", () => {
  const source = [
    ...sourceFiles(join(root, "src/pages")),
    ...sourceFiles(join(root, "src/components")),
    ...sourceFiles(join(root, "src/layouts")),
  ];
  const forbiddenUiCopy = [
    /[\u4e00-\u9fff]/,
    /VIEW SOURCE/,
    /ENTER ATLAS/,
    /PRODUCT MAP/,
    /MAINTAINED BY/,
    /Detailed section pages are currently maintained in Chinese/,
  ];

  for (const file of source) {
    const text = readFileSync(file, "utf8");
    for (const pattern of forbiddenUiCopy) {
      assert.doesNotMatch(text, pattern, `${file} should receive localized UI copy from data, not hard-code it`);
    }
  }
});

test("Chinese and English top navigation have matching structure", () => {
  const navByPage = {};

  for (const page of ["index.html", "en.html"]) {
    const html = readDocsFile(page);
    const nav = html.match(/<nav class="nav"[\s\S]*?<\/nav>/)?.[0] ?? "";
    navByPage[page] = [...nav.matchAll(/<a ([^>]*)>([\s\S]*?)<\/a>/g)]
      .map((match) => {
        const href = match[1].match(/href="([^"]+)"/)?.[1] ?? "";
        const target = match[1].match(/target="([^"]+)"/)?.[1] ?? "";
        const rel = match[1].match(/rel="([^"]+)"/)?.[1] ?? "";
        return { href, label: textContent(match[2]), rel, target };
      });
  }

  assert.deepEqual(navByPage["index.html"].map((item) => item.label), ["首页", "学习", "生态", "EN", `GitHub ★ ${githubStars}`]);
  assert.deepEqual(navByPage["en.html"].map((item) => item.label), ["HOME", "COURSE", "ATLAS", "中文", `GITHUB ★ ${githubStars}`]);
  assert.equal(navByPage["index.html"].length, navByPage["en.html"].length, "localized top nav should expose the same number of tabs");
  assert.deepEqual(
    navByPage["index.html"].map((item) => item.href),
    ["./", "course.html", "products.html", "en.html", "https://github.com/ceasarXuu/harness-atlas"],
  );
  assert.deepEqual(
    navByPage["en.html"].map((item) => item.href),
    ["./", "course.html", "products.html", "index.html", "https://github.com/ceasarXuu/harness-atlas"],
  );
  for (const page of ["index.html", "en.html"]) {
    const github = navByPage[page].at(-1);
    assert.equal(github.target, "_blank", `${page} GitHub nav should open in a new tab`);
    assert.equal(github.rel, "noreferrer", `${page} GitHub nav should avoid opener access`);
  }
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
  const navLabels = [...nav.matchAll(/<a [^>]*>([\s\S]*?)<\/a>/g)].map((match) => textContent(match[1]));

  assert.deepEqual(navLabels, ["首页", "学习", "生态", "EN", `GitHub ★ ${githubStars}`]);
  assert.doesNotMatch(nav, />术语表</);
  assert.doesNotMatch(nav, />行业动态</);

  assert.match(html, /<section class="[^"]*\bhero\b[^"]*\bhome-hero\b/, "homepage hero should use peek-sized hero class");
  assert.match(
    html,
    /<\/section>\s*<section id="industry" class="section updates-flow"/,
    "industry updates should immediately follow the hero",
  );
  const industry = html.match(/<section id="industry" class="section updates-flow"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(industry, /<h2[^>]*>行业动态<\/h2>/, "industry section should use one concise heading");
  assert.doesNotMatch(industry, /section-kicker/, "industry section should not render a kicker");
  assert.doesNotMatch(industry, /section-intro/, "industry section should not render an intro paragraph");
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

test("Learning pages expose previous and next navigation at top and bottom", () => {
  const sequence = [
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

  sequence.forEach(([page], index) => {
    const html = readDocsFile(page);
    const pagers = [...html.matchAll(/<nav class="[^"]*\blearn-pager\b[^"]*"[\s\S]*?<\/nav>/g)].map((match) => match[0]);
    const previous = sequence[index - 1];
    const next = sequence[index + 1];

    assert.equal(pagers.length, 2, `${page} should render pager navigation at top and bottom`);
    for (const pager of pagers) {
      if (previous) {
        assert.match(pager, new RegExp(`href="${previous[0]}"`), `${page} should link previous page ${previous[0]}`);
        assert.match(pager, new RegExp(`上一节[\\s\\S]*?${previous[1]}`), `${page} should label previous page`);
      } else {
        assert.doesNotMatch(pager, /上一节/, `${page} should not render previous on the first lesson`);
      }

      if (next) {
        assert.match(pager, new RegExp(`href="${next[0]}"`), `${page} should link next page ${next[0]}`);
        assert.match(pager, new RegExp(`下一节[\\s\\S]*?${next[1]}`), `${page} should label next page`);
      } else {
        assert.doesNotMatch(pager, /下一节/, `${page} should not render next on the last lesson`);
      }
    }
  });
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
