---
chapter: 09
part: "Part III — Composition"
title_en: "Workflows as Deterministic Scaffolding"
title_zh: "工作流作为确定性支架"
subtitle_zh: "把确定性留给代码，把不确定性留给模型"
subtitle_en: "Leave determinism to code and uncertainty to the model"
language: zh-CN + en
status: article-v2
---

<!-- zh-CN -->
## 工作流保存确定性

工作流的作用不是把 Agent 变成传统脚本，而是把系统中已经确定的部分交给代码。文件读取顺序、审批步骤、数据格式转换、结果发布路径和回滚策略，如果已经可以被明确描述，就不应每次都让模型重新判断。确定性越早固化，模型越能把能力集中在真正需要判断的部分。

没有工作流支架的 Agent 会把所有选择都放进模型推理。短任务里这可能显得灵活，长任务里却会制造漂移。某一步格式轻微变化，后续工具就可能失败；某个审批步骤被模型跳过，系统就可能越权。工作流为这些路径提供稳定轨道，使模型的自由度不必承担全部系统责任。

## 模型处理开放性

确定性支架并不排斥模型，相反，它为模型创造了更清晰的发挥空间。模型适合处理含混意图、资料冲突、方案权衡、自然语言解释和例外情况；代码适合处理顺序、格式、权限、重试、持久化和可重复计算。把两者混在一起，会让系统既失去代码的可预测性，也失去模型的灵活性。

好的 Harness 会把工作流设计成可插入模型判断的位置，而不是让模型在每个节点自由游走。系统先定义不可跳过的结构，再把开放问题放到结构中的合适位置。这样，模型不是被流程压制，而是在确定性保护下处理真正需要智能的部分。

## 结构使复杂任务可运营

复杂任务通常不是因为单一步骤困难，而是因为步骤之间的依赖和失败状态多。工作流把这些依赖显式化，使系统能够知道当前位于哪个阶段、哪些前置条件已经满足、哪些输出可以进入下一步、哪些失败需要暂停。结构越清晰，运营成本越低。

把工作流视为确定性支架，也能避免另一个误区，即用模型替代所有产品逻辑。Agent 系统仍然需要产品规则、权限规则和数据规则。模型负责在这些规则内处理开放性，工作流负责让规则能够稳定执行。二者结合，才会形成可交付的自动化能力。

<!-- en -->
## Workflow Preserves Determinism

The role of a workflow is not to turn an agent into a traditional script. It is to give code the parts of the system that are already determined. File reading order, approval steps, data shape conversion, publication paths, and rollback policy should not be judged by the model every time once they can be described clearly. The earlier determinism is fixed, the more the model can focus on the parts that genuinely require judgment.

An agent without workflow scaffolding pushes every choice into model reasoning. That may feel flexible in short tasks, but it creates drift in long tasks. A small format variation can break a later tool. An approval step skipped by the model can create unauthorized action. Workflow gives these paths stable rails so model freedom does not have to carry all system responsibility.

## The Model Handles Openness

Deterministic scaffolding does not reject the model. It creates a clearer space for the model to operate. Models are well suited for ambiguous intent, conflicting evidence, trade-off reasoning, natural-language explanation, and exceptional cases. Code is well suited for order, format, permission, retry, persistence, and repeatable computation. Mixing the two carelessly leaves the system with neither code predictability nor model flexibility.

A good harness designs workflows with explicit places where model judgment can enter, rather than allowing the model to wander freely at every node. The system defines the structure that cannot be skipped, then places open questions inside that structure. In this arrangement, the model is not suppressed by process. It handles the parts that truly need intelligence under deterministic protection.

## Structure Makes Complex Work Operable

Complex tasks are usually difficult not because every individual step is hard, but because dependencies and failure states multiply between steps. Workflow makes those dependencies explicit. The system can know which phase it is in, which preconditions are satisfied, which outputs may enter the next step, and which failures require a pause. The clearer the structure, the lower the operational cost.

Treating workflow as deterministic scaffolding also avoids the mistake of using the model to replace all product logic. Agent systems still need product rules, permission rules, and data rules. The model handles openness within those rules, while workflow makes the rules execute consistently. Together they create automation that can be delivered rather than merely demonstrated.
