# Cursor rules (optional) for Superpowers

Cursor does not expose Claude Code’s `Skill` tool. These examples **strengthen** skill compliance when copied into a project.

## How to use

1. Copy an `.example` file into your repo as `.cursor/rules/<name>.mdc` (remove `.example`).
2. Or merge the body into your existing **User Rules** in Cursor Settings.

| File | Intent |
|------|--------|
| `superpowers-global.mdc.example` | Short always-on reminder to Read `SKILL.md` when a skill might apply. |
| `superpowers-plans.mdc.example` | When editing implementation plans under `docs/plans/`, follow **writing-plans** / **executing-plans** / **subagent-driven-development** as appropriate—load each skill file first. |

Adjust `globs` and `alwaysApply` to taste. See Cursor docs for rule file format.
