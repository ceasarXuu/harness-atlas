## Context Decides What the Model Can See

Context is not the act of filling a window with as much information as possible. It decides what the model is allowed to see during a run. It is both information supply and information boundary. The quality of an agent decision depends on model capability, but it also depends on whether the system provides evidence that is relevant, timely, sourced, and filtered by permission. Without context engineering, the model is left to guess between noise and gaps.

The information boundary changes behavior directly. The same model will fill in assumptions when it only sees a user request. It will reason more steadily when it sees relevant files, prior decisions, and failure records. It can also drift when it sees too much unrelated material. The harness should not expand context without limit. It should organize available information into an evidence environment that can support action.

## Prompts Cannot Replace Information Governance

Prompt engineering focuses on how to express tasks and constraints. Context engineering focuses on where information comes from, how it is selected, how it is structured, when it expires, and how it can be traced. The former affects how the model understands instruction. The latter determines what world the model believes it is reasoning about. For agent systems, the latter is often closer to the root of reliability.

When context governance is absent, prompts are forced to carry responsibilities that do not belong there. Developers keep adding instructions such as referring to the latest file, avoiding outdated information, or trusting repository content first, while the system still does not control the information entrance. A stronger design lets the system layer manage retrieval, trimming, ranking, deduplication, citation, and permission so the prompt does not have to cover architectural gaps through language.

## Compression Needs Traceability

Even a large context window is not infinite, so selection is unavoidable. The goal is not to give the model every piece of material, but to preserve the evidence chain needed for judgment. Compression should preserve source and uncertainty. Summaries should state absence and conflict. Retrieved material should remain connected to the original. Once the evidence chain breaks, the model can mistake a system-provided fragment for the complete fact.

A good information boundary makes agent conclusions more auditable. An observer can see not only what the model finally said, but also which materials it used, which materials it ignored, when those materials entered context, and whether they were filtered. This kind of context design turns reasoning from one-off text generation into an inspectable system process.
