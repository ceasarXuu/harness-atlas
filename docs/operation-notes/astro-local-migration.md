# Astro Local Migration Operation Note

- Date: 2026-05-24
- Scope: Local Astro migration without publishing GitHub Pages.

## Constraints

- Keep the current UI theme unchanged.
- Do not add new page elements during the first migration pass.
- Do not publish or push while the user is reviewing the local result.

## Approach

- Use Astro as a static build shell first.
- Render existing `docs/*.html` pages through `src/components/RawPage.astro`.
- Copy existing static assets to `public/` so local Astro dev and build use the same CSS and favicon.
- Set `build.format: "file"` so routes build to `course.html`, `products.html`, and other existing URL shapes.

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
