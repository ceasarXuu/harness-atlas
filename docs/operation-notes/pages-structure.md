# Pages Structure Operation Note

- Date: 2026-05-24
- Scope: GitHub Pages static structure for Harness Atlas.

## Problem

The published `docs/` site only exposed `index.html` and `en.html`, so the repository looked like a single landing page even though the project has framework, products, standards, patterns, research, timeline, and references content areas. Glossary content belongs inside the framework page instead of becoming a standalone section.

## Durable Fix

- Add first-class static HTML entry pages under `docs/` for top-level sections.
- Keep glossary terms under the framework sidebar's `其他` group, currently `framework-glossary.html`, so framework concepts stay in the framework flow.
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

## Framework Shell

- Framework navigation entries should be static framework subpages under the same framework shell: `framework-01.html` through `framework-15.html`, plus `framework-glossary.html`.
- The English framework shell mirrors those routes as `en-framework-01.html` through `en-framework-15.html`, plus `en-framework-glossary.html`; language switches on a lesson must point to the matching lesson, not to the homepage.
- Do not reintroduce `course.html` as `00 框架路线`; the framework entry point is `framework-01.html`, and stale generated `docs/course.html` should be moved to Trash before release if it exists.
- The left framework sidebar must stay visible on every framework subpage and should not use in-page hash links or jump to a non-framework page.
- The body should render the active framework chapter content, not duplicate the full framework outline that already lives in the sidebar.

## Official Framework Content Import

- The formal framework package is 15 Markdown chapters under `framework/chapters/`, plus resource files under `framework/resources/`.
- Keep the formal package bilingual and immutable under `framework/`; generate localized Markdown with `node scripts/generate-localized-framework.mjs` into `src/generated/framework/{zh-CN,en}/` before wiring Astro routes.
- Render localized chapter Markdown through Astro Markdown imports in `src/pages/framework-*.astro` and `src/pages/en-framework-*.astro`; keep route metadata, titles, subtitles, and pager/sidebar order in `src/data/framework.mjs`.
- Do not render bilingual framework bodies inside one page. Chinese pages should show Chinese titles/body only; English pages should show English titles/body only.
- Rewrite intra-chapter Markdown links from source-file paths such as `./02-task-environment-and-boundary.md` to public routes such as `framework-02.html`, otherwise generated Pages output will contain broken local links.
- After importing framework content, run `npm run build`, copy `dist/.` into `docs/`, then run `npm test`. The tests compare generated `dist` artifacts byte-for-byte with checked-in `docs`, so a skipped copy is caught.
- Browser smoke should cover at least `framework-01.html`, `en-framework-01.html`, `framework-15.html`, `en-framework-15.html`, and both glossary routes on desktop and mobile widths. If Playwright's bundled browser is missing, use the local Chrome executable with Playwright instead of installing browsers during a normal content update.

## Local Browser Smoke

- Serve checked-in Pages output with `python3 -m http.server <port> --directory docs` when browser tooling cannot open a `file://` page.
- Stop the temporary server after verification; keep the output limited to rendered `docs/` files so the smoke matches GitHub Pages.
