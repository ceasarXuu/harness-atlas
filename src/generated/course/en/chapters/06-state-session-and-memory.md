## Continuity Comes From State

An agent system does not become continuous merely because it stores more conversation. Real continuity comes from state management, which means the system knows the current goal, the actions already taken, the assumptions that still hold, the failures that have appeared, and the resources that have changed. Memory can provide background, but state determines what the next step in a run should be.

If the system hands all continuity to long context or long-term memory, the agent gradually loses explainability. The model may cite outdated information, confuse historical preference with current fact, or move a decision that once worked into an environment where it no longer applies. The harness needs to separate state, session, and memory so each kind of continuity has its own lifecycle and confidence level.

## Session Defines the Time Boundary

A session is the time container for one run or a related group of runs. It holds user intent, interaction history, temporary decisions, and the current working surface, but it should not become unlimited fact storage. When the session boundary is clear, the system knows what belongs only to the current task, what deserves durable preservation, and what should be discarded or weakened after the task ends.

Many agent failures come from loose session boundaries. Old goals remain inside new tasks, failed attempts are not marked correctly, assumptions rejected by the user continue to influence output, and temporary permission is mistaken for lasting authority. Session management is not about preserving everything. It organizes execution over time so the model sees current valid state rather than a noisy history.

## Memory Requires Governance

Memory is not a warehouse that becomes better as it grows. Useful memory needs source, scope, creation time, expiration conditions, and a reason for use. User preferences, project conventions, past incidents, and domain knowledge may all become memory, but they need selection and verification before they influence agent decisions. Otherwise memory pulls the system away from traceable state and back into unexplained impressions.

The harness requirement for memory is governance, not perfect retention. The system should explain why a memory was written, why it was read in the current run, whether it remains trustworthy, and how it can be corrected when it causes error. Only then does memory become a source of stability rather than a hidden entry point for bias and regression.
