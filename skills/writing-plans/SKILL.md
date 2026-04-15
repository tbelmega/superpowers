---
name: writing-plans
description: Use when you have an approved spec or clear requirements for a multi-step task and need an implementation plan before coding
---

# Writing Plans

Write an implementation plan that someone without codebase context can execute.

## Output

- Save to `docs/plans/YYYY-MM-DD-<feature-name>.md`. User preferences override the default.
- The file should begin with the implementation-plan header and state that top-level tasks use checkbox syntax.
- Before tasks, include `Capabilities`, `Component Architecture`, and `Interactions`.
- Include a file map before the task list.
- Add an `Execution Mode` section before the task list.

## Execution Mode

Every plan must declare one of these policies:

- `worker_required` when the plan is intended for an orchestrator agent that keeps its own context light and delegates each top-level task to a fresh worker.
- `worker_preferred` when worker orchestration is preferred and should be the default assumption unless the user explicitly wants direct execution.
- `direct_allowed` only when the user explicitly wants the current agent to execute tasks itself.

In the `Execution Mode` section:

- State that the markdown plan is the human-facing source of truth.
- Explain that worker mode keeps the orchestrator context small, keeps each worker focused on one task, usually improves outcome quality as context stays narrow, and reduces token usage because each turn carries less accumulated history.
- Use harness-specific wording for the worker mechanism when known:
  - Codex: say `worker` and note that worker orchestration uses the `spawn_agent` tool.
  - Claude Code: say `subagent`.
  - Kiro: say `subagent`.
  - Kilo Code: say `subagent` or `worker` and note that worker orchestration may use the Task tool or `@agent-name`.
  - Cursor: say `worker` and mention the Task tool or equivalent only when that is the actual mechanism in use.
  - If the harness is unclear, use `worker agent`.
- Add a guard clause. If worker orchestration is intended but unavailable or not explicitly authorized by the user prompt, the executor must stop before implementation and ask the user to choose worker mode or direct mode with a copy-pasteable prompt.

Use this guard-clause shape and adapt only the harness wording:

`If you are not explicitly authorized to use worker mode in this harness, stop before implementation and ask the user to rerun with one of these prompts:`

- `Use worker mode for this plan. Act as the orchestrator, keep your own context light, and delegate each top-level task to a fresh worker agent.`
- `Execute this plan directly in the current agent without using worker agents.`

For Codex plans, make the worker prompt explicit:

- `Use worker mode for this plan. Act as the orchestrator, keep your own context light, and use the spawn_agent tool to delegate each top-level task to a fresh worker agent.`

## Delegated Execution Defaults

- Default to `worker_preferred` unless the user explicitly asks for a direct-only or manual-only plan.
- Write plans so an orchestrator agent can execute them with a relatively clean context window.
- Each top-level task should be executable by a fresh worker with minimal prior chat context.
- Workers should read the full plan for background context, sequencing, and shared constraints, but must execute only their assigned top-level task.
- Reading the full plan does not expand edit scope by itself.
- Each task should specify owned files, allowed shared files, required verification commands, and an exact commit message.
- The owned-files list defines the task's primary edit scope, not an absolute ban on necessary code-hygiene edits.
- Small supporting edits outside owned files are allowed only when necessary to complete the task cleanly, reduce duplication, extract shared code, or maintain coherent contracts without implementing future-task work.
- If a task needs broader scope than a small supporting edit, the plan should either name that scope explicitly or instruct worker executors to stop and escalate to the orchestrator and direct executors to stop and ask the user.
- Workers should return a short handoff summary with files changed, shared types or contracts added or modified, commands run, verification results, plan updates made, and commit SHA or blocker.
- If delegated execution is intended but the user has not explicitly authorized worker mode in the current chat, the orchestrator must stop and ask the user for that authorization instead of executing locally.

## Task Rules

- Group work by user-visible behavior, not by file or layer.
- Use top-level tasks for vertical slices and checkbox subtasks for the steps inside each slice.
- Make each top-level task executable from the plan plus repo state without relying on prior chat history.
- Start each task with a failing test at the public interface.
- End each task with rules check, run checks, and `git commit`.
- Add dependency installation first when new packages are needed.
- Add early shared-contract work when later tasks depend on it.

## Planning Rules

- Keep the plan top-down and interface-driven.
- Plan the invariants, interfaces, ordering constraints, and verification expectations; do not try to precompute every good implementation decision up front.
- Do not use a harness-native plan or spec mode as the authoritative workflow for this repository. The saved markdown plan under `docs/plans/` is canonical.
- Harness-native planning features may be mentioned only as optional helpers or mirrors when they do not replace the markdown plan or hide required state from the user.
- In `Interactions`, state whether tasks must run strictly in order or identify the tasks that are parallel-safe.
- In `Interactions`, state that workers read the full plan for background context but execute only their assigned task.
- In `Interactions`, state that owned files define primary edit scope and that allowed shared files cover expected cross-task touch points.
- Encourage local engineering judgment within task scope: workers may choose better local naming, decomposition, abstractions, code-hygiene refactors, and small implementation improvements that serve the task's intent.
- Require stop-and-escalate conditions for workers, and stop-and-ask conditions for direct execution, when an improvement would change user-visible behavior beyond the task's intent, invalidate task ordering, add broad architectural scope, or effectively implement future-task work.
- Prefer integration tests; use unit tests only when they add clear value.
- If the spec is silent on feature flags for a new feature, ask before planning.
- For API changes, ask about validation, authentication, and troubleshooting logs if the spec does not cover them.
- Append a flat `Tickets` section after the tasks.

## Task Shape

Every top-level task should include, in a concise but explicit form:

- owned files
- allowed shared files
- the failing signal or first verification step
- the implementation goal
- any non-goals or boundaries needed to prevent scope drift
- the required verification commands
- a diff review step
- a plan-update step covering checkbox transitions
- the exact commit message
- expected worker handoff contents when worker mode is used

The task text may tell the worker to read the full plan for sequencing and background context, but it must also state that doing so does not expand file ownership or authorize future-task implementation.
The task text should leave room for better local implementation choices inside the task's scope while making clear when the worker must stop and escalate to the orchestrator before widening scope.

## Review And Handoff

- Review the plan for worker-prompt completeness. A fresh worker should be able to execute any single task correctly from the plan plus repo state without relying on prior chat history.
- Review the plan for over-specification. Remove detail that would freeze local engineering judgment without protecting an actual invariant, dependency, or verification requirement.
- Run the plan review loop with `plan-document-reviewer-prompt.md` until approved or blocked after 3 rounds.
- Then ask the user to review the saved plan.
- Implementation follows `executing-plans`.
