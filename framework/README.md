# Agent Harness Atlas Framework / Agent Harness Atlas 框架包

Generated: 2026-05-31

## Framework Positioning / 框架定位

**中文**：这不是一门只讲 prompt 或 tool calling 的课程，而是一套关于如何把开放、概率化的模型能力工程化为可靠 Agent 系统的框架表达。主线是：先定义任务和边界，再构造最小 Harness，然后逐步引入上下文、工具、状态、运行时、技能、工作流、多 Agent、可观测性、评测、安全和生产架构。

**English**: This is not a course only about prompts or tool calling. It is a framework for expressing how open-ended probabilistic model capability can be engineered into reliable agent systems. The sequence is: define task and boundaries, build a minimal harness, then introduce context, tools, state, runtime, skills, workflows, multi-agent orchestration, observability, evaluation, security, and production architecture.

## Core Philosophy / 核心哲学

```text
Model gives intelligence.
Harness gives control.

模型提供智能。
Harness 提供控制。
```

A second principle runs through the framework:

```text
Determinism where possible.
Agency where necessary.

能确定的交给代码。
必须开放判断的交给模型。
```

## Files / 文件

- `chapters/` — 15 bilingual Markdown framework chapters. / 15 个中英双语框架章节。
- `resources/glossary-bilingual.md` — bilingual glossary. / 中英术语表。
- `resources/image-description-bank.md` — all image descriptions collected for visual production. / 图片描述合集。
- `resources/lab-project-framework-builder-harness.md` — continuous lab project. / 贯穿实验项目说明。
- `resources/templates.md` — reusable design templates. / 可复用设计模板。

## Suggested Use in GitHub Pages / 在 GitHub Pages 中的使用建议

**中文**：可以直接把 `chapters/` 放入仓库的 `docs/` 或框架目录中。Markdown 中包含 Mermaid 图，GitHub 与许多静态站点工具可直接渲染；如果使用自定义主题，可把 `resources/image-description-bank.md` 中的图片描述交给设计工具或图像模型生成配图。

**English**: You can place `chapters/` directly under `docs/` or your framework directory. The Markdown files include Mermaid diagrams, which GitHub and many static site generators can render. If you use a custom theme, use `resources/image-description-bank.md` as a source for visual production.
