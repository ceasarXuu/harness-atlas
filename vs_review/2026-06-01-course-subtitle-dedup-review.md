# Subagent VS Review: Course Subtitle Deduplication

- Created: 2026-06-01T02:40:46+0800
- Updated: 2026-06-01T02:43:45+0800
- Report schema: adversarial-v1
- Task: Remove duplicated course subtitles from chapter body rendering while preserving page intro subtitles.
- Report path: `vs_review/2026-06-01-course-subtitle-dedup-review.md`
- Review mode: fresh internal subagents
- Source session policy: no inherited main-agent context
- Status: passed

## Round 1: Post-implementation Review

### Review Input

#### Objective
Course pages should show each chapter subtitle once: as the page intro under the H1. The article body must not repeat the source Markdown subtitle block.

#### Review Target
Implementation, generated localized Markdown, tests, and static output for course subtitle deduplication.

#### Target Locations
- `scripts/generate-localized-course.mjs`
- `src/generated/course/zh-CN/chapters/01-why-agent-harness.md`
- `src/generated/course/en/chapters/01-why-agent-harness.md`
- `tests/course-language-split.test.mjs`
- `dist/course-01.html`
- `dist/en-course-01.html`
- `docs/course-01.html`
- `docs/en-course-01.html`

#### Change Introduction
The localization generator now skips the formal source subtitle quote block because `CourseLessonPage.astro` already renders the localized subtitle from lesson metadata as `.section-intro`. A regression test asserts all generated chapter pages retain a page intro and do not repeat the intro or subtitle label in `article.chapter-content`.

#### Risk Focus
- The generator might skip too much content after the subtitle quote block.
- The test might only cover the label and miss duplicate subtitle text.
- English pages might still leak Chinese labels or duplicate English subtitle text.
- Checked-in `docs` output might drift from rebuilt `dist`.

#### Assumptions To Attack
- Every formal chapter uses the same subtitle quote block shape.
- Skipping `> 中文：...` and `> English:...` immediately after the subtitle label is sufficient and does not affect later body content.
- Page intro subtitles are still present after removing the body block.
- Build output and committed docs are synchronized.

#### Adversarial Lenses
- requirements
- data
- maintenance
- testing
- observability

#### Verification Status
- RED observed: `node --test tests/course-language-split.test.mjs` failed on `course-01.html` duplicated `本章副标题`.
- GREEN observed: `node --test tests/course-language-split.test.mjs` passed, 5/5.
- Regression observed: `npm test` passed, 41/41.
- Browser smoke observed: `course-01.html` and `en-course-01.html` preserve `.section-intro`, do not repeat subtitle labels or intro text inside `article.chapter-content`, and have no horizontal overflow.

#### Reviewer Instructions
- Fresh internal subagent session.
- No inherited main-agent context.
- Read target files directly.
- Do not modify files.
- Cite evidence paths and line numbers when possible.

### Reviewer Timeout Policy

| Complexity | Initial Wait | Extension | Max Attempts Per Role | Blocking Closure Behavior |
|---|---:|---:|---:|---|
| normal | 10 minutes | 5 minutes if alive | 2 | cannot pass if review is unavailable |

### Reviewer Selection

| Reviewer | Reason Selected | Risk Area |
|---|---|---|
| localization-regression-adversary | The bug is in source-to-localized-content transformation and rendered output semantics. | data loss, duplicate content, test validity |

### Reviewer Launch Records

| Reviewer | Internal Mechanism | Session / Job ID | Trace Source | Context Forked | Input Packet | Context Explicitly Excluded | Read-only |
|---|---|---|---|---|---|---|---|
| localization-regression-adversary | multi_agent_v1.spawn_agent | 019e7f57-3bde-7b32-97f4-05a9609b49d2 | spawn_agent tool result, nickname Hooke | fork_context=false | Round 1 Review Input | main-agent history, reasoning, drafts, conclusions, full diff unless needed | yes |

### Reviewer Timeout Records

| Reviewer Output Key | Reviewer Role | Attempt | Session / Job ID | Waited | Status | Reason | Action |
|---|---|---:|---|---:|---|---|---|
| localization-regression-adversary-output | localization-regression-adversary | 1 | 019e7f57-3bde-7b32-97f4-05a9609b49d2 | 10 minutes max, completed before timeout | completed | reviewer returned final output | completed |

### Reviewer Outputs

#### localization-regression-adversary-output

##### Summary
The subtitle deduplication behavior looks correct in the checked target pages. The generator removes the formal source subtitle quote block, the generated chapter Markdown starts directly at the chapter body, and the rendered pages keep the subtitle only in `.section-intro`.

##### Blocking Findings
- none

##### Non-blocking Risks
- The review artifact was still open when reviewed.
  - Broken assumption: process artifacts are closed before release.
  - Failure scenario: an otherwise valid code change ships with an unfinished review record.
  - Trigger condition: release after validation but before report closure.
  - Impact: audit trail ambiguity.
  - Proof needed: report status and closure fields updated.
- The subtitle skip logic is format-dependent.
  - Broken assumption: future subtitle blocks will keep the current `> 中文：...` and `> English:...` one-line shape.
  - Failure scenario: a future wrapped subtitle blockquote line could remain in generated body content.
  - Trigger condition: source subtitle block adds unlabeled continuation lines.
  - Impact: duplicate or stray subtitle text could return.
  - Proof needed: fixture coverage if the formal course source format changes.

##### Required Fixes
- none for the current rendered subtitle behavior.

##### Missing Tests
- No blocking gap. The test checks both the source subtitle label and duplicated intro text.
- Future hardening could add a fixture for multiline or wrapped subtitle quote blocks if the formal course source format changes.

##### Missing Logs / Observability
- none required for this static content generation fix. Regression coverage plus build/docs sync checks are the useful observability here.

##### Evidence
- `course/chapters/01-why-agent-harness.md:12` - source chapter contains the formal subtitle block.
- `src/generated/course/zh-CN/chapters/01-why-agent-harness.md:3` - generated Chinese Markdown starts body content after the heading.
- `src/generated/course/en/chapters/01-why-agent-harness.md:3` - generated English Markdown starts body content after the heading.
- `src/components/LearningLayout.astro:55` - page intro renders layout metadata.
- `src/data/course.mjs:9` - chapter 01 subtitle metadata supplies the intro.
- `tests/course-language-split.test.mjs:97` - regression test checks duplicate labels and intro text.

### Main Agent Response

| Reviewer | Finding | Broken Assumption / Failure Scenario | Severity | Decision | Evidence / Reason | Action Taken | Follow-up |
|---|---|---|---|---|---|---|---|
| localization-regression-adversary | Review artifact still open | Report closure may lag behind validation | non-blocking | accept | Reviewer correctly observed the report still had unclosed closure fields. | Updated status, reviewer output, response table, closure status, and final conclusion. | none |
| localization-regression-adversary | Subtitle skip logic is format-dependent | A future wrapped subtitle block could leave continuation text in the body | non-blocking | defer | Current formal course chapters use the supported two localized lines after the subtitle label; no current rendered page fails. | Recorded as a maintenance risk. | Add fixture coverage before changing the formal subtitle block shape. |

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
- Deferred findings documented: yes
- Blocked reason: n/a
- Allowed to proceed: yes

## Final Conclusion

The subtitle deduplication change may proceed. No blocking findings were reported, and the single accepted process finding was closed in this report.
