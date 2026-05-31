# Course Language Split Review

## Round 1: implementation and validation review

### Review Input

#### Objective
Fix the course rendering regression where bilingual official Markdown was shown as Chinese/English side-by-side inside one page, even though the site has language switching.

#### Review Target
Localized course routes, generated localized Markdown, language-specific sidebar/pager metadata, tests, generated `docs/`, and browser verification.

#### Target Locations
- `scripts/generate-localized-course.mjs`
- `src/content/course/zh-CN/`
- `src/content/course/en/`
- `src/data/course.mjs`
- `src/data/site.mjs`
- `src/components/LearningLayout.astro`
- `src/components/CourseLessonPage.astro`
- `src/pages/course-*.astro`
- `src/pages/en-course-*.astro`
- `src/pages/course-other-glossary.astro`
- `src/pages/en-course-other-glossary.astro`
- `tests/astro-migration.test.mjs`
- `tests/site-structure.test.mjs`
- `docs/`
- `docs/operation-notes/pages-structure.md`

#### Change Introduction
The bilingual formal source package remains under `course/`. A generator creates localized Markdown under `src/content/course/{zh-CN,en}/`. Chinese course routes import Chinese Markdown and English routes import English Markdown. The learning shell now renders locale-specific lesson lists, glossary links, pager labels, and per-page language switch hrefs. English course pages are emitted as `en-course-01.html` through `en-course-15.html`, plus `en-course-other-glossary.html`.

#### Risk Focus
- Chinese pages may still leak English body copy or bilingual titles.
- English pages may still leak Chinese body copy or labels.
- Language switching may jump to homepage or wrong chapter instead of matching lesson.
- Generated localized Markdown may corrupt headings, links, checklists, diagrams, or glossary content.
- Tests may overfit only lesson 01.
- Added code may violate the 500-line file rule.

#### Assumptions To Attack
- The generator safely derives localized Markdown from the formal bilingual package.
- `course/` remains the authoritative source; generated localized Markdown is derived content.
- The English learning shell has route parity with the Chinese shell.
- Static `docs/` is synced to `dist/`.

#### Adversarial Lenses
- product language semantics
- generated content correctness
- route parity
- test validity
- release artifact parity
- maintainability

#### Verification Status
- Red test was observed before implementation: `npm test` failed because `en-course-01.html` and localized metadata/routes did not exist, and Chinese course pages still rendered bilingual copy.
- `npm run build && cp -R dist/. docs/ && npm test` passed: 36 tests, 0 failures.
- Browser smoke against `docs` on local server passed for `course-01.html` and `en-course-01.html` at 1280px and 390px: correct `lang`, correct localized title/body, no bilingual title, no raw `中文：` or `English:` labels, matching per-lesson language switch, no horizontal overflow.
- Line-count check after refactor: `src/data/site.mjs` 243 lines, `src/data/course.mjs` 289 lines, `scripts/generate-localized-course.mjs` 202 lines, `tests/astro-migration.test.mjs` 460 lines, `tests/site-structure.test.mjs` 479 lines.

#### Reviewer Instructions
- Fresh internal subagent session.
- No inherited main-agent context.
- Read target files directly.
- Do not modify files.
- Focus on high-impact regressions and missed language-split cases.

### Reviewer Timeout Policy

| Complexity | Initial Wait | Extension | Max Attempts Per Role | Blocking Closure Behavior |
|---|---:|---:|---:|---|
| normal | 10 minutes | none | 2 | accepted blockers require a fresh closure review |

### Reviewer Selection

| Reviewer | Reason Selected | Risk Area |
|---|---|---|
| implementation-adversary | The fix changes route structure, generated content, and layout data. | product semantics, route parity, content generation |
| test-validity-adversary | The bug is a test gap around language boundaries. | assertions, source drift, browser evidence |

### Reviewer Launch Records

