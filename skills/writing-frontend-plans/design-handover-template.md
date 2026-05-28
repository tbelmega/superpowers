# Design Handover Template

A paste-ready request for **your design tool** to produce a structured handover for the **coding
agent**. Fill in `<feature>`, hand it to the design tool, and return the completed doc alongside
the wireframes. The coding agent's `writing-frontend-plans` skill consumes it (and degrades
gracefully if it is missing or partial).

---

## Request to the design tool

Produce a handover for `<feature>` ordered **Primitives → Components → Pages**. **After creating
the pages, re-check that every primitive and component a page references is defined below** — this
final pass is the most commonly missed step and is what lets the coding agent build without guessing.

### 1. Design tokens / primitives

For each token and primitive the pages use:

- Name and purpose.
- Values (color, spacing, typography scale, radius, shadow, etc.).
- The production CSS class or CSS variable it should map to (so it is adoptable, not inline-only).

List **every** primitive the pages reference. Inline styles in the wireframe are not enough —
each must have an adoptable production class/variable.

### 2. Components

For each component:

- Name and the primitives it composes.
- Props / variants.
- States: default, hover, active, disabled, empty, loading.
- Where it appears in the wireframe (file + region).

### 3. Pages / screens

For each screen:

- **Fidelity target:** `pixel-target` | `directionally-illustrative` | `behavior-only`.
- **Wireframe reference:** file + intended viewport.
- **Layout grid:** the exact grid/track sizing, e.g. `gridTemplateColumns: '2fr 1fr 1fr'`.
- **Components composed,** in visual order.
- **Demo data shown,** and what it implies about the **data contract** — the exact fields the
  screen needs. (Demo data is a specification of shape and states, not strings to reproduce.)
- **States to render:** filled, empty, loading, long-text/overflow.
- **Every visible copy string,** verbatim — treated as data.
- **Approved deviations:** any control the design system requires that the wireframe screenshot
  omits (e.g. a lifecycle or filter control the design system mandates but the screenshot leaves
  out), so they are not read as regressions.

### Notes for the coding agent

- The **wireframe is the visual source of truth**; this doc is the inventory and mapping.
- If a field a screen needs is **not present in the API / shared types**, flag it explicitly —
  do **not** substitute another field.
