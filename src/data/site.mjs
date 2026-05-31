export const locales = ["zh-CN", "en"];

export const githubStars = 0;

export const navModel = [
  { key: "home", href: { "zh-CN": "./", en: "./" } },
  { key: "course", href: { "zh-CN": "course-01.html", en: "course-01.html" } },
  { key: "atlas", href: { "zh-CN": "products.html", en: "products.html" } },
  { key: "locale", href: { "zh-CN": "en.html", en: "index.html" } },
  {
    key: "github",
    href: {
      "zh-CN": "https://github.com/ceasarXuu/harness-atlas",
      en: "https://github.com/ceasarXuu/harness-atlas",
    },
    external: true,
    stat: { value: githubStars },
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
    navStats: {
      github: "GitHub stars",
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
    navStats: {
      github: "GitHub stars",
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
    external: item.external ?? false,
    stat: item.stat
      ? {
          ...item.stat,
          label: messages.navStats[item.key],
        }
      : undefined,
  }));
}

export const navByLocale = Object.fromEntries(
  locales.map((locale) => [locale, getNav(locale)]),
);

export const prefetchRoutes = [
  "course-01.html",
  "products.html",
  "timeline.html",
];

export const courseLessons = [
  {
    key: "course-01",
    num: "01",
    title: "Why Agent Harness / 为什么需要 Agent Harness",
    href: "course-01.html",
    body: "从 Prompt 到工程系统 / From prompting to engineering systems",
  },
  {
    key: "course-02",
    num: "02",
    title: "Task, Environment and Boundary / 任务、环境与边界",
    href: "course-02.html",
    body: "先设计问题，再设计 Agent / Design the problem before designing the agent",
  },
  {
    key: "course-03",
    num: "03",
    title: "Minimal Harness / 最小 Agent Harness",
    href: "course-03.html",
    body: "一个 Agent Harness 的最小闭环 / The minimal closed loop of an Agent Harness",
  },
  {
    key: "course-04",
    num: "04",
    title: "Context as Information Boundary / 上下文作为信息边界",
    href: "course-04.html",
    body: "Context Engineering 不只是 Prompt Engineering / Context engineering is more than prompt engineering",
  },
  {
    key: "course-05",
    num: "05",
    title: "Tools and MCP as Action Boundary / 工具与 MCP 作为动作边界",
    href: "course-05.html",
    body: "工具不是插件，而是受控副作用 / Tools are not plugins; they are controlled side effects",
  },
  {
    key: "course-06",
    num: "06",
    title: "State, Session and Memory / 状态、会话与记忆",
    href: "course-06.html",
    body: "连续性不是记住更多，而是管理状态 / Continuity is state management, not remembering more",
  },
  {
    key: "course-07",
    num: "07",
    title: "Runtime Control / 运行时控制",
    href: "course-07.html",
    body: "规划、执行与恢复 / Planning, execution, and recovery",
  },
  {
    key: "course-08",
    num: "08",
    title: "Skills as Capability Packaging / 技能作为能力封装",
    href: "course-08.html",
    body: "从一次性动作到可复用能力单元 / From one-off action to reusable capability unit",
  },
  {
    key: "course-09",
    num: "09",
    title: "Workflows as Deterministic Scaffolding / 工作流作为确定性支架",
    href: "course-09.html",
    body: "把确定性留给代码，把不确定性留给模型 / Leave determinism to code and uncertainty to the model",
  },
  {
    key: "course-10",
    num: "10",
    title: "Multi-agent Orchestration / 多 Agent 编排",
    href: "course-10.html",
    body: "多 Agent 是组织设计，不是堆更多 Agent / Multi-agent design is organizational design, not more agents",
  },
  {
    key: "course-11",
    num: "11",
    title: "Observability and Debugging / 可观测性与调试",
    href: "course-11.html",
    body: "让 Agent Run 可见、可回放、可解释 / Make agent runs visible, replayable, and explainable",
  },
  {
    key: "course-12",
    num: "12",
    title: "Evaluation, Testing and Benchmarking / 评测、测试与基准",
    href: "course-12.html",
    body: "从行为到证据的反馈系统 / A feedback system from behavior to evidence",
  },
  {
    key: "course-13",
    num: "13",
    title: "Security, Permissions and Governance / 安全、权限与治理",
    href: "course-13.html",
    body: "限制 Agent 的权力 / Limit the agent’s power",
  },
  {
    key: "course-14",
    num: "14",
    title: "Production Architecture / 生产架构",
    href: "course-14.html",
    body: "从 Demo 到可交付系统 / From demo to deliverable system",
  },
  {
    key: "course-15",
    num: "15",
    title: "Patterns, Anti-patterns and Future / 模式、反模式与未来",
    href: "course-15.html",
    body: "设计原则、反模式与未来方向 / Design principles, anti-patterns, and future directions",
  },
];

