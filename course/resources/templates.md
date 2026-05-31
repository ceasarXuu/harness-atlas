# Reusable Templates / 可复用模板

## Task Contract / 任务契约

```yaml
task:
  name:
  goal:
  environment:
    read_sources: []
    writable_targets: []
  inputs: []
  outputs: []
  allowed_actions: []
  forbidden_actions: []
  success_criteria: []
  failure_conditions: []
  approval_required_for: []
```

## Context Pipeline / 上下文管线

```yaml
context_layers:
  - name: task_contract
    source: user_request
    trust: high
    max_tokens: 800
  - name: repo_snapshot
    source: git_repository
    trust: medium
    max_tokens: 4000
  - name: retrieved_evidence
    source: search
    trust: variable
    max_tokens: 3000
  - name: policy
    source: system
    trust: high
    max_tokens: 1000
assembly_order:
  - policy
  - task_contract
  - state
  - evidence
  - tool_observations
```

## Tool Registry / 工具注册表

```yaml
tools:
  - name: read_file
    risk: read
    idempotent: true
    approval_required: false
  - name: write_draft
    risk: draft
    idempotent: false
    approval_required: false
  - name: publish_pages
    risk: publish
    idempotent: false
    approval_required: true
```

## Skill Manifest / 技能清单

```yaml
name:
version:
goal:
inputs: []
outputs: []
tools: []
permissions:
  default:
runtime_hints:
  max_steps:
evals: []
limitations: []
```

## Evaluation Rubric / 评测规约

```yaml
rubric:
  task_success: 0-5
  factuality: 0-5
  completeness: 0-5
  boundary_respect: 0-5
  cost_latency: 0-5
release_gate:
  min_average_score:
  max_critical_failures:
```
