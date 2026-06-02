## Runtime Is the Control Layer

Runtime control determines how an agent moves from intent to action. The model can propose a plan, but the system must decide how the plan is executed, when execution pauses, when it retries, when it escalates to a human, and when it stops. Without runtime control, the agent behaves like a stream of generated text. With runtime control, the agent becomes a system process that can be scheduled, constrained, and recovered.

Runtime is also where uncertainty is absorbed. Tool failure, insufficient context, changing user intent, lower model confidence, and restricted permission all need handling during execution. Putting these cases into a prompt can create a linguistic tendency, but it does not create a reliable mechanism. The harness has to represent planning, execution, waiting, recovery, and stopping as explicit states.

## A Plan Is Not Execution

A plan is a hypothesis about future action, not the action itself. A reliable agent system separates planning from execution and allows the system to recheck environment, permission, and objective before each step. A model-generated plan can be a candidate path, but the candidate path must pass runtime validation before it becomes a real tool call or external side effect.

This separation lets the system remain stable under change. Context may update during a run, tool results may invalidate earlier assumptions, the user may introduce a new constraint, and one failed step may require a different order. Runtime control does not prevent the model from completing work. It keeps model reasoning continuously exposed to feedback from the real environment.

## Recovery Sets the Reliability Ceiling

The ceiling of system reliability is often determined by recovery. An agent that only runs on the ideal path cannot operate in production conditions, because real environments contain timeouts, conflicts, denied permissions, malformed data, and partial success. The runtime must recognize these states and choose whether to retry, degrade, ask, roll back, or stop.

Recovery is not an afterthought after failure. It should be part of runtime design. Before each action, the system should know what failure would mean. After each state change, it should know whether the objective still holds. At termination, it should explain why execution ended. This control layer allows the agent to remain manageable without pretending the world always behaves smoothly.
