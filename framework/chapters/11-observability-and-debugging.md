---
chapter: 11
part: "Part IV — Trust"
title_en: "Observability and Debugging"
title_zh: "可观测性与调试"
subtitle_zh: "让 Agent Run 可见、可回放、可解释"
subtitle_en: "Make agent runs visible, replayable, and explainable"
language: zh-CN + en
status: article-v2
---

<!-- zh-CN -->
## 不可见的 Agent 无法被信任

Agent 系统的困难在于错误经常藏在过程里，而不是只出现在最终答案中。上下文可能选错，工具参数可能偏离，模型可能在中间步骤形成错误假设，运行时可能在失败后继续前进。如果系统只保留最终输出，调试就只能依赖猜测，可靠性也无法被系统性提升。

可观测性把一次 Agent run 变成可以检查的事件序列。目标、上下文来源、模型输入输出、工具调用、状态变化、权限判断、错误信息和最终结果都应当有记录。记录不是为了堆积日志，而是为了让系统能够解释行为，并在失败时找到最早的偏差点。

## 回放能力改变调试方式

可回放是 Agent 调试的关键分水岭。不能回放的错误只能被描述，能够回放的错误才能被定位。回放要求系统保存足够的信息，使同一次运行可以在相同或受控变化的条件下重新执行，观察差异来自模型随机性、上下文变化、工具结果还是运行时决策。

这种能力会改变团队对 Agent 的改进方式。开发者不再只讨论模型“为什么这样想”，而是能够检查系统在什么时刻给了什么信息，为什么允许某个动作，失败后是否进入了正确路径。调试从心理解释转向工程证据，Agent 系统才有可能持续变稳。

## 观测数据服务于系统演化

观测的最终目的不是保存历史，而是让系统演化有依据。高频失败说明边界设计可能不清楚，工具错误说明接口或参数约束需要加强，用户反复纠正说明任务定义存在偏差，模型在某类上下文上漂移说明检索和压缩策略需要调整。运行记录把这些问题从个案变成结构性信号。

好的 Harness 会让观测数据进入产品和工程决策。它不把日志当作事后材料，而是把日志作为评测、权限、上下文治理和运行时恢复的共同基础。可见、可回放、可解释的运行过程，是 Agent 从演示走向可信系统的必要条件。

<!-- en -->
## Invisible Agents Cannot Be Trusted

The difficulty of an agent system is that error often hides inside the process, not only in the final answer. Context may be selected incorrectly, tool parameters may drift, the model may form a mistaken assumption in the middle of execution, and the runtime may continue after a failure. If the system preserves only the final output, debugging becomes guesswork and reliability cannot improve systematically.

Observability turns an agent run into an inspectable sequence of events. Goal, context sources, model inputs and outputs, tool calls, state changes, permission decisions, error information, and final result should all be recorded. The point is not to accumulate logs. The point is to make behavior explainable and to find the earliest deviation when failure occurs.

## Replay Changes Debugging

Replayability is the dividing line in agent debugging. An error that cannot be replayed can only be described. An error that can be replayed can be located. Replay requires the system to preserve enough information for the same run to be executed again under identical or controlled conditions, allowing the team to see whether differences come from model randomness, context changes, tool results, or runtime decisions.

This capability changes how teams improve agents. Developers no longer only ask why the model thought something. They can inspect what information the system provided at a specific moment, why an action was allowed, and whether failure entered the correct path afterward. Debugging moves from psychological explanation to engineering evidence, which is what allows the system to become steadier over time.

## Observation Drives System Evolution

The final purpose of observation is not historical storage. It is evidence for system evolution. Frequent failure may show unclear boundary design. Tool errors may show weak interfaces or parameter constraints. Repeated user correction may show a task definition problem. Model drift on a certain kind of context may show that retrieval and compression strategies need adjustment. Run records turn these issues from anecdotes into structural signals.

A good harness brings observation data into product and engineering decisions. It does not treat logs as material after the fact. It treats logs as the shared foundation for evaluation, permission, context governance, and runtime recovery. Visible, replayable, and explainable execution is a necessary condition for agents to move from demonstration to trusted systems.
