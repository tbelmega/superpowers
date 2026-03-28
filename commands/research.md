---
name: research
description: Deeply read a codebase system or feature and write a research document before planning or implementation
---

# Research (superpowers:research)

You are invoked to **deeply understand an existing system or codebase area** and produce a written research document. Do not skim. Do not summarize in chat.

1. **Read** the **research** skill from this plugin: `skills/research/SKILL.md` (load the current file from disk; do not rely on memory).
2. **Announce** to the user: `I'm using the research skill to investigate this.`
3. **Follow** that skill exactly: read deeply (every relevant file, full data flow, callsites not just definitions), write the findings to `docs/research/YYYY-MM-DD-<topic>.md`, and ask the user to review before any planning begins.
4. If the user named a specific folder, system, or file: start there, then follow all relevant references outward until you have a complete picture.

Do not skip the skill load. Do not replace this workflow with a chat summary or a quick scan. Surface-level reading is not acceptable.
