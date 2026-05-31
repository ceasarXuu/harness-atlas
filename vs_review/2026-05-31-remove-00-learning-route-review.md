# Subagent VS Review: remove 00 learning route

- Created: 2026-05-31T23:20:14+0800
- Updated: 2026-05-31T23:31:13+0800
- Report schema: adversarial-v1
- Task: Remove `00 学习路线` from the Harness Atlas learning flow.
- Report path: `vs_review/2026-05-31-remove-00-learning-route-review.md`
- Review mode: fresh internal subagents
- Source session policy: no inherited main-agent context
- Status: open

## Round 1: post-implementation review

### Review Input

#### Objective
Remove `00 学习路线` from the public learning experience while preserving a valid course entry point and unbroken static navigation.

#### Review Target
Code implementation, generated static pages, regression tests, and operation notes.

#### Target Locations
- `src/data/site.mjs`
- `src/data/home.mjs`
- `src/pages/course-01.astro` through `src/pages/course-11.astro`
- `src/pages/course.astro`
- `tests/astro-migration.test.mjs`
- `tests/site-structure.test.mjs`
- `docs/`
- `dist/`
- `docs/operation-notes/pages-structure.md`
- `docs/operation-notes/astro-local-migration.md`
- `npm test`
- `npm run build`

#### Change Introduction
The learning roadmap item was removed from `courseLessons`, global/home course entry links now point to `course-01.html`, the `course.html` Astro route and checked-in generated page were removed, lesson page indices were shifted, and tests now assert that `course.html` and `学习路线` are absent from the learning flow.

#### Risk Focus
- The site could still link to `course.html` through stale generated output, prefetch hints, hidden home section data, or operation docs.
- Lesson pages could shift to the wrong content after removing the first array element.
- Removing the route could break the top navigation, homepage CTA, local link tests, or glossary pager sequence.
- Tests could assert the implementation details without proving the public `docs/` artifact is clean.
- Published docs could drift from `dist` after the build.

#### Assumptions To Attack
- `course-01.html` is the intended replacement entry point for all learning navigation.
- Removing `course.html` is better than retaining it as a compatibility alias.
- The first visible lesson should not render a previous pager.
- Generated `docs/` pages have been synchronized after the Astro build.
- Operation notes no longer guide future agents to recreate lesson 00.

#### Adversarial Lenses
- requirements
- implementation
- maintenance
- testing
- observability
- release

#### Verification Status
- Wrote failing tests first and observed failures for leftover `course.html`, stale nav links, sidebar `00 学习路线`, and previous-pager behavior.
- `npm test` passed: 27 tests, 0 failures.
- `npm run build` passed: 20 pages built.
- Synced `dist/` into `docs/`.
- `node --test tests/site-structure.test.mjs` passed after sync: 16 tests, 0 failures.
- `rg -n "course\\.html|学习路线|course-00|learningRoadmap" src tests docs dist README.md README.en.md` only finds negative assertions and operation-note warnings.

#### Reviewer Instructions
- Fresh internal subagent session.
- No inherited main-agent context.
- Read target files directly.
- Do not modify files.
- Cite evidence paths and line numbers when possible.
- Try to falsify the verification claims and identify any remaining user-facing or release risks.

### Reviewer Timeout Policy

| Complexity | Initial Wait | Extension | Max Attempts Per Role | Blocking Closure Behavior |
|---|---:|---:|---:|---|
| normal | 10 minutes | none | 2 | cannot pass if review is unavailable |

### Reviewer Selection

| Reviewer | Reason Selected | Risk Area |
|---|---|---|
| implementation-adversary | The change removes a route, shifts lesson array indices, and regenerates static artifacts. | correctness, stale links, route output |
| test-validity-adversary | The repository relies on tests to prove both source and generated artifacts are clean. | self-deceptive tests, missed public artifact gaps |

### Reviewer Launch Records

