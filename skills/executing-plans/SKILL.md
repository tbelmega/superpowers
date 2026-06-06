---
name: executing-plans
description: Use when you have a written implementation plan to execute — default Superpowers path (matches writing-plans plan overview and Cursor plan frontmatter)
---

# Executing Plans

## Overview

Load plan, review critically, execute all tasks, report when complete. **superpowers:writing-plans** instructs implementers to follow **this** skill; treat it as the canonical execution contract unless the human explicitly chooses an optional workflow.

**Fidelity to the plan:** A task is **not** done when the code “looks right.” You must complete **everything** the plan assigns for that task **in order**: tests/TDD steps, implementation, **`AGENTS.md` review**, **running the checks** the plan names (scripts, typecheck, tests for touched modules), **`git commit`** when the plan says to, and any other listed subtasks. Non-code steps are **mandatory deliverables**, not optional follow-up. If the plan names a command, run it (or stop and ask if the environment truly cannot run it). Do not report a task complete while skipping its verification or commit steps.

**Announce at start:** "I'm using the executing-plans skill to implement this plan."

**Cursor plan files:** If the plan starts with YAML frontmatter and a `todos` list, keep each todo’s **`status`** in sync with the matching **top-level** checkbox in the body (`pending` ↔ `[ ]`, `in_progress` ↔ `[~]`, `completed` ↔ `[x]`), using `todos[].id` and the `(id)` on the task line. Update both together whenever you start or finish a top-level task.

## The Process

### Step 1: Load and Review Plan
1. Read plan file
2. Review critically - identify any questions or concerns about the plan
3. If concerns: Raise them with your human partner before starting
4. If no concerns: Create TodoWrite and proceed

### Step 2: Execute Tasks

For each task:
1. Mark as in_progress; update plan file: task `[~]`
2. Follow **every** substep exactly in order (including rules check, check script, commit, and anything else written in the task — not only the coding bullets)
3. Run verifications as specified; capture enough in your notes that a reviewer could see checks ran and passed
4. Mark as completed; update plan file: task `[x]` **only after** all of the above for that task are done

### Step 3: Complete Development

After all tasks complete and verified:
- Announce: "I'm using the finishing-a-development-branch skill to complete this work."
- **REQUIRED SUB-SKILL:** Use superpowers:finishing-a-development-branch
- Follow that skill to verify tests, present options, execute choice

## When to Stop and Ask for Help

**STOP executing immediately when:**
- Hit a blocker (missing dependency, test fails, instruction unclear)
- Plan has critical gaps preventing starting
- You don't understand an instruction
- Verification fails repeatedly

**Ask for clarification rather than guessing.**

## When to Revisit Earlier Steps

**Return to Review (Step 1) when:**
- Partner updates the plan based on your feedback
- Fundamental approach needs rethinking

**Don't force through blockers** - stop and ask.

- Review the plan before starting and raise critical gaps.
- Follow every plan step in order.
- A task is not done until its tests, implementation, `AGENTS.md` review, checks, commit, and any other listed subtasks are finished.
- Keep plan checkboxes and YAML todos in sync when the plan uses both.
- The markdown plan file is the human-facing source of truth for progress and recovery after interruptions.
- Do not switch into a harness-native plan or spec mode while following this workflow unless the user explicitly asks to leave the repository workflow.
- If the harness offers a native plan or spec mode, treat it only as an optional helper or mirror and do not let it replace the saved markdown plan or hide execution state from the user.
- Treat the plan as the source of truth for goals, boundaries, ordering, and verification, not as a ban on better local engineering decisions inside the assigned task scope.
- In direct mode, stop and ask the user instead of guessing when blocked. In worker mode, stop and escalate to the orchestrator instead of guessing.
- Monitor for context pressure using any harness signal that is available and fallback heuristics when it is not. If the session is becoming too degraded to continue reliably, stop at the nearest safe boundary, update the plan, write a concise handoff, and suggest resuming in a fresh session.
- Never start implementation on main/master branch without explicit user consent.

## Execution Principle

