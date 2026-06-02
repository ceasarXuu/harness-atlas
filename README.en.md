# Harness Atlas

<p align="center">
  <strong>A public knowledge atlas and systematic framework for understanding Agent Harness.</strong>
</p>

<p align="center">
  <a href="https://ceasarxuu.github.io/harness-atlas/en.html">Project Site</a> ·
  <a href="README.md">中文说明</a> ·
  <a href="https://github.com/ceasarXuu/harness-atlas">GitHub Repository</a>
</p>

---

## Overview

**Harness Atlas** is a public knowledge project and framework-style guide for understanding **Agent Harness**: the engineering runtime that enables AI agents to use context, call tools, manage state, execute tasks, validate results, and participate in real software engineering workflows.

The project does not focus on a single product or vendor. Instead, it studies the general engineering pattern behind AI agents: how context, tools, memory, state, planning, evaluation, human oversight, and governance are combined into a practical, controllable, and measurable agent system.

In current AI Coding tools, Agent Harness already appears in concrete forms: repository context management, terminal and file-system access, tool invocation, test execution, code review loops, memory, permission checks, and human confirmation. Harness Atlas starts from these concrete scenarios and expands toward broader software engineering systems.

---

## What is Agent Harness?

**Agent Harness** is the engineering runtime and control system around an AI model. It defines how an agent receives context, calls tools, manages state, follows constraints, executes work, validates results, and collaborates with humans.

A simplified definition:

> Agent Harness is a structured engineering environment that organizes model intelligence into controlled, reusable, and verifiable task execution.

A typical Agent Harness includes:

| Component | Role |
|---|---|
| Context Management | Selects, compresses, injects, and refreshes task-relevant information |
| Tool Orchestration | Invokes tools, handles failures, controls permissions, and recovers from errors |
| State Management | Tracks task state, file state, execution state, session state, and project state |
| Planning and Execution Loop | Decomposes goals, performs actions, observes results, and revises plans |
| Memory and Knowledge Integration | Connects project knowledge, historical decisions, team conventions, and external references |
| Evaluation and Feedback | Validates outputs through tests, benchmarks, reviews, metrics, and human feedback |
| Human-in-the-loop | Enables approval, intervention, supervision, and collaborative decision-making |
| Governance | Manages security boundaries, auditability, cost, compliance, and operational risk |

---

## Why Harness Matters

Large language models provide powerful reasoning and generation capabilities, but model capability alone is not enough for real software engineering.

Practical engineering work requires:

- stable access to project context
- reliable tool execution
- long-running task state management
- traceable decision records
- reusable workflows and working patterns
- testing and validation
- permission and risk control
- collaboration between humans and agents
- integration with existing engineering toolchains and team conventions

Harness is the layer that **converts model capability into engineering capability**.

| Without Harness | With Harness |
|---|---|
| One-off prompting | Reusable workflows |
| Unstructured context | Managed context windows and knowledge sources |
| Manual tool use | Controlled tool orchestration |
| Unclear task state | Explicit planning and execution state |
| Hard-to-verify output | Tests, reviews, metrics, and feedback loops |
| Individual productivity trick | Team-level or enterprise-level engineering system |

---

## Core Ideas

### 1. Harness embodies software engineering thinking in the age of AI agents

Models provide intelligence. Harness defines how that intelligence is organized, constrained, evaluated, and delivered. Activities such as requirement analysis, design, development, testing, release, operations, and governance can all be structured, proceduralized, and tooled inside a Harness.

### 2. Current Agent Harness products are led by Coding Agents

Codex, Claude Code, OpenCode, and similar AI Coding environments represent an important slice of the software engineering lifecycle: the developer workflow. They show how agents can read code, edit files, run commands, execute tests, process feedback, and complete development tasks under human supervision.

### 3. Future Harness systems will cover a broader engineering lifecycle

Agent Harness will extend from code generation to requirement analysis, architecture design, task planning, testing, review, delivery, operations, monitoring, and feedback loops. A full Harness is not just a tool that writes code; it is an intelligent execution layer for engineering systems.

### 4. Harness will become diverse, personalized, and organization-specific

Individuals, teams, and companies will build different Harness systems around their own workflows, toolchains, knowledge bases, permission strategies, and delivery standards. The future Harness ecosystem may look like a combination of software engineering methods, development tools, automation platforms, and organizational workflows.

