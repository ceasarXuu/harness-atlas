## Multi-agent Design Starts With Division of Labor

The core of multi-agent orchestration is not having more models speak at the same time. It is decomposing task responsibility into manageable roles. Research, planning, execution, review, coordination, and recording may be handled by different agents, but the split improves quality only when responsibility, inputs, outputs, and decision authority are clear. Otherwise multi-agent design spreads the uncertainty of one model into group noise.

Division of labor must serve the structure of the task. Some tasks are better handled by a single agent because context is concentrated and the action chain is short. Other tasks need multiple agents because evidence is distributed, judgment dimensions conflict, or execution surfaces are independent. The harness decides when organizational structure is needed instead of treating more agents as a default upgrade path.

## Mainstream Architectures Start With Control

The key question in a multi-agent architecture is not “how many agents are running.” It is four control questions: who owns task state, who owns the final answer, whether agents exchange raw context or compressed evidence, and who rolls back, retries, or arbitrates failure. Product names and framework APIs change, but these control relationships are more stable.

Manager, supervisor, and handoff patterns all manage ownership. A main agent or coordinator may own the global goal, task state, and final output while calling research, retrieval, coding, testing, review, or analysis specialists as bounded capabilities; the current owner may also transfer control to another agent based on intent, context, or permission boundary. The first pattern fits complex tasks that still need a unified voice, such as engineering decomposition, research reports, and long-horizon delivery. The second fits clearly separated branches such as billing, refunds, technical support, legal, finance, or operations. A real handoff does not merely change the speaking role; it transfers task state, permissions, context summary, and exit conditions.

Graph, workflow, and parallel subagent patterns manage process and parallelism. Agents can become graph nodes while routing, retries, conditional branches, parallelism, and aggregation become explicit; independent reading, testing, review, or exploration work can also be delegated to several subagents before the coordinator receives summaries, evidence, and recommendations. This helps repository exploration, log analysis, test failure triage, document reading, and candidate collection, but the risks are write conflicts, duplicated search, higher cost, and locally correct outputs that cannot be merged globally.

Role-based, critic, and protocol patterns manage organizational lenses, review authority, and system boundaries. Roles such as product manager, architect, engineer, tester, security reviewer, and code reviewer become useful only when their inputs, outputs, acceptance criteria, and veto rights are explicit. Critics, judges, or arbiters become useful only when they can use external evidence, tests, rules, or human review rather than merely wrapping another model’s bias. When systems collaborate through MCP, A2A, APIs, message queues, or event buses, the hard questions shift to identity, permissions, data boundaries, auditability, and accountability.

Many tasks do not need more agents. They need better context selection, tool design, memory, planning methods, and evaluation loops. This is the necessary baseline for every multi-agent proposal: if a single agent with clean context can complete the task reliably, do not add organizational overhead. A more production-oriented hybrid is often “centralized harness + task graph + local parallel subagents,” where the main agent owns the task map, task nodes hold local goals and evidence, edges represent dependency, order, and merge rules, and subagents execute only inside bounded nodes.

## Coordination Matters More Than Count

The hard part of multi-agent systems is coordination. Roles need rules for what information they exchange, who holds final decision authority, how conflicts are resolved, how duplicate work is avoided, how failure is attributed, and how run records are merged. Without coordination, multiple agents cite one another, amplify shared assumptions, and produce results that look rich but are difficult to own.

Good orchestration limits communication and authority. Each agent does not need all information, and each agent does not need all tools. The coordinator should not merely concatenate outputs. It should maintain task state, conflicting evidence, and the decision path. The value of multi-agent design comes from structured collaboration, not from output volume.

## Organization Requires Observation

Multi-agent systems resemble organizations, and therefore need organization-level observation. A result should explain not only the final answer, but also what each role saw, what it proposed, what was accepted, what was rejected, and who made the final trade-off. Without those records, it is hard to know whether an error came from insufficient evidence, role misunderstanding, coordination failure, or permission design.

When orchestration matures, multiple agents can improve reliability on complex tasks. The structure lets different capabilities cooperate inside boundaries, separates review from execution, and prevents local exploration from becoming a global decision too quickly. All of this depends on the harness turning organizational structure into engineering structure instead of letting several models freely compete on the same problem.
