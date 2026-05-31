import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const docs = join(root, "docs");
const sourceChapters = join(root, "course", "chapters");
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

function sectionIntro(html) {
  const match = html.match(/<p class="section-intro">([\s\S]*?)<\/p>/);
  return match ? visibleText(match[1]) : "";
}

function chapterContentText(html) {
  const match = html.match(/<article class="chapter-content">([\s\S]*?)<\/article>/);
  return match ? visibleText(match[1]) : "";
}

function articleHtml(html) {
  return html.match(/<article class="chapter-content">([\s\S]*?)<\/article>/)?.[1] ?? "";
}

function articleParagraphs(html) {
  return [...articleHtml(html).matchAll(/<p>([\s\S]*?)<\/p>/g)]
    .map((match) => visibleText(match[1]))
    .filter(Boolean);
}

function articleHeadings(html) {
  return [...articleHtml(html).matchAll(/<h[2-3][^>]*>([\s\S]*?)<\/h[2-3]>/g)]
    .map((match) => visibleText(match[1]));
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

test("Course chapter bodies do not repeat subtitles already shown in the page intro", () => {
  const chapterPages = [...chineseCoursePages, ...englishCoursePages].filter((page) => /course-\d{2}\.html$/.test(page));

  for (const page of chapterPages) {
    const html = read(join(dist, page));
    const intro = sectionIntro(html);
    const body = chapterContentText(html);

    assert.ok(intro, `${page} should expose a page intro subtitle`);
    assert.doesNotMatch(body, /本章副标题|Subtitle/, `${page} should not render the source subtitle label in the chapter body`);
    assert.ok(!body.includes(intro), `${page} should not repeat the page intro subtitle in the chapter body`);
  }
});

test("Course chapter bodies avoid draft, coursework, and self-check framing", () => {
  const chapterPages = [...chineseCoursePages, ...englishCoursePages].filter((page) => /course-\d{2}\.html$/.test(page));
  const forbidden = /本章|本课程|本节|学习目标|前后关联|本章命题|参考实现方向|复盘|自查|作业|实验|预期产物|Chapter Thesis|How This Chapter Connects|Learning Outcomes|Reference Implementation Direction|Review Checklist|Self[- ]check|Assignment|Homework|Exercise|Lab:|Expected artifact|This chapter|This course/i;

  for (const page of chapterPages) {
    assert.doesNotMatch(
      chapterContentText(read(join(dist, page))),
      forbidden,
      `${page} should read like explanatory published content, not course draft scaffolding`,
    );
  }
});

test("Chinese course article headings are localized", () => {
  for (const page of chineseCoursePages.filter((page) => /course-\d{2}\.html$/.test(page))) {
    for (const heading of articleHeadings(read(join(dist, page)))) {
      assert.match(heading, /[\u3400-\u9fff]/, `${page} article heading should be localized: ${heading}`);
    }
  }
});

test("Course article bodies rely on prose more than lists", () => {
  const chapterPages = [...chineseCoursePages, ...englishCoursePages].filter((page) => /course-\d{2}\.html$/.test(page));

  for (const page of chapterPages) {
    const html = articleHtml(read(join(dist, page)));
    const paragraphs = (html.match(/<p>/g) ?? []).length;
    const listItems = (html.match(/<li>/g) ?? []).length;

    assert.ok(paragraphs > listItems, `${page} should read as article prose instead of list notes`);
  }
});

test("Course article bodies avoid excessive section scaffolding", () => {
  const chapterPages = [...chineseCoursePages, ...englishCoursePages].filter((page) => /course-\d{2}\.html$/.test(page));

  for (const page of chapterPages) {
    assert.ok(articleHeadings(read(join(dist, page))).length <= 4, `${page} should not read like a fixed-heading lesson outline`);
    assert.doesNotMatch(articleHtml(read(join(dist, page))), /<h3\b/, `${page} should not rely on nested note headings`);
  }
});

test("Canonical course chapters keep complete per-language articles", () => {
  for (const file of markdownFiles(sourceChapters)) {
    const markdown = read(join(sourceChapters, file));

    assert.match(markdown, /^<!-- zh-CN -->$/m, `${file} should contain a complete Chinese article block`);
    assert.match(markdown, /^<!-- en -->$/m, `${file} should contain a complete English article block`);
    assert.doesNotMatch(markdown, /\*\*(中文|English)\*\*[:：]|本章副标题 \/ Subtitle|中文：|English:/, `${file} should not use line-by-line bilingual scaffolding`);
    assert.doesNotMatch(markdown, /lesson|self_check|image_descriptions|homework|assignment|exercise|lab:|作业|实验|自查|复盘/i, `${file} should not carry coursework or draft vocabulary`);
  }
});

test("Course articles avoid paragraph-tagged lists and template fragments", () => {
  const chapterPages = [...chineseCoursePages, ...englishCoursePages].filter((page) => /course-\d{2}\.html$/.test(page));
  const templateTerms = /self_check|image_descriptions|rubric|checklist|template|catalog|清单|模板|自查/i;

  for (const page of chapterPages) {
    const paragraphs = articleParagraphs(read(join(dist, page)));
    const shortLimit = page.startsWith("en-") ? 140 : 70;
    const shortParagraphs = paragraphs.filter((paragraph) => paragraph.length < shortLimit);
    const colonLeadParagraphs = paragraphs.filter((paragraph) => /^.{1,36}[:：]/.test(paragraph));

    assert.ok(paragraphs.length >= 6, `${page} should have enough sustained prose paragraphs`);
    assert.ok(shortParagraphs.length <= 1, `${page} should not hide notes as short standalone paragraphs: ${shortParagraphs.join(" | ")}`);
    assert.equal(colonLeadParagraphs.length, 0, `${page} should not render catalog-style colon entries: ${colonLeadParagraphs.join(" | ")}`);
    assert.doesNotMatch(paragraphs.join("\n"), templateTerms, `${page} should not expose template or checklist fragments`);
  }
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
