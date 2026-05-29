# Industry Update Policy Review

- Date: 2026-05-30
- Target: homepage industry feed, editorial policy, automation prompt, and generated GitHub Pages output
- Status: closed

## Review Input

Objective: reduce peripheral industry updates such as media rankings, financing, enterprise partnerships, customer adoption, and market-position stories. Focus future updates on concrete Harness substance: architecture, features, design, ideas, experiments, evaluations, runtime, tools, state, permissions, workflows, tracing, benchmarks, and protocols.

Target locations:

- `src/data/home.mjs`
- `docs/operation-notes/industry-update-policy.md`
- `tests/industry-feed.test.mjs`
- `docs/index.html`
- `docs/en.html`
- `/Users/xuzhang/.codex/automations/harness-atlas/automation.toml`

Initial change summary:

- Removed financing, Gartner ranking, Dell partnership, and PwC partnership entries from Chinese and English feeds.
- Added `docs/operation-notes/industry-update-policy.md`.
- Updated the recurring automation prompt to use `subagent-vs-review` and follow the policy.

Verification before review:

- `npm run build && cp -R dist/. docs/ && npm test` passed with 24 tests.

## Round 1 Launch Records

### Reviewer A

- Role: content policy adversary
- Mechanism: `multi_agent_v1.spawn_agent`
- Agent id: `019e74c7-5136-7360-a170-a6da01d837e6`
- Nickname: `Ohm`
- Freshness: `fork_context:false`
- Read-only: yes
- Explicitly excluded context: full chat history, main-agent reasoning, prior conclusions

Input packet focus:

- Check whether the current feed still contains peripheral stories.
- Check whether the policy and automation prompt are strict enough.
- Check zh/en alignment, source identity, and validation sufficiency.

### Reviewer B

- Role: release hygiene and test adversary
- Mechanism: `multi_agent_v1.spawn_agent`
- Agent id: `019e74c7-8992-7752-a136-2f0ad6e45a24`
- Nickname: `Euler`
- Freshness: `fork_context:false`
- Read-only: yes
- Explicitly excluded context: full chat history, main-agent reasoning, prior conclusions

Input packet focus:

- Check generated docs for stale removed content.
- Check tests for policy regression coverage.
- Check automation prompt, line limits, dirty state, and release hygiene.

## Round 1 Reviewer Outputs

### Reviewer A Output

Summary: the four explicitly removed categories were gone from source and built docs. zh/en feed counts were aligned at 15/15, and `npm test` passed.

Blocking findings:

1. Current feed still contained broad platform/product-positioning entries:
   - `src/data/home.mjs`: Google I/O recap was a keynote/platform recap rather than a concrete harness feature.
   - `src/data/home.mjs`: Gemini App proactive assistant entry was product-direction framing without concrete runtime/tool/state mechanics.
   - `src/data/home.mjs`: Stainless entry had real MCP/SDK substance but the title centered the acquisition.

2. Automation prompt was too permissive:
   - It still included `enterprise deployment` in search scope.
   - It used soft wording such as `减少并通常跳过`.
   - The policy did not define a must-pass checklist.

Non-blocking risks:

- `Cowork` in the containment entry was acceptable because it referred to sandboxing, devcontainers, permissions, and risk tiers.
- The finance agent templates entry was borderline and should only remain if rewritten around template mechanics.

Missing tests:

- No focused policy regression test for excluded categories or required harness mechanism.

Missing logs/observability:

- No runtime logs needed for static content.
- Add a lightweight decision note for accepted/skipped borderline candidates.

### Reviewer B Output

Summary: removed financing/Gartner/Dell/PwC items were not present in generated docs, and source-to-doc title/link parity checked clean.

Blocking findings:

1. Dirty release state meant the policy change was not releasable until all changed files were staged and committed.

2. Tests did not enforce the new content-policy exclusion categories:
   - `tests/industry-feed.test.mjs` only checked zh/en identity fields.
   - `tests/site-structure.test.mjs` checked feed shape and length, not banned themes.

Non-blocking risks:

- Automation wording was softer than the policy and should become mandatory skip wording.
- `tests/site-structure.test.mjs` was exactly 500 lines, so future additions should go elsewhere.
- Stainless and finance-template entries were near policy boundaries.

Missing tests:

- No denylist/regression test for removed categories or removed titles.
- No exact rendered-doc field parity test for every feed row.
- No tracked-file line-limit test.

Missing logs/observability:

- This policy change needed its own `/vs_review/` report.

## Main Agent Responses

1. Broad Google I/O and Gemini App entries.
   - Response: accept.
   - Action: removed both entries from `zh-CN` and `en` feeds.

2. Stainless entry framed as acquisition.
   - Response: accept.
   - Action: rewrote title and description to frame SDK/CLI/MCP connection tooling rather than the acquisition event.

3. Finance agent templates entry was borderline.
   - Response: accept.
   - Action: removed the finance-template entry from `zh-CN` and `en` feeds.

