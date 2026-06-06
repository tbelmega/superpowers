# Brainstorming Skill: Fork vs Upstream

**Date:** 2026-06-06  
**Local repository:** `tbelmega/superpowers`, branch `main`  
**Upstream repository:** `obra/superpowers`  
**Upstream commit compared:** `6fd4507659784c351abbd2bc264c7162cfd386dc`

## Scope

This compares the complete local `skills/brainstorming/` directory with the
same directory at the current upstream HEAD, not only `SKILL.md`.

The local directory contains one file absent upstream:

- `ux-brief.md`

All other files exist in both versions but differ except `helper.js`.

## Executive Summary

The fork is not simply ahead or behind upstream. It has developed a different
workflow philosophy.

The fork emphasizes artifact lifecycle and review rigor:

- Create a draft spec before clarification is complete.
- Update the spec incrementally.
- Add diagrams when complexity warrants them.
- Run a dedicated reviewer subagent, with up to three correction rounds.
- Obtain a separate user review of the written artifact.
- Choose between a whole-spec plan and staged plans.
- Hand visual work to Claude Design through a dedicated UX Brief when selected.

Upstream emphasizes mandatory applicability and design quality:

- Brainstorm every creative or behavioral change, even apparently trivial ones.
- Explicitly forbid all implementation actions before approval.
- Create a checklist task for every workflow step.
- Detect over-large requests early and decompose them into independently planned
  sub-projects.
- Prefer multiple-choice clarification questions.
- Apply YAGNI explicitly.
- Design small, isolated units with clear interfaces.
- Improve affected code boundaries while avoiding unrelated refactors.
- Perform a lightweight inline self-review instead of a reviewer loop.

The fork has a stronger governance process; upstream has stronger guidance for
the quality and scope of the design itself. A selective merge would be better
than replacing either version wholesale.

## Main Workflow Differences

| Area | Local fork | Upstream |
|---|---|---|
| Trigger wording | "Use before any creative work or behavior change" | "You MUST use this before any creative work" with examples |
| Hard gate | Short prohibition on implementation | Explicitly prohibits code, scaffolding, implementation skills, and all implementation actions for every project |
| Simple tasks | No explicit exception or anti-pattern section | Explicitly says even trivial work requires a design, though the design may be short |
| Task tracking | Numbered workflow | Requires creating and completing a task for each checklist item in order |
| Scope control | Decides whole vs staged planning after spec review | Detects multi-subsystem scope before detailed questioning and decomposes into separate spec-plan-implementation cycles |
| Draft timing | Creates a marked draft spec before questions | Writes the design document after conversational design approval |
| Clarification style | One question at a time | One question at a time; multiple choice preferred; explicitly targets purpose, constraints, and success criteria |
| Approach selection | 2-3 approaches, trade-offs, recommendation | Same, but says lead with the recommendation |
| Design coverage | Present in sections | Explicitly covers architecture, components, data flow, error handling, and testing |
| Design quality | No dedicated modularity guidance | Strong isolation, interface, file-size, and existing-codebase guidance |
| YAGNI | Reviewer checks obvious over-engineering | Named key principle during design |
| Diagrams | Detailed Mermaid triggers for ER, sequence, state, and flow diagrams | No spec diagram guidance; includes only a DOT workflow diagram in the skill itself |
| Review | Reviewer subagent loop, maximum three rounds | Inline self-review once for placeholders, consistency, scope, and ambiguity |
| User review | Review after subagent approval | Review after inline self-review |
| Planning transition | User chooses whole plan, staged plan, pause for design, or design-independent plan | Direct transition to one implementation plan, after any earlier project decomposition |
| Visual delegation | Visual companion, Claude Design, or neither | Visual companion or text-only |
| Spec path | `docs/specs/...` | `docs/superpowers/specs/...` |

## Important Upstream Guidance Missing Locally

### 1. The hard gate is materially stronger

The upstream wording closes common loopholes: it names implementation skills,
code, scaffolding, and implementation actions, and says the rule applies
regardless of perceived simplicity. The local gate is semantically similar but
easier for an agent to interpret narrowly.

### 2. Early decomposition happens at the right time

Upstream checks whether a request contains multiple independent systems before
spending turns refining details. The local fork postpones the main plan-sizing
decision until the completed spec. Staged implementation planning and
multi-project decomposition solve different problems, so the fork would benefit
from retaining its late planning gate while adding upstream's early scope gate.

### 3. Upstream gives better design-quality heuristics

The local workflow is precise about producing and validating a document, but it
says less about what makes the proposed system good. Upstream explicitly asks
for:

- Single-purpose units.
- Well-defined interfaces.
- Independently understandable and testable components.
- Internal changes that do not break consumers.
- Targeted cleanup of affected poor boundaries.
- No unrelated refactoring.

These are high-value additions because they improve the content reviewed by the
fork's stronger review process.

### 4. Upstream preserves useful conversational defaults

