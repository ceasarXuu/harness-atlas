import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { frameworkNodes, getFrameworkNodePage } from "../src/data/site.mjs";

const root = new URL("..", import.meta.url).pathname;
const src = join(root, "src");
const dist = join(root, "dist");
const docs = join(root, "docs");
const frameworkRoot = join(root, "framework");
const pagesBase = "/harness-atlas/";
const frameworkNodePages = Array.from({ length: 15 }, (_, index) => {
  return `framework-${String(index + 1).padStart(2, "0")}.html`;
});
const englishFrameworkNodePages = Array.from({ length: 15 }, (_, index) => {
  return `en-framework-${String(index + 1).padStart(2, "0")}.html`;
});

const pages = [
  "index.html",
  "en.html",
  ...frameworkNodePages,
  ...englishFrameworkNodePages,
  "framework-glossary.html",
  "en-framework-glossary.html",
  "products.html",
  "standards.html",
  "patterns.html",
  "research.html",
  "timeline.html",
  "references.html",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function readBytes(path) {
  return readFileSync(path);
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? sourceFiles(path) : [path];
  });
}

function publicHtmlPages(dir) {
  return sourceFiles(dir)
    .map((path) => relative(dir, path))
    .filter((path) => path.endsWith(".html"))
    .filter((path) => !path.split("/").some((segment) => segment.startsWith("_")))
    .sort();
}

function htmlPages(dir) {
  return sourceFiles(dir)
    .map((path) => relative(dir, path))
    .filter((path) => path.endsWith(".html"))
    .sort();
}

function distArtifactFiles() {
  return sourceFiles(dist)
    .map((path) => relative(dist, path))
    .sort();
}

function chapterFiles() {
  return readdirSync(join(frameworkRoot, "chapters"))
    .filter((file) => /^\d{2}-.*\.md$/.test(file))
    .sort()
    .map((file) => `chapters/${file}`);
}

function markdownFiles(dir) {
  return sourceFiles(dir)
    .map((path) => relative(dir, path))
    .filter((path) => path.endsWith(".md"))
    .sort();
}