export const learningOther = [
  { key: "glossary", eyebrow: "其他", label: "Bilingual Glossary / 中英术语表", href: "course-other-glossary.html" },
];

export const learningChrome = {
  "zh-CN": {
    footerLeft: "HARNESS_ATLAS / 学习",
    footerRight: "CC BY 4.0 + MIT",
    sidebarAria: "学习目录",
    sidebarKicker: "学习目录",
    directoryAria: "学习页目录导航",
    otherGroup: "其他",
    previousLabel: "上一节",
    nextLabel: "下一节",
  },
};

export function getLearningPager(activeKey) {
  const sequence = [
    ...courseLessons.map((lesson) => ({
      key: lesson.key,
      href: lesson.href,
      title: lesson.title,
    })),
    ...learningOther.map((item) => ({
      key: item.key,
      href: item.href,
      title: item.label,
    })),
  ];
  const index = sequence.findIndex((item) => item.key === activeKey);
  if (index === -1) return {};

  return {
    previous: sequence[index - 1],
    next: sequence[index + 1],
  };
}

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
    ["course-01.html", "课程", "第 1 课", "从 Why Agent Harness 开始，按照正式课程目录逐课进入。"],
    ["course-other-glossary.html", "其他", "术语表", "统一 Agent、Harness、Tool、Skill、MCP 等概念边界。"],
  ],
  atlas: [
    ["products.html", "产品", "产品图谱", "整理 Coding Agent、框架、平台和横向能力矩阵。"],
    ["standards.html", "协议", "标准协议", "沉淀 MCP、AGENTS.md、Skills、Tool Calling 等接口规范。"],
    ["patterns.html", "模式", "设计模式", "把产品拆解和工程经验抽象成可复用 Harness 模式。"],
    ["course-03.html", "架构", "核心组件", "从最小 Harness、上下文、工具、状态、运行时、评测和治理理解系统组成。"],
  ],
  evidence: [
    ["research.html", "研究", "研究资料", "收集论文、实验、理论和研究卡片。"],
    ["references.html", "参考", "参考资料", "维护官方文档、论文、博客和 Changelog 原始索引。"],
  ],
};

export const courseLessonPages = courseLessons.map((lesson) => {
  return {
    key: lesson.key,
    locale: "zh-CN",
    title: `${lesson.title} · Harness Atlas`,
    description: `Harness Atlas ${lesson.title}。`,
    kicker: `学习 / ${lesson.title}`,
    heading: lesson.title,
    intro: lesson.body,
    compact: true,
  };
});

export function getCourseLessonPage(key) {
  const page = courseLessonPages.find((lesson) => lesson.key === key);
  if (!page) throw new Error(`Unknown course lesson: ${key}`);
  return page;
}

export const glossaryPage = {
  active: "glossary",
  locale: "zh-CN",
  title: "术语表 · Harness Atlas",
  description: "Agent Harness 双语术语解释。",
  kicker: "学习 / Bilingual Glossary",
  heading: "Bilingual Glossary / 中英术语表",
  intro: "术语表来自正式课程资源，用于统一 Agent Harness、上下文边界、动作边界、运行时控制、工具网关、技能、工作流、跟踪、评测和最小自主权等核心概念。",
};

