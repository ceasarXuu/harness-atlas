export const zhNav = [
  { href: "./", label: "首页" },
  { href: "course.html", label: "学习" },
  { href: "products.html", label: "图谱" },
  { href: "./#search", label: "搜索" },
  { href: "en.html", label: "EN" },
  { href: "https://github.com/ceasarXuu/harness-atlas", label: "GitHub" },
];

export const enNav = [
  { href: "./", label: "HOME" },
  { href: "course.html", label: "COURSE" },
  { href: "products.html", label: "PRODUCTS" },
  { href: "standards.html", label: "STANDARDS" },
  { href: "patterns.html", label: "PATTERNS" },
  { href: "research.html", label: "RESEARCH" },
  { href: "timeline.html", label: "TIMELINE" },
  { href: "references.html", label: "REFERENCES" },
  { href: "index.html", label: "中文" },
  { href: "https://github.com/ceasarXuu/harness-atlas", label: "GITHUB" },
];

export const prefetchRoutes = [
  "course.html",
  "products.html",
  "timeline.html",
];

export const courseModules = [
  ["00", "引言", "为什么 Agent Harness 重要。"],
  ["01", "Agent Harness 定义", "概念边界、核心组成与常见误区。"],
  ["02", "Context Engineering", "上下文选择、压缩、注入与刷新机制。"],
  ["03", "Tools and MCP", "工具协议、Schema、权限和失败恢复。"],
  ["04", "Skills and Workflows", "可复用能力、工作流封装和迁移。"],
  ["05", "State, Memory and Session", "长任务状态、记忆和会话连续性。"],
  ["06", "Planning and Execution Loop", "计划、行动、观察、修正的闭环。"],
  ["07", "Multi-agent Orchestration", "多 Agent 分工、委派和协作边界。"],
  ["08", "Evaluation and Benchmark", "如何衡量 Harness 的质量与有效性。"],
  ["09", "Security, Permission and Governance", "安全边界、审计、风险和组织治理。"],
  ["10", "Product Architecture", "Harness 产品形态和工程集成架构。"],
  ["11", "Future of Harness", "Agent Harness 生态的长期演进。"],
];

export const updates = [
  {
    year: "2026",
    title: "Coding Agent 产品能力变化",
    body: "关注上下文、工具调用、任务状态、权限控制和评估闭环的新能力。",
    tag: "产品更新",
    href: "timeline.html",
  },
  {
    year: "2026",
    title: "MCP、Skills 与 Tool Calling 生态进展",
    body: "观察协议、可迁移能力格式和工具接入方式如何影响 Harness 架构。",
    tag: "协议生态",
    href: "timeline.html",
  },
  {
    year: "2026",
    title: "Agent 评估与基准研究",
    body: "把评估方法、实验结论和局限沉淀为可复用的学习资料。",
    tag: "研究进展",
    href: "research.html",
  },
];

export const homeSections = {
  learn: [
    ["course.html", "课程", "主线课程", "按照定义、组件、运行、评估、治理和未来方向系统学习。"],
    ["course.html", "路线", "学习路线", "把课程拆成入门、核心、运行机制和系统治理几个阶段。"],
    ["course.html#glossary", "术语", "术语表", "统一 Agent、Harness、Tool、Skill、MCP 等概念边界。"],
    ["patterns.html", "实践", "实践检查清单", "把设计模式转化为可落地、可复用、可验证的工程检查项。"],
  ],
  atlas: [
    ["products.html", "产品", "产品图谱", "整理 Coding Agent、框架、平台和横向能力矩阵。"],
    ["standards.html", "协议", "标准协议", "沉淀 MCP、AGENTS.md、Skills、Tool Calling 等接口规范。"],
    ["patterns.html", "模式", "设计模式", "把产品拆解和工程经验抽象成可复用 Harness 模式。"],
    ["course.html", "架构", "核心组件", "从上下文、工具、状态、记忆、规划、评估和治理理解系统组成。"],
  ],
  evidence: [
    ["research.html", "研究", "研究资料", "收集论文、实验、理论和研究卡片。"],
    ["references.html", "参考", "参考资料", "维护官方文档、论文、博客和 Changelog 原始索引。"],
  ],
};

export const glossaryTerms = [
  ["AGENT", "Agent", "基于模型、上下文、工具和反馈执行任务的行为主体。"],
  ["HARNESS", "Harness", "围绕 Agent 构建的运行时、控制、编排和治理层。"],
  ["TOOL", "Tool", "暴露给 Agent 的外部能力，例如 Shell、文件、浏览器或 API。"],
  ["SKILL", "Skill", "可复用任务能力封装，包含触发条件、步骤、资源和示例。"],
  ["MCP", "MCP", "连接 AI 应用、工具、资源和外部系统的协议层。"],
  ["SUB", "Subagent", "在主 Agent 或 Harness 编排下执行局部任务的 Agent。"],
];

