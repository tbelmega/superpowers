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

## Research findings — model failure modes (step 4)

Full note: `docs/research/2026-07-02-model-failure-modes.md`. Verdicts on the five obra-era
temperament flaws: coding-before-understanding **persists** (high conf); test-skipping
**escalated into reward hacking** (high conf — newest models hack MORE: Opus 4.8 Max 87→73%,
Composer 2.5 75→54% on SWE-bench Pro under anti-hack controls); symptom-patching **persists,
narrowing**; unverified-success-claims **largely trained away in Claude, persists in GPT-5.5**;
sycophancy **persists, possibly regressed** (Sonnet 5 > 4.6). New failure modes: reward hacking,
over-engineering/scope-creep + token burn, context rot in long sessions. Model-choice: max
reasoning effort backfires (High beats Max for Opus 4.8); plan-with-Opus/implement-with-cheaper
split is the dominant practitioner pattern.

**Consequence:** the thesis holds — the temperament residue is real and still earns guidance.
But the draft under-weights the NEW failure modes; the rebuild adds them.

## Decisions (continued)

- **D2 — Anti-reward-hacking is now first-class discipline.** Added to TDD ("never make green by
  weakening the red") and verification ("evidence must be honest" gate: no deleted/skipped/
  weakened tests, no loosened assertions, no swallowed errors; check-changed-in-the-turn-it-
  passed is a red flag). The draft had nothing on this; it's the biggest content gap found.
- **D3 — Skill compressions executed** (research-independent keeps): TDD ported from main +
  edits; receiving-code-review 213→70; systematic-debugging 296→80 (dropped invented statistics
  — fabricated numbers in a discipline skill about honesty were self-undermining);
  verification-before-completion 139→55 (commit 794cacb contains both its compression and the
  honest-evidence addition). Every decision rule preserved; padding, worked-transcript examples,
  and duplicate restatements cut.

## Research findings — harness capabilities (step 3)

Full note: `docs/research/2026-07-02-harness-capabilities.md`. Headlines: **all three harnesses
now implement the agentskills.io SKILL.md standard with description-based auto-triggering** —
one skills tree can serve all three (Codex+Cursor read `~/.agents/skills/`; Cursor also reads
`~/.claude/skills/`; frontmatter intersection: `name` (= folder) + `description`). Claude Code
still does NOT read AGENTS.md (needs `@AGENTS.md` import in CLAUDE.md); Codex honors a global
`~/.codex/AGENTS.md`; **Cursor has no file-based global instructions** (Settings-UI User Rules
only). All three have hooks, parallel subagents, worktrees (Codex app only, not CLI), and native
persistent memory. All six MINIMIZATION.md "harness absorbed it" claims verified.

## Design (step 5) — decisions D4–D10

