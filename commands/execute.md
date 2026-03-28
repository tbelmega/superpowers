---
name: execute
description: Execute a written implementation plan using the executing-plans skill (task order, verification, plan checkbox and YAML todo sync)
---

# Execute (superpowers:executing-plans)

You are invoked to **carry out an existing implementation plan**. Do not improvise a substitute workflow.

1. **Read** the **executing-plans** skill from this plugin: `skills/executing-plans/SKILL.md` (load the current file from disk; do not rely on memory).
2. **Announce** to the user: `I'm using the executing-plans skill to implement this plan.`
3. **Follow** that skill exactly: load and critically review the plan (raise concerns before starting if needed); **using-git-worktrees** when the skill requires isolation; execute each top-level task **in order** with full fidelity (TDD substeps, project rules review, named check commands, **git commit** when the plan says so); keep **body checkboxes** and YAML **`todos[].status`** in sync with matching `(id)` lines; after all tasks, use **finishing-a-development-branch** as that skill requires. Use **subagent-driven-development** only if the human explicitly asked for Task-tool workers—it does not replace executing-plans obligations.
4. If the user named a plan file or path: **read** it first. If they did not, locate the plan they mean (e.g. under `docs/plans/`) before executing.

Do not skip the skill load. Do not replace this workflow with a generic “implement the feature” pass unless **executing-plans** explicitly allows it for the situation. Do not ignore instructions to check and commit.
