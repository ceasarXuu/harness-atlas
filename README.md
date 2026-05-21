# Harness Atlas

> A public course and knowledge atlas for understanding Agent Harness.

**Harness Atlas** 是一个面向开发者、产品经理、AI Agent 实践者的软件工程科普课程项目，目标是系统解释 **Agent Harness** 的概念、架构、工程实践与未来演化方向。

这个仓库不是单纯介绍某一个 Coding Agent 工具，而是试图从更高层抽象 Agent Harness：它如何把软件工程中的需求分析、设计、开发、测试、交付、运维、反馈闭环等能力，具象化为可运行、可组合、可评估的工程系统。

---

## 核心观点

1. **Harness 是软件工程思想在 AI Agent 时代的具象化。**  
   模型本身提供智能能力，但 Harness 决定智能如何被组织、约束、调度和落地。

2. **当前 Agent Harness 的主流形态由 Coding Agent 引领。**  
   Codex、Claude Code、OpenCode 等工具主要体现的是软件工程中“研发工程师”这一角色切片。

3. **未来完整的 Harness 会覆盖更长的软件工程生命周期。**  
   它不仅包含代码生成，还会延伸到需求分析、架构设计、任务管理、测试验证、缺陷追踪、交付运维等环节。

4. **Harness 会走向多样化、个性化和企业化。**  
   不同个人、团队、企业会根据自己的流程、工具链、知识库和交付标准，构建不同形态的 Harness。

---

## 课程对象

本课程适合：

- 想系统理解 AI Agent 工程化的人
- 正在使用 Codex、Claude Code、OpenCode 等 Coding Agent 的开发者
- 希望设计 Agent 产品或 Agent Workflow 的产品经理
- 关注 AI Coding、AI Software Engineering、Agentic Workflow 的独立开发者
- 希望把 AI Agent 引入团队研发流程的软件工程管理者

---

## 课程结构

计划按照以下模块逐步展开：

| 模块 | 主题 | 说明 |
|---|---|---|
| 00 | Introduction | 为什么需要理解 Agent Harness |
| 01 | What is Harness | Harness 的定义、边界与核心组成 |
| 02 | Coding Agent Harness | 从 Codex、Claude Code、OpenCode 理解当前主流形态 |
| 03 | Harness Architecture | Context、Tool、State、Memory、Workflow、Policy 等核心架构要素 |
| 04 | Engineering Harness | 从编码工具扩展到完整软件工程体系 |
| 05 | Evaluation & Benchmark | 如何评估 Harness 是否真的提升效率和质量 |
| 06 | Personal Harness | 个人开发者如何构建适合自己的 Harness |
| 07 | Enterprise Harness | 企业级 Harness 的流程、权限、审计、知识库与协作问题 |
| 08 | Future Directions | Agent Harness 的未来形态与可能的产业格局 |

---

## 什么是 Agent Harness？

在本课程中，**Agent Harness** 暂时定义为：

> 围绕大模型构建的一套工程化运行环境，用于组织上下文、调度工具、管理状态、约束行为、执行任务、接收反馈，并让 Agent 能够在真实软件工程流程中稳定工作。

一个典型的 Agent Harness 可能包含：

- **Context Management**：上下文收集、压缩、选择与注入
- **Tool Orchestration**：工具调用、权限控制、错误恢复
- **State Management**：任务状态、文件状态、执行状态、会话状态
- **Planning & Execution Loop**：计划、执行、观察、修正的闭环
- **Memory / Knowledge Integration**：项目知识、团队规范、历史经验的接入
- **Evaluation & Feedback**：结果验证、测试、Benchmark、人工反馈
- **Human-in-the-loop**：人类审批、干预、监督和协作
- **Governance**：安全边界、审计、权限、成本和风险控制

---

## 内容形式

本仓库后续会逐步补充：

- 科普文章
- 架构图
- Mermaid 图
- 案例分析
- 对比表
- 工程实践清单
- 课程讲义
- Prompt / Skill / Workflow 示例
- Agent Harness 设计模板

---

## 建议目录结构

```text
harness-atlas/
├── README.md
├── docs/
│   ├── glossary.md
│   ├── concept-map.md
│   └── course-outline.md
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
└── LICENSE
```

---

## 项目状态

当前项目处于早期整理阶段。

优先建设内容：

- [ ] 完成课程大纲
- [ ] 梳理 Agent Harness 概念图谱
- [ ] 编写 Harness 基础定义文章
- [ ] 对比 Codex、Claude Code、OpenCode 等典型 Coding Agent Harness
- [ ] 绘制 Harness 架构图
- [ ] 整理个人开发者 Harness 实践路线
- [ ] 整理企业级 Harness 演进路线

---

## License

建议采用双协议：

- 课程内容、文章、图表、讲义、Mermaid 图等文本与视觉材料：**CC BY 4.0**
- 代码示例、脚本、配置文件、Prompt 模板等工程材料：**MIT License**

具体协议文件后续补充。

---

## About

Maintained by [ceasarXuu](https://github.com/ceasarXuu).

This project is part of an ongoing exploration of Agent Harness, AI Coding, and software engineering in the age of AI agents.
