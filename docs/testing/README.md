# Testing Strategy

## Testing Philosophy

Our testing approach is guided by these core principles:

1. **Test Behavior, Not Implementation** - Focus on what components do, not how they do it
2. **Write Tests That Resemble Usage** - Tests should interact with components the way users do
3. **Maintainability Over Coverage** - Write meaningful tests that provide value, not just to hit metrics
4. **Fast Feedback** - Tests should run quickly to enable rapid development cycles
5. **Isolated & Deterministic** - Tests should be independent and produce consistent results

## Testing Pyramid

We follow the testing pyramid approach to ensure efficient and comprehensive test coverage:

```
       /\
      /  \  E2E Tests (10%)
     /----\
    /      \  Integration Tests (30%)
   /--------\
  /          \  Unit Tests (60%)
 /____________\
```

- **Unit Tests (60%)**: Test individual components, functions, and hooks in isolation
- **Integration Tests (30%)**: Test component interactions and API integrations
- **End-to-End Tests (10%)**: Test complete user workflows across the application

## Testing Tools

### Core Testing Stack

- **[Vitest](https://vitest.dev/)** - Fast unit test runner with native ES modules support
- **[React Testing Library](https://testing-library.com/react)** - Component testing utilities
- **[Playwright](https://playwright.dev/)** - E2E browser automation
- **[MSW](https://mswjs.io/)** - API mocking for integration tests
- **[@testing-library/jest-dom](https://github.com/testing-library/jest-dom)** - Custom matchers for DOM assertions
- **[@testing-library/user-event](https://testing-library.com/docs/user-event/intro/)** - Advanced user interaction simulation

### Why These Tools?

- **Vitest**: Native TypeScript support, fast execution, compatibility with Jest API
- **React Testing Library**: Encourages best practices by testing components as users would interact with them
- **Playwright**: Cross-browser testing with powerful automation capabilities
- **MSW**: Intercepts network requests at the network level, providing realistic API mocking

## Test Types

### 1. Unit Tests

Unit tests verify individual components, functions, and hooks in isolation.

#### Component Tests

Test individual UI components for:
- Rendering with different props
- User interactions (clicks, inputs, etc.)
- Conditional rendering
- Accessibility

**Example: FeatureCard Component**

```typescript
// src/components/ui/cards/FeatureCard.test.tsx
import { render, screen } from '@testing-library/react';
import { Camera } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

describe('FeatureCard', () => {
  it('renders title and description', () => {
    render(
      <FeatureCard
        icon={Camera}
        title="Photo Upload"
        description="Upload your photos easily"
        iconColor="text-blue-600"
      />
    );

    expect(screen.getByText('Photo Upload')).toBeInTheDocument();
    expect(screen.getByText('Upload your photos easily')).toBeInTheDocument();
  });

  it('applies correct icon color class', () => {
    const { container } = render(
      <FeatureCard
        icon={Camera}
        title="Test"
        description="Test description"
        iconColor="text-blue-600"
      />
    );

    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('icon-blue');
  });
});
```

#### Utility Function Tests

Test helper functions and utilities:

```typescript
// src/lib/image-utils.test.ts
import { formatFileSize, validateImageType, calculateAspectRatio } from './image-utils';

describe('formatFileSize', () => {
  it('formats bytes to KB', () => {
    expect(formatFileSize(1024)).toBe('1.00 KB');
  });

  it('formats bytes to MB', () => {
    expect(formatFileSize(1048576)).toBe('1.00 MB');
  });

  it('formats bytes to GB', () => {
    expect(formatFileSize(1073741824)).toBe('1.00 GB');
  });

  it('handles zero bytes', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
  });
});

describe('validateImageType', () => {
  it('accepts valid image MIME types', () => {
    expect(validateImageType('image/jpeg')).toBe(true);
    expect(validateImageType('image/png')).toBe(true);
    expect(validateImageType('image/webp')).toBe(true);
  });

  it('rejects invalid MIME types', () => {
    expect(validateImageType('application/pdf')).toBe(false);
    expect(validateImageType('text/plain')).toBe(false);
  });
});
```

#### Custom Hook Tests

Test React hooks using `renderHook`:

```typescript
// src/hooks/useGalleryFilter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useGalleryFilter } from './useGalleryFilter';
import { mockPhotos } from '@/lib/mock-photo-data';

describe('useGalleryFilter', () => {
  it('initializes with all photos', () => {
    const { result } = renderHook(() => useGalleryFilter(mockPhotos));
    expect(result.current.filteredPhotos).toHaveLength(mockPhotos.length);
  });

  it('filters photos by tag', () => {
    const { result } = renderHook(() => useGalleryFilter(mockPhotos));

    act(() => {
      result.current.setTag('landscape');
    });

    const landscapePhotos = mockPhotos.filter(p => 
      p.tags.includes('landscape')
    );
    expect(result.current.filteredPhotos).toHaveLength(landscapePhotos.length);
  });

  it('sorts photos by likes', () => {
    const { result } = renderHook(() => useGalleryFilter(mockPhotos));

    act(() => {
      result.current.setSortBy('likes');
    });

    const sortedPhotos = [...mockPhotos].sort((a, b) => b.likes - a.likes);
    expect(result.current.filteredPhotos[0].likes).toBe(sortedPhotos[0].likes);
  });

  it('resets filters', () => {
    const { result } = renderHook(() => useGalleryFilter(mockPhotos));

    act(() => {
      result.current.setTag('landscape');
      result.current.setSortBy('likes');
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.filteredPhotos).toHaveLength(mockPhotos.length);
  });
});
```

### 2. Integration Tests

Integration tests verify how multiple components work together and how the application interacts with APIs.

#### Component Integration Tests

Test component composition and data flow:

```typescript
// src/components/gallery/GalleryGrid.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { GalleryGrid } from './GalleryGrid';
import { mockPhotos } from '@/lib/mock-photo-data';

describe('GalleryGrid Integration', () => {
  it('displays all photos initially', () => {
    render(<GalleryGrid photos={mockPhotos} />);
    
    mockPhotos.forEach(photo => {
      expect(screen.getByAltText(photo.title)).toBeInTheDocument();
    });
  });

  it('filters photos when tag is selected', async () => {
    render(<GalleryGrid photos={mockPhotos} />);
    
    const landscapeFilter = screen.getByRole('button', { name: /landscape/i });
    fireEvent.click(landscapeFilter);

    const landscapePhotos = mockPhotos.filter(p => 
      p.tags.includes('landscape')
    );
    
    expect(screen.getAllByRole('img')).toHaveLength(landscapePhotos.length);
  });
});
```

#### API Route Tests

Test Next.js API routes with MSW:

```typescript
// src/app/api/galleries/route.test.ts
import { GET, POST } from './route';
import { NextRequest } from 'next/server';

describe('/api/galleries', () => {
  describe('GET', () => {
    it('returns paginated galleries', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries?page=1&limit=10');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.galleries).toHaveLength(10);
      expect(data.pagination).toMatchObject({
        page: 1,
        limit: 10,
        total: expect.any(Number),
        pages: expect.any(Number),
      });
    });

    it('validates pagination parameters', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries?page=-1');
      const response = await GET(request);

      expect(response.status).toBe(400);
    });
  });

  describe('POST', () => {
    it('creates a new gallery', async () => {
      const galleryData = {
        name: 'Test Gallery',
        description: 'Test Description',
      };

      const request = new NextRequest('http://localhost:3000/api/galleries', {
        method: 'POST',
        body: JSON.stringify(galleryData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.gallery).toMatchObject(galleryData);
    });

    it('validates required fields', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it('sanitizes input to prevent XSS', async () => {
      const maliciousData = {
        name: '<script>alert("xss")</script>',
        description: 'Test',
      };

      const request = new NextRequest('http://localhost:3000/api/galleries', {
        method: 'POST',
        body: JSON.stringify(maliciousData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.gallery.name).not.toContain('<script>');
    });
  });
});
```

### 3. End-to-End Tests

E2E tests verify complete user workflows using Playwright.

#### User Journey Tests

```typescript
// e2e/gallery-workflow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Gallery Workflow', () => {
  test('user can create gallery and upload photos', async ({ page }) => {
    await page.goto('/');

    // Navigate to upload page
    await page.click('text=Upload Photos');
    await expect(page).toHaveURL('/upload');

    // Create new gallery
    await page.fill('[placeholder="Gallery Name"]', 'My Vacation Photos');
    await page.fill('[placeholder="Description"]', 'Photos from summer vacation');

    // Upload photos
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles([
      'tests/fixtures/photo1.jpg',
      'tests/fixtures/photo2.jpg',
    ]);

    // Wait for upload success
    await expect(page.locator('text=Upload successful')).toBeVisible();

    // Navigate to gallery
    await page.click('text=View Gallery');

    // Verify photos are displayed
    await expect(page.locator('img[alt*="photo"]')).toHaveCount(2);
  });

  test('user can filter and sort gallery', async ({ page }) => {
    await page.goto('/gallery');

    // Apply tag filter
    await page.click('text=Landscape');
    
    // Verify filtered results
    const photos = page.locator('[data-testid="photo-card"]');
    await expect(photos.first()).toBeVisible();

    // Apply sort
    await page.selectOption('[aria-label="Sort by"]', 'likes');

    // Verify sort order
    const firstPhoto = photos.first();
    const secondPhoto = photos.nth(1);
    
    const firstLikes = parseInt(await firstPhoto.locator('[data-testid="likes"]').textContent() || '0');
    const secondLikes = parseInt(await secondPhoto.locator('[data-testid="likes"]').textContent() || '0');
    
    expect(firstLikes).toBeGreaterThanOrEqual(secondLikes);
  });

  test('handles upload errors gracefully', async ({ page }) => {
    await page.goto('/upload');

    // Try to upload invalid file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(['tests/fixtures/document.pdf']);

    // Verify error message
    await expect(page.locator('text=Invalid file type')).toBeVisible();
  });

  test('responsive design on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/gallery');

    // Verify mobile layout
    const grid = page.locator('[data-testid="gallery-grid"]');
    await expect(grid).toBeVisible();

    // Verify photos stack vertically
    const photos = page.locator('[data-testid="photo-card"]');
    const firstPhotoBox = await photos.first().boundingBox();
    const secondPhotoBox = await photos.nth(1).boundingBox();

    expect(secondPhotoBox!.y).toBeGreaterThan(firstPhotoBox!.y + firstPhotoBox!.height);
  });
});

test.describe('Visual Regression', () => {
  test('gallery page matches snapshot', async ({ page }) => {
    await page.goto('/gallery');
    await expect(page).toHaveScreenshot('gallery-page.png');
  });

  test('dark mode renders correctly', async ({ page }) => {
    await page.goto('/gallery');
    
    // Enable dark mode
    await page.click('[aria-label="Toggle dark mode"]');
    
    await expect(page).toHaveScreenshot('gallery-page-dark.png');
  });
});
```

## Best Practices

### 1. Arrange-Act-Assert (AAA) Pattern

Structure tests clearly:

```typescript
it('increments counter on button click', () => {
  // Arrange
  render(<Counter initialValue={0} />);
  
  // Act
  fireEvent.click(screen.getByRole('button', { name: /increment/i }));
  
  // Assert
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

### 2. Query Priorities (React Testing Library)

Use queries in this order of priority:

1. **Accessible queries**: `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`
2. **Semantic queries**: `getByAltText`, `getByTitle`
3. **Test IDs**: `getByTestId` (last resort)

```typescript
// Good
const button = screen.getByRole('button', { name: /submit/i });
const input = screen.getByLabelText(/email/i);

// Avoid
const button = screen.getByTestId('submit-button');
```

### 3. Async Utilities

Use appropriate async utilities for operations that aren't immediate:

```typescript
// For elements that will appear
const element = await screen.findByText('Loaded data');

// For waiting for element to disappear
await waitFor(() => {
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});

// For user interactions
await user.click(screen.getByRole('button'));
```

### 4. Mock External Dependencies

Mock network requests, timers, and browser APIs:

```typescript
// Mock API calls with MSW
import { server } from '@/mocks/setup';
import { http, HttpResponse } from 'msw';

test('handles API error', async () => {
  server.use(
    http.get('/api/galleries', () => {
      return HttpResponse.json(
        { error: 'Server error' },
        { status: 500 }
      );
    })
  );

  render(<GalleryList />);
  
  await screen.findByText('Failed to load galleries');
});
```

### 5. Next.js Specific Testing

#### Mocking Next.js Router

```typescript
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

test('navigates on button click', () => {
  const push = vi.fn();
  vi.mocked(useRouter).mockReturnValue({ push } as any);

  render(<NavigationButton />);
  fireEvent.click(screen.getByRole('button'));

  expect(push).toHaveBeenCalledWith('/gallery');
});
```

#### Testing Server Components

For Server Components, test the data fetching logic separately:

```typescript
// Test the data fetching function
import { getGalleries } from '@/lib/api';

describe('getGalleries', () => {
  it('fetches and transforms gallery data', async () => {
    const galleries = await getGalleries();
    
    expect(galleries).toHaveLength(expect.any(Number));
    expect(galleries[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
    });
  });
});
```

### 6. Test Data Management

Use factories or builders for test data:

```typescript
// tests/factories/photo.factory.ts
export function createPhoto(overrides = {}) {
  return {
    id: Math.random().toString(),
    url: '/test-photo.jpg',
    title: 'Test Photo',
    tags: ['test'],
    likes: 0,
    downloads: 0,
    views: 0,
    ...overrides,
  };
}

// Usage
const photo = createPhoto({ likes: 100, tags: ['landscape'] });
```

## Running Tests

### Development

```bash
# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run

# Run with coverage
npm run test:coverage
```

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in debug mode
npm run test:e2e:debug

# Run specific browser
npx playwright test --project=chromium

# Run specific test file
npx playwright test e2e/gallery-workflow.spec.ts
```

### Continuous Integration

```bash
# Run all tests (CI mode)
npm run test:run && npm run test:e2e

# Generate and upload coverage
npm run test:coverage
```

## Configuration

### Vitest Configuration

See `vitest.config.ts` for the complete configuration. Key settings:

- **Environment**: jsdom for DOM testing
- **Globals**: Enabled for describe/it/expect without imports
- **Coverage**: v8 provider with 80% threshold
- **Setup**: vitest.setup.ts for global test setup

### Playwright Configuration

See `playwright.config.ts` for the complete configuration. Key settings:

- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Retries**: 2 retries in CI, 0 locally
- **Screenshots**: Captured on failure
- **Traces**: Enabled on first retry

## Coverage Requirements

### Thresholds

- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 75%
- **Statements**: 80%

### Coverage Reports

Coverage reports are generated in the `coverage/` directory:

- `coverage/index.html` - HTML report (open in browser)
- `coverage/lcov.info` - LCOV format (for CI integration)
- `coverage/coverage-final.json` - JSON format

### Viewing Coverage

```bash
# Generate and view coverage
npm run test:coverage

# Open HTML report
open coverage/index.html
```

## CI/CD Integration

### GitHub Actions

Tests run automatically on:
- Pull requests
- Pushes to main branch
- Manual workflow dispatch

See `.github/workflows/test.yml` for the complete workflow.

#### Workflow Jobs

1. **Unit Tests**
   - Runs Vitest with coverage
   - Uploads coverage to Codecov
   - Fails if coverage thresholds not met

2. **E2E Tests**
   - Runs Playwright tests on multiple browsers
   - Uploads test artifacts (screenshots, traces)
   - Generates HTML report

#### Status Checks

The following checks must pass before merging:
- Unit tests pass
- Coverage thresholds met
- E2E tests pass on all browsers
- No TypeScript errors
- Linting passes

## Debugging Tests

### Vitest

```bash
# Run specific test file
npm run test src/components/ui/cards/FeatureCard.test.tsx

# Run tests matching pattern
npm run test -- --grep="filters photos"

# Update snapshots
npm run test -- -u
```

### Playwright

```bash
# Debug mode (opens browser)
npm run test:e2e:debug

# Headed mode (see browser)
npx playwright test --headed

# Specific test
npx playwright test e2e/gallery-workflow.spec.ts:10

# Generate code
npx playwright codegen http://localhost:3000
```

### Using VS Code

Install the following extensions:
- **Vitest** - Run and debug unit tests
- **Playwright Test for VSCode** - Run and debug E2E tests

## Common Testing Patterns

### Testing Forms

```typescript
import userEvent from '@testing-library/user-event';

test('submits form with valid data', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();

  render(<GalleryForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText(/name/i), 'My Gallery');
  await user.type(screen.getByLabelText(/description/i), 'A test gallery');
  await user.click(screen.getByRole('button', { name: /submit/i }));

  expect(onSubmit).toHaveBeenCalledWith({
    name: 'My Gallery',
    description: 'A test gallery',
  });
});
```

### Testing File Uploads

```typescript
test('handles file upload', async () => {
  const user = userEvent.setup();
  const onUpload = vi.fn();

  render(<UploadZone onUpload={onUpload} />);

  const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
  const input = screen.getByLabelText(/upload/i);

  await user.upload(input, file);

  expect(onUpload).toHaveBeenCalledWith([file]);
});
```

### Testing Loading States

```typescript
test('shows loading state', async () => {
  render(<GalleryList />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  expect(screen.getByRole('list')).toBeInTheDocument();
});
```

### Testing Error States

```typescript
test('displays error message', async () => {
  server.use(
    http.get('/api/galleries', () => {
      return HttpResponse.json(
        { error: 'Failed to fetch' },
        { status: 500 }
      );
    })
  );

  render(<GalleryList />);

  await screen.findByText(/failed to load galleries/i);
});
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [MSW Documentation](https://mswjs.io/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Next.js Testing Guide](https://nextjs.org/docs/app/building-your-application/testing)

## Contributing

When adding new features:

1. Write tests first (TDD approach recommended)
2. Ensure all tests pass before committing
3. Maintain or improve code coverage
4. Update test documentation if adding new patterns
5. Run the full test suite before creating a PR

## Support

For questions or issues with testing:

1. Check this documentation first
2. Review existing test examples in the codebase
3. Consult the official documentation for each tool
4. Ask in team discussions or code reviews
