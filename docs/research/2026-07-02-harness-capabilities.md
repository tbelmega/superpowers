# Harness capabilities: Claude Code, OpenAI Codex, Cursor (as of 2026-07-02)

**Verdict:** All six earlier-2026 claims about Claude Code hold (one with a twist: TodoWrite is
deprecated in favor of a richer Task system). The bigger news is convergence: **all three
harnesses now natively support the agentskills.io SKILL.md standard with description-based
auto-triggering, all three have hooks, and all three have native persistent memory.** Cursor even
reads `.claude/skills/` and `.codex/skills/` directly. Claude Code remains the only one of the
three that does **not** read AGENTS.md natively (import/symlink required).

Sources: official docs fetched live 2026-07-02 (code.claude.com/docs, developers.openai.com/codex,
cursor.com/docs). Freshness caveats flagged inline.

## Claim verification (earlier-2026 analysis)

| Claim | Verdict | Evidence |
|---|---|---|
| Plan mode | **Verified** | `plan` permission mode; Shift+Tab, `/plan` prefix, `--permission-mode plan`; Ctrl+G to edit plan; plus new cloud "Ultraplan". https://code.claude.com/docs/en/permission-modes |
| Todo tracking | **Verified, changed** | `TodoWrite` disabled by default since v2.1.142, replaced by `TaskCreate`/`TaskGet`/`TaskList`/`TaskUpdate` (task list with dependencies). https://code.claude.com/docs/en/tools-reference |
| Subagent dispatch incl. parallel | **Verified** | `Agent` tool; built-ins Explore/Plan/general-purpose; parallel + background subagents; also agent teams (`SendMessage`) and a `Workflow` tool for scripted multi-subagent orchestration. https://code.claude.com/docs/en/sub-agents |
| EnterWorktree / native worktree isolation | **Verified** | `EnterWorktree`/`ExitWorktree` tools, `--worktree`/`-w` flag (worktrees under `.claude/worktrees/`), subagent `isolation: worktree` frontmatter, `.worktreeinclude`, `WorktreeCreate`/`WorktreeRemove` hooks. https://code.claude.com/docs/en/worktrees |
| /code-review | **Verified** | Bundled prompt-based skill (with `/batch`, `/debug`, `/loop`, `/claude-api`); a project skill of the same name overrides it; disable via `disableBundledSkills`. https://code.claude.com/docs/en/skills |
| Native skill discovery from SKILL.md frontmatter | **Verified** | `description` (+ optional `when_to_use`, capped 1,536 chars) always in context; body loads on invocation. https://code.claude.com/docs/en/skills |

## Claude Code