export const sectionPages = {
  products: {
    locale: "zh-CN",
    title: "产品图谱 · Harness Atlas",
    description: "Agent Harness 相关产品、框架和工具生态。",
    kicker: "产品图谱 / ECOSYSTEM",
    heading: "产品生态入口",
    intro: "整理 Agent Harness 相关产品、框架和工具生态。这里不做泛泛产品评测，而关注每个产品体现了什么 Harness 设计。",
    footer: "HARNESS_ATLAS / 产品图谱",
    footerRight: "CC BY 4.0 + MIT",
    cards: [
      ["产品", "Coding Agent 产品", "Codex、Claude Code、OpenCode 等研发工作流产品。"],
      ["框架", "框架与 SDK", "Agent 框架、开发 SDK 与运行时抽象。"],
      ["对比", "能力对比", "横向对比上下文、工具、权限、状态和集成能力。"],
      ["交互", "交互形态", "IDE、终端、桌面、Web Cloud 等交互表面。"],
    ],
  },
  standards: {
    locale: "zh-CN",
    title: "标准与协议 · Harness Atlas",
    description: "Agent Harness 相关标准、协议和接口规范。",
    kicker: "标准协议 / PROTOCOLS",
    heading: "协议层目录",
    intro: "整理 Agent Harness 相关的标准、协议、接口规范和可迁移能力格式，重点关注相对稳定的协议层和抽象层。",
    footer: "HARNESS_ATLAS / 标准协议",
    footerRight: "CC BY 4.0 + MIT",
    cards: [
      ["MCP", "Model Context Protocol", "工具和资源接入的标准化接口。"],
      ["AGENTS", "AGENTS.md", "项目级 Agent 指令、约束和工作流说明。"],
      ["SKILLS", "Skills", "可复用能力格式、触发条件和迁移规则。"],
      ["TOOLS", "Tool Calling", "Schema、函数调用、错误处理和可观测性。"],
      ["MULTI", "Multi-agent", "Handoff、agent-as-tool、supervisor-worker 等协作协议。"],
    ],
  },
  patterns: {
    locale: "zh-CN",
    title: "设计模式 · Harness Atlas",
    description: "Agent Harness 可复用设计模式。",
    kicker: "设计模式 / REUSABLE DESIGN",
    heading: "模式族",
    intro: "沉淀 Agent Harness 的可复用设计模式，连接产品拆解、研究资料、实验结果和工程实践。",
    footer: "HARNESS_ATLAS / 设计模式",
    footerRight: "CC BY 4.0 + MIT",
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
    locale: "zh-CN",
    title: "研究资料 · Harness Atlas",
    description: "Agent Harness 相关理论研究、论文、实验和报告。",
    kicker: "研究资料 / EVIDENCE",
    heading: "研究入口",
    intro: "收集 Agent Harness 相关的理论研究、论文、实验和报告，并沉淀为问题、方法、结论、局限清晰的研究卡片。",
    footer: "HARNESS_ATLAS / 研究资料",
    footerRight: "CC BY 4.0 + MIT",
    cards: [
      ["PAPERS", "论文与报告", "论文、技术报告、研究文章和预印本。"],
      ["EXPERIMENTS", "实验", "可复现实验、对比实验和 A/B 测试设计。"],
      ["THEORY", "理论基础", "控制论、软件工程、人机协作和分布式系统。"],
      ["CARDS", "研究卡片", "把结论、局限和可复用观点结构化沉淀。"],
    ],
  },
  timeline: {
    locale: "zh-CN",
    title: "行业进展时间线 · Harness Atlas",
    description: "Agent Harness 相关行业进展时间线。",
    kicker: "行业动态 / INDUSTRY SIGNALS",
    heading: "收录范围",
    intro: "按时间记录 Agent Harness 相关行业进展，只收录影响 Harness 形态、协议、产品能力、工程实践或生态格局的事件。",
    footer: "HARNESS_ATLAS / 行业动态",
    footerRight: "CC BY 4.0 + MIT",
    cards: [
      ["产品", "Coding Agent 更新", "影响上下文、工具、权限、执行和评估方式的重要功能。"],
      ["协议", "协议与框架", "MCP、Skills、Tools、Multi-agent 等协议或框架进展。"],
      ["研究", "研究与实验", "重要研究文章、技术报告和实验结果。"],
      ["生态", "生态变化", "影响 Harness 生态的集成、平台和标准变化。"],
    ],
  },
  references: {
    locale: "zh-CN",
    title: "参考资料 · Harness Atlas",
    description: "Agent Harness 相关原始资料索引。",
    kicker: "参考资料 / SOURCE INDEX",
    heading: "资料索引",
    intro: "维护 Agent Harness 相关原始资料索引。References 保存原始链接和资料索引；Research 对资料进行阅读、摘要和分析。",
    footer: "HARNESS_ATLAS / 参考资料",
    footerRight: "CC BY 4.0 + MIT",
    cards: [
      ["文档", "官方文档", "Agent 产品、框架、协议和平台官方文档。"],
      ["论文", "论文索引", "论文、预印本和技术报告索引。"],
      ["博客", "技术博客", "技术博客、工程文章和产品文章。"],
      ["日志", "更新日志", "产品更新日志、官方博客和文档更新页。"],
    ],
  },
};
