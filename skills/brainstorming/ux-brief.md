# UX Brief Handoff For Claude Design

Use this guide when the user chose Claude Design for visual decisions or visual brainstorming.

## Purpose

Create a UX Brief that hands the feature to Claude Design without prescribing UI. The brief should describe what users need to accomplish, what information is in play, and what constraints matter. It should leave layout, navigation, components, interaction patterns, visual hierarchy, and design direction to Claude Design.

Write the brief as a separate document, usually:

`docs/specs/YYYY-MM-DD-<topic>-ux-brief.md`

Use the user's preferred path if they give one.

## Timing

Create the UX Brief toward the end of brainstorming, after the product behavior and scope are clear but before the design spec is finalized. The UX Brief may reference the main design spec, but it must stand on its own well enough that the user can paste or upload it into Claude Design.

If the main spec still has unresolved product decisions that affect UX, include them explicitly as open questions rather than silently deciding them.

## Required Structure

### Front Matter

Use YAML-style front matter:

```markdown
---
Status: Draft / for UX design
Date: YYYY-MM-DD
Topic: <feature name> - UX brief
---
```

Then add an H1 title and a short purpose statement:

```markdown
# <Feature Name> - UX Brief

**Purpose of this document:** Hand off <feature> to Claude Design so wireframes, interaction flows, and visual directions can be explored. This brief deliberately avoids prescribing UI. It describes what users need to accomplish and what information is in play, and leaves layout, navigation, components, and interactions to the design process.

If anything below feels like it implies a UI decision, treat it as accidental. Challenge it and ask.
```

### Product Context

Summarize:

- What product or system this feature belongs to.
- Who uses the feature.
- Why the feature exists.
- The outcome the user is trying to reach.
- Important business, operational, trust, safety, or technical constraints that should shape design thinking.

Keep this focused on product understanding, not UI direction.

### Entity Model

List the key entities, concepts, and data objects Claude Design needs to understand. Include:

- Whether each entity is new or existing when that matters.
- Ownership, scope, lifecycle, versioning, archive/delete behavior, or immutability rules.
- Important derived data users need to interpret.
- Relationships between entities.

Prefer concise bullets. Include an ER diagram reference if one exists in the main spec, but do not require Claude Design to read the main spec to understand the brief.

### Use Cases

Describe what the user needs to accomplish. Group by workflow or capability, not by screen.

For each use case, include:

- The user's goal.
- The information they need while doing it.
- The actions they need to take.
- State changes, review steps, error cases, or trust concerns.
- Differences between similar workflows that should not be hidden by an over-general design.

Avoid naming UI controls unless the control is a product requirement.

### Draft Screen List / Sitemap

Label this section exactly:

`## Draft screen list / sitemap`

Start the section with:

`**First cut - design will challenge.**`

Explain that this list anchors vocabulary for discussion but is not a sitemap commitment. Claude Design should feel free to merge, split, rename, replace, or challenge screens if another structure better serves the user goals.

Then provide a first-cut list of likely screens, surfaces, flows, or drill-downs. Use names that make the product concepts easy to discuss. Do not over-specify layout or navigation.

### Out Of Scope

List what Claude Design should not solve for this version. Include:

- Explicit v1 non-goals.
- Later possibilities that should not distort the current design.
- Decisions that remain open and should be designed for, not designed around.
- Product, technical, access-control, automation, reporting, or operational capabilities excluded from the current scope.

## Writing Rules

- Do not prescribe layout, navigation, component choices, visual style, or interaction mechanics unless the user explicitly decided them.
- If a requirement sounds like a UI decision, phrase it as the user need behind the UI.
- Preserve open questions instead of inventing answers.
- Make constraints explicit, especially trust, versioning, permissions, auditability, safety, cost, latency, or production-isolation concerns.
- Use plain product language that a designer can challenge.
- Keep the UX Brief aligned with the main design spec, but do not copy the entire spec.
- Reference useful main-spec diagrams, such as ER diagrams or lifecycle diagrams, when they help Claude Design understand the domain. Do not duplicate diagrams unless the UX Brief needs to stand alone without the main spec.
