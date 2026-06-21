# Plan Document Reviewer Prompt Template

Use after the full plan is written.

```text
Task tool (general-purpose):
  description: "Review plan document"
  prompt: |
    If the parent run has an assigned worktree, review exclusively in: [absolute assigned worktree]. Before reading project files, verify `pwd` and `git rev-parse --show-toplevel` match it. Report `WRONG_WORKTREE` without acting on mismatch. Do not inspect or manipulate another checkout.

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
