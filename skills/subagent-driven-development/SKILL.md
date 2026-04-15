---
name: subagent-driven-development
description: Optional compatibility reference for worker-orchestrated plan execution; use only when executing-plans calls for worker mode and you need harness-specific worker details
---

# Subagent-Driven Development

**Relationship to executing-plans:** `writing-plans` points implementers to `executing-plans`. That skill is now the canonical execution workflow. Use this file only as a harness-specific reference when `executing-plans` selects worker mode and you need more detail about how to dispatch workers in the current environment.

## Shared Principles

- Worker mode exists to keep the orchestrator context small and each worker focused on one task.
- Smaller context usually improves outcome quality and reduces token usage because each turn carries less accumulated history.
- The plan file remains the human-facing source of truth. Update top-level tasks `[ ]` -> `[~]` -> `[x]` as work progresses, and keep any mirrored YAML todos in sync.
- Plan fidelity is unchanged in worker mode: tests, implementation, review steps, checks, commits, and other listed subtasks are still mandatory.

## Dispatch Rules

- Use one fresh worker per top-level task unless the plan explicitly requires a different split.
- Workers should read the full plan for background context, sequencing, and shared constraints.
- Pass the full top-level task text and any additional task-specific context the worker needs.
- Reading the full plan does not expand edit scope or authorize future-task implementation.
- Keep long build, test, and typecheck output out of orchestrator context after recording the needed verification evidence.
- Do not silently fall back to direct execution if worker mode becomes unavailable. Stop and escalate to the orchestrator.

## Harness Notes

- Codex: worker orchestration uses the `spawn_agent` tool. The user prompt must explicitly authorize worker delegation; a plan line alone is not enough.
- Claude Code: worker orchestration may use subagents when the harness and user instructions allow it.
- Kiro: worker orchestration may use subagents when the harness and user instructions allow it.
- Kilo Code: worker orchestration may use subagents in isolated sessions, typically via the Task tool or `@agent-name`, when that mechanism is available in the current environment.
- Cursor: worker orchestration may use the Task tool or equivalent when that mechanism is available in the current environment.

## Integration

- Use `executing-plans` for the preflight, mode selection, plan updates, and stop conditions.
- Use the prompt templates in this directory only when the selected worker workflow benefits from role-specific implementer or reviewer prompts.