- Prefer worker mode when the harness supports it and the user explicitly authorizes it.
- Worker mode means: the current agent stays the orchestrator, keeps its own context light, and delegates each top-level task to a fresh worker with narrow context.
- Prefer fresh workers because smaller context usually improves outcome quality and reduces token cost; each turn carries less accumulated history.
- Direct mode is acceptable only when the user explicitly asks for direct execution or when the plan allows direct fallback and the user approves it.

## Preflight

Before editing code or running plan steps:

1. Read the plan and review it critically.
2. Read the coding-standards.md skill.
3. Read the all applicable `AGENTS.md` files. (At the project root, plus nested AGENTS.md in the path of files you touch)
4. Read the plan's `Execution Mode` section.
5. Determine whether the user explicitly requested worker mode, explicitly requested direct mode, or did not specify.
6. Determine whether this harness supports worker orchestration.
7. Choose a mode using the rules below.

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
- Workers must read the coding-standards skill and all applicable `AGENTS.md` before implementation.
- Workers should read the full plan for background context, sequencing, and shared constraints.
- Pass the full top-level task text and any additional task-specific context the worker needs.
- The plan may refine `AGENTS.md` within task scope but must not override it.
- Reading the full plan does not expand edit scope or authorize future-task implementation.
- Owned files define the primary edit scope. Allowed shared files cover expected cross-task touch points such as shared types, contracts, utilities, and configuration.
- Small supporting edits outside owned files are allowed only when necessary for code hygiene, to complete the assigned task correctly, or to preserve architectural boundaries and separation of concerns, and they must be reported explicitly in the handoff.
- Within the assigned task scope, workers should look for better local design choices, simpler decompositions, evidence-supported abstractions, structural cleanups, and code-hygiene improvements that improve the result without changing the task's intent.
- Apply AHA and the Rule of Three: normally tolerate two concrete occurrences; at the third, evaluate whether the pattern and ownership are genuinely shared. Abstract earlier only for an existing domain contract, architectural boundary, or correctness invariant, not predicted reuse. Similar-looking code may remain separate when it changes independently.
- Once the task is green, perform the plan's structural review before final checks. Preserve the project's existing structure when it is clear; if the project is still emergent, move the touched code toward clearer responsibilities, separation of concerns, and easier maintenance.
- Use that green-state review to catch responsibility leaks such as wiring or configuration in core logic, transport concerns mixed into domain behavior, persistence details leaking into higher layers, mixed-responsibility files, or functions that now want extraction. Fix these when the change stays within task scope.
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
4. After the task reaches green, perform the plan's structural review and apply any in-scope refactor needed to keep responsibilities well placed and maintain the project's structural conventions.
5. If execution reveals a better structure, missing work, or a needed scope change beyond the task's allowed local judgment, have the orchestrator pause to amend the plan or ask the user before continuing.
6. If context pressure becomes high, finish the current safe boundary if possible, update the plan, write a resumable handoff with current state and the next recommended prompt, and suggest continuing in a fresh session.
7. Mark the task complete only after all required verification and commit steps finish.
8. After all tasks, use `finishing-a-development-branch`.


## Plan File Updates

Update the plan `.md` file as you go so the human has a persistent progress view even if the agent crashes:

- **Checkboxes** — Top-level task `[~]` when starting that task, `[x]` when fully complete (including verify/commit if the plan requires them).
- **YAML `todos`** — When the file has Cursor frontmatter, set the matching todo’s `status` at the same time as the checkbox (see **Cursor plan files** above).

## Remember
- Review plan critically first
- Follow plan steps exactly — **whole task**, including checks and commits when the plan requires them
- Treat the green-state refactor/structure review as mandatory when the plan includes it; do not stop at "tests pass" if the touched code still has obvious responsibility or boundary problems that are in scope to fix
- Don't skip verifications or treat “implementation only” as done
- Reference skills when plan says to
- Stop when blocked, don't guess
- Never start implementation on main/master branch without explicit user consent


## Integration

- Use `using-git-worktrees` before starting implementation.
- `subagent-driven-development` is a compatibility reference for worker orchestration patterns, not a separate default workflow.
