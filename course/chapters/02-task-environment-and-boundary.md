---
chapter: 02
part: "Part I — Philosophy"
title_en: "Task, Environment and Boundary"
title_zh: "任务、环境与边界"
subtitle_zh: "先设计问题，再设计 Agent"
subtitle_en: "Design the problem before designing the agent"
language: zh-CN + en
status: article-v2
---

<!-- zh-CN -->
## 任务不是一句需求

Agent 的设计常常从一句自然语言需求开始，但工程设计不能停在这句话上。任务必须被理解为目标、约束、输入、输出、失败条件和可接受行动范围的组合。只把需求交给模型，会让模型在隐含假设中补全任务；把任务写成工程对象，才会迫使系统说明什么算完成，什么算越界，什么信息可以使用，什么行动必须停止。

任务定义得越模糊，Agent 看起来越自由，实际风险也越大。模型会用语言上的合理性填补缺失的边界，在缺少环境约束时扩大行动范围，在缺少完成标准时追求表面完整。好的 Harness 不急于增加模型能力，而是先收紧任务描述，使模型的开放性服务于明确目标，而不是替代目标本身。

## 环境决定行动可能性

环境不是背景，而是 Agent 能够感知和改变的运行场。文件系统、代码仓库、浏览器、数据库、消息系统、工单平台和用户会话都会改变任务的意义。同样一句“修复问题”，在只读文档环境中意味着诊断，在可写代码环境中意味着修改，在生产权限环境中则意味着需要审批、回滚和审计。

因此，环境建模必须早于动作设计。系统要知道哪些对象可见，哪些对象可写，哪些接口会产生外部影响，哪些信息代表事实，哪些信息只是模型推断。环境越复杂，边界越不能依赖自然语言默契；Harness 必须把可观察范围和可行动范围显式化，否则 Agent 会在看似合理的推理中跨过产品和安全边界。

## 边界把开放问题变成工程问题

边界不是为了削弱 Agent，而是为了让 Agent 可以被信任地使用。信息边界决定模型能看到什么，动作边界决定系统允许模型改变什么，时间边界决定一次运行持续多久，权限边界决定哪些副作用需要确认，质量边界决定什么结果能够交付。边界清楚时，模型可以在其中充分推理；边界含混时，再强的推理也会变成不可控探索。

Agent Harness 的第一性问题因此不是“模型能不能做”，而是“系统允许模型在什么环境中以什么方式做”。这个顺序会改变整个架构。先定义任务、环境和边界，才能判断需要什么上下文、什么工具、什么运行时控制以及什么评测证据；反过来先堆能力，只会得到一个难以解释的自动化体。

<!-- en -->
## A Task Is Not a Sentence

Agent design often begins with a natural-language request, but engineering design cannot stop at that sentence. A task has to be understood as a combination of goal, constraints, inputs, outputs, failure conditions, and acceptable action range. If the request is simply handed to the model, the model fills in missing structure with hidden assumptions. When the task is written as an engineering object, the system has to state what completion means, what counts as overreach, what information may be used, and when action must stop.

The more ambiguous the task is, the freer the agent appears and the riskier it becomes. The model will use linguistic plausibility to fill boundary gaps, expand its action range when environment constraints are absent, and chase surface completeness when completion criteria are unclear. A good harness does not start by increasing model power. It first narrows the task so that model openness serves a defined objective instead of replacing the objective.

## Environment Defines What Action Means

The environment is not background scenery. It is the operating field that the agent can perceive and change. File systems, repositories, browsers, databases, messaging systems, ticketing tools, and user sessions all change the meaning of a task. The same request to fix a problem means diagnosis in a read-only document environment, modification in a writable code environment, and approval, rollback, and audit in a production environment.

Environment modeling therefore has to precede action design. The system must know which objects are visible, which objects are writable, which interfaces create external effects, which information represents fact, and which information is only model inference. The more complex the environment becomes, the less boundaries can rely on conversational understanding. The harness has to make the observable range and action range explicit, or the agent will cross product and safety boundaries while following reasoning that appears locally reasonable.

## Boundaries Turn Openness Into Engineering

Boundaries do not weaken an agent. They make the agent usable under trust. Information boundaries define what the model may see, action boundaries define what the system may change, time boundaries define how long a run may continue, permission boundaries define which side effects require confirmation, and quality boundaries define what result can be delivered. When boundaries are clear, the model can reason deeply inside them. When boundaries are vague, even strong reasoning becomes uncontrolled exploration.

The first question for an Agent Harness is not whether the model can do something. The first question is where, how, and under what authority the system permits the model to act. That order changes the architecture. Defining task, environment, and boundary first makes it possible to decide what context, tools, runtime controls, and evaluation evidence are needed. Starting with capability alone produces automation that is difficult to explain.
