# 2. Component Library Organization by Function

**Date:** 2024-01-12

## Status

Accepted

## Context

As our photo gallery application grew, we needed to establish a clear structure for organizing our React components. Without a consistent organizational pattern, the codebase can quickly become difficult to navigate, components become harder to find, and developers waste time searching for existing components before creating duplicates.

We had several types of components:
- Layout components (Hero, SectionContainer, SectionTitle)
- Card components (FeatureCard, PhotoCard)
- Statistics components (StatsGrid)
- Feature-specific components (GalleryGrid, UploadZone)

The question was: How should we organize these components to maximize discoverability, maintainability, and reusability?

## Decision

We will organize components by **function** within a hierarchical structure:

```
src/components/
├── ui/                    # Reusable UI components
│   ├── layout/           # Layout and structure components
│   │   ├── Hero.tsx
│   │   ├── SectionContainer.tsx
│   │   └── SectionTitle.tsx
│   ├── cards/            # Card-style components
│   │   └── FeatureCard.tsx
│   └── stats/            # Statistics and metrics
│       └── StatsGrid.tsx
├── gallery/              # Gallery-specific components
│   └── GalleryGrid.tsx
└── upload/               # Upload-specific components
    └── UploadZone.tsx
```

**Key principles:**
1. **UI components** are generic, reusable across the application
2. **Feature components** are specific to a particular domain (gallery, upload, admin)
3. **Functional grouping** within UI (layout, cards, stats, forms, etc.)
4. **Flat hierarchy** - max 2-3 levels deep

## Consequences

### Positive Consequences

- **Better Discoverability:** Developers can quickly find components by their function
- **Clearer Intent:** Directory names communicate the purpose of components
- **Easier Imports:** Predictable import paths like `@/components/ui/layout/Hero`
- **Prevents Duplication:** Clear organization helps developers find existing components before creating new ones
- **Scalability:** Easy to add new functional categories as needed
- **Separation of Concerns:** Clear distinction between generic UI and feature-specific components
- **Maintainability:** Related components are grouped together, making updates easier
- **Onboarding:** New developers can quickly understand the component structure

### Negative Consequences

- **More Directories:** More nested folders compared to a flat structure
- **Import Path Length:** Slightly longer import paths
- **Category Decisions:** Sometimes unclear which category a component belongs to
- **Reorganization Effort:** Existing components needed to be moved and imports updated

### Neutral Consequences

- **Consistency Required:** Team must agree on and follow categorization rules
- **Documentation Needed:** Need to document the structure and category meanings
- **Initial Setup Time:** Takes time to establish the structure initially

## Alternatives Considered

### Alternative 1: Flat Component Structure

**Description:** Place all components in a single `components/` directory without subdirectories

```
src/components/
├── Hero.tsx
├── SectionContainer.tsx
├── FeatureCard.tsx
├── GalleryGrid.tsx
├── UploadZone.tsx
└── StatsGrid.tsx
```

**Pros:**
- Simplest possible structure
- No decisions about categorization
- Shortest import paths
- Easy to implement initially

**Cons:**
- Becomes unwieldy with more than 15-20 components
- No organization or grouping
- Difficult to find components as codebase grows
- No distinction between generic and feature-specific components
- Hard to maintain consistency

**Reason for rejection:** This structure doesn't scale. With 50+ components (expected in the future), the flat directory would become unmanageable and developers would struggle to find components.

### Alternative 2: Feature-Based Organization

**Description:** Organize all components by feature/page

```
src/components/
├── home/
│   ├── HomeHero.tsx
│   ├── HomeFeatureCard.tsx
│   └── HomeGallery.tsx
├── gallery/
│   ├── GalleryHeader.tsx
│   ├── GalleryGrid.tsx
│   └── GalleryFilters.tsx
├── upload/
│   ├── UploadHero.tsx
│   └── UploadZone.tsx
└── shared/
    ├── Button.tsx
    └── Card.tsx
```

**Pros:**
- Components co-located with related features
- Mirrors page structure
- Easy to find components for specific features
- Clear ownership by feature team

**Cons:**
- Shared/generic components end up in a "shared" or "common" folder
- Encourages duplication (each feature might create similar components)
- Harder to discover reusable components
- Components that are used across features create ambiguity
- Makes component reuse less obvious

**Reason for rejection:** This structure optimizes for feature isolation but makes it harder to build a reusable component library. Our application needs shared UI patterns across many pages, and feature-based organization would lead to duplication.

### Alternative 3: Atomic Design Pattern

**Description:** Organize components using Atomic Design methodology (atoms, molecules, organisms, templates)

```
src/components/
├── atoms/
│   ├── Button.tsx
│   └── Icon.tsx
├── molecules/
│   ├── FeatureCard.tsx
│   └── SearchBar.tsx
├── organisms/
│   ├── Hero.tsx
│   └── GalleryGrid.tsx
└── templates/
    ├── PageLayout.tsx
    └── SectionLayout.tsx
```

**Pros:**
- Well-established design system pattern
- Encourages component composition
- Clear component hierarchy
- Popular in design systems

**Cons:**
- Unclear boundaries between atoms, molecules, and organisms
- Terminology not intuitive for all developers
- Debatable categorization (is a card an atom, molecule, or organism?)
- Adds cognitive overhead
- May be overkill for our application size

**Reason for rejection:** While Atomic Design is powerful for large design systems, it adds unnecessary complexity for our application. The terminology creates confusion about where components belong, and the benefits don't outweigh the overhead for our use case.

### Alternative 4: UI Library + Pages Structure

**Description:** Separate UI components from page-specific components

```
src/
├── components/     # All reusable UI components (flat)
└── app/           # Next.js pages with co-located components
    ├── page.tsx
    ├── _components/
    │   └── HomeGallery.tsx
    └── gallery/
        ├── page.tsx
        └── _components/
            └── GalleryFilters.tsx
```

**Pros:**
- Clear separation of reusable vs page-specific
- Co-locates page components with their pages
- Follows Next.js App Router patterns
- Reduces component directory size

**Cons:**
- Page components harder to find and reuse
- Duplication of logic across page components
- Components can't easily be promoted to shared UI
- Two different places to look for components

**Reason for rejection:** While co-location is valuable, scattering components throughout the app directory makes it harder to identify reuse opportunities and maintain consistency.

## References

- [React Component Organization Best Practices](https://react.dev/learn/thinking-in-react#step-1-break-the-ui-into-a-component-hierarchy)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [Feature-Sliced Design](https://feature-sliced.design/)
- Related ADRs: [ADR-0001](./0001-use-nextjs-15-app-router.md) - Next.js App Router

## Notes

**Implementation Guidelines:**

1. **Layout components** - Components that provide structure and spacing (Hero, Section, Container)
2. **Cards** - Card-style components for displaying grouped content
3. **Stats** - Components for displaying metrics and statistics
4. **Forms** (future) - Form inputs and related components
5. **Feedback** (future) - Modals, toasts, alerts
6. **Navigation** (future) - Headers, navbars, breadcrumbs

**When to create a new category:**
- When you have 3+ similar components that don't fit existing categories
- When the category name clearly communicates the component purpose
- When the category would help developers find components faster

**Component promotion:**
- Start with feature-specific components
- Move to `ui/` when used in 2+ different features
- Choose appropriate functional category based on component purpose

---

## Metadata

- **Author(s):** Photo Gallery Team
- **Reviewers:** Frontend Team
- **Last Updated:** 2024-01-12
