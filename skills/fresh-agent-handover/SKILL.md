---
name: fresh-agent-handover
description: Use when the current conversation has become too context-heavy or degraded and a fresh agent should continue the work from a concise handoff instead of the full chat history
---

# Fresh Agent Handover

Prepare a compact handoff for a new agent when the current session should stop and another agent should continue.

## Use When

- Context pressure is high and continued work in the current session is becoming unreliable.
- The user wants to switch to a fresh agent in the middle of a conversation.
- Important state exists in chat, but the next agent should not need the full conversation history.

Do not use this for normal plan-writing to plan-execution handoff when `writing-plans` or `executing-plans` already covers the transition.

## Goal

Produce a handoff that lets the next agent start cleanly with:

- the immediate objective
- the current state
- the next recommended action
- references to the persistent docs or files that are the source of truth
- any important conversation-only context that has not yet been written down

The handoff should compress the session, not narrate it.

## Workflow

1. Identify the source-of-truth artifacts.
2. Separate persistent state from conversation-only state.
3. Decide the narrowest useful next objective for the new agent.
4. Write a concise handoff prompt for the next agent.
5. Explicitly list any important context from the conversation that is not yet captured in a persistent doc, file, plan, or issue.

## Required Contents

Every handoff should include:

- `Objective`: what the next agent is trying to accomplish now
- `Current state`: what is already done and what remains
- `Source of truth`: the files or docs the next agent should trust first
- `Next step`: the first concrete action the next agent should take
- `Unpersisted context`: important facts, decisions, constraints, risks, or requests that appeared in conversation but are not yet recorded in a persistent artifact

Include only high-signal details. Omit low-value chronology, repeated reasoning, and large command outputs unless they are necessary to avoid repeating failed work.

## Output Shape

Return two parts:

1. A copy-pasteable prompt for the fresh agent
2. A short note naming any important conversation context that still should be persisted

Use this shape:

```md
Fresh-agent prompt:

Continue this work from the current repository state.

Objective:
- ...

Current state:
- ...

Source of truth:
- [path/to/file]
- [path/to/doc]

Next step:
- ...

Constraints and risks:
- ...

Unpersisted context from prior conversation:
- ...
```

Then add:

```md
Still should be persisted:
- ...
```

If everything important is already persisted, say that explicitly.

## Quality Bar

- Make the next agent's first step obvious.
- Prefer repository artifacts over chat summary whenever possible.
- Name unresolved decisions and blockers clearly.
- Call out stale assumptions or tentative conclusions as such.
- If the session uncovered an important issue that is not yet documented anywhere persistent, mention that explicitly.

## Common Mistakes

- Dumping a long transcript instead of compressing it
- Omitting the first concrete next step
- Failing to distinguish persisted facts from chat-only context
- Treating the handoff as a backlog of future ideas instead of the minimum context needed to continue correctly