| Reviewer | Internal Mechanism | Session / Job ID | Trace Source | Context Forked | Input Packet | Context Explicitly Excluded | Read-only |
|---|---|---|---|---|---|---|---|
| implementation-adversary | `multi_agent_v1.spawn_agent` | `019e7f47-5720-7e13-9cc4-1a93e92da1bb` | spawn_agent tool result, nickname Hilbert | fork_context=false | Round 1 Review Input | main-agent history, reasoning, drafts, conclusions | yes |
| test-validity-adversary | `multi_agent_v1.spawn_agent` | `019e7f47-88ee-7762-a95a-6c2d12f656aa` | spawn_agent tool result, nickname Volta | fork_context=false | Round 1 Review Input | main-agent history, reasoning, drafts, conclusions | yes |

### Reviewer Timeout Records

| Reviewer Output Key | Reviewer Role | Attempt | Session / Job ID | Waited | Status | Reason | Action |
|---|---|---:|---|---:|---|---|---|
| implementation-adversary-1 | implementation-adversary | 1 | `019e7f47-5720-7e13-9cc4-1a93e92da1bb` | 10 minutes | completed | blocker found: English lessons 02-15 still leaked Chinese image-description headings | completed |
| test-validity-adversary-1 | test-validity-adversary | 1 | `019e7f47-88ee-7762-a95a-6c2d12f656aa` | 10 minutes | completed | blocker found: tests only caught lesson 01 and missed CJK leakage in other English lessons | completed |

### Reviewer Outputs

#### implementation-adversary-1

##### Summary
Blocking regression remains: English course pages still render Chinese-only subsection headings in lessons 02-15, mainly under “Image Descriptions.” This violates the requirement that English routes show English course content only. Chinese pages look cleaner for this split, and route/pager/language-switch wiring is mostly sound.

##### Blocking Findings
- English lesson bodies still leak Chinese headings such as `闭环运行图`, `状态时间线`, `边界地图`, `工具网关图`, `组织结构图`, and `模式地图`.

##### Non-blocking Risks
- The generator was not wired into `npm run build` or `npm test`; checked-in localized Markdown could become stale unless contributors remember the manual step.
- `BaseLayout` prefetches the same static routes for all locales, including `course-01.html` on English course pages. This is release polish, not the language-split bug.

##### Required Fixes
- Translate or derive English equivalents for all Chinese-only course headings, especially image-description headings.
- Prefer durable source-driven structure: make those headings bilingual in source or add explicit generator logic for heading plus localized prompt pairs.
- Regenerate localized Markdown, rebuild, sync `dist` to `docs`, and rerun tests.

##### Missing Tests
- Add a test over every `dist/en-course-*.html` and `dist/en-course-other-glossary.html` that strips scripts/styles and asserts no CJK remains except the top-nav language switch label `中文`.
- Current language-boundary test only checks lesson 01.
- Broader route tests checked for `中文：` and `本章命题`, but not arbitrary CJK leaks.

##### Missing Logs / Observability
- Add deterministic generation freshness check so stale or partially localized files fail before release.

##### Evidence
- English generated Markdown for lessons 02-15 retained Chinese-only image-description headings.
- Published `docs/en-course-*.html` rendered those headings.
- Root cause was in `scripts/generate-localized-course.mjs`: unknown Chinese headings passed through unchanged.

#### test-validity-adversary-1

##### Summary
Read-only review found a blocking gap: tests did not catch Chinese leakage across English course pages beyond lesson 01. The issue was not theoretical; generated English pages contained Chinese `<h3>` headings in multiple lessons.

##### Blocking Findings
- English course pages still leaked Chinese content outside the language switch.
- Language-boundary tests were too narrow for the user complaint because strong checks only covered `course-01.html` and `en-course-01.html`.

##### Non-blocking Risks
- Generated localized Markdown was not proven reproducible from official source during tests.
- Docs/dist parity preserved bad generated English pages because it is not a semantic language check.
- `tests/site-structure.test.mjs` did not independently exercise English course pages.

##### Required Fixes
- Add all-English-course visible-text guard rejecting CJK outside allowed UI exceptions.
- Fix generator so Chinese-only image-description headings are localized or removed from English output.
- Add generator determinism test by running the generator into a temporary output directory and comparing to committed localized Markdown.

