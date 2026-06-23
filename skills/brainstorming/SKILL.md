---
name: brainstorming
description: Use before creative work, new features, components, functionality, or behavior changes
---

# Brainstorming Ideas Into Designs

Help turn ideas into fully formed designs and specs through natural collaborative dialogue.

Start by understanding the current project context, then ask questions one at a time to refine the idea. Once you understand what you're building, present the design and get user approval.

<HARD-GATE>
Do not implement before presenting a design and getting user approval.
Do NOT invoke an implementation skill, write code, scaffold a project, or take
any other implementation action before approval. This applies regardless of perceived simplicity.
</HARD-GATE>

## No "Too Simple" Exception

Small changes still contain assumptions. The design may be only a few sentences,
but you must present it and get approval before implementation.

## Project Design-Workflow Override

Before offering visual handling (step 2) or creating a UX Brief (step 8), check
whether the project defines its own design/UX handoff workflow — declared in its
`AGENTS.md`/`CLAUDE.md` or a `docs/ux-design/` (or similar) workflow document.

If one exists, **defer to it entirely for visual decisions and the design
handoff**:

- Do **not** offer the visual companion.
- Do **not** create a `ux-brief.md`-style brief. Produce the project's own handoff
  artifact in the project's prescribed location and format instead.
- Follow the project's rules for where visual decisions are made (e.g. an external
  design tool) rather than making them in this session.

Everything else in this skill is unchanged: project context exploration,
one-question-at-a-time discovery, approach trade-offs, the engineering
`…-design.md` spec, the spec-review loop, and the planning transition all still
apply.

## Workflow

1. Explore project context.
2. If upcoming questions are visual, offer visual handling options in its own message and wait: use the visual companion here, or leave visual decisions and visual brainstorming to Claude Design, or none. If the user chooses the visual companion, read `skills/brainstorming/visual-companion.md`.
3. Create `docs/specs/YYYY-MM-DD-<topic>-design.md` with `Status: Draft / not for implementation`.
4. Assess whether the request fits one coherent spec. If it contains multiple independent subsystems, decompose it before detailed questioning and brainstorm the first coherent slice.
5. Ask one question at a time.
6. Propose 2-3 approaches with trade-offs and a recommendation.
7. Present the design in sections and get approval as you go.
8. If the user chose Claude Design for visual work, create a UX Brief handoff from `skills/brainstorming/ux-brief.md`.
9. Finalize the spec, and the UX Brief if one was created, remove contradictions, update status, and commit.
10. Run the spec review loop with `spec-document-reviewer-prompt.md` until approved or blocked after 3 rounds.
11. Ask the user to review the written spec and choose the planning transition.
12. After approval and a planning-transition choice, invoke `writing-plans` and no other implementation skill.

## Understanding The Idea

- Check relevant files, documentation, and recent commits before proposing changes.
- Determine the purpose, constraints, success criteria, and explicit non-goals.
- If the request contains multiple independent subsystems, identify their
  boundaries, relationships, and build order. Each independently shippable
  sub-project gets its own spec, plan, and implementation cycle.
- Ask one question per message. Prefer multiple choice when the options are
  known; use open-ended questions when discovery is still needed.
- Keep the draft spec current as decisions are made. Do not let draft wording
  turn assumptions into requirements.

## Exploring Approaches

- Propose 2-3 genuinely different approaches.
- Lead with your recommended approach and explain why it best fits the stated
  constraints.
- Make trade-offs concrete: complexity, coupling, migration cost, operational
  risk, user impact, and reversibility where relevant.
- Apply YAGNI. Remove features and abstractions that do not serve an approved
  requirement.

## Presenting The Design

- Scale each section to its complexity: brief for straightforward decisions,
  more detailed where trade-offs or failure modes are subtle.
- Cover the relevant architecture, components, data flow, error handling, and
  testing strategy.
- Validate sections incrementally and revise when the user identifies a wrong
  assumption.

### Design For Isolation And Clarity

- Give each unit one clear purpose and expose well-defined interfaces.
- For each unit, make clear what it does, how callers use it, and what it
  depends on.
- Prefer boundaries that let consumers understand behavior without reading
  internals and let implementations change without breaking consumers.
- Keep units independently testable. Treat files that accumulate unrelated
  responsibilities as a design warning.

### Work With The Existing Codebase

- Follow established project patterns unless they conflict with the approved
  requirements.
- Include targeted improvements when existing boundaries directly obstruct the
  design.
- Do not propose unrelated refactoring.

**Documentation:**

- The spec file should already exist and be mostly complete from incremental updates; **finalize** it (coherence, draft status, contradictions) then commit to `docs/specs/YYYY-MM-DD-<topic>-design.md` (or user-preferred path)
- If the user chose Claude Design, finalize the UX Brief handoff too and include it in the same commit unless there is a clear reason to commit separately.
- Use elements-of-style:writing-clearly-and-concisely skill if available
- Commit after finalize and after any later edits from spec review or user review