| Reviewer | Internal Mechanism | Session / Job ID | Trace Source | Context Forked | Input Packet | Context Explicitly Excluded | Read-only |
|---|---|---|---|---|---|---|---|
| implementation-adversary | `multi_agent_v1.spawn_agent` | `019e7e9f-c58c-71a2-8bac-dfa86d7fab25` | spawn_agent tool result, nickname James | fork_context=false | Round 1 Review Input | main-agent history, reasoning, drafts, conclusions, full diff except reviewer may run `git diff` directly | yes |
| test-validity-adversary | `multi_agent_v1.spawn_agent` | `019e7ea0-01e8-77e1-ba60-5c3188bac351` | spawn_agent tool result, nickname Turing | fork_context=false | Round 1 Review Input | main-agent history, reasoning, drafts, conclusions, full diff except reviewer may run `git diff` directly | yes |

### Reviewer Timeout Records

| Reviewer Output Key | Reviewer Role | Attempt | Session / Job ID | Waited | Status | Reason | Action |
|---|---|---:|---|---:|---|---|---|
| implementation-adversary-1 | implementation-adversary | 1 | `019e7e9f-c58c-71a2-8bac-dfa86d7fab25` | <10m | completed | no blocking findings | completed |
| test-validity-adversary-1 | test-validity-adversary | 1 | `019e7ea0-01e8-77e1-ba60-5c3188bac351` | <10m | completed | no blocking findings | completed |

### Reviewer Outputs

#### implementation-adversary-1

##### Summary
Read-only review found no blocking defect. Source, `dist/`, and checked-in `docs/` consistently remove `course.html` / `00 学习路线` from public learning navigation, with `course-01.html` acting as the learning entry point.

##### Blocking Findings
- none

##### Non-blocking Risks
- External compatibility risk for old `course.html` URLs.
  - Broken assumption: removing `course.html` is always better than keeping a compatibility alias.
  - Failure scenario: existing bookmarks or indexed links to `/harness-atlas/course.html` return 404 after release.
  - Trigger condition: a user enters through a pre-change external link.
  - Impact: navigation is internally valid, but legacy entry traffic breaks.
  - Proof needed: product decision that external compatibility is intentionally not supported, or a static redirect strategy if it is.
- Lesson route files remain index-coupled.
  - Broken assumption: shifting the array once is enough to keep route-to-lesson mapping safe.
  - Failure scenario: future insertion/removal in `courseLessons` silently shifts `src/pages/course-*.astro` mappings again.
  - Trigger condition: adding a lesson before `course-11` without updating every route index.
  - Impact: a route can render the wrong lesson while still building.
  - Proof needed: keep current tests as guardrail, or move toward key-based page lookup in routes.
- No dedicated docs-vs-dist parity test exists.
  - Broken assumption: manual sync proof is enough to protect the checked-in Pages artifact.
  - Failure scenario: `dist` is correct but `docs` remains stale.
  - Trigger condition: build runs but copy/sync is skipped or partial.
  - Impact: GitHub Pages can serve different content than the verified build.
  - Proof needed: deterministic compare step for generated artifacts.

##### Required Fixes
- none

##### Missing Tests
- Dedicated `docs` versus `dist` generated-artifact parity test.

##### Missing Logs / Observability
- No runtime observability gap for a static navigation change.

##### Evidence
- `src/data/site.mjs:5-8` - entry links now point to `course-01.html`.
- `src/data/site.mjs:78-82` - prefetch no longer includes `course.html`.
- `src/data/site.mjs:84-162` - `courseLessons` starts at lesson `01`.
- `src/pages/course-01.astro:6` and `src/pages/course-11.astro:6` - route mappings aligned after index shift at review time.
- `tests/site-structure.test.mjs:80` and `tests/astro-migration.test.mjs:93` - tests assert removed page absence.
- `docs/operation-notes/pages-structure.md:50-52` - operation notes warn not to recreate lesson 00.

#### test-validity-adversary-1

##### Summary
No blocking finding found. The inspected generated `docs/` and `dist/` public HTML no longer expose `course.html` or `00 学习路线`; `course-01.html` is the global/home course entry, and first-lesson pager behavior is correct.

##### Blocking Findings
- none

