# Research note: meaningful changes made on `main` to the retained skills

**Date:** 2026-07-02
**Question:** For the skills we're keeping in the minimalist fork, what meaningful changes did I
make on the fork's `main` branch (relative to the obra baseline), excluding pure
wording/grammar/formatting?

**Method:** `main` = `obra@7e51643` (v5.0.5 merge) + 35 of my commits. Diffing `7e51643..main`
isolates my changes, free of obra's v5.0.5→v6.1.0 drift. This branch
(`decently-capable-powers`) is based on obra v6.1.0, so where a skill is unchanged on `main`,
the version already here is fine. "Meaningful" excludes wording/grammar/formatting and mechanical
compression that preserved meaning — but removed *substance* is flagged, since that's a real
editorial decision.

---

## Skills I left untouched on `main`
- **`receiving-code-review`** — zero changes. Identical to obra.
- **`systematic-debugging`** — zero changes. Identical to obra.

*(This branch already carries the equivalent versions of these two.)*

## `test-driven-development` — the crown jewels (highest value to port)
This is where I added genuinely new, opinionated discipline — the "integration-style, not
mock-heavy" steering — on top of heavy compression. Meaningful additions:

- **Mock only at system boundaries** (3rd-party services, external APIs) — **never mock the
  project's own code.** Stated as an Iron Law and repeated in the RED section, the Good-Tests
  table, the checklist, and the anti-patterns file.
- **Refactoring is excluded from the test-first rule (new).** When refactoring already-tested
  code (e.g. extracting a method covered by integration tests), do **not** write new tests
  against the refactored code — run the *existing* tests before and after to confirm behavior is
  unchanged. (The "When to Use" list still names refactoring; this paragraph is the nuance.)
- **DRY → AHA (Avoid Hasty Abstractions) + Rule of Three (new).** Replaces "remove duplication"
  in REFACTOR. Don't abstract for predicted reuse; the third occurrence *triggers judgment, not
  automatic extraction*; often write the third concrete case first, then refactor with all three
  visible. Abstract earlier only when a domain contract, architectural boundary, or correctness
  invariant already requires one shared implementation.
- **Never duplicate calculation logic in tests** — hardcode fixed inputs → known outputs (else
  prod and test share the same bug). New Iron Law.
- **Incremental TDD for complex changes** — start with a trivial test (e.g. endpoint returns
  200), pass it, extend, repeat; don't write one large test up front.
- **Run only the current test file during TDD** for fast feedback; full suite only when the task
  is done.
- **Non-deterministic code** (Date/random/uuid) → wrap in an injectable (Clock, etc.), fixed impl
  in tests.
- **Test-structure convention** — Setup → call → verify; follow the codebase's comment style
  (ARRANGE/ACT/ASSERT or GIVEN/WHEN/THEN).
- **New "Frontend Testing" section** — extract logic to pure functions; condition-based waiting
  (`waitFor`/`findBy`) over fixed timeouts; mock at boundaries; explicitly flagged as less
  battle-tested.
- *Removed (compression):* the "Why Order Matters" essay, the worked bug-fix example, and much of
  the duplicated rationalization prose. `testing-anti-patterns.md` was reorganized around the
  same additions (mock-at-boundaries and no-duplicated-calc-logic added as Iron Laws).

## `brainstorming` — substantially expanded (a design-workflow, not just a skill)
Beyond compression, this grew into a full design pipeline. Meaningful additions:

- **Incremental-draft spec workflow.** Create the spec file *early* as `Status: Draft / not for
  implementation`, keep it current as decisions are made, then **finalize** — versus obra's
  write-the-whole-spec-once-at-the-end. Explicit caution not to let draft wording turn
  assumptions into requirements.
- **Spec path** `docs/superpowers/specs/` → `docs/specs/`.
- **Project Design-Workflow Override (new).** If the project defines its own design/UX handoff
  workflow (in `AGENTS.md`/`CLAUDE.md` or a `docs/ux-design/` doc), defer to it *entirely* for
  visual decisions and handoff: don't offer the visual companion, don't create a `ux-brief.md` —
  produce the project's own artifact in its prescribed location instead.
- **Claude Design integration (new).** Visual questions get a three-way offer (visual companion /
  hand to Claude Design / neither), in its own message. If Claude Design is chosen: keep the
  session text-first, capture visual open questions in the spec, and produce a **UX Brief**
  handoff.
- **New file `ux-brief.md` (new).** A full template for the Claude Design handoff — product
  context, entity model, use cases, a "first cut, design will challenge" draft screen list,
  out-of-scope — with strict rules to describe user needs and *not* prescribe UI.
- **Planning Transition Gate (new).** Before `writing-plans`, decide one plan vs. staged plans
  and let the user choose: one plan / a first named slice + later sessions / pause for Claude
  Design mockups / a first plan for design-independent work in parallel with design.
- **Spec Diagrams (new).** Add Mermaid diagrams in the spec when complexity warrants — ER (2+
  entities), sequence (complex inter-module/service/API comms), state (lifecycle), flowchart
  (branching workflow); use judgment, skip for obvious flows.
- *Retained (unlike the earlier main snapshot):* "Design for isolation and clarity" and "Work
  with the existing codebase" survive here as subsections. *Removed (compression):* the "Key
  Principles" list and the process-flow graphviz. `spec-document-reviewer-prompt.md` was
  compressed with no substantive change.

## `verification-before-completion` — compression only, no new rules
Cut 139→28 lines. Iron Law, gate steps, and trigger list all preserved. Dropped: the Red Flags
list, Rationalization-Prevention table, Common-Failures table, worked examples, and the "24
failure memories" rationale. No new behavioral content.

---

## Wholly-mine skills (no obra equivalent) — already on this branch, refreshed to latest main
- **`coding-standards`** (your "code quality"). Notable content: strong/explicit types, no
  `any`/non-null-assertions/casts, boundary type-sync, cross-service type sharing. Newer main
  additions: **truthiness / `if (value)` normalization** (treat all falsy as "not set" so
  `if (value)` is the idiomatic guard, with documented exceptions for PATCH payloads and valid
  `0`/`""`/`false`), and **evolving persisted & API-facing types** (add new fields as optional
  unless shipping a migration; tolerate *omitted* keys, not just `null`).
- **`research`**. Deep-read workflow for mapping current behavior before planning. Newer main
  addition: **check `docs/research/` first** — if prior notes exist, read them, summarize
  coverage + dates, and offer to answer from them / verify-and-update / do full research.
- **`fresh-agent-handover`** (1 commit, wholly mine) — **not pulled** (not named). Available if we
  want it in the review set.

---

## Net takeaways for the rethink
- **TDD additions are the highest-value port** — they encode the exact testing philosophy
  (integration-first, no-mock-own-code, AHA, refactor-without-new-tests) we want, and they came
  *after* the obra baseline this branch is built on. The branch's TDD skill does **not** have
  these yet; porting them is the clear next move.
- **brainstorming on main is now a much richer design pipeline** (Claude Design handoff, UX brief,
  planning-transition gate, spec diagrams, project-workflow override). Some of this leans toward
  the "delegate visual to Claude Design" workflow you described. Worth reviewing which parts fit
  the minimalist thesis vs. which are machinery.
- **verification, receiving-code-review, systematic-debugging** — the obra v6.1.0 versions on this
  branch are already equivalent to (or newer than) your main edits; nothing to port.
- **coding-standards & research** are now on this branch at latest-main content, pending our
  review/rethink.
