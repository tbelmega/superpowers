---
name: executing-plans
description: Use when you have a written implementation plan to execute and need the default Superpowers execution workflow
---

# Executing Plans

## Rules

- Review the plan before starting and raise critical gaps.
- Follow every plan step in order.
- A task is not done until its tests, implementation, rules review, checks, commit, and any other listed subtasks are finished.
- Keep plan checkboxes and YAML todos in sync when the plan uses both.
- The markdown plan file is the human-facing source of truth for progress and recovery after interruptions.
- Do not switch into a harness-native plan or spec mode while following this workflow unless the user explicitly asks to leave the repository workflow.
- If the harness offers a native plan or spec mode, treat it only as an optional helper or mirror and do not let it replace the saved markdown plan or hide execution state from the user.
- Treat the plan as the source of truth for goals, boundaries, ordering, and verification, not as a ban on better local engineering decisions inside the assigned task scope.
- In direct mode, stop and ask the user instead of guessing when blocked. In worker mode, stop and escalate to the orchestrator instead of guessing.
- Never start implementation on main/master branch without explicit user consent.

## Execution Principle

- Prefer worker mode when the harness supports it and the user explicitly authorizes it.
- Worker mode means: the current agent stays the orchestrator, keeps its own context light, and delegates each top-level task to a fresh worker with narrow context.
- Prefer fresh workers because smaller context usually improves outcome quality and reduces token cost; each turn carries less accumulated history.
- Direct mode is acceptable only when the user explicitly asks for direct execution or when the plan allows direct fallback and the user approves it.

## Preflight

Before editing code or running plan steps:

1. Read the plan and review it critically.
2. Read the plan's `Execution Mode` section.
3. Determine whether the user explicitly requested worker mode, explicitly requested direct mode, or did not specify.
4. Determine whether this harness supports worker orchestration.
5. Choose a mode using the rules below.

## Mode Selection

- If the plan says `worker_required` and worker mode is supported and explicitly authorized by the user, use worker mode.
- If the plan says `worker_required` and worker mode is not supported or not explicitly authorized, stop before implementation and return the plan's copy-pasteable worker/direct prompts.
- If the plan says `worker_preferred` and worker mode is supported and explicitly authorized, use worker mode.
- If the plan says `worker_preferred` and the user explicitly requested direct execution, use direct mode.
- If the plan says `worker_preferred` and the user did not choose a mode, stop before implementation and return the plan's copy-pasteable worker/direct prompts.
- If the plan says `direct_allowed` and the user explicitly requested direct execution, use direct mode.
- If the plan says `direct_allowed` and the user explicitly requested worker mode and the harness supports it, use worker mode.
- If the plan is missing an execution policy, default to direct mode only when the user explicitly asks for direct execution; otherwise stop and ask.

## Worker Mode

- The current agent is the orchestrator.
- Keep orchestrator context small: do not retain full build, test, or typecheck logs beyond what is needed to update status, report blockers, or capture verification evidence.
- Use one fresh worker per top-level task unless the plan explicitly breaks the task further.
- Workers should read the full plan for background context, sequencing, and shared constraints.
- Pass the full top-level task text and any additional task-specific context the worker needs.
- Reading the full plan does not expand edit scope or authorize future-task implementation.
- Owned files define the primary edit scope. Allowed shared files cover expected cross-task touch points such as shared types, contracts, utilities, and configuration.
- Small supporting edits outside owned files are allowed only when necessary for code hygiene or to complete the assigned task correctly, and they must be reported explicitly in the handoff.
- Within the assigned task scope, workers should look for better local design choices, simpler decompositions, reusable abstractions, and code-hygiene improvements that improve the result without changing the task's intent.
- If broader scope expansion is needed and the plan does not already authorize it, stop and escalate to the orchestrator.
- Stop and escalate to the orchestrator before changing user-visible behavior beyond the task's intent, invalidating task order, adding broad architectural scope, or effectively implementing future-task work.
- Update the plan file as work progresses: when starting a top-level task, change its checkbox from `[ ]` to `[~]`; when completing it, change `[~]` to `[x]`. If the plan also mirrors tasks in YAML todos, keep their statuses in sync.
- Require a short worker handoff summary with files changed, shared types or contracts added or modified, commands run, verification results, plan updates made, commit SHA or blocker, and any recommended plan amendment discovered during execution.
- If the harness supports role-specific review workers, use them only when the plan or local workflow requires them.
- Do not silently switch to direct mode mid-task. Stop and escalate to the orchestrator if worker execution becomes unavailable.

## Direct Mode

- The current agent executes the plan itself.
- Still keep context disciplined: summarize or discard low-value command output after recording the required verification evidence.
- Execute every substep in order and capture verification evidence.
- Update the plan file as work progresses: when starting a top-level task, change its checkbox from `[ ]` to `[~]`; when completing it, change `[~]` to `[x]`. If the plan also mirrors tasks in YAML todos, keep their statuses in sync.

## Harness Notes

- In Codex, worker mode uses the `spawn_agent` tool. A plan line saying "use workers" is not enough by itself; the user prompt must explicitly authorize worker delegation. If that authorization is missing, stop and return the plan's copy-pasteable worker/direct prompts.
- In Claude Code, worker mode may use subagents when the harness and user instructions allow it.
- In Kiro, worker mode may use subagents when the harness and user instructions allow it.
- In Kilo Code, worker mode may use subagents in isolated sessions, typically via the Task tool or `@agent-name`, when that mechanism is available in the current environment.
- In Cursor, worker mode may use the Task tool or equivalent when that mechanism is actually available in the current environment.

## Shared Workflow

1. Read the plan and complete the preflight.
2. Mark the current top-level task in progress.
3. Execute every substep in order in the selected mode and capture verification evidence.
4. If execution reveals a better structure, missing work, or a needed scope change beyond the task's allowed local judgment, have the orchestrator pause to amend the plan or ask the user before continuing.
5. Mark the task complete only after all required verification and commit steps finish.
6. After all tasks, use `finishing-a-development-branch`.

## Integration

- Use `using-git-worktrees` before starting implementation.
- `subagent-driven-development` is a compatibility reference for worker orchestration patterns, not a separate default workflow.
