---
name: plan
description: Write or restructure an implementation plan using the writing-plans skill (TDD, Cursor frontmatter, docs/plans layout)
---

# Plan (superpowers:writing-plans)

You are invoked to **draft or revise an implementation plan**. Do not improvise plan structure.

1. **Read** the **writing-plans** skill from this plugin: `skills/writing-plans/SKILL.md` (load the current file from disk; do not rely on memory).
2. **Announce** to the user: `Using writing-plans to [create | revise] the implementation plan` (pick the fit).
3. **Follow** that skill exactly: scope, dependencies/shared contracts, feature flags when relevant, top-down TDD tasks, verify/commit subtasks, YAML Cursor frontmatter with `overview` (including the **superpowers:executing-plans** execution hook), `todos` for each top-level task, `(id)` on top-level checkbox lines, save path `docs/plans/YYYY-MM-DD-<feature>.md` unless the user or project overrides it.
4. If the user named a workstream, milestone, or doc (e.g. roadmap): **read** those files first for scope, then produce the plan.

Do not skip the skill load. Do not replace this workflow with a generic bullet list unless **writing-plans** explicitly allows it for the situation.
