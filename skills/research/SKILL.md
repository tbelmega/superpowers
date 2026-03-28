---
name: research
description: Use when asked to understand in depth how a codebase, system, or feature currently works before planning or implementation; when the user says "map out", "research in depth", "document" how a part of the codebase works. Do not use when the user asks you to simply "explain" or "find out".
---

# Research

## Overview

Before planning or implementing anything, deeply read the relevant code and write a persistent research document. The document is a human review surface — if the research is wrong, the plan will be wrong, and the implementation will be wrong.

**Surface-level reading is not acceptable.** Read until you understand the intricacies: how data flows, what conventions the codebase enforces, what edge cases exist, what could break.

**Announce at start:** "I'm using the research skill to investigate this."

**Save to:** `docs/research/YYYY-MM-DD-<topic>.md` — parallel to `docs/plans/`, version-controlled.

## Depth Standard

Skim-reading is the default failure mode. Counter it explicitly:

- Read **every relevant file**, not just entry points
- Trace **data flow end-to-end** — where does it come from, where does it go, what transforms it
- Read **callsites**, not just definitions — how is this actually used?
- Note **conventions and patterns** the codebase enforces that any new code must respect
- Look for **surprising behavior**: implicit assumptions, hidden coupling, shared state, error handling gaps
- If hunting bugs: **keep reading until all bugs are found** — don't stop at the first one

## Core Pattern

1. **Understand the scope** — What system, folder, or flow is being researched? Clarify with the user if ambiguous.
2. **Read deeply** — Use Read, Glob, Grep exhaustively. Trace the full flow. Do not stop at the surface.
3. **Write the document** — Capture everything that matters: how it works, its conventions, its gotchas, any bugs or risks found. This is the review artifact, not a chat summary.
4. **Hand off** — Share the document path and ask the user to review before any planning begins.

## Output Document Structure

```markdown
# Research: [System / Feature / Topic]

**Scope:** What was investigated (files, folders, flows).

**TL;DR:** 3–5 bullets — the most important things to know.

## How It Works

[Narrative explanation of the current implementation. Data flow, lifecycle, key abstractions. Write as if explaining to a new team member who needs to touch this code.]

## Key Files

| File | Role |
|------|------|
| `path/to/file.ts` | [What it does] |

## Conventions & Patterns

[What rules does this part of the codebase enforce? What must new code respect to not break things? ORM conventions, caching layers, shared utilities, naming patterns.]

## Gotchas & Risks

[Non-obvious behavior, implicit assumptions, hidden coupling, things that are easy to get wrong.]

## Bugs / Issues Found

[Only if research was bug-hunting. Concrete description of each bug and where in the code it lives.]

## Open Questions

[Things that remain unclear after reading — surface to the human before planning.]
```

## Quick Reference

| Element | Guidance |
|---------|----------|
| Save location | `docs/research/YYYY-MM-DD-<topic>.md` |
| Depth signal | Read every relevant file; trace full data flow; read callsites not just definitions |
| Artifact purpose | Human review surface — verify understanding before planning starts |
| Bug research | Keep reading until **all** bugs are found; don't stop at the first |
| Hand-off | Share path, ask human to review before any plan is written |

## Common Mistakes

- **Skimming** — Reading file signatures without understanding data flow or callsites. Surface-level reading produces wrong plans.
- **Summarizing in chat** — A verbal summary in the conversation is not sufficient. Always write the document.
- **Stopping too early** — Especially in bug hunts: finding one issue and stopping. Keep reading.
- **Ignoring conventions** — Not noting the patterns the codebase enforces (caching layers, ORMs, shared utilities). New code that ignores these breaks the surrounding system.
- **Skipping open questions** — If something is unclear, surface it. Don't guess and let it corrupt the plan.
