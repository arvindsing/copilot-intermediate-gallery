# Code Documentation Standards

This document establishes comprehensive code documentation standards for the Photo Gallery & Portfolio application. Following these standards ensures consistency, maintainability, and clarity throughout the codebase.

## Table of Contents

- [JSDoc/TSDoc Standards](#jsdocTsdoc-standards)
- [React Component Documentation](#react-component-documentation)
- [Inline Comments](#inline-comments)
- [File Headers](#file-headers)
- [Naming Conventions](#naming-conventions)
- [Real-World Examples](#real-world-examples)

---

## JSDoc/TSDoc Standards

### Function Documentation Template

Use JSDoc/TSDoc comments for all exported functions, methods, and complex internal functions.

```typescript
/**
 * Brief description of what the function does.
 * 
 * More detailed explanation if needed, including:
 * - Special behaviors
 * - Edge cases
 * - Performance considerations
 * 
 * @param paramName - Description of the parameter
 * @param optionalParam - Description of optional parameter (optional)
 * @returns Description of the return value
 * @throws {ErrorType} When and why this error occurs
 * @example
 * ```typescript
 * const result = functionName(value);
 * ```
 */
function functionName(paramName: string, optionalParam?: number): ReturnType {
  // Implementation
}
```

### Parameter Documentation

- **Required parameters**: Describe the expected type, format, and purpose
- **Optional parameters**: Mark with `(optional)` suffix and describe default behavior
- **Complex types**: Reference the interface or type definition

```typescript
/**
 * Filters photos based on specified criteria.
 * 
 * @param photos - Array of photo objects to filter
 * @param tags - Tag names to filter by (optional)
 * @param minLikes - Minimum number of likes required (optional, defaults to 0)
 * @returns Filtered array of photos matching criteria
 */
function filterPhotos(
  photos: Photo[], 
  tags?: string[], 
  minLikes: number = 0
): Photo[] {
  // Implementation
}
```

### Return Value Documentation

Always document what the function returns, including:
- Return type
- Structure of returned objects
- Possible return values (null, undefined, empty arrays, etc.)
- Side effects (if any)

```typescript
/**
 * Fetches photo data from the mock database.
 * 
 * @param photoId - Unique identifier for the photo
 * @returns Photo object if found, null otherwise
 */
function getPhotoById(photoId: string): Photo | null {
  // Implementation
}
```

### Complex Type Documentation

Document interfaces, types, and enums with detailed descriptions:

```typescript
/**
 * Represents a photo in the gallery system.
 * 
 * @interface Photo
 * @property {string} id - Unique identifier for the photo
 * @property {string} url - URL path to the image file
 * @property {string} title - Display title for the photo
 * @property {string[]} tags - Categorization tags for filtering
 * @property {number} likes - Number of user likes
 * @property {number} downloads - Download count
 * @property {number} views - View count
 * @property {string} [photographer] - Name of the photographer (optional)
 * @property {string} [dateTaken] - Date the photo was taken in ISO format (optional)
 */
export interface Photo {
  id: string;
  url: string;
  title: string;
  tags: string[];
  likes: number;
  downloads: number;
  views: number;
  photographer?: string;
  dateTaken?: string;
}
```

---

## React Component Documentation

### Component Purpose and Description

Every React component should have a clear description of its purpose and role in the application.

```typescript
/**
 * Hero component that displays a prominent title and description section.
 * 
 * Used at the top of pages to provide context and visual hierarchy.
 * Implements responsive design with centered content and gradient background support.
 * 
 * @component
 */
```

### Props Interface Documentation

Document all props with descriptions and examples:

```typescript
/**
 * Props for the Hero component.
 * 
 * @interface HeroProps
 * @property {string} title - Main heading text displayed prominently
 * @property {string} description - Supporting text providing additional context
 */
interface HeroProps {
  /** Main heading text displayed prominently */
  title: string;
  /** Supporting text providing additional context */
  description: string;
}
```

### Component Usage Examples

Include practical usage examples showing common scenarios:

```typescript
/**
 * @example
 * Basic usage:
 * ```tsx
 * <Hero 
 *   title="Professional Photo Gallery" 
 *   description="Upload, organize, and share your photography."
 * />
 * ```
 * 
 * @example
 * With dynamic content:
 * ```tsx
 * <Hero 
 *   title={pageTitle} 
 *   description={pageDescription}
 * />
 * ```
 */
```

### Accessibility Notes

Document accessibility features and requirements:

```typescript
/**
 * @accessibility
 * - Uses semantic heading hierarchy (h2 for title)
 * - Maintains sufficient color contrast in both light and dark modes
 * - Text is fully readable at all viewport sizes
 * - No interactive elements require documentation here (informational only)
 */
```

### Performance Considerations

Document performance-related aspects:

```typescript
/**
 * @performance
 * - Renders as a Server Component by default (no client-side JavaScript)
 * - Uses CSS classes for styling (no inline styles)
 * - Minimal DOM structure for fast rendering
 * - No expensive computations or effects
 */
```

---

## Inline Comments

### When to Use Inline Comments vs JSDoc

**Use JSDoc/TSDoc for:**
- Function and component signatures
- Public APIs and exported items
- Complex type definitions
- Module-level documentation

**Use inline comments for:**
- Complex algorithms or business logic
- Non-obvious code decisions
- Workarounds for bugs or limitations
- Temporary code that needs explanation

### Comment Style Guidelines

```typescript
// Use single-line comments for brief explanations
const filteredPhotos = photos.filter(p => p.likes > 10);

/* 
 * Use multi-line comments for longer explanations
 * that span multiple lines and need more context
 */
const complexCalculation = performCalculation();

/**
 * Use JSDoc-style comments only for functions/components
 * This format triggers IntelliSense and documentation tools
 */
```

### Complex Logic Documentation

When documenting complex logic, explain the "why" not the "what":

```typescript
// ❌ Bad: Describes what the code does (obvious from reading it)
// Loop through photos and filter them
photos.filter(photo => photo.tags.includes(selectedTag));

// ✅ Good: Explains why we're doing it this way
// Filter by tag first to reduce the dataset before expensive operations
photos
  .filter(photo => photo.tags.includes(selectedTag))
  .sort(sortByDateTaken);
```

### TODO/FIXME/NOTE Conventions

Use standardized comment markers for different types of notes:

```typescript
// TODO: Add pagination support when photo count exceeds 100
// FIXME: Race condition when uploading multiple files simultaneously
// NOTE: This approach is temporary until the API endpoint is available
// HACK: Workaround for Safari-specific rendering bug
// OPTIMIZE: Consider memoization if this component re-renders frequently
```

---

## File Headers

### Module Description Format

Add a brief description at the top of each file:

```typescript
/**
 * @fileoverview Hero component for displaying page titles and descriptions.
 * @module components/ui/layout/Hero
 */
```

### Author and Date Information (Optional)

Include author and creation date for critical or complex modules:

```typescript
/**
 * @fileoverview Complex image optimization utilities.
 * @module lib/imageOptimization
 * @author Photo Gallery Team
 * @created 2026-01-09
 */
```

### Dependencies and Related Files

Document key dependencies and related files:

```typescript
/**
 * @fileoverview Photo gallery grid component with filtering.
 * @module components/gallery/GalleryGrid
 * 
 * @requires @/lib/mock-photo-data - Photo data source
 * @requires @/components/ui - Reusable UI components
 * @see @/app/gallery/page.tsx - Main usage location
 */
```

---

## Naming Conventions

### Component Naming Standards

- **React Components**: PascalCase, descriptive names
  ```typescript
  // ✅ Good
  function Hero() {}
  function FeatureCard() {}
  function GalleryGrid() {}
  
  // ❌ Bad
  function hero() {}
  function feature() {}
  function Grid() {} // Too generic
  ```

- **Component Files**: Match component name exactly
  ```
  Hero.tsx
  FeatureCard.tsx
  GalleryGrid.tsx
  ```

### Function and Variable Naming

- **Functions**: camelCase, verb-based names
  ```typescript
  function filterPhotos() {}
  function getPhotoById() {}
  function handleUploadClick() {}
  ```

- **Variables**: camelCase, descriptive nouns
  ```typescript
  const photoCount = 10;
  const selectedTags = ['nature', 'landscape'];
  const isLoading = false;
  ```

- **Constants**: SCREAMING_SNAKE_CASE for true constants
  ```typescript
  const MAX_UPLOAD_SIZE = 5242880; // 5MB
  const DEFAULT_ITEMS_PER_PAGE = 12;
  const API_BASE_URL = 'https://api.example.com';
  ```

### Type and Interface Naming

- **Interfaces**: PascalCase, descriptive names (no "I" prefix)
  ```typescript
  interface Photo {}
  interface HeroProps {}
  interface StatItem {}
  ```

- **Type Aliases**: PascalCase, descriptive names
  ```typescript
  type ColorVariant = 'blue' | 'green' | 'purple' | 'orange';
  type PhotoFilter = (photo: Photo) => boolean;
  ```

- **Generic Type Parameters**: Single uppercase letter or PascalCase
  ```typescript
  function identity<T>(arg: T): T {}
  function mapItems<TInput, TOutput>(items: TInput[]): TOutput[] {}
  ```

### File Naming Conventions

- **Component files**: PascalCase matching component name
  ```
  Hero.tsx
  FeatureCard.tsx
  SectionContainer.tsx
  ```

- **Utility files**: kebab-case with descriptive names
  ```
  mock-photo-data.ts
  image-optimization.ts
  api-helpers.ts
  ```

- **Page files**: Next.js conventions (lowercase, kebab-case)
  ```
  page.tsx
  layout.tsx
  not-found.tsx
  ```

- **Configuration files**: Standard naming
  ```
  tsconfig.json
  next.config.ts
  package.json
  ```

---

## Real-World Examples

### Example 1: Documenting the Hero Component

**File: `src/components/ui/layout/Hero.tsx`**

```typescript
/**
 * @fileoverview Hero component for displaying prominent page headers.
 * @module components/ui/layout/Hero
 */

/**
 * Props for the Hero component.
 * 
 * @interface HeroProps
 * @property {string} title - Main heading text displayed prominently
 * @property {string} description - Supporting text providing additional context
 */
interface HeroProps {
  /** Main heading text displayed prominently */
  title: string;
  /** Supporting text providing additional context */
  description: string;
}

/**
 * Hero component that displays a prominent title and description section.
 * 
 * Used at the top of pages to provide visual hierarchy and context.
 * Features responsive typography and supports dark mode through Tailwind classes.
 * 
 * @component
 * @example
 * ```tsx
 * <Hero 
 *   title="Professional Photo Gallery" 
 *   description="Upload, organize, and share your photography."
 * />
 * ```
 * 
 * @param {HeroProps} props - Component props
 * @returns {JSX.Element} Rendered hero section
 * 
 * @accessibility
 * - Uses semantic h2 heading for title
 * - Maintains WCAG AA color contrast ratios
 * - Fully responsive text sizing
 * 
 * @performance
 * - Server Component by default (no client JS)
 * - Minimal DOM structure
 * - CSS-only styling
 */
export function Hero({ title, description }: HeroProps) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
          {title}
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}
```

### Example 2: Documenting the FeatureCard Component

**File: `src/components/ui/cards/FeatureCard.tsx`**

```typescript
/**
 * @fileoverview Feature card component for highlighting application features.
 * @module components/ui/cards/FeatureCard
 */

import { LucideIcon } from "lucide-react";

/**
 * Props for the FeatureCard component.
 * 
 * @interface FeatureCardProps
 * @property {LucideIcon} icon - Lucide icon component to display
 * @property {string} title - Feature title/heading
 * @property {string} description - Feature description text
 * @property {string} iconColor - Tailwind color class for the icon
 */
interface FeatureCardProps {
  /** Lucide icon component to display at the top of the card */
  icon: LucideIcon;
  /** Feature title displayed below the icon */
  title: string;
  /** Descriptive text explaining the feature */
  description: string;
  /** Tailwind color class or predefined color name (e.g., 'text-blue-600', 'blue') */
  iconColor: string;
}

/**
 * Feature card component for showcasing application features and capabilities.
 * 
 * Displays an icon, title, and description in a card layout. Used primarily
 * on the homepage and feature overview pages to highlight key functionality.
 * Supports both direct Tailwind color classes and shorthand color names.
 * 
 * @component
 * @example
 * Basic usage with Tailwind class:
 * ```tsx
 * <FeatureCard
 *   icon={Upload}
 *   title="Smart Upload"
 *   description="Drag & drop with automatic optimization"
 *   iconColor="text-blue-600"
 * />
 * ```
 * 
 * @example
 * Using shorthand color name:
 * ```tsx
 * <FeatureCard
 *   icon={Eye}
 *   title="Client Proofing"
 *   description="Share galleries with clients for review"
 *   iconColor="green"
 * />
 * ```
 * 
 * @param {FeatureCardProps} props - Component props
 * @returns {JSX.Element} Rendered feature card
 * 
 * @accessibility
 * - Icon is decorative (title provides context)
 * - Color contrast meets WCAG AA standards
 * - Readable text sizing and spacing
 * 
 * @performance
 * - Server Component by default
 * - No JavaScript required for rendering
 * - Efficient icon rendering via Lucide React
 */
export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  iconColor 
}: FeatureCardProps) {
  return (
    <div className="card-feature">
      <Icon className={`h-12 w-12 mx-auto mb-4 ${
        // Map shorthand color names to predefined CSS classes
        iconColor.includes('blue') ? 'icon-blue' :
        iconColor.includes('green') ? 'icon-green' :
        iconColor.includes('purple') ? 'icon-purple' :
        iconColor.includes('orange') ? 'icon-orange' :
        iconColor.includes('red') ? 'icon-red' :
        iconColor
      }`} />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </div>
  );
}
```

### Example 3: Documenting Utility Functions

**File: `src/lib/mock-photo-data.ts`**

```typescript
/**
 * @fileoverview Mock photo data and related interfaces for development and testing.
 * @module lib/mock-photo-data
 * 
 * This module provides sample photo data to use during development before
 * connecting to a real API or database. All data is fictitious.
 */

/**
 * Represents a photo in the gallery system.
 * 
 * Contains all metadata needed to display and manage photos in the gallery,
 * including engagement metrics (likes, downloads, views) and categorization.
 * 
 * @interface Photo
 * @property {string} id - Unique identifier for the photo
 * @property {string} url - URL path to the image file (relative or absolute)
 * @property {string} title - Display title for the photo
 * @property {string[]} tags - Categorization tags for filtering and search
 * @property {number} likes - Number of user likes/favorites
 * @property {number} downloads - Total download count
 * @property {number} views - Total view count
 * @property {string} [photographer] - Name of the photographer (optional)
 * @property {string} [dateTaken] - ISO 8601 date string when photo was taken (optional)
 * 
 * @example
 * ```typescript
 * const photo: Photo = {
 *   id: '1',
 *   url: '/images/sunset.jpg',
 *   title: 'Sunset Landscape',
 *   tags: ['landscape', 'nature', 'sunset'],
 *   likes: 124,
 *   downloads: 45,
 *   views: 1205,
 *   photographer: 'John Doe',
 *   dateTaken: '2024-01-15'
 * };
 * ```
 */
export interface Photo {
  id: string;
  url: string;
  title: string;
  tags: string[];
  likes: number;
  downloads: number;
  views: number;
  photographer?: string;
  dateTaken?: string;
}

/**
 * Array of mock photo objects for development and testing.
 * 
 * Contains diverse sample data covering various photography genres
 * and metadata scenarios. Use this for testing UI components and
 * data flow before integrating with a real backend.
 * 
 * @type {Photo[]}
 * @constant
 * 
 * @example
 * ```typescript
 * // Use in a component
 * const photos = mockPhotos.slice(0, 6); // Get first 6 photos
 * ```
 * 
 * @example
 * ```typescript
 * // Filter by tag
 * const landscapes = mockPhotos.filter(p => 
 *   p.tags.includes('landscape')
 * );
 * ```
 */
export const mockPhotos: Photo[] = [
  {
    id: '1',
    url: '/placeholder-1.jpg',
    title: 'Sunset Landscape',
    tags: ['landscape', 'sunset', 'nature'],
    likes: 124,
    downloads: 45,
    views: 1205,
    photographer: 'John Doe',
    dateTaken: '2024-01-15'
  },
  // ... additional photo objects
];
```

### Example 4: Documenting TypeScript Interfaces and Types

**Advanced type documentation example:**

```typescript
/**
 * @fileoverview Type definitions for UI components and their variants.
 * @module types/ui
 */

/**
 * Supported color variants for UI components.
 * 
 * These colors align with the application's design system and have
 * corresponding CSS classes defined in globals.css.
 * 
 * @type ColorVariant
 * @readonly
 */
export type ColorVariant = 'blue' | 'green' | 'purple' | 'orange' | 'red';

/**
 * Statistical data item for dashboard displays.
 * 
 * Used in the StatsGrid component to show metrics like photo count,
 * total views, downloads, etc. Each stat includes an icon and color
 * for visual distinction.
 * 
 * @interface StatItem
 * @property {string} label - Display label for the statistic
 * @property {number | string} value - The statistic value (can be formatted string)
 * @property {LucideIcon} icon - Icon component from lucide-react
 * @property {ColorVariant} color - Color variant for styling the icon
 * 
 * @example
 * ```typescript
 * const photoCountStat: StatItem = {
 *   label: "Total Photos",
 *   value: 1234,
 *   icon: ImageIcon,
 *   color: 'blue'
 * };
 * ```
 */
export interface StatItem {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: ColorVariant;
}

/**
 * Configuration options for gallery filtering.
 * 
 * @interface FilterOptions
 * @property {string[]} [tags] - Tags to filter by (optional)
 * @property {number} [minLikes] - Minimum likes threshold (optional)
 * @property {string} [photographer] - Filter by photographer name (optional)
 * @property {string} [sortBy] - Sort field: 'date' | 'likes' | 'title' (optional)
 * @property {'asc' | 'desc'} [sortOrder] - Sort direction (optional)
 */
export interface FilterOptions {
  tags?: string[];
  minLikes?: number;
  photographer?: string;
  sortBy?: 'date' | 'likes' | 'title';
  sortOrder?: 'asc' | 'desc';
}
```

---

## Summary

Following these documentation standards ensures:

- **Consistency**: All code follows the same documentation patterns
- **Maintainability**: Future developers can quickly understand the codebase
- **Discoverability**: IDE tooling provides helpful hints and autocomplete
- **Quality**: Well-documented code encourages thoughtful design
- **Onboarding**: New team members can get up to speed quickly

### Quick Reference Checklist

- [ ] All exported functions have JSDoc comments
- [ ] All React components have purpose descriptions
- [ ] Props interfaces are fully documented
- [ ] Complex logic has explanatory inline comments
- [ ] Type definitions include usage examples
- [ ] File headers identify the module purpose
- [ ] Naming conventions are followed consistently
- [ ] Accessibility considerations are documented
- [ ] Performance notes are included where relevant

---

**Related Documentation:**
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture and design patterns
- [COMPONENT_USAGE_GUIDE.md](./COMPONENT_USAGE_GUIDE.md) - Component usage examples
- [docs/adr/](./docs/adr/) - Architecture Decision Records

**Last Updated:** 2026-01-09
