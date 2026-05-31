import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const docs = join(root, "docs");
const localizedCourse = join(root, "src", "generated", "course");
const englishCoursePages = [
  ...Array.from({ length: 15 }, (_, index) => `en-course-${String(index + 1).padStart(2, "0")}.html`),
  "en-course-other-glossary.html",
];
const chineseCoursePages = [
  ...Array.from({ length: 15 }, (_, index) => `course-${String(index + 1).padStart(2, "0")}.html`),
  "course-other-glossary.html",
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

function markdownFiles(dir) {
  return sourceFiles(dir)
    .map((path) => relative(dir, path))
    .filter((path) => path.endsWith(".md"))
    .sort();
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_entity, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_entity, decimal) => String.fromCodePoint(Number.parseInt(decimal, 10)))
    .replace(/\s+/g, " ")
    .trim();
}

function withoutLanguageSwitch(html) {
  return html.replace(/<a href="course-[^"]+\.html">\s*<span>中文<\/span>[\s\S]*?<\/a>/, "");
}

test("English learning pages do not leak Chinese course content", () => {
  for (const page of englishCoursePages) {
    const text = visibleText(withoutLanguageSwitch(read(join(dist, page))));

    assert.doesNotMatch(text, /[\u3400-\u9fff]/, `${page} should not contain visible Chinese outside the language switch`);
    assert.doesNotMatch(text, /中文：|本章命题|图片描述/, `${page} should not contain source bilingual labels`);
  }
});

test("Course language switches stay paired by route", () => {
  for (let index = 1; index <= 15; index += 1) {
    const num = String(index).padStart(2, "0");
    const zh = read(join(dist, `course-${num}.html`));
    const en = read(join(dist, `en-course-${num}.html`));

    assert.match(zh, new RegExp(`href="en-course-${num}\\.html"[\\s\\S]*?>EN</`), `course-${num}.html should switch to matching English lesson`);
    assert.match(en, new RegExp(`href="course-${num}\\.html"[\\s\\S]*?>中文</`), `en-course-${num}.html should switch to matching Chinese lesson`);
  }

  const zhGlossary = read(join(dist, "course-other-glossary.html"));
  const enGlossary = read(join(dist, "en-course-other-glossary.html"));
  assert.match(zhGlossary, /href="en-course-other-glossary\.html"[\s\S]*?>EN</, "Chinese glossary should switch to English glossary");
  assert.match(enGlossary, /href="course-other-glossary\.html"[\s\S]*?>中文</, "English glossary should switch to Chinese glossary");
});

test("Localized course markdown is reproducible from the formal source package", () => {
  const temp = mkdtempSync(join(tmpdir(), "harness-atlas-course-"));
  try {
    const generated = join(temp, "course");
    const result = spawnSync("node", ["scripts/generate-localized-course.mjs"], {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, LOCALIZED_COURSE_OUTPUT: generated },
    });

    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    assert.deepEqual(markdownFiles(generated), markdownFiles(localizedCourse), "generated Markdown inventory should match committed localized content");

    for (const file of markdownFiles(localizedCourse)) {
      assert.equal(
        read(join(generated, file)),
        read(join(localizedCourse, file)),
        `${file} should match generator output`,
      );
    }
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});

test("Checked-in docs keep the same language split semantics as dist", () => {
  for (const page of [...englishCoursePages, ...chineseCoursePages]) {
    assert.equal(
      visibleText(read(join(docs, page))),
      visibleText(read(join(dist, page))),
      `docs/${page} visible text should match dist/${page}`,
    );
  }
});
