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
- Create the worktree on a new branch and switch into it.

## Baseline

- Run project setup commands only for technologies actually present in the repo.
- Run an appropriate baseline verification command if the project has one.
- If baseline tests fail, report that and ask whether to proceed.

## Report Back

- State the worktree path.
- State whether setup ran.
- State whether baseline verification passed, failed, or was unavailable.
