# 3. Use TypeScript for Type Safety

**Date:** 2024-01-08

## Status

Accepted

## Context

When starting the photo gallery project, we needed to decide on the primary programming language for our codebase. Modern web applications can be built with JavaScript or TypeScript, each with distinct trade-offs.

Our requirements included:
- Robust codebase that scales with team growth
- Early detection of bugs and type-related errors
- Excellent IDE support with autocomplete and inline documentation
- Maintainability over the long term (2+ years)
- Good developer experience
- Integration with React, Next.js, and our chosen libraries

The language choice affects every file we write and has significant impact on development velocity, bug frequency, and onboarding of new developers.

## Decision

We will use **TypeScript** for all source code in the application, with strict type checking enabled.

**Configuration:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "jsx": "preserve"
  }
}
```

**Key policies:**
1. All `.tsx` and `.ts` files must use TypeScript (no `.jsx` or `.js` in `src/`)
2. Strict mode enabled for maximum type safety
3. Explicit types for function parameters and return values
4. Use interfaces for component props and data models
5. Avoid `any` type; use `unknown` if type is truly unknown
6. Leverage TypeScript utility types (`Partial`, `Pick`, `Omit`, etc.)

## Consequences

### Positive Consequences

- **Early Error Detection:** Type errors caught at compile time, not runtime
- **Better IDE Support:** Excellent autocomplete, inline documentation, and refactoring tools
- **Self-Documenting Code:** Types serve as inline documentation for functions and components
- **Safer Refactoring:** TypeScript catches breaking changes when refactoring
- **Improved Collaboration:** Clear interfaces and types make code easier to understand
- **Reduced Bugs:** Studies show 15-20% reduction in bugs with TypeScript
- **Better Tooling:** Superior debugging, navigation, and code analysis
- **React Integration:** Excellent support for React components and props
- **Library Support:** Most modern libraries include TypeScript definitions
- **Confidence in Changes:** Type system provides safety net for modifications

### Negative Consequences

- **Initial Learning Curve:** Developers unfamiliar with TypeScript need time to learn
- **More Verbose Code:** Type annotations add lines of code
- **Build Step Required:** TypeScript must be compiled to JavaScript
- **Occasional Complexity:** Advanced types can be difficult to understand
- **Library Type Issues:** Some libraries have incomplete or incorrect type definitions
- **Development Overhead:** Writing types takes additional time initially
- **Type Gymnastics:** Sometimes need complex type manipulations to satisfy compiler

### Neutral Consequences

- **Compilation Time:** TypeScript compilation adds to build time (minimal with modern tools)
- **Configuration:** Requires `tsconfig.json` configuration file
- **Type Maintenance:** Types need to be updated when APIs change
- **Team Buy-in:** Requires team commitment to writing typed code

## Alternatives Considered

### Alternative 1: JavaScript with JSDoc

**Description:** Use plain JavaScript with JSDoc comments for type annotations

```javascript
/**
 * @param {Photo[]} photos
 * @param {string[]} tags
 * @returns {Photo[]}
 */
