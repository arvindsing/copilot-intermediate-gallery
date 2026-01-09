# 003. Adopt TypeScript Throughout Project

**Status**: Accepted  
**Date**: 2026-01-09

---

## Context

We need to choose whether to use TypeScript or JavaScript for the Photo Gallery & Portfolio application. This decision impacts development speed, code quality, maintainability, and how effectively GitHub Copilot can assist with development.

Key considerations:
- **Code Quality**: How to prevent type-related bugs before runtime
- **Developer Experience**: IDE support, autocomplete, and refactoring
- **Copilot Effectiveness**: How type information helps Copilot generate better code
- **Team Onboarding**: Learning curve for developers unfamiliar with TypeScript
- **Documentation**: How code self-documents through types
- **Ecosystem**: Next.js and React have excellent TypeScript support

The primary goals are:
1. Build a production-quality application with minimal bugs
2. Demonstrate best practices for Copilot demos
3. Provide excellent IDE and Copilot experience
4. Make code easy to understand and maintain

## Decision

We will **use TypeScript 5 throughout the entire project** with strict type checking enabled.

**Configuration** (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Standards**:
- All `.tsx` files for React components
- All `.ts` files for utilities and configurations
- Explicit interfaces for all component props
- Type all function parameters and return values
- Use type inference where types are obvious
- Avoid `any` type except in rare, documented cases

## Consequences

### Positive Consequences ✅

- **Type Safety Reduces Bugs**: 
  - Catch type errors at compile time, not runtime
  - Prevent null/undefined errors through strict null checks
  - Ensure props match expectations
  - Validate data structure assumptions
  
- **Better IDE Support and Autocomplete**:
  - IntelliSense shows available props, methods, and types
  - Instant feedback on type errors while coding
  - Safe refactoring with confidence
  - Go-to-definition works reliably
  
- **Excellent for Copilot Code Generation**:
  - Type information helps Copilot understand context
  - Generates more accurate code suggestions
  - Suggests correct prop names and types
  - Reduces need for manual corrections
  - Better function parameter suggestions
  
- **Self-Documenting Code**:
  - Interfaces serve as inline documentation
  - Function signatures reveal expectations
  - Props are self-explanatory
  - Reduces need for excessive comments
  
- **Easier Refactoring**:
  - Rename symbols safely across entire codebase
  - TypeScript catches all references that need updating
  - Confidence when making changes
  
- **Industry Best Practice**:
  - TypeScript is the standard for modern React applications
  - Most popular libraries have TypeScript support
  - Aligns with professional development practices
  
- **Better Error Messages**:
  - Clear error messages point to exact issues
  - Errors appear in IDE before running code
  - Easier debugging experience

### Negative Consequences ❌

- **Longer Initial Development Time**:
  - Need to define interfaces and types
  - Some learning curve for TypeScript-specific features
  - Occasional fights with type system
  
- **Learning Curve for Beginners**:
  - JavaScript developers need to learn TypeScript syntax
  - Generic types can be confusing initially
  - Advanced types (conditional, mapped) take time to master
  
- **Compilation Step Required**:
  - Cannot run `.ts` files directly (but Next.js handles this)
  - Type checking adds to build time (minimal with incremental compilation)
  
- **Verbose at Times**:
  - Some type definitions can be lengthy
  - Occasionally need type assertions or overrides
  - Complex types can reduce readability
  
- **Not All Libraries Have Great TypeScript Support**:
  - Some packages have incomplete or inaccurate type definitions
  - May need to install `@types/*` packages separately
  - Occasional need for type declarations

### Neutral Consequences 📋

- **Type Complexity Can Grow**:
  - Need to maintain type definitions alongside code
  - Complex types may need refactoring
  - Balance between type safety and simplicity
  
- **Additional Configuration**:
  - Need `tsconfig.json` configuration
  - ESLint needs TypeScript parser
  - Editor plugins for best experience

## Alternatives Considered

### Alternative 1: JavaScript with JSDoc

**Description**: Use JavaScript with JSDoc comments for type information

**Pros**:
- No compilation step (though Next.js compiles anyway)
- Familiar JavaScript syntax
- Can add types gradually
- Some IDE support through JSDoc
- Lower learning curve

**Cons**:
- JSDoc comments are verbose and harder to maintain
- Type checking is opt-in and easy to skip
- No compile-time type errors
- Weaker IDE support compared to TypeScript
- More difficult for Copilot to parse correctly
- Not standard practice for modern React apps

**Why not chosen**: JSDoc provides weak type checking compared to TypeScript. For a demo repository showcasing best practices, TypeScript is the clear choice. The additional safety and IDE experience outweigh the minimal learning curve.

### Alternative 2: PropTypes

**Description**: Use JavaScript with React PropTypes for runtime validation

**Pros**:
- Runtime prop validation
- Easy to add to existing JavaScript
- No compilation required
- Simple API

**Cons**:
- Only validates at runtime (miss errors during development)
- No IDE autocomplete or type checking
- Only works for React props, not general code
- Considered legacy approach
- Doesn't help with non-React code
- No help for Copilot code generation

**Why not chosen**: PropTypes are a legacy approach from before TypeScript became standard. They provide far less benefit than TypeScript with compile-time checking, IDE support, and Copilot integration.

### Alternative 3: TypeScript with Loose Configuration

**Description**: Use TypeScript but with permissive type checking (`strict: false`)

**Pros**:
- Easier to get started
- Fewer type errors initially
- Gradual adoption of strict typing
- Less friction with JavaScript libraries

**Cons**:
- Misses many type errors that strict mode catches
- False sense of type safety
- Allows bad practices (`any` everywhere)
- Doesn't fully leverage TypeScript benefits
- Inconsistent with TypeScript best practices

**Why not chosen**: Using TypeScript without strict mode defeats much of the purpose. For a new project, we can start with strict mode from the beginning and establish good patterns. This provides the best example for Copilot demos.

### Alternative 4: No Types (Pure JavaScript)

**Description**: Build the application entirely in JavaScript with no type system

**Pros**:
- Fastest initial development
- No learning curve
- No type errors to fix
- Simplest approach

**Cons**:
- High risk of runtime type errors
- Poor IDE support
- Difficult refactoring
- No autocomplete for props
- Hard to understand component APIs
- Copilot generates less accurate code
- Not industry best practice
- Harder to maintain as project grows

**Why not chosen**: Pure JavaScript is not suitable for a production-quality application or a best-practices demo. The lack of type safety would make the codebase harder to maintain and less valuable as a learning resource.

---

## Additional Information

### Related Decisions

- [ADR 001: Use Next.js App Router](./001-nextjs-app-router.md) - Next.js has excellent first-class TypeScript support
- [ADR 002: Create Custom Component Library](./002-component-library.md) - TypeScript interfaces make component props self-documenting

### Implementation Notes

**Component Props Pattern**:
```typescript
interface ComponentProps {
  /** Description of prop */
  requiredProp: string;
  /** Description of optional prop (optional) */
  optionalProp?: number;
}

export function Component({ requiredProp, optionalProp = 0 }: ComponentProps) {
  // Implementation
}
```

**Type Inference Usage**:
```typescript
// ✅ Good: Let TypeScript infer obvious types
const [count, setCount] = useState(0); // number inferred

// ✅ Good: Explicitly type when needed
const [user, setUser] = useState<User | null>(null);

// ❌ Avoid: Over-specification of obvious types
const message: string = "hello"; // Type is obvious
```

**Avoiding `any`**:
```typescript
// ❌ Avoid
function process(data: any) { }

// ✅ Better: Use specific types
function process(data: Photo) { }

// ✅ Better: Use generics
function process<T>(data: T) { }

// ✅ Better: Use unknown for truly unknown types
function process(data: unknown) {
  if (typeof data === 'string') {
    // TypeScript knows data is string here
  }
}
```

**File Naming**:
- React components: `.tsx` extension
- Non-React code: `.ts` extension
- Configuration files: `.ts` when possible (e.g., `next.config.ts`)

### Migration Strategy

Not applicable - this is a new project starting with TypeScript from day one.

For future additions:
1. Create new files with TypeScript from the start
2. Define interfaces for all component props
3. Type all functions
4. Use ESLint to enforce TypeScript best practices

### Review Schedule

This decision is foundational and unlikely to change. Review only if:
- TypeScript introduces breaking changes in a major version
- Framework moves away from TypeScript (highly unlikely)
- Team feedback indicates TypeScript is a significant blocker (should not occur with proper training)

Current recommendation: No scheduled review needed - TypeScript is a permanent architectural decision.

---

**Last Updated**: 2026-01-09
