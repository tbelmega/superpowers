# Spec Document Reviewer Prompt Template

Use after the spec is written.

```text
Task tool (general-purpose):
  description: "Review spec document"
  prompt: |
    Review this spec for planning readiness.

    Spec: [SPEC_FILE_PATH]

    Check for missing content, contradictions, ambiguous requirements, scope that is too large for one plan, and obvious over-engineering.
    Only flag issues that would cause implementation planning problems.

    ## Spec Review
    **Status:** Approved | Issues Found
    **Issues:** bullet list with section, problem, and why it matters
    **Recommendations:** optional non-blocking suggestions
```
