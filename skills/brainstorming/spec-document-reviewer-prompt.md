# Spec Document Reviewer Prompt Template

Use after the spec is finalized and committed.

**Purpose:** Verify that the spec is complete, internally consistent, and ready
for implementation planning.

```text
Task tool (general-purpose):
  description: "Review spec document"
  prompt: |
    Review this spec for planning readiness.

    Spec: [SPEC_FILE_PATH]

    Check for missing content, contradictions, ambiguous requirements, scope that is too large for one plan, and obvious over-engineering.

    Only flag issues that could cause a materially wrong or incomplete implementation plan. Missing decisions, contradictions, ambiguous requirements with multiple plausible interpretations, and incoherent scope are blocking. Minor wording improvements, stylistic preferences, and optional detail are not.

    Approve the spec unless the identified issue would require the planner to guess or would lead to avoidable rework.

    ## Spec Review
    **Status:** Approved | Issues Found
    **Issues:** bullet list with section, problem, and why it matters
    **Recommendations:** optional non-blocking suggestions
```
