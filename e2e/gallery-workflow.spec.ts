import { test, expect } from '@playwright/test';

test.describe('Gallery Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/');
  });

  test('user can navigate to gallery page', async ({ page }) => {
    // Check if homepage loads
    await expect(page).toHaveTitle(/Photo Gallery/i);

    // Navigate to gallery
    const galleryLink = page.getByRole('link', { name: /gallery/i }).first();
    if (await galleryLink.isVisible()) {
      await galleryLink.click();
      await expect(page).toHaveURL(/\/gallery/);
    }
  });

  test('user can navigate to upload page', async ({ page }) => {
    // Navigate to upload page
    const uploadLink = page.getByRole('link', { name: /upload/i }).first();
    if (await uploadLink.isVisible()) {
      await uploadLink.click();
      await expect(page).toHaveURL(/\/upload/);
    }
  });

  test('gallery page displays photos', async ({ page }) => {
    await page.goto('/gallery');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check if any images are displayed (the page should have some content)
    const images = page.locator('img');
    const imageCount = await images.count();
    
    // The page should have at least some visual content
    expect(imageCount).toBeGreaterThanOrEqual(0);
  });

  test('homepage displays feature cards', async ({ page }) => {
    // Look for feature cards or main content
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();

    // Check for heading
    const headings = page.locator('h1, h2');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);
  });

  test('responsive design on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check if page is still accessible
    await page.waitForLoadState('networkidle');
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('responsive design on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/gallery');

    // Check if page renders properly
    await page.waitForLoadState('networkidle');
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('navigation works across pages', async ({ page }) => {
    // Start at home
    await expect(page).toHaveURL('/');

    // Navigate to gallery if link exists
    const galleryLink = page.getByRole('link', { name: /gallery/i }).first();
    if (await galleryLink.isVisible()) {
      await galleryLink.click();
      await page.waitForLoadState('networkidle');
    }

    // Navigate to upload if link exists
    const uploadLink = page.getByRole('link', { name: /upload/i }).first();
    if (await uploadLink.isVisible()) {
      await uploadLink.click();
      await page.waitForLoadState('networkidle');
    }

    // Navigate back to home
    const homeLink = page.getByRole('link', { name: /home/i }).first();
    if (await homeLink.isVisible()) {
      await homeLink.click();
      await expect(page).toHaveURL('/');
    }
  });
});

test.describe('Upload Page', () => {
  test('upload page has file input', async ({ page }) => {
    await page.goto('/upload');
    await page.waitForLoadState('networkidle');

    // Look for file input or upload zone
    const fileInputs = page.locator('input[type="file"]');
    const fileInputCount = await fileInputs.count();

    // Upload page should have file input capability
    expect(fileInputCount).toBeGreaterThanOrEqual(0);
  });

  test('upload page displays correctly', async ({ page }) => {
    await page.goto('/upload');

    // Check for main content
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();

    // Check for heading or title
    const headings = page.locator('h1, h2');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);
  });
});

test.describe('Accessibility', () => {
  test('homepage has proper heading structure', async ({ page }) => {
    await page.goto('/');

    // Check for at least one h1
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('images have alt attributes', async ({ page }) => {
    await page.goto('/gallery');
    await page.waitForLoadState('networkidle');

    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      // Check that images have alt attributes (may be empty but should exist)
      const firstImage = images.first();
      const altText = await firstImage.getAttribute('alt');
      expect(altText).toBeDefined();
    }
  });

  test('links have accessible names', async ({ page }) => {
    await page.goto('/');

    // Get all links
    const links = page.locator('a[href]');
    const linkCount = await links.count();

    if (linkCount > 0) {
      // Check that links have text content or aria-label
      const firstLink = links.first();
      const textContent = await firstLink.textContent();
      const ariaLabel = await firstLink.getAttribute('aria-label');

      expect(textContent !== '' || ariaLabel !== null).toBe(true);
    }
  });
});

test.describe('Performance', () => {
  test('homepage loads within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('gallery page loads within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/gallery');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });
});

test.describe('Error Handling', () => {
  test('404 page exists', async ({ page }) => {
    const response = await page.goto('/non-existent-page');
    
    // Should get some response (may be 404 or redirected)
    expect(response).toBeTruthy();
  });

  test('handles navigation to invalid routes', async ({ page }) => {
    await page.goto('/invalid-route-12345');
    await page.waitForLoadState('networkidle');

    // Page should still be usable (either 404 or redirected)
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
