---
name: using-git-worktrees
description: Use before executing implementation work that should run in an isolated git worktree instead of the current workspace
---

# Using Git Worktrees

Create an isolated worktree before implementation work that should not run in the current checkout.

## Location Order

Prefer `.worktrees/`, then `worktrees/`, then any repo instruction, then ask the user.

If no existing directory or repo instruction chooses the location, ask:

1. `.worktrees/`
2. `~/.config/superpowers/worktrees/<project>/`

## Safety

- For project-local worktrees, verify the directory is ignored with `git check-ignore`.
- If it is not ignored, add the ignore rule and commit that before creating the worktree.
- If the project uses worktrees-per-feature or does not use worktrees yet, create the worktree on a new branch and switch into it.
- If the project uses multiple permanent generic worktrees, ask the user which worktree to use and create a new feature branch from the master branch in that worktree.

## Worktree Confinement

Once a worktree is selected, resolve its canonical absolute root with `git rev-parse --show-toplevel`. That path is the **assigned worktree** and is immutable for the run.

- Perform all repository reads, writes, commands, tests, and Git operations in the assigned worktree.
- Do not target, inspect for task or recovery state, modify, copy from, copy to, clean, reset, stash, or otherwise manipulate another checkout or worktree.
- Pass the absolute assigned worktree path to every subagent and require it to verify its Git top-level before acting.
- A wrong-worktree attempt is invalid. Stop that subagent and retry with a fresh subagent in the assigned worktree. Never salvage or clean up the invalid attempt from this run.

## Baseline

- Run project setup commands only for technologies actually present in the repo.
- Run an appropriate baseline verification command if the project has one.
- If baseline tests fail, report that and ask whether to proceed.

## Report Back

- State the canonical absolute assigned worktree path.
- State whether setup ran.
- State whether baseline verification passed, failed, or was unavailable.
