export const courseLessons = [
  {
    key: "course-01",
    num: "01",
    title: "为什么需要 Agent Harness",
    titleEn: "Why Agent Harness",
    href: "course-01.html",
    hrefEn: "en-course-01.html",
    body: "从 Prompt 到工程系统",
    bodyEn: "From prompting to engineering systems",
  },
  {
    key: "course-02",
    num: "02",
    title: "任务、环境与边界",
    titleEn: "Task, Environment and Boundary",
    href: "course-02.html",
    hrefEn: "en-course-02.html",
    body: "先设计问题，再设计 Agent",
    bodyEn: "Design the problem before designing the agent",
  },
  {
    key: "course-03",
    num: "03",
    title: "最小 Agent Harness",
    titleEn: "Minimal Harness",
    href: "course-03.html",
    hrefEn: "en-course-03.html",
    body: "一个 Agent Harness 的最小闭环",
    bodyEn: "The minimal closed loop of an Agent Harness",
  },
  {
    key: "course-04",
    num: "04",
    title: "上下文作为信息边界",
    titleEn: "Context as Information Boundary",
    href: "course-04.html",
    hrefEn: "en-course-04.html",
    body: "Context Engineering 不只是 Prompt Engineering",
    bodyEn: "Context engineering is more than prompt engineering",
  },
  {
    key: "course-05",
    num: "05",
    title: "工具与 MCP 作为动作边界",
    titleEn: "Tools and MCP as Action Boundary",
    href: "course-05.html",
    hrefEn: "en-course-05.html",
    body: "工具不是插件，而是受控副作用",
    bodyEn: "Tools are not plugins; they are controlled side effects",
  },
  {
    key: "course-06",
    num: "06",
    title: "状态、会话与记忆",
    titleEn: "State, Session and Memory",
    href: "course-06.html",
    hrefEn: "en-course-06.html",
    body: "连续性不是记住更多，而是管理状态",
    bodyEn: "Continuity is state management, not remembering more",
  },
  {
    key: "course-07",
    num: "07",
    title: "运行时控制",
    titleEn: "Runtime Control",
    href: "course-07.html",
    hrefEn: "en-course-07.html",
    body: "规划、执行与恢复",
    bodyEn: "Planning, execution, and recovery",
  },
  {
    key: "course-08",
    num: "08",
    title: "技能作为能力封装",
    titleEn: "Skills as Capability Packaging",
    href: "course-08.html",
    hrefEn: "en-course-08.html",
    body: "从一次性动作到可复用能力单元",
    bodyEn: "From one-off action to reusable capability unit",
  },
  {
    key: "course-09",
    num: "09",
    title: "工作流作为确定性支架",
    titleEn: "Workflows as Deterministic Scaffolding",
    href: "course-09.html",
    hrefEn: "en-course-09.html",
    body: "把确定性留给代码，把不确定性留给模型",
    bodyEn: "Leave determinism to code and uncertainty to the model",
  },
  {
    key: "course-10",
    num: "10",
    title: "多 Agent 编排",
    titleEn: "Multi-agent Orchestration",
    href: "course-10.html",
    hrefEn: "en-course-10.html",
    body: "多 Agent 是组织设计，不是堆更多 Agent",
    bodyEn: "Multi-agent design is organizational design, not more agents",
  },
  {
    key: "course-11",
    num: "11",
    title: "可观测性与调试",
    titleEn: "Observability and Debugging",
    href: "course-11.html",
    hrefEn: "en-course-11.html",
    body: "让 Agent Run 可见、可回放、可解释",
    bodyEn: "Make agent runs visible, replayable, and explainable",
  },
  {
    key: "course-12",
    num: "12",
    title: "评测、测试与基准",
    titleEn: "Evaluation, Testing and Benchmarking",
    href: "course-12.html",
    hrefEn: "en-course-12.html",
    body: "从行为到证据的反馈系统",
    bodyEn: "A feedback system from behavior to evidence",
  },
  {
    key: "course-13",
    num: "13",
    title: "安全、权限与治理",
    titleEn: "Security, Permissions and Governance",
    href: "course-13.html",
    hrefEn: "en-course-13.html",
    body: "限制 Agent 的权力",
    bodyEn: "Limit the agent’s power",
  },
  {
    key: "course-14",
    num: "14",
    title: "生产架构",
    titleEn: "Production Architecture",
    href: "course-14.html",
    hrefEn: "en-course-14.html",
    body: "从 Demo 到可交付系统",
    bodyEn: "From demo to deliverable system",
  },
  {
    key: "course-15",
    num: "15",
    title: "模式、反模式与未来",
    titleEn: "Patterns, Anti-patterns and Future",
    href: "course-15.html",
    hrefEn: "en-course-15.html",
    body: "设计原则、反模式与未来方向",
    bodyEn: "Design principles, anti-patterns, and future directions",
  },
];

