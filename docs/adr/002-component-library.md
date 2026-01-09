# 002. Create Custom Component Library

**Status**: Accepted  
**Date**: 2026-01-09

---

## Context

The Photo Gallery & Portfolio application needs a consistent user interface across multiple pages (homepage, gallery, upload, admin). We need to decide how to organize and build reusable UI components.

Key requirements:
- **Consistency**: All pages should have a cohesive look and feel
- **Reusability**: Common UI patterns should be implemented once and reused
- **Maintainability**: Changes to UI components should be easy to implement globally
- **Developer Experience**: Components should be easy to discover and use
- **Copilot Friendliness**: Structure should enable effective code generation and completion
- **Scalability**: Architecture should support adding new components as the app grows

Several approaches are available:
1. Build custom components in our own component library
2. Use a pre-built component library (shadcn/ui, Material-UI, Chakra UI, etc.)
3. Use Tailwind components directly without abstraction
4. Mix of custom and third-party components

This decision impacts how developers build features and how GitHub Copilot generates code suggestions.

## Decision

We will **create a custom component library** organized in `src/components/ui/` with components grouped by type (layout, cards, stats) and exported through a central barrel file.

**Structure**:
```
src/components/
├── ui/                      # Reusable UI component library
│   ├── layout/             # Layout components
│   │   ├── Hero.tsx
│   │   ├── SectionContainer.tsx
│   │   └── SectionTitle.tsx
│   ├── cards/              # Card components
│   │   └── FeatureCard.tsx
│   ├── stats/              # Statistics components
│   │   └── StatsGrid.tsx
│   └── index.ts            # Barrel export
├── gallery/                # Feature-specific components
│   └── GalleryGrid.tsx
└── upload/                 # Feature-specific components
    └── UploadZone.tsx
```

**Export Pattern** (`src/components/ui/index.ts`):
```typescript
export { Hero } from './layout/Hero';
export { SectionContainer } from './layout/SectionContainer';
export { SectionTitle } from './layout/SectionTitle';
export { FeatureCard } from './cards/FeatureCard';
export { StatsGrid } from './stats/StatsGrid';
```

**Usage**:
```typescript
import { Hero, SectionContainer, FeatureCard } from '@/components/ui';
```

## Consequences

### Positive Consequences ✅

- **Consistency Across Pages**: All pages use the same Hero, SectionContainer, and other components
  - Ensures uniform spacing, typography, and styling
  - Changes to design system apply globally
  
- **Easier Maintenance**: Update a component once, changes reflect everywhere
  - Bug fixes propagate automatically
  - Style updates require single edit
  
- **Improved Developer Experience**: 
  - Clear component organization makes them easy to find
  - Barrel exports simplify imports
  - Consistent naming conventions
  - Self-documenting through TypeScript interfaces
  
- **Excellent for Copilot Demos**: 
  - Shows best practices for component organization
  - Demonstrates how to build reusable components
  - Great examples for Copilot to learn from and suggest
  - Clear patterns for code generation
  
- **Tailwind Integration**: Custom components work seamlessly with Tailwind
  - Can use utility classes while maintaining abstraction
  - Flexible styling through className props
  
- **Full Control**: Complete ownership of component behavior
  - No dependency on third-party library updates
  - Can optimize for our specific use cases
  
- **Lightweight**: Only the components we actually need
  - No unused code from large UI libraries
  - Smaller bundle size

### Negative Consequences ❌

- **Initial Setup Time**: Need to build components from scratch
  - More upfront development work
  - Must implement common patterns ourselves
  
- **Need to Maintain Documentation**: Custom components require clear documentation
  - Must write usage examples
  - Need to document props and behavior
  - Documentation can become outdated
  
- **No Out-of-the-Box Complex Components**: 
  - Advanced components (date pickers, data tables) need custom implementation
  - Missing pre-built accessibility patterns
  
- **Learning Curve for Contributors**: 
  - New contributors must learn our custom component API
  - No existing knowledge transfer from popular libraries

### Neutral Consequences 📋

- **Radix UI for Complex Interactions**: We supplement with Radix UI primitives
  - Dialog, Select, Toast use Radix UI components
  - Provides accessibility without full UI library
  - Hybrid approach balances control and convenience
  
- **Component Library May Grow**: As needs evolve, more components will be added
  - Requires ongoing organization and maintenance
  - Need to prevent duplication and inconsistency