**Spec Diagrams:**
When a spec becomes complex enough that a human reviewer would struggle to understand it from prose alone, add Mermaid diagrams directly in the markdown spec file. Choose diagrams that clarify the shape of the system; do not add diagrams for simple, obvious flows or well-established patterns.

Useful triggers:

- If the spec introduces two or more meaningful data entities, add a Mermaid entity-relationship diagram.
- If the spec describes complex communication between modules, services, users, or third-party APIs, add a Mermaid sequence diagram.
- If the spec includes meaningful state transitions or lifecycle rules, add a Mermaid state diagram.
- If the spec describes a branching workflow, approval flow, or multi-step operational process, add a Mermaid flowchart.

Use informed judgment. A diagram should reduce review effort, expose ambiguity, or make relationships easier to challenge. If it would only restate obvious prose, skip it. If unsure whether a diagram would help, ask the user before adding it.

**Spec Review Loop:**
After the finalized spec is committed:

1. Dispatch spec-document-reviewer subagent (see spec-document-reviewer-prompt.md)
2. If Issues Found: fix, re-dispatch, repeat until Approved
3. If loop exceeds 3 iterations, surface to human for guidance

**User Review Gate:**
After the spec review loop passes, ask the user to review the written spec before proceeding:

> "Spec finalized and committed to `<path>`. Please review it and let me know if you want changes. After that, we should decide whether to write one implementation plan for the whole spec or split planning into staged plans."

Wait for the user's response. If they request changes, make them and re-run the spec review loop. Only proceed once the user approves.

**Planning Transition Gate:**
Before invoking `writing-plans`, assess whether one implementation plan is appropriate or whether the spec should be split into staged plans. Consider splitting when the spec is large, crosses multiple product surfaces or systems, contains work that can ship independently, includes design-dependent and design-independent parts, or would produce an implementation plan too large for a fresh worker to execute safely.

Present a recommendation and ask the user to choose:

- One plan for the whole approved spec.
- A first plan for a named slice of the spec, with later planning sessions for the remaining slices.
- If Claude Design was chosen: pause until Claude Design mockups are available, then iterate the spec and plan with the mockups.
- If Claude Design was chosen: write a first plan for design-independent work that can proceed while Claude Design works, then create follow-up plans after mockups are available.

When recommending a first slice, name what is included, what is deferred, and why the split preserves coherence.

**Implementation:**

- Invoke the writing-plans skill to create the selected implementation plan or first staged plan.
- Do NOT invoke any other skill. writing-plans is the next step.

## Visual Questions

Visual questions can be handled by the browser-based visual companion or left to Claude Design.

**Offering visual handling:** When you anticipate that upcoming questions will involve visual content (mockups, layouts, diagrams), offer visual handling once for consent and tool preference:
> "Some of what we're working on may involve visual decisions. I can handle those here with the visual companion, showing mockups, diagrams, comparisons, and other visuals in a local browser; or we can leave visual decisions and visual brainstorming to Claude Design and keep this session focused on product behavior, structure, and written spec decisions. Which do you prefer?"

**This offer MUST be its own message.** Do not combine it with clarifying questions, context summaries, or any other content. The message should contain ONLY the offer above and nothing else. Wait for the user's response before continuing.

If the user chooses Claude Design, continue text-first brainstorming in this session. Do not make visual design decisions here unless the user later brings them back into this session. Capture visual open questions in the spec as items for Claude Design or as unresolved visual decisions. Toward the end of brainstorming, before finalizing the spec, read `skills/brainstorming/ux-brief.md` and create a UX Brief handoff document for the user to provide to Claude Design.

After the UX Brief is finalized, ask the user to send it to Claude Design. At the planning transition, do not assume implementation planning should proceed immediately. Ask whether to pause the Superpowers workflow until Claude Design mockups are available, or to create a first implementation plan for design-independent work that can proceed in parallel while design work continues.

## Visual Companion

A browser-based companion for showing mockups, diagrams, and visual options during brainstorming. Available as a tool — not a mode. Accepting the companion means it's available for questions that benefit from visual treatment; it does NOT mean every question goes through the browser.

**Per-question decision:** Even after the user accepts, decide FOR EACH QUESTION whether to use the browser or the terminal. The test: **would the user understand this better by seeing it than reading it?**

- **Use the browser** for content that IS visual — mockups, wireframes, layout comparisons, architecture diagrams, side-by-side visual designs
- **Use the terminal** for content that is text — requirements questions, conceptual choices, tradeoff lists, A/B/C/D text options, scope decisions

A question about a UI topic is not automatically a visual question. "What does personality mean in this context?" is a conceptual question — use the terminal. "Which wizard layout works better?" is a visual question — use the browser.

If they agree to the companion, read the detailed guide before proceeding:
`skills/brainstorming/visual-companion.md`
