export const frameworkNodes = [
  {
    key: "framework-01",
    num: "01",
    title: "为什么需要 Agent Harness",
    titleEn: "Why Agent Harness",
    href: "framework-01.html",
    hrefEn: "en-framework-01.html",
    body: "从 Prompt 到工程系统",
    bodyEn: "From prompting to engineering systems",
  },
  {
    key: "framework-02",
    num: "02",
    title: "任务、环境与边界",
    titleEn: "Task, Environment and Boundary",
    href: "framework-02.html",
    hrefEn: "en-framework-02.html",
    body: "先设计问题，再设计 Agent",
    bodyEn: "Design the problem before designing the agent",
  },
  {
    key: "framework-03",
    num: "03",
    title: "最小 Agent Harness",
    titleEn: "Minimal Harness",
    href: "framework-03.html",
    hrefEn: "en-framework-03.html",
    body: "一个 Agent Harness 的最小闭环",
    bodyEn: "The minimal closed loop of an Agent Harness",
  },
  {
    key: "framework-04",
    num: "04",
    title: "上下文作为信息边界",
    titleEn: "Context as Information Boundary",
    href: "framework-04.html",
    hrefEn: "en-framework-04.html",
    body: "Context Engineering 不只是 Prompt Engineering",
    bodyEn: "Context engineering is more than prompt engineering",
  },
  {
    key: "framework-05",
    num: "05",
    title: "工具与 MCP 作为动作边界",
    titleEn: "Tools and MCP as Action Boundary",
    href: "framework-05.html",
    hrefEn: "en-framework-05.html",
    body: "工具不是插件，而是受控副作用",
    bodyEn: "Tools are not plugins; they are controlled side effects",
  },
  {
    key: "framework-06",
    num: "06",
    title: "状态、会话与记忆",
    titleEn: "State, Session and Memory",
    href: "framework-06.html",
    hrefEn: "en-framework-06.html",
    body: "连续性不是记住更多，而是管理状态",
    bodyEn: "Continuity is state management, not remembering more",
  },
  {
    key: "framework-07",
    num: "07",
    title: "运行时控制",
    titleEn: "Runtime Control",
    href: "framework-07.html",
    hrefEn: "en-framework-07.html",
    body: "规划、执行与恢复",
    bodyEn: "Planning, execution, and recovery",
  },
  {
    key: "framework-08",
    num: "08",
    title: "技能作为能力封装",
    titleEn: "Skills as Capability Packaging",
    href: "framework-08.html",
    hrefEn: "en-framework-08.html",
    body: "从一次性动作到可复用能力单元",
    bodyEn: "From one-off action to reusable capability unit",
  },
  {
    key: "framework-09",
    num: "09",
    title: "工作流作为确定性支架",
    titleEn: "Workflows as Deterministic Scaffolding",
    href: "framework-09.html",
    hrefEn: "en-framework-09.html",
    body: "把确定性留给代码，把不确定性留给模型",
    bodyEn: "Leave determinism to code and uncertainty to the model",
  },
  {
    key: "framework-10",
    num: "10",
    title: "多 Agent 编排",
    titleEn: "Multi-agent Orchestration",
    href: "framework-10.html",
    hrefEn: "en-framework-10.html",
    body: "多 Agent 是组织设计，不是堆更多 Agent",
    bodyEn: "Multi-agent design is organizational design, not more agents",
  },
  {
    key: "framework-11",
    num: "11",
    title: "可观测性与调试",
    titleEn: "Observability and Debugging",
    href: "framework-11.html",
    hrefEn: "en-framework-11.html",
    body: "让 Agent Run 可见、可回放、可解释",
    bodyEn: "Make agent runs visible, replayable, and explainable",
  },
  {
    key: "framework-12",
    num: "12",
    title: "评测、测试与基准",
    titleEn: "Evaluation, Testing and Benchmarking",
    href: "framework-12.html",
    hrefEn: "en-framework-12.html",
    body: "从行为到证据的反馈系统",
    bodyEn: "A feedback system from behavior to evidence",
  },
  {
    key: "framework-13",
    num: "13",
    title: "安全、权限与治理",
    titleEn: "Security, Permissions and Governance",
    href: "framework-13.html",
    hrefEn: "en-framework-13.html",
    body: "限制 Agent 的权力",
    bodyEn: "Limit the agent’s power",
  },
  {
    key: "framework-14",
    num: "14",
    title: "生产架构",
    titleEn: "Production Architecture",
    href: "framework-14.html",
    hrefEn: "en-framework-14.html",
    body: "从 Demo 到可交付系统",
    bodyEn: "From demo to deliverable system",
  },
  {
    key: "framework-15",
    num: "15",
    title: "模式、反模式与未来",
    titleEn: "Patterns, Anti-patterns and Future",
    href: "framework-15.html",
    hrefEn: "en-framework-15.html",
    body: "设计原则、反模式与未来方向",
    bodyEn: "Design principles, anti-patterns, and future directions",
  },
];

