# Subagent VS Review: Course Article Rewrite

- Created: 2026-06-01T03:10:52+0800
- Updated: 2026-06-01T03:36:02+0800
- Report schema: adversarial-v1
- Task: Rewrite chapter bodies as article-style explanatory prose instead of course scaffolding.
- Report path: `vs_review/2026-06-01-course-article-rewrite-review.md`
- Review mode: fresh internal subagents
- Source session policy: no inherited main-agent context
- Status: passed

## Round 1: Post-implementation Review

### Review Input

#### Objective
Each chapter should read like a serious article: explanatory argumentation with topic-specific headings, not a course lesson, workbook, checklist, assignment, or self-review page.

#### Review Target
Editorial rewrite of all 15 `course/chapters/*.md` files, generated localized Markdown, static `docs` output, import manifest policy, and regression tests.

#### Target Locations
- `course/chapters/*.md`
- `src/generated/course/zh-CN/chapters/*.md`
- `src/generated/course/en/chapters/*.md`
- `docs/course-01.html`
- `docs/en-course-01.html`
- `course/import-manifest.json`
- `tests/course-language-split.test.mjs`
- `tests/astro-migration.test.mjs`

#### Verification Status At Launch
- RED observed: `node --test tests/course-language-split.test.mjs` failed on `course-01.html` due to `本章命题`.
- GREEN observed: `node --test tests/course-language-split.test.mjs` passed, 6/6.
- Regression observed: `npm test` passed, 42/42.
- Browser smoke observed: 30 course chapter pages checked; no forbidden framing terms found; article body lengths remained above 1000 visible characters; sample headings were topic-specific.

### Reviewer Launch Records

| Reviewer | Internal Mechanism | Session / Job ID | Trace Source | Context Forked | Input Packet | Context Explicitly Excluded | Read-only |
|---|---|---|---|---|---|---|---|
| editorial-quality-adversary | multi_agent_v1.spawn_agent | 019e7f72-f290-7e41-a6c7-2768b98ada73 | spawn_agent tool result, nickname Ramanujan | fork_context=false | Round 1 Review Input | main-agent history, reasoning, drafts, conclusions, full diff unless needed | yes |

### Reviewer Output

The reviewer returned `BLOCKED`.

Blocking findings:
- Chinese localized chapters leaked English-only section headings across rendered article bodies, with cited examples in generated Chinese chapters including `02-task-environment-and-boundary.md`, `03-minimal-harness.md`, `05-tools-and-mcp-as-action-boundary.md`, and `12-evaluation-testing-and-benchmarking.md`.
- The chapters still read as structured notes and checklists rather than sustained articles, especially in `src/generated/course/en/chapters/14-production-architecture.md` and `src/generated/course/en/chapters/15-patterns-anti-patterns-and-future.md`.

Non-blocking risks:
- Source chapters still used source-facing bilingual scaffolding labels such as `本章副标题 / Subtitle`, `中文：`, `English:`, and bilingual slash headings.
- The article structures were mechanically repeated across chapters.

### Main Agent Response

Accepted both blocking findings. The chapter source format was changed from line-by-line bilingual scaffolding to complete locale-marked article blocks. Generated Chinese and English Markdown now extracts the matching locale block directly. The visible chapter body was rewritten as continuous explanatory prose, with no H3 note headings, no list items, no catalog-style colon entries, no YAML/template fragments, and no workbook/self-check terminology.

Regression coverage was expanded:
- `tests/course-language-split.test.mjs` now checks visible article framing, localized Chinese headings, prose-over-list structure, absence of excessive scaffolding, source-level complete per-language article blocks, and paragraph-tagged list/template fragments.
- `tests/astro-migration.test.mjs` now reads subtitle metadata from `subtitle_zh` / `subtitle_en`, resolves first article headings from locale-marked blocks, and verifies `article-v2` editorial rewrite provenance.
- `scripts/generate-localized-course.mjs` now extracts `<!-- zh-CN -->` and `<!-- en -->` sections before using the legacy bilingual fallback path.

## Round 2: Closure Review

### Reviewer Launch Records

| Reviewer | Internal Mechanism | Session / Job ID | Trace Source | Context Forked | Input Packet | Context Explicitly Excluded | Read-only |
|---|---|---|---|---|---|---|---|
| blocking-closure-review | multi_agent_v1.spawn_agent | 019e7f79-84e0-7553-b063-c6817bf76d90 | spawn_agent tool result, nickname Lorentz | fork_context=false | Verify accepted blocking findings were fixed | main-agent history, reasoning, drafts, conclusions | yes |