##### Missing Tests
- Per-lesson language-boundary tests for all 15 Chinese and English pages.
- Glossary-wide visible-text language-boundary test.
- Route-pair test for every Chinese/English lesson and both glossary routes.
- Docs-level semantic test for `docs/en-course-*.html`.
- Browser smoke should include first lesson, final lesson, and both glossary routes on desktop and mobile.

##### Missing Logs / Observability
- No generation manifest or localized-output hash records existed.
- Browser smoke results were not captured as durable artifact.

##### Evidence
- English generated pages contained Chinese image-description headings.
- Existing tests only checked lesson 01 strongly and did not reject arbitrary CJK in English output.

### Main Agent Response

| Reviewer | Finding | Broken Assumption / Failure Scenario | Severity | Decision | Evidence / Reason | Action Taken | Follow-up |
|---|---|---|---|---|---|---|---|
| implementation-adversary-1 | English lessons 02-15 still leaked Chinese image-description headings | English pages can pass while showing Chinese-only `<h3>` headings | blocking | accept | Reviewers found concrete CJK headings in generated English Markdown and `docs/en-course-*.html`. | Fixed `scripts/generate-localized-course.mjs` to track Image Descriptions sections and emit English `Image Prompt N` headings for Chinese-only prompt headings; regenerated `src/generated/course/{zh-CN,en}`; rebuilt and synced `docs`. | Round 2 closure review |
| test-validity-adversary-1 | Language-boundary tests only covered lesson 01 strongly | Middle/final English lessons can leak Chinese without failing tests | blocking | accept | Existing all-lesson checks only rejected raw labels, not arbitrary CJK text. | Added `tests/course-language-split.test.mjs` with an all-English visible-text CJK guard over every English course and glossary page. | Round 2 closure review |
| test-validity-adversary-1 | No generator determinism proof | Checked-in localized Markdown can drift from generator output | blocking | accept | Localized content is generated and should be reproducible from formal source. | Added a test that runs `scripts/generate-localized-course.mjs` into a temp directory and byte-compares all generated Markdown against committed `src/generated/course`. | Round 2 closure review |
| test-validity-adversary-1 | Route-pair and docs semantic coverage missing | Language switch or checked-in docs can regress independently | blocking | accept | The user-facing failure is in published `docs` and per-page language switch. | Added route-pair tests for all 15 lessons plus glossary, and a docs/dist visible-text language split semantic check. | Round 2 closure review |
| implementation-adversary-1 | Generator manual step can be forgotten | Builds can pass with stale generated content | non-blocking | accept | Determinism test now fails when generated content differs from script output. | Added deterministic generation test; operation notes already document generation command. | n/a |
| implementation-adversary-1 | Locale-neutral prefetch includes `course-01.html` on English pages | English pages may prefetch Chinese first lesson | non-blocking | defer | This is not visible content leakage or navigation mismatch. Prefetch is an optimization hint and can be handled separately if needed. | No change. | n/a |
| test-validity-adversary-1 | Browser smoke results not durable artifact | Future reviews cannot inspect browser evidence file | non-blocking | defer | Automated tests now cover the exact language-split semantics. Browser smoke results are recorded in this report. | Recorded smoke coverage and results in report; no separate artifact. | n/a |

### Closure Status

- Blocking findings found: yes
- Accepted blocking findings fixed: yes
- Blocking re-review completed: yes
- Blocking re-review passed: yes
- Blocking re-review round links:
  - Round 2: blocker closure review
- Blocking re-review launch records:
  - `019e7f4d-72cf-75c0-ab3d-440b53a70e6a`
  - `019e7f4d-a58e-77b3-a3cc-7e3eec58c21c`
- Rejected findings backed by evidence: n/a
- Deferred findings documented: yes
- Blocked reason: n/a
- Allowed to proceed: yes

## Round 2: blocker closure review

### Review Input

#### Objective
Confirm closure of Round 1 blockers: English course pages must no longer leak Chinese content, and tests must catch that class of regression across all English course/glossary pages.

