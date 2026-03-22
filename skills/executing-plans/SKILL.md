---
name: executing-plans
description: Use when you have a written implementation plan to execute in a separate session with review checkpoints
---

# Executing Plans

## Overview

Load plan, review critically, execute all tasks, report when complete.

**Fidelity to the plan:** A task is **not** done when the code “looks right.” You must complete **everything** the plan assigns for that task **in order**: tests/TDD steps, implementation, **project rules review**, **running the checks** the plan names (scripts, typecheck, tests for touched modules), **`git commit`** when the plan says to, and any other listed subtasks. Non-code steps are **mandatory deliverables**, not optional follow-up. If the plan names a command, run it (or stop and ask if the environment truly cannot run it). Do not report a task complete while skipping its verification or commit steps.

**Announce at start:** "I'm using the executing-plans skill to implement this plan."

**Note:** Tell your human partner that Superpowers works much better with access to subagents. The quality of its work will be significantly higher if run on a platform with subagent support (such as Claude Code or Codex). If subagents are available, use superpowers:subagent-driven-development instead of this skill.

## The Process

### Step 1: Load and Review Plan
1. Read plan file
2. Review critically - identify any questions or concerns about the plan
3. If concerns: Raise them with your human partner before starting
4. If no concerns: Create TodoWrite and proceed

### Step 2: Execute Tasks

For each task:
1. Mark as in_progress; update plan file: task `[~]`
2. Follow **every** substep exactly in order (including rules check, check script, commit, and anything else written in the task — not only the coding bullets)
3. Run verifications as specified; capture enough in your notes that a reviewer could see checks ran and passed
4. Mark as completed; update plan file: task `[x]` **only after** all of the above for that task are done

### Step 3: Complete Development

After all tasks complete and verified:
- Announce: "I'm using the finishing-a-development-branch skill to complete this work."
- **REQUIRED SUB-SKILL:** Use superpowers:finishing-a-development-branch
- Follow that skill to verify tests, present options, execute choice

## When to Stop and Ask for Help

**STOP executing immediately when:**
- Hit a blocker (missing dependency, test fails, instruction unclear)
- Plan has critical gaps preventing starting
- You don't understand an instruction
- Verification fails repeatedly

**Ask for clarification rather than guessing.**

## When to Revisit Earlier Steps

**Return to Review (Step 1) when:**
- Partner updates the plan based on your feedback
- Fundamental approach needs rethinking

**Don't force through blockers** - stop and ask.

## Plan File Updates

Update the plan .md file as you go so the human has a persistent progress view even if the agent crashes: `[~]` when starting a task, `[x]` when complete.

## Remember
- Review plan critically first
- Follow plan steps exactly — **whole task**, including checks and commits when the plan requires them
- Don't skip verifications or treat “implementation only” as done
- Reference skills when plan says to
- Stop when blocked, don't guess
- Never start implementation on main/master branch without explicit user consent

## Integration

**Required workflow skills:**
- **superpowers:using-git-worktrees** - REQUIRED: Set up isolated workspace before starting
- **superpowers:writing-plans** - Creates the plan this skill executes
- **superpowers:finishing-a-development-branch** - Complete development after all tasks
