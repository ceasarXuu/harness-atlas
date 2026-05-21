# Harness Atlas

<p align="center">
  <strong>A bilingual knowledge atlas for understanding Agent Harness, AI Coding, and software engineering in the age of AI agents.</strong>
</p>

<p align="center">
  <a href="https://github.com/ceasarXuu/harness-atlas">Repository</a> ·
  <a href="https://ceasarxuu.github.io/harness-atlas/">GitHub Pages</a> ·
  <a href="#english">English</a> ·
  <a href="#中文">中文</a>
</p>

---

<a id="english"></a>

## English

### Overview

**Harness Atlas** is a public knowledge project and course-style guide for understanding **Agent Harness**: the engineering layer that turns large language models into reliable, tool-using, workflow-aware agents.

The project focuses on the system design behind AI agents rather than on a single product or vendor. It explains how context, tools, memory, state, planning, evaluation, human oversight, and governance are combined into a practical runtime environment for AI-assisted software engineering.

In modern AI Coding tools, Harness already appears in recognizable forms: repository context management, terminal and file-system access, tool invocation, test execution, code review loops, memory, permission checks, and human-in-the-loop workflows. Harness Atlas uses these concrete examples as an entry point and then extends the discussion toward broader software engineering systems.

---

### What is Agent Harness?

An **Agent Harness** is the engineering runtime and control system around an AI model. It defines how an agent receives context, calls tools, manages state, follows constraints, executes work, validates results, and collaborates with humans.

A simplified definition:

> Agent Harness is the structured engineering environment that organizes model intelligence into controlled, repeatable, and verifiable task execution.

It usually includes:

- **Context Management**: selecting, compressing, injecting, and refreshing relevant information
- **Tool Orchestration**: invoking tools, handling failures, controlling permissions, and recovering from errors
- **State Management**: tracking task state, file state, execution state, session state, and project state
- **Planning and Execution Loop**: decomposing goals, acting, observing results, and revising the plan
- **Memory and Knowledge Integration**: connecting project knowledge, historical decisions, team conventions, and external references
- **Evaluation and Feedback**: validating outputs through tests, benchmarks, reviews, metrics, and human feedback
- **Human-in-the-loop**: enabling approval, intervention, supervision, and collaborative decision-making
- **Governance**: managing security boundaries, auditability, cost, compliance, and operational risk

---

### Why Harness Matters

Large language models provide powerful reasoning and generation capabilities, but model capability alone is not enough for real software engineering.

Practical engineering work requires:

- stable access to project context
- reliable tool execution
- long-running task state
- traceable decisions
- reproducible workflows
- testing and validation
- permission and risk control
- collaboration between humans and agents
- integration with existing engineering systems

Harness is the layer that converts model capability into engineering capability.

| Without Harness | With Harness |
|---|---|
| One-off prompting | Repeatable workflows |
| Unstructured context | Managed context window and knowledge sources |
| Manual tool use | Controlled tool orchestration |
| Unclear task state | Explicit planning and execution state |
| Hard-to-verify output | Tests, reviews, metrics, and feedback loops |
| Individual productivity trick | Team-level or organization-level engineering system |

---

### Core Perspective

Harness Atlas is built around four core ideas:

1. **Harness is the embodiment of software engineering thinking in the age of AI agents.**  
   Models provide intelligence; Harness defines how that intelligence is organized, constrained, evaluated, and delivered.

2. **Current Agent Harness products are led by Coding Agents.**  
   Tools such as Codex, Claude Code, OpenCode, and similar AI Coding environments represent an early but important slice of the software engineering lifecycle: the developer workflow.

3. **Future Harness systems will cover a broader engineering lifecycle.**  
   Agent Harness will extend from code generation to requirement analysis, architecture design, task planning, testing, review, delivery, operations, monitoring, and feedback loops.

4. **Harness will become diverse, personalized, and organization-specific.**  
   Individuals, teams, and companies will build different Harness systems around their own workflows, toolchains, knowledge bases, policies, and delivery standards.

---

### Scope

Harness Atlas covers the following areas:

| Area | Description |
|---|---|
| Agent Harness Basics | Definitions, boundaries, concepts, and terminology |
| AI Coding Harness | How current AI Coding tools manage context, tools, execution, and feedback |
| Harness Architecture | Core components such as context, tools, state, memory, workflow, policy, and evaluation |
| Software Engineering Lifecycle | How Harness can support requirement, design, development, testing, delivery, operations, and governance |
| Evaluation and Benchmarking | How to measure whether a Harness improves productivity, quality, and reliability |
| Personal Harness | Practical Harness design for individual developers and independent builders |
| Enterprise Harness | Harness integration with team workflows, permissions, audit trails, knowledge bases, and engineering platforms |
| Future Directions | The possible evolution of Agent Harness products, platforms, ecosystems, and standards |

---

### Course Map

