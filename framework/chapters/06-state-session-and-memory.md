---
chapter: 06
part: "Part II — Core Harness"
title_en: "State, Session and Memory"
title_zh: "状态、会话与记忆"
subtitle_zh: "连续性不是记住更多，而是管理状态"
subtitle_en: "Continuity is state management, not remembering more"
language: zh-CN + en
status: article-v2
---

<!-- zh-CN -->
## 连续性来自状态而不是记忆量

Agent 系统看起来连续，不能只是因为它保存了更多对话。真正的连续性来自状态管理，也就是系统知道当前目标是什么、已经采取过哪些行动、哪些假设仍然有效、哪些错误已经出现、哪些资源已经改变。记忆可以提供背景，状态却决定运行的下一步应当如何发生。

如果系统把所有连续性都交给长上下文或长期记忆，Agent 会逐渐失去可解释性。模型可能引用过期信息，混淆历史偏好和当前事实，把曾经有效的决策迁移到新的环境。Harness 需要把状态、会话和记忆分开处理，使每一种连续性都有不同的生命周期和可信度。

## 会话组织一次运行的时间边界

会话是一次或一组相关运行的时间容器。它保存用户意图、交互历史、临时决策和当前工作面，但它不应无限期地承担事实存储。会话边界清楚时，系统知道哪些信息只是当前任务上下文，哪些信息值得沉淀，哪些信息在任务结束后应当被丢弃或降权。

很多 Agent 错误来自会话边界松散。旧目标残留在新任务中，失败尝试没有被正确标记，用户已经否定的假设继续影响输出，临时权限被误认为长期授权。会话管理的目标不是保留一切，而是在时间上组织运行，使模型面对的是当前有效的状态，而不是杂乱的历史。

## 记忆必须经过治理

记忆不是一个越大越好的仓库。可用的记忆应当有来源、范围、创建时间、失效条件和使用理由。用户偏好、项目约定、历史故障和领域知识都可能成为记忆，但它们进入 Agent 决策之前必须经过选择和验证。否则，记忆会把系统从可追溯的状态机拉回不可解释的印象集合。

Agent Harness 对记忆的要求是可治理，而不是永不遗忘。系统应当能够解释某条记忆为什么被写入，为什么在当前运行中被读取，是否仍然可信，以及当它造成错误时怎样被修正。只有这样，记忆才会成为稳定性的来源，而不是隐藏的偏见和回归入口。

<!-- en -->
## Continuity Comes From State

An agent system does not become continuous merely because it stores more conversation. Real continuity comes from state management, which means the system knows the current goal, the actions already taken, the assumptions that still hold, the failures that have appeared, and the resources that have changed. Memory can provide background, but state determines what the next step in a run should be.

If the system hands all continuity to long context or long-term memory, the agent gradually loses explainability. The model may cite outdated information, confuse historical preference with current fact, or move a decision that once worked into an environment where it no longer applies. The harness needs to separate state, session, and memory so each kind of continuity has its own lifecycle and confidence level.

## Session Defines the Time Boundary

A session is the time container for one run or a related group of runs. It holds user intent, interaction history, temporary decisions, and the current working surface, but it should not become unlimited fact storage. When the session boundary is clear, the system knows what belongs only to the current task, what deserves durable preservation, and what should be discarded or weakened after the task ends.

Many agent failures come from loose session boundaries. Old goals remain inside new tasks, failed attempts are not marked correctly, assumptions rejected by the user continue to influence output, and temporary permission is mistaken for lasting authority. Session management is not about preserving everything. It organizes execution over time so the model sees current valid state rather than a noisy history.

## Memory Requires Governance

Memory is not a warehouse that becomes better as it grows. Useful memory needs source, scope, creation time, expiration conditions, and a reason for use. User preferences, project conventions, past incidents, and domain knowledge may all become memory, but they need selection and verification before they influence agent decisions. Otherwise memory pulls the system away from traceable state and back into unexplained impressions.

The harness requirement for memory is governance, not perfect retention. The system should explain why a memory was written, why it was read in the current run, whether it remains trustworthy, and how it can be corrected when it causes error. Only then does memory become a source of stability rather than a hidden entry point for bias and regression.
