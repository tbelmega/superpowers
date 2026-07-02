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

## Progress

- 2026-07-02 late evening: mission start. Worktree created, log committed.