export function getFrameworkNodes(locale = "zh-CN") {
  return frameworkNodes.map((lesson) => ({
    ...lesson,
    title: locale === "en" ? lesson.titleEn : lesson.title,
    href: locale === "en" ? lesson.hrefEn : lesson.href,
    body: locale === "en" ? lesson.bodyEn : lesson.body,
  }));
}

export const frameworkOther = [
  {
    key: "glossary",
    eyebrow: "其他",
    eyebrowEn: "Other",
    label: "中英术语表",
    labelEn: "Bilingual Glossary",
    href: "framework-glossary.html",
    hrefEn: "en-framework-glossary.html",
  },
];

export function getFrameworkOther(locale = "zh-CN") {
  return frameworkOther.map((item) => ({
    ...item,
    eyebrow: locale === "en" ? item.eyebrowEn : item.eyebrow,
    label: locale === "en" ? item.labelEn : item.label,
    href: locale === "en" ? item.hrefEn : item.href,
  }));
}

export const frameworkChrome = {
  "zh-CN": {
    footerLeft: "HARNESS_ATLAS / 框架",
    footerRight: "CC BY 4.0 + MIT",
    sidebarAria: "Harness 框架",
    sidebarKicker: "Harness 框架",
    directoryAria: "Harness 框架导航",
    otherGroup: "其他",
    previousLabel: "上一章",
    nextLabel: "下一章",
  },
  en: {
    footerLeft: "HARNESS_ATLAS / Framework",
    footerRight: "CC BY 4.0 + MIT",
    sidebarAria: "Harness Framework",
    sidebarKicker: "Harness Framework",
    directoryAria: "Harness Framework navigation",
    otherGroup: "Other",
    previousLabel: "Previous Chapter",
    nextLabel: "Next Chapter",
  },
};

export function getFrameworkPager(activeKey, locale = "zh-CN") {
  const sequence = [
    ...getFrameworkNodes(locale).map((lesson) => ({
      key: lesson.key,
      href: lesson.href,
      title: lesson.title,
    })),
    ...getFrameworkOther(locale).map((item) => ({
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

export const frameworkNodePages = frameworkNodes.map((lesson) => {
  return {
    key: lesson.key,
    locale: "zh-CN",
    title: `${lesson.title} · Harness Atlas`,
    description: `Harness Atlas ${lesson.title}。`,
    kicker: `框架 / ${lesson.title}`,
    heading: lesson.title,
    intro: lesson.body,
    body: lesson.body,
    compact: true,
    href: lesson.href,
    localeHref: lesson.hrefEn,
  };
});

export function getFrameworkNodePage(key, locale = "zh-CN") {
  const page = frameworkNodePages.find((lesson) => lesson.key === key);
  if (!page) throw new Error(`Unknown framework node: ${key}`);
  if (locale === "en") {
    const lesson = frameworkNodes.find((item) => item.key === key);
    return {
      key: lesson.key,
      locale: "en",
      title: `${lesson.titleEn} · Harness Atlas`,
      description: `Harness Atlas ${lesson.titleEn}.`,
      kicker: `Framework / ${lesson.titleEn}`,
      heading: lesson.titleEn,
      intro: lesson.bodyEn,
      body: lesson.bodyEn,
      compact: true,
      href: lesson.hrefEn,
      localeHref: lesson.href,
    };
  }
  return page;
}

export const glossaryPage = {
  active: "glossary",
  locale: "zh-CN",
  title: "术语表 · Harness Atlas",
  description: "Agent Harness 双语术语解释。",
  kicker: "框架 / 中英术语表",
  heading: "中英术语表",
  intro: "术语表来自正式框架资源，用于统一 Agent Harness、上下文边界、动作边界、运行时控制、工具网关、技能、工作流、跟踪、评测和最小自主权等核心概念。",
  href: "framework-glossary.html",
  localeHref: "en-framework-glossary.html",
};

export const englishGlossaryPage = {
  active: "glossary",
  locale: "en",
  title: "Bilingual Glossary · Harness Atlas",
  description: "Key Agent Harness terms used throughout the framework.",
  kicker: "Framework / Bilingual Glossary",
  heading: "Bilingual Glossary",
  intro: "The glossary comes from the official framework resources and keeps core concepts such as Agent Harness, context boundary, action boundary, runtime control, tool gateway, skill, workflow, trace, evaluation, and least agency consistent.",
  href: "en-framework-glossary.html",
  localeHref: "framework-glossary.html",
};
