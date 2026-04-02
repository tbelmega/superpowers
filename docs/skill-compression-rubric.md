# Skill Compression Rubric

Use this rubric before and after each skill-compression slice.

## Keep In `SKILL.md`

- Trigger conditions and obvious non-triggers
- Hard gates and stop conditions
- Required workflow order
- Instructions that prevent taking the wrong branch
- Required artifacts, review gates, and handoff points

If removing or moving a line makes non-compliance more likely, keep it in `SKILL.md`.

## Safe To Compress Or Defer

- Repeated persuasion or rationale once the rule is already clear
- Duplicate warnings that restate the same prohibition
- Long examples when one short example or no example is enough
- Diagrams that only restate nearby prose
- Branch-specific details that are only needed when that branch is taken
- Supporting references that are rarely needed and can stay deferred

Do not defer content that must be read on every invocation to avoid mistakes.

## Output Guidance

- Prefer one short announcement if the skill requires one
- Prefer concise status updates over repeated summaries
- Ask for review or approval with direct wording
- Do not require verbose narration when a shorter instruction preserves behavior

## Per-Slice Checklist

- Confirm every touched `SKILL.md` still has valid frontmatter with `name` and `description`
- Confirm every referenced supporting file still exists
- Confirm required hard-gate language or equivalent enforcement still exists
- Confirm deferred content is loaded only on the branch that needs it
- Confirm the rewritten skill is still readable and likely to be followed
- Run `node scripts/verify-skill-compression-baseline.mjs`
