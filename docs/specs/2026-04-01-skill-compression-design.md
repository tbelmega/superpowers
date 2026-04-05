Status: Ready for review

# Skill Compression Design

## Goal

Reduce context usage across the repository's skills while preserving their intended behavior and enforcement strength.

## Context

- The repo contains 16 workspace skills under `skills/`.
- Recent work has focused on skill compatibility and additions, including `research` and Cursor alignment.
- Largest skill directories by size are `writing-skills`, `brainstorming`, `systematic-debugging`, `subagent-driven-development`, `using-superpowers`, and `writing-plans`.

## Initial Observations

- Some skills appear to inline both core rules and long rationale/examples.
- Some process instructions may be duplicated across skills.
- Some supporting content may be loaded eagerly from `SKILL.md` rather than deferred to referenced files.
- Output-shaping guidance can likely be tightened so agents emit less text while still following the workflow.

## Scope

- Optimize both `SKILL.md` files and the supporting files they reference, such as prompts, templates, and helper documentation.
- Preserve each skill's general behavior and trigger conditions.
- Focus on token savings from both skill text and the downstream agent output those skills encourage.

## Constraints

- Use a conservative compression strategy.
- Rule retention is more important than maximum token reduction.
- Prefer changes that keep skills readable and keep compliance likelihood high.
- Avoid edits that make agents more likely to skip or weaken required workflows.
- Cross-skill restructuring is allowed, but only when it lowers expected context usage in practice.
- Do not extract shared content mechanically if the affected skills are rarely loaded together or if indirection would increase eager loading.
- Apply the optimization uniformly across the whole skill set, even if some skills only receive modest edits.

## Additional Findings

- `brainstorming`, `writing-skills`, `systematic-debugging`, `subagent-driven-development`, `using-superpowers`, and `writing-plans` are the highest-yield targets.
- Several skills mix mandatory rules with long persuasive rationale, examples, and repeated reminders of the same constraint.
- Some skills inline detailed templates, diagrams, or examples that are useful as references but do not need to be read eagerly on every invocation.
- Some skills encourage verbose agent messaging by explicitly asking for announcements, summaries, or repeated status phrasing where a shorter instruction would suffice.
- Supporting docs are another likely source of savings if they can be referenced only when a workflow branch actually needs them.

## Candidate Approaches

### Approach A: Local Tightening Only

Rewrite each skill in place for concision, keep structure mostly intact, and trim repetition, examples, and output wording without changing how files relate.

Pros:
- Lowest risk to compliance
- Easier review
- Minimal structural churn

Cons:
- Leaves some duplicated guidance in place
- Smaller savings where eager-loaded reference material remains in core files

### Approach B: Conservative Layering

Keep each skill self-sufficient for mandatory rules, but move optional rationale, long examples, and branch-specific detail into supporting files that are loaded only when needed. Standardize concise output guidance across skills where it improves expected context use.

Pros:
- Good token savings without hollowing out the core rule set
- Preserves compliance-critical instructions in the main skill file
- Reduces eager loading of optional material

Cons:
- Requires careful judgment about what is safe to defer
- Adds some indirection

### Approach C: Shared Core References

Extract repeated process guidance across skills into shared references and shrink each skill to a compact trigger and workflow wrapper.

Pros:
- Largest raw deduplication on disk
- Cleaner long-term maintenance if reuse is real

Cons:
- Highest risk that indirection increases practical context use
- Higher chance that agents miss rules if shared guidance is not loaded at the right time
- Less suitable for a conservative pass

## Recommendation

Prefer Approach B.

Keep compliance-critical rules, gates, and mandatory workflow steps inside each `SKILL.md`. Trim repeated persuasion and compress wording. Move optional examples, long rationale, and branch-specific details into referenced files only when they are not needed on every invocation. Apply a uniform pass to all skills, but focus the largest reductions on the highest-cost files.

Status note:
- User approved the conservative-layering approach.

## Execution Structure

For each skill:

1. Identify compliance-critical content that must remain in `SKILL.md`:
   - trigger conditions
   - hard gates
   - required sequence
   - stop conditions
   - instructions that prevent wrong workflow branches
2. Compress the core wording without weakening the rule.
3. Remove or defer lower-value material:
   - repeated rationale
   - duplicate warnings
   - long examples
   - diagrams that restate prose
   - verbose announcement text
   - branch-specific detail that can be loaded only if needed
4. Review supporting files:
   - keep them if they are conditional and prevent mistakes
   - compress them if always needed
   - delete or merge them if they do not justify their load cost
5. Tighten output-shaping guidance so agents emit less text while still following the process.

Approved by user.

## Candidate Optimization Axes

- Shorten frontmatter descriptions while preserving trigger quality.
- Remove repeated rationale where a shorter rule is enough.
- Move heavy examples or edge-case guidance into referenced files.
- Replace verbose prose with compact checklists or rules.
- Tighten instructions about agent-facing output length and when to summarize.
- Avoid requiring eager loading of optional sections unless a branch is actually taken.

## Open Questions

- None currently.

## Success Criteria

- Every skill receives a review and conservative compression pass.
- Compliance-critical behavior remains in the main `SKILL.md`.
- Context usage is reduced through shorter wording, less duplication, and less eager loading.
- Agent-facing output guidance is tightened where safe so skill use produces less chatter.

## Risk Controls

- Do not move rules out of `SKILL.md` when omitting them could plausibly cause non-compliance.
- Prefer preserving clarity and enforcement over maximal size reduction.
- Extract shared content only when expected real-world context usage goes down.
- Verify each rewritten skill against the original required behavior before considering it complete.