4. Automation prompt too permissive.
   - Response: accept.
   - Action: updated the automation prompt to remove `enterprise deployment`, add a hard must-pass gate, require skipping peripheral categories unless only the concrete harness feature is summarized, and require decision notes for borderline candidates.

5. Missing policy regression tests.
   - Response: accept.
   - Action: added `industry feed entries pass harness editorial policy gates` in `tests/industry-feed.test.mjs`.

6. Dirty release state.
   - Response: accept.
   - Action: will stage, commit, and push the full repo change set after validation and re-review.

7. No review report for this change.
   - Response: accept.
   - Action: created this report.

8. Exact rendered-doc field parity and tracked-file line-limit tests.
   - Response: defer.
   - Reason: useful but not required for this content-policy change after build/test plus explicit line-limit scan. Future additions should go into separate test files because `tests/site-structure.test.mjs` is at its line budget.

## Fix Verification

- Removed feed entries:
  - Anthropic Series H financing
  - OpenAI Gartner ranking
  - OpenAI/Dell partnership
  - PwC/Anthropic partnership
  - Google I/O platform recap
  - Gemini App proactive assistant
  - Anthropic finance agent templates
- Current feed count: `zh-CN` 12, `en` 12.
- `npm run build && cp -R dist/. docs/ && npm test` passed with 25 tests.
- Keyword scan finds removed peripheral terms only inside the new denylist test.
- Line-limit scan over `src`, `tests`, `docs`, and `vs_review` found no file over 500 lines.

## Candidate Decision Notes

| Candidate | Source | Decision | Gate reason |
| --- | --- | --- | --- |
| Anthropic Series H financing | `https://www.anthropic.com/news/series-h` | skip/remove | Financing, valuation, capital, and product expansion framing; no concrete harness mechanism required by the gate. |
| OpenAI Gartner ranking | `https://openai.com/index/gartner-2026-agentic-coding-leader/` | skip/remove | Analyst ranking and enterprise-positioning story; title and summary center market leadership rather than runtime/tool/eval design. |
| OpenAI/Dell Codex partnership | `https://openai.com/index/dell-codex-enterprise-partnership/` | skip/remove | Enterprise partnership and deployment framing; useful governance implications were too indirect for the feed. |
| PwC/Anthropic expanded partnership | `https://www.anthropic.com/news/pwc-expanded-partnership` | skip/remove | Enterprise-services partnership and customer workflow framing; no specific new harness primitive. |
| Google I/O Gemini platform recap | `https://blog.google/innovation-and-ai/technology/ai/io-2026-keynote-moment-videos/` | skip/remove | Broad keynote/platform momentum; did not name a concrete harness mechanism. |
| Gemini App proactive assistant | `https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/` | skip/remove | Product-direction narrative around proactive assistance; insufficient runtime/tool/state/permission mechanics. |
| Anthropic finance agent templates | `https://www.anthropic.com/news/finance-agents` | skip/remove | Borderline vertical template story; removed because industry packaging was more central than a specific harness primitive. |
| Stainless connection tooling | `https://www.anthropic.com/news/anthropic-acquires-stainless` | accept/rewrite | Kept only after reframing around SDK, CLI, MCP server generation, API/protocol/tool entry points, and connection-layer reliability. |

## Round 2 Launch Records

### Reviewer C

- Role: post-fix policy and release adversary
- Mechanism: `multi_agent_v1.spawn_agent`
- Agent id: `019e74cc-5423-77f1-b65a-0c76f2e07494`
- Nickname: `Plato`
- Freshness: `fork_context:false`
- Read-only: yes
- Explicitly excluded context: full chat history, main-agent reasoning, and previous reviewer conclusions except neutral packet

Input packet focus:

- Verify remaining feed items against tightened focus.
- Verify policy/test/automation consistency.
- Verify generated docs are fresh, zh/en are aligned, and validation is sufficient.

## Round 2 Reviewer Output

Summary: direct read-only re-review found no remaining current feed item that clearly violates the tightened harness-substance focus. zh/en counts were 12/12, order was descending, generated docs contained the current titles/hrefs, and `npm test` passed with 25/25 tests.

Blocking findings:

1. Review report was not closed.
   - Response: accept.
   - Action: this report was updated with round 2 output, candidate decision notes, and closure.

2. Repo hygiene was not satisfied yet.
   - Response: accept.
   - Action: stage, commit, and push all repo changes after final validation.

Non-blocking risks:

1. Policy test was useful but lexical and could be gamed.
   - Response: accept.
   - Action: tightened `tests/industry-feed.test.mjs` to scan title, tag, and description; added exact removed-source regressions; and added word boundaries to English harness-signal and forbidden-framing patterns.

2. No exact rendered-doc parity test and no automated line-limit test.
   - Response: defer.
   - Reason: current task is covered by source tests, generated build, explicit docs scan, and explicit line-limit scan. Future test expansion should avoid adding to `tests/site-structure.test.mjs` because it is already at its line budget.

Missing logs/observability:

- Decision notes were too thin.
  - Response: accept.
  - Action: added the candidate decision table above.

## Closure

Closed after accepted findings were fixed. Final validation must pass before commit and push.