function chapterHeading(markdown) {
  return markdown.match(/^# (.+)$/m)?.[1] ?? "";
}

function chapterSubtitle(markdown, label) {
  const key = label === "English" ? "subtitle_en" : "subtitle_zh";
  return markdown.match(new RegExp(`^${key}:\\s*"([^"]+)"`, "m"))?.[1].trim()
    ?? markdown.match(new RegExp(`${label}[:：]\\s*(.+)`))?.[1].trim()
    ?? "";
}

function localizedArticle(markdown, locale) {
  const marker = `<!-- ${locale} -->`;
  const start = markdown.indexOf(marker);
  if (start === -1) return markdown;
  const afterMarker = markdown.slice(start + marker.length);
  const next = afterMarker.search(/\n<!-- (?:zh-CN|en) -->/);
  return next === -1 ? afterMarker : afterMarker.slice(0, next);
}

function firstArticleHeading(markdown, locale = "zh-CN") {
  const heading = localizedArticle(markdown, locale).match(/^## (.+)$/m)?.[1] ?? "";
  const parts = heading.split(/\s+\/\s+/);
  if (locale === "en") return parts[0].trim();
  return [...parts].reverse().find((part) => /[\u3400-\u9fff]/.test(part))?.trim() ?? parts.at(-1).trim();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function allowedFrameworkLinkRewrite(source) {
  let rewritten = source;
  for (const chapter of chapterFiles()) {
    const basename = chapter.split("/").at(-1);
    const route = `framework-${basename.slice(0, 2)}.html`;
    const escapedChapter = escapeRegex(chapter);
    const escapedBasename = escapeRegex(basename);
    rewritten = rewritten
      .replace(new RegExp(`\\]\\(\\./${escapedChapter}\\)`, "g"), `](${route})`)
      .replace(new RegExp(`\\]\\(${escapedChapter}\\)`, "g"), `](${route})`)
      .replace(new RegExp(`\\]\\(\\./${escapedBasename}\\)`, "g"), `](${route})`)
      .replace(new RegExp(`\\]\\(${escapedBasename}\\)`, "g"), `](${route})`);
  }
  return rewritten;
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function localLinks(html) {
  return [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((href) => {
      return !href.startsWith("#")
        && !href.startsWith("http:")
        && !href.startsWith("https:")
        && !href.startsWith("mailto:")
        && !href.startsWith("data:");
    });
}

test("Astro source uses shared layouts and data instead of raw HTML passthrough", () => {
  assert.ok(existsSync(join(src, "layouts/BaseLayout.astro")), "missing BaseLayout");
  assert.ok(existsSync(join(src, "components/SiteHeader.astro")), "missing SiteHeader");
  assert.ok(existsSync(join(src, "components/SectionPage.astro")), "missing SectionPage");
  assert.ok(existsSync(join(src, "data/site.mjs")), "missing central site data");
  assert.equal(existsSync(join(src, "components/RawPage.astro")), false, "RawPage passthrough should be removed");

  const source = sourceFiles(src).map(read).join("\n");
  assert.doesNotMatch(source, /RawPage|set:html|readFileSync/, "Astro source should not stream docs HTML");

  const siteData = read(join(src, "data/site.mjs"));
  assert.match(siteData, /export const navModel/, "navigation structure should be centralized");
  assert.match(siteData, /export const localeMessages/, "localized navigation copy should be centralized");
  assert.match(siteData, /export function getNav/, "navigation should be generated from schema and locale messages");
  assert.doesNotMatch(siteData, /export const (zhNav|enNav)/, "localized nav arrays should not be maintained by hand");
  assert.match(siteData, /export const sectionPages/, "section page metadata should be centralized");
  assert.match(siteData, /frameworkNodes/, "framework nodes should be centralized or re-exported");
  assert.equal(frameworkNodes.length, 15, "official framework should expose all 15 framework nodes");
});

test("Astro build emits static Pages-compatible routes and assets", () => {
  assert.ok(existsSync(join(root, "astro.config.mjs")), "missing astro.config.mjs");

  const build = spawnSync("npm", ["run", "build"], {
    cwd: root,
    encoding: "utf8",
  });

  assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);

  for (const page of pages) {
    assert.ok(existsSync(join(dist, page)), `missing built route dist/${page}`);
  }
  assert.equal(existsSync(join(dist, "glossary.html")), false, "glossary should be part of learning, not a standalone route");
  assert.equal(existsSync(join(dist, "course.html")), false, "framework roadmap page should not be emitted");
  assert.equal(existsSync(join(dist, "framework-modules.html")), false, "framework outline page should not be emitted");
  assert.equal(existsSync(join(dist, "framework-practice.html")), false, "practice checklist page should not be emitted");

  assert.ok(existsSync(join(dist, "assets/css/style.css")), "missing shared stylesheet");
  assert.ok(existsSync(join(dist, "assets/css/framework.css")), "missing framework stylesheet");
  assert.ok(existsSync(join(dist, "favicon.svg")), "missing favicon");
});

test("Framework pages respect the active site language", () => {
  const zh = read(join(dist, "framework-01.html"));
  const en = read(join(dist, "en-framework-01.html"));

  assert.match(zh, /<html lang="zh-CN"/, "Chinese framework route should declare Chinese language");
  assert.match(en, /<html lang="en"/, "English framework route should declare English language");
  assert.match(zh, /href="en-framework-01\.html"[\s\S]*?>EN</, "Chinese framework page should switch to the matching English framework page");
  assert.match(en, /href="framework-01\.html"[\s\S]*?>中文</, "English framework page should switch to the matching Chinese framework page");

  assert.match(zh, /<h1 class="content-title">为什么需要 Agent Harness<\/h1>/, "Chinese framework page should use the Chinese title only");
  assert.match(en, /<h1 class="content-title">Why Agent Harness<\/h1>/, "English framework page should use the English title only");
  assert.match(zh, /Agent Harness 的核心不是让模型更聪明/, "Chinese framework page should render Chinese chapter body");
  assert.match(en, /The core of an Agent Harness is not making the model smarter/, "English framework page should render English chapter body");

  assert.doesNotMatch(zh, /The core of an Agent Harness is not making the model smarter|English:/, "Chinese framework page should not render English body copy");
  assert.doesNotMatch(en, /Agent Harness 的核心不是让模型更聪明|中文：|本章命题/, "English framework page should not render Chinese body copy");
  assert.doesNotMatch(zh, /Why Agent Harness \/ 为什么需要 Agent Harness/, "Chinese framework page should not render bilingual titles");
  assert.doesNotMatch(en, /Why Agent Harness \/ 为什么需要 Agent Harness/, "English framework page should not render bilingual titles");
});

test("Built pages keep page-specific loading boundaries", () => {
  const learningPages = new Set([...frameworkNodePages, ...englishFrameworkNodePages, "framework-glossary.html", "en-framework-glossary.html"]);

  for (const page of pages) {
    const html = read(join(dist, page));
    const stylesheetHrefs = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map((match) => match[1]);

    assert.equal(stylesheetHrefs.filter((href) => href === "assets/css/style.css").length, 1, `${page} should load shared CSS once`);
    assert.equal(stylesheetHrefs.includes("assets/css/framework.css"), learningPages.has(page), `${page} should only load framework CSS inside framework pages`);
    if (page === "index.html" || page === "en.html") {
      assert.match(html, /<script\b[\s\S]*IntersectionObserver/, `${page} should only use script for homepage feed pagination`);
    } else {
      assert.doesNotMatch(html, /<script\b/i, `${page} should stay static and script-free`);
    }

    if (page === "index.html" || page === "en.html") {
      assert.match(html, /class="[^"]*\bhero\b/, `${page} should keep a homepage hero`);
    } else {
      assert.doesNotMatch(html, /class="[^"]*\bhero\b/, `${page} should not render the old top hero`);
      assert.doesNotMatch(html, /page-heading/, `${page} should not render the old page heading block`);
    }
  }
});

test("Homepage hero keeps the centered equation above the swapped runtime map layout", () => {
  for (const page of ["index.html", "en.html"]) {
    const html = read(join(dist, page));
    const cssHref = html.match(/href="\/harness-atlas\/(_astro\/[^"]+\.css)"/)?.[1];
    const css = cssHref ? read(join(dist, cssHref)) : "";

    assert.match(html, /<section class="hero home-hero harness-hero"[\s\S]*?<h1 class="hero-equation"[\s\S]*?<div class="hero-main"[\s\S]*?<aside class="system-card harness-map"/, `${page} should render equation, copy, then runtime map`);
    assert.match(css, /grid-template-rows:\s*auto\s+1fr/, `${page} hero should reserve the first row for the equation`);
    assert.match(css, /gap:\s*36px\s+clamp\(34px,5vw,64px\)/, `${page} hero should keep breathing room below the equation`);
    assert.match(css, /flex-wrap:\s*nowrap/, `${page} equation should stay on one line`);
    assert.match(css, /justify-content:\s*center/, `${page} equation should be centered`);
    assert.match(css, /\.hero-main\[[^\]]+\]\{[^}]*grid-column:\s*2/, `${page} copy column should render on the right`);
    assert.match(css, /\.hero-main\[[^\]]+\]\{[^}]*grid-row:\s*2/, `${page} copy column should stay on the second row`);
    assert.match(css, /\.hero-main\[[^\]]+\]\{[^}]*min-height:\s*510px/, `${page} copy column should match the runtime map height`);
    assert.match(html, /<div class="actions"[\s\S]*?<p class="hero-audience"[\s\S]*?<a class="cta primary"/, `${page} audience note should share the action row`);
    assert.match(css, /\.hero-main\[[^\]]+\]\s+\.actions\[[^\]]+\]\{[^}]*justify-content:\s*flex-end/, `${page} hero action should align right`);
    assert.match(css, /\.hero-main\[[^\]]+\]\s+\.actions\[[^\]]+\]\{[^}]*margin-top:\s*auto/, `${page} hero action should sit at the bottom`);
    assert.match(css, /\.hero-audience\[[^\]]+\]\{[^}]*flex:\s*1 1 260px/, `${page} audience note should occupy the left side of the action row`);
    assert.match(css, /\.harness-map\[[^\]]+\]\{[^}]*grid-column:\s*1/, `${page} runtime map should render on the left`);
    assert.match(css, /\.harness-map\[[^\]]+\]\{[^}]*grid-row:\s*2/, `${page} runtime map should align with the copy row`);
  }
});