**Native capabilities.** Plan mode (above); Task-list tracking; parallel/background subagents;
`--worktree` + worktree tools; hooks (PreToolUse, PermissionRequest, SubagentStop,
InstructionsLoaded, WorktreeCreate, …) in settings.json *and* subagent frontmatter; background
agents dashboard (https://code.claude.com/docs/en/agent-view); agent teams
(https://code.claude.com/docs/en/agent-teams); scheduled tasks (`/loop`, Cron* tools,
https://code.claude.com/docs/en/scheduled-tasks); dynamic workflows (`Workflow` tool,
https://code.claude.com/docs/en/workflows); auto mode (classifier-supervised autonomy,
https://code.claude.com/docs/en/permission-modes); checkpointing/rewind.

**Guidance surfaces.** Skills = `SKILL.md` per agentskills.io standard; commands merged into
skills (`.claude/commands/deploy.md` ≡ `.claude/skills/deploy/SKILL.md`). All frontmatter
optional; key fields: `description`, `when_to_use`, `disable-model-invocation`,
`user-invocable`, `context: fork` + `agent`, `paths` (glob-scoped activation), `allowed-tools`,
`model`. Auto-trigger by description: yes. Symlinked skill dirs supported; live reload; nested
`.claude/skills/` discovered up to repo root and on demand below cwd.
https://code.claude.com/docs/en/skills
Also `.claude/rules/*.md` with `paths` frontmatter (path-scoped standing rules).
https://code.claude.com/docs/en/memory

**User-level (global) config.** Both instructions AND skills/rules:
- Instructions: `~/.claude/CLAUDE.md` (https://code.claude.com/docs/en/memory)
- Rules: `~/.claude/rules/*.md` (same page, "User-level rules")
- Skills: `~/.claude/skills/<name>/SKILL.md` (https://code.claude.com/docs/en/skills)
- Subagents: `~/.claude/agents/` (https://code.claude.com/docs/en/sub-agents)
- Managed org level: `/etc/claude-code/CLAUDE.md` (Linux) etc.

**AGENTS.md.** **Not read natively.** Docs state verbatim: "Claude Code reads `CLAUDE.md`, not
`AGENTS.md`" — recommended bridge is a CLAUDE.md containing `@AGENTS.md` (import) or a symlink;
`/init` will incorporate an existing AGENTS.md. https://code.claude.com/docs/en/memory

**Memory.** Native auto memory (default-on, v2.1.59+): `~/.claude/projects/<project>/memory/`
with `MEMORY.md` index (first 200 lines / 25KB loaded every session) + topic files; per-repo,
shared across worktrees, machine-local. Subagents can have their own memory (`memory`
frontmatter). https://code.claude.com/docs/en/memory

## OpenAI Codex (CLI + app)

**Native capabilities.** Plan mode via `/plan` (switch conversation to plan mode, inline
approve/reject of steps); todo tracking via built-in `update_plan`/`todo_write` tool; `/review`
command (review working tree, against base branch, or specific commits); subagents: built-ins
`default`/`worker`/`explorer`, custom agents as **TOML** files, run **in parallel** (config
`[agents]`: `max_threads` default 6, `max_depth` 1) but only spawned when explicitly requested;
hooks (gated by `features.hooks`): `hooks.json` or inline `[hooks]` in config.toml, events
mirroring Claude Code's (PreToolUse, PostToolUse, PermissionRequest, SessionStart,
SubagentStart/Stop, Stop, Pre/PostCompact, UserPromptSubmit); `codex exec` (non-interactive),
`codex resume`, Codex Cloud for async/background tasks.
https://developers.openai.com/codex/cli/features · https://developers.openai.com/codex/subagents ·
https://developers.openai.com/codex/hooks ·
https://developers.openai.com/codex/guides/slash-commands

**Worktrees:** native in the **Codex app** (per-thread worktrees, setup scripts via local
environments; automations run on background worktrees) — https://developers.openai.com/codex/app/worktrees.
The **CLI has no `--worktree` flag** (open feature request, openai/codex#12862).

**Guidance surfaces.** Skills = SKILL.md (agentskills.io), frontmatter `name` + `description`
required; auto-trigger implicitly when the task matches the description, or explicitly via
`/skills` / `$`-mention; progressive loading (listing capped ~2% of context / 8,000 chars).
Load paths: repo `.agents/skills/` (cwd or repo root), user `~/.agents/skills/`, admin
`/etc/codex/skills`, plus bundled OpenAI skills. https://developers.openai.com/codex/skills
Note the path is **`.agents/`, not `.codex/`** — the cross-harness standard location. Legacy
custom prompts in `~/.codex/prompts/` still exist but the current docs push skills (freshness
caveat: prompts path verified only via the GitHub repo docs, not the docs site).

**User-level (global) config.** Both instructions AND skills:
- Instructions: `~/.codex/AGENTS.md` (or `AGENTS.override.md`) — https://developers.openai.com/codex/guides/agents-md
- Skills: `~/.agents/skills/` — https://developers.openai.com/codex/skills
- Settings: `~/.codex/config.toml` (`-c key=value` overrides; admin `requirements.toml`) — https://developers.openai.com/codex/config-basic
- Custom agents: `~/.codex/agents/*.toml` — https://developers.openai.com/codex/subagents

**AGENTS.md.** Native and first-class: global `~/.codex/AGENTS.md`, then walks **root → cwd**,
one file per directory (`AGENTS.override.md` wins over `AGENTS.md`, then
`project_doc_fallback_filenames`); files concatenated root-down so **closer files override**;
combined cap `project_doc_max_bytes` = 32 KiB default.
https://developers.openai.com/codex/guides/agents-md

**Memory.** Native "Memories" shipped ~April 2026 (preview): local-first two-phase pipeline
(per-session extraction → consolidation) writing `MEMORY.md` + `memory_summary.md` + SQLite
under `~/.codex`; summary injected at session start, agent greps MEMORY.md for detail; toggle
`memories.use_memories`. Not available in EEA/UK/CH at launch.
https://developers.openai.com/codex/memories

## Cursor (IDE agent / Composer)

**Native capabilities.** Plan Mode (Shift+Tab; asks clarifying questions, researches, emits an
editable Markdown plan with todos; plans saved to home dir, "Save to workspace" option) —
https://cursor.com/docs/agent/plan-mode. Subagents (since 2.4): parallel (up to 10/session on
paid individual plans, 50 for teams), built-ins Explore/Bash/Browser, background via
`is_background: true`, one level of nesting — https://cursor.com/docs/subagents. Automatic **git
worktrees** for parallel agents (Cursor 3.x; cloud agents run up to ~8 parallel isolated
worktrees). Hooks: `.cursor/hooks.json` (project) and `~/.cursor/hooks.json` (global), events
incl. sessionStart, preToolUse/postToolUse, beforeShellExecution, beforeSubmitPrompt,
subagentStart/Stop, stop — https://cursor.com/docs/hooks. Cloud agents + Automations (agents
triggered by schedules, Slack, Linear, GitHub, PagerDuty) —
https://cursor.com/docs/cloud-agent/automations. Code review is a separate product (Bugbot on
PRs), not an in-agent slash command.

**Guidance surfaces.** Skills = SKILL.md (agentskills.io); frontmatter `name` (must match
folder) + `description` required; optional `paths`, `disable-model-invocation`, `metadata`;
auto-trigger by description, manual via `/skill-name`; `/migrate-to-skills` converts legacy
rules/commands. Load paths: `.agents/skills/`, `.cursor/skills/`, `~/.agents/skills/`,
`~/.cursor/skills/`, **plus compatibility reads of `.claude/skills/`, `.codex/skills/`,
`~/.claude/skills/`, `~/.codex/skills/`**; nested dirs discovered recursively.
https://cursor.com/docs/skills
Rules: `.cursor/rules/*.mdc` (`description`, `globs`, `alwaysApply`; Always / Auto Attached /
Agent Requested / Manual); legacy `.cursorrules` deprecated. https://cursor.com/docs/rules
Subagent definitions: `.cursor/agents/` (also reads `.claude/agents/`, `.codex/agents/`).

**User-level (global) config.** Split surface:
- Instructions: **User Rules in the Settings UI (Customize → Rules), not a file** — https://cursor.com/docs/rules
- Skills: `~/.cursor/skills/` or `~/.agents/skills/` (files) — https://cursor.com/docs/skills
- Subagents: `~/.cursor/agents/` — https://cursor.com/docs/subagents
- Hooks: `~/.cursor/hooks.json` — https://cursor.com/docs/hooks
- Precedence: Team Rules → Project Rules → User Rules (earlier wins on conflict).
- Freshness caveat: no documented home-dir AGENTS.md for the IDE; global plain-text instructions
  go through User Rules.

**AGENTS.md.** Native: project root and any subdirectory; nested files combine with parents,
more specific taking precedence; positioned as the "simple markdown" alternative to
`.cursor/rules`. https://cursor.com/docs/rules

**Memory.** Native Memories: per-project, per-user facts extracted from conversations, managed
in Settings (https://docs.cursor.com/context/memories); Automations additionally get a
persistent `MEMORIES.md` notepad across runs.

## Cross-harness implications for this project

- **One skills tree can serve all three.** Codex + Cursor both read `.agents/skills/` and
  `~/.agents/skills/`; Cursor also reads `~/.claude/skills/` directly; Claude Code follows
  symlinks from `~/.claude/skills/` / `.claude/skills/`. Frontmatter intersection that works
  everywhere: `name` + `description` (Cursor/Codex require both; Cursor requires `name` ==
  folder). `disable-model-invocation` and `paths` work in Claude Code and Cursor; Codex docs
  don't list them (caveat: likely ignored, not fatal).
- **AGENTS.md reaches Codex and Cursor natively; Claude Code needs the `@AGENTS.md` import or a
  symlinked CLAUDE.md.** Codex even honors a *global* `~/.codex/AGENTS.md`; Cursor has no
  file-based global instructions (Settings UI only).
- **Stop re-implementing:** planning, todos, parallel subagents, worktree isolation, code
  review, hooks, scheduled/background agents, and now *persistent memory* are native in all (or
  nearly all) three. Guidance should focus on judgment at decision points, not machinery.
