import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import test from "node:test";
import { homePages } from "../src/data/home.mjs";
import { frameworkNodes, getFrameworkNodes, getFrameworkOther, getNav, githubStars, glossaryPage, localeMessages, locales, navModel } from "../src/data/site.mjs";

const root = new URL("..", import.meta.url).pathname;
const docs = join(root, "docs");
const frameworkNodePages = Array.from({ length: 15 }, (_, index) => {
  return `framework-${String(index + 1).padStart(2, "0")}.html`;
});

const requiredPages = [
  ...frameworkNodePages,
  "framework-glossary.html",
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
  const homepageEntryPages = ["framework-01.html", "products.html"];

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
  assert.equal(existsSync(join(docs, "course.html")), false, "framework roadmap should not be a standalone docs page");
  assert.equal(existsSync(join(docs, "framework-practice.html")), false, "practice checklist should be removed");
  assert.equal(existsSync(join(docs, "framework-modules.html")), false, "framework outline page should be removed");
  assert.doesNotMatch(index, /href="framework-glossary\.html"/, "homepage should not link glossary after removing framework path module");
  assert.doesNotMatch(index, /href="[^"]*#search"/, "homepage should not expose search anchors");
});

test("Every public docs page has shared navigation and a unique heading", () => {
  for (const page of ["index.html", ...requiredPages]) {
    const html = readDocsFile(page);
    assert.match(html, /<nav class="nav"/, `${page} should include global nav`);
    assert.match(html, /<h1[^>]*>[\s\S]*?<\/h1>/, `${page} should include an h1`);
    assert.match(html, /href="framework-01\.html"/, `${page} should link Framework`);
    assert.doesNotMatch(html, /href="course\.html"/, `${page} should not link removed framework roadmap`);
    assert.match(html, /href="products\.html"/, `${page} should link Products`);
    assert.doesNotMatch(html, /href="glossary\.html"/, `${page} should not link standalone Glossary`);
  }
});