The local compressed workflow dropped explicit guidance to prefer
multiple-choice questions, lead with the recommended approach, scale design
sections to complexity, cover testing and error handling, and apply YAGNI.

## Valuable Fork Additions Absent Upstream

### 1. Persistent draft lifecycle

Creating a clearly marked, non-implementable draft early reduces loss of
decisions over a long conversation. It also makes the evolving artifact visible.
The status marker is important because upstream avoids writing the document
until after conversational approval.

### 2. External spec review loop

The fork's independent reviewer can catch contradictions that the author is
likely to miss. The three-round limit prevents unbounded review churn. Upstream
still ships a reviewer prompt file, but its current `SKILL.md` no longer invokes
that prompt and instead directs a one-pass self-review.

### 3. Explicit planning-size decision

The fork distinguishes design approval from implementation-plan sizing. This is
useful for a coherent spec that is still too large for one execution context.

### 4. Diagram guidance

The fork ties diagram types to concrete complexity signals and discourages
decorative diagrams. Upstream has no equivalent guidance for the resulting spec.

### 5. Claude Design handoff

The local `ux-brief.md` creates a deliberate boundary between product behavior
and visual design. It avoids prescribing UI while preserving entities, use
cases, constraints, non-goals, and open questions. Upstream has no corresponding
file or workflow.

## Supporting File Differences

### Reviewer prompt

The local reviewer prompt is shorter. It preserves the essential checks and
output fields, but upstream provides stronger calibration:

- It defines the purpose and dispatch timing.
- It explicitly distinguishes implementation-blocking issues from style
  preferences.
- It tells the reviewer to approve unless gaps would produce a flawed plan.

The fork's loop is stronger than upstream's current workflow, but its prompt
would benefit from upstream's calibration language to reduce false-positive
review rounds.

### Visual companion protocol

Upstream and the fork currently use incompatible session layouts.

Upstream:

- `<session>/content/*.html`
- `<session>/state/events`
- `<session>/state/server-info`
- `<session>/state/server.pid`
- `<session>/state/server.log`

Local fork:

- `<session>/*.html`
- `<session>/.events`
- `<session>/.server-info`
- `<session>/.server.pid`
- `<session>/.server.log`

The documentation matches each implementation. Do not port only
`visual-companion.md` or only the scripts.

Upstream also contains more defensive owner-process handling:

- It treats `EPERM` as evidence that the owner process exists.
- It validates the owner PID at startup and disables owner monitoring if the PID
  is already invalid.

The local startup script instead explicitly disables owner-PID monitoring on
MSYS2/Cygwin/MinGW. Upstream's server-side handling appears more general, while
the local Windows exception may still be useful. Any synchronization should
treat the server, start script, stop script, and companion documentation as one
atomic change.

## File-Level Change Summary

Compared from upstream to local:

- `SKILL.md`: 59 inserted lines, 118 removed lines.
- `spec-document-reviewer-prompt.md`: 8 inserted, 37 removed.
- `ux-brief.md`: 113 local-only lines.
- `visual-companion.md`: 11 inserted, 12 removed.
- `server.cjs`: 17 inserted, 33 removed.
- `start-server.sh`: 14 inserted, 9 removed.
- `stop-server.sh`: 8 inserted, 9 removed.
- `frame-template.html`: one line changed in each direction.
- `helper.js`: identical.

## Risks and Inconsistencies

1. The local skill's compressed wording has removed several useful behavioral
   requirements even though its artifact process is more elaborate. A rigorous
   review loop does not compensate for missing design heuristics.
2. The local workflow creates a file before requirements are understood. This is
   useful for persistence, but agents may over-invest in document structure or
   prematurely solidify assumptions. The draft status and incremental editing
   instruction should remain prominent.
3. Upstream's current repository retains
   `spec-document-reviewer-prompt.md` even though its `SKILL.md` directs only
   self-review. That file is presently orphaned from the documented workflow.
4. The two spec paths differ. Tooling or documentation that assumes
   `docs/superpowers/specs/` will not find local specs under `docs/specs/`.
5. The visual companion implementations have diverged enough that piecemeal
   cherry-picking is unsafe.

## Recommendation

Keep the fork's overall workflow, then port selected upstream guidance:

1. Strengthen the trigger and hard-gate wording, including the explicit
   "too simple" anti-pattern.
2. Add early multi-subsystem detection and decomposition before detailed
   questions.
3. Restore multiple-choice preference, recommended-option-first presentation,
   YAGNI, section sizing, and explicit design coverage.
4. Add upstream's isolation, interface, and existing-codebase guidance.
5. Retain the draft spec, diagrams, reviewer loop, user artifact review, staged
   planning gate, and Claude Design handoff.
6. Add upstream's reviewer calibration to the local prompt.
7. Evaluate visual companion script synchronization separately and port it as a
   complete protocol change with tests.

This produces a skill that is stronger than either current version: upstream's
design discipline feeding the fork's more rigorous artifact and review process.

