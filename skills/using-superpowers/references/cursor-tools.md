# Cursor Agent tool mapping

Superpowers skills were written with **Claude Code** tool names. In **Cursor Agent**, map them like this:

| Skill text says | In Cursor Agent |
|-----------------|-----------------|
| **`Skill` tool** (invoke a skill) | **Read** the skill’s `SKILL.md` from the Superpowers plugin (paths usually appear under **Agent Skills** / workspace skills). Do **not** assume a `Skill` tool exists. |
| **`Read` / `Write` / search** | Use Cursor’s normal file and codebase tools. |
| **`Bash` / terminal** | Use Cursor’s terminal / run command capabilities. |
| **`TodoWrite`** | Use your task-list tool if present; otherwise a short checklist in the reply is fine. |
| **`Task` / subagents** | Use Cursor **subagents** or parallel tasks if your product version supports them; else execute steps sequentially yourself. |

## Required habit

1. If a skill might apply (**even ~1%**), **Read** that skill’s `SKILL.md` **before** editing files or giving procedural advice.
2. In your **first substantive reply** after loading it, announce: **Using [skill-name] to [purpose]**.
3. Follow the skill body exactly unless **user or project rules** override (see Instruction Priority in `using-superpowers`).

## Finding `SKILL.md` paths

- **Installed plugin:** skills live under the plugin’s `skills/<skill-name>/SKILL.md` (e.g. `…/superpowers/skills/writing-plans/SKILL.md`).
- **Workspace fork:** e.g. `superpowers-fork/skills/executing-plans/SKILL.md`.

If the IDE lists skills with absolute paths, **Read** that path directly.
