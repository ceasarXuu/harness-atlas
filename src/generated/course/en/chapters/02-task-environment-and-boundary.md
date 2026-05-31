## A Task Is Not a Sentence

Agent design often begins with a natural-language request, but engineering design cannot stop at that sentence. A task has to be understood as a combination of goal, constraints, inputs, outputs, failure conditions, and acceptable action range. If the request is simply handed to the model, the model fills in missing structure with hidden assumptions. When the task is written as an engineering object, the system has to state what completion means, what counts as overreach, what information may be used, and when action must stop.

The more ambiguous the task is, the freer the agent appears and the riskier it becomes. The model will use linguistic plausibility to fill boundary gaps, expand its action range when environment constraints are absent, and chase surface completeness when completion criteria are unclear. A good harness does not start by increasing model power. It first narrows the task so that model openness serves a defined objective instead of replacing the objective.

## Environment Defines What Action Means

The environment is not background scenery. It is the operating field that the agent can perceive and change. File systems, repositories, browsers, databases, messaging systems, ticketing tools, and user sessions all change the meaning of a task. The same request to fix a problem means diagnosis in a read-only document environment, modification in a writable code environment, and approval, rollback, and audit in a production environment.

Environment modeling therefore has to precede action design. The system must know which objects are visible, which objects are writable, which interfaces create external effects, which information represents fact, and which information is only model inference. The more complex the environment becomes, the less boundaries can rely on conversational understanding. The harness has to make the observable range and action range explicit, or the agent will cross product and safety boundaries while following reasoning that appears locally reasonable.

## Boundaries Turn Openness Into Engineering

Boundaries do not weaken an agent. They make the agent usable under trust. Information boundaries define what the model may see, action boundaries define what the system may change, time boundaries define how long a run may continue, permission boundaries define which side effects require confirmation, and quality boundaries define what result can be delivered. When boundaries are clear, the model can reason deeply inside them. When boundaries are vague, even strong reasoning becomes uncontrolled exploration.

The first question for an Agent Harness is not whether the model can do something. The first question is where, how, and under what authority the system permits the model to act. That order changes the architecture. Defining task, environment, and boundary first makes it possible to decide what context, tools, runtime controls, and evaluation evidence are needed. Starting with capability alone produces automation that is difficult to explain.
