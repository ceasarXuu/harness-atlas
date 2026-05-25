# Pages Structure Operation Note

- Date: 2026-05-24
- Scope: GitHub Pages static structure for Harness Atlas.

## Problem

The published `docs/` site only exposed `index.html` and `en.html`, so the repository looked like a single landing page even though the project has course, products, standards, patterns, research, timeline, and references content areas. Glossary content belongs inside the learning page instead of becoming a standalone section.

## Durable Fix

- Add first-class static HTML entry pages under `docs/` for top-level sections.
- Keep glossary terms under the learning sidebar's `其他` group, currently `course-other-glossary.html`, so learning concepts stay in the learning flow.
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

## Homepage Industry Feed

- Keep industry updates in `homePages[locale].sections[].updates` as short records with `date`, `dateTime`, `title`, `tag`, `description`, `href`, and optional `external`.
- Descriptions must stay under 200 characters, titles under 80 characters, and tags under 24 characters so the feed remains scannable on the homepage.
- Render each update as one clickable row with date, title, tag, and description. Do not put the feed into heavy nested cards or long article previews.
- The homepage feed should auto-reveal later rows while scrolling via the feed sentinel; do not use a manual `查看全部动态` / `View all updates` CTA.

## Multilingual Guardrails

- Chinese pages should use `lang="zh-CN"`, Chinese navigation aria labels, Chinese card titles, and Chinese footer section names.
- English-only UI labels such as `Official Docs`, `Frameworks`, `Comparison`, and `/ PRODUCTS` should not appear on Chinese pages.
- The English page should use `lang="en"` and can keep the single `中文` language switch, but it must explicitly state that detailed section pages are currently maintained in Chinese until English section routes exist.
- Top navigation must be generated from the single `navModel` schema in `src/data/site.mjs`; locales may only provide labels and per-locale href values through `localeMessages`.
- External nav behavior and nav stats also belong in `navModel`; shared components should only render the data shape and must not branch by language.
- Astro pages, layouts, and components must not hard-code localized UI copy. Route files choose locale or data records; data files provide copy; shared components render the same element structure for every locale.
- Localized homepage variants must share the same section order, class names, repeated card counts, update-row counts, and CTA structure. A language should never add a one-off component such as a source button.
- Homepage runtime map labels, node names, loop steps, and accessibility labels belong in `homePages[locale].hero`; the map component must stay language-neutral and render the same node count for every locale.

## Learning Shell

- Learning directory entries should be static course subpages under the same learning shell: `course.html`, `course-01.html` through `course-11.html`, plus `course-other-glossary.html`.
- The left learning sidebar must stay visible on every learning subpage and should not use in-page hash links or jump to a non-learning page.
- The body should render the active lesson content, not duplicate the full course outline that already lives in the sidebar.

## Local Browser Smoke

- Serve checked-in Pages output with `python3 -m http.server <port> --directory docs` when browser tooling cannot open a `file://` page.
- Stop the temporary server after verification; keep the output limited to rendered `docs/` files so the smoke matches GitHub Pages.