## Alternatives Considered

### Alternative 1: shadcn/ui Only

**Description**: Use shadcn/ui as the primary component library by copying components into the project

**Pros**:
- Copy components into your project (full ownership)
- Built with Radix UI and Tailwind CSS
- Excellent TypeScript support
- Accessible by default
- Well-documented components
- Growing popularity and community

**Cons**:
- Still need to customize for our specific needs
- Component copying can lead to drift from updates
- Some components may be overkill for our use cases
- Less clear for Copilot demos (mixing our code with copied code)
- Adds initial setup complexity

**Why not chosen**: While shadcn/ui is excellent, building our own components provides better learning opportunities for Copilot demos. We can still use Radix UI for complex primitives while maintaining full control of our UI components.

### Alternative 2: Material-UI (MUI)

**Description**: Use Material-UI as a complete component library

**Pros**:
- Comprehensive component library
- Battle-tested in production
- Extensive documentation
- Large community
- Built-in theming system
- Accessibility support

**Cons**:
- Material Design aesthetic (may not match our design)
- Large bundle size (even with tree shaking)
- Opinionated styling approach
- Learning curve for customization
- Heavier runtime overhead
- Less flexible with Tailwind CSS

**Why not chosen**: Material-UI's opinionated design and larger bundle size don't align with our lightweight, Tailwind-first approach. We want flexibility to match our exact design vision.

### Alternative 3: Chakra UI

**Description**: Use Chakra UI component library with built-in styling

**Pros**:
- Excellent developer experience
- Built-in dark mode
- Accessible by default
- Good TypeScript support
- Composable components
- Active development

**Cons**:
- Another styling system alongside Tailwind
- Learning curve for Chakra's API
- Additional bundle size
- May conflict with Tailwind approach
- Less control over implementation

**Why not chosen**: Using Chakra UI alongside Tailwind CSS creates competing styling approaches. We prefer a Tailwind-first strategy with custom components built on Tailwind utilities.

### Alternative 4: No Component Abstraction

**Description**: Build UI directly with Tailwind classes without component abstraction

**Pros**:
- No abstraction overhead
- Maximum flexibility per page
- Fastest initial development
- See exact Tailwind classes everywhere

**Cons**:
- Massive code duplication across pages
- Inconsistent styling between pages
- Difficult to maintain and update
- No reusability
- Harder to ensure accessibility
- Doesn't scale well

**Why not chosen**: While simple initially, this approach doesn't scale and leads to inconsistency. Component abstraction is essential for maintainable applications.

---

## Additional Information

### Related Decisions

- [ADR 001: Use Next.js App Router](./001-nextjs-app-router.md) - App Router's modular structure works well with component library
- [ADR 003: Adopt TypeScript](./003-typescript-adoption.md) - TypeScript interfaces make component props self-documenting

### Implementation Notes

**Component Development Process**:
1. Identify reusable UI pattern across pages
2. Extract into component in appropriate `ui/` subdirectory
3. Define TypeScript interface for props
4. Implement with Tailwind utility classes
5. Export from `ui/index.ts`
6. Document usage in COMPONENT_USAGE_GUIDE.md

**Naming Conventions**:
- Components use PascalCase: `Hero`, `FeatureCard`, `SectionContainer`
- Files match component names: `Hero.tsx`, `FeatureCard.tsx`
- Props interfaces suffixed with "Props": `HeroProps`, `FeatureCardProps`

**Styling Strategy**:
- Use Tailwind utility classes for styling
- Define reusable CSS classes in `globals.css` for complex styles
- Support dark mode through Tailwind's `dark:` prefix
- Accept optional `className` prop for customization

**When to Create New UI Component**:
- Pattern is used on 2+ pages
- Component has clear, single responsibility
- Behavior is consistent across uses
- Benefits from centralized maintenance

**When NOT to Create UI Component**:
- One-off, page-specific layout
- Highly specialized behavior for single feature
- Temporary or experimental UI

### Review Schedule

Review this decision if:
- Component library becomes difficult to maintain (too many components)
- Significant duplication emerges despite component library
- Team struggles with component discovery or usage
- Need for more advanced components requires major library

Current recommendation: Review in 6 months (July 2026) after project has grown.

---

**Last Updated**: 2026-01-09