| Module | Topic | Main Questions |
|---|---|---|
| 00 | Introduction | Why does Agent Harness matter? What problem does it solve? |
| 01 | What is Harness | What is a Harness? What is not a Harness? Where are the boundaries? |
| 02 | Coding Agent Harness | How do AI Coding tools implement Harness-like capabilities today? |
| 03 | Harness Architecture | What are the core components of a practical Harness system? |
| 04 | Engineering Harness | How can Harness extend from coding to the full software engineering lifecycle? |
| 05 | Evaluation and Benchmarking | How can Harness quality and effectiveness be measured? |
| 06 | Personal Harness | How can individual developers build their own AI-assisted workflows? |
| 07 | Enterprise Harness | How can teams and companies adopt Harness systems safely and effectively? |
| 08 | Future Directions | What might the Agent Harness ecosystem look like in the future? |

---

### Target Readers

Harness Atlas is designed for:

- developers using AI Coding tools
- independent developers building AI-native workflows
- product managers designing agentic products
- engineering managers introducing AI Agent systems into teams
- researchers and practitioners interested in AI software engineering
- anyone trying to understand the infrastructure behind agentic workflows

---

### Relationship to Existing Concepts

| Concept | Relationship to Harness |
|---|---|
| Large Language Model | Provides reasoning and generation capability, but does not define the full execution environment |
| Agent | The model-driven actor that performs tasks through reasoning, tools, and feedback |
| Harness | The runtime, control, orchestration, and governance layer around the agent |
| Workflow | A repeatable process that can be executed by humans, agents, or both |
| Tool | A capability exposed to the agent, such as shell, file editing, search, browser, database, or API calls |
| MCP / Tool Protocols | Possible interfaces for exposing tools and resources to agents |
| IDE / Terminal / Platform | Possible surfaces where Harness capabilities are exposed to users |

---

### Content Formats

The project may include:

- concept explainers
- course notes
- architecture diagrams
- Mermaid diagrams
- case studies
- comparison tables
- engineering checklists
- prompt, skill, and workflow examples
- Agent Harness design templates
- evaluation frameworks and benchmark notes

---

### License

Harness Atlas uses a dual-license model:

- Text content, articles, diagrams, course notes, and visual materials: **Creative Commons Attribution 4.0 International (CC BY 4.0)**
- Code examples, scripts, configuration files, prompt templates, and engineering materials: **MIT License**

This allows educational content to be freely shared and adapted with attribution, while allowing engineering materials to be reused with minimal restrictions.

---

<a id="中文"></a>

## 中文

### 项目简介

**Harness Atlas** 是一个面向 **Agent Harness** 的公开知识图谱与课程型项目，目标是系统解释 AI Agent 背后的工程化运行环境：大模型如何获得上下文、调用工具、管理状态、执行任务、验证结果，并最终进入真实的软件工程流程。

这个项目关注的不是某一个具体工具或厂商，而是 AI Agent 产品背后的通用工程范式。它讨论 Context、Tool、Memory、State、Planning、Evaluation、Human-in-the-loop、Governance 等要素如何组合成一个可运行、可控制、可评估的 Agent 系统。

在当前的 AI Coding 工具中，Harness 已经以相对清晰的形式出现：代码仓库上下文管理、终端与文件系统访问、工具调用、测试执行、代码审查循环、记忆、权限控制、人类确认等。Harness Atlas 以这些具体场景为入口，进一步讨论 Agent Harness 如何从 Coding Agent 扩展到更完整的软件工程体系。

---

### 什么是 Agent Harness？

**Agent Harness** 可以理解为围绕 AI 模型构建的工程化运行时与控制系统。它决定 Agent 如何接收上下文、调用工具、管理状态、遵守约束、执行任务、验证结果，并与人类协作。

一个简化定义是：

> Agent Harness 是一种结构化工程环境，用于将模型智能组织成可控、可复用、可验证的任务执行能力。

典型的 Agent Harness 通常包含：

- **上下文管理**：选择、压缩、注入、刷新与任务相关的信息
- **工具编排**：调用工具、处理失败、控制权限、进行错误恢复
- **状态管理**：跟踪任务状态、文件状态、执行状态、会话状态和项目状态
- **规划与执行循环**：拆解目标、执行动作、观察结果、修正计划
- **记忆与知识集成**：接入项目知识、历史决策、团队规范和外部资料
- **评估与反馈**：通过测试、Benchmark、代码审查、指标和人工反馈验证结果
- **人类在环**：支持审批、干预、监督和协同决策
- **治理机制**：管理安全边界、审计能力、成本、合规和运行风险

---

### 为什么 Harness 重要？

大模型具备强大的推理与生成能力，但模型能力并不等同于完整的软件工程能力。

真实工程任务需要：

- 稳定获取项目上下文
- 可靠调用工具
- 管理长任务状态
- 记录可追踪的决策过程
- 复用流程与工作模式
- 执行测试与验证
- 控制权限和风险
- 支持人类与 Agent 协作
- 集成已有研发工具链和团队规范

Harness 的价值在于：**把模型能力转化为工程能力。**

