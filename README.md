# Superpowers

Fork of [obra/superpowers](https://github.com/obra/superpowers) by Jesse Vincent, adapted to my needs.

Superpowers is a complete software development workflow for your coding agents, built on top of a set of composable "skills" and some initial instructions that make sure your agent uses them.

## How it works

It starts from the moment you fire up your coding agent. As soon as it sees that you're building something, it *doesn't* just jump into trying to write code. Instead, it steps back and asks you what you're really trying to do. 

Once it's teased a spec out of the conversation, it shows it to you in chunks short enough to actually read and digest. 

After you've signed off on the design, your agent puts together an implementation plan that's clear enough for an enthusiastic junior engineer with poor taste, no judgement, no project context, and an aversion to testing to follow. It emphasizes true red/green TDD, YAGNI (You Aren't Gonna Need It), and DRY. 

Next up, once you say "go", it launches a *subagent-driven-development* process, having agents work through each engineering task, inspecting and reviewing their work, and continuing forward. It's not uncommon for Claude to be able to work autonomously for a couple hours at a time without deviating from the plan you put together.

There's a bunch more to it, but that's the core of the system. And because the skills trigger automatically, you don't need to do anything special. Your coding agent just has Superpowers.


## Sponsorship

If Superpowers has helped you do stuff that makes money and you are so inclined, consider [sponsoring the original author's opensource work](https://github.com/sponsors/obra).


## Installation

**Note:** Installation differs by platform. Claude Code or Cursor have built-in plugin marketplaces. Codex and OpenCode require manual setup.

### Installing this fork

For Codex, OpenCode, and Gemini CLI, you can install directly from this fork:

- **Codex**: `git clone https://github.com/tbelmega/superpowers.git ~/.codex/superpowers` (see [.codex/INSTALL.md](.codex/INSTALL.md))
- **OpenCode**: Add `"plugin": ["superpowers@git+https://github.com/tbelmega/superpowers.git"]` to `opencode.json`
- **Gemini CLI**: `gemini extensions install https://github.com/tbelmega/superpowers`

The sections below describe the original obra/superpowers installation options.

### Claude Code Official Marketplace

Superpowers is available via the [official Claude plugin marketplace](https://claude.com/plugins/superpowers)

Install the plugin from Claude marketplace:

```bash
/plugin install superpowers@claude-plugins-official
```

### Claude Code (via Plugin Marketplace)

In Claude Code, register the marketplace first:

```bash
/plugin marketplace add obra/superpowers-marketplace
```

Then install the plugin from this marketplace:

```bash
/plugin install superpowers@superpowers-marketplace
```

### Cursor (via Plugin Marketplace)

In Cursor Agent chat, install from marketplace:

```text
/add-plugin superpowers
```

or search for "superpowers" in the plugin marketplace.

**After install (strongly recommended):**

- **Session hook** injects `using-superpowers` on new chats. That is a *nudge*, not a guarantee—models can still skip skills.
- **Add a Cursor User Rule** (Settings → Rules) or copy a project rule from [`cursor-rules/`](cursor-rules/README.md) so that when work matches a skill (plans, debugging, TDD, executing a plan), the agent **Reads** the matching `SKILL.md` and follows it. Cursor has no Claude Code `Skill` tool; see [`skills/using-superpowers/references/cursor-tools.md`](skills/using-superpowers/references/cursor-tools.md).
- **Start a new Agent session** after changing rules or updating the plugin so hooks re-run.

**Cursor vs Claude Code:** Automatic skill triggering is tighter in Claude Code (native `Skill` tool). In Cursor, the fork optimizes for **Read `SKILL.md` + your rules** so behavior stays predictable.

### Codex

Tell Codex:

```
Fetch and follow instructions from https://raw.githubusercontent.com/tbelmega/superpowers/refs/heads/main/.codex/INSTALL.md
```

**Detailed docs:** [docs/README.codex.md](docs/README.codex.md)

### OpenCode

Tell OpenCode:

```
Fetch and follow instructions from https://raw.githubusercontent.com/tbelmega/superpowers/refs/heads/main/.opencode/INSTALL.md
```

**Detailed docs:** [docs/README.opencode.md](docs/README.opencode.md)

### Gemini CLI

```bash
gemini extensions install https://github.com/tbelmega/superpowers
```

To update:

```bash
gemini extensions update superpowers
```

### Verify Installation

Start a new session in your chosen platform and ask for something that should trigger a skill (for example, "help me plan this feature" or "let's debug this issue"). The agent should automatically invoke the relevant superpowers skill.

## The Basic Workflow

1. **brainstorming** - Activates before writing code. Refines rough ideas through questions, explores alternatives, presents design in sections for validation. Saves design document.

2. **using-git-worktrees** - Activates after design approval. Creates isolated workspace on new branch, runs project setup, verifies clean test baseline.

3. **writing-plans** - Activates with approved design. Breaks work into bite-sized tasks (2-5 minutes each). Every task has exact file paths, complete code, verification steps.

4. **subagent-driven-development** or **executing-plans** - Activates with plan. Dispatches fresh subagent per task with two-stage review (spec compliance, then code quality), or executes in batches with human checkpoints.

5. **test-driven-development** - Activates during implementation. Enforces RED-GREEN-REFACTOR: write failing test, watch it fail, write minimal code, watch it pass, commit. Deletes code written before tests.

6. **requesting-code-review** - Activates between tasks. Reviews against plan, reports issues by severity. Critical issues block progress.

7. **finishing-a-development-branch** - Activates when tasks complete. Verifies tests, presents options (merge/PR/keep/discard), cleans up worktree.

**The agent should check for relevant skills before any task.** In Claude Code this is reinforced by the `Skill` tool; in **Cursor**, reinforce it with **User Rules** and the [`cursor-tools`](skills/using-superpowers/references/cursor-tools.md) mapping (Read `SKILL.md`).

## What's Inside

### Cursor rule templates

Optional examples in [`cursor-rules/`](cursor-rules/README.md) (`*.mdc.example`) — copy into `.cursor/rules/` or User Rules so agents **Read** `SKILL.md` when skills apply (Cursor has no `Skill` tool).

### Skills Library

**Testing**
- **test-driven-development** - RED-GREEN-REFACTOR cycle (includes testing anti-patterns reference)

**Debugging**
- **systematic-debugging** - 4-phase root cause process (includes root-cause-tracing, defense-in-depth, condition-based-waiting techniques)
- **verification-before-completion** - Ensure it's actually fixed

**Collaboration** 
- **brainstorming** - Socratic design refinement
- **writing-plans** - Detailed implementation plans
- **executing-plans** - Batch execution with checkpoints
- **dispatching-parallel-agents** - Concurrent subagent workflows
- **requesting-code-review** - Pre-review checklist
- **receiving-code-review** - Responding to feedback
- **using-git-worktrees** - Parallel development branches
- **finishing-a-development-branch** - Merge/PR decision workflow
- **subagent-driven-development** - Fast iteration with two-stage review (spec compliance, then code quality)

**Meta**
- **writing-skills** - Create new skills following best practices (includes testing methodology)
- **using-superpowers** - Introduction to the skills system

## Philosophy

- **Test-Driven Development** - Write tests first, always
- **Systematic over ad-hoc** - Process over guessing
- **Complexity reduction** - Simplicity as primary goal
- **Evidence over claims** - Verify before declaring success

Read more: [Superpowers for Claude Code](https://blog.fsck.com/2025/10/09/superpowers/)

## Contributing

Skills live directly in this repository. To contribute:

1. Fork the repository
2. Create a branch for your skill
3. Follow the `writing-skills` skill for creating and testing new skills
4. Submit a PR

See `skills/writing-skills/SKILL.md` for the complete guide.

## Updating

Skills update automatically when you update the plugin:

```bash
/plugin update superpowers
```

## License

MIT License - see LICENSE file for details

## Community

Superpowers was originally built by [Jesse Vincent](https://blog.fsck.com) and the folks at [Prime Radiant](https://primeradiant.com). This fork is maintained by Thiemo Belmega.

For community support, questions, and sharing what you're building with Superpowers, join the [original project's Discord](https://discord.gg/Jd8Vphy9jq).

## Support

- **Discord**: [Original project's Discord](https://discord.gg/Jd8Vphy9jq)
- **Issues**: https://github.com/tbelmega/superpowers/issues