##### Non-blocking Risks
- Tests rely on fixed public-page lists instead of discovering all public HTML outputs.
  - Broken assumption: broken local links are covered for every public docs/dist page.
  - Failure scenario: a future generated public HTML file outside fixed arrays keeps a stale `course.html` link and is not checked.
  - Trigger condition: adding or leaving behind another public HTML route not named in fixed arrays.
  - Impact: static navigation can break while tests pass.
  - Proof needed: public-page discovery test over `docs/**/*.html` and `dist/**/*.html`, excluding intentional non-public Jekyll internals.
- `docs`/`dist` sync is manually evidenced, not enforced by tests.
  - Broken assumption: tests verify both source-generated `dist` and checked-in `docs` stay equivalent.
  - Failure scenario: `npm run build` is correct, but `docs/` misses one copied file or retains stale output.
  - Trigger condition: build runs but copy/sync is skipped or partial.
  - Impact: GitHub Pages can serve different content than the verified Astro build.
  - Proof needed: deterministic compare step for public generated artifacts after sync.
- Lesson route files still manually index `courseLessonPages`.
  - Broken assumption: lesson index mismatches after shifting are fully guarded at the source boundary.
  - Failure scenario: `src/pages/course-06.astro` points at the wrong array index while stale checked-in docs still pass `site-structure`.
  - Trigger condition: future reorder/add/remove in `courseLessons` without route generation or a source-level alignment test.
  - Impact: local Astro build can serve mismatched lesson content.
  - Proof needed: source-level route/data alignment test or generated routes.

##### Required Fixes
- none

##### Missing Tests
- Public HTML discovery link checker instead of only fixed arrays.
- `docs`/`dist` sync equivalence test.
- Source route/data alignment test for manual indexes.

##### Missing Logs / Observability
- No runtime observability is needed for a static route removal.

##### Evidence
- `src/data/site.mjs:5-8` - global course nav points to `course-01.html`.
- `src/data/site.mjs:84-162` - lessons `01` through `11`, no `course-00`.
- `src/pages/course.astro` - absent.
- `docs/course.html` and `dist/course.html` - absent.
- `tests/site-structure.test.mjs:440-479` - first lesson has no previous pager.
- `docs/operation-notes/astro-local-migration.md:50-52` - operation notes warn not to reintroduce `course.html`.

### Main Agent Response

| Reviewer | Finding | Broken Assumption / Failure Scenario | Severity | Decision | Evidence / Reason | Action Taken | Follow-up |
|---|---|---|---|---|---|---|---|
| implementation-adversary | External compatibility risk for old `course.html` URLs | Existing bookmarks may 404 after release | non-blocking | reject | User asked to remove `00-学习路线`; retaining `course.html` as an alias would keep the removed route public. Internal navigation no longer references it, and tests intentionally assert absence. | No alias added. | Revisit only if user asks for backwards-compatible redirect semantics. |
| implementation-adversary | Lesson route files remain index-coupled | Future lesson edits could silently shift route content | non-blocking | accept | This is cheap to eliminate and improves architecture. | Added `getCourseLessonPage(key)` and changed course route files to select by stable key. Added source-level test. | Round 2 review. |
| implementation-adversary | No dedicated docs-vs-dist parity test exists | `docs` can drift from verified `dist` | non-blocking | accept | Directly protects release artifact. | Added generated artifact parity test comparing every `dist` file to `docs`. | Round 2 review. |
| test-validity-adversary | Fixed public-page lists can miss stale HTML | Hidden public HTML could keep old links | non-blocking | accept | Discovery-based checks are stronger than fixed arrays. | Added `publicHtmlPages()` checks over `docs` and `dist`, excluding underscore internals. | Round 2 review. |
| test-validity-adversary | Docs/dist sync manually evidenced | GitHub Pages artifact could differ from build | non-blocking | accept | Same as parity finding. | Added `Checked-in Pages output is synced with Astro dist artifacts` test. | Round 2 review. |
| test-validity-adversary | Manual route indexes | Local Astro build could serve mismatched lessons | non-blocking | accept | Same as route coupling finding. | Added stable key lookup and test. | Round 2 review. |