#### Review Target
Generator fix, regenerated localized Markdown, tests, docs output, and browser verification.

#### Target Locations
- `scripts/generate-localized-course.mjs`
- `src/generated/course/en/`
- `src/generated/course/zh-CN/`
- `tests/course-language-split.test.mjs`
- `tests/astro-migration.test.mjs`
- `docs/en-course-*.html`
- `docs/en-course-other-glossary.html`
- `vs_review/2026-06-01-course-language-split-review.md`

#### Change Introduction
The generator now tracks `Image Descriptions` sections and replaces Chinese-only English-page image prompt headings with `Image Prompt N`. Localized Markdown was regenerated under `src/generated/course`. New tests assert no visible CJK in every English course/glossary page after removing the `中文` language-switch label, verify route-pair language switches, verify generated Markdown determinism, and verify checked-in docs have the same visible language split semantics as dist.

#### Verification Status
- `npm run build && cp -R dist/. docs/ && npm test` passed: 40 tests, 0 failures.
- Build output generated 40 pages and no duplicate content collection warnings.
- Browser smoke against `docs` on local server passed for `course-01.html`, `en-course-01.html`, `course-15.html`, `en-course-15.html`, `course-other-glossary.html`, and `en-course-other-glossary.html` at 1280px and 390px. English pages had no CJK outside language switch, no raw `中文：` or `English:` labels, no bilingual slash titles, correct `lang`, correct localized title, correct language switch href, and no horizontal overflow.

#### Reviewer Instructions
- Fresh internal subagent session.
- No inherited main-agent context.
- Read target files directly.
- Do not modify files.
- Focus only on closure of accepted Round 1 blockers and any new blocker introduced by the fix.

### Reviewer Timeout Policy

| Complexity | Initial Wait | Extension | Max Attempts Per Role | Blocking Closure Behavior |
|---|---:|---:|---:|---|
| normal | 10 minutes | none | 2 | cannot pass if review is unavailable |

### Reviewer Selection

| Reviewer | Reason Selected | Risk Area |
|---|---|---|
| implementation-adversary | Round 1 found implementation leakage in generated English pages. | generated content closure |
| test-validity-adversary | Round 1 found missing all-page language-boundary tests. | test closure |

### Reviewer Launch Records

| Reviewer | Internal Mechanism | Session / Job ID | Trace Source | Context Forked | Input Packet | Context Explicitly Excluded | Read-only |
|---|---|---|---|---|---|---|---|
| implementation-adversary | `multi_agent_v1.spawn_agent` | `019e7f4d-72cf-75c0-ab3d-440b53a70e6a` | spawn_agent tool result, nickname Carver | fork_context=false | Round 2 Review Input | main-agent history, reasoning, drafts, conclusions | yes |
| test-validity-adversary | `multi_agent_v1.spawn_agent` | `019e7f4d-a58e-77b3-a3cc-7e3eec58c21c` | spawn_agent tool result, nickname Lovelace | fork_context=false | Round 2 Review Input | main-agent history, reasoning, drafts, conclusions | yes |

### Reviewer Timeout Records

| Reviewer Output Key | Reviewer Role | Attempt | Session / Job ID | Waited | Status | Reason | Action |
|---|---|---:|---|---:|---|---|---|
| implementation-adversary-2 | implementation-adversary | 1 | `019e7f4d-72cf-75c0-ab3d-440b53a70e6a` | 10 minutes | completed | no blockers; English CJK leakage closed | completed |
| test-validity-adversary-2 | test-validity-adversary | 1 | `019e7f4d-a58e-77b3-a3cc-7e3eec58c21c` | 10 minutes | completed | no blockers; Round 1 test gaps closed | completed |

### Reviewer Outputs

#### implementation-adversary-2

##### Summary
No blockers found. The Round 1 English CJK leakage blocker is closed: generated English Markdown no longer contains CJK, English docs/dist visible text has no CJK after removing the `中文` switch label, and regression tests cover all 15 English lessons plus the English glossary.

##### Blocking Findings
none

