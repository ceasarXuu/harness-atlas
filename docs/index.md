---
layout: default
title: Harness Atlas
description: 面向 Agent Harness 的公开知识图谱与系统课程
lang: zh-CN
---

<span class="tagline">Agent Harness / AI Coding / Software Engineering</span>

# Harness Atlas

<p class="lead">面向 Agent Harness 的公开知识图谱与系统课程。用软件工程视角解释 AI Agent 背后的运行环境、架构模式与工程实践。</p>

<div class="terminal">
  <p>$ model_capability != engineering_capability</p>
  <p>$ harness => context + tools + state + evaluation + governance</p>
</div>

[GitHub 仓库](https://github.com/ceasarXuu/harness-atlas) / [English]({{ '/en/' | relative_url }})

---

## 项目定位

**Harness Atlas** 关注的不是某一个具体工具，而是 AI Agent 产品背后的通用工程范式。

它讨论如何把上下文、工具、状态、记忆、规划、评估、人类在环和治理机制，组合成一个可运行、可控制、可评估的 Agent 系统。

当前 AI Coding 工具已经展示了 Harness 的早期形态：代码仓库上下文管理、终端与文件系统访问、工具调用、测试执行、代码审查循环、记忆、权限控制、人类确认等。

Harness Atlas 以这些具体场景为入口，进一步讨论 Agent Harness 如何从 Coding Agent 扩展到更完整的软件工程体系。

## 什么是 Agent Harness

> Agent Harness 是一种结构化工程环境，用于将模型智能组织成可控、可复用、可验证的任务执行能力。

典型 Harness 包含以下组件：

| 组件 | 作用 |
|---|---|
| 上下文管理 | 选择、压缩、注入、刷新任务相关信息 |
| 工具编排 | 调用工具、处理失败、控制权限、恢复错误 |
| 状态管理 | 跟踪任务、文件、执行、会话和项目状态 |
| 规划循环 | 拆解目标、执行动作、观察结果、修正计划 |
| 知识集成 | 接入项目知识、历史决策、团队规范和外部资料 |
| 评估反馈 | 通过测试、审查、指标和人工反馈验证结果 |
| 人类在环 | 支持审批、干预、监督和协同决策 |
| 治理机制 | 管理安全边界、审计、成本、合规和运行风险 |

## 为什么重要

大模型具备推理和生成能力，但真实工程任务还需要：

- 稳定获取项目上下文
- 可靠调用工具
- 管理长任务状态
- 记录可追踪的决策过程
- 复用流程与工作模式
- 执行测试与验证
- 控制权限和风险
- 支持人类与 Agent 协作
- 集成已有研发工具链和团队规范

**Harness 的价值在于把模型能力转化为工程能力。**

## 核心观点

<div class="grid-cards">
  <div class="card">
    <h3>01 / 工程具象化</h3>
    <p>Harness 是软件工程思想在 AI Agent 时代的具象化。</p>
  </div>
  <div class="card">
    <h3>02 / Coding Agent 引领</h3>
    <p>当前主流 Harness 形态由 Codex、Claude Code、OpenCode 等 Coding Agent 引领。</p>
  </div>
  <div class="card">
    <h3>03 / 生命周期扩展</h3>
    <p>未来 Harness 会从代码生成扩展到需求、设计、测试、交付、运维和反馈闭环。</p>
  </div>
  <div class="card">
    <h3>04 / 个性化与组织化</h3>
    <p>个人、团队和企业会围绕自己的流程、工具链、知识库和治理标准构建不同 Harness。</p>
  </div>
</div>

## 课程地图

| 模块 | 主题 | 核心问题 |
|---|---|---|
| 00 | 引言 | 为什么 Agent Harness 重要？ |
| 01 | Harness 定义 | 什么是 Harness？边界在哪里？ |
| 02 | Coding Agent Harness | 当前 AI Coding 工具如何实现 Harness 能力？ |
| 03 | Harness 架构 | 一个实用 Harness 系统由哪些组件构成？ |
| 04 | 工程级 Harness | 如何从编码工具扩展到完整软件工程体系？ |
| 05 | 评估与 Benchmark | 如何衡量 Harness 的质量和有效性？ |
| 06 | 个人 Harness | 个人开发者如何构建自己的 AI 辅助工作流？ |
| 07 | 企业 Harness | 团队和企业如何安全有效地采用 Harness？ |
| 08 | 未来方向 | Agent Harness 生态未来可能如何演化？ |

## 适合读者

- 正在使用 AI Coding 工具的开发者
- 构建 AI 原生工作流的独立开发者
- 设计 Agent 产品的产品经理
- 希望将 AI Agent 引入研发流程的工程管理者
- 关注 AI 软件工程的研究者与实践者

## 授权协议

- 文本内容、文章、图表、课程讲义和视觉材料：**CC BY 4.0**
- 代码示例、脚本、配置文件、Prompt 模板和工程材料：**MIT License**
