# Skill Compression Implementation Plan

> **For implementers:** Use **superpowers:executing-plans** for the full workflow. Top-level tasks use checkbox (`[ ]` / `[~]` / `[x]`) syntax.

**Goal:** Reduce context usage across all repository skills and their supporting files without weakening trigger quality, hard gates, or workflow compliance.

**Tech Stack:** Markdown skill documents, prompt templates, shell helpers, lightweight repo validation commands, git

## Capabilities

The skill set should remain behaviorally equivalent while using fewer tokens in practice. Each skill must still tell an agent when it applies, which rules are mandatory, what sequence to follow, and what must not be skipped. Optional rationale, long examples, and branch-specific reference material should load only when needed. Skills should also encourage shorter agent output during use.

## Component Architecture

- `docs/specs/2026-04-01-skill-compression-design.md` is the governing design document for compression goals, constraints, and risk controls.
- Core skill files under `skills/*/SKILL.md` define trigger conditions, hard gates, required workflow, and output-shaping guidance.
- Supporting skill files under `skills/**` hold conditional detail such as reviewer prompts, visual-companion guidance, anti-pattern references, and helper docs.
- Validation commands and manual review checkpoints confirm that edits preserve structure, references, and enforcement-critical content.

## Interactions

The implementer uses the approved design spec to review each skill and supporting file, separates enforcement-critical instructions from optional material, and rewrites the core skill text conservatively. When optional content is still needed, it is deferred into supporting files only if that reduces expected context usage. After each behavior slice, the implementer verifies structure and references, reviews the rewritten content against the original requirements, and commits the slice before moving on.

---

## File Map

| Path | Role |
|------|------|
| `docs/specs/2026-04-01-skill-compression-design.md` | Approved design constraints and evaluation criteria |
| `docs/plans/2026-04-01-skill-compression.md` | Execution plan for the compression pass |
| `skills/using-superpowers/SKILL.md` | Global entry skill; highest sensitivity for default context cost |
| `skills/coding-standards/SKILL.md` | Common coding guidance; candidate for concise core rules |
| `skills/research/SKILL.md` | Research workflow and artifact requirements |
| `skills/brainstorming/` | Design workflow skill plus visual companion and reviewer prompt |
| `skills/writing-plans/` | Planning workflow skill plus plan reviewer prompt |
| `skills/executing-plans/SKILL.md` | Default implementation workflow referenced by plans |
| `skills/verification-before-completion/SKILL.md` | Completion gate for verification evidence |
| `skills/using-git-worktrees/SKILL.md` | Optional isolation workflow referenced by planning/execution |
| `skills/test-driven-development/` | TDD core skill plus anti-pattern reference |
| `skills/systematic-debugging/` | Debugging workflow plus multiple supporting references and scripts |
| `skills/receiving-code-review/SKILL.md` | Code-review intake and response guidance |
| `skills/requesting-code-review/` | Review-request workflow plus reviewer guidance |
| `skills/finishing-a-development-branch/SKILL.md` | End-of-branch integration workflow |
| `skills/writing-skills/` | Skill-authoring workflow plus examples, references, and helper scripts |
| `skills/dispatching-parallel-agents/SKILL.md` | Parallel delegation guidance |
| `skills/subagent-driven-development/` | Alternate implementation orchestration plus three prompt templates |
| `skills/**` supporting files | Conditional references to keep only when they reduce expected context |

## Task 1: Establish the compression rubric and repository-wide verification baseline

- [ ] Add or update a lightweight verification checklist that can be used before and after each rewrite slice to confirm frontmatter validity, required references, and preserved hard-gate language where applicable.
- [ ] Document the compression rubric in repo files used by implementers during this pass: what must stay in `SKILL.md`, what may move to supporting files, and what output-shaping guidance should be tightened.
- [ ] Verify the rubric covers both skill text and supporting files and aligns with the approved design spec.
- [ ] Review changes against project-specific rules and summarize any violations.
- [ ] Run relevant checks for touched files, such as markdown/reference validation and any project check command that applies.
- [ ] Commit with message: `Add skill compression rubric and verification baseline`

## Task 2: Reduce default-load and low-branching skills without weakening discovery or core rules