### Closure Status

- Blocking findings found: no
- Accepted blocking findings fixed: n/a
- Blocking re-review completed: n/a
- Blocking re-review passed: n/a
- Blocking re-review round links:
  - n/a
- Blocking re-review launch records:
  - n/a
- Rejected findings backed by evidence: yes
- Deferred findings documented: n/a
- Blocked reason: n/a
- Allowed to proceed: yes

## Round 2: post-hardening review

### Review Input

#### Objective
Validate the hardening added in response to Round 1 non-blocking findings.

#### Review Target
Regression tests, source route selection, and generated artifact sync.

#### Target Locations
- `src/data/site.mjs`
- `src/pages/course-01.astro` through `src/pages/course-11.astro`
- `tests/astro-migration.test.mjs`
- `docs/`
- `dist/`
- `npm test`
- `npm run build`

#### Change Introduction
Added `getCourseLessonPage(key)` and changed course routes to select lessons by stable keys. Added tests for `docs`/`dist` generated artifact equality, discovered public HTML link checks across both `docs` and `dist`, and source route key selection. Re-ran full tests and final build/sync checks.

#### Risk Focus
- New tests may be brittle or accidentally compare non-generated docs.
- Key-based routes may still not protect against missing lesson keys.
- Final generated `docs` may still drift after the last build.

#### Assumptions To Attack
- `distArtifactFiles()` only compares generated build artifacts that should be mirrored into `docs`.
- `publicHtmlPages()` excludes non-public Jekyll internals without hiding real public pages.
- `getCourseLessonPage(key)` fails loudly for invalid route keys.
- Full verification after hardening is enough to close the non-blocking risks.

#### Adversarial Lenses
- implementation
- testing
- release

#### Verification Status
- Red test observed for stable route keys before implementation.
- `npm test` passed: 30 tests, 0 failures.
- `npm run build` passed: 20 pages built.
- Synced `dist/` into `docs/`.
- `node --test tests/site-structure.test.mjs` passed after sync: 16 tests, 0 failures.
- `rg -n "course\\.html|学习路线|course-00|learningRoadmap" src tests docs dist README.md README.en.md` only finds negative assertions and operation-note warnings.

#### Reviewer Instructions
- Fresh internal subagent session.
- No inherited main-agent context.
- Read target files directly.
- Do not modify files.
- Cite evidence paths and line numbers when possible.
- Focus on whether the Round 1 accepted non-blocking fixes are correct and not overfitted.

### Reviewer Timeout Policy

| Complexity | Initial Wait | Extension | Max Attempts Per Role | Blocking Closure Behavior |
|---|---:|---:|---:|---|
| simple | 5 minutes | none | 2 | cannot pass if review is unavailable |

### Reviewer Selection

| Reviewer | Reason Selected | Risk Area |
|---|---|---|
| test-validity-adversary | The second change mainly adds test hardening and source-level route guards. | self-deceptive tests, release artifact comparison |

### Reviewer Launch Records

| Reviewer | Internal Mechanism | Session / Job ID | Trace Source | Context Forked | Input Packet | Context Explicitly Excluded | Read-only |
|---|---|---|---|---|---|---|---|
| test-validity-adversary | `multi_agent_v1.spawn_agent` | `019e7ea5-f06c-7873-9fa1-d82a912b74d5` | spawn_agent tool result, nickname Copernicus | fork_context=false | Round 2 Review Input | main-agent history, reasoning, drafts, conclusions | yes |

### Reviewer Timeout Records

| Reviewer Output Key | Reviewer Role | Attempt | Session / Job ID | Waited | Status | Reason | Action |
|---|---|---:|---|---:|---|---|---|
| test-validity-adversary-2 | test-validity-adversary | 1 | `019e7ea5-f06c-7873-9fa1-d82a912b74d5` | <5m | completed | no blocking findings | completed |

### Reviewer Outputs

#### test-validity-adversary-2

