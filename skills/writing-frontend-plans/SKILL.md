---
name: writing-frontend-plans
description: Use when planning frontend work in the Claude Design workflow that spans multiple pages, depends on new or changed shared design-system components, or needs app-side wiring (routes, data, state). For a SINGLE page assembled from components that already exist, do NOT write a plan — follow the project's BUILD-PAGES.md instead.
---

# Writing Frontend Plans

## Overview

Plan a frontend **feature** in the Claude Design workflow — where the look is locked upstream and
per-unit execution is already governed by steering docs (`BUILD-PAGES.md` for pages,
`BUILD-SHARED.md` for the shared design-system package).

**Core principle:** a plan here neither re-describes the UI nor re-describes the build procedure —
both already exist as artifacts. The page **spec + reference composition** are the visual and
structural truth; the **steering docs** are the procedure. A plan exists only to do what neither
can: **sequence multi-unit work and wire the app glue around it.** Anything you re-describe in
prose drifts and demotes the artifact it duplicated.

Sibling to `writing-plans`. It still diverges from it: **no worker mode, no test-first TDD as the
driver of visual work, and shorter plans that point at reference artifacts.** What changed from the
previous version of this skill: page assembly and component build-out are now governed by steering
docs, so this skill stops baking those procedures into the plan and re-centers on sequencing and glue.

**REQUIRED BACKGROUND:** `superpowers:test-driven-development` (drives the app-glue stream, Phase 3)
and `superpowers:verification-before-completion` (the completion gate). Reference these by name —
do not copy them.

## When you need a plan — and when you don't

- **No plan.** A single page assembled from components that **already exist** in the shared
  package. The page-spec *is* the plan; follow `BUILD-PAGES.md`. Writing a plan here only
  paraphrases the spec into prose — the exact drift this workflow exists to prevent. Say so and
  point at `BUILD-PAGES.md` instead of producing a document.
- **Plan.** Any of: the feature spans **multiple page-specs**; a page names a design-system
  component that **does not exist yet** (a shared-release dependency); or the page needs **app-side
  infrastructure** that does not exist (a route, a data source / API client method, state).

## The three streams a plan sequences

| Stream | Trigger | Governed by | Shape |
|---|---|---|---|
| **A — page assembly** | a page-spec (`<Page>.spec.md` + `<Page>.html`) | `BUILD-PAGES.md` | compose existing components per the slot tree |
| **B — shared-DS build-out** | a shared release (`releases/NNN-*.md`) | `BUILD-SHARED.md` | build/extend components in the shared package |
| **C — app glue** | routes, data, state the page binds to | `writing-plans` + `test-driven-development` | behavior work, test-first |

The plan's whole value is **ordering these and connecting them.** It does not re-explain how to
build a page (A) or a component (B) — it references the governing steering doc.

## Phase 0 — inventory & gap check (the part only a plan can do)

1. **List artifacts in scope** — every page-spec + reference composition; any shared release.
2. **Declare per-screen fidelity** — `pixel-target` | `directionally-illustrative` |
   `behavior-only`. Read it from the spec header when present; otherwise state it. The declaration
   is the per-screen definition of done.
3. **Gap check against the library.** Cross every component each spec names against the shared
   package / storybook. **Any miss is a Stream B dependency:** a component-request must be filed and
   the shared release landed *before* the consuming page can be faithful. This cross-stream
   dependency is invisible to the steering docs — surfacing it is the plan's primary job.
4. **Identify app glue** — routes, data sources / API client methods, state the pages bind to
   (read the spec's data-shape section for the contract).

## Ordering

1. **Stream B first** — a page cannot be faithful to components that do not exist. Land the shared
   release, bump the package, then build pages against it.
2. **App-glue contracts** the pages bind to (route, API client method, data shape) — so page tasks
   target a stable interface.
3. **Page assembly** (Stream A).
4. **Regression tests** (Testing model).

State in `Interactions` which tasks are strict-order and which are parallel-safe.

## Task shapes — each task is a pointer, not a re-description

- **Shared-DS task (B):** *"Implement `<components>` per `BUILD-SHARED.md` against
  `releases/NNN-*.md`."* Definition of done = that release's **Acceptance criteria**. Do not restate
  the components' visuals or the build procedure.
- **Page task (A):** *"Build `<Page>` per `BUILD-PAGES.md` against `<Page>.spec.md` + `<Page>.html`."*
  Definition of done = the spec's **Done-checklist** (and the slot-order diff it mandates). For a
  `pixel-target` screen, additionally require a **screenshot-vs-reference deviation check** —
  completion blocked while unapproved deviations remain. Do not copy the spec's slots into the plan.
- **App-glue task (C):** behavior work — **failing test at the public surface first**
  (`test-driven-development`), then wire the route/data/state. This is the only stream where TDD
  drives the build.

Each task ends with the project's checks and a `git commit`. **Group tasks by stream/unit, not by
file or layer.**

## Demo data & copy — already specified, only referenced

The spec marks `"literal"` copy vs `{{ data }}` bindings, and the reference's mock data is
illustrative, not content. The plan **does not restate copy and does not hardcode demo values.** It
points app-glue tasks at the real **data shape** (spec data-shape section) and lets `BUILD-PAGES.md`
govern how fixtures and bindings are built. Keep one note only: app-glue **swaps the data source**
of an already-built page — a source swap, never a restyle or rewrite.

## Testing model

Regression coverage, added after the build — not the driver of visual work.

- **Pages:** fidelity is gated by `BUILD-PAGES.md` self-verify (plus the screenshot check for
  `pixel-target`). Behavioral regression targets the page through its **real, typed API client
  mocked at the HTTP boundary** (MSW / `nock`) — never mock our own client or components, never
  assert "function X was called." Follow the target codebase's existing integration tests.
- **App glue / extracted logic:** unit + integration, test-first.
- The plan **lists the scenarios** (navigation, state changes, actions) — not how to implement
  them. Prefer few significant tests per page over exhaustive coverage.

## Plan-authoring rules

- **Reference, don't paraphrase.** UI → the spec + reference; build procedure → the steering docs.
  If the plan starts re-describing slots, copy, or how to assemble a page, delete it and link.
- **Recognize the non-plan.** A single page from existing components does not get a plan; say so
  and point at `BUILD-PAGES.md`.
- **Land Stream B before its consumers.** Never plan a page against components that don't exist yet.
- **Freedom on implementation, never on the visual contract.** Plans are shorter because detail
  lives in the artifacts and steering docs, not because rigor dropped.
- **No worker mode.** Visual-fidelity work does not decompose into context-isolated workers.
- **Copy only plan mechanics** from `writing-plans` (output format, file map, task shape, commit
  discipline, the plan-review loop). Reference convention skills by name — don't copy them.
- Save to `docs/plans/YYYY-MM-DD-<feature>.md`; checkbox top-level tasks; file map before tasks.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Writing a plan for a single page from existing components | Follow `BUILD-PAGES.md`; a plan here just paraphrases the spec |
| Re-describing the build procedure in the plan | Reference `BUILD-PAGES.md` / `BUILD-SHARED.md` by name |
| Planning a page before its DS components exist | Land the shared release first (Stream B), then build the page |
| Paraphrasing the spec/wireframe into plan prose | Reference it; paraphrase drifts and the artifact is demoted |
| Hardcoding demo data or copy into tasks | Point app glue at the data shape; copy is `"literal"` in the spec |
| Wire the backend first, then "restyle" | Build the page on the spec/reference; app glue swaps the data source |
