---
chapter: 04
part: "Part II — Core Harness"
title_en: "Context as Information Boundary"
title_zh: "上下文作为信息边界"
subtitle_zh: "Context Engineering 不只是 Prompt Engineering"
subtitle_en: "Context engineering is more than prompt engineering"
language: zh-CN + en
status: article-v2
---

<!-- zh-CN -->
## 上下文决定模型能够看见什么

上下文不是把尽可能多的信息塞进窗口，而是决定模型在一次运行中被允许看见什么。它既是信息供给，也是信息边界。一个 Agent 的判断质量取决于模型能力，也取决于系统给出的证据是否相关、是否及时、是否带有来源、是否经过权限过滤。没有上下文工程，模型只能在噪声和缺口之间猜测。

信息边界会直接改变行为。同样的模型，在只看到用户请求时会倾向于补全假设；在看到相关文件、历史决策和失败记录时会形成更稳健的判断；在看到过量无关材料时又会被噪声拖偏。Harness 需要做的不是无限扩张上下文，而是把可用信息组织成能够支持行动的证据环境。

## 提示词不能替代信息治理

Prompt Engineering 主要关注如何表达任务和约束，Context Engineering 则关注信息从哪里来、怎样被筛选、以什么结构呈现、多久失效、如何追溯。前者影响模型如何理解指令，后者决定模型依据什么理解世界。对 Agent 系统而言，后者往往更接近可靠性的根部。

如果上下文治理缺失，prompt 会被迫承担不属于它的职责。开发者会不断加入“请参考最新文件”“不要使用过期信息”“优先相信仓库内容”之类的语句，却没有真正控制信息入口。更稳健的做法是让系统层管理检索、裁剪、排序、去重、引用和权限，使 prompt 不必用语言暗示来弥补架构空洞。

## 压缩、取舍与可追溯

上下文窗口再大也不是无限空间，取舍不可避免。重要的不是把所有材料都交给模型，而是保留足以支撑判断的证据链。压缩应当保留来源和不确定性，摘要应当说明缺失和冲突，检索结果应当可回到原文。只要证据链断裂，模型就会把系统提供的片段误认为完整事实。

好的信息边界会让 Agent 的结论更可审计。观察者不仅能看到模型最后说了什么，也能看到它基于哪些材料、忽略了哪些材料、材料何时进入上下文、是否经过过滤。这样的上下文设计把推理从一次性文本生成变成可检查的系统过程。

<!-- en -->
## Context Decides What the Model Can See

Context is not the act of filling a window with as much information as possible. It decides what the model is allowed to see during a run. It is both information supply and information boundary. The quality of an agent decision depends on model capability, but it also depends on whether the system provides evidence that is relevant, timely, sourced, and filtered by permission. Without context engineering, the model is left to guess between noise and gaps.

The information boundary changes behavior directly. The same model will fill in assumptions when it only sees a user request. It will reason more steadily when it sees relevant files, prior decisions, and failure records. It can also drift when it sees too much unrelated material. The harness should not expand context without limit. It should organize available information into an evidence environment that can support action.

## Prompts Cannot Replace Information Governance

Prompt engineering focuses on how to express tasks and constraints. Context engineering focuses on where information comes from, how it is selected, how it is structured, when it expires, and how it can be traced. The former affects how the model understands instruction. The latter determines what world the model believes it is reasoning about. For agent systems, the latter is often closer to the root of reliability.

When context governance is absent, prompts are forced to carry responsibilities that do not belong there. Developers keep adding instructions such as referring to the latest file, avoiding outdated information, or trusting repository content first, while the system still does not control the information entrance. A stronger design lets the system layer manage retrieval, trimming, ranking, deduplication, citation, and permission so the prompt does not have to cover architectural gaps through language.

## Compression Needs Traceability

Even a large context window is not infinite, so selection is unavoidable. The goal is not to give the model every piece of material, but to preserve the evidence chain needed for judgment. Compression should preserve source and uncertainty. Summaries should state absence and conflict. Retrieved material should remain connected to the original. Once the evidence chain breaks, the model can mistake a system-provided fragment for the complete fact.

A good information boundary makes agent conclusions more auditable. An observer can see not only what the model finally said, but also which materials it used, which materials it ignored, when those materials entered context, and whether they were filtered. This kind of context design turns reasoning from one-off text generation into an inspectable system process.
