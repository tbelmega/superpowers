# Plan Document Reviewer Prompt Template

Use after the full plan is written.

```text
Task tool (general-purpose):
  description: "Review plan document"
  prompt: |
    Review this implementation plan.

    Plan: [PLAN_FILE_PATH]
    Spec: [SPEC_FILE_PATH]

    Check completeness, spec alignment, behavior-based task decomposition, executable task detail, required header structure, YAML/body alignment when present, and every task ending with rules check, run check script, git commit.
    Only flag issues that would cause implementation problems.

    ## Plan Review
    **Status:** Approved | Issues Found
    **Issues:** bullet list with task or section, problem, and why it matters
    **Recommendations:** optional non-blocking suggestions
```
