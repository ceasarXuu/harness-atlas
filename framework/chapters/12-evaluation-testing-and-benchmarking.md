---
chapter: 12
part: "Part IV — Trust"
title_en: "Evaluation, Testing and Benchmarking"
title_zh: "评测、测试与基准"
subtitle_zh: "从行为到证据的反馈系统"
subtitle_en: "A feedback system from behavior to evidence"
language: zh-CN + en
status: article-v2
---

<!-- zh-CN -->
## 评测定义系统要变好什么

Agent 系统如果没有评测，就只能依赖主观感觉判断进步。模型输出更流畅不等于系统更可靠，任务完成更快也不等于风险更低。评测的作用是把“变好”拆成可观察证据，使团队知道准确性、完整性、安全性、成本、时延、可解释性和恢复能力分别发生了什么变化。

评测对象也不能只看最终答案。Agent 的行为由上下文选择、工具调用、状态推进、权限判断和模型推理共同构成。只评价最终文本，会漏掉过程中的危险路径；只评价单步工具调用，又会忽略整体任务是否完成。Harness 需要把行为链条纳入证据系统。

## 测试保护工程边界

测试关注的是系统边界是否按预期工作。上下文过滤是否排除了无权限材料，工具调用是否拒绝非法参数，运行时是否在失败后停止或恢复，页面和接口是否保持语言边界，这些都属于可自动验证的工程事实。测试不能替代评测，但它能保护评测之前的基础结构。

Agent 系统尤其需要回归测试，因为模型和周边依赖都会变化。一次 prompt 调整、一个检索策略变化、一个工具升级，都可能改变行为。把关键边界写成测试，可以让团队在能力演化时及时发现破坏，而不是等用户遇到失败后再解释。

## 基准提供外部参照

基准让系统表现可以和外部任务集、历史版本或替代方案比较。它不能代表全部真实场景，却能提供稳定参照，避免团队只在最近几个样例上判断趋势。好的基准应当覆盖典型任务、困难任务和高风险任务，并清楚说明它不能覆盖什么。

评测、测试和基准共同构成反馈系统。评测回答目标是否变好，测试回答边界是否仍然成立，基准回答变化是否具有可比较意义。Agent Harness 需要这三类证据同时存在，才能把模型行为从偶然表现转化为可管理的系统质量。

<!-- en -->
## Evaluation Defines What Improvement Means

An agent system without evaluation can only judge progress by impression. More fluent model output does not necessarily mean the system is more reliable, and faster completion does not necessarily mean lower risk. Evaluation turns improvement into observable evidence so the team can see what changed in accuracy, completeness, safety, cost, latency, explainability, and recovery.

The target of evaluation cannot be the final answer alone. Agent behavior is jointly produced by context selection, tool calls, state advancement, permission decisions, and model reasoning. Judging only the final text misses dangerous process paths. Judging only a single tool call misses whether the whole task was completed. The harness needs to bring the behavior chain into the evidence system.

## Testing Protects Engineering Boundaries

Testing asks whether system boundaries behave as expected. Context filtering should exclude unauthorized material, tool invocation should reject illegal parameters, runtime should stop or recover after failure, and pages or APIs should preserve language boundaries. These are engineering facts that can be automatically verified. Testing does not replace evaluation, but it protects the structure that evaluation depends on.

Agent systems especially need regression testing because models and surrounding dependencies change. A prompt adjustment, a retrieval strategy change, or a tool upgrade can alter behavior. Encoding key boundaries as tests lets the team notice damage while capability evolves, rather than waiting until users encounter failures and asking for an explanation afterward.

## Benchmarks Provide External Reference

Benchmarks make system behavior comparable against external task sets, historical versions, or alternative designs. They cannot represent every real scenario, but they provide a stable reference point that prevents teams from judging trends only from the most recent examples. Good benchmarks include common tasks, difficult tasks, and high-risk tasks, while stating clearly what they do not cover.

Evaluation, testing, and benchmarking form a feedback system together. Evaluation asks whether the target quality improved, testing asks whether boundaries still hold, and benchmarking asks whether the change has comparable meaning. An Agent Harness needs all three kinds of evidence to turn model behavior from occasional performance into manageable system quality.
