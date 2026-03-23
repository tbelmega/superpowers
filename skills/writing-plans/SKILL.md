---
name: writing-plans
description: Use when you have a spec or requirements for a multi-step task, before touching code
---

# Writing Plans

## Overview

Write implementation plans that an engineer with zero codebase context can follow. Plans are top-down, interface-driven, and test-first. Each task groups related work by user-visible behavior—never by file or layer. Save plans centrally under version control. Optimize plans for compatibility with Cursor plan mode.

**Announce at start:** "I'm using the writing-plans skill to create the implementation plan."

**Context:** Run in a dedicated worktree when possible (see superpowers:using-git-worktrees).

**Save plans to:** `docs/plans/YYYY-MM-DD-<feature-name>.md` — central, version-controlled. User preferences override this default.

## Scope Check

If the spec spans multiple independent subsystems, suggest breaking into separate plans—one per subsystem. Each plan should produce working, testable software on its own.

## Plan Document Structure (Final File Order)

The **saved** plan file MUST begin with a **Cursor Plan Document** YAML frontmatter block, closed by `---` on its own line, then the markdown body. Nothing may appear before the opening `---`.

**Assembly workflow (do this order):**

1. Write the full markdown body first: title, implementer blockquote, Goal, Architecture, Tech Stack, file map, and all tasks with nested detail.
2. Assign every **top-level** task a unique kebab-case **`id`** (stable slug, ASCII; match across YAML and body).
3. On each top-level task’s checkbox line, add **`(id)`** immediately after the checkbox token and before the summary text (see Task Checklist Format).
4. **Then** build the YAML frontmatter: `name`, `overview`, `todos` (one entry per top-level task), `isProject`. Prepend it so the file starts with `---`.

This keeps strategy and narrative in the body while Cursor’s planner can read structured `todos`.

## Cursor Plan Document Header (YAML Frontmatter)

After the plan body is written and top-level task ids are fixed, prepend:

```yaml
---
name: [kebab-case slug; often matches filename feature segment, e.g. admin-api-admin-prefixes]
overview: >
  [1–2 sentences: what this plan delivers and main constraints; align with Goal + Architecture in the body.]
  Before implementing, Read and follow superpowers:executing-plans (load `skills/executing-plans/SKILL.md` from the Superpowers plugin or workspace fork): review the plan, then complete each top-level task in order, including TDD, rules check, run checks, and git commit as written per task. Keep YAML `todos[].status` in sync with top-level checkboxes.
todos:
  - id: [same id as in parentheses on that task’s checkbox line]
    content: "[Same one-line summary as on that top-level task line, without the (id) prefix]"
    status: pending
  # … one YAML entry per top-level task, in the same order as the plan
isProject: false
---
```

**Field rules:**

- **`name`** — Short, unique kebab-case identifier for the plan (not necessarily the full filename).
- **`overview`** — MUST include two parts: (1) **Product/architecture intent** — 1–2 sentences aligned with **Goal** and **Architecture** in the body. (2) **Execution hook** — An explicit instruction to **Read and follow superpowers:executing-plans** before coding (path: `skills/executing-plans/SKILL.md` in the plugin or fork), covering whole-plan execution (review plan → tasks in order → TDD, checks, commits as written) and keeping YAML todo `status` aligned with top-level checkboxes. Cursor and other agents read `overview` in plan mode; this is the primary place to anchor execution discipline.
- **`todos`** — **Only top-level tasks** (one Cursor todo per behavior-grouped task). Sub-bullets under a task are **not** separate YAML todos; their detail stays in the markdown body only.
- **`content`** — The executable summary for that slice; the body underneath carries TDD steps, verify, commit, and nuance. Use YAML quoting if the string contains `:` or quotes.
- **`status`** — Use `pending` for every todo when the plan is first saved. Executing agents update to `in_progress` / `completed` in lockstep with `[~]` / `[x]` on the matching top-level checkbox (and revert or fix if the checkbox and YAML disagree).
- **`isProject`** — Default `false` for repo plans under `docs/plans/`. Set `true` only when the project’s Cursor workflow expects it.

## Markdown Body Header (After Frontmatter)

Immediately after the closing `---` of the YAML block, the markdown MUST continue with:

