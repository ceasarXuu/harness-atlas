import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;
const docs = join(root, "docs");
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
  "glossary.html",
  "references.html",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function count(html, selector) {
  if (selector === "nav a") return (html.match(/<nav[\s\S]*?<\/nav>/)?.[0].match(/<a\b/g) ?? []).length;
  if (selector === ".cell") return (html.match(/class="[^"]*\bcell\b[^"]*"/g) ?? []).length;
  if (selector === ".row") return (html.match(/class="[^"]*\brow\b[^"]*"/g) ?? []).length;
  if (selector === ".trace-row") return (html.match(/class="[^"]*\btrace-row\b[^"]*"/g) ?? []).length;
  throw new Error(`Unknown selector ${selector}`);
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

test("Astro source can build the current Pages routes", () => {
  assert.ok(existsSync(join(root, "astro.config.mjs")), "missing astro.config.mjs");
  assert.ok(existsSync(join(root, "src/pages/index.astro")), "missing src/pages/index.astro");

  const build = spawnSync("npm", ["run", "build"], {
    cwd: root,
    encoding: "utf8",
  });

  assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);

  for (const page of pages) {
    assert.ok(existsSync(join(dist, page)), `missing built route dist/${page}`);
  }
});

test("Astro build preserves existing visible page structure", () => {
  for (const page of pages) {
    const before = read(join(docs, page));
    const after = read(join(dist, page));

    assert.equal(count(after, "nav a"), count(before, "nav a"), `${page} nav link count changed`);
    assert.equal(count(after, ".cell"), count(before, ".cell"), `${page} card count changed`);
    assert.equal(count(after, ".row"), count(before, ".row"), `${page} row count changed`);
    assert.equal(count(after, ".trace-row"), count(before, ".trace-row"), `${page} trace row count changed`);
    assert.equal(visibleText(after), visibleText(before), `${page} visible text changed`);
  }
});
