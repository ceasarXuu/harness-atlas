export const locales = ["zh-CN", "en"];

export const navModel = [
  { key: "home", href: { "zh-CN": "./", en: "./" } },
  { key: "course", href: { "zh-CN": "course.html", en: "course.html" } },
  { key: "atlas", href: { "zh-CN": "products.html", en: "products.html" } },
  { key: "locale", href: { "zh-CN": "en.html", en: "index.html" } },
  {
    key: "github",
    href: {
      "zh-CN": "https://github.com/ceasarXuu/harness-atlas",
      en: "https://github.com/ceasarXuu/harness-atlas",
    },
  },
];

export const localeMessages = {
  "zh-CN": {
    aria: {
      brand: "Harness Atlas 首页",
      nav: "主导航",
    },
    nav: {
      home: "首页",
      course: "学习",
      atlas: "生态",
      locale: "EN",
      github: "GitHub",
    },
  },
  en: {
    aria: {
      brand: "Harness Atlas Home",
      nav: "Main navigation",
    },
    nav: {
      home: "HOME",
      course: "COURSE",
      atlas: "ATLAS",
      locale: "中文",
      github: "GITHUB",
    },
  },
};

export function getNav(locale) {
  const messages = localeMessages[locale];
  if (!messages) throw new Error(`Unsupported locale: ${locale}`);

  return navModel.map((item) => ({
    key: item.key,
    href: item.href[locale],
    label: messages.nav[item.key],
  }));
}

export const navByLocale = Object.fromEntries(
  locales.map((locale) => [locale, getNav(locale)]),
);

export const prefetchRoutes = [
  "course.html",
  "course-01.html",
  "products.html",
  "timeline.html",
];

export const courseLessons = [
  {
    key: "course-00",
    num: "00",
    title: "学习路线",
    href: "course.html",
    body: "把 Agent Harness 的学习分成基础概念、核心组件、工程实践和生态演进四个阶段。",
  },
  {
    key: "course-01",
    num: "01",
    title: "Agent Harness 定义",
    href: "course-01.html",
    body: "厘清概念边界、核心组成与常见误区，先判断什么是 Harness、什么只是一次性提示或工具调用。",
  },
  {
    key: "course-02",
    num: "02",
    title: "Context Engineering",
    href: "course-02.html",
    body: "学习上下文选择、压缩、注入与刷新机制，理解 Harness 如何把项目事实稳定交给模型。",
  },
  {
    key: "course-03",
    num: "03",
    title: "Tools and MCP",
    href: "course-03.html",
    body: "梳理工具协议、Schema、权限和失败恢复，把外部能力变成可审计、可回放、可治理的接口。",
  },
  {
    key: "course-04",
    num: "04",
    title: "Skills and Workflows",
    href: "course-04.html",
    body: "理解可复用能力、工作流封装和迁移方式，把一次经验沉淀为可以重复调用的任务能力。",
  },
  {
    key: "course-05",
    num: "05",
    title: "State, Memory and Session",
    href: "course-05.html",
    body: "处理长任务状态、项目记忆和会话连续性，让 Agent 能在多轮协作里保留判断依据和任务进度。",
  },
  {
    key: "course-06",
    num: "06",
    title: "Planning and Execution Loop",
    href: "course-06.html",
    body: "拆解计划、行动、观察、修正的闭环，理解 Harness 如何把开放目标变成可验证步骤。",
  },
  {
    key: "course-07",
    num: "07",
    title: "Multi-agent Orchestration",
    href: "course-07.html",
    body: "学习多 Agent 分工、委派和协作边界，避免并行任务在上下文、权限和结果合并上失控。",
  },
  {
    key: "course-08",
    num: "08",
    title: "Evaluation and Benchmark",
    href: "course-08.html",
    body: "建立衡量 Harness 质量的方法，把测试、评审、Benchmark 和运行时信号组合成评估闭环。",
  },
  {
    key: "course-09",
    num: "09",
    title: "Security, Permission and Governance",
    href: "course-09.html",
    body: "设计安全边界、审计、风险和组织治理，让 Agent 能进入真实工程系统而不突破控制面。",
  },
  {
    key: "course-10",
    num: "10",
    title: "Product Architecture",
    href: "course-10.html",
    body: "观察 Harness 产品形态和工程集成架构，理解 IDE、终端、云端和团队平台各自的系统取舍。",
  },
  {
    key: "course-11",
    num: "11",
    title: "Future of Harness",
    href: "course-11.html",
    body: "跟踪 Agent Harness 生态的长期演进，连接协议标准、产品能力、组织流程和行业动态。",
  },
];

export const learningOther = [
  { key: "glossary", eyebrow: "其他", label: "术语表", href: "course-other-glossary.html" },
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
    ["course.html", "路线", "学习路线", "把课程拆成入门、核心、运行机制和系统治理几个阶段。"],
    ["course-01.html", "课程", "第 1 课", "从 Agent Harness 定义开始，按照课程目录逐课进入。"],
    ["course-other-glossary.html", "其他", "术语表", "统一 Agent、Harness、Tool、Skill、MCP 等概念边界。"],
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

export const learningRoadmap = [
  ["入门", "基础概念", "先建立 Agent Harness 的边界、价值和核心组成。"],
  ["核心", "运行组件", "集中理解上下文、工具、状态、记忆和执行循环。"],
  ["工程", "系统实践", "把模式、协议、评估和治理连接到真实开发流程。"],
  ["演进", "未来方向", "跟踪行业动态、产品形态和标准生态的长期变化。"],
];

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
