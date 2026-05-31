---
chapter: 08
part: "Part III — Composition"
title_en: "Skills as Capability Packaging"
title_zh: "技能作为能力封装"
subtitle_zh: "从一次性动作到可复用能力单元"
subtitle_en: "From one-off action to reusable capability unit"
language: zh-CN + en
status: article-v2
---

<!-- zh-CN -->
## 技能沉淀可重复能力

Skill 的价值不在于保存一段更长的 prompt，而在于把一类任务的稳定做法沉淀为可复用能力。一次成功的 Agent run 可能依赖正确的背景、合适的工具、隐含的步骤和经验性的错误处理；如果这些内容只停留在人的记忆或一次性对话里，系统就无法积累能力。

能力封装意味着把任务范围、输入输出形态、依赖工具、权限边界、执行策略、异常处理和质量证据放在同一个语义单元中。这样，Agent 面对同类任务时不必重新发明路径，系统也能判断某个能力在什么条件下适用，在什么条件下应当拒绝或降级。

## 复用需要边界而不是泛化冲动

Skill 越可复用，越需要清楚说明边界。过度泛化会让一个能力试图覆盖太多任务，最后变成模糊指令集合；边界过窄则会让系统无法迁移经验。好的封装会在两者之间保持张力，把稳定部分固化下来，把需要模型判断的部分保留给运行时。

复用风险也来自权限和环境变化。一个在低风险环境中表现良好的 skill，不能因为名字相同就自动进入高风险环境；一个依赖本地文件的能力，也不能自然迁移到生产数据库。Harness 需要把 skill 视为受约束的能力包，而不是无条件可调用的捷径。

## 能力封装必须可以被评估

无法评估的 skill 只是另一种隐含 prompt。系统应当能够观察它在目标任务上的成功率、失败形态、权限使用、上下文依赖和输出质量，并在能力演化时保留版本关系。这样，skill 的变化才不会成为不可追溯的行为漂移。

把 skill 放进 Harness 的意义，是让能力积累进入工程体系。它把一次性经验转化为可复用单元，又通过边界、权限和评估避免复用失控。模型仍然承担推理，但系统开始拥有可以治理和演化的能力资产。

<!-- en -->
## Skills Preserve Repeatable Capability

The value of a skill is not storing a longer prompt. It is preserving the stable method behind a class of tasks as reusable capability. A successful agent run may depend on the right background, suitable tools, implicit steps, and experienced error handling. If those elements remain only in human memory or a one-off conversation, the system cannot accumulate capability.

Capability packaging means keeping task scope, input and output shape, tool dependencies, permission boundaries, execution strategy, exception handling, and quality evidence inside one semantic unit. When the agent faces a similar task, it does not have to invent the path again, and the system can judge where the capability applies, where it should refuse, and where it should degrade.

## Reuse Needs Boundaries

The more reusable a skill becomes, the more clearly its boundary must be stated. Overgeneralization makes one capability cover too many tasks until it becomes a vague instruction bundle. Excessive narrowness prevents the system from transferring experience. Good packaging holds the tension between the two by fixing the stable parts and leaving the judgment-sensitive parts to runtime.

Reuse risk also comes from changes in authority and environment. A skill that behaves well in a low-risk setting should not automatically move into a high-risk setting because the name looks familiar. A capability built around local files should not naturally migrate to a production database. The harness should treat a skill as a constrained capability package, not as an unconditional shortcut.

## Packaged Capability Must Be Evaluated

A skill that cannot be evaluated is only another hidden prompt. The system should observe its success rate, failure shape, permission use, context dependency, and output quality on its target task family, while preserving version relationships as the capability evolves. Without that evidence, changes to a skill become untraceable behavior drift.

Placing skills inside the harness turns capability accumulation into an engineering process. A skill converts one-time experience into a reusable unit, while boundaries, permissions, and evaluation prevent reuse from becoming uncontrolled. The model still performs reasoning, but the system starts to own capability assets that can be governed and evolved.
