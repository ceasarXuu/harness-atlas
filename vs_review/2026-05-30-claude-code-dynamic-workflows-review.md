# Subagent VS Review: Claude Code Dynamic Workflows Update

- Created: 2026-05-30T01:00:07+0800
- Updated: 2026-05-30T01:00:07+0800
- Report schema: adversarial-v1
- Task: Add one industry update about Claude Code Dynamic Workflows.
- Report path: `vs_review/2026-05-30-claude-code-dynamic-workflows-review.md`
- Review mode: fresh internal subagents
- Source session policy: no inherited main-agent context
- Status: open

## Round 1: industry update fact and structure review

### Review Input

#### Objective
Add one recent industry update about Claude Code Dynamic Workflows to the homepage feed.

#### Review Target
Content/data change, generated static pages, and validation path.

#### Target Locations
- `src/data/home.mjs`
- `docs/index.html`
- `docs/en.html`
- `tests/site-structure.test.mjs`
- `npm run build && cp -R dist/. docs/ && npm test`
- Official source: `https://claude.com/blog/introducing-dynamic-workflows-in-claude-code`

#### Change Introduction
The update inserts one new 2026.05.28 record at the top of both the Chinese and English industry feeds. The record links to the official Claude blog post and summarizes Dynamic Workflows as Claude Code dynamically writing orchestration scripts and running many parallel subagents in one session.

#### Risk Focus
- The content may overstate the official source or introduce unsupported claims.
- Chinese and English records may diverge in date, source, link, ordering, or meaning.
- The summary may violate the 100-200 character feed rule.
- The change may push `src/data/home.mjs` over the 500-line repository limit.
- Generated `docs/` pages may not reflect the source data.

#### Assumptions To Attack
- The official source date is May 28, 2026.
- Dynamic Workflows are relevant to Agent Harness and industry dynamics.
- "数十到数百个 subagents" and "many parallel subagents" are supported by the source.
- The new record is conservative and avoids hype, legal/financial advice, and unsupported evaluation.
- Existing tests are sufficient to catch structure regressions.

#### Adversarial Lenses
- product-logic
- data consistency
- safety and source fidelity
- test validity
- maintenance constraints

#### Verification Status
- `npm run build && cp -R dist/. docs/ && npm test` passed with 23 tests.
- `src/data/home.mjs` is 490 lines after the change.
- Source was opened and checked for date, availability, feature behavior, availability caveats, and token-usage warning.

#### Reviewer Instructions
- Fresh internal subagent session.
- No inherited main-agent context.
- Read target files directly.
- Do not modify files.
- Cite evidence paths and line numbers when possible.
- Focus on must-fix issues first; include non-blocking risks only if materially useful.

### Reviewer Selection

| Reviewer | Reason Selected | Risk Area |
|---|---|---|
| content-safety-adversary | This is a public industry/news entry where source fidelity and safe wording matter. | factuality, source reliability, overstatement |
| test-validity-adversary | The change relies on tests to enforce feed structure, lengths, and localization parity. | validation, regression coverage |

### Reviewer Launch Records

| Reviewer | Internal Mechanism | Session / Job ID | Trace Source | Context Forked | Input Packet | Context Explicitly Excluded | Read-only |
|---|---|---|---|---|---|---|---|
| content-safety-adversary | `multi_agent_v1.spawn_agent` | `019e74ae-a41f-7830-93eb-0345ca70e116` (`Planck`) | spawn_agent tool result | no | Round 1 Review Input | main-agent history, reasoning, drafts, conclusions | yes |
| test-validity-adversary | `multi_agent_v1.spawn_agent` | `019e74ae-e0cf-7521-ae9b-d0934fccf29d` (`Euclid`) | spawn_agent tool result | no | Round 1 Review Input | main-agent history, reasoning, drafts, conclusions | yes |

### Reviewer Outputs

#### content-safety-adversary

##### Summary
No blocking content-safety findings. The new Chinese and English feed records match on date, source, link, ordering, and core meaning. The official Claude source confirms the May 28, 2026 date and supports the claims about dynamically written orchestration scripts, tens-to-hundreds parallel subagents in one session, and checking work before delivery.

##### Blocking Findings
- none

##### Non-blocking Risks
- The English description was 199 characters at review time, close to the 200-character limit.
  - Broken assumption: future small edits would remain under the feed contract.
  - Failure scenario: a small copy edit trips the length test.
  - Trigger condition: editing the English summary without checking length.
  - Impact: failed validation.
  - Proof needed: keep test coverage and shorten the copy margin.
- The Chinese copy says "平台级运行时"; this is a reasonable Harness interpretation, but not directly stated in the source.
  - Broken assumption: all wording is directly stated in the source.
  - Failure scenario: editorial framing could be mistaken for an official product claim.
  - Trigger condition: readers interpret "平台级运行时" as official positioning.
  - Impact: minor source-fidelity risk.
  - Proof needed: conservative wording and source link.

##### Required Fixes
- none required before merge

