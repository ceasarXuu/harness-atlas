---
chapter: 14
part: "Part V — Production"
title_en: "Production Architecture"
title_zh: "生产架构"
subtitle_zh: "从 Demo 到可交付系统"
subtitle_en: "From demo to deliverable system"
language: zh-CN + en
status: article-v2
---

<!-- zh-CN -->
## 生产化把局部能力变成系统责任

Agent 原型可以围绕一次成功运行组织，生产架构必须围绕长期责任组织。系统不仅要在常见路径上完成任务，还要在高并发、权限差异、依赖波动、数据变化和用户误操作中保持可管理。生产化不是把演示部署上线，而是把偶然有效的能力改造成可运营的系统。

这意味着架构必须覆盖运行入口、任务队列、状态存储、权限服务、工具网关、观测系统、评测回路和人工介入路径。每个部分都承担一种责任，少了任何一个，模型能力都会被迫填补工程空洞。生产架构的重点不是让图更复杂，而是让责任不再隐藏。

## 运营负荷是架构事实

Agent 系统一旦进入真实使用，就会产生持续运营负荷。用户会追问结果，任务会卡在中间，工具会返回异常，权限会需要调整，日志会需要检索，版本会需要回滚，成本会需要控制。忽略这些问题的架构只是演示架构，即使代码已经运行在服务器上，也没有真正进入生产。

运营负荷应当反向塑造系统设计。任务必须有状态，失败必须可定位，人工介入必须有入口，权限变化必须可追踪，成本和时延必须可观察，模型和工具版本必须能关联到结果。生产架构把这些要求前置，使系统在增长时不会依赖个人记忆维持。

## 发布纪律决定可持续性

生产系统需要发布纪律，因为 Agent 行为会受到模型、prompt、上下文、工具和运行时的共同影响。任何一个环节的变化都可能改变最终行为。没有版本、灰度、回滚和证据对比，团队很难知道一次变化究竟改善了什么，又破坏了什么。

可持续的 Agent 架构会把变化管理视为核心能力。它允许模型能力更新，也允许工具扩展，但要求每次变化都有边界、有观测、有恢复路径。生产架构并不是把不确定性消除，而是让不确定性在可控系统中被持续吸收。

<!-- en -->
## Production Turns Local Capability Into System Responsibility

An agent prototype can be organized around one successful run. Production architecture has to be organized around long-term responsibility. The system must complete common paths while remaining manageable under concurrency, permission differences, dependency instability, data changes, and user mistakes. Productionization is not deploying a demonstration. It is turning capability that worked once into an operable system.

This means the architecture has to cover execution entry points, task queues, state storage, permission services, tool gateways, observation systems, evaluation loops, and human intervention paths. Each part owns a kind of responsibility, and when one part is missing, model capability is forced to cover an engineering gap. The purpose of production architecture is not to make diagrams more complex. It is to make responsibility visible.

## Operational Load Is an Architectural Fact

Once an agent system enters real use, it creates ongoing operational load. Users ask about results, tasks get stuck midway, tools return unexpected errors, permissions need adjustment, logs need retrieval, versions need rollback, and cost needs control. An architecture that ignores these issues remains a demonstration architecture, even if the code is already running on a server.

Operational load should shape system design from the beginning. Tasks need state, failures need location, human intervention needs an entry point, permission changes need traceability, cost and latency need observation, and model or tool versions need to be linked to outcomes. Production architecture brings these requirements forward so the system does not rely on personal memory as it grows.

## Release Discipline Makes the System Sustainable

Production systems need release discipline because agent behavior is jointly affected by model, prompt, context, tools, and runtime. A change in any one of those layers can change final behavior. Without versioning, gradual rollout, rollback, and evidence comparison, the team cannot know what a change improved and what it damaged.

Sustainable agent architecture treats change management as a core capability. It allows model capability to update and tools to expand, but it requires every change to have a boundary, observation, and a recovery path. Production architecture does not eliminate uncertainty. It keeps uncertainty continuously absorbed inside a controlled system.
