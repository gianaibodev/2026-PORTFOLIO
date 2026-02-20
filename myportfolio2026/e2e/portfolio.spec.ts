import { test, expect } from '@playwright/test';

test.describe('Portfolio 2026 - Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should load the page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Gian Aibo | 2026 PORTFOLIO/i);
  });

  test('should display hero section', async ({ page }) => {
    // Check hero section exists
    const heroSection = page.locator('#home');
    await expect(heroSection).toBeVisible();
    
    // Check for hero content - either plain or fancy copy mode
    const heroTitle = page.getByText(/Websites that build trust|Building high-end digital experiences/i);
    await expect(heroTitle).toBeVisible();
  });

  test('should have navigation menu bar', async ({ page }) => {
    const menuBar = page.locator('[data-testid="macos-menu-bar"]').or(page.locator('nav').first());
    await expect(menuBar).toBeVisible();
  });

  test('should have CTA buttons in hero', async ({ page }) => {
    // Check for primary CTA button
    const ctaButton = page.getByRole('link', { name: /See My Work|View My Work/i });
    await expect(ctaButton).toBeVisible();
    
    // Check for secondary toggle button
    const toggleButton = page.getByRole('button', { name: /Read Technical Version|Read Simple Version/i });
    await expect(toggleButton).toBeVisible();
  });

  test('should display portfolio section', async ({ page }) => {
    const portfolioSection = page.locator('#projects');
    await expect(portfolioSection).toBeVisible();
  });

  test('should display about section', async ({ page }) => {
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
  });

  test('should display contact section', async ({ page }) => {
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
  });

  test('should have footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Hero should still be visible
    const heroSection = page.locator('#home');
    await expect(heroSection).toBeVisible();
    
    // Portfolio section should be visible
    const portfolioSection = page.locator('#projects');
    await expect(portfolioSection).toBeVisible();
  });

  test('should be responsive on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Hero should be visible
    const heroSection = page.locator('#home');
    await expect(heroSection).toBeVisible();
    
    // All sections should be visible
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('copy mode toggle should work', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: /Read Technical Version|Read Simple Version/i });
    
    // Get initial text
    const initialText = await toggleButton.textContent();
    
    // Click to toggle
    await toggleButton.click();
    
    // Wait for text to change
    await expect(toggleButton).not.toHaveText(initialText || '');
  });
});

test.describe('Portfolio 2026 - Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should navigate to projects section', async ({ page }) => {
    const projectsLink = page.getByRole('link', { name: /projects|work/i }).first();
    if (await projectsLink.isVisible().catch(() => false)) {
      await projectsLink.click();
      await expect(page.locator('#projects')).toBeInViewport();
    }
  });

  test('should navigate to about section', async ({ page }) => {
    const aboutLink = page.getByRole('link', { name: /about/i }).first();
    if (await aboutLink.isVisible().catch(() => false)) {
      await aboutLink.click();
      await expect(page.locator('#about')).toBeInViewport();
    }
  });

  test('should navigate to contact section', async ({ page }) => {
    const contactLink = page.getByRole('link', { name: /contact/i }).first();
    if (await contactLink.isVisible().catch(() => false)) {
      await contactLink.click();
      await expect(page.locator('#contact')).toBeInViewport();
    }
  });
});
