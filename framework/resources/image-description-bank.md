# Image Description Bank / 图片描述合集

Use these as illustration briefs or image generation prompts. / 可作为插图 brief 或图片生成提示。

## 01. Why Agent Harness / 为什么需要 Agent Harness

### 封面图
- 中文：一个发光的模型核心被透明工程外壳包围，外壳上标有 Context、Tools、Runtime、Eval、Governance，强调“能力在内，控制在外”。
- English: A glowing model core enclosed by a transparent engineering shell labeled Context, Tools, Runtime, Eval, and Governance, emphasizing capability inside and control outside.

### 对比图
- 中文：左侧是 prompt-only demo 的单线结构，右侧是完整 harness 的闭环结构，对比不可控与可控。
- English: A comparison diagram: a prompt-only demo as a single line on the left, and a closed-loop harness on the right, contrasting uncontrolled and controlled systems.

## 02. Task, Environment and Boundary / 任务、环境与边界

### 边界地图
- 中文：中心是 Agent，四周是信息边界、动作边界、时间边界、信任边界，每个边界外有不同系统。
- English: A boundary map with the agent at the center, surrounded by information, action, time, and trust boundaries.

### 任务契约卡
- 中文：一张工程规格卡片，包含 goal、environment、inputs、allowed actions、success criteria、risks。
- English: An engineering specification card containing goal, environment, inputs, allowed actions, success criteria, and risks.

## 03. Minimal Harness / 最小 Agent Harness

### 闭环运行图
- 中文：用循环箭头表示 Build Context、Model、Tool、Observation、State、Stop Condition，强调 Harness 是循环系统。
- English: A closed-loop diagram showing Build Context, Model, Tool, Observation, State, and Stop Condition.

### 状态时间线
- 中文：横轴是 step 1、step 2、step 3，每一步显示 context、decision、tool call、observation、state diff。
- English: A timeline with step 1, step 2, and step 3, each showing context, decision, tool call, observation, and state diff.

## 04. Context as Information Boundary / 上下文作为信息边界

### 信息边界剖面图
- 中文：像洋葱层一样展示 system policy、task contract、state、retrieved evidence、tool observations，不同颜色表示不同可信级别。
- English: An onion-layer diagram showing system policy, task contract, state, retrieved evidence, and tool observations with different trust levels.

### 上下文工作台
- 中文：一张桌面上有任务卡、证据卡、状态板、策略手册，远处堆着未选入的资料。
- English: A workbench with task cards, evidence cards, state board, and policy manual, while unused materials remain outside the desk.

## 05. Tools and MCP as Action Boundary / 工具与 MCP 作为动作边界

### 工具网关图
- 中文：模型意图经过 schema validation、permission check、approval gate、executor、audit log，像机场安检一样层层通过。
- English: A tool gateway diagram where model intent passes through schema validation, permission check, approval gate, executor, and audit log like an airport security process.

### 副作用风险阶梯
- 中文：从 read 到 draft 到 write 到 publish 的四级阶梯，每一级对应不同权限和审批要求。
- English: A side-effect risk ladder from read to draft to write to publish, with different permissions and approval requirements at each level.

## 06. State, Session and Memory / 状态、会话与记忆

### 连续性分层图
- 中文：白板表示 state，时间线表示 session，档案柜表示 memory，文件夹表示 artifacts，展示它们之间的数据流。
- English: A layered continuity diagram: a whiteboard for state, a timeline for session, a filing cabinet for memory, and folders for artifacts, showing data flow among them.

### 记忆生命周期图
- 中文：候选记忆经过 select、verify、store、expire、correct、delete 六个阶段。
- English: A memory lifecycle diagram where candidate memory passes through select, verify, store, expire, correct, and delete.

## 07. Runtime Control / 运行时控制

### 飞行控制类比图
- 中文：模型是导航判断，runtime 是仪表盘、燃料、警报、自动驾驶限制和人工接管按钮。
- English: A flight-control analogy: the model provides navigation judgment, while runtime provides dashboard, fuel, alerts, autopilot constraints, and manual takeover button.

### 运行时状态机
- 中文：Planning、Acting、Observing、Recovering、Human Review、Completed 之间的状态转换图。
- English: A runtime state machine showing transitions among Planning, Acting, Observing, Recovering, Human Review, and Completed.

## 08. Skills as Capability Packaging / 技能作为能力封装