function filterPhotos(photos, tags) {
  // Implementation
}
```

**Pros:**
- No compilation step required
- Lower barrier to entry for beginners
- Can be adopted gradually
- Still provides some IDE support
- No additional build tooling

**Cons:**
- Type checking is optional and less rigorous
- JSDoc syntax is verbose and harder to read
- No compile-time type errors (only in IDE)
- Poor support for complex types
- Types are in comments, can get out of sync with code
- Less developer adoption compared to TypeScript
- Harder to enforce type safety across team

**Reason for rejection:** JSDoc provides some type safety benefits but lacks the rigor and tooling of TypeScript. The verbosity of JSDoc comments makes code harder to read, and the lack of compile-time enforcement means type errors can slip through.

### Alternative 2: Flow

**Description:** Use Flow, Facebook's type checker for JavaScript

```javascript
// @flow
function filterPhotos(photos: Photo[], tags: string[]): Photo[] {
  // Implementation
}
```

**Pros:**
- Similar syntax to TypeScript
- Compile-time type checking
- Good IDE support
- Gradual adoption possible

**Cons:**
- Smaller community than TypeScript
- Less active development
- Fewer library type definitions
- Worse tooling and IDE integration
- Facebook is moving away from Flow
- Limited adoption in industry
- Harder to find developers with Flow experience

**Reason for rejection:** Flow is declining in popularity while TypeScript is growing. The smaller ecosystem, weaker tooling, and uncertainty about long-term support make Flow a risky choice. TypeScript has won the type system competition.

### Alternative 3: Plain JavaScript

**Description:** Use JavaScript without any type checking

```javascript
function filterPhotos(photos, tags) {
  return photos.filter(photo => 
    tags.some(tag => photo.tags.includes(tag))
  );
}
```

**Pros:**
- Simplest approach, no learning curve
- No compilation step
- Maximum flexibility
- Faster initial development
- No type-related errors to fix
- Works with all JavaScript libraries

**Cons:**
- No compile-time error checking
- Bugs only discovered at runtime
- Poor IDE autocomplete and intellisense
- Harder to maintain large codebases
- Refactoring is risky without type safety
- No inline documentation from types
- Team coordination harder without explicit contracts

**Reason for rejection:** While JavaScript is simpler initially, the lack of type safety becomes a significant liability as the codebase grows. Runtime errors that could be caught at compile time waste development time and can reach production. The improved developer experience and code quality of TypeScript justify the additional complexity.

### Alternative 4: ReScript (formerly ReasonML)

**Description:** Use ReScript, a strongly-typed language that compiles to JavaScript

```rescript
let filterPhotos = (photos: array<photo>, tags: array<string>): array<photo> => {
  // Implementation
}
```

**Pros:**
- Extremely strong type system
- Fast compilation
- No runtime type errors
- Immutable by default
- Good interop with JavaScript

**Cons:**
- Completely different syntax from JavaScript
- Very steep learning curve
- Small community
- Limited library support
- Harder to hire developers
- Unfamiliar to most web developers
- Less documentation and resources

**Reason for rejection:** ReScript's strong type system is impressive, but the learning curve and small community make it impractical for our team and timeline. TypeScript provides 80% of the benefits with 20% of the learning curve.

## References

- [TypeScript Official Documentation](https://www.typescriptlang.org/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Type Safety in Next.js](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
- Research: ["To Type or Not to Type" study](https://blog.acolyer.org/2017/09/19/to-type-or-not-to-type-quantifying-detectable-bugs-in-javascript/)
- Related ADRs: [ADR-0001](./0001-use-nextjs-15-app-router.md) - Next.js App Router

## Notes

**Migration Strategy:**

For future JavaScript code or third-party integrations:
1. Allow `.js` files in `lib/` for small utilities
2. Create type definition files (`.d.ts`) for untyped dependencies
3. Use `@ts-expect-error` sparingly with comments explaining why

**Type Definition Practices:**

```typescript
// ✓ Good: Explicit interfaces for data models
interface Photo {
  id: string;
  title: string;
  tags: string[];
}

// ✓ Good: Explicit function signatures
function filterPhotos(
  photos: Photo[], 
  tags: string[]
): Photo[] {
  // Implementation
}

// ✗ Avoid: Using any
function processData(data: any) {
  // Bad: loses all type safety
}

// ✓ Better: Use unknown and narrow
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null) {
    // Type narrowing
  }
}
```

**Team Guidelines:**

1. **New developers:** Provide TypeScript learning resources and pair programming
2. **Code reviews:** Verify proper type usage and avoid `any`
3. **Documentation:** Use JSDoc comments with TypeScript types for complex functions
4. **Testing:** Write tests to complement type checking (types don't catch logic errors)

**Success Metrics:**

After 6 months, we'll evaluate:
- Number of type-related bugs caught before production
- Developer satisfaction with TypeScript
- Time spent on type-related issues vs. time saved catching bugs
- Onboarding time for new developers

---

## Metadata

- **Author(s):** Photo Gallery Team
- **Reviewers:** Engineering Team, Tech Lead
- **Last Updated:** 2024-01-08
