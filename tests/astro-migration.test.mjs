import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;
const src = join(root, "src");
const dist = join(root, "dist");
const pagesBase = "/harness-atlas/";
const courseLessonPages = Array.from({ length: 11 }, (_, index) => {
  return `course-${String(index + 1).padStart(2, "0")}.html`;
});

const pages = [
  "index.html",
  "en.html",
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

function read(path) {
  return readFileSync(path, "utf8");
}

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? sourceFiles(path) : [path];
  });
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
  assert.match(siteData, /export const courseLessons/, "course lessons should be centralized");
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
  assert.equal(existsSync(join(dist, "course-modules.html")), false, "course outline page should not be emitted");
  assert.equal(existsSync(join(dist, "course-practice.html")), false, "practice checklist page should not be emitted");

  assert.ok(existsSync(join(dist, "assets/css/style.css")), "missing shared stylesheet");
  assert.ok(existsSync(join(dist, "assets/css/learn.css")), "missing learning stylesheet");
  assert.ok(existsSync(join(dist, "favicon.svg")), "missing favicon");
});

test("Built pages keep page-specific loading boundaries", () => {
  const learningPages = new Set(["course.html", ...courseLessonPages, "course-other-glossary.html"]);

  for (const page of pages) {
    const html = read(join(dist, page));
    const stylesheetHrefs = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map((match) => match[1]);

    assert.equal(stylesheetHrefs.filter((href) => href === "assets/css/style.css").length, 1, `${page} should load shared CSS once`);
    assert.equal(stylesheetHrefs.includes("assets/css/learn.css"), learningPages.has(page), `${page} should only load learning CSS inside learning pages`);
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
    assert.match(css, /flex-wrap:\s*nowrap/, `${page} equation should stay on one line`);
    assert.match(css, /justify-content:\s*center/, `${page} equation should be centered`);
    assert.match(css, /\.hero-main\[[^\]]+\]\{[^}]*grid-column:\s*2/, `${page} copy column should render on the right`);
    assert.match(css, /\.hero-main\[[^\]]+\]\{[^}]*grid-row:\s*2/, `${page} copy column should stay on the second row`);
    assert.match(css, /\.harness-map\[[^\]]+\]\{[^}]*grid-column:\s*1/, `${page} runtime map should render on the left`);
    assert.match(css, /\.harness-map\[[^\]]+\]\{[^}]*grid-row:\s*2/, `${page} runtime map should align with the copy row`);
  }
});

test("Built pages have complete local links and visible content", () => {
  for (const page of pages) {
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

test("Glossary content is nested under the learning page", () => {
  const course = read(join(dist, "course-other-glossary.html"));
  const allBuiltHtml = pages.map((page) => read(join(dist, page))).join("\n");

  assert.match(course, /学习 \/ 术语表/, "glossary should render inside the learning shell");
  assert.match(course, /术语表/, "glossary subpage should contain glossary content");
  assert.match(course, /<aside class="learn-sidebar"/, "glossary subpage should keep the learning sidebar");
  assert.doesNotMatch(allBuiltHtml, /href="glossary\.html"/, "built pages should not link a standalone glossary page");
});

test("Learning directory entries are subpages, not scroll anchors", () => {
  const learningPages = ["course.html", ...courseLessonPages, "course-other-glossary.html"];
  const expectedLinks = learningPages.map((page) => `href="${page}"`);

  for (const page of learningPages) {
    const html = read(join(dist, page));
    assert.match(html, /<aside class="learn-sidebar"/, `${page} should keep the learning sidebar`);
    assert.match(html, /<nav class="learn-nav"/, `${page} should keep the learning directory`);

    for (const link of expectedLinks) {
      assert.match(html, new RegExp(link), `${page} should link ${link}`);
    }

    const sidebar = html.match(/<aside class="learn-sidebar"[\s\S]*?<\/aside>/)?.[0] ?? "";
    assert.doesNotMatch(sidebar, /href="#/, `${page} sidebar should not use in-page anchors`);
    assert.doesNotMatch(sidebar, /href="patterns\.html"/, `${page} sidebar should not jump outside the learning shell`);
    assert.doesNotMatch(sidebar, /href="course-practice\.html"/, `${page} sidebar should not expose practice checklist`);
    assert.match(sidebar, />其他</, `${page} sidebar should group glossary under Other`);
  }
});