### Reviewer Output

The reviewer returned `BLOCKED`.

Resolved:
- Prior localization leakage appeared fixed in rendered outputs.
- `node --test tests/course-language-split.test.mjs` passed, 9/9.
- `node --test tests/astro-migration.test.mjs` passed, 16/16.

Still blocking:
- Chapters remained structurally list/template-heavy, rendered as paragraph tags rather than Markdown bullets.
- Examples included `src/generated/course/zh-CN/chapters/08-skills-as-capability-packaging.md`, `src/generated/course/zh-CN/chapters/01-why-agent-harness.md`, and `src/generated/course/zh-CN/chapters/14-production-architecture.md`.
- The canonical source still contained line-by-line bilingual scaffolding and a YAML sample mentioning course-lesson generation.

### Main Agent Response

Accepted the remaining blocking finding. All 15 canonical chapters were rewritten again as full Chinese and English article blocks, each with sustained prose paragraphs and topic-specific headings. Line-by-line bilingual labels, subtitle quote blocks, Mermaid/YAML/template fragments, list-like rules, and short isolated maxims were removed from chapter bodies. Generated localized Markdown and checked-in docs were rebuilt from those source articles.

## Round 3: Final Closure Review

### Reviewer Launch Records

| Reviewer | Internal Mechanism | Session / Job ID | Trace Source | Context Forked | Input Packet | Context Explicitly Excluded | Read-only |
|---|---|---|---|---|---|---|---|
| final-closure-review | multi_agent_v1.spawn_agent | 019e7f86-ed97-7781-b820-9f7145f089a8 | spawn_agent tool result, nickname Herschel | fork_context=false | Final closure review after full article-block rewrite | main-agent history, reasoning, drafts, conclusions | yes |

### Reviewer Output

The reviewer returned `PASS`.

Evidence cited:
- `node --test tests/course-language-split.test.mjs`: 11/11 passed.
- `node --test tests/astro-migration.test.mjs`: 16/16 passed.
- Source chapters are now separated into full language blocks, with `course/chapters/01-why-agent-harness.md:12` starting `zh-CN` and `course/chapters/01-why-agent-harness.md:31` starting `en`.
- Generated localized Markdown is route-language specific, including `src/generated/course/zh-CN/chapters/01-why-agent-harness.md:1` and `src/generated/course/en/chapters/01-why-agent-harness.md:1`.
- Built docs spot checks showed localized article prose rather than bilingual side-by-side rendering for course 01, 08, and 14 in both languages.
- Targeted structure scan over all 30 docs course pages found `docs_article_scan_bad_count 0`, with no `<li>`, no `<h3>`, no short standalone note paragraphs, no colon-led catalog paragraphs, and no visible language leaks inside chapter articles.
- Import and generation path records the editorial rewrite and extracts marked locale sections directly in `course/import-manifest.json:5` and `scripts/generate-localized-course.mjs:119`.

Residual non-blocking risk:
- `scripts/generate-localized-course.mjs` keeps the legacy fallback localization path for older unmarked bilingual material. Current chapters use marked sections and tests cover reproducibility, so this is not blocking.

## Local Verification

- `node --test tests/course-language-split.test.mjs`: passed, 11/11.
- `npm test`: passed, 47/47.
- `npm run build`: passed, 40 pages built.
- Browser smoke over 30 chapter pages at `http://127.0.0.1:4173`: `failures: []`.
- `git diff --check`: passed.

## Closure Status

- Blocking findings found: yes
- Accepted blocking findings fixed: yes
- Blocking re-review completed: yes
- Blocking re-review passed: yes
- Blocking re-review round links:
  - Round 2: 019e7f79-84e0-7553-b063-c6817bf76d90
  - Round 3: 019e7f86-ed97-7781-b820-9f7145f089a8
- Rejected findings backed by evidence: none
- Deferred findings documented: legacy fallback generator path retained for compatibility
- Blocked reason: none
- Allowed to proceed: yes

## Final Conclusion

The course article rewrite passes adversarial review. The site now renders separate Chinese and English article bodies from full per-language source blocks, with tests covering language separation, source structure, article prose shape, generated reproducibility, and docs synchronization.
