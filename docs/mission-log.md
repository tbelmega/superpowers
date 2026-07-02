# Mission log — fable-powers rebuild

Decision/progress log for the autonomous rebuild of decently-capable-powers. Updated after every
step; the restart point if the session dies. Newest entries at the bottom. Ends with the mission
summary.

## The mission

Build the best version of decently-capable-powers, treating the current branch state as a draft,
not a constraint. Goal: maximize the quality of software Thiemo ships per unit of agent-usage
budget, combining modern harness/model capabilities with his judgment as a Senior Software
Engineer. Every assumption in the draft may be questioned; every decision may be reverted.

**Thiemo's context:**
- Stack: mostly TypeScript / AWS / Kotlin cloud & web development.
- Daily models: Opus 4.8 (mid–xhigh reasoning), Sonnet 5, GPT-5.5 (low–high), Cursor Composer;
  open-weight models (e.g. GLM 5.2) viable via Cursor sub.
- Harnesses: Claude Code (primary), Codex CLI, Cursor.

**Defaults agreed before launch (overridable if research contradicts):**
- Consumption model: user-level/global config per harness; nothing personal checked into shared
  repos. Verify what each harness actually supports before committing to this.
- Repo shape: stack-agnostic behavioral core + separated personal profile; collapse the split if
  the personal layer is too thin to justify it.
- Mission depth: live web research + judgment-driven rebuild; no heavy multi-agent eval machinery.
- Skill drafts quickly tryable; no skill-eval harness.

**Deliverables (the /goal condition):** revised always-on layer and skills, a distribution/update
mechanism, a self-update/re-research skill, this decision log ending with a mission summary
(kept/changed/reverted/added + open questions), all in small green commits on `fable-powers`.

## Plan

1. ✅ Worktree + branch + this log
2. Inventory: all 7 skills, research note, fork-main extras (TDD additions, brainstorming
   pipeline, fresh-agent-handover)
3. Research: harness capabilities July 2026 (Claude Code, Codex CLI, Cursor) — live web
4. Research: persistent model failure modes in the current generation
5. Design: architecture (layers, consumption, repo shape) — decisions logged here
6. Rebuild: always-on layer + skills content
7. Build: distribution/update mechanism
8. Build: self-update/re-research skill
9. Finalize: mission summary, repo consistency, clean history

## Decisions

(Every departure from the draft gets an entry: what changed, why, what it replaces.)

- **D1 — Branch/worktree naming:** `fable-powers` at `/home/thiemo/workspace/fable-powers`,
  branched off `decently-capable-powers` @ 76aeb7a. Plain functional name; the project keeps its
  name — this is a rebuild, not a rebrand.

## Inventory findings (step 2)

Read all 7 branch skills + AGENTS.md + main's TDD/anti-patterns/fresh-agent-handover.
Branch totals ~2,250 lines of skill content. Key observations:

- **brainstorming (159 ln) is internally inconsistent with the fork's own decisions:** it still
  mandates the visual companion (dropped), terminates by invoking `writing-plans` (dropped), and
  writes specs to `docs/superpowers/specs/` (superseded by `docs/specs/`). Needs a ground-up
  rewrite, not a trim.
- **TDD: main's version supersedes the branch's wholesale.** Main is already compressed AND has
  the crown jewels (mock-only-at-boundaries, AHA/Rule-of-Three, refactoring-excluded,
  incremental-trivial-test-first, injectable non-determinism, hardcoded expectations,
  current-file-only runs, frontend section). Same for `testing-anti-patterns.md` (main's has the
  Iron Laws + Testing Trophy). Port main's, then edit.
- **systematic-debugging (296 ln)** still references the `superpowers:` plugin namespace; core is
  sound (root-cause law, Phase 4.5 escalation), heavy padding (real-world-impact stats,
  "human partner's signals" section). Support files (root-cause-tracing, condition-based-waiting,
  defense-in-depth, find-polluter.sh) are self-contained and cheap — keep, they only load on
  demand.
- **receiving-code-review (213 ln)** — core is anti-sycophancy + verify-against-codebase; very
  repetitive (three sections restate the no-thanks rule). Compress hard.
- **verification-before-completion (139 ln)** — essence is strong; overlap with harness-native
  verify/review features must be checked against research findings.
- **coding-standards (59 ln)** — mostly TypeScript-specific; natural candidate to split:
  stack-agnostic principles (core) vs TS/AWS/Kotlin specifics (personal layer).
- **research (30 ln)** — already tight; the `docs/research/` artifact + check-first convention is
  the real value-add over native explore agents.
- **fresh-agent-handover (main, not on branch)** — obra-era problem (context degradation) is now
  partly native (compaction/summarization). BUT reframed as **cross-harness handoff** (moving
  work Claude Code ↔ Codex ↔ Cursor to arbitrage usage limits) it fits Thiemo's multi-sub
  workflow exactly. Candidate to adopt in reshaped form.
- **Tone observation:** obra-era skills use aggressive ALL-CAPS enforcement written for weaker
  models ("delete it", "you're lying"). Per the work-with-the-grain principle, 2026 models need
  the *decision rules*, not the shouting; the rationalization tables are the documented value —
  keep the sharpest rows, cut duplicates and repeated restatements.

## Progress

- 2026-07-02 late evening: mission start. Worktree created, log committed.
- Inventory complete (step 2). Two research agents running in background (steps 3–4).
