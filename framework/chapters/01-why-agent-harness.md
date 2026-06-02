---
chapter: 01
part: "Part I — Philosophy"
title_en: "Why Agent Harness"
title_zh: "为什么需要 Agent Harness"
subtitle_zh: "从 Prompt 到工程系统"
subtitle_en: "From prompting to engineering systems"
language: zh-CN + en
status: article-v2
---

<!-- zh-CN -->
## 不确定性需要工程边界

Agent Harness 的核心不是让模型更聪明，而是把开放、概率化、不可完全预测的模型能力，放进一个可控、可观察、可评估、可治理的工程系统中。模型可以生成解释、推理路径和行动建议，但这些能力一旦接入文件、代码、网络、数据库或组织流程，就不再只是文本生成问题，而是带有副作用的系统运行问题。

当模型能力进入真实系统，风险并不主要来自某一次回答是否漂亮，而来自系统是否知道输入从哪里来、行动能到哪里去、失败怎样被发现、权限如何被限制、结果能否被复现。Harness 的价值就在这里，它把模型包裹进明确的工程外壳，让概率能力不再以裸露状态直接触碰生产环境。

## 从可演示能力到可交付系统

很多 Agent 原型在演示中显得自然流畅，因为演示任务通常路径短、输入干净、权限宽松，而且失败成本低。真正的交付环境会改变这一切，用户意图会含混，资料会互相矛盾，工具会超时或返回脏数据，模型会在局部合理的推理中制造全局错误。没有 Harness 的系统会把这些不确定性压进 prompt，最后得到一个难以审计也难以改进的黑箱。

可交付系统需要把能力和控制同时设计出来。Prompt 可以表达意图，却不能承担架构边界；模型可以提出计划，却不能独自保证权限、状态和恢复；工具可以扩大行动范围，却也会扩大错误影响面。Agent Harness 将这些问题拆回工程对象，使上下文、动作、状态、运行时、观测和评测各自有位置，而不是混在一段不断膨胀的指令里。

## 可靠性来自控制闭环

Agent 系统的可靠性并不意味着模型永远不会犯错，而是系统能够在错误出现时限制影响、留下证据并进入恢复路径。一次运行应当有可识别的目标、可解释的上下文来源、受控的行动接口、持续更新的状态、完整的运行记录，以及能够把失败转化为改进信号的评测机制。控制闭环越清楚，模型的不确定性越容易被吸收。

因此，Agent Harness 更接近一种工程纪律，而不是某个单点组件。它承认模型是能力核心，却拒绝把系统责任交给模型本身；它允许模型探索，却要求探索发生在边界之内；它利用模型的开放性，却用观测、权限和评测把开放性转化为可运营的系统能力。

<!-- en -->
## Uncertainty Requires an Engineering Boundary

The core of an Agent Harness is not making the model smarter. It is placing open-ended, probabilistic model capability inside an engineering system that can control, observe, evaluate, and govern it. A model can generate explanations, reasoning paths, and proposed actions, but once those capabilities touch files, code, networks, databases, or organizational workflows, the problem is no longer text generation alone. It becomes system execution with side effects.

When model capability enters a real environment, the central risk is not whether a single answer sounds impressive. The central risk is whether the system knows where its inputs came from, how far its actions may go, how failure is detected, how authority is constrained, and whether results can be reproduced. The harness matters because it wraps model capability in an explicit engineering shell instead of letting probability act directly on production surfaces.

## From Demonstration to Delivery

Many agent prototypes feel convincing in a demonstration because the path is short, the input is clean, the permissions are broad, and the cost of failure is low. Delivery changes the conditions. User intent becomes ambiguous, source material conflicts, tools time out or return noisy data, and the model may create global errors from locally plausible reasoning. Without a harness, these uncertainties get pushed into prompts, leaving a black box that is hard to audit and hard to improve.

A deliverable system has to design capability and control at the same time. Prompts can express intent, but they cannot carry architectural boundaries. Models can propose plans, but they cannot by themselves guarantee permission, state, and recovery. Tools can expand the action surface, but they also expand the blast radius of mistakes. An Agent Harness turns these concerns back into engineering objects so context, action, state, runtime, observation, and evaluation each have a defined place.

## Reliability Comes From Control Loops

Reliability in an agent system does not mean the model never fails. It means the system can limit the impact of failure, preserve evidence, and enter a recovery path when failure appears. A run should have an identifiable goal, explainable context sources, controlled action interfaces, continuously updated state, complete execution records, and an evaluation mechanism that turns failure into a signal for improvement. The clearer the control loop, the more absorbable model uncertainty becomes.

Agent Harness is therefore closer to an engineering discipline than to a single component. It accepts the model as the capability core, but refuses to hand system responsibility to the model itself. It allows exploration, but requires exploration to happen inside boundaries. It uses the openness of models while converting that openness into operational system capability through observation, permissions, and evaluation.