##### Missing Tests
- Existing test covers title/tag/description length and rendered row count at `tests/site-structure.test.mjs:268-304`.
- Missing: bilingual parity assertion for feed record identity fields, especially `date`, `dateTime`, `href`, `sourceName`, and top ordering.
- Missing: targeted assertion that the top feed item appears in both generated docs pages with the official Claude URL.

##### Missing Logs / Observability
- No runtime observability required for a static content feed change.

##### Evidence
- `src/data/home.mjs:56-58` - Chinese source record.
- `src/data/home.mjs:300-302` - English source record at review time.
- `docs/index.html` and `docs/en.html` - generated feed rows.
- `tests/site-structure.test.mjs:268-304` - feed validation.

#### test-validity-adversary

##### Summary
The current target was not valid at review time. The Chinese record was within limits, source/docs were aligned, and the official Claude blog supports the date/topic. The English description was 202 characters, so `npm test` failed; the claimed command could not pass at that point.

##### Blocking Findings
- English feed summary violates the 100-200 character rule.
  - Broken assumption: the inserted English summary stayed within the existing feed contract.
  - Failure scenario: CI or release validation runs `npm test` and blocks.
  - Trigger condition: English description in `src/data/home.mjs` was 202 characters; rendered copy was also in `docs/en.html`.
  - Impact: homepage feed contract broken; claimed validation command false.
  - Proof needed: shorten English description to <=200, regenerate docs, rerun `npm run build && cp -R dist/. docs/ && npm test`.

##### Non-blocking Risks
- Tests check source description length and rendered row counts, but do not assert exact source-to-doc parity for each rendered field.
- Locale parity is shallow: tests do not pair zh/en records by date, href, sourceName, or ordering.
- `tests/site-structure.test.mjs` was exactly 500 lines before adding more assertions; adding required tests there would exceed the repo line-limit policy unless split first.
- New feed objects use compact inline formatting, which hides growth pressure and makes future edits easier to miss.

##### Required Fixes
- Shorten the English Dynamic Workflows description by at least 2 characters.
- Regenerate `docs/en.html`.
- Rerun the full claimed command.
- Split or move homepage-feed tests before adding more assertions.

##### Missing Tests
- Exact source-to-rendered-doc comparison for `date`, `dateTime`, `title`, `tag`, `description`, `href`, `sourceName`, and order.
- zh/en paired-feed invariant: same record count, same ordered href/date/sourceName pairs.
- File-length guard for source/test files under the 500-line policy.

##### Missing Logs / Observability
- No runtime logging is needed for this static content update. The missing observability is validation-level: tests should prove generated docs match source data exactly.

##### Evidence
- `src/data/home.mjs:301` - English description exceeded the limit at review time.
- `docs/en.html:2` - rendered copy reflected the too-long summary at review time.
- `tests/site-structure.test.mjs:281` - failing length assertion.

### Main Agent Response

| Reviewer | Finding | Broken Assumption / Failure Scenario | Severity | Decision | Evidence / Reason | Action Taken | Follow-up |
|---|---|---|---|---|---|---|---|
| content-safety-adversary | English summary close to 200 chars | Future small edits could exceed feed contract | non-blocking | accept | The test-validity reviewer later caught a concrete failure after an edit | Shortened English summary and reran validation | Round 2 closure review |
| content-safety-adversary | "平台级运行时" is editorial framing | Reader could mistake editorial framing for official product claim | non-blocking | reject | The sentence says "推向", not "官方称"; it is a Harness-site interpretation grounded in the feature behavior and original source link | No copy change | none |
| content-safety-adversary | Missing bilingual feed identity test | Locale records could diverge while counts still pass | non-blocking | accept | Existing tests did not pair `date`, `dateTime`, `href`, and `sourceName` | Added `tests/industry-feed.test.mjs` | Round 2 closure review |
| test-validity-adversary | English feed summary violates 100-200 character rule | `npm test` fails and claimed validation is false | blocking | accept | The reviewer found 202 chars; local test reproduced the failure before fix | Shortened English summary, regenerated docs, reran full validation | Round 2 closure review |
| test-validity-adversary | Adding assertions to 500-line `site-structure` would violate file limit | Test file exceeds repo line policy | non-blocking | accept | Local `wc -l` showed `tests/site-structure.test.mjs` reached 508 after initial added assertions | Removed added block from that file and created `tests/industry-feed.test.mjs` | Round 2 closure review |

### Closure Status

- Blocking findings found: yes
- Accepted blocking findings fixed: yes
- Blocking re-review completed: pending
- Blocking re-review passed: pending
- Blocking re-review round links:
  - Round 2
- Blocking re-review launch records:
  - See Round 2 launch records.
- Rejected findings backed by evidence: yes
- Deferred findings documented: n/a
- Allowed to proceed: pending

## Round 2: blocking fix closure review

### Review Input

#### Objective
Verify closure for accepted blocking and validation findings from Round 1.

#### Review Target
Updated feed data, generated pages, and tests after fixing the English summary length and moving feed parity tests into a separate file.

#### Target Locations
- `src/data/home.mjs`
- `tests/industry-feed.test.mjs`
- `tests/site-structure.test.mjs`
- `docs/index.html`
- `docs/en.html`

