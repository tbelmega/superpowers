---
name: brainstorming
description: Use before any creative work or behavior change to design the work, persist a spec, and get approval before implementation
---

# Brainstorming Ideas Into Designs

Help turn ideas into fully formed designs and specs through natural collaborative dialogue.

Start by understanding the current project context, then ask questions one at a time to refine the idea. Once you understand what you're building, present the design and get user approval.

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

**Documentation:**

- The spec file should already exist and be mostly complete from incremental updates; **finalize** it (coherence, draft status, contradictions) then commit to `docs/specs/YYYY-MM-DD-<topic>-design.md` (or user-preferred path)
- Use elements-of-style:writing-clearly-and-concisely skill if available
- Commit after finalize and after any later edits from spec review or user review

**Spec Review Loop:**
After the finalized spec is committed:

1. Dispatch spec-document-reviewer subagent (see spec-document-reviewer-prompt.md)
2. If Issues Found: fix, re-dispatch, repeat until Approved
3. If loop exceeds 3 iterations, surface to human for guidance

**User Review Gate:**
After the spec review loop passes, ask the user to review the written spec before proceeding:

> "Spec finalized and committed to `<path>`. Please review it and let me know if you want to make any changes before we start writing out the implementation plan."

Wait for the user's response. If they request changes, make them and re-run the spec review loop. Only proceed once the user approves.

**Implementation:**

- Invoke the writing-plans skill to create a detailed implementation plan
- Do NOT invoke any other skill. writing-plans is the next step.

## Visual Companion

A browser-based companion for showing mockups, diagrams, and visual options during brainstorming. Available as a tool — not a mode. Accepting the companion means it's available for questions that benefit from visual treatment; it does NOT mean every question goes through the browser.

**Offering the companion:** When you anticipate that upcoming questions will involve visual content (mockups, layouts, diagrams), offer it once for consent:
> "Some of what we're working on might be easier to explain if I can show it to you in a web browser. I can put together mockups, diagrams, comparisons, and other visuals as we go. This feature is still new and can be token-intensive. Want to try it? (Requires opening a local URL)"

**This offer MUST be its own message.** Do not combine it with clarifying questions, context summaries, or any other content. The message should contain ONLY the offer above and nothing else. Wait for the user's response before continuing. If they decline, proceed with text-only brainstorming.

**Per-question decision:** Even after the user accepts, decide FOR EACH QUESTION whether to use the browser or the terminal. The test: **would the user understand this better by seeing it than reading it?**

- **Use the browser** for content that IS visual — mockups, wireframes, layout comparisons, architecture diagrams, side-by-side visual designs
- **Use the terminal** for content that is text — requirements questions, conceptual choices, tradeoff lists, A/B/C/D text options, scope decisions

A question about a UI topic is not automatically a visual question. "What does personality mean in this context?" is a conceptual question — use the terminal. "Which wizard layout works better?" is a visual question — use the browser.

If they agree to the companion, read the detailed guide before proceeding:
`skills/brainstorming/visual-companion.md`