- [ ] Add or extend a failing verification step for this slice that captures the intended compression targets for `using-superpowers`, `coding-standards`, and `research` while preserving trigger quality and mandatory behavior.
- [ ] Rewrite `skills/using-superpowers/SKILL.md` to keep the loading mandate and discovery behavior intact while trimming repetition, reducing persuasive overhead, and deferring non-essential reference detail.
- [ ] Rewrite `skills/coding-standards/SKILL.md` and `skills/research/SKILL.md` to keep their rules intact while making instructions and expected agent output more concise.
- [ ] Review any supporting references touched by this slice and defer or compress them only if expected context usage improves.
- [ ] Verify the revised skills still preserve clear triggers, hard gates, and artifact requirements.
- [ ] Review changes against project-specific rules and summarize any violations.
- [ ] Run relevant checks for touched files, such as markdown/reference validation and any project check command that applies.
- [ ] Commit with message: `Compress default-load skill guidance`

## Task 3: Compress design and planning workflow skills while preserving approval gates

- [ ] Add or extend a failing verification step for this slice covering `brainstorming`, `writing-plans`, `executing-plans`, `using-git-worktrees`, and `verification-before-completion`.
- [ ] Rewrite each core `SKILL.md` to preserve required approval gates, plan/spec persistence, workflow ordering, and completion verification while trimming repeated rationale and overly verbose agent phrasing.
- [ ] Review and compress branch-specific supporting files in these directories, including reviewer prompts and visual-companion guidance, keeping only detail that is actually needed when that branch is taken.
- [ ] Verify that required handoff points, review requests, and persistent-document expectations are still explicit in the rewritten files.
- [ ] Review changes against project-specific rules and summarize any violations.
- [ ] Run relevant checks for touched files, such as markdown/reference validation and any project check command that applies.
- [ ] Commit with message: `Compress planning workflow skills`

## Task 4: Compress implementation and review discipline skills while preserving enforcement strength

- [ ] Add or extend a failing verification step for this slice covering `test-driven-development`, `systematic-debugging`, `receiving-code-review`, `requesting-code-review`, and `finishing-a-development-branch`.
- [ ] Rewrite the core skills to keep the iron laws, stop conditions, and required review or verification loops intact while reducing repeated warnings, duplicated rationale, and chatty output instructions.
- [ ] Review supporting references in these directories, keeping examples and auxiliary docs only when they are conditionally useful; compress or remove stale material that does not justify its load cost.
- [ ] Verify that the revised skills still make it hard for an agent to skip testing, root-cause analysis, review rigor, or completion verification.
- [ ] Review changes against project-specific rules and summarize any violations.
- [ ] Run relevant checks for touched files, such as markdown/reference validation and any project check command that applies.
- [ ] Commit with message: `Compress implementation discipline skills`

## Task 5: Compress skill-authoring and orchestration skills plus their prompt templates

- [ ] Add or extend a failing verification step for this slice covering `writing-skills`, `dispatching-parallel-agents`, and `subagent-driven-development` plus their supporting prompt/reference files.
- [ ] Rewrite `writing-skills` conservatively so it still teaches the TDD-for-skills workflow, discovery rules, and verification discipline while loading less rationale and fewer inline examples up front.
- [ ] Rewrite orchestration skills to preserve when-to-use boundaries, review ordering, and worker/prompt requirements while reducing duplicated process prose and unnecessary narration requirements.
- [ ] Compress prompt templates and support docs where safe, preserving the fields and instructions needed for correct worker behavior.
- [ ] Verify that delegated-work and skill-authoring workflows remain explicit enough to prevent skipped review stages or weakened testing discipline.
- [ ] Review changes against project-specific rules and summarize any violations.
- [ ] Run relevant checks for touched files, such as markdown/reference validation and any project check command that applies.
- [ ] Commit with message: `Compress skill authoring and orchestration guidance`

## Task 6: Run a full consistency pass across all skills and supporting files

- [ ] Add or extend a final failing verification step that checks for broken references, malformed frontmatter, missing required prompts, and accidental removal of core workflow gates across the whole `skills/` tree.
- [ ] Review every touched skill and support file together for duplicated wording, inconsistent compression patterns, and places where extra indirection increased rather than decreased expected context usage.
- [ ] Make final targeted edits so the whole skill set uses a consistent conservative-layering strategy.
- [ ] Verify the final state against the approved spec and confirm each skill still preserves trigger quality, mandatory behavior, and readable enforcement.
- [ ] Review changes against project-specific rules and summarize any violations.
- [ ] Run relevant checks for touched files, such as markdown/reference validation and any project check command that applies.
- [ ] Commit with message: `Finalize repository-wide skill compression`

## Tickets

- Chore: define a safe compression rubric for skill documents and support files
- Chore: reduce default-load skill context without weakening discovery rules
- Chore: compress planning workflow skills while preserving approval gates
- Chore: compress implementation discipline skills while preserving enforcement
- Chore: compress skill authoring and orchestration prompts
- Chore: run final consistency and validation pass across all skills
