# Pages Structure Operation Note

- Date: 2026-05-24
- Scope: GitHub Pages static structure for Harness Atlas.

## Problem

The published `docs/` site only exposed `index.html` and `en.html`, so the repository looked like a single landing page even though the project has course, products, standards, patterns, research, timeline, and references content areas. Glossary content belongs inside the learning page instead of becoming a standalone section.

## Durable Fix

- Add first-class static HTML entry pages under `docs/` for top-level sections.
- Keep glossary terms under a learning subpage, currently `course-glossary.html`, so learning concepts stay in the learning flow.
- Keep the global navigation explicit on every public page.
- Add a Node test that verifies required Pages files exist, the homepage links them, each public page keeps shared navigation, and local links are not broken.

## Verification Commands

```sh
node --test tests/site-structure.test.mjs
python3 -m http.server 4173 --directory docs
```

For browser verification, use bundled Playwright with the local Chrome executable and check both desktop and mobile viewports for all public Pages files. The important regression signal is zero horizontal overflow plus visible `h1` and nav links on every page.

## Chinese Homepage Copy

When updating the Chinese homepage, keep navigation labels, CTA buttons, section kickers, comparison headings, card titles, runtime panel labels, and footer labels in Chinese. Product names and technical terms such as `Harness Atlas`, `Agent Harness`, `MCP`, and `GitHub` can stay as-is when they are used as names rather than UI chrome.

## Multilingual Guardrails

- Chinese pages should use `lang="zh-CN"`, Chinese navigation aria labels, Chinese card titles, and Chinese footer section names.
- English-only UI labels such as `Official Docs`, `Frameworks`, `Comparison`, and `/ PRODUCTS` should not appear on Chinese pages.
- The English page should use `lang="en"` and can keep the single `中文` language switch, but it must explicitly state that detailed section pages are currently maintained in Chinese until English section routes exist.
- Top navigation must be generated from the single `navModel` schema in `src/data/site.mjs`; locales may only provide labels and per-locale href values through `localeMessages`.

## Learning Shell

- Learning directory entries should be static subpages under the same learning shell: `course.html`, `course-modules.html`, `course-glossary.html`, and `course-practice.html`.
- The left learning sidebar must stay visible on every learning subpage and should not use in-page hash links or jump to a non-learning page.
- Module anchors can exist in page content later if needed, but they should not appear as the primary learning directory.
