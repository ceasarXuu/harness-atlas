---
chapter: 10
part: "Part III — Composition"
title_en: "Multi-agent Orchestration"
title_zh: "多 Agent 编排"
subtitle_zh: "多 Agent 是组织设计，不是堆更多 Agent"
subtitle_en: "Multi-agent design is organizational design, not more agents"
language: zh-CN + en
status: article-v2
---

<!-- zh-CN -->
## 多 Agent 首先是分工问题

多 Agent 编排的核心不是让更多模型同时说话，而是把任务责任拆成可管理的角色。研究、规划、执行、审查、协调和记录可以由不同代理承担，但只有在职责、输入输出和决策权清楚时，这种拆分才会提高系统质量。否则，多 Agent 只会把单个模型的不确定性扩散成群体噪声。

分工必须服务于任务结构。某些任务适合单 Agent，因为上下文集中且行动链短；某些任务需要多 Agent，因为证据来源分散、判断维度冲突或执行面相互独立。Harness 的作用是判断何时需要组织结构，而不是把多 Agent 当成默认升级路线。

## 协调比数量更重要

多 Agent 系统的难点在协调。角色之间需要交换什么信息，谁拥有最终决策权，冲突如何解决，重复工作如何避免，失败如何归属，运行记录如何合并，这些问题决定系统能否稳定。没有协调机制，多个 Agent 会互相引用、互相放大假设，最后得到看似丰富但难以负责的结果。

好的编排会限制通信和权力。每个 Agent 不必看到全部信息，也不必拥有全部工具；协调者也不应只是把输出拼接起来，而要维护任务状态、冲突证据和决策路径。多 Agent 的价值来自结构化协作，而不是输出数量。

## 组织结构需要可观测性

多 Agent 使系统更接近组织，也因此需要组织级观测。一次结果不仅要说明最终答案，还要说明各角色看到了什么、提出了什么、接受了什么、拒绝了什么、谁做了最终取舍。没有这些记录，系统很难判断错误来自资料不足、角色误解、协调失败还是权限设计问题。

编排成熟后，多 Agent 可以显著提高复杂任务的可靠性。它让不同能力在边界内合作，让审查和执行分离，让局部探索不直接变成全局决定。但这一切成立的前提是 Harness 把组织结构变成工程结构，而不是让多个模型在同一个问题上自由竞争。

<!-- en -->
## Multi-agent Design Starts With Division of Labor

The core of multi-agent orchestration is not having more models speak at the same time. It is decomposing task responsibility into manageable roles. Research, planning, execution, review, coordination, and recording may be handled by different agents, but the split improves quality only when responsibility, inputs, outputs, and decision authority are clear. Otherwise multi-agent design spreads the uncertainty of one model into group noise.

Division of labor must serve the structure of the task. Some tasks are better handled by a single agent because context is concentrated and the action chain is short. Other tasks need multiple agents because evidence is distributed, judgment dimensions conflict, or execution surfaces are independent. The harness decides when organizational structure is needed instead of treating more agents as a default upgrade path.

## Coordination Matters More Than Count

The hard part of multi-agent systems is coordination. Roles need rules for what information they exchange, who holds final decision authority, how conflicts are resolved, how duplicate work is avoided, how failure is attributed, and how run records are merged. Without coordination, multiple agents cite one another, amplify shared assumptions, and produce results that look rich but are difficult to own.

Good orchestration limits communication and authority. Each agent does not need all information, and each agent does not need all tools. The coordinator should not merely concatenate outputs. It should maintain task state, conflicting evidence, and the decision path. The value of multi-agent design comes from structured collaboration, not from output volume.

## Organization Requires Observation

Multi-agent systems resemble organizations, and therefore need organization-level observation. A result should explain not only the final answer, but also what each role saw, what it proposed, what was accepted, what was rejected, and who made the final trade-off. Without those records, it is hard to know whether an error came from insufficient evidence, role misunderstanding, coordination failure, or permission design.

When orchestration matures, multiple agents can improve reliability on complex tasks. The structure lets different capabilities cooperate inside boundaries, separates review from execution, and prevents local exploration from becoming a global decision too quickly. All of this depends on the harness turning organizational structure into engineering structure instead of letting several models freely compete on the same problem.