| 没有 Harness | 有 Harness |
|---|---|
| 一次性 Prompt | 可复用工作流 |
| 上下文杂乱 | 可管理的上下文窗口与知识来源 |
| 手动调用工具 | 可控的工具编排 |
| 任务状态不清晰 | 显式的计划与执行状态 |
| 输出难验证 | 测试、审查、指标与反馈闭环 |
| 个人效率技巧 | 团队级或企业级工程系统 |

---

### 核心观点

Harness Atlas 基于以下四个核心观点：

1. **Harness 是软件工程思想在 AI Agent 时代的具象化。**  
   模型提供智能能力，Harness 决定这种智能如何被组织、约束、评估和交付。

2. **当前 Agent Harness 的主流形态由 Coding Agent 引领。**  
   Codex、Claude Code、OpenCode 等 AI Coding 环境代表了软件工程生命周期中的一个重要切片：研发工程师工作流。

3. **未来的 Harness 会覆盖更完整的软件工程生命周期。**  
   Agent Harness 将从代码生成扩展到需求分析、架构设计、任务规划、测试、审查、交付、运维、监控和反馈闭环。

4. **Harness 会走向多样化、个性化和组织化。**  
   个人、团队和企业会围绕自己的流程、工具链、知识库、权限策略和交付标准，构建不同形态的 Harness。

---

### 内容范围

Harness Atlas 覆盖以下主题：

| 主题 | 说明 |
|---|---|
| Agent Harness 基础 | 定义、边界、核心概念和术语体系 |
| AI Coding Harness | 当前 AI Coding 工具如何管理上下文、工具、执行和反馈 |
| Harness 架构 | Context、Tool、State、Memory、Workflow、Policy、Evaluation 等核心组件 |
| 软件工程生命周期 | Harness 如何支撑需求、设计、开发、测试、交付、运维和治理 |
| 评估与 Benchmark | 如何衡量 Harness 是否提升效率、质量和可靠性 |
| 个人 Harness | 个人开发者如何构建实用的 AI 辅助工作流 |
| 企业 Harness | Harness 如何接入团队流程、权限、审计、知识库和工程平台 |
| 未来方向 | Agent Harness 产品、平台、生态和标准的可能演进 |

---

### 课程地图

| 模块 | 主题 | 核心问题 |
|---|---|---|
| 00 | Introduction | 为什么 Agent Harness 重要？它解决什么问题？ |
| 01 | What is Harness | 什么是 Harness？什么不是 Harness？边界在哪里？ |
| 02 | Coding Agent Harness | 当前 AI Coding 工具如何实现 Harness 能力？ |
| 03 | Harness Architecture | 一个实用 Harness 系统由哪些核心组件构成？ |
| 04 | Engineering Harness | Harness 如何从编码工具扩展到完整软件工程体系？ |
| 05 | Evaluation and Benchmarking | 如何衡量 Harness 的质量和有效性？ |
| 06 | Personal Harness | 个人开发者如何构建自己的 AI 辅助工作流？ |
| 07 | Enterprise Harness | 团队和企业如何安全、有效地采用 Harness？ |
| 08 | Future Directions | Agent Harness 生态未来可能如何演化？ |

---

### 适合读者

Harness Atlas 适合：

- 正在使用 AI Coding 工具的开发者
- 构建 AI 原生工作流的独立开发者
- 设计 Agent 产品的产品经理
- 希望将 AI Agent 引入研发流程的工程管理者
- 关注 AI 软件工程的研究者与实践者
- 希望理解 Agentic Workflow 背后基础设施的人

---

### 与相关概念的关系

| 概念 | 与 Harness 的关系 |
|---|---|
| 大语言模型 | 提供推理与生成能力，但不定义完整执行环境 |
| Agent | 基于模型、工具和反馈执行任务的行为主体 |
| Harness | 围绕 Agent 的运行时、控制、编排和治理层 |
| Workflow | 可以由人类、Agent 或二者共同执行的可复用流程 |
| Tool | 暴露给 Agent 的能力，例如 Shell、文件编辑、搜索、浏览器、数据库或 API 调用 |
| MCP / 工具协议 | 将工具和资源暴露给 Agent 的一种可能接口 |
| IDE / Terminal / Platform | 向用户呈现 Harness 能力的可能交互表面 |

---

### 内容形式

项目内容包括但不限于：

- 概念解释
- 课程讲义
- 架构图
- Mermaid 图
- 案例分析
- 对比表
- 工程检查清单
- Prompt、Skill、Workflow 示例
- Agent Harness 设计模板
- 评估框架与 Benchmark 笔记

---

### License / 授权协议

Harness Atlas 采用双协议授权：

- 文本内容、文章、图表、课程讲义和视觉材料：**Creative Commons Attribution 4.0 International (CC BY 4.0)**
- 代码示例、脚本、配置文件、Prompt 模板和工程材料：**MIT License**

这意味着课程内容可以在署名条件下自由分享和改编，工程材料可以在保留许可声明的前提下自由复用。

---

## Maintainer

Maintained by [ceasarXuu](https://github.com/ceasarXuu).
