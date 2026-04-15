# Upstream Review Log

## Policy

- Core workflow skills in this fork diverge intentionally from upstream; do not merge upstream changes to planning, execution, or worker-orchestration skills wholesale.
- Prefer cherry-picking small factual fixes with low conflict risk.
- Manually port harness-compatibility ideas when they align with this fork's markdown-plan-first, cross-harness philosophy.
- Do not rebase this fork onto upstream.
- Use upstream as a source of ideas and targeted fixes, not as the authoritative workflow direction.

## Review 2026-04-15

Reviewed upstream through: `f9b088f` (`Merge pull request #1165 from obra/mirror-codex-plugin-tooling`)

### Picked

- `4fd9aa2` `fix(writing-skills): correct false 'only two fields' frontmatter claim`
  - Cherry-picked as local commit `760f218`
  - Reason: small factual fix, aligned with fork philosophy, low conflict risk

### Rejected

- `e6221a4` / `4ae1a3d` / `3f80f1c`
  - Upstream inline-self-review direction conflicts with this fork's current execution philosophy

- `74a0c00` / `33e9bea` / `c28b28f` / `80c0a45` / `eb2b44b` / `bd080e3`
  - Upstream Codex compatibility design/docs are useful reference material but not commits to merge directly

- `8c8c5e8` / `ac1c715` / `777a977` / `6149f36` / `bcdd7fa` / `bc25777` / `f9b088f`
  - Codex plugin mirroring/sync tooling is not relevant to the current maintenance strategy for this fork

- `fb4adab`
  - Cursor plugin version bump only makes sense in upstream's release flow

- `eccd453` / `7642153` / `8ea3981` / `c0b417e` / `dd23728`
  - Admin/community/process additions are optional and not currently a priority for this fork

- `a1155f6` / `eafe962` / `1f20bef` / `f0df5ec` / `65d760f`
  - Release notes/changelog only

- `151cfb1` / `9e6e077` / `9e3ed21` / `f076bd3` / `9f04f06`
  - Brainstorm server/runtime changes are not being pulled in without a separate targeted review

- Upstream changes to `skills/writing-plans/SKILL.md`, `skills/executing-plans/SKILL.md`, `skills/subagent-driven-development/SKILL.md`, `skills/using-superpowers/SKILL.md`, `README.md`, and `cursor-rules/*`
  - These areas now diverge intentionally and should be treated as manual-port-only when a specific idea is worth adopting

### Maybe / Manual-Port Later

- `8b16692`
  - Add Copilot CLI tool mapping, docs, and install instructions
  - Relevant only if Copilot CLI becomes a target harness

- `a2964d7`
  - Copilot CLI platform detection for session-start context injection
  - Relevant only if Copilot CLI becomes a target harness

- `2d942f3` / `0a1124b`
  - OpenCode fixes around skills path alignment and bootstrap injection
  - Philosophically aligned with token-efficiency concerns, but only worth revisiting if OpenCode remains a target harness

- `2b1bfe5`
  - Codex named-agent dispatch mapping docs
  - Worth revisiting for ideas, but manual-port rather than cherry-pick

## Next Review Start Point

- Compare future upstream work against `f9b088f`

## Review Command

```bash
git fetch https://github.com/obra/superpowers.git main:refs/remotes/upstream/main
git log --oneline f9b088f..upstream/main
```
