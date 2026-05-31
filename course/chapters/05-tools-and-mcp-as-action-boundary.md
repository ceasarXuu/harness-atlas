---
chapter: 05
part: "Part II — Core Harness"
title_en: "Tools and MCP as Action Boundary"
title_zh: "工具与 MCP 作为动作边界"
subtitle_zh: "工具不是插件，而是受控副作用"
subtitle_en: "Tools are not plugins; they are controlled side effects"
language: zh-CN + en
status: article-v2
---

<!-- zh-CN -->
## 工具把语言变成副作用

工具让模型从解释世界进入改变世界。读取文件、执行命令、调用接口、修改数据库和发送消息，都会让 Agent 的输出越过文本边界。工具因此不应被理解为能力插件，而应被理解为受控副作用入口。每一个工具接口都在回答一个工程问题，系统允许模型改变什么，以及改变之前需要满足什么条件。

动作边界的缺失会让模型错误直接进入环境。一个错误的总结可以被纠正，但一个错误的写入、删除、发布或支付会留下外部后果。Harness 需要在工具之前建立权限、参数验证、预览、确认、限流、回滚和审计机制，使模型提出的行动必须经过系统层的治理才能发生。

## MCP 使动作边界可连接

MCP 的重要性不只在于连接更多工具，而在于让工具接入有共同的协议形态。协议让能力发现、参数描述、资源读取和调用过程具备统一语义，使 Agent 不必为每个外部系统重新发明接入方式。更重要的是，协议化接口也让权限和观测更容易进入同一层面。

协议并不会自动带来安全。一个 MCP server 如果暴露了过宽的能力，或者没有把资源范围、调用参数和错误语义说明清楚，仍然会把风险转交给模型。Harness 应当把 MCP 放在动作边界内看待，既利用它的连接能力，也用策略层限制它的可见资源、可执行动作和失败影响。

## 行动必须经过系统授权

模型可以建议行动，但不应自然拥有行动权。可靠的工具设计会区分读取和写入，区分可逆和不可逆，区分本地影响和外部影响，区分低风险自动执行和高风险人工确认。这样的区分不是交互细节，而是 Agent 系统的安全结构。

当动作边界清楚时，工具调用就不再是神秘的模型能力，而是可解释的系统事件。运行记录能够显示模型为什么提出调用，系统如何验证参数，权限如何被判断，结果如何返回状态，失败如何进入恢复路径。工具越强，边界越要清晰，因为可用能力越大，工程责任也越大。

<!-- en -->
## Tools Turn Language Into Side Effects

Tools move the model from describing the world to changing the world. Reading files, running commands, calling APIs, modifying databases, and sending messages all push agent output beyond the boundary of text. A tool should therefore not be treated as a capability plugin. It should be treated as an entry point for controlled side effects. Every tool interface answers an engineering question about what the system permits the model to change and what conditions must be satisfied before that change occurs.

Without an action boundary, model error flows directly into the environment. A wrong summary can be corrected, but a wrong write, deletion, publication, or payment leaves external consequences. The harness has to establish permissions, parameter validation, previews, confirmations, rate limits, rollback paths, and audit records before tool execution so model-proposed action can only happen through system governance.

## MCP Makes Boundaries Connectable

The importance of MCP is not only that it connects more tools. It gives tool integration a shared protocol shape. Protocols make capability discovery, parameter description, resource access, and invocation carry common semantics, so the agent does not need to reinvent integration for every external system. More importantly, protocol-shaped interfaces make it easier for permission and observation to live at the same layer.

The protocol does not create safety by itself. An MCP server that exposes overly broad capability, or fails to describe resource scope, call parameters, and error semantics clearly, still transfers risk to the model. A harness should treat MCP as part of the action boundary. It can use the connective power of the protocol while policy limits visible resources, executable actions, and the impact of failure.

## Action Requires System Authority

A model may propose an action, but it should not naturally possess the authority to act. Reliable tool design distinguishes reading from writing, reversible actions from irreversible ones, local effects from external effects, and low-risk automation from high-risk confirmation. These distinctions are not interaction details. They are the safety structure of the agent system.

When the action boundary is clear, a tool call is no longer a mysterious model capability. It becomes an explainable system event. The run record can show why the model proposed the call, how the system validated parameters, how permission was judged, how results returned into state, and how failure entered recovery. The stronger the tool, the clearer the boundary has to be, because greater capability brings greater engineering responsibility.
