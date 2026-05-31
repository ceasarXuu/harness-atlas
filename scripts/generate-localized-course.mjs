import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const courseRoot = join(root, "course");
const outputRoot = process.env.LOCALIZED_COURSE_OUTPUT ?? join(root, "src", "generated", "course");

const locales = ["zh-CN", "en"];
const chapters = readdirSync(join(courseRoot, "chapters"))
  .filter((file) => /^\d{2}-.*\.md$/.test(file))
  .sort();

function frontmatter(markdown) {
  const block = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  const data = {};
  if (!block) return data;
  for (const line of block[1].split("\n")) {
    const match = line.match(/^([a-z_]+):\s*"?([^"]+)"?$/);
    if (match) data[match[1]] = match[2];
  }
  return data;
}

const chapterMeta = new Map(chapters.map((file) => {
  const markdown = readFileSync(join(courseRoot, "chapters", file), "utf8");
  const data = frontmatter(markdown);
  return [file.slice(0, 2), {
    file,
    title: { "zh-CN": data.title_zh, en: data.title_en },
  }];
}));

const englishHeadingMap = new Map([
  ["上下文边界", "Context Boundary"],
  ["动作边界", "Action Boundary"],
  ["运行时控制", "Runtime Control"],
  ["工具网关", "Tool Gateway"],
  ["技能", "Skill"],
  ["工作流", "Workflow"],
  ["跟踪", "Trace"],
  ["评测", "Evaluation"],
  ["最小自主权", "Least Agency"],
  ["封面图", "Cover Image"],
  ["对比图", "Comparison Diagram"],
]);

function stripFrontmatter(markdown) {
  return markdown.replace(/^---\n[\s\S]*?\n---\n+/, "");
}

function hasCjk(value) {
  return /[\u3400-\u9fff]/.test(value);
}

function splitBilingual(value, locale) {
  const parts = value.split(/\s+\/\s+/);
  if (parts.length < 2) return value;
  if (locale === "en") return parts[0].trim();
  return [...parts].reverse().find((part) => hasCjk(part))?.trim() ?? parts.at(-1).trim();
}

function localizeHeading(line, locale) {
  const match = line.match(/^(#{1,6})\s+(.+)$/);
  if (!match) return line;
  const [, level, text] = match;
  const chapter = text.match(/^(\d{2})\.\s+(.+)$/);
  if (level === "#" && chapter && chapterMeta.has(chapter[1])) {
    return `${level} ${chapter[1]}. ${chapterMeta.get(chapter[1]).title[locale]}`;
  }
  const numbered = text.match(/^(\d+)\.\s+(.+)$/);
  if (numbered) return `${level} ${numbered[1]}. ${splitBilingual(numbered[2], locale)}`;
  const localized = locale === "en" && englishHeadingMap.has(text)
    ? englishHeadingMap.get(text)
    : splitBilingual(text, locale);
  return `${level} ${localized}`;
}

function localizeLinks(text, locale) {
  return text.replace(/\[([^\]]+)\]\((course-(\d{2})\.html)\)/g, (_all, _label, href, num) => {
    const meta = chapterMeta.get(num);
    const localizedHref = locale === "en" ? `en-${href}` : href;
    const title = meta ? `${num}. ${meta.title[locale]}` : _label;
    return `[${title}](${localizedHref})`;
  });
}

function navigationLine(line, locale, currentNum) {
  if (!line.includes("course-")) return null;
  const links = [...line.matchAll(/\[([^\]]+)\]\(course-(\d{2})\.html\)/g)];
  if (!links.length) return null;
  return links.map((match) => {
    const num = match[2];
    const href = locale === "en" ? `en-course-${num}.html` : `course-${num}.html`;
    const title = chapterMeta.get(num)?.title[locale] ?? match[1];
    const label = Number(num) < Number(currentNum)
      ? (locale === "en" ? "Previous" : "上一章")
      : (locale === "en" ? "Next" : "下一章");
    return `${label}: [${num}. ${title}](${href})`;
  }).join(" | ");
}

function localizeExpectedArtifact(line, locale) {
  const match = line.match(/^\*\*Expected artifact \/ 预期产物\*\*：(.+) \/ (.+)$/);
  if (!match) return null;
  return locale === "en"
    ? `**Expected artifact**: ${match[2].trim()}`
    : `**预期产物**：${match[1].trim()}`;
}

