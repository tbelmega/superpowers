# Plan Document Reviewer Prompt Template

Use this template when dispatching a plan document reviewer subagent.

**Purpose:** Verify the plan is complete, matches the spec, and has proper task decomposition.

**Dispatch after:** The complete plan is written.

```
Task tool (general-purpose):
  description: "Review plan document"
  prompt: |
    You are a plan document reviewer. Verify this plan is complete and ready for implementation.

    **Plan to review:** [PLAN_FILE_PATH]
    **Spec for reference:** [SPEC_FILE_PATH]

    ## What to Check

    | Category | What to Look For |
    |----------|------------------|
    | Completeness | TODOs, placeholders, incomplete tasks, missing steps |
    | Spec Alignment | Plan covers spec requirements, no major scope creep |
    | Task Decomposition | Tasks grouped by behavior (not per file/layer); clear boundaries; steps actionable |
    | Cursor frontmatter | File starts with YAML `---` block: `name`, `overview`, `todos`, `isProject`; new plans use `status: pending` on each todo |
    | `overview` execution | `overview` includes product/architecture intent and an explicit instruction to Read and follow **superpowers:executing-plans** (path to `skills/executing-plans/SKILL.md`) for whole-plan execution, TDD, checks, commits, and YAML todo sync |
    | Cursor ↔ body alignment | One YAML todo per top-level task; each `todos[].id` appears exactly once as `(id)` on a top-level checkbox line; `content` matches that line’s summary (without the id token); subtasks are not duplicated as YAML todos |
    | Checklist Format | Top-level tasks: `- [ ] (id) summary`; subtasks: checkbox lines without `(id)`; every line still has a clear one-line summary |
    | Dependencies | If new libraries needed, dedicated first task to add them and run install; shared types/contracts early when applicable |
    | Verify & Commit | Each task ends with: rules check, run check script, git commit |
    | Test-First | Each task starts with failing test against interface, then implementation |
    | Cross-cutting (API features) | Input validation, authentication, logging for troubleshooting addressed? |
    | Buildability | Could an engineer follow this plan without getting stuck? |

    ## Calibration

    **Only flag issues that would cause real problems during implementation.**
    An implementer building the wrong thing or getting stuck is an issue.
    Minor wording, stylistic preferences, and "nice to have" suggestions are not.

    Approve unless there are serious gaps — missing requirements from the spec,
    contradictory steps, placeholder content, or tasks so vague they can't be acted on.

    ## Output Format

    ## Plan Review

    **Status:** Approved | Issues Found

    **Issues (if any):**
    - [Task X, Step Y]: [specific issue] - [why it matters for implementation]

    **Recommendations (advisory, do not block approval):**
    - [suggestions for improvement]
```

**Reviewer returns:** Status, Issues (if any), Recommendations