```markdown
# [Feature Name] Implementation Plan

> **For implementers:** Use **superpowers:executing-plans** for the full workflow (see YAML `overview` for the execution note). Top-level tasks use checkbox (`[ ]` / `[~]` / `[x]`) syntax with a `(todo-id)` matching YAML `todos[].id`.

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

---
```

(The trailing `---` here is an optional markdown horizontal rule before the next section; it is **not** part of the YAML frontmatter.)

## Task Checklist Format

**Top-level tasks** (each maps to one Cursor YAML todo):

- One checkbox line per top-level task, with **`(id)`** right after the brackets:  
  `- [ ] (my-task-id) Short one-line summary of this behavior slice`
- `[~]` / `[x]` replace `[ ]` as work progresses; **keep the same `(id)`** on that line.

**Subtasks** (nested steps under a top-level task: tests, implementation notes, rules check, run checks, commit):

- Use `- [ ]` / `[~]` / `[x]` on each subtask line as today.
- Do **not** add a Cursor todo or `(id)` for subtasks—execution detail stays in the body and refers to the parent task’s id when useful.

**Statuses:**

- `[ ]` — not started (YAML: `pending`)
- `[~]` — in progress (YAML: `in_progress`)
- `[x]` — done (YAML: `completed`)

Every task and subtask MUST keep a one-line summary on its checkbox line where applicable; top-level lines always include `(id)`.

## Dependencies First

**Order:** dependencies and shared contracts before feature behavior.

- If any task requires new **third-party libraries**, add a dedicated **first** task to add all dependencies and run the project's install command (e.g. `yarn install`, `npm install`). This prevents implementation agents from failing mid-task due to missing packages.
- If the work introduces or changes **shared types, API contracts, or schemas** used across modules, add an **early task** (after the dependency-install task if present, before dependent behavior tasks) so downstream tasks target a stable interface.

## Feature Flags

For new features, the spec may require a feature flag (invisible by default, enable in select envs for testing). For multi-tenant SaaS, feature config may also be needed (enable/disable per tenant based on contract). **If the spec doesn't mention it, seek clarification before planning**—did the human not think of it, or do they not want it?

If a feature flag (or per-tenant feature config) is wanted:
- **First task after dependencies** — Add the feature flag infrastructure and wiring.
- **Other tasks** — Implement behavior conditional on the flag (and per-tenant config if applicable). New code is gated; existing behavior unchanged when flag/config is off.

## Cross-cutting Concerns (API Features)

For plans that add or change API endpoints: if the spec doesn't mention them, **ask whether any of these should be added** — input validation, authentication, logging for troubleshooting.

If the user wants any of these: **check the codebase first** for established patterns and libraries (validation schemas, auth middleware, logging). Add tasks that follow existing conventions.

## Top-Down, Interface-Driven Structure

Tasks are written top-down:

1. **Start with the interface** — API endpoint, service facade, UI component, exported library function. The public surface drives the design.
2. **Simple first, then complex** — Bite-sized iterations. Add minimal behavior, verify, then extend.
3. **Inner layers follow the interface** — Don't add files for inner layers before they're used by the public API. Internal structure follows established codebase patterns but is driven by the interface.
4. **Test first (TDD)** — Each task definition starts with the test. Instruct the executing agent to write a failing test against the interface, then implement what's needed to make it pass. Keeps tests lean and focused on observable behavior.

## Test Granularity

- **Integration tests preferred** — Target the public surface: HTTP endpoints, UI components, exported functions. Avoid unit tests per internal file (use case, repository, client, middleware).
- **Exceptions** — Pure infrastructure with no public surface (e.g. a secrets client) may have unit tests for meaningful validation/error logic. Domain logic with many branches can be extracted into pure functions and unit tested, while integration tests cover the main flows.
- **Coverage** — The type system plus integration tests provide sufficient coverage for internal wiring.
- **Property-based tests (fast-check)** — After building a task with regular TDD, consider adding property-based tests if the code is suited: pure functions, invariants (e.g. round-trip serialization, algebraic laws), or transformations with many equivalence classes. Especially valuable when input combinations are numerous and unit tests may miss edge cases.

## Task Structure

Each task follows this shape:

1. **Add or extend a test** — Write failing assertion(s) against the public interface first. Instruct the executing agent to follow project-specific rules for writing tests. 
2. **Implement everything needed to pass** — Across as many files as required (middleware, use case, repository, client, wiring).
3. **Complete when checks pass** — Run the project's `check` script (or equivalent) on touched modules.