##### Non-blocking Risks
- Route-pair assertions used broad regexes, so a future false positive would be possible if the expected href and `中文` label appeared separately. Current rendered routes are correct.
- `visibleText()` did not decode HTML entities before the CJK check. Current output used raw text.

##### Required Fixes
none for closure

##### Missing Tests
No blocking gaps. Accepted Round 1 gaps are covered by all-English visible-text CJK guard, all route-pair language switches, generator determinism, and docs/dist visible-text parity.

##### Missing Logs / Observability
none for closure

##### Evidence
- Generator rewrites image-description headings to `Image Prompt N` inside English image sections.
- Generated English chapters show `### Image Prompt 1/2` instead of Chinese headings.
- `rg` found no CJK in `src/generated/course/en`.
- `node --test tests/course-language-split.test.mjs` passed.
- `npm test` includes this file through `node --test tests/*.test.mjs`.

#### test-validity-adversary-2

##### Summary
Round 1 blockers are closed. New tests cover every English lesson plus the English glossary, verify per-route language switch pairing, prove generated Markdown is reproducible by temp-output byte comparison, and compare checked-in `docs` visible text against `dist`.

##### Blocking Findings
none

##### Non-blocking Risks
- The CJK guard removed every `中文` occurrence, not just the nav language switch, so a visible English-page leak consisting only of `中文` would pass.
- `visibleText()` did not HTML-decode entities, so entity-encoded CJK could evade the regex while rendering as Chinese in a browser.

##### Required Fixes
none for closure

##### Missing Tests
No blocking missing tests. Optional hardening: decode HTML entities before the CJK assertion and remove only the specific language-switch element/text rather than all `中文`.

##### Missing Logs / Observability
none for closure

##### Evidence
- All English course/glossary pages are enumerated in `tests/course-language-split.test.mjs`.
- Visible CJK is rejected across every English learning page.
- All lesson and glossary route pairs are checked.
- Generator reproducibility is tested with temp output and byte comparison.
- `docs`/`dist` visible text parity is checked for all learning pages.
- Existing migration tests verify all English routes import generated English Markdown.

### Main Agent Response

| Reviewer | Finding | Broken Assumption / Failure Scenario | Severity | Decision | Evidence / Reason | Action Taken | Follow-up |
|---|---|---|---|---|---|---|---|
| implementation-adversary-2 | No blocking findings | n/a | n/a | accept | Closure review verified no CJK remains in generated English course Markdown or English docs/dist visible text outside the language switch. | No further product code changes required. | n/a |
| implementation-adversary-2 | Route-pair regex could be fooled by separated href and label | A test could pass if href and `中文` appear in different anchors | non-blocking | defer | Current rendered route pairs are correct and browser smoke verified actual language switch hrefs. | Left as residual test-hardening note. | n/a |
| implementation-adversary-2 | CJK entity decoding absent | Encoded CJK could render as Chinese while evading regex | non-blocking | accept | Low-cost hardening. | Updated `tests/course-language-split.test.mjs` `visibleText()` to decode decimal and hex numeric HTML entities before CJK assertion. | n/a |
| test-validity-adversary-2 | CJK guard removed all `中文` occurrences | A leak consisting only of `中文` could be masked | non-blocking | accept | Low-cost hardening. | Replaced broad `.replace(/中文/g, "")` with `withoutLanguageSwitch(html)`, removing only the specific language-switch anchor before visible-text extraction. | n/a |

### Closure Status

- Blocking findings found: no
- Accepted blocking findings fixed: yes
- Blocking re-review completed: yes
- Blocking re-review passed: yes
- Blocking re-review round links:
  - Round 2: `implementation-adversary-2`
  - Round 2: `test-validity-adversary-2`
- Blocking re-review launch records:
  - `019e7f4d-72cf-75c0-ab3d-440b53a70e6a`
  - `019e7f4d-a58e-77b3-a3cc-7e3eec58c21c`
- Rejected findings backed by evidence: n/a
- Deferred findings documented: yes
- Blocked reason: n/a
- Allowed to proceed: yes

## Final Conclusion

Course language-split regression is fixed. No unresolved blocking findings remain.
