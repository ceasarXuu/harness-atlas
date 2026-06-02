---
chapter: 07
part: "Part II — Core Harness"
title_en: "Runtime Control"
title_zh: "运行时控制"
subtitle_zh: "规划、执行与恢复"
subtitle_en: "Planning, execution, and recovery"
language: zh-CN + en
status: article-v2
---

<!-- zh-CN -->
## 运行时是 Agent 的控制层

运行时控制决定 Agent 如何从意图走向行动。模型可以提出计划，但系统必须决定计划如何被执行、何时暂停、何时重试、何时升级给人、何时终止。没有运行时控制，Agent 会表现得像一段连续生成的文本；有了运行时控制，Agent 才成为能够被调度、被约束、被恢复的系统过程。

运行时也是不确定性被吸收的地方。工具失败、上下文不足、用户意图变化、模型置信度下降和权限受限，都需要在运行时被处理。把这些情况写进 prompt 只能提供语言倾向，不能形成可靠机制。Harness 需要把规划、执行、等待、恢复和停止都变成显式状态。

## 计划不能直接等于执行

计划是对未来行动的假设，而不是行动本身。可靠的 Agent 系统会把计划和执行分开，允许系统在每一步之前重新检查环境、权限和目标。模型生成的计划可以作为候选路径，但候选路径必须经过运行时校验，才能进入真实工具调用或外部副作用。

这种分离让系统能够在变化中保持稳定。上下文可能在运行中更新，工具返回可能推翻先前假设，用户可能插入新约束，某一步失败可能要求重排顺序。运行时控制不是阻碍模型完成任务，而是让模型的推理持续接受现实环境的反馈。

## 恢复路径决定可靠性上限

系统可靠性的上限往往由失败恢复能力决定。一个只能在理想路径上运行的 Agent 无法进入生产场景，因为真实环境总会出现超时、冲突、权限拒绝、格式错误和部分成功。运行时必须能够识别这些状态，并选择重试、降级、询问、回滚或停止。

恢复并不是失败后的补丁，而应当是运行时设计的一部分。每次行动前都应当知道如果失败会怎样，每次状态变化后都应当知道是否仍然满足目标，每次终止都应当说明原因。这样的控制层让 Agent 不必假装世界总是顺利，而是能够在不顺利时保持可管理。

<!-- en -->
## Runtime Is the Control Layer

Runtime control determines how an agent moves from intent to action. The model can propose a plan, but the system must decide how the plan is executed, when execution pauses, when it retries, when it escalates to a human, and when it stops. Without runtime control, the agent behaves like a stream of generated text. With runtime control, the agent becomes a system process that can be scheduled, constrained, and recovered.

Runtime is also where uncertainty is absorbed. Tool failure, insufficient context, changing user intent, lower model confidence, and restricted permission all need handling during execution. Putting these cases into a prompt can create a linguistic tendency, but it does not create a reliable mechanism. The harness has to represent planning, execution, waiting, recovery, and stopping as explicit states.

## A Plan Is Not Execution

A plan is a hypothesis about future action, not the action itself. A reliable agent system separates planning from execution and allows the system to recheck environment, permission, and objective before each step. A model-generated plan can be a candidate path, but the candidate path must pass runtime validation before it becomes a real tool call or external side effect.

This separation lets the system remain stable under change. Context may update during a run, tool results may invalidate earlier assumptions, the user may introduce a new constraint, and one failed step may require a different order. Runtime control does not prevent the model from completing work. It keeps model reasoning continuously exposed to feedback from the real environment.

## Recovery Sets the Reliability Ceiling

The ceiling of system reliability is often determined by recovery. An agent that only runs on the ideal path cannot operate in production conditions, because real environments contain timeouts, conflicts, denied permissions, malformed data, and partial success. The runtime must recognize these states and choose whether to retry, degrade, ask, roll back, or stop.

Recovery is not an afterthought after failure. It should be part of runtime design. Before each action, the system should know what failure would mean. After each state change, it should know whether the objective still holds. At termination, it should explain why execution ended. This control layer allows the agent to remain manageable without pretending the world always behaves smoothly.