test("Built pages have complete local links and visible content", () => {
  for (const page of publicHtmlPages(dist)) {
    const html = read(join(dist, page));
    const text = visibleText(html);

    assert.match(html, /<h1\b|<h2\b/, `${page} should expose a primary heading`);
    assert.ok(text.length > 200, `${page} should contain meaningful visible text`);

    for (const href of localLinks(html)) {
      const localHref = href.startsWith(pagesBase) ? href.slice(pagesBase.length) : href;
      const withoutAnchor = localHref.split("#")[0] || ".";
      const target = withoutAnchor.endsWith("/")
        ? join(dist, withoutAnchor, "index.html")
        : join(dist, withoutAnchor);
      assert.ok(existsSync(target), `${page} links to missing local asset or route: ${relative(dist, target)}`);
    }
  }
});

test("Checked-in Pages output is synced with Astro dist artifacts", () => {
  assert.deepEqual(htmlPages(docs), htmlPages(dist), "docs HTML routes should exactly match dist HTML routes");

  for (const artifact of distArtifactFiles()) {
    const distPath = join(dist, artifact);
    const docsPath = join(docs, artifact);

    assert.ok(existsSync(docsPath), `docs/${artifact} should exist after syncing dist output`);
    assert.deepEqual(readBytes(docsPath), readBytes(distPath), `docs/${artifact} should match dist/${artifact}`);
  }

  for (const page of htmlPages(docs)) {
    const html = read(join(docs, page));
    assert.doesNotMatch(html, /{{|{%|site\./, `docs/${page} should not contain stale Liquid template syntax`);
  }
});

test("Public HTML discovery covers docs and dist link checks", () => {
  for (const [label, dir] of [["docs", docs], ["dist", dist]]) {
    const publicPages = publicHtmlPages(dir);

    assert.ok(publicPages.length >= pages.length, `${label} should expose every known public page`);
    assert.equal(publicPages.includes("course.html"), false, `${label} should not expose removed course.html`);

    for (const page of publicPages) {
      const html = read(join(dir, page));
      assert.doesNotMatch(html, /href="course\.html"/, `${label}/${page} should not link removed course.html`);
      for (const href of localLinks(html)) {
        const localHref = href.startsWith(pagesBase) ? href.slice(pagesBase.length) : href;
        const withoutAnchor = localHref.split("#")[0] || ".";
        const target = withoutAnchor.endsWith("/")
          ? join(dir, withoutAnchor, "index.html")
          : join(dir, withoutAnchor);
        assert.ok(existsSync(target), `${label}/${page} links to missing local asset or route: ${relative(dir, target)}`);
      }
    }
  }
});

test("Framework route files select nodes by stable keys", () => {
  for (let index = 1; index <= 15; index += 1) {
    const route = `framework-${String(index).padStart(2, "0")}`;
    const englishRoute = `en-${route}`;
    const source = read(join(src, "pages", `${route}.astro`));
    const englishSource = read(join(src, "pages", `${englishRoute}.astro`));
    const chapter = chapterFiles()[index - 1];
    const localizedChapter = `generated/framework/zh-CN/${chapter}`;
    const localizedEnglishChapter = `generated/framework/en/${chapter}`;

    assert.match(source, new RegExp(`getFrameworkNodePage\\("${route}"\\)`), `${route}.astro should select by stable framework key`);
    assert.match(source, new RegExp(localizedChapter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${route}.astro should import localized ${chapter}`);
    assert.doesNotMatch(source, /frameworkNodePages\[\d+\]/, `${route}.astro should not depend on framework array indexes`);

    assert.match(englishSource, new RegExp(`getFrameworkNodePage\\("${route}", "en"\\)`), `${englishRoute}.astro should select by stable framework key and English locale`);
    assert.match(englishSource, new RegExp(localizedEnglishChapter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${englishRoute}.astro should import localized English ${chapter}`);
  }
});

test("Framework node lookup rejects removed or unknown keys", () => {
  assert.equal(getFrameworkNodePage("framework-01").heading, "为什么需要 Agent Harness");
  assert.equal(getFrameworkNodePage("framework-01", "en").heading, "Why Agent Harness");
  assert.throws(() => getFrameworkNodePage("framework-00"), /Unknown framework node: framework-00/);
  assert.throws(() => getFrameworkNodePage("framework-missing"), /Unknown framework node: framework-missing/);
});

test("Framework routes render the lesson selected by their route number", () => {
  for (const [index, lesson] of frameworkNodes.entries()) {
    const markdown = read(join(frameworkRoot, chapterFiles()[index]));
    const html = read(join(dist, lesson.href));
    const heading = chapterHeading(markdown);
    const subtitle = [
      chapterSubtitle(markdown, "中文"),
      chapterSubtitle(markdown, "English"),
    ].join(" / ");

    assert.equal(lesson.body, chapterSubtitle(markdown, "中文"), `${lesson.key} Chinese subtitle should match official chapter subtitle`);
    assert.match(html, new RegExp(`<h1 class="content-title">${lesson.title}</h1>`), `${lesson.href} should render ${lesson.title}`);
    assert.match(html, new RegExp(`框架 / ${lesson.title}`), `${lesson.href} should render its lesson kicker`);
    assert.match(html, new RegExp(escapeRegex(firstArticleHeading(markdown))), `${lesson.href} should render localized article body`);
    assert.doesNotMatch(html, /Chapter Thesis \/ 本章命题|本章命题|English:/, `${lesson.href} should not render bilingual or draft chapter labels`);

    const englishLesson = getFrameworkNodePage(lesson.key, "en");
    const englishHtml = read(join(dist, englishLesson.href));
    assert.equal(englishLesson.body, chapterSubtitle(markdown, "English"), `${lesson.key} English subtitle should match official chapter subtitle`);
    assert.match(englishHtml, new RegExp(`<h1 class="content-title">${englishLesson.heading}</h1>`), `${englishLesson.href} should render ${englishLesson.heading}`);
    assert.match(englishHtml, new RegExp(escapeRegex(firstArticleHeading(markdown, "en"))), `${englishLesson.href} should render localized article body`);
    assert.doesNotMatch(englishHtml, /Chapter Thesis \/ 本章命题|Chapter Thesis|中文：/, `${englishLesson.href} should not render bilingual or draft chapter labels`);
  }
});

test("Framework pages render the official chapter markdown instead of placeholder cards", () => {
  const first = read(join(dist, "framework-01.html"));
  const final = read(join(dist, "framework-15.html"));

  assert.match(first, /不确定性需要工程边界/, "first framework page should render article-form markdown section headings");
  assert.match(first, /从 Prompt 到工程系统/, "first framework page should render official subtitle");
  assert.match(first, /模型能力进入真实系统/, "first framework page should render sustained article prose");
  assert.doesNotMatch(first, /<h3>本课目标<\/h3>/, "first framework page should not render placeholder objective card");

  assert.match(final, /模式、反模式与未来/, "final framework page should render the official final chapter");
  assert.match(final, /设计原则、反模式与未来方向/, "final framework page should render official final subtitle");

  for (const page of [...frameworkNodePages, ...englishFrameworkNodePages]) {
    const html = read(join(dist, page));
    assert.doesNotMatch(html, /<h3>本课目标<\/h3>|<h3>关键边界<\/h3>|<h3>理解产出<\/h3>/, `${page} should not render placeholder framework cards`);
  }
});

test("Official framework import manifest pins imported markdown files", () => {
  const manifest = JSON.parse(read(join(frameworkRoot, "import-manifest.json")));
  const expectedFiles = [
    "README.md",
    "COURSE_INDEX.md",
    ...chapterFiles(),
    ...readdirSync(join(frameworkRoot, "resources")).filter((file) => file.endsWith(".md")).sort().map((file) => `resources/${file}`),
  ];
  const expectedInventory = [...expectedFiles].sort();
  const expectedSourceInventory = manifest.files
    .map((item) => item.sourcePath ?? item.path)
    .sort();

  assert.equal(manifest.schema, "framework-import-v1");
  assert.equal(manifest.sourcePackage, "/Users/xuzhang/Downloads/agent-harness-atlas-course");
  assert.ok(existsSync(manifest.sourcePackage), `missing official framework source package ${manifest.sourcePackage}`);
  assert.deepEqual(manifest.files.map((item) => item.path), expectedFiles);
  assert.deepEqual(markdownFiles(frameworkRoot), expectedInventory, "imported Markdown inventory should match manifest");
  assert.deepEqual(markdownFiles(manifest.sourcePackage), expectedSourceInventory, "source Markdown inventory should match manifest source paths");

  for (const item of manifest.files) {
    const currentPath = join(frameworkRoot, item.path);
    const sourcePath = join(manifest.sourcePackage, item.sourcePath ?? item.path);
    assert.ok(existsSync(currentPath), `missing imported framework file ${item.path}`);
    assert.ok(existsSync(sourcePath), `missing source framework file ${item.path}`);
    assert.equal(sha256(readBytes(currentPath)), item.importedSha256, `${item.path} should match import manifest hash`);

    const source = read(sourcePath);
    const imported = read(currentPath);
    assert.equal(sha256(source), item.sourceSha256, `${item.path} source hash should match import manifest hash`);
    if (item.editorialRewrite) {
      assert.match(imported, /status: article-v2/, `${item.path} should record editorial article status`);
    } else if (item.frameworkRebrand) {
      assert.notEqual(imported, source, `${item.path} should be intentionally rebranded from the source package`);
      assert.doesNotMatch(imported, /Course Map|systematic course|course-style|课程地图|系统课程|课程目录/, `${item.path} should not keep public course positioning copy`);
    } else {
      assert.equal(imported, item.transformed ? allowedFrameworkLinkRewrite(source) : source, `${item.path} should only apply allowed framework link rewrites`);
    }
  }
});

test("Official framework markdown uses public chapter routes", () => {
  const sourceFiles = ["COURSE_INDEX.md", ...chapterFiles()];

  for (const file of sourceFiles) {
    const markdown = read(join(frameworkRoot, file));
    assert.doesNotMatch(markdown, /\]\(\.\/(?:chapters\/)?\d{2}-[^)]+\.md\)/, `${file} should not link source markdown chapter paths`);
    assert.doesNotMatch(markdown, /href="[^"]+\.md"/, `${file} should not contain HTML links to markdown chapter paths`);
  }
});

test("Glossary content is nested under the framework page", () => {
  const course = read(join(dist, "framework-glossary.html"));
  const englishCourse = read(join(dist, "en-framework-glossary.html"));
  const source = read(join(src, "pages", "framework-glossary.astro"));
  const allBuiltHtml = pages.map((page) => read(join(dist, page))).join("\n");

  assert.match(source, /generated\/framework\/zh-CN\/resources\/glossary-bilingual\.md/, "glossary page should render the localized official glossary markdown resource");
  assert.match(course, /框架 \/ 中英术语表/, "glossary should render inside the framework shell");
  assert.match(course, /中英术语表/, "glossary subpage should contain official glossary content");
  assert.match(course, /最小自主权/, "glossary should render official Chinese term definitions");
  assert.doesNotMatch(course, /The engineering control system around an agent|English:/, "Chinese glossary should not render English definitions");
  assert.match(englishCourse, /Framework \/ Bilingual Glossary/, "English glossary should render inside the framework shell");
  assert.match(englishCourse, /The engineering control system around an agent/, "English glossary should render official English term definitions");
  assert.doesNotMatch(englishCourse, /围绕 Agent 建立的工程控制系统|中文：/, "English glossary should not render Chinese definitions");
  assert.match(course, /<aside class="framework-sidebar"/, "glossary subpage should keep the framework sidebar");
  assert.doesNotMatch(allBuiltHtml, /href="glossary\.html"/, "built pages should not link a standalone glossary page");
});

test("Framework navigation entries are subpages, not scroll anchors", () => {
  const learningPages = [...frameworkNodePages, ...englishFrameworkNodePages, "framework-glossary.html", "en-framework-glossary.html"];

  for (const page of learningPages) {
    const html = read(join(dist, page));
    const expectedPrefix = page.startsWith("en-") ? "en-framework-" : "framework-";
    const expectedGlossary = page.startsWith("en-") ? "en-framework-glossary.html" : "framework-glossary.html";
    assert.match(html, /<aside class="framework-sidebar"/, `${page} should keep the framework sidebar`);
    assert.match(html, /<nav class="framework-nav"/, `${page} should keep the framework navigation`);

    for (let index = 1; index <= 15; index += 1) {
      const link = `href="${expectedPrefix}${String(index).padStart(2, "0")}.html"`;
      assert.match(html, new RegExp(link), `${page} should link ${link}`);
    }
    assert.match(html, new RegExp(`href="${expectedGlossary}"`), `${page} should link localized glossary`);

    const sidebar = html.match(/<aside class="framework-sidebar"[\s\S]*?<\/aside>/)?.[0] ?? "";
    assert.doesNotMatch(sidebar, /href="#/, `${page} sidebar should not use in-page anchors`);
    assert.doesNotMatch(sidebar, /href="course\.html"/, `${page} sidebar should not expose the removed roadmap page`);
    assert.doesNotMatch(sidebar, />框架路线</, `${page} sidebar should not expose the removed roadmap item`);
    assert.doesNotMatch(sidebar, /href="patterns\.html"/, `${page} sidebar should not jump outside the framework shell`);
    assert.doesNotMatch(sidebar, /href="framework-practice\.html"/, `${page} sidebar should not expose practice checklist`);
    assert.match(sidebar, page.startsWith("en-") ? />Other</ : />其他</, `${page} sidebar should group glossary under Other`);
  }
});
