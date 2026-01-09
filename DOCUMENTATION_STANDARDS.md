# Documentation Standards

This document establishes comprehensive code documentation standards for the Photo Gallery & Portfolio application. Following these standards ensures consistency, maintainability, and ease of understanding across the codebase.

## Table of Contents

1. [TypeScript/JSDoc Standards](#typescriptjsdoc-standards)
2. [React Component Documentation](#react-component-documentation)
3. [File Headers](#file-headers)
4. [Inline Comments](#inline-comments)
5. [Naming Conventions](#naming-conventions)
6. [Documentation Structure](#documentation-structure)

---

## TypeScript/JSDoc Standards

### Function Documentation

All exported functions should include JSDoc comments describing their purpose, parameters, return values, and any relevant examples.

```typescript
/**
 * Filters photos by tags and search query
 * 
 * @param photos - Array of photo objects to filter
 * @param selectedTags - Array of tag strings to filter by
 * @param searchQuery - Search string to match against photo titles
 * @returns Filtered array of photos matching the criteria
 * 
 * @example
 * ```ts
 * const filtered = filterPhotos(
 *   mockPhotos, 
 *   ['landscape', 'sunset'], 
 *   'mountain'
 * );
 * ```
 */
export function filterPhotos(
  photos: Photo[],
  selectedTags: string[],
  searchQuery: string
): Photo[] {
  // Implementation
}
```

### Interface and Type Documentation

Document all exported interfaces and types with their purpose and property descriptions.

```typescript
/**
 * Represents a photo in the gallery with metadata and statistics
 */
export interface Photo {
  /** Unique identifier for the photo */
  id: string;
  
  /** Display title of the photo */
  title: string;
  
  /** URL or path to the photo file */
  url: string;
  
  /** Tags associated with the photo for categorization */
  tags: string[];
  
  /** Number of likes received */
  likes: number;
  
  /** Number of views */
  views: number;
  
  /** Number of downloads */
  downloads: number;
  
  /** Optional photographer name */
  photographer?: string;
}
```

### Class Documentation

Document classes with their purpose, constructor parameters, and key methods.

```typescript
/**
 * Service for managing photo uploads and processing
 * 
 * @example
 * ```ts
 * const service = new PhotoUploadService({
 *   maxSize: 10 * 1024 * 1024,
 *   allowedFormats: ['jpg', 'png', 'webp']
 * });
 * 
 * await service.uploadPhoto(file);
 * ```
 */
export class PhotoUploadService {
  /**
   * Creates a new PhotoUploadService instance
   * 
   * @param config - Configuration options for the upload service
   */
  constructor(config: UploadConfig) {
    // Implementation
  }
  
  /**
   * Uploads and processes a photo file
   * 
   * @param file - File object to upload
   * @returns Promise resolving to uploaded photo metadata
   * @throws {UploadError} When file size exceeds limit or format is invalid
   */
  async uploadPhoto(file: File): Promise<Photo> {
    // Implementation
  }
}
```

### Error Documentation

Document potential errors using `@throws` tags.

```typescript
/**
 * Validates photo file before upload
 * 
 * @param file - File to validate
 * @throws {ValidationError} When file format is not supported
 * @throws {ValidationError} When file size exceeds maximum limit
 * @throws {ValidationError} When file dimensions are invalid
 */
function validatePhotoFile(file: File): void {
  // Implementation
}
```

### Deprecated Code Documentation

Mark deprecated code with explanations and alternatives.

```typescript
/**
 * @deprecated Since version 2.0.0. Use `uploadPhotos()` instead.
 * 
 * Legacy single photo upload function
 * 
 * @param file - Photo file to upload
 */
export function uploadPhoto(file: File): Promise<Photo> {
  // Implementation
}
```

---

## React Component Documentation

### Component Documentation Template

All React components should include comprehensive documentation following this template:

```typescript
/**
 * Gallery grid component that displays photos in a responsive masonry layout
 * with filtering, pagination, and interactive actions.
 * 
 * Features:
 * - Responsive grid layout (1-3 columns based on screen size)
 * - Photo filtering by tags and search query
 * - Like/download/share actions on hover
 * - Pagination support with load more functionality
 * - Empty state handling
 * 
 * @component
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <GalleryGrid 
 *   photos={photos} 
 *   limit={6}
 * />
 * 
 * // With filtering and pagination
 * <GalleryGrid 
 *   photos={photos}
 *   limit={12}
 *   selectedTags={['landscape', 'sunset']}
 *   searchQuery="mountain"
 *   currentPage={1}
 *   onLoadMore={() => setPage(page + 1)}
 * />
 * ```
 */
export function GalleryGrid({ 
  limit = 6,
  className = "",
  onLoadMore,
  isLoading = false,
  selectedTags = [],
  searchQuery = "",
  currentPage = 1
}: GalleryGridProps) {
  // Implementation
}
```

### Props Interface Documentation

Document props interfaces with detailed property descriptions.

```typescript
/**
 * Props for the GalleryGrid component
 */
interface GalleryGridProps {
  /** Maximum number of photos to display per page */
  limit?: number;
  
  /** Additional CSS classes to apply to the container */
  className?: string;
  
  /** Callback fired when user clicks "Load More" button */
  onLoadMore?: () => void;
  
  /** Loading state indicator for async operations */
  isLoading?: boolean;
  
  /** Array of tag strings to filter photos by */
  selectedTags?: string[];
  
  /** Search query string to filter photos */
  searchQuery?: string;
  
  /** Current page number for pagination (1-indexed) */
  currentPage?: number;
}
```

### Accessibility Documentation

Document accessibility features and considerations.

```typescript
/**
 * Accessible modal dialog component
 * 
 * Accessibility features:
 * - Focus trap within modal when open
 * - ESC key closes modal
 * - ARIA labels and roles
 * - Focus returns to trigger element on close
 * - Screen reader announcements
 * 
 * @component
 */
export function Modal({ children, isOpen, onClose }: ModalProps) {
  // Implementation
}
```

### Performance Notes

Document performance considerations and optimization tips.

```typescript
/**
 * Large image grid with virtualization
 * 
 * Performance notes:
 * - Uses virtual scrolling for large datasets (>100 items)
 * - Lazy loads images using Intersection Observer
 * - Debounces scroll events (250ms)
 * - Memoizes filtered results to avoid re-computation
 * 
 * @component
 */
export function VirtualizedGallery({ photos }: Props) {
  // Implementation
}
```

---

## File Headers

### Standard File Header

Include a file header for complex or critical files:

```typescript
/**
 * @fileoverview Gallery grid component with filtering and pagination
 * @module components/gallery/GalleryGrid
 * 
 * This component provides the main photo gallery display with support for:
 * - Responsive masonry layout
 * - Tag-based filtering
 * - Search functionality
 * - Pagination and infinite scroll
 * - Interactive photo actions
 * 
 * @author Photo Gallery Team
 * @created 2024-01-15
 * @modified 2024-01-20
 */

'use client';

import { useState } from 'react';
// ... rest of imports
```

### License Information

For open-source projects, include license information:

```typescript
/**
 * @license MIT
 * Copyright (c) 2024 Photo Gallery Team
 * 
 * See LICENSE file in the project root for full license information.
 */
```

---

## Inline Comments

### When to Use Inline Comments

Use inline comments for:

1. **Complex Logic** - Explain non-obvious algorithms or business rules
2. **Performance Optimizations** - Document why code is written in a specific way
3. **Workarounds** - Explain temporary solutions or browser-specific fixes
4. **Important Decisions** - Document why a particular approach was chosen

### Complex Logic Comments

```typescript
// Filter photos based on tags using OR logic (match any tag)
// and search query using AND logic (must match title or photographer)
const filteredPhotos = mockPhotos.filter(photo => {
  const matchesTags = selectedTags.length === 0 || 
    selectedTags.some(tag => photo.tags.includes(tag.toLowerCase()));
  
  const matchesSearch = searchQuery === "" ||
    photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (photo.photographer && photo.photographer.toLowerCase().includes(searchQuery.toLowerCase()));
  
  return matchesTags && matchesSearch;
});
```

### Performance Comments

```typescript
// Use Set for O(1) lookup performance instead of Array.includes()
// Critical for large galleries with 1000+ photos
const likedPhotosSet = new Set(likedPhotoIds);

// Memoize expensive calculations to avoid re-computation on every render
const filteredPhotos = useMemo(() => {
  return filterAndSortPhotos(photos, filters);
}, [photos, filters]);
```

### TODO and FIXME Comments

Use standardized tags for tracking issues and improvements:

```typescript
// TODO: Add image lazy loading for better performance
// FIXME: Fix memory leak in photo preview modal
// HACK: Temporary workaround for Safari flexbox bug - remove when fixed
// NOTE: This approach is intentional for backwards compatibility
```

---

## Naming Conventions

### Components (PascalCase)

```typescript
// ✓ Good
export function GalleryGrid() {}
export function PhotoUploadZone() {}
export function UserProfileCard() {}

// ✗ Bad
export function galleryGrid() {}
export function photo_upload_zone() {}
export function userprofilecard() {}
```

### Functions and Variables (camelCase)

```typescript
// ✓ Good
function filterPhotos() {}
const selectedTags = [];
const isLoading = false;

// ✗ Bad
function FilterPhotos() {}
const SelectedTags = [];
const is_loading = false;
```

### Constants (UPPER_SNAKE_CASE)

```typescript
// ✓ Good
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_FORMATS = ['jpg', 'png', 'webp'];
const DEFAULT_PAGE_SIZE = 20;

// ✗ Bad
const maxFileSize = 10 * 1024 * 1024;
const allowedImageFormats = ['jpg', 'png', 'webp'];
```

### Interfaces and Types

Use PascalCase with descriptive suffixes:

```typescript
// ✓ Good - Props suffix for component props
interface GalleryGridProps {
  limit?: number;
}

// ✓ Good - State suffix for state objects
interface UploadState {
  progress: number;
  status: 'idle' | 'uploading' | 'complete';
}

// ✓ Good - Config suffix for configuration objects
interface PhotoServiceConfig {
  maxSize: number;
  apiEndpoint: string;
}

// ✓ Good - Plain descriptive name for data models
interface Photo {
  id: string;
  title: string;
}

// ✗ Avoid - "I" prefix (not TypeScript convention)
interface IPhoto {
  id: string;
}
```

### File Naming

- **Components**: PascalCase - `GalleryGrid.tsx`, `PhotoCard.tsx`
- **Utilities**: camelCase - `imageUtils.ts`, `dateFormatter.ts`
- **Types**: camelCase - `photoTypes.ts`, `apiTypes.ts`
- **Constants**: camelCase - `apiConfig.ts`, `appConstants.ts`

---

## Documentation Structure

### Utility Functions

```typescript
/**
 * Formats file size in bytes to human-readable string
 * 
 * @param bytes - File size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted size string (e.g., "1.5 MB", "256 KB")
 * 
 * @example
 * ```ts
 * formatFileSize(1536000) // Returns "1.46 MB"
 * formatFileSize(2048, 0) // Returns "2 KB"
 * ```
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}
```

### Custom Hooks

```typescript
/**
 * Custom hook for managing photo upload state and operations
 * 
 * Features:
 * - File validation
 * - Progress tracking
 * - Error handling
 * - Automatic retry on failure
 * 
 * @param config - Upload configuration options
 * @returns Upload state and control functions
 * 
 * @example
 * ```tsx
 * function UploadComponent() {
 *   const { upload, progress, error, reset } = usePhotoUpload({
 *     maxSize: 5 * 1024 * 1024,
 *     onSuccess: (photo) => console.log('Uploaded:', photo)
 *   });
 *   
 *   return (
 *     <div>
 *       <button onClick={() => upload(file)}>Upload</button>
 *       {progress > 0 && <ProgressBar value={progress} />}
 *       {error && <ErrorMessage message={error} />}
 *     </div>
 *   );
 * }
 * ```
 */
export function usePhotoUpload(config: UploadConfig) {
  // Implementation
}
```

### API Endpoints (Future)

```typescript
/**
 * Fetches paginated list of photos from the API
 * 
 * @param page - Page number (1-indexed)
 * @param limit - Number of photos per page
 * @param filters - Optional filtering criteria
 * @returns Promise resolving to paginated photo data
 * @throws {ApiError} When request fails or server returns error
 * 
 * @example
 * ```ts
 * const { photos, totalPages } = await fetchPhotos(1, 20, {
 *   tags: ['landscape'],
 *   sortBy: 'created',
 *   order: 'desc'
 * });
 * ```
 */
export async function fetchPhotos(
  page: number,
  limit: number,
  filters?: PhotoFilters
): Promise<PaginatedResponse<Photo>> {
  // Implementation
}
```

### Configuration Files

```typescript
/**
 * Application configuration
 * 
 * Contains environment-specific settings and feature flags.
 * Values are loaded from environment variables with fallbacks.
 */
export const appConfig = {
  /**
   * API base URL for backend services
   * @default 'http://localhost:3001/api'
   */
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  
  /**
   * Maximum file size for uploads in bytes (10 MB)
   */
  maxUploadSize: 10 * 1024 * 1024,
  
  /**
   * Enable development mode features
   */
  isDevelopment: process.env.NODE_ENV === 'development',
} as const;
```

### Type Definitions

```typescript
/**
 * Type definitions for photo-related data structures
 * @module types/photo
 */

/**
 * Upload status states for tracking file upload progress
 */
export type UploadStatus = 
  | 'idle'       // No upload in progress
  | 'validating' // Validating file before upload
  | 'uploading'  // Upload in progress
  | 'processing' // Server processing (optimization, thumbnail generation)
  | 'complete'   // Upload successful
  | 'error';     // Upload failed

/**
 * Photo metadata returned from the API
 */
export type PhotoMetadata = {
  /** Original file name */
  filename: string;
  
  /** File size in bytes */
  size: number;
  
  /** MIME type */
  mimeType: string;
  
  /** Image dimensions */
  dimensions: {
    width: number;
    height: number;
  };
  
  /** EXIF data if available */
  exif?: {
    camera?: string;
    lens?: string;
    iso?: number;
    aperture?: string;
    shutterSpeed?: string;
    focalLength?: string;
    dateTaken?: string;
  };
};
```

---

## Best Practices Summary

1. **Always document public APIs** - Functions, components, and interfaces exported from modules
2. **Use JSDoc tags consistently** - `@param`, `@returns`, `@throws`, `@example`, `@deprecated`
3. **Provide examples** - Include practical usage examples for complex APIs
4. **Document the "why", not the "what"** - Code should be self-explanatory; comments explain reasoning
5. **Keep documentation up-to-date** - Update docs when changing code behavior
6. **Use TypeScript types** - Let types document parameter and return value shapes
7. **Be concise but complete** - Clear and comprehensive without being verbose
8. **Follow naming conventions** - Consistent naming makes code self-documenting

---

## Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture and design patterns
- [README.md](./README.md) - Project overview and getting started guide
- [COMPONENT_USAGE_GUIDE.md](./COMPONENT_USAGE_GUIDE.md) - UI component usage examples
- [ADR Index](./docs/adr/README.md) - Architecture Decision Records
