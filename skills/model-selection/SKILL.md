---
name: model-selection
description: Use when choosing which harness, model, or reasoning effort to use for a piece of work, or when the current model is a poor fit for the task at hand
---

<!-- personal: tuned to Thiemo's subscriptions and roster, 2026-07. Swap for your own.
     Evidence: docs/research/2026-07-02-model-failure-modes.md §3; revalidated by self-update. -->

# Model Selection

Match the tool to the task — usage budget is a first-class constraint.

## Roster (2026-07)

| Tool | Sweet spot | Watch out |
|------|-----------|-----------|
| Opus 4.8 / Fable (Claude Code), mid–high effort | Planning, multi-file refactors, root-cause debugging, long-horizon orchestration | Sycophancy; reward hacking under pressure; never max effort |
| Sonnet 5 (Claude Code) | Day-to-day implementation when Opus limits matter | Over-engineering — answers a small task with a small project; ~30% more tokens per text |
| GPT-5.5 (Codex CLI), low–high effort | Terminal-heavy work, single-file correctness, implement-from-spec | Overly literal; premature success claims; recency bias — re-state early constraints in long sessions |
| Composer (Cursor) | Fast rote edits, tight IDE loops | Scope bleed; largest measured reward-hacking gap — review its diffs |
| GLM 5.2 (via Cursor) | Cheap bulk work, frontend rotation | Degrades above ~64k context |

## Reasoning Effort

- Default medium/high. Raise only for genuinely hard reasoning: architecture, gnarly debugging,
  wide-blast-radius refactors.
- **Max backfires** — overthinking and context exhaustion; Opus 4.8 measurably does better at
  high than max. Reserve xhigh/max for the hardest asynchronous single-shot tasks, if at all.
- Don't pay high effort for mechanical work: renames, boilerplate, formatting, config.

## Patterns

- **Plan high, implement cheap:** plan/design with the strongest reasoner (Opus high), implement
  from the spec with the cheaper fit (Sonnet / GPT-5.5 / Composer). Dominant practitioner
  pattern, and it matches the spec-carried-guidance workflow (brainstorming skill).
- **Cross-model review:** have a different model review than the one that wrote the code —
  models are blind to their own systematic errors. (Judgment call, not research-verified.)
- **Arbitrage limits:** when one subscription's limit nears, hand the work off
  (agent-handover skill) instead of stopping or degrading.
- **Escalate, don't grind:** a task repeatedly failing at the current tier means step up in
  model/effort — or step back to design. Repetition without change burns budget for nothing.

## For Agents

If the current work clearly fits a different roster entry better (wrong strength, wrong cost,
wrong harness), say so before proceeding rather than grinding through.
