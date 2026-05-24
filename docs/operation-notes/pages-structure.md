# Pages Structure Operation Note

- Date: 2026-05-24
- Scope: GitHub Pages static structure for Harness Atlas.

## Problem

The published `docs/` site only exposed `index.html` and `en.html`, so the repository looked like a single landing page even though the project has course, products, standards, patterns, research, timeline, glossary, and references content areas.

## Durable Fix

- Add first-class static HTML entry pages under `docs/`.
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
