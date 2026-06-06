# Superpowers

Fork of [obra/superpowers](https://github.com/obra/superpowers) by Jesse Vincent, adapted to my needs.

Superpowers is a complete software development workflow for your coding agents, built on top of a set of composable "skills" and some initial instructions that make sure your agent uses them.

## How it works

It starts from the moment you fire up your coding agent. As soon as it sees that you're building something, it *doesn't* just jump into trying to write code. Instead, it steps back and asks you what you're really trying to do. 

Once it's teased a spec out of the conversation, it shows it to you in chunks short enough to actually read and digest. 

After you've signed off on the design, your agent puts together an implementation plan that's clear enough for an enthusiastic junior engineer with poor taste, no judgement, no project context, and an aversion to testing to follow. It emphasizes true red/green TDD, YAGNI (You Aren't Gonna Need It), and AHA (Avoid Hasty Abstractions), using the Rule of Three as the normal threshold for extracting shared code.

That plan lives in `docs/plans/` as a human-auditable markdown file with explicit checkbox state, so progress stays visible and recoverable even if the agent crashes or the session gets interrupted. Harness-native plan/spec modes are optional helpers at most, not the source of truth.

Next up, once you say "go", `executing-plans` runs the plan. Worker mode is preferred because it keeps the orchestrator context small and lets each fresh worker focus on one task, but some harnesses require the user to explicitly authorize worker delegation in chat before the agent can use it. When worker mode is unavailable or not authorized, the workflow stops and asks whether to rerun in worker mode or execute directly.

The plan constrains goals, boundaries, ordering, and verification, but it does not try to precompute every implementation detail. Within a task's scope, the executing agent is expected to use local engineering judgment: simplify design, tolerate limited duplication while the shared shape is uncertain, extract shared code when evidence supports it, and improve code hygiene without silently expanding into future-task work.

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

3. **writing-plans** - Activates with approved design. Saves a markdown plan under `docs/plans/` with visible checkbox state, execution-mode guidance, verification steps, owned files, shared touch points, and stop conditions.

4. **executing-plans** - Activates with plan. Uses the markdown plan as the source of truth, chooses worker mode or direct mode in a preflight step, keeps plan checkboxes in sync with progress, and pauses to amend the plan if implementation reveals missing work or a better structure beyond local task scope.

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
- **writing-plans** - Markdown-first implementation plans that capture goals, boundaries, ordering, verification, and execution mode without freezing every implementation detail
- **executing-plans** - Canonical plan executor; prefers worker mode when explicitly authorized, otherwise executes directly or stops for clarification
- **dispatching-parallel-agents** - Concurrent subagent workflows
- **requesting-code-review** - Pre-review checklist
- **receiving-code-review** - Responding to feedback
- **using-git-worktrees** - Parallel development branches
- **finishing-a-development-branch** - Merge/PR decision workflow
- **subagent-driven-development** - Compatibility reference for harness-specific worker orchestration details

**Meta**
- **writing-skills** - Create new skills following best practices (includes testing methodology)
- **using-superpowers** - Introduction to the skills system

## Philosophy

- **Test-Driven Development** - Write tests first, always
- **Systematic over ad-hoc** - Process over guessing
- **Markdown plans as source of truth** - Progress should be visible, auditable, and resumable across harnesses
- **Workers when possible** - Smaller orchestrator and worker contexts usually improve outcomes and reduce token cost
- **Plan the invariants, not every detail** - Plans should lock down intent, boundaries, ordering, and verification while leaving room for local engineering judgment inside task scope
- **Complexity reduction** - Simplicity as primary goal
- **Evidence over claims** - Verify before declaring success

## Observe And Adjust

- **Worker-mode prompting friction** - The current default is biased toward `worker_preferred`, but execution may still stop and ask the user to choose worker mode or direct mode. If that creates too much friction in day-to-day use, relax the mode-selection rules or make the expected prompt pattern more explicit in your harness-specific setup.
- **Plan over-specification risk** - The current plan format asks for owned files, shared touch points, verification commands, commit messages, and handoff details. That improves delegated execution, but it can also make plans too rigid or too expensive to maintain. If plans start feeling like brittle scripts instead of high-signal execution guides, remove detail that is not protecting an actual invariant, dependency, or verification requirement.
- **Cross-harness prompt patterns** - Some of the current rerun/authorization wording is easiest to apply in chat-driven harnesses like Codex. If another harness supports worker delegation more natively, keep the same underlying workflow but adapt the user-facing prompt language so it fits that environment instead of forcing a Codex-shaped interaction.

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
