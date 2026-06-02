---
chapter: 13
part: "Part IV — Trust"
title_en: "Security, Permissions and Governance"
title_zh: "安全、权限与治理"
subtitle_zh: "限制 Agent 的权力"
subtitle_en: "Limit the agent’s power"
language: zh-CN + en
status: article-v2
---

<!-- zh-CN -->
## 安全从限制权力开始

Agent 安全的起点不是要求模型保持谨慎，而是限制系统赋予模型的权力。模型可以被诱导、误解上下文、接受错误资料或形成过度自信的计划，因此安全不能建立在模型自律上。真正的安全结构应当让模型即使提出危险行动，也无法直接越过权限边界。

权限设计需要把能力拆成可授权的最小单位。读取、写入、执行、发布、删除、支付、通知和访问敏感资料都应当有不同级别的控制。把这些权力合并成一个宽泛授权，会让 Agent 在任务推进中不知不觉获得过大影响面。

## 治理把规则放进系统

治理不是文档中的原则，而是系统运行时可以执行的规则。哪些数据不能进入上下文，哪些工具需要确认，哪些任务需要审批，哪些记录必须保存，哪些用户可以授予权限，这些决定都需要进入 Harness 的策略层。只有策略层存在，组织要求才不会退化成 prompt 中的提醒。

治理还要求系统能够解释权力如何被使用。一次行动为什么被允许，依据了哪个策略，谁拥有授权资格，是否留下了审计记录，是否可以撤销或追责，这些问题决定 Agent 能否进入组织环境。没有治理，Agent 越强，组织风险越高。

## 权限边界必须随环境变化

权限不是一次设置后永远有效的常量。任务类型、用户身份、数据敏感度、运行环境和外部影响都会改变允许范围。一个在本地草稿环境中可以自动执行的动作，进入共享仓库或生产系统后可能必须停下来等待确认。Harness 需要让权限随上下文变化，而不是把授权写死。

安全、权限和治理最终服务于同一个目标，即让 Agent 能够承担更真实的工作而不失控。限制权力不是削弱能力，而是让能力能够被放入更重要的场景。系统越明确地控制权力，模型能力越可能被组织信任。

<!-- en -->
## Security Begins With Limiting Power

Agent security does not begin by asking the model to be careful. It begins by limiting the power the system gives to the model. A model can be induced, misunderstand context, accept bad evidence, or form an overconfident plan, so safety cannot be built on model self-discipline. A real safety structure prevents dangerous action from crossing permission boundaries even when the model proposes it.

Permission design needs to decompose capability into the smallest units that can be authorized. Reading, writing, executing, publishing, deleting, paying, notifying, and accessing sensitive material should have different levels of control. Merging these powers into one broad grant lets the agent gain too much impact while the task appears to be progressing normally.

## Governance Puts Rules Into the System

Governance is not a principle written in a document. It is a set of rules the system can enforce at runtime. Which data may not enter context, which tools require confirmation, which tasks require approval, which records must be preserved, and which users may grant authority all need to live in the policy layer of the harness. Only when that layer exists do organizational requirements avoid becoming reminders inside prompts.

Governance also requires the system to explain how power was used. Why an action was allowed, which policy applied, who had authority, whether an audit record exists, and whether the action can be revoked or attributed are all questions that determine whether an agent can operate inside an organization. Without governance, the stronger the agent becomes, the higher the organizational risk becomes.

## Permission Must Change With Context

Permission is not a constant that remains valid after one configuration. Task type, user identity, data sensitivity, runtime environment, and external impact all change what should be allowed. An action that can run automatically in a local draft environment may need to stop for confirmation in a shared repository or production system. The harness needs permission to change with context instead of hardcoding authority.

Security, permission, and governance ultimately serve the same goal, which is allowing agents to handle more real work without losing control. Limiting power does not weaken capability. It makes capability usable in more important settings. The more clearly the system controls authority, the more likely model capability is to earn organizational trust.