#### Change Introduction
The English Dynamic Workflows summary was shortened, generated docs were rebuilt, and the bilingual feed identity test was moved into a new test file to avoid exceeding the 500-line limit in `tests/site-structure.test.mjs`.

#### Risk Focus
- The blocking length failure may remain unfixed.
- The generated docs may still be stale.
- The test split may introduce weak or redundant coverage.
- A file may still exceed 500 lines.

#### Assumptions To Attack
- `npm run build && cp -R dist/. docs/ && npm test` now passes.
- No source/test/docs file exceeds 500 lines.
- The new `tests/industry-feed.test.mjs` meaningfully protects bilingual identity fields.
- Generated docs contain the Claude blog record from source data.

#### Adversarial Lenses
- test validity
- data consistency
- maintenance constraints

#### Verification Status
- `npm run build && cp -R dist/. docs/ && npm test` passed with 24 tests after the fix.

#### Reviewer Instructions
- Fresh internal subagent session.
- No inherited main-agent context.
- Read target files directly.
- Do not modify files.
- Cite evidence paths and line numbers when possible.

### Reviewer Selection

| Reviewer | Reason Selected | Risk Area |
|---|---|---|
| closure-review-adversary | Accepted blocking finding requires fresh re-review after fix. | blocking closure, validation truth |

### Reviewer Launch Records

| Reviewer | Internal Mechanism | Session / Job ID | Trace Source | Context Forked | Input Packet | Context Explicitly Excluded | Read-only |
|---|---|---|---|---|---|---|---|
| closure-review-adversary | `multi_agent_v1.spawn_agent` | `019e74b4-5b85-7a81-b0cf-90ceb995e5bd` (`Gauss`) | spawn_agent tool result | no | Round 2 Review Input | main-agent history, reasoning, drafts, conclusions | yes |

### Reviewer Outputs

#### closure-review-adversary

##### Summary
Closure is accepted. The original blocking issue is fixed: the English Dynamic Workflows description is 197 characters, within the 100-200 rule, and `npm test` passes with 24/24 tests.

##### Blocking Findings
- none

##### Non-blocking Risks
- `tests/site-structure.test.mjs` is exactly 500 lines, so it complies but has no room for future additions without violating policy.
  - Broken assumption: future feed assertions can continue to be added there.
  - Failure scenario: a future edit exceeds the repo file-length policy.
  - Trigger condition: adding more tests to that file.
  - Impact: process/policy violation.
  - Proof needed: keep new feed tests in separate focused files.
- `tests/industry-feed.test.mjs` was untracked at review time.
  - Broken assumption: the new test would be part of the committed artifact automatically.
  - Failure scenario: commit omits the test while claiming parity coverage.
  - Trigger condition: staging only generated docs/data.
  - Impact: review evidence not preserved.
  - Proof needed: include the file in `git add`.

##### Required Fixes
- none for the reported blocker

##### Missing Tests
- Optional: no automated assertion that built docs exactly match every source feed record. The Claude item was manually verified.

##### Missing Logs / Observability
- none required for this static content update

##### Evidence
- `src/data/home.mjs:300` - English source description length 197.
- `src/data/home.mjs:56` - Chinese source description length 122.
- `tests/site-structure.test.mjs:281` - description length rule.
- `tests/industry-feed.test.mjs:5` - localized feed identity test.
- `docs/index.html:2` and `docs/en.html:2` - generated Claude item.
- `npm test` - 24 tests passed.

### Main Agent Response

| Reviewer | Finding | Broken Assumption / Failure Scenario | Severity | Decision | Evidence / Reason | Action Taken | Follow-up |
|---|---|---|---|---|---|---|---|
| closure-review-adversary | Original English summary length blocker fixed | CI failed before fix; now summary is within 100-200 chars | blocking closure | accept | `npm test` passed with 24 tests after shortening and regenerating docs | Kept shortened English description | none |
| closure-review-adversary | `site-structure.test.mjs` has no line budget left | Future additions there would exceed file-length policy | non-blocking | accept | Reviewer and local line counts show 500 lines | Kept feed parity test in `tests/industry-feed.test.mjs` | none |
| closure-review-adversary | New test file untracked at review time | Commit might omit the test | non-blocking | accept | `git status --short` showed `?? tests/industry-feed.test.mjs` before staging | Will stage `tests/industry-feed.test.mjs` with this change | none |

### Closure Status

- Blocking findings found: no
- Accepted blocking findings fixed: yes
- Blocking re-review completed: yes
- Blocking re-review passed: yes
- Blocking re-review round links:
  - Round 2
- Blocking re-review launch records:
  - `019e74b4-5b85-7a81-b0cf-90ceb995e5bd`
- Rejected findings backed by evidence: n/a
- Deferred findings documented: n/a
- Allowed to proceed: yes

## Final Conclusion

The update may proceed. One blocking test failure was accepted, fixed, regenerated, and re-reviewed by a fresh internal subagent. Validation now passes and the review trail is recorded.