export function getCourseLessons(locale = "zh-CN") {
  return courseLessons.map((lesson) => ({
    ...lesson,
    title: locale === "en" ? lesson.titleEn : lesson.title,
    href: locale === "en" ? lesson.hrefEn : lesson.href,
    body: locale === "en" ? lesson.bodyEn : lesson.body,
  }));
}

export const learningOther = [
  {
    key: "glossary",
    eyebrow: "其他",
    eyebrowEn: "Other",
    label: "中英术语表",
    labelEn: "Bilingual Glossary",
    href: "course-other-glossary.html",
    hrefEn: "en-course-other-glossary.html",
  },
];

export function getLearningOther(locale = "zh-CN") {
  return learningOther.map((item) => ({
    ...item,
    eyebrow: locale === "en" ? item.eyebrowEn : item.eyebrow,
    label: locale === "en" ? item.labelEn : item.label,
    href: locale === "en" ? item.hrefEn : item.href,
  }));
}

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
  en: {
    footerLeft: "HARNESS_ATLAS / Course",
    footerRight: "CC BY 4.0 + MIT",
    sidebarAria: "Course directory",
    sidebarKicker: "Course directory",
    directoryAria: "Course page navigation",
    otherGroup: "Other",
    previousLabel: "Previous",
    nextLabel: "Next",
  },
};

export function getLearningPager(activeKey, locale = "zh-CN") {
  const sequence = [
    ...getCourseLessons(locale).map((lesson) => ({
      key: lesson.key,
      href: lesson.href,
      title: lesson.title,
    })),
    ...getLearningOther(locale).map((item) => ({
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

export const courseLessonPages = courseLessons.map((lesson) => {
  return {
    key: lesson.key,
    locale: "zh-CN",
    title: `${lesson.title} · Harness Atlas`,
    description: `Harness Atlas ${lesson.title}。`,
    kicker: `学习 / ${lesson.title}`,
    heading: lesson.title,
    intro: lesson.body,
    body: lesson.body,
    compact: true,
    href: lesson.href,
    localeHref: lesson.hrefEn,
  };
});

export function getCourseLessonPage(key, locale = "zh-CN") {
  const page = courseLessonPages.find((lesson) => lesson.key === key);
  if (!page) throw new Error(`Unknown course lesson: ${key}`);
  if (locale === "en") {
    const lesson = courseLessons.find((item) => item.key === key);
    return {
      key: lesson.key,
      locale: "en",
      title: `${lesson.titleEn} · Harness Atlas`,
      description: `Harness Atlas ${lesson.titleEn}.`,
      kicker: `Course / ${lesson.titleEn}`,
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
  kicker: "学习 / 中英术语表",
  heading: "中英术语表",
  intro: "术语表来自正式课程资源，用于统一 Agent Harness、上下文边界、动作边界、运行时控制、工具网关、技能、工作流、跟踪、评测和最小自主权等核心概念。",
  href: "course-other-glossary.html",
  localeHref: "en-course-other-glossary.html",
};

export const englishGlossaryPage = {
  active: "glossary",
  locale: "en",
  title: "Bilingual Glossary · Harness Atlas",
  description: "Key Agent Harness terms used throughout the course.",
  kicker: "Course / Bilingual Glossary",
  heading: "Bilingual Glossary",
  intro: "The glossary comes from the official course resources and keeps core concepts such as Agent Harness, context boundary, action boundary, runtime control, tool gateway, skill, workflow, trace, evaluation, and least agency consistent.",
  href: "en-course-other-glossary.html",
  localeHref: "course-other-glossary.html",
};
