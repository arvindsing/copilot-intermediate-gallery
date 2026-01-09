# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records (ADRs) for the Photo Gallery & Portfolio application. ADRs document important architectural and technical decisions made during the development of the project.

## What are ADRs?

Architecture Decision Records are documents that capture important architectural decisions along with their context and consequences. They serve as a historical record of why certain technical choices were made, helping current and future developers understand the reasoning behind the project's structure.

## Why Use ADRs?

- **Historical Context**: Understand why decisions were made at specific points in time
- **Onboarding**: Help new team members quickly understand architectural choices
- **Learning**: Document lessons learned and trade-offs considered
- **Reference**: Provide a searchable knowledge base of technical decisions
- **Transparency**: Make architectural decisions visible and discussable

## How to Create a New ADR

### 1. Use the Template

Copy the template file and create a new ADR:

```bash
cp docs/adr/000-template.md docs/adr/004-new-decision.md
```

### 2. Numbering Convention

ADRs are numbered sequentially starting from 001:

- `000-template.md` - The template (not a real ADR)
- `001-nextjs-app-router.md` - First decision
- `002-component-library.md` - Second decision
- `003-typescript-adoption.md` - Third decision
- `004-your-new-decision.md` - Next decision

Always use three digits with leading zeros (001, 002, 003, etc.)

### 3. Fill in the Template

Complete all sections of the template:

- **Title**: Short, descriptive name (e.g., "Use Next.js App Router")
- **Status**: Current status of the decision
- **Date**: Date the decision was made or proposed
- **Context**: The problem or challenge you're addressing
- **Decision**: What you decided to do
- **Consequences**: Positive and negative impacts
- **Alternatives Considered**: Other options you evaluated

### 4. Writing Guidelines

**Be Clear and Concise:**
- Use simple, direct language
- Focus on the "why" not just the "what"
- Include enough context for someone unfamiliar with the project

**Be Honest:**
- Document trade-offs and limitations
- Acknowledge both positive and negative consequences
- Mention alternatives you considered

**Be Specific:**
- Include concrete examples when helpful
- Reference specific technologies, versions, or patterns
- Link to relevant documentation or resources

## Status Definitions

Each ADR has a status that indicates its current state:

- **Proposed**: Under consideration, not yet decided
- **Accepted**: Decision has been made and implemented
- **Deprecated**: No longer relevant or superseded by newer decisions
- **Superseded**: Replaced by a newer ADR (link to the new ADR)

## ADR Index

Below is the list of all Architecture Decision Records in chronological order:

| Number | Title | Status | Date | Summary |
|--------|-------|--------|------|---------|
| [001](./001-nextjs-app-router.md) | Use Next.js App Router | Accepted | 2026-01-09 | Adopt Next.js 15 App Router for improved performance and modern React features |
| [002](./002-component-library.md) | Create Custom Component Library | Accepted | 2026-01-09 | Build organized UI component library in `src/components/ui/` for consistency and reusability |
| [003](./003-typescript-adoption.md) | Adopt TypeScript Throughout Project | Accepted | 2026-01-09 | Use TypeScript 5 for type safety, better DX, and self-documenting code |

## Template

See [000-template.md](./000-template.md) for the standard ADR template to use when creating new architecture decision records.

## Tips for Effective ADRs

### When to Write an ADR

Write an ADR when making decisions about:
- **Architecture**: Overall system structure and organization
- **Technology**: Framework, library, or tool selection
- **Patterns**: Design patterns and coding conventions
- **Infrastructure**: Deployment, hosting, or build processes
- **Trade-offs**: Decisions involving significant trade-offs

### When NOT to Write an ADR

Don't write ADRs for:
- **Minor details**: Small implementation details or bug fixes
- **Temporary changes**: Experimental or easily reversible changes
- **Obvious choices**: Decisions with clear, undisputed best practices
- **Personal preferences**: Style choices without technical impact

### Making ADRs Immutable

Once an ADR is accepted:
- **Don't edit** the decision or consequences sections
- **Don't delete** ADRs (even if deprecated)
- If circumstances change, create a **new ADR** that supersedes the old one
- Update the old ADR's status to "Superseded" with a link to the new ADR

**Why?** ADRs serve as historical records. Editing them erases history and context.

### Example of Superseding an ADR

If you need to change a decision:

**Old ADR (001-original-decision.md):**
```markdown
# Use Pages Router

**Status**: Superseded by [ADR 004](./004-migrate-to-app-router.md)
**Date**: 2025-11-15

[Original content remains unchanged]
```

**New ADR (004-migrate-to-app-router.md):**
```markdown
# Migrate to App Router

**Status**: Accepted
**Date**: 2026-01-09

## Context
We originally chose Pages Router (ADR 001) but now need better performance...

## Decision
Migrate from Pages Router to App Router.

Supersedes: [ADR 001](./001-original-decision.md)
```

## Contributing

When contributing to the project:

1. **Review existing ADRs** to understand past decisions
2. **Propose new ADRs** for significant architectural changes
3. **Discuss ADRs** before marking them as "Accepted"
4. **Keep ADRs updated** with status changes (but don't edit content)

## Resources

- [ADR GitHub Organization](https://adr.github.io/)
- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [Why Write ADRs](https://github.blog/2020-08-13-why-write-adrs/)

---

**Last Updated:** 2026-01-09
