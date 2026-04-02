---
name: using-superpowers
description: Use when starting any conversation to decide whether any local skill applies before responding or taking action
---

<SUBAGENT-STOP>
If you were dispatched as a subagent for a specific task, skip this skill.
</SUBAGENT-STOP>

# Using Superpowers

Use this skill first in a top-level session.

## Core Rules

- If a skill might apply, load it before responding.
- Requested skills must be loaded.
- If a loaded skill applies, follow it.
- User instructions take precedence over skills.
- Check for skills before clarifying questions, codebase exploration, or other actions.

## Priority

1. User instructions in `CLAUDE.md`, `GEMINI.md`, `AGENTS.md`, or the chat
2. Applicable Superpowers skills
3. Default system behavior

## Access

- Claude Code: use the `Skill` tool.
- Cursor Agent: read the skill's `SKILL.md` from disk.
- Gemini CLI: use `activate_skill`.
- Other environments: use the platform's skill-loading mechanism.

Tool mappings live in:

- `references/codex-tools.md`
- `references/cursor-tools.md`
- `references/gemini-tools.md`

## How To Apply Skills

- Check for relevant skills on every task, even simple questions.
- Load the current file from disk rather than relying on memory.
- If a loaded skill has a checklist, create a task for each checklist item.
- Process skills first, then implementation skills.
- If no skill applies, continue normally.

## Red Flags

- "I'll gather context first."
- "This is too small to need a skill."
- "I remember the skill already."
- "I'll do one quick thing before checking."

Those all mean: stop and load the relevant skill first.
