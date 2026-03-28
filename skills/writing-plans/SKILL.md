---
name: writing-plans
description: Use when you have a spec or requirements for a multi-step task, before touching code
---

# Writing Plans

## Overview

Write implementation plans that an engineer with zero codebase context can follow. Plans are top-down, interface-driven, and test-first. Each task groups related work by user-visible behavior—never by file or layer. Save plans centrally under version control.

**Announce at start:** "I'm using the writing-plans skill to create the implementation plan."

**Context:** Run in a dedicated worktree when possible (see superpowers:using-git-worktrees).

**Save plans to:** `docs/plans/YYYY-MM-DD-<feature-name>.md` — central, version-controlled. User preferences override this default.

## Scope Check

If the spec spans multiple independent subsystems, suggest breaking into separate plans—one per subsystem. Each plan should produce working, testable software on its own.

## Plan Document Structure

The **saved** plan file is a markdown document: title, Goal, Architecture, Tech Stack, file map, and all tasks with nested detail.

## Markdown Body Header

The markdown document MUST begin with:

```markdown
# [Feature Name] Implementation Plan

> **For implementers:** Use **superpowers:executing-plans** for the full workflow. Top-level tasks use checkbox (`[ ]` / `[~]` / `[x]`) syntax.

**Goal:** [One sentence describing what this builds]

**Tech Stack:** [Key technologies/libraries]

## Capabilities

[What does this system need to do? State the functional requirements in plain terms — no implementation detail, no layer names. A short bulleted list or prose paragraph.]

## Component Architecture

[What are the building blocks? Name each service, module, or major abstraction with one sentence on its responsibility.]

## Interactions

[How do the components communicate? Describe the data flow: what triggers what, what calls what, what events flow between components.]

---
```

## Architecture Narrative (Capabilities → Components → Interactions)

Before the task list, write three sections that move from abstract to concrete. These exist for human review — a reviewer should be able to read them and understand *what* is being built and *why* before evaluating the tasks.

- **Capabilities** — What does this system need to do? State the functional requirements in plain terms. No implementation detail, no layer names. Answer: "what can a user or caller do with this?"
- **Components** — What are the building blocks? Name the key services, modules, or major abstractions. One sentence per component describing its sole responsibility. Answer: "what are the named things in this design?"
- **Interactions** — How do the components communicate? Describe the data flow: what triggers what, what calls what, what events are emitted and consumed. Answer: "how does data move through the system?"

**Write these before the file map and task list.** They are the plan's human review surface — readable without codebase knowledge, verifiable by a product manager or architect.

## Task Checklist Format

**Top-level tasks:**

- One checkbox line per top-level task:
  `- [ ] Short one-line summary of this behavior slice`
- `[~]` / `[x]` replace `[ ]` as work progresses.

**Subtasks** (nested steps under a top-level task: tests, implementation notes, rules check, run checks, commit):

- Use `- [ ]` / `[~]` / `[x]` on each subtask line.

**Statuses:**

- `[ ]` — not started
- `[~]` — in progress
- `[x]` — done

Every task and subtask MUST keep a one-line summary on its checkbox line.

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

## Issue Tracker Tickets

After the task list, append a **Tickets** section to the plan with a flat list of ticket titles for the product manager or team lead to create in their issue tracker.

**Each ticket title is a single descriptive line — no body, no sub-items, no extra context.**

**What makes a valid ticket:**

- It describes a **vertical feature slice** — something a user can actually experience. A feature only exists from a user's perspective when it has a UI and works end-to-end (real backend, no mocked data or placeholder UI).
- It is **atomic** — not meaningfully divisible into smaller shippable tickets.

**Allowed exceptions (rare):**

- **Chore** — Purely technical work with no user-visible outcome (e.g. "Migrate database to Postgres 16"). Label it clearly so it isn't confused for a feature.
- **Integration endpoint** — Exposes an API for a technical third-party integrator where the "user" is a developer and no UI is expected (e.g. "Expose webhook API for order status events").

**Format:**

```markdown
## Tickets

- User can log in with Google
- User can invite team members by email
- Admin can view a list of all workspaces
- Chore: upgrade authentication library to v3
```

**Ticket IDs:** The user may later assign IDs from their issue tracker and ask you to map those IDs to the planned commit messages in the plan. When that happens, update each pre-generated commit message in the task list to reference the relevant ticket ID.

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
| Architecture narrative | Three sections before the task list: **Capabilities** (what it does), **Components** (what the building blocks are), **Interactions** (how they communicate) |
| Task checklist | Top-level: `[ ] summary` then `[~]`/`[x]`. Subtasks: `[ ]`/`[~]`/`[x]` |
| Dependencies | Dedicated first task if new libraries needed; early task for shared types/contracts when needed |
| Feature flag | If wanted: first task after dependencies; other tasks conditional on flag |
| Cross-cutting (API) | If spec silent: ask about validation, auth, logging; if yes, check codebase for patterns |
| Task order | Test first → implement → verify → rules check → run checks → commit |
| Task grouping | By behavior, not by file or layer |
| Test granularity | Integration at interface; minimal unit tests; consider fast-check for pure functions with many input combinations |

## Common Mistakes

- **Task per file** — "Implement WorkOSClient", "Update TenantRepository", "Update CreateTenantUseCase" as separate tasks. Instead: one task "Add WorkOS provisioning to tenant creation" covering all layers.
- **Implementation before test** — Writing code first, then adding tests. Always write the failing test first.
- **Broken intermediate states** — Splitting a single behavior into multiple tasks where the system is broken in between. Each task should leave the system in a working state.
- **Skipping dependency task** — Adding a library mid-implementation causes the agent to fail. Add a dedicated dependency task first.
