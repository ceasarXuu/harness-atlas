import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;
const src = join(root, "src");
const dist = join(root, "dist");

const pages = [
  "index.html",
  "en.html",
  "course.html",
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
  assert.match(siteData, /export const courseModules/, "course modules should be centralized");
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

  assert.ok(existsSync(join(dist, "assets/css/style.css")), "missing shared stylesheet");
  assert.ok(existsSync(join(dist, "assets/css/learn.css")), "missing learning stylesheet");
  assert.ok(existsSync(join(dist, "favicon.svg")), "missing favicon");
});

test("Built pages keep page-specific loading boundaries", () => {
  for (const page of pages) {
    const html = read(join(dist, page));
    const stylesheetHrefs = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map((match) => match[1]);

    assert.equal(stylesheetHrefs.filter((href) => href === "assets/css/style.css").length, 1, `${page} should load shared CSS once`);
    assert.equal(stylesheetHrefs.includes("assets/css/learn.css"), page === "course.html", `${page} should only load learning CSS on course`);
    assert.doesNotMatch(html, /<script\b/i, `${page} should stay static and script-free`);

    if (page === "index.html" || page === "en.html") {
      assert.match(html, /class="[^"]*\bhero\b/, `${page} should keep a homepage hero`);
    } else {
      assert.doesNotMatch(html, /class="[^"]*\bhero\b/, `${page} should not render the old top hero`);
      assert.doesNotMatch(html, /page-heading/, `${page} should not render the old page heading block`);
    }
  }
});

test("Built pages have complete local links and visible content", () => {
  for (const page of pages) {
    const html = read(join(dist, page));
    const text = visibleText(html);

    assert.match(html, /<h1\b|<h2\b/, `${page} should expose a primary heading`);
    assert.ok(text.length > 200, `${page} should contain meaningful visible text`);

    for (const href of localLinks(html)) {
      const withoutAnchor = href.split("#")[0] || ".";
      const target = withoutAnchor.endsWith("/")
        ? join(dist, withoutAnchor, "index.html")
        : join(dist, withoutAnchor);
      assert.ok(existsSync(target), `${page} links to missing local asset or route: ${relative(dist, target)}`);
    }
  }
});

test("Glossary content is nested under the learning page", () => {
  const course = read(join(dist, "course.html"));
  const allBuiltHtml = pages.map((page) => read(join(dist, page))).join("\n");

  assert.match(course, /id="glossary"/, "course should expose the glossary anchor");
  assert.match(course, /术语表/, "course should contain glossary content");
  assert.match(course, /href="#glossary"/, "learning sidebar should jump to the local glossary section");
  assert.doesNotMatch(allBuiltHtml, /href="glossary\.html"/, "built pages should not link a standalone glossary page");
});
