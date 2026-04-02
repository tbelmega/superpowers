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
- Stop and ask instead of guessing when blocked.
- Never start implementation on main/master branch without explicit user consent.

## Workflow

1. Read the plan and review it critically.
2. Mark the current top-level task in progress.
3. Execute every substep in order and capture verification evidence.
4. Mark the task complete only after all required verification and commit steps finish.
5. After all tasks, use `finishing-a-development-branch`.

## Integration

- Use `using-git-worktrees` before starting implementation.
- `subagent-driven-development` is optional and only for human-requested worker orchestration.