---

## Scope

Harness Atlas covers the following topics:

| Topic | Description |
|---|---|
| Agent Harness Basics | Definitions, boundaries, core concepts, and terminology |
| AI Coding Harness | How current AI Coding tools manage context, tools, execution, and feedback |
| Harness Architecture | Core components such as context, tools, state, memory, workflow, policy, and evaluation |
| Software Engineering Lifecycle | How Harness supports requirement, design, development, testing, delivery, operations, and governance |
| Evaluation and Benchmarking | How to measure whether a Harness improves productivity, quality, and reliability |
| Personal Harness | How individual developers can build practical AI-assisted workflows |
| Enterprise Harness | How Harness integrates with team workflows, permissions, audit trails, knowledge bases, and engineering platforms |
| Future Directions | Possible evolution of Agent Harness products, platforms, ecosystems, and standards |

---

## Framework Map

| Module | Topic | Main Question |
|---|---|---|
| 00 | Introduction | Why does Agent Harness matter? What problem does it solve? |
| 01 | Harness Definition | What is Harness? What is not Harness? Where are the boundaries? |
| 02 | Coding Agent Harness | How do current AI Coding tools implement Harness capabilities? |
| 03 | Harness Architecture | What components make up a practical Harness system? |
| 04 | Engineering Harness | How can Harness expand from coding tools to full software engineering systems? |
| 05 | Evaluation and Benchmarking | How can Harness quality and effectiveness be measured? |
| 06 | Personal Harness | How can individual developers build their own AI-assisted workflows? |
| 07 | Enterprise Harness | How can teams and companies adopt Harness safely and effectively? |
| 08 | Future Directions | How might the Agent Harness ecosystem evolve? |

---

## Target Readers

Harness Atlas is designed for:

- developers using AI Coding tools
- independent developers building AI-native workflows
- product managers designing agent products
- engineering managers introducing AI agents into development workflows
- researchers and practitioners interested in AI software engineering
- anyone trying to understand the infrastructure behind agentic workflows

---

## Relationship to Related Concepts

| Concept | Relationship to Harness |
|---|---|
| Large Language Model | Provides reasoning and generation capability, but does not define the full execution environment |
| Agent | The model-driven actor that performs tasks through reasoning, tools, and feedback |
| Harness | The runtime, control, orchestration, and governance layer around the agent |
| Workflow | A reusable process that can be executed by humans, agents, or both |
| Tool | A capability exposed to the agent, such as shell, file editing, search, browser, database, or API calls |
| MCP / Tool Protocols | Possible interfaces for exposing tools and resources to agents |
| IDE / Terminal / Platform | Possible surfaces where Harness capabilities are exposed to users |

---

## Content Formats

The project may include:

- concept explainers
- framework notes
- architecture diagrams
- Mermaid diagrams
- case studies
- comparison tables
- engineering checklists
- prompt, skill, and workflow examples
- Agent Harness design templates
- evaluation frameworks and benchmark notes

---

## Repository Structure

```text
harness-atlas/
├── README.md
├── README.en.md
├── docs/
│   ├── index.html
│   ├── en.html
│   ├── glossary.md
│   ├── concept-map.md
│   └── framework-outline.md
├── lessons/
│   ├── 00-introduction/
│   ├── 01-what-is-harness/
│   ├── 02-coding-agent-harness/
│   ├── 03-harness-architecture/
│   ├── 04-engineering-harness/
│   ├── 05-evaluation-and-benchmark/
│   ├── 06-personal-harness/
│   ├── 07-enterprise-harness/
│   └── 08-future-directions/
├── diagrams/
├── examples/
├── references/
├── LICENSE
└── LICENSE-CODE
```

---

## License

Harness Atlas uses a dual-license model:

- Text content, articles, diagrams, framework notes, and visual materials: **Creative Commons Attribution 4.0 International (CC BY 4.0)**
- Code examples, scripts, configuration files, prompt templates, and engineering materials: **MIT License**

This allows educational content to be freely shared and adapted with attribution, while allowing engineering materials to be reused with minimal restrictions.

---

## Maintainer

Maintained by [ceasarXuu](https://github.com/ceasarXuu).
