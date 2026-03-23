---
name: executing-plans
description: Use when you have a written implementation plan to execute — default Superpowers path (matches writing-plans plan overview and Cursor plan frontmatter)
---

# Executing Plans

## Overview

Load plan, review critically, execute all tasks, report when complete. **superpowers:writing-plans** instructs implementers to follow **this** skill; treat it as the canonical execution contract unless the human explicitly chooses an optional workflow (see [Optional: Task workers](#optional-task-workers-and-two-stage-review)).

**Fidelity to the plan:** A task is **not** done when the code “looks right.” You must complete **everything** the plan assigns for that task **in order**: tests/TDD steps, implementation, **project rules review**, **running the checks** the plan names (scripts, typecheck, tests for touched modules), **`git commit`** when the plan says to, and any other listed subtasks. Non-code steps are **mandatory deliverables**, not optional follow-up. If the plan names a command, run it (or stop and ask if the environment truly cannot run it). Do not report a task complete while skipping its verification or commit steps.

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

## Plan File Updates

Update the plan `.md` file as you go so the human has a persistent progress view even if the agent crashes:

- **Checkboxes** — Top-level task `[~]` when starting that task, `[x]` when fully complete (including verify/commit if the plan requires them).
- **YAML `todos`** — When the file has Cursor frontmatter, set the matching todo’s `status` at the same time as the checkbox (see **Cursor plan files** above).

## Optional: Task workers and two-stage review

**superpowers:subagent-driven-development** documents an **optional** pattern: you stay in the controller role and use the **Task** tool (when available) to run implementer + spec + code-quality reviewer workers after each task.

Use it **only when the human explicitly asks** for that workflow. It does **not** replace this skill’s obligations—whole-task fidelity (TDD, checks, commits, plan checkboxes, YAML todo sync) still applies. Plans from **writing-plans** name **executing-plans** in `overview`; treat that as the baseline **what** to deliver; Task workers are a different **how**.

## Remember
- Review plan critically first
- Follow plan steps exactly — **whole task**, including checks and commits when the plan requires them
- Don't skip verifications or treat “implementation only” as done
- Reference skills when plan says to
- Stop when blocked, don't guess
- Never start implementation on main/master branch without explicit user consent

## Integration

**Required workflow skills:**
- **superpowers:using-git-worktrees** — REQUIRED: Set up isolated workspace before starting
- **superpowers:writing-plans** — Creates the plan this skill executes (including Cursor `overview` execution hook)
- **superpowers:finishing-a-development-branch** — Complete development after all tasks

**Optional (human-requested):**
- **superpowers:subagent-driven-development** — Task-tool worker loop with two-stage review; same plan fidelity as this skill