**Group by behavior, not by file.** A task like "Add WorkOS provisioning to tenant creation" covers use case, repository, client, shared types, and wiring—driven by one set of test assertions. If complex, iterate: start with a simple test that needs little code, then extend it or add more tests in baby steps.

## Verify and Commit After Each Task

The last subtasks of every task MUST be:

1. **Check rules** — Review changes against project-specific rules (ADRs, Cursor rules, etc.). Output a summary of rules checked and any violations.
2. **Run checks** — Execute the `check` script on all touched modules (or run typechecks and tests for affected modules if no dedicated script exists).
3. **Commit** — `git commit` if checks pass. Pre-generate the commit message into the task, following the commit message rules. (NO PREFIXES feat/fix/chore etc)

## File Structure (Before Tasks)

Map which files will be created or modified and their responsibilities. Lock decomposition decisions here.

- Design units with clear boundaries and well-defined interfaces.
- Prefer smaller, focused files over large ones that do too much.
- Files that change together should live together. Split by responsibility, not by technical layer.
- Follow established patterns in the codebase.

## Anti-Patterns

| Do | Don't |
|----|-------|
| Group related work by behavior | Write a task per file or per layer |
| Start with failing test | Start implementation before the test |
| One task per user-visible behavior | Split one behavior across tasks with intermediate broken states |
| Keep tests at the interface | Add unit tests for internal classes just because they exist |

## Plan Review Loop

After writing the complete plan:

1. Dispatch a plan-document-reviewer subagent (see plan-document-reviewer-prompt.md) with the plan path and spec path—never session history.
2. If ❌ Issues Found: fix the issues, re-dispatch reviewer for the whole plan.
3. If ✅ Approved: proceed to execution handoff.

**Review loop guidance:**
- Same agent that wrote the plan fixes it (preserves context).
- If loop exceeds 3 iterations, surface to human for guidance.
- Reviewers are advisory—explain disagreements if feedback seems incorrect.

## Execution Handoff

After saving the plan, ask the human for review:

**"Plan complete and saved to `docs/plans/<filename>.md`. Please review. Ready to proceed?"**

Once approved, implementation follows **superpowers:executing-plans** — the implementer should Read `skills/executing-plans/SKILL.md` and run the full plan-execution process described there.

## Quick Reference

| Element | Requirement |
|---------|-------------|
| Save location | `docs/plans/YYYY-MM-DD-<feature>.md` |
| File start | Cursor YAML frontmatter (`name`, `overview`, `todos`, `isProject`), then markdown body |
| `overview` | Goal/architecture summary **plus** explicit **superpowers:executing-plans** execution hook (see Cursor Plan Document Header) |
| Cursor `todos` | One entry per **top-level** task; `id` matches `(id)` on that task’s checkbox line; `content` matches the summary; new plans: all `status: pending` |
| Task checklist | Top-level: `[ ] (id) summary` then `[~]`/`[x]` with same `(id)`. Subtasks: `[ ]`/`[~]`/`[x]` only, no `(id)` |
| Dependencies | Dedicated first task if new libraries needed; early task for shared types/contracts when needed |
| Feature flag | If wanted: first task after dependencies; other tasks conditional on flag |
| Cross-cutting (API) | If spec silent: ask about validation, auth, logging; if yes, check codebase for patterns |
| Task order | Test first → implement → verify → rules check → run checks → commit |
| Task grouping | By behavior, not by file or layer |
| Test granularity | Integration at interface; minimal unit tests; consider fast-check for pure functions with many input combinations |
| Execution sync | Keep each YAML todo `status` aligned with its top-level checkbox |

## Common Mistakes

- **Task per file** — "Implement WorkOSClient", "Update TenantRepository", "Update CreateTenantUseCase" as separate tasks. Instead: one task "Add WorkOS provisioning to tenant creation" covering all layers.
- **Implementation before test** — Writing code first, then adding tests. Always write the failing test first.
- **Broken intermediate states** — Splitting a single behavior into multiple tasks where the system is broken in between. Each task should leave the system in a working state.
- **Skipping dependency task** — Adding a library mid-implementation causes the agent to fail. Add a dedicated dependency task first.
