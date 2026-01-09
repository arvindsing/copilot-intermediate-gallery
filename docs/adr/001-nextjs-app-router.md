# 001. Use Next.js App Router

**Status**: Accepted  
**Date**: 2026-01-09

---

## Context

We need to choose a routing architecture for the Photo Gallery & Portfolio application. The primary requirements are:

- **Performance**: Fast page loads and optimal user experience
- **Developer Experience**: Modern patterns that work well with GitHub Copilot
- **SEO**: Good search engine optimization for portfolio visibility
- **Scalability**: Architecture that can grow with the application
- **Learning Value**: Demonstrates modern React patterns for Copilot demos

Next.js offers two routing approaches:

1. **Pages Router**: The traditional, stable routing system used since Next.js 9
2. **App Router**: The new routing system introduced in Next.js 13, stable in Next.js 15

We need to decide which routing approach to use for this new project.

## Decision

We will use the **Next.js 15 App Router** for this application.

The App Router will be implemented with:
- Server Components as the default rendering strategy
- File-based routing in the `src/app/` directory
- React 19 for modern React features
- TypeScript for type safety throughout

## Consequences

### Positive Consequences ✅

- **Better Performance**: Server Components by default reduce client-side JavaScript bundle size significantly
  - Only interactive components ship JavaScript to the client
  - Static content renders on the server with zero client JS
  
- **Improved Data Fetching**: Native async/await in Server Components simplifies data fetching patterns
  - No need for `getServerSideProps` or `getStaticProps`
  - Cleaner, more intuitive code that Copilot handles well
  
- **Modern React Features**: Full access to React 19 features including:
  - Improved Server Components
  - Better Suspense boundaries
  - Enhanced streaming and partial hydration
  
- **Better Streaming Support**: Built-in support for streaming HTML to the client
  - Faster Time to First Byte (TTFB)
  - Progressive page rendering
  
- **Simplified Layouts**: Nested layouts that share UI between routes without re-rendering
  
- **Excellent for Demos**: Showcases cutting-edge React patterns ideal for Copilot demonstrations
  - Modern architecture that developers want to learn
  - Clear examples of Server vs Client Components
  
- **Future-Proof**: This is the direction the React and Next.js ecosystems are moving

### Negative Consequences ❌

- **Newer API**: The App Router is relatively new (stable since Next.js 13.4, enhanced in 15)
  - Best practices are still evolving
  - Some edge cases may not have well-established patterns
  
- **Smaller Knowledge Base**: Fewer Stack Overflow answers and tutorials compared to Pages Router
  - Most existing Next.js content covers Pages Router
  - May require consulting official docs more frequently
  
- **Learning Curve**: Developers familiar with Pages Router need to learn new patterns
  - Different mental model (Server vs Client Components)
  - New file conventions and naming
  
- **Some Libraries Need Adaptation**: Not all third-party libraries are optimized for Server Components
  - May need 'use client' directives for some dependencies
  - Some packages don't yet document App Router usage

### Neutral Consequences 📋

- **Breaking Changes from Pages Router**: Cannot gradually migrate from Pages Router
  - Must commit to App Router from the start
  - Different project structure
  
- **Documentation Focus**: Need to specifically search for "App Router" documentation
  - Can't always use generic Next.js tutorials
  - Must distinguish App Router from Pages Router content

## Alternatives Considered

### Alternative 1: Pages Router

**Description**: Use the traditional Next.js Pages Router with `pages/` directory

**Pros**:
- Mature, stable API with years of production use
- Extensive documentation and community knowledge
- More third-party tutorials and examples
- Familiar patterns for most Next.js developers
- Well-understood performance characteristics

**Cons**:
- Older patterns that don't showcase modern React
- More client-side JavaScript by default
- Less intuitive data fetching patterns (getServerSideProps, getStaticProps)
- Not the future direction of Next.js development
- Doesn't demonstrate cutting-edge features for Copilot demos

**Why not chosen**: While more stable and familiar, the Pages Router doesn't align with our goals of showcasing modern React patterns and providing the best performance. Since this is a new project without legacy code, we can take advantage of the App Router's benefits without migration concerns.

### Alternative 2: Remix

**Description**: Use Remix framework instead of Next.js

**Pros**:
- Excellent data loading patterns with loaders and actions
- Built-in form handling and progressive enhancement
- Great performance characteristics
- Modern web standards approach

**Cons**:
- Smaller ecosystem than Next.js
- Less community adoption and resources
- Different deployment model
- Fewer Vercel-specific optimizations
- Not as well-known for Copilot demos

**Why not chosen**: While Remix is an excellent framework, Next.js has broader adoption, better GitHub Copilot integration examples, and easier deployment on Vercel. For a demo repository, Next.js's popularity makes it more valuable for learning.

### Alternative 3: Vite + React Router

**Description**: Use Vite with React Router for a custom setup

**Pros**:
- Complete control over architecture
- Minimal framework overhead
- Lightning-fast development server
- Flexible deployment options

**Cons**:
- No built-in Server Components
- Manual setup for SSR if needed
- No automatic image optimization
- No file-based routing
- More boilerplate code required
- Less "production ready" out of the box

**Why not chosen**: Would require significant additional setup to achieve similar features to Next.js App Router. The goal is to build a production-ready application quickly, not to build a custom framework. Next.js provides better defaults for our use case.

---

## Additional Information

### Related Decisions

- [ADR 002: Create Custom Component Library](./002-component-library.md) - Component organization works well with App Router's modular structure
- [ADR 003: Adopt TypeScript](./003-typescript-adoption.md) - TypeScript provides better type safety for Server/Client Component boundaries

### Implementation Notes

**Directory Structure**:
```
src/app/
├── layout.tsx       # Root layout (navigation, global styles)
├── page.tsx         # Homepage route (/)
├── gallery/
│   └── page.tsx     # Gallery route (/gallery)
├── upload/
│   └── page.tsx     # Upload route (/upload)
└── admin/
    └── page.tsx     # Admin route (/admin)
```

**Server vs Client Components**:
- Default to Server Components (no directive needed)
- Add `'use client'` only when needed for:
  - Event handlers (onClick, onChange)
  - React hooks (useState, useEffect, useContext)
  - Browser APIs (window, localStorage)

**Migration Path**: Not applicable - this is a new project starting with App Router

### Review Schedule

This decision should be reviewed if:
- Next.js releases a major version with breaking changes to App Router
- Significant performance issues arise that can't be resolved
- The ecosystem shifts away from this pattern (unlikely)

Current recommendation: Review in 12 months (January 2027) or when Next.js 16 is released.

---

**Last Updated**: 2026-01-09