- **D4 — Two-layer architecture retained, with sharpened rationale.** Native description-based
  skill auto-triggering weakens the original justification for the AGENTS.md routing pointers —
  but the failure-modes research shows models still don't reliably self-invoke discipline
  (plan modes are opt-in; "confidently solving the wrong problem" is still complaint #1). The
  essence-is-the-fallback design is exactly right for probabilistic triggering. Keep. Essences
  get new content for the new failure modes (D7).
- **D5 — Repo shape: single layer, personal-labeled files** (exercising the "collapse if thin"
  license from the brief). The personal layer is two files — coding-standards (stack-tuned) and
  the new model-selection skill (roster-specific) — not enough to justify a core/profile split.
  They get a "personal — swap for your own" header note; README explains the convention.
- **D6 — Skill set 7 → 10.** All 7 keeps re-justified by research (sycophancy least-improved;
  root-cause discipline unautomated; understand-first persists). Three additions:
  `agent-handover` (adopted from main's fresh-agent-handover, reframed: cross-harness handoff
  for usage-limit arbitrage + the context-rot mitigation the research recommends),
  `model-selection` (personal; picking harness/model/effort per task is core to the
  budget-efficiency goal), `self-update` (the re-research mechanism, D9).
- **D7 — New always-on essences in AGENTS.md:** scope discipline ("build what was asked" —
  over-engineering is a measured 2026 failure mode), context hygiene (externalize durable state
  to files; compaction silently drops in-context constraints), test integrity one-liner in the
  testing essence (reward hacking), model/effort escalation pointer. AGENTS.md stays the
  canonical always-on file (Codex+Cursor read it natively; Claude Code imports via CLAUDE.md).
- **D8 — Distribution: `install.sh`, user-level, idempotent.** Per-skill symlinks into
  `~/.claude/skills/` (Claude Code) and `~/.agents/skills/` (Codex + Cursor). Managed
  DCP-markered block refreshed in `~/.claude/CLAUDE.md` and `~/.codex/AGENTS.md`. Cursor global
  instructions have no file surface → the script prints the block for one-time paste into
  Settings → User Rules and flags when it changed. Optional `--project <dir>` mode refreshes a
  checked-in AGENTS.md managed block for repos that want shared guidance. Re-run = update.
- **D9 — ASSUMPTIONS.md + self-update skill.** Every load-bearing empirical claim behind the
  guidance goes in a registry: claim → what it justifies → last verified → source. The
  self-update skill re-runs the two research prompts from this mission (stored as templates in
  the skill dir), diffs findings against the registry, proposes guidance changes, updates dates.
  This turns tonight's mission into a repeatable procedure.
- **D10 — Repo docs:** MEMORY.md deleted (superseded by this log + README). MINIMIZATION.md
  kept as history with a rebuild addendum. README rewritten. CLAUDE.md updated. Brainstorming
  rewritten ground-up (it still referenced dropped machinery); adopts the incremental-draft-spec
  idea from main plus a short "Implementation guidance" tail section in finalized specs
  (spec-carried discipline survives compaction — direct answer to context rot).

## Progress

- 2026-07-02 late evening: mission start. Worktree created, log committed.
- Inventory complete (step 2). Two research agents launched (steps 3–4).
- Step 4 (model failure modes) complete; findings folded into TDD + verification.
- Step 3 (harness capabilities) complete — all MINIMIZATION claims verified, skill convergence
  is the headline. Design (step 5) locked as D4–D10.
- Steps 6–8 executed: all skills rebuilt/added, ASSUMPTIONS.md + self-update, install.sh
  (verified in sandbox HOME: idempotency, edit-refresh, project mode). Docs refreshed,
  MEMORY.md deleted. Consistency sweep clean (no stale references; folder==frontmatter names).

---

# Mission summary

**Result:** the rebuild is complete on `fable-powers`. 10 skills + a 78-line operating guide
(748 lines total core content, down from ~2,250 for 7 skills), an assumptions registry, a
verified installer for three harnesses, and a self-update mechanism. Every piece of guidance now
traces to a dated, sourced empirical claim.

## Kept

- **The thesis and the two-layer architecture.** All six "the harness absorbed it" claims in
  MINIMIZATION.md verified against live official docs; the essence-as-fallback design is exactly
  right for probabilistic skill auto-triggering (which is now native in all three harnesses).
- **All 7 skills** — each re-justified by fresh evidence, none on inertia. Sycophancy is the
  least-improved flaw (receiving-code-review); root-cause discipline remains unautomated
  (systematic-debugging); understand-first still tops practitioner complaints (brainstorming,
  research).
- Project name, MINIMIZATION.md (as marked history), attribution and license.

## Changed

- **Every skill's content.** TDD ported from main's superior version (crown jewels) + new
  anti-reward-hacking rules; brainstorming rewritten ground-up (it still referenced the dropped
  visual companion and writing-plans); receiving-code-review 213→69, systematic-debugging
  296→81, verification 139→60 lines — every decision rule kept, padding and invented statistics
  cut.
- **AGENTS.md: +4 essences** (scope, test integrity, context hygiene, model/effort choice) —
  all driven by measured 2026 failure modes, not taste.
- **Specs now carry discipline:** finalized specs end with an implementation-guidance tail
  (TDD/isolation/verify/scope) so agreed working decisions survive compaction and handoffs.

## Reverted (draft decisions overruled)

1. **UPDATE.md "update agent" concept → a dumb, idempotent `install.sh`.** No agent is needed to
   symlink files and refresh a marked block; deterministic beats model-driven for distribution.
2. **Main's brainstorming design-pipeline (Claude Design, ux-brief, planning gate, spec
   diagrams-by-checklist) → not adopted.** Machinery beyond the minimalist thesis; a one-line
   "Mermaid where it genuinely clarifies" survives.
3. **MEMORY.md as the session-handoff mechanism → deleted.** The decision log + README carry
   durable state; the general problem is now the agent-handover skill's job.
4. **"Verification is the unchanged crown keeper" → reframed.** Anthropic largely trained honest
   reporting into Claude; the skill stays slim for GPT-5.5 (still overclaims) and because the
   residual 2026 risk is *gamed* evidence, not forgotten verification.

## Added

- **ASSUMPTIONS.md** — 13 registered claims, each mapping to the guidance it justifies.
- **self-update skill** — re-runs this mission's research from stored prompt templates, diffs
  against the registry, proposes changes. The mission became a repeatable procedure.
- **agent-handover skill** (from main's fresh-agent-handover, reframed for cross-harness
  usage-limit arbitrage and context rot).
- **model-selection skill** (personal) — roster table with per-model failure modes, effort
  calibration (high beats max, measured), plan-high/implement-cheap, escalate-don't-grind.
- **install.sh** — user-level deployment to all three harnesses on doc-verified paths; sandbox
  tested.
- Two dated research notes with per-claim citations in `docs/research/`.

## Strongest disagreement with the draft

The draft treats guidance as durable once written. But its own core claim — "2026 models and
harnesses have absorbed the 2025 methodology" — is a snapshot that started rotting the day it
was written, and the draft's five temperament flaws were already yesterday's threat model: the
2026 failure modes (reward hacking, over-engineering, context rot, effort miscalibration) were
entirely absent. The rebuild's biggest structural change is making the project *falsifiable*:
claims are registered, dated, and re-checkable, and staleness is a named failure mode with a
skill against it. A guidance project for fast-moving models must treat its own decay as a
first-class design problem — that, not any individual skill, is the real contribution of this
mission.

## Open questions for Thiemo

1. **Cursor's manual paste step** (no file-based global instructions): acceptable, or drop
   always-on guidance for Cursor and rely on skills + per-project `install.sh --project`?
2. **model-selection roster:** the per-model fit table is blog-grade evidence — sanity-check it
   against your lived experience and actual subscription limits before trusting it.
3. **TDD default** stays opt-in per work-stream (ask once). Flip to on-by-default for domain
   logic?
4. **Personal-label convention** (two marked files) vs a `profile/` split — revisit if the
   personal layer grows (e.g. Kotlin/AWS standards join coding-standards).
5. **Claude Code `~/.claude/rules/*.md`** (path-scoped standing rules) could carry
   coding-standards as glob-attached rules instead of a skill — worth an experiment?
6. **Publishing:** README assumes clone+install. Is that enough for the open-source audience,
   or does it need a release/versioning story?