function localizeMermaid(line, locale) {
  return line.replace(/\[([^\]\n]+?) \/ ([^\]\n]+?)\]/g, (_all, left, right) => {
    if (locale === "en") return `[${left.trim()}]`;
    return hasCjk(right) ? `[${right.trim()}]` : `[${left.trim()}]`;
  });
}

function localizeMarkdown(markdown, locale, currentNum = "01") {
  const lines = stripFrontmatter(markdown).split("\n");
  const output = [];
  let pending = null;
  let inCode = false;
  let codeLang = "";
  let inImageDescriptions = false;
  let imagePromptCount = 0;

  for (const line of lines) {
    const fence = line.match(/^```(\w*)/);
    if (fence) {
      inCode = !inCode;
      codeLang = inCode ? fence[1] : "";
      output.push(line);
      pending = null;
      continue;
    }

    if (inCode) {
      output.push(codeLang === "mermaid" ? localizeMermaid(line, locale) : line);
      continue;
    }

    const nav = navigationLine(line, locale, currentNum);
    if (nav) {
      output.push(nav);
      pending = null;
      continue;
    }

    const expected = localizeExpectedArtifact(line, locale);
    if (expected) {
      output.push(expected);
      pending = null;
      continue;
    }

    const subtitleLabel = line.match(/^>\s+\*\*本章副标题 \/ Subtitle\*\*/);
    if (subtitleLabel) {
      output.push(locale === "en" ? "> **Subtitle**" : "> **本章副标题**");
      pending = null;
      continue;
    }

    const marker = line.match(/^(\s*)((?:[-*]|\d+\.)(?:\s+\[ \])?)\s+(?:\*\*)?(中文|English|中文图像描述|English image prompt)(?:\*\*)?[:：]\s*(.*)$/);
    if (marker) {
      const [, indent, bullet, label, text] = marker;
      const language = label.startsWith("English") ? "en" : "zh-CN";
      pending = { indent, bullet };
      if (language === locale) output.push(`${indent}${bullet} ${localizeLinks(text, locale)}`);
      continue;
    }

    const paragraph = line.match(/^(\s*)(?:>\s*)?(?:\*\*)?(中文|English|中文图像描述|English image prompt)(?:\*\*)?[:：]\s*(.*)$/);
    if (paragraph) {
      const [, indent, label, text] = paragraph;
      const language = label.startsWith("English") ? "en" : "zh-CN";
      if (language === locale) {
        if (pending && language === "en") output.push(`${pending.indent}${pending.bullet} ${localizeLinks(text, locale)}`);
        else output.push(`${indent}${line.trim().startsWith(">") ? "> " : ""}${localizeLinks(text, locale)}`);
      }
      if (language === "en") pending = null;
      continue;
    }

    pending = null;
    if (/^#{1,6}\s+/.test(line)) {
      const heading = localizeHeading(line, locale);
      if (/^##\s+/.test(heading)) {
        inImageDescriptions = /^##\s+(?:13\.\s+)?(?:图片描述|Image Descriptions)$/.test(heading);
        if (inImageDescriptions) imagePromptCount = 0;
      }
      if (locale === "en" && inImageDescriptions && /^###\s+/.test(heading)) {
        imagePromptCount += 1;
        output.push(`### Image Prompt ${imagePromptCount}`);
      } else if (locale === "en" && inImageDescriptions && /^###\s+/.test(line) && hasCjk(line)) {
        imagePromptCount += 1;
        output.push(`### Image Prompt ${imagePromptCount}`);
      } else {
        output.push(heading);
      }
    } else {
      output.push(localizeLinks(splitBilingual(line, locale), locale));
    }
  }

  return `${output.join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
}

for (const locale of locales) {
  for (const file of chapters) {
    const markdown = readFileSync(join(courseRoot, "chapters", file), "utf8");
    const target = join(outputRoot, locale, "chapters", file);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, localizeMarkdown(markdown, locale, file.slice(0, 2)));
  }

  const glossary = readFileSync(join(courseRoot, "resources", "glossary-bilingual.md"), "utf8");
  const target = join(outputRoot, locale, "resources", "glossary-bilingual.md");
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, localizeMarkdown(glossary, locale));
}