### 技能包 exploded view
- 中文：一个 skill 被拆开展示为 manifest、instructions、tools、examples、evals、policy、runtime hints。
- English: An exploded view of a skill package showing manifest, instructions, tools, examples, evals, policy, and runtime hints.

### 工具与技能对比图
- 中文：左边是单个 tool 的扳手图标，右边是 skill 的工具箱，强调 skill 是更高层能力封装。
- English: A comparison: a single wrench icon for a tool on the left, and a toolbox for a skill on the right, emphasizing that a skill is a higher-level capability package.

## 09. Workflows as Deterministic Scaffolding / 工作流作为确定性支架

### 轨道与驾驶员类比
- 中文：轨道代表 workflow，驾驶员代表 Agent，路牌代表 validators，收费站代表 approval gates。
- English: Rails represent workflow, a driver represents the agent, road signs represent validators, and toll gates represent approval gates.

### 混合工作流图
- 中文：用不同形状区分 deterministic steps、agentic steps、approval gates、validators。
- English: A hybrid workflow diagram using different shapes for deterministic steps, agentic steps, approval gates, and validators.

## 10. Multi-agent Orchestration / 多 Agent 编排

### 组织结构图
- 中文：Supervisor 位于上方，Researcher、Writer、Reviewer、Publisher 分列下方，每个角色旁边有权限和输出标签。
- English: An organization chart with Supervisor at the top and Researcher, Writer, Reviewer, Publisher below, each with permission and output labels.

### 交接卡片
- 中文：一张 handoff card，包含 objective、state、evidence、risks、expected output、deadline。
- English: A handoff card containing objective, state, evidence, risks, expected output, and deadline.

## 11. Observability and Debugging / 可观测性与调试

### Agent 黑匣子
- 中文：一个黑匣子记录 task、context、model output、tool call、state diff、stop reason。
- English: A black-box recorder showing task, context, model output, tool call, state diff, and stop reason.

### 运行时间线
- 中文：横向时间线显示每个 span 的耗时、成本、输入、输出、错误。
- English: A horizontal timeline showing duration, cost, input, output, and errors for each span.

## 12. Evaluation, Testing and Benchmarking / 评测、测试与基准

### 评测金字塔
- 中文：底层 unit tests，中层 workflow/skill evals，上层 task success 和 production metrics。
- English: An evaluation pyramid with unit tests at the bottom, workflow/skill evals in the middle, and task success plus production metrics at the top.

### 反馈回路图
- 中文：Trace 数据进入 eval，eval 产生失败分类，失败分类驱动 context、tool、runtime、skill 的改进。
- English: A feedback loop where trace data enters eval, eval produces failure categories, and categories drive improvements to context, tools, runtime, and skills.

## 13. Security, Permissions and Governance / 安全、权限与治理

### 权限同心圆
- 中文：中心是只读，向外依次是草稿、写入、发布、删除，越外层审批越严格。
- English: Permission concentric circles: read-only at the center, then draft, write, publish, delete, with stricter approval outward.

### 安全网关图
- 中文：所有工具调用经过 policy engine、scope check、approval、sandbox、audit。
- English: A security gateway diagram where all tool calls pass through policy engine, scope check, approval, sandbox, and audit.

## 14. Production Architecture / 生产架构

### 生产架构总图
- 中文：Client、Agent API、Runtime Orchestrator、Context Service、Model Gateway、Tool Gateway、State Store、Policy Engine、Eval、Observability 的服务图。
- English: A service diagram showing Client, Agent API, Runtime Orchestrator, Context Service, Model Gateway, Tool Gateway, State Store, Policy Engine, Eval, and Observability.

### 从 demo 到 production 阶梯
- 中文：四层阶梯：prompt demo、tool agent、observable harness、governed production system。
- English: A staircase from prompt demo to tool agent to observable harness to governed production system.

## 15. Patterns, Anti-patterns and Future / 模式、反模式与未来

### 模式地图
- 中文：中心是 Harness，周围环绕 Context Boundary、Tool Gateway、Explicit State、Trace Everything、Eval Before Scale、Least Agency。
- English: A pattern map with Harness at the center, surrounded by Context Boundary, Tool Gateway, Explicit State, Trace Everything, Eval Before Scale, and Least Agency.

### 未来控制层图
- 中文：不同未来 Agent 形态，如 browser agent、personal agent、enterprise agent、multimodal agent，都接入同一套 control layer。
- English: A future control-layer diagram where browser agents, personal agents, enterprise agents, and multimodal agents connect to the same control layer.
