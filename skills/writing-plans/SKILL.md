---
name: writing-plans
description: Use when you have an approved spec or clear requirements for a multi-step task and need an implementation plan before coding
---

# Writing Plans

Write an implementation plan that someone without codebase context can execute.

## Output

- Save to `docs/plans/YYYY-MM-DD-<feature-name>.md`. User preferences override the default.
- The file should begin with the implementation-plan header and state that Top-level tasks use checkbox syntax.
- Before tasks, include `Capabilities`, `Component Architecture`, and `Interactions`.
- Include a file map before the task list.

## Task Rules

- Group work by user-visible behavior, not by file or layer.
- Use top-level tasks for vertical slices and checkbox subtasks for the steps inside each slice.
- Start each task with a failing test at the public interface.
- End each task with rules check, run checks, and `git commit`.
- Add dependency installation first when new packages are needed.
- Add early shared-contract work when later tasks depend on it.

## Planning Rules

- Keep the plan top-down and interface-driven.
- Prefer integration tests; use unit tests only when they add clear value.
- If the spec is silent on feature flags for a new feature, ask before planning.
- For API changes, ask about validation, authentication, and troubleshooting logs if the spec does not cover them.
- Append a flat `Tickets` section after the tasks.

## Review And Handoff

- Run the plan review loop with `plan-document-reviewer-prompt.md` until approved or blocked after 3 rounds.
- Then ask the user to review the saved plan.
- Implementation follows `executing-plans`.
