---
chapter: 03
part: "Part II — Core Harness"
title_en: "Minimal Harness"
title_zh: "最小 Agent Harness"
subtitle_zh: "一个 Agent Harness 的最小闭环"
subtitle_en: "The minimal closed loop of an Agent Harness"
language: zh-CN + en
status: article-v2
---

<!-- zh-CN -->
## 最小闭环先于复杂架构

最小 Agent Harness 不是一个简化玩具，而是完整系统的最小可解释形态。它必须包含目标进入系统的入口，必须有上下文选择的边界，必须有动作执行的接口，必须有状态推进的规则，也必须留下可回放的运行记录。少了其中任何一项，系统都可能仍然可以演示，却无法说明自己为什么这样运行。

复杂架构只有在最小闭环成立之后才有意义。多模型、多工具、多 Agent 和复杂工作流都只是放大器，它们会放大可靠性，也会放大混乱。最小 Harness 的作用是先确认一次运行怎样开始、怎样获得信息、怎样行动、怎样停止、怎样解释结果。这个闭环稳定之后，扩展才不会变成堆叠。

## 四个接口构成系统骨架

最小闭环可以被看成四个接口之间的关系。任务接口把用户意图转化为系统目标，上下文接口决定模型获得哪些证据，动作接口把模型建议转化为受控副作用，观测接口记录运行过程并提供评估材料。这些接口不是抽象装饰，而是系统责任的分界线；每一条分界线都决定了错误会停在哪里。

在没有接口意识的实现里，prompt 往往同时承担目标解释、资料筛选、工具选择、错误处理和质量判断。这样的系统初期开发很快，但任何变化都会变得昂贵。最小 Harness 把这些职责从 prompt 中拆出，使模型专注于推理和选择，使工程系统负责约束、状态和证据。

## 简单性保护可演化性

最小并不意味着功能贫乏，而是意味着没有不必要的隐含路径。一个好的最小 Harness 应当能够解释每次输入如何进入上下文，模型为什么可以调用某个工具，状态如何随动作更新，失败信息如何进入下一轮决策。只要这些问题能够被回答，系统就具备进一步演化的基础。

真正危险的复杂性不是模块数量多，而是责任边界不可见。最小 Harness 用少量稳定接口保护系统的可演化性，让后续的技能、工作流、多 Agent 编排、观测和治理都能挂接到明确位置。它提供的不是小规模能力，而是面向复杂系统的骨架。

<!-- en -->
## The Smallest Loop Comes First

A minimal Agent Harness is not a toy version of a larger system. It is the smallest explainable form of the whole system. It needs an entry point where a goal enters the system, a boundary for selecting context, an interface for executing actions, a rule for advancing state, and a record that allows the run to be replayed. If any of these pieces is missing, the system may still demonstrate behavior, but it cannot explain why that behavior occurred.

Complex architecture only becomes meaningful after the minimal loop works. Multiple models, multiple tools, multiple agents, and complex workflows are amplifiers. They can amplify reliability, and they can amplify disorder. The minimal harness first clarifies how a run begins, how it obtains information, how it acts, how it stops, and how it explains the result. Once that loop is stable, expansion is less likely to become accumulation without structure.

## Four Interfaces Form the Skeleton

The minimal loop can be understood as a relationship among four interfaces. The task interface converts user intent into a system goal, the context interface decides what evidence the model receives, the action interface turns model proposals into controlled side effects, and the observation interface records execution for evaluation. These interfaces are not decorative abstractions. They are responsibility boundaries, and each boundary determines where an error can be contained.

In implementations without interface discipline, the prompt often carries goal interpretation, source selection, tool choice, error handling, and quality judgment at the same time. That approach can feel fast at the beginning, but every change becomes expensive. A minimal harness pulls these responsibilities out of the prompt so the model can focus on reasoning and selection while the engineering system owns constraints, state, and evidence.

## Simplicity Protects Evolution

Minimal does not mean feature-poor. It means there are no unnecessary hidden paths. A good minimal harness should explain how each input enters context, why the model is allowed to use a tool, how state changes after an action, and how failure information informs the next decision. When those questions can be answered, the system has the foundation required for further evolution.

The dangerous kind of complexity is not the number of modules. It is invisible responsibility. A minimal harness protects evolvability through a small set of stable interfaces, allowing later skills, workflows, multi-agent orchestration, observation, and governance to attach to defined positions. It provides not small-scale capability, but the skeleton for a complex system.