##### Summary
No blocking findings. The implementation appears to close the Round 1 accepted risks: stable keyed route selection is present, invalid lesson keys throw, docs and dist generated artifacts currently match, and public HTML discovery covers the expected page set in both `docs` and `dist`.

##### Blocking Findings
- none

##### Non-blocking Risks
- Route-key test is still source-pattern based, not semantic.
  - Broken assumption: route files using stable keys implies they render the matching lesson.
  - Failure scenario: a route could contain `getCourseLessonPage("course-01")` in dead code/comment while rendering another page object.
  - Trigger condition: future manual edit to a course route.
  - Impact: test could pass while a course URL renders the wrong lesson.
  - Proof needed: add a `dist`/`docs` heading assertion mapping each `course-XX.html` to the expected title.
- Artifact comparison may become brittle for future binary assets.
  - Broken assumption: UTF-8 string comparison is always a safe exact artifact comparator.
  - Failure scenario: future images/fonts are emitted under `dist`.
  - Trigger condition: adding binary generated assets.
  - Impact: noisy or inaccurate mirror validation.
  - Proof needed: compare generated artifacts as bytes.

##### Required Fixes
- none

##### Missing Tests
- Direct unit assertion that `getCourseLessonPage("course-00")` or an unknown key throws.
- Semantic route-output checks for every course page title/body, not only route source regex.

##### Missing Logs / Observability
- none

##### Evidence
- `src/data/site.mjs:262` - `getCourseLessonPage(key)` fails loudly for unknown keys.
- `src/pages/course-01.astro:6` through `src/pages/course-11.astro:6` - course routes call stable keys.
- `tests/astro-migration.test.mjs:40` - public HTML discovery excludes underscore internals.
- `tests/astro-migration.test.mjs:48` and `tests/astro-migration.test.mjs:183` - dist-to-docs comparison is scoped from `dist` into `docs`.
- `tests/astro-migration.test.mjs:108` and `tests/astro-migration.test.mjs:193` - removed `course.html` is asserted absent.
- Read-only reviewer checks: `node --test tests/site-structure.test.mjs` passed 16/16; filtered `tests/astro-migration.test.mjs` checks passed 5/5; manual artifact comparison found 24 dist artifacts, 0 missing in docs, 0 mismatches.

### Main Agent Response

| Reviewer | Finding | Broken Assumption / Failure Scenario | Severity | Decision | Evidence / Reason | Action Taken | Follow-up |
|---|---|---|---|---|---|---|---|
| test-validity-adversary | Route-key test is source-pattern based, not semantic | Route file could contain the right key without rendering the right lesson | non-blocking | accept | Semantic output assertions are cheap and remove overfitting. | Added `Course routes render the lesson selected by their route number`, checking each generated course page title and kicker against `courseLessons`. | none |
| test-validity-adversary | Artifact comparison may be brittle for binary assets | UTF-8 comparison is not byte-oriented | non-blocking | accept | Byte comparison is strictly stronger and simple. | Changed parity test to compare `Buffer` values with `assert.deepEqual`. | none |
| test-validity-adversary | Unknown key throw behavior not directly tested | `course-00` could become accepted later | non-blocking | accept | Locks removed lesson key out explicitly. | Added `Course lesson lookup rejects removed or unknown keys`. | none |

### Closure Status

- Blocking findings found: no
- Accepted blocking findings fixed: n/a
- Blocking re-review completed: n/a
- Blocking re-review passed: n/a
- Blocking re-review round links:
  - n/a
- Blocking re-review launch records:
  - n/a
- Rejected findings backed by evidence: n/a
- Deferred findings documented: n/a
- Blocked reason: n/a
- Allowed to proceed: yes

## Final Conclusion

Passed. `00 学习路线` / `course.html` is removed from source routes, generated `dist`, checked-in `docs`, global navigation, home CTAs, sidebars, and pager sequence. Accepted non-blocking hardening from review was implemented and verified with `npm test`, `npm run build`, final `docs` sync, and `node --test tests/site-structure.test.mjs`.
