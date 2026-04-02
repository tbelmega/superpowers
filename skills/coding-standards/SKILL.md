---
name: coding-standards
description: Use when writing or reviewing code, adding types, or documenting
---

# Coding Standards

## Types

- Declare explicit types for function signatures.
- Use non-nullable types by default and handle `null` or `undefined` explicitly.
- Do not bypass the type system with `any`, unchecked casts, or non-null assertions.
- Prefer library types to hand-rolled equivalents.
- Keep types aligned with validation at system boundaries.

## Comments

- Comment why, not what.
- Add comments only for intent, business rules, edge cases, or non-obvious behavior.
- Do not restate code, names, or TypeScript signatures.

## Naming

- Follow existing naming conventions.
- Prefer clear, domain-specific names over abbreviations or generic placeholders.
- Avoid generic file names such as `handler.ts`, `utils.ts`, or `service.ts` when a specific name would improve searchability.