export const sectionPages = {
  products: {
    title: "产品图谱 · Harness Atlas",
    description: "Agent Harness 相关产品、框架和工具生态。",
    kicker: "产品图谱 / ECOSYSTEM",
    heading: "产品生态入口",
    intro: "整理 Agent Harness 相关产品、框架和工具生态。这里不做泛泛产品评测，而关注每个产品体现了什么 Harness 设计。",
    footer: "HARNESS_ATLAS / 产品图谱",
    cards: [
      ["产品", "Coding Agent 产品", "Codex、Claude Code、OpenCode 等研发工作流产品。"],
      ["框架", "框架与 SDK", "Agent 框架、开发 SDK 与运行时抽象。"],
      ["对比", "能力对比", "横向对比上下文、工具、权限、状态和集成能力。"],
      ["交互", "交互形态", "IDE、终端、桌面、Web Cloud 等交互表面。"],
    ],
  },
  standards: {
    title: "标准与协议 · Harness Atlas",
    description: "Agent Harness 相关标准、协议和接口规范。",
    kicker: "标准协议 / PROTOCOLS",
    heading: "协议层目录",
    intro: "整理 Agent Harness 相关的标准、协议、接口规范和可迁移能力格式，重点关注相对稳定的协议层和抽象层。",
    footer: "HARNESS_ATLAS / 标准协议",
    cards: [
      ["MCP", "Model Context Protocol", "工具和资源接入的标准化接口。"],
      ["AGENTS", "AGENTS.md", "项目级 Agent 指令、约束和工作流说明。"],
      ["SKILLS", "Skills", "可复用能力格式、触发条件和迁移规则。"],
      ["TOOLS", "Tool Calling", "Schema、函数调用、错误处理和可观测性。"],
      ["MULTI", "Multi-agent", "Handoff、agent-as-tool、supervisor-worker 等协作协议。"],
    ],
  },
  patterns: {
    title: "设计模式 · Harness Atlas",
    description: "Agent Harness 可复用设计模式。",
    kicker: "设计模式 / REUSABLE DESIGN",
    heading: "模式族",
    intro: "沉淀 Agent Harness 的可复用设计模式，连接产品拆解、研究资料、实验结果和工程实践。",
    footer: "HARNESS_ATLAS / 设计模式",
    cards: [
      ["上下文", "上下文", "上下文选择、压缩、刷新和边界控制。"],
      ["工具", "工具系统", "工具调用、权限控制、错误恢复和日志。"],
      ["执行", "执行闭环", "计划执行循环、任务状态和交付闭环。"],
      ["MULTI", "Multi-agent", "多 Agent 协作、委派、汇总和冲突控制。"],
      ["评估", "评估体系", "测试、Benchmark、人工审查和指标体系。"],
      ["治理", "治理机制", "安全、权限、审计、成本和合规治理。"],
    ],
  },
  research: {
    title: "研究资料 · Harness Atlas",
    description: "Agent Harness 相关理论研究、论文、实验和报告。",
    kicker: "研究资料 / EVIDENCE",
    heading: "研究入口",
    intro: "收集 Agent Harness 相关的理论研究、论文、实验和报告，并沉淀为问题、方法、结论、局限清晰的研究卡片。",
    footer: "HARNESS_ATLAS / 研究资料",
    cards: [
      ["PAPERS", "论文与报告", "论文、技术报告、研究文章和预印本。"],
      ["EXPERIMENTS", "实验", "可复现实验、对比实验和 A/B 测试设计。"],
      ["THEORY", "理论基础", "控制论、软件工程、人机协作和分布式系统。"],
      ["CARDS", "研究卡片", "把结论、局限和可复用观点结构化沉淀。"],
    ],
  },
  timeline: {
    title: "行业进展时间线 · Harness Atlas",
    description: "Agent Harness 相关行业进展时间线。",
    kicker: "行业动态 / INDUSTRY SIGNALS",
    heading: "收录范围",
    intro: "按时间记录 Agent Harness 相关行业进展，只收录影响 Harness 形态、协议、产品能力、工程实践或生态格局的事件。",
    footer: "HARNESS_ATLAS / 行业动态",
    cards: [
      ["产品", "Coding Agent 更新", "影响上下文、工具、权限、执行和评估方式的重要功能。"],
      ["协议", "协议与框架", "MCP、Skills、Tools、Multi-agent 等协议或框架进展。"],
      ["研究", "研究与实验", "重要研究文章、技术报告和实验结果。"],
      ["生态", "生态变化", "影响 Harness 生态的集成、平台和标准变化。"],
    ],
  },
  references: {
    title: "参考资料 · Harness Atlas",
    description: "Agent Harness 相关原始资料索引。",
    kicker: "参考资料 / SOURCE INDEX",
    heading: "资料索引",
    intro: "维护 Agent Harness 相关原始资料索引。References 保存原始链接和资料索引；Research 对资料进行阅读、摘要和分析。",
    footer: "HARNESS_ATLAS / 参考资料",
    cards: [
      ["文档", "官方文档", "Agent 产品、框架、协议和平台官方文档。"],
      ["论文", "论文索引", "论文、预印本和技术报告索引。"],
      ["博客", "技术博客", "技术博客、工程文章和产品文章。"],
      ["日志", "更新日志", "产品更新日志、官方博客和文档更新页。"],
    ],
  },
};
