# Industry Update Policy

- Date: 2026-06-02
- Scope: homepage industry feed in `src/data/home.mjs`

## Editorial Focus

The feed is for Harness Atlas, so every update must explain something concrete about agent harness design, implementation, or evaluation.

Prefer updates about:

- agent architecture, runtime loops, state, memory, tool execution, permissions, hooks, subagents, sandboxes, workflows, handoffs, guardrails, tracing, evals, or benchmarks
- product features that reveal a harness pattern
- engineering design notes, experiments, research results, SDK/framework releases, protocol changes, observability/eval tooling, or benchmark harnesses
- official docs, changelogs, engineering blogs, release notes, or source repos

Avoid updates that are only:

- media rankings, awards, analyst reports, market maps, or external evaluations of company position
- financing, valuation, hiring, executive, partnership, customer adoption, or sales motion news
- broad enterprise adoption claims without a concrete harness feature
- model leaderboard news without runtime, tool, eval, or agent-system implications
- speculative commentary, rumors, social posts, or secondary reporting

If a financing, partnership, or enterprise story includes a concrete new harness feature, cite and summarize only the feature. Do not frame the entry around capital, valuation, market leadership, or customer logos.

## Discovery Scope

Use a broad discovery pass before applying the must-pass gate. Discovery sources can include:

- official sources: docs, changelogs, release notes, engineering blogs, GitHub releases, SDK repos, protocol repos, benchmark repos, and product update pages
- social platforms: X/Twitter, LinkedIn, Reddit, Hacker News, Discord or forum announcements, maintainer posts, and conference or launch threads
- technology news and media: The Verge, TechCrunch, VentureBeat, InfoQ, The New Stack, The Decoder, ZDNET, Ars Technica, Wired, MIT Technology Review, Axios, CNBC, Bloomberg, and other credible tech or business news sources
- developer-community sources: GitHub Trending, GitHub issues and discussions, Product Hunt, Dev.to, Medium engineering posts, Substack newsletters, Latent Space, Ben's Bites, Simon Willison, Import AI, and other agent or developer tooling newsletters
- ecosystem scans: release-monitoring pages, package registries, benchmark leaderboards, conference schedules, launch-week roundups, and curated AI tooling lists
- recurring discovery leads: Papers with Code, Techmeme, Hacker News, GitHub Trending, MiraclePlus AI News, and similar high-signal aggregation pages

Use broad keywords during discovery, including:

- agent runtime, coding agent, software engineering agent, cloud agent, browser agent, GUI agent, tool use, tool calling, MCP, A2A, ACP, AG-UI
- memory, state, context, session, resume, checkpoint, sandbox, permission, policy, governance, guardrail, tracing, observability, eval, benchmark, workflow, subagent, orchestration, handoff, computer use
- product names from the priority watchlist plus terms such as release, changelog, launch, preview, GA, beta, API, SDK, CLI, docs, repo, benchmark, eval, protocol, and runtime

Treat social, media, newsletter, and community items as leads by default. They can expand the candidate pool, but the final feed entry should still cite a primary source unless the non-primary source is the only source that directly publishes a concrete mechanism with an exact date and enough evidence. When a non-primary source is used as a lead, record the primary source found through it or the reason no primary source exists.

## Must-Pass Gate

Before adding an entry, answer all four questions with yes:

- Can the entry name a specific harness mechanism, API, runtime behavior, protocol, evaluation method, permission boundary, state/memory behavior, workflow primitive, sandbox, tracing surface, or benchmark?
- Does the title frame that mechanism instead of company position, funding, partnership, customer adoption, analyst evaluation, or broad platform momentum?
- Does the description map the mechanism to one of runtime, tools, state, permissions, workflow, tracing, eval, benchmark, protocol, or engineering design?
- Is the source a primary source with enough detail to support the summary without speculation?

If any answer is no, skip the entry. Prefer leaving the feed unchanged over publishing weak or peripheral news.

## Priority Watchlist

### Coding And Software Engineering Agents

- OpenAI Codex / Codex CLI
- Claude Code
- OpenCode
- GitHub Copilot cloud agent
- Devin
- Cursor Agent / Plan Mode
- Windsurf Cascade / Agent Command Center
- OpenHands / OpenHands Software Agent SDK
- Cline
- Roo Code
- Aider
- Gemini CLI
- Qwen Code
- Amp Code
- Replit Agent

### General Agent Frameworks And SDKs

- OpenAI Agents SDK
- OpenAI Agent Builder
- LangGraph
- LangChain DeepAgents
- Google ADK
- Microsoft Agent Framework
- AutoGen
- Semantic Kernel Agent Framework
- CrewAI
- Agno
- Pydantic AI
- LlamaIndex AgentWorkflow
- Mastra
- smolagents
- Haystack Agents
- AWS Strands Agents
- DSPy

### Low-Code And Platform Agent Builders

- Dify
- Flowise
- n8n AI Agent
- Zapier Agents
- Vellum Agent Builder
- Botpress
- StackAI

### Browser, GUI Agents, And Tool Runtimes

- Browser Use
- Browserbase Stagehand
- Playwright MCP
- Skyvern
- OpenClaw

### Protocols, Observability, Evals, And Harness Ecosystem

- MCP
- ACP / Agent Client Protocol
- AG-UI
- A2A / Agent2Agent
- LangSmith
- Braintrust
- AgentOps
- Arize Phoenix
- Continue
- Harbor / Terminal-Bench

## Entry Rules

- Keep each entry based on a primary source.
- Accept an entry only when the primary source exposes an exact publish date that is strictly later than the current feed latest `dateTime`.
- In an explicit recent-week backfill run, exact-dated primary-source entries from the last seven calendar days counted from the run date may be accepted even when they are not later than the current feed latest `dateTime`, if they add a materially different harness mechanism and the review notes record the current latest feed date plus a per-entry backfill reason.
- Treat same-day items, generic `Updated:` timestamps, event dates, and undated overview pages as insufficient for a new feed entry unless the exact new section date is visible in the primary source.
- Official GitHub Releases pages, including clearly labeled pre-releases or nightlies, are eligible primary sources when they expose an exact publish date and a concrete harness mechanism. If a pre-release is skipped, record the reason in the review notes.
- Keep `zh-CN` and `en` records aligned by `date`, `dateTime`, `href`, `sourceName`, and order.
- Keep descriptions between 100 and 200 characters.
- Use conservative wording and avoid claims not directly supported by the source.
- Prefer 0 strong entries over weak filler.
- Keep a short decision note in review or operation notes when skipping borderline candidates.

## No-Change Runs

- If no candidate clears the gate, keep `src/data/home.mjs` unchanged.
- When feed data and checked-in `docs` output are unchanged, skip rebuild and doc-copy churn.
- Even on a no-change run, close the latest `vs_review` report and run release-gate tests because the review artifact itself is a tracked release input.
