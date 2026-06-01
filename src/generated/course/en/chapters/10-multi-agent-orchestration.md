## Multi-agent Design Starts With Division of Labor

The core of multi-agent orchestration is not having more models speak at the same time. It is decomposing task responsibility into manageable roles. Research, planning, execution, review, coordination, and recording may be handled by different agents, but the split improves quality only when responsibility, inputs, outputs, and decision authority are clear. Otherwise multi-agent design spreads the uncertainty of one model into group noise.

Division of labor must serve the structure of the task. Some tasks are better handled by a single agent because context is concentrated and the action chain is short. Other tasks need multiple agents because evidence is distributed, judgment dimensions conflict, or execution surfaces are independent. The harness decides when organizational structure is needed instead of treating more agents as a default upgrade path.

## Mainstream Architectures Are About Control, Not Framework Names

The key question in a multi-agent architecture is not “how many agents are running.” It is four control questions: who owns task state, who owns the final answer, whether agents exchange raw context or compressed evidence, and who rolls back, retries, or arbitrates failure. Product names and framework APIs change, but these control relationships are more stable.

### 1. Manager / Supervisor Orchestration

A main agent or coordinator owns the global goal, task state, and final output, while calling research, retrieval, coding, testing, review, or analysis specialists as bounded capabilities. This fits complex tasks that still need a unified voice, such as engineering decomposition, research reports, repository analysis, and long-horizon delivery. The risk is supervisor bottleneck: if the supervisor cannot judge specialist quality, the system only packages errors more formally.

### 2. Handoff / Swarm

The current owner transfers control to another agent based on intent, context, or permission boundary. This fits clearly separated business branches such as billing, refunds, technical support, legal, finance, or operations. A handoff must not merely change the speaking role; it should transfer task state, permissions, context summary, and exit conditions.

### 3. Graph / Workflow Orchestration

Agents become graph nodes, while routing, retries, conditional branches, parallelism, and aggregation become explicit. This fits tasks where the process is relatively stable, state is non-trivial, and local steps still need model judgment. In harness terms, this extends Lesson 9, “workflows as deterministic scaffolding,” by replacing selected workflow nodes with reasoning, tool-using, failure-recoverable agent nodes.

### 4. Parallel Subagents

The main agent delegates independent reading, testing, review, or exploration work to several subagents in parallel, then receives summaries, evidence, and recommendations. This fits repository exploration, log analysis, test failure triage, document reading, and candidate collection. The risks are write conflicts, duplicated search, higher cost, and locally correct outputs that cannot be merged globally.

### 5. Role-based / SOP Teams

The system simulates an organizational process with roles such as product manager, architect, engineer, tester, security reviewer, and code reviewer. This is useful for teaching, complex delivery, and tasks that need multiple judgment lenses. The role name is not the value; the value comes from each role’s input, output, acceptance criteria, and veto rights. Without those constraints, a role-based system becomes prompt theater.

### 6. Debate / Critic / Mixture-of-Agents

Multiple agents produce candidate answers to the same problem, while a critic, judge, or arbiter verifies, merges, or rejects them. This fits reasoning, design review, risk discovery, red-teaming, and high-stakes preflight checks. Voting is not truth; a critic becomes useful only when it can use external evidence, tests, rules, or human review rather than merely wrapping another model’s bias.

### 7. Protocol / Interop Collaboration

Different systems collaborate through MCP, A2A, APIs, message queues, or event buses, allowing agents to operate across runtimes, products, and organizational boundaries. This fits enterprise environments where tools, data, and responsibility are already distributed. The risk shifts to identity, permissions, data boundaries, auditability, and accountability, so this is platform engineering as much as agent design.

### 8. Single-agent + Context Engineering

Many tasks do not need more agents. They need better context selection, tool design, memory, planning templates, and evaluation loops. This is the necessary baseline for every multi-agent proposal: if a single agent with clean context can complete the task reliably, do not add organizational overhead. Multi-agent design is not the default upgrade path; it is the engineering response when the task shape forces organization.

## Selection Method: Start From Task Shape

- Clear routing boundary: use handoff or supervisor.
- Stable process with complex state: use graph / workflow.
- Parallelizable read-heavy work: use parallel subagents.
- Need for multiple review lenses: use critic / reviewer.
- Cross-system collaboration: use protocol / interop.
- Concentrated context and short action chain: stay single-agent.

A more production-oriented hybrid is often “centralized harness + task graph + local parallel subagents.” The main agent owns the task map, task nodes hold local goals and evidence, edges represent dependency, order, and merge rules, and subagents only execute inside bounded nodes. This is closer to a debuggable, replayable, evaluable engineering system than several agents freely chatting with one another.

## Coordination Matters More Than Count

The hard part of multi-agent systems is coordination. Roles need rules for what information they exchange, who holds final decision authority, how conflicts are resolved, how duplicate work is avoided, how failure is attributed, and how run records are merged. Without coordination, multiple agents cite one another, amplify shared assumptions, and produce results that look rich but are difficult to own.

Good orchestration limits communication and authority. Each agent does not need all information, and each agent does not need all tools. The coordinator should not merely concatenate outputs. It should maintain task state, conflicting evidence, and the decision path. The value of multi-agent design comes from structured collaboration, not from output volume.

## Organization Requires Observation

Multi-agent systems resemble organizations, and therefore need organization-level observation. A result should explain not only the final answer, but also what each role saw, what it proposed, what was accepted, what was rejected, and who made the final trade-off. Without those records, it is hard to know whether an error came from insufficient evidence, role misunderstanding, coordination failure, or permission design.

When orchestration matures, multiple agents can improve reliability on complex tasks. The structure lets different capabilities cooperate inside boundaries, separates review from execution, and prevents local exploration from becoming a global decision too quickly. All of this depends on the harness turning organizational structure into engineering structure instead of letting several models freely compete on the same problem.
