export const homePages = {
  "zh-CN": {
    lang: "zh-CN",
    title: "Harness Atlas",
    description: "面向 Agent Harness 的公开知识图谱与系统课程。",
    footerLeft: "HARNESS_ATLAS / CC BY 4.0 + MIT",
    footerRight: "维护者：ceasarXuu",
    hero: {
      badge: "系统 / 智能体 / HARNESS",
      lead: "面向 Agent Harness 的公开知识图谱与系统课程。用软件工程视角解释 AI Agent 背后的运行环境、架构模式与工程实践。",
      copy: [
        "项目关注的不是单一工具，而是 AI Agent 产品背后的通用工程范式：如何把上下文、工具、状态、记忆、规划、评估、人类在环和治理机制组合成可运行、可控制、可评估的 Agent 系统。",
        "详细页面当前以中文维护，英文入口保持同样结构和导航边界。",
      ],
      actions: [
        ["course.html", "开始学习", true],
      ],
      audience: "适合读者：开发者、独立开发者、产品经理、工程团队。",
      traceAria: "Agent Harness 运行时轨迹",
      traceHead: ["运行时轨迹", "版本 0.1"],
      traceRows: [
        ["模型", "推理 / 生成"],
        ["上下文", "选择 / 压缩 / 注入"],
        ["工具", "终端 / 文件 / 浏览器 / API"],
        ["状态", "任务 / 会话 / 项目"],
        ["评估", "测试 / 审查 / 指标"],
        ["策略", "权限 / 审计 / 风险"],
      ],
    },
    sections: [
      {
        id: "industry",
        className: "section updates-flow",
        kicker: "最新行业动态",
        heading: "从动态里看 Harness 如何演进",
        intro: "持续跟踪 Agent Harness 相关的产品、协议、研究和工程实践变化，让学习路径保持和真实生态同步。",
        updates: [
          ["timeline.html", "2026", "Coding Agent 产品能力变化", "关注上下文、工具调用、任务状态、权限控制和评估闭环的新能力。", "产品更新"],
          ["timeline.html", "2026", "MCP、Skills 与 Tool Calling 生态进展", "观察协议、可迁移能力格式和工具接入方式如何影响 Harness 架构。", "协议生态"],
          ["research.html", "2026", "Agent 评估与基准研究", "把评估方法、实验结论和局限沉淀为可复用的学习资料。", "研究进展"],
        ],
        action: ["timeline.html", "查看全部动态"],
      },
      {
        id: "learn",
        className: "section",
        kicker: "学习路径",
        heading: "从入门到系统理解 Agent Harness",
        intro: "学习区把课程目录直接放在左侧导航中，适合按课逐步阅读，也适合随时回查术语边界。",
        cards: [
          ["course.html", "路线", "学习路线", "把课程拆成入门、核心、运行机制和系统治理几个阶段。"],
          ["course-01.html", "课程", "第 1 课", "从 Agent Harness 定义开始，按照课程目录逐课进入。"],
          ["course-other-glossary.html", "其他", "术语表", "统一 Agent、Harness、Tool、Skill、MCP 等概念边界。"],
        ],
      },
    ],
  },
  en: {
    lang: "en",
    title: "Harness Atlas",
    description: "A public knowledge atlas and systematic course for understanding Agent Harness.",
    footerLeft: "HARNESS_ATLAS / CC BY 4.0 + MIT",
    footerRight: "MAINTAINED BY ceasarXuu",
    hero: {
      badge: "SYSTEM / AGENT / HARNESS",
      lead: "A public knowledge atlas and systematic course for understanding Agent Harness: the engineering runtime behind AI agents.",
      copy: [
        "The project focuses on the general engineering pattern behind AI agents: how context, tools, state, memory, planning, evaluation, human oversight, and governance become a practical, controllable, and measurable agent system.",
        "Detailed section pages are currently maintained in Chinese.",
      ],
      actions: [
        ["course.html", "ENTER ATLAS", true],
      ],
      audience: "For developers, indie builders, product managers, and engineering teams.",
      traceAria: "Agent Harness runtime trace",
      traceHead: ["runtime.trace", "v0.1"],
      traceRows: [
        ["MODEL", "reasoning / generation"],
        ["CONTEXT", "select / compress / inject"],
        ["TOOLS", "shell / files / browser / api"],
        ["STATE", "task / session / project"],
        ["EVAL", "tests / review / metrics"],
        ["POLICY", "permission / audit / risk"],
      ],
    },
    sections: [
      {
        id: "industry",
        className: "section updates-flow",
        kicker: "INDUSTRY SIGNALS",
        heading: "Track Harness evolution through ecosystem updates",
        intro: "Follow product, protocol, research, and engineering-practice changes so the learning path stays connected to the real ecosystem.",
        updates: [
          ["timeline.html", "2026", "Coding Agent product capability shifts", "Track new capabilities around context, tool use, task state, permission control, and evaluation loops.", "Product"],
          ["timeline.html", "2026", "MCP, Skills, and Tool Calling ecosystem progress", "Watch how protocols, portable capability formats, and tool access patterns reshape Harness architecture.", "Protocols"],
          ["research.html", "2026", "Agent evaluation and benchmark research", "Turn methods, findings, and limitations into reusable learning material.", "Research"],
        ],
        action: ["timeline.html", "View all updates"],
      },
      {
        id: "learn",
        className: "section",
        kicker: "LEARNING PATH",
        heading: "Build a systematic view of Agent Harness",
        intro: "The learning area keeps the course directory in the left sidebar, so readers can move lesson by lesson and still return to shared terminology.",
        cards: [
          ["course.html", "PATH", "Learning Route", "Split the course into foundations, core runtime pieces, engineering practice, and governance."],
          ["course-01.html", "COURSE", "Lesson 1", "Start from the Agent Harness definition and move through the course sequence."],
          ["course-other-glossary.html", "OTHER", "Glossary", "Align definitions for Agent, Harness, Tool, Skill, MCP, and related terms."],
        ],
      },
    ],
  },
};
