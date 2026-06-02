# Subagent VS Review: framework rebrand

## Review Input

- Objective: Rebrand the former learning/course module as a Harness framework section.
- Scope: Public route migration from `course-*` to `framework-*`, user-visible UI copy, internal component/CSS/data naming, localized generated content paths, checked-in `docs/` output, and test contracts.
- Target locations:
  - `src/data/site.mjs`
  - `src/data/framework.mjs`
  - `src/components/FrameworkLayout.astro`
  - `src/components/FrameworkNodePage.astro`
  - `src/pages/framework-*.astro`
  - `src/pages/en-framework-*.astro`
  - `src/pages/framework-glossary.astro`
  - `src/pages/en-framework-glossary.astro`
  - `public/assets/css/framework.css`
  - `framework/`
  - `src/generated/framework/`
  - `tests/*.test.mjs`
  - `docs/`
- Verification status before review: `npm test` passed 47/47 after `npm run build` and `docs/` sync.

## Reviewer Launch Records

| Reviewer | Tool | Agent ID | Context | Input | Status |
| --- | --- | --- | --- | --- | --- |
| migration-adversary | `multi_agent_v1.spawn_agent` | `019e890c-9893-7c12-855c-70e362858f0a` | fresh, no fork | Review packet below | completed |

## Review Packet

You are a fresh read-only adversarial reviewer. Inspect `/Users/xuzhang/harness-atlas` directly. Do not modify files.

Review the framework rebrand migration:

- Former `course-*` public pages should now be `framework-*`.
- Top nav should show Chinese `框架` and English `FRAMEWORK`.
- Sidebar chrome should show `Harness 框架` / `Harness Framework`.
- Page kicker should use `框架 / ...` and `Framework / ...`.
- Pager labels should be `上一章` / `下一章` and `Previous Chapter` / `Next Chapter`.
- Internal component and CSS naming should no longer use `LearningLayout`, `CourseLessonPage`, or `learn.css`.
- Checked-in `docs/` should match `dist/`.
- Tests should catch route, navigation, language split, manifest, and docs sync drift.

Challenge:

- stale `course-*` links in source or generated output
- stale user-visible `学习`, `COURSE`, `Course directory`, `上一节`, `下一节`
- broken language switches or glossary routes
- tests that pass while published `docs/` is stale
- manifest/source verification made too weak by the rename
- internal naming still misleading future maintainers

Return findings with severity, evidence path/line, and whether each is blocking.

## Reviewer Output

### migration-adversary

1. High, blocking: checked-in docs were stale and had invalid generated JS in `docs/en.html`, while `dist/en.html` had the corrected `revealNextPage`.
2. Medium, blocking for rebrand completeness: source-facing framework package still had `Course` / `课程` in `framework/README.md`, `framework/COURSE_INDEX.md`, and `framework/resources/lab-project-framework-builder-harness.md`.
3. Medium, blocking for process accuracy: operation notes still documented old course paths and generated output paths.
4. Low, non-blocking: tests/internal helper names still used course terminology.

Residual risk noted by reviewer: public routes/nav/sidebar/kickers/pagers/language switches/glossary routes/component and CSS names mostly satisfied the migration, but release was not clean until docs, source package text, process docs, and test naming were cleaned.

## Main-Agent Responses

| Finding | Response | Action |
| --- | --- | --- |
| Stale checked-in docs | accept | Fixed `src/components/IndustryFeed.astro`, rebuilt, synced `dist/.` into `docs/`, and verified `npm test` passes docs/dist byte equality. |
| Source-facing framework package still says Course | accept | Rebranded `framework/README.md`, `framework/COURSE_INDEX.md`, and `framework/resources/lab-project-framework-builder-harness.md`; refreshed `framework/import-manifest.json` hashes. |
| Operation notes still document old course paths | accept | Updated `docs/operation-notes/pages-structure.md` and `docs/operation-notes/astro-local-migration.md` to framework routes, `framework/`, `src/generated/framework/`, and `scripts/generate-localized-framework.mjs`. |
| Test/internal helper names retain course terminology | accept | Renamed test variables/helpers from `englishCoursePages` and `allowedCourseLinkRewrite` to framework terms; renamed generator script to `scripts/generate-localized-framework.mjs`. |

## Closure

Closed. Final verification passed:

- `npm run build`
- `cp -R dist/. docs/`
- `npm test` passed 47/47.
