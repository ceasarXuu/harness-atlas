## Tools Turn Language Into Side Effects

Tools move the model from describing the world to changing the world. Reading files, running commands, calling APIs, modifying databases, and sending messages all push agent output beyond the boundary of text. A tool should therefore not be treated as a capability plugin. It should be treated as an entry point for controlled side effects. Every tool interface answers an engineering question about what the system permits the model to change and what conditions must be satisfied before that change occurs.

Without an action boundary, model error flows directly into the environment. A wrong summary can be corrected, but a wrong write, deletion, publication, or payment leaves external consequences. The harness has to establish permissions, parameter validation, previews, confirmations, rate limits, rollback paths, and audit records before tool execution so model-proposed action can only happen through system governance.

## MCP Makes Boundaries Connectable

The importance of MCP is not only that it connects more tools. It gives tool integration a shared protocol shape. Protocols make capability discovery, parameter description, resource access, and invocation carry common semantics, so the agent does not need to reinvent integration for every external system. More importantly, protocol-shaped interfaces make it easier for permission and observation to live at the same layer.

The protocol does not create safety by itself. An MCP server that exposes overly broad capability, or fails to describe resource scope, call parameters, and error semantics clearly, still transfers risk to the model. A harness should treat MCP as part of the action boundary. It can use the connective power of the protocol while policy limits visible resources, executable actions, and the impact of failure.

## Action Requires System Authority

A model may propose an action, but it should not naturally possess the authority to act. Reliable tool design distinguishes reading from writing, reversible actions from irreversible ones, local effects from external effects, and low-risk automation from high-risk confirmation. These distinctions are not interaction details. They are the safety structure of the agent system.

When the action boundary is clear, a tool call is no longer a mysterious model capability. It becomes an explainable system event. The run record can show why the model proposed the call, how the system validated parameters, how permission was judged, how results returned into state, and how failure entered recovery. The stronger the tool, the clearer the boundary has to be, because greater capability brings greater engineering responsibility.
