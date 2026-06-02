---
chapter: 15
part: "Part V — Production"
title_en: "Patterns, Anti-patterns and Future"
title_zh: "模式、反模式与未来"
subtitle_zh: "设计原则、反模式与未来方向"
subtitle_en: "Design principles, anti-patterns, and future directions"
language: zh-CN + en
status: article-v2
---

<!-- zh-CN -->
## 稳定模式来自责任分离

Agent Harness 的稳定模式大多围绕责任分离展开。模型负责生成和判断，系统负责边界和证据；工具负责连接外部能力，权限层负责限制副作用；工作流负责确定性路径，运行时负责处理变化；观测系统负责记录过程，评测系统负责判断质量。责任越清楚，系统越能在模型能力变化时保持结构稳定。

这些模式不是形式主义，而是对概率能力的工程回应。模型越强，越容易让团队把更多责任交给模型；但生产系统真正需要的，是把模型能力放进更清楚的结构中。好的模式让能力增长不必带来同等比例的风险增长。

## 反模式暴露错误的系统假设

常见反模式往往不是技术细节错误，而是系统假设错误。把 prompt 当作架构，会让所有责任藏进自然语言；把工具当作插件，会忽略副作用治理；把上下文窗口当作知识库，会混淆证据和噪声；把多 Agent 当作规模升级，会把组织问题误解为数量问题。

反模式的危险在于它们初期经常有效。演示输入干净、任务路径短、权限影响小，系统看起来可以工作；一旦进入复杂环境，隐含假设就会被放大。识别反模式的意义，不是给设计贴标签，而是及时发现哪些责任被错误地交给了模型或个人经验。

## 未来属于可治理的开放性

Agent 系统的未来不会只是模型能力上升，也会是工程边界、协议、评测和治理共同成熟。更强的模型会扩大可自动化范围，同时也会让权限、观测和责任归属变得更重要。真正有价值的系统，不是让模型无限自由，而是让开放能力在可治理结构中发挥作用。

Agent Harness 的长期方向，是把不确定性转化为可以运营的产品能力。它不会消除模型的概率性，也不应该把所有问题重新写成传统流程。它要做的是在开放推理和工程控制之间建立稳定关系，使 Agent 能够进入更复杂、更重要、也更需要信任的工作场景。

<!-- en -->
## Stable Patterns Come From Responsibility Separation

Stable Agent Harness patterns usually revolve around separation of responsibility. The model generates and judges, while the system owns boundaries and evidence. Tools connect external capability, while the permission layer limits side effects. Workflow preserves deterministic paths, while runtime handles change. Observation records the process, while evaluation judges quality. The clearer the responsibility, the more stable the structure remains as model capability changes.

These patterns are not formalism. They are an engineering response to probabilistic capability. The stronger the model becomes, the easier it is for teams to hand more responsibility to the model. Production systems need the opposite discipline. They need model capability placed inside clearer structures. Good patterns allow capability to grow without forcing risk to grow at the same rate.

## Anti-patterns Reveal Wrong System Assumptions

Common anti-patterns are often not small technical mistakes. They are wrong assumptions about the system. Treating the prompt as architecture hides responsibility inside natural language. Treating tools as plugins ignores side-effect governance. Treating the context window as a knowledge base confuses evidence with noise. Treating multiple agents as a scale upgrade mistakes an organizational problem for a quantity problem.

The danger of anti-patterns is that they often work at first. Demonstration inputs are clean, task paths are short, and permission impact is small, so the system appears functional. Once the environment becomes complex, hidden assumptions are amplified. Identifying anti-patterns is not about labeling designs. It is about discovering which responsibilities have been incorrectly handed to the model or to personal experience.

## The Future Belongs to Governable Openness

The future of agent systems will not be only stronger models. It will also be the joint maturation of engineering boundaries, protocols, evaluation, and governance. Stronger models expand the range of automation, while also making permission, observation, and accountability more important. Valuable systems do not grant the model unlimited freedom. They let open capability operate inside governable structure.

The long-term direction of Agent Harness is to convert uncertainty into operable product capability. It will not remove the probabilistic nature of models, and it should not translate every problem back into a traditional process. Its role is to build a stable relationship between open reasoning and engineering control, allowing agents to enter work that is more complex, more important, and more dependent on trust.
