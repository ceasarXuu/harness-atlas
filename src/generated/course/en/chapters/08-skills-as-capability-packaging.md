## Skills Preserve Repeatable Capability

The value of a skill is not storing a longer prompt. It is preserving the stable method behind a class of tasks as reusable capability. A successful agent run may depend on the right background, suitable tools, implicit steps, and experienced error handling. If those elements remain only in human memory or a one-off conversation, the system cannot accumulate capability.

Capability packaging means keeping task scope, input and output shape, tool dependencies, permission boundaries, execution strategy, exception handling, and quality evidence inside one semantic unit. When the agent faces a similar task, it does not have to invent the path again, and the system can judge where the capability applies, where it should refuse, and where it should degrade.

## Reuse Needs Boundaries

The more reusable a skill becomes, the more clearly its boundary must be stated. Overgeneralization makes one capability cover too many tasks until it becomes a vague instruction bundle. Excessive narrowness prevents the system from transferring experience. Good packaging holds the tension between the two by fixing the stable parts and leaving the judgment-sensitive parts to runtime.

Reuse risk also comes from changes in authority and environment. A skill that behaves well in a low-risk setting should not automatically move into a high-risk setting because the name looks familiar. A capability built around local files should not naturally migrate to a production database. The harness should treat a skill as a constrained capability package, not as an unconditional shortcut.

## Packaged Capability Must Be Evaluated

A skill that cannot be evaluated is only another hidden prompt. The system should observe its success rate, failure shape, permission use, context dependency, and output quality on its target task family, while preserving version relationships as the capability evolves. Without that evidence, changes to a skill become untraceable behavior drift.

Placing skills inside the harness turns capability accumulation into an engineering process. A skill converts one-time experience into a reusable unit, while boundaries, permissions, and evaluation prevent reuse from becoming uncontrolled. The model still performs reasoning, but the system starts to own capability assets that can be governed and evolved.
