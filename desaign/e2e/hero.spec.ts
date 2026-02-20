import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display the hero headline', async ({ page }) => {
    // Check for the headline text
    await expect(page.getByText('NEW ERA')).toBeVisible();
    await expect(page.getByText('OF DESIGN')).toBeVisible();
    await expect(page.getByText('STARTS NOW')).toBeVisible();
  });

  test('should have a background video', async ({ page }) => {
    const video = page.locator('video');
    await expect(video).toBeVisible();
    
    // Check video attributes
    await expect(video).toHaveAttribute('autoplay', '');
    await expect(video).toHaveAttribute('loop', '');
    await expect(video).toHaveAttribute('muted', '');
  });

  test('should have a working CTA button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'GET STARTED', exact: true });
    await expect(button).toBeVisible();
    
    // Check button styling
    await expect(button).toHaveCSS('width', '184px');
    await expect(button).toHaveCSS('height', '65px');
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByText('NEW ERA')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.getByText('NEW ERA')).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should load the page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/des\(ai\)gn/i);
  });
});