test("Public docs pages do not contain broken local links", () => {
  for (const page of ["index.html", ...requiredPages]) {
    const html = readDocsFile(page);
    for (const href of localHtmlLinks(html)) {
      const target = href.split("#")[0] || page;
      const localTarget = target.startsWith("/harness-atlas/") ? target.slice("/harness-atlas/".length) : target;
      const absoluteTarget = normalize(join(docs, dirname(page), localTarget));
      assert.ok(
        absoluteTarget.startsWith(docs),
        `${page} link ${href} should stay inside docs or use an absolute URL`,
      );
      assert.ok(existsSync(absoluteTarget), `${page} link ${href} is broken`);
    }
    assert.doesNotMatch(html, /(?:href|src)="\/_astro\//, `${page} should prefix Astro assets for GitHub Pages project paths`);
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
  assert.doesNotMatch(zh, />读第 1 课</, "homepage should not keep the secondary first-lesson CTA");
  assert.doesNotMatch(en, />Read Lesson 1</, "English homepage should not keep the secondary first-lesson CTA");
  assert.match(zh, /class="equation-group"[\s\S]*?Model[\s\S]*?×[\s\S]*?Harness[\s\S]*?<\/span>/, "Model times Harness should stay in one equation group");
  assert.match(en, /class="equation-group"[\s\S]*?Model[\s\S]*?×[\s\S]*?Harness[\s\S]*?<\/span>/, "English homepage should keep Model times Harness in one equation group");
  assert.doesNotMatch(zh, /<section id="atlas"/, "homepage should not keep a standalone ecosystem atlas section");
  assert.doesNotMatch(zh, /<section id="evidence"/, "homepage should not keep a standalone research/source section");
  assert.doesNotMatch(zh, /<section id="learn"/, "homepage should not keep a standalone framework path section");
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
  assert.doesNotMatch(chineseMap, /task \/ goal \/ spec/i);
  assert.doesNotMatch(chineseMap, /base capability/i);
  assert.doesNotMatch(chineseMap, /controlled agent work/i);
  assert.doesNotMatch(chineseMap, /受控 Agent 工作/i);

  assert.match(englishMap, /runtime\.map/);
  assert.match(englishMap, /task \/ goal \/ spec/);
  assert.match(englishMap, /base capability MODEL/i);
  assert.match(englishMap, /plan act observe verify repair/i);
  assert.doesNotMatch(englishMap, /controlled agent work/i);
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
    assert.ok(section.updates.length >= 10, `${locale} should keep a useful cold-start feed`);
    assert.equal(section.initialVisible, 3, `${locale} should show an initial page of three updates`);
    assert.equal(section.pageSize, 2, `${locale} should reveal later updates incrementally`);
    assert.ok(section.sourceLinkLabel, `${locale} should label original-source links`);

    for (const update of section.updates) {
      for (const field of ["href", "date", "dateTime", "title", "tag", "description", "sourceName"]) assert.ok(update[field], `${locale} update should have ${field}`);
      assert.ok(update.title.length <= 80, `${locale} update title should stay short`);
      assert.ok(update.tag.length <= 24, `${locale} update tag should stay short`);
      assert.ok(update.description.length >= 100 && update.description.length <= 200, `${locale} update description should stay between 100 and 200 characters`);
    }
  }

  for (const page of ["index.html", "en.html"]) {
    const html = readDocsFile(page);
    const rows = [...html.matchAll(/<article class="update-row"[\s\S]*?<\/article>/g)].map((match) => match[0]);

    const section = homePages[page === "index.html" ? "zh-CN" : "en"].sections.find((item) => item.id === "industry");
    assert.equal(rows.length, section.updates.length, `${page} should render the static feed records for incremental loading`);
    assert.equal(rows.filter((row) => /\shidden\b/.test(row)).length, section.updates.length - section.initialVisible, `${page} should hide later feed rows until scroll`);
    rows.slice(0, 3).forEach((row) => assert.doesNotMatch(row, /\shidden\b/, `${page} first-page update rows should be visible`));
    for (const row of rows) {
      assert.doesNotMatch(row, /<article class="update-row"[^>]*href=/, `${page} whole update row should not be linked`);
      assert.match(row, /<a class="source-link-label" href="[^"]+" target="_blank" rel="noopener noreferrer"[\s\S]*?(查看原文|View Source)[\s\S]*?<\/a>/, `${page} source cue should be the only external link`);
      assert.match(row, /<time [^>]*datetime="[^"]+"[^>]*>[\s\S]*?<\/time>/, `${page} update row should render a date`);
      assert.match(row, /<h3[^>]*>[\s\S]*?<\/h3>/, `${page} update row should render a title`);
      assert.match(row, /class="update-copy"[\s\S]*class="update-meta"/, `${page} update row should render tag metadata after the copy`);
      assert.match(row, /<p[^>]*>[\s\S]*?<\/p>/, `${page} update row should render a description`);
    }
    assert.match(html, /data-feed-sentinel/, `${page} should render a scroll sentinel for auto pagination`); assert.match(html, /IntersectionObserver/, `${page} should auto-load later feed rows on scroll`);
    assert.doesNotMatch(html, /section-actions/, `${page} should not render a full-updates button`);
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

  assert.deepEqual(navByPage["index.html"].map((item) => item.label), ["首页", "框架", "生态", "EN", `GitHub ★ ${githubStars}`]);
  assert.deepEqual(navByPage["en.html"].map((item) => item.label), ["HOME", "FRAMEWORK", "ATLAS", "中文", `GITHUB ★ ${githubStars}`]);
  assert.equal(navByPage["index.html"].length, navByPage["en.html"].length, "localized top nav should expose the same number of tabs");
  assert.deepEqual(
    navByPage["index.html"].map((item) => item.href),
    ["./", "framework-01.html", "products.html", "en.html", "https://github.com/ceasarXuu/harness-atlas"],
  );
  assert.deepEqual(
    navByPage["en.html"].map((item) => item.href),
    ["./", "en-framework-01.html", "products.html", "index.html", "https://github.com/ceasarXuu/harness-atlas"],
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

  assert.deepEqual(keys, ["home", "framework", "atlas", "locale", "github"]);
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

  assert.deepEqual(navLabels, ["首页", "框架", "生态", "EN", `GitHub ★ ${githubStars}`]);
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
  assert.doesNotMatch(industry, />查看全部动态</, "industry section should not render a manual full-updates button"); assert.match(industry, /target="_blank"/, "industry updates should link to source pages");
});

test("Framework page exposes a left-side directory navigation", () => {
  const learningPages = [
    ...frameworkNodes.map((lesson) => [lesson.href, lesson.title]),
    ["framework-glossary.html", glossaryPage.heading],
  ];

  for (const [page, heading] of learningPages) {
    const html = readDocsFile(page);
    const sidebar = html.match(/<aside class="framework-sidebar"[\s\S]*?<\/aside>/)?.[0] ?? "";

    assert.match(html, /<section class="section framework-shell">/, `${page} should use the two-column shell`);
    assert.match(html, /<aside class="framework-sidebar"/, `${page} should include a sidebar`);
    assert.match(html, /<nav class="framework-nav"/, `${page} sidebar should contain directory navigation`);
    assert.match(html, new RegExp(`<h1 class="content-title">${heading}</h1>`), `${page} should render its framework subpage`);
    assert.match(html, /class="framework-content"/, `${page} should include a main content panel`);
    assert.match(sidebar, /href="framework-01\.html"/);
    assert.match(sidebar, /href="framework-15\.html"/);
    assert.match(sidebar, /href="framework-glossary\.html"/);
    assert.doesNotMatch(sidebar, /href="course\.html"/);
    assert.doesNotMatch(sidebar, />框架路线</);
    assert.match(sidebar, />其他</);
    assert.doesNotMatch(sidebar, /href="#/);
    assert.doesNotMatch(sidebar, /href="patterns\.html"/);
    assert.doesNotMatch(sidebar, /href="framework-practice\.html"/);
  }
});

test("Framework pages expose previous and next navigation at the bottom only", () => {
  for (const locale of locales) {
    const labels = locale === "en" ? ["Previous Chapter", "Next Chapter"] : ["上一章", "下一章"];
    const sequence = [
      ...getFrameworkNodes(locale).map((lesson) => [lesson.href, lesson.title]),
      ...getFrameworkOther(locale).map((item) => [item.href, item.label]),
    ];

    sequence.forEach(([page], index) => {
      const html = readDocsFile(page);
      const topPager = html.match(/<nav class="[^"]*\bframework-pager\b[^"]*\btop\b[^"]*"[\s\S]*?<\/nav>/)?.[0] ?? "";
      const bottomPager = html.match(/<nav class="[^"]*\bframework-pager\b[^"]*\bbottom\b[^"]*"[\s\S]*?<\/nav>/)?.[0] ?? "";
      const previous = sequence[index - 1];
      const next = sequence[index + 1];

      assert.equal(topPager, "", `${page} should not render pager navigation above the title`);
      assert.ok(bottomPager, `${page} should render pager navigation at the bottom`);
      if (previous) assert.match(bottomPager, new RegExp(`href="${previous[0]}"[\\s\\S]*?${labels[0]}[\\s\\S]*?${previous[1]}`), `${page} should link previous page`);
      else assert.doesNotMatch(bottomPager, new RegExp(labels[0]), `${page} should not render previous on the first framework page`);
      if (next) assert.match(bottomPager, new RegExp(`href="${next[0]}"[\\s\\S]*?${labels[1]}[\\s\\S]*?${next[1]}`), `${page} should link next page`);
      else assert.doesNotMatch(bottomPager, new RegExp(labels[1]), `${page} should not render next on the last lesson`);
    });
  }
});

test("Section pages start directly with content instead of top heading blocks", () => {
  const sectionPages = [
    ...frameworkNodePages,
    "framework-glossary.html",
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
