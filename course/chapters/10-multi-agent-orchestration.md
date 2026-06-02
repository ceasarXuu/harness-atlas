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

## 主流架构首先是控制权设计

判断一个 multi-agent 架构，关键不是“用了几个 Agent”，而是四个控制权问题：谁持有任务状态，谁拥有最终答案，Agent 之间传递原始上下文还是压缩证据，失败由谁回滚、重试或仲裁。不同产品和框架的名称会变化，但这些控制权关系相对稳定。

Manager、supervisor 和 handoff 形态都在处理所有权。主 Agent 或协调器可以持有全局目标、任务状态和最终输出权，把研究、检索、代码修改、测试、审查等能力当成可调用的专家；当前 owner 也可以根据意图、上下文或权限把控制权交给另一个 Agent。前者适合目标复杂但需要统一口径的研发任务、研究报告和长链路交付，后者适合账单、退款、技术支持、法务、财务、运维等边界明确的分流。真正的 handoff 不能只是换一个说话角色，而要同时转交任务状态、权限、上下文摘要和退出条件。

Graph、workflow 和 parallel subagents 形态都在处理流程与并行。把 Agent 作为图节点，可以让路由、重试、条件分支、并行和汇总显式化；把互相独立的读任务、测试任务、审查维度交给子代理，可以让代码库探索、日志分析、测试失败归因、资料阅读和候选方案收集更快完成。风险也随之增加：写冲突、重复检索、成本上升，以及“每个子代理都局部正确，但全局无法合并”。

Role-based、critic 和 protocol 形态则在处理组织视角、审查权和系统边界。产品经理、架构师、工程师、测试、安全、Reviewer 等角色只有在输入、输出、验收标准和否决权明确时才有价值；critic、judge 或 arbiter 只有接入外部证据、测试结果、规则或人类审查时才不是用另一个模型包装偏见；通过 MCP、A2A、API、消息队列或事件总线协作时，问题会转向身份、权限、数据边界、审计和责任归属。

很多任务并不需要多 Agent，而需要更好的上下文选择、工具设计、记忆、规划方法和评估闭环。它是所有 multi-agent 方案的必要对照组：如果单 Agent 加清晰上下文已经能稳定完成任务，就不要引入组织开销。更工程化的综合形态通常是“中心化 Harness + Task Graph + 局部并行子代理”：主 Agent 持有 task map，任务节点持有局部目标和证据，边表示依赖、顺序和合并关系，子代理只在节点内执行。

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

## Mainstream Architectures Start With Control

The key question in a multi-agent architecture is not “how many agents are running.” It is four control questions: who owns task state, who owns the final answer, whether agents exchange raw context or compressed evidence, and who rolls back, retries, or arbitrates failure. Product names and framework APIs change, but these control relationships are more stable.

Manager, supervisor, and handoff patterns all manage ownership. A main agent or coordinator may own the global goal, task state, and final output while calling research, retrieval, coding, testing, review, or analysis specialists as bounded capabilities; the current owner may also transfer control to another agent based on intent, context, or permission boundary. The first pattern fits complex tasks that still need a unified voice, such as engineering decomposition, research reports, and long-horizon delivery. The second fits clearly separated branches such as billing, refunds, technical support, legal, finance, or operations. A real handoff does not merely change the speaking role; it transfers task state, permissions, context summary, and exit conditions.

Graph, workflow, and parallel subagent patterns manage process and parallelism. Agents can become graph nodes while routing, retries, conditional branches, parallelism, and aggregation become explicit; independent reading, testing, review, or exploration work can also be delegated to several subagents before the coordinator receives summaries, evidence, and recommendations. This helps repository exploration, log analysis, test failure triage, document reading, and candidate collection, but the risks are write conflicts, duplicated search, higher cost, and locally correct outputs that cannot be merged globally.

Role-based, critic, and protocol patterns manage organizational lenses, review authority, and system boundaries. Roles such as product manager, architect, engineer, tester, security reviewer, and code reviewer become useful only when their inputs, outputs, acceptance criteria, and veto rights are explicit. Critics, judges, or arbiters become useful only when they can use external evidence, tests, rules, or human review rather than merely wrapping another model’s bias. When systems collaborate through MCP, A2A, APIs, message queues, or event buses, the hard questions shift to identity, permissions, data boundaries, auditability, and accountability.

Many tasks do not need more agents. They need better context selection, tool design, memory, planning methods, and evaluation loops. This is the necessary baseline for every multi-agent proposal: if a single agent with clean context can complete the task reliably, do not add organizational overhead. A more production-oriented hybrid is often “centralized harness + task graph + local parallel subagents,” where the main agent owns the task map, task nodes hold local goals and evidence, edges represent dependency, order, and merge rules, and subagents execute only inside bounded nodes.

## Coordination Matters More Than Count

The hard part of multi-agent systems is coordination. Roles need rules for what information they exchange, who holds final decision authority, how conflicts are resolved, how duplicate work is avoided, how failure is attributed, and how run records are merged. Without coordination, multiple agents cite one another, amplify shared assumptions, and produce results that look rich but are difficult to own.

Good orchestration limits communication and authority. Each agent does not need all information, and each agent does not need all tools. The coordinator should not merely concatenate outputs. It should maintain task state, conflicting evidence, and the decision path. The value of multi-agent design comes from structured collaboration, not from output volume.

## Organization Requires Observation

Multi-agent systems resemble organizations, and therefore need organization-level observation. A result should explain not only the final answer, but also what each role saw, what it proposed, what was accepted, what was rejected, and who made the final trade-off. Without those records, it is hard to know whether an error came from insufficient evidence, role misunderstanding, coordination failure, or permission design.

When orchestration matures, multiple agents can improve reliability on complex tasks. The structure lets different capabilities cooperate inside boundaries, separates review from execution, and prevents local exploration from becoming a global decision too quickly. All of this depends on the harness turning organizational structure into engineering structure instead of letting several models freely compete on the same problem.
