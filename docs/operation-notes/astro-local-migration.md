# Astro Local Migration Operation Note

- Date: 2026-05-24
- Scope: Local Astro migration without publishing GitHub Pages.

## Constraints

- Keep the current UI theme unchanged.
- Do not add new page elements during the first migration pass.
- Do not publish or push while the user is reviewing the local result.

## Approach

- Use Astro as a static build shell for GitHub Pages-compatible routes.
- Render local preview pages from Astro layouts, components, and central site data instead of streaming checked-in HTML.
- Copy existing static assets to `public/` so local Astro dev and build use the same CSS and favicon.
- Set `build.format: "file"` so routes build to `course.html`, `products.html`, and other existing URL shapes.

## Route And Loading Structure

- Use `src/layouts/BaseLayout.astro` for the shared document shell, metadata, header, footer, favicon, shared CSS preload, and low-priority route prefetch hints.
- Keep route content in `src/pages/*.astro`; simple section routes should delegate to `src/components/SectionPage.astro`.
- Keep shared route labels, homepage blocks, course modules, industry updates, and section cards in `src/data/site.mjs` so navigation and page structure are edited in one place.
- Load `assets/css/style.css` on every page and load `assets/css/learn.css` only on `course.html`.
- Keep glossary content under the learning shell, currently `course-glossary.html`; do not create or link a standalone top-level `glossary.html` route.
- Do not use `RawPage`, `set:html`, or filesystem reads from `docs/*.html` for runtime rendering once the Astro route shell is in place.

## Migration Checkpoints

- `tests/astro-migration.test.mjs` is the guardrail for Astro architecture, static route output, per-page CSS loading, script-free output, and broken local links.
- `tests/site-structure.test.mjs` still protects the checked-in `docs/*.html` Pages artifact while the local Astro version is being reviewed.
- If a page gains interactive behavior later, add that script through the specific route or island that needs it instead of making it global.

## Verification

```sh
npm test
npm run build
npm run dev -- --host 127.0.0.1 --port 4321
```

Browser smoke should cover `index.html`, `en.html`, and every section page across desktop and mobile viewports. The regression signal is no 4xx resources, visible `h1`, stable nav count, non-empty body text, and zero horizontal overflow.

Do not run two Astro builds against the same checkout in parallel because both write `dist/` and can race on generated route modules. Run `npm test` and `npm run build` sequentially.

## Homepage Industry Updates

For the learning-site homepage, keep the structure vertical: header, hero, then industry updates. Size `.home-hero` so the first industry updates section starts inside the first viewport on desktop. On mobile, the runtime trace card can be hidden in the first hero because otherwise it pushes the industry updates below the first viewport.

## Learning Page Sidebar

The learning page should open with a compact `.learn-hero`, then a `.learn-shell` two-column section. Keep `.learn-sidebar` visible in the first viewport on desktop and mobile; hide the learning hero trace card on mobile if it pushes the sidebar too far down.

Section pages other than home should not use `.hero` or a separate `.page-heading` block. Start `main` directly with the content section so readers reach navigation, directories, and article lists faster. Keep the full visual hero only for the homepage and the English homepage.
