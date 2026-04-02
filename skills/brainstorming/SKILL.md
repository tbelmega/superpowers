---
name: brainstorming
description: Use before any creative work or behavior change to design the work, persist a spec, and get approval before implementation
---

# Brainstorming

Use this skill before implementation for any feature, behavior change, or creative work.

<HARD-GATE>
Do not implement before presenting a design and getting user approval.
</HARD-GATE>

## Workflow

1. Explore project context.
2. If upcoming questions are visual, offer the visual companion in its own message and wait. If accepted, read `skills/brainstorming/visual-companion.md`.
3. Create `docs/specs/YYYY-MM-DD-<topic>-design.md` with `Status: Draft / not for implementation`.
4. Ask one question at a time.
5. Propose 2-3 approaches with trade-offs and a recommendation.
6. Present the design in sections and get approval as you go.
7. Finalize the spec, remove contradictions, update status, and commit.
8. Run the spec review loop with `spec-document-reviewer-prompt.md` until approved or blocked after 3 rounds.
9. Ask the user to review the written spec.
10. After approval, invoke `writing-plans` and no other implementation skill.

## Spec Rules

- Keep the spec on disk in sync throughout the discussion.
- Update earlier sections when decisions change; do not leave conflicting truths in place.
- If the request is too large for one spec, decompose it and brainstorm only the first sub-project.

## Conversation Rules

- Ask one question at a time.
- Prefer multiple-choice questions when practical.
- Understand purpose, constraints, success criteria, and whether a feature flag is needed for new features.
- Present only the changes needed for the current goal; avoid unrelated refactoring.

## Handoff

- After the spec review loop passes, ask the user to review the spec file before planning.
- The next skill after brainstorming is `writing-plans`.
