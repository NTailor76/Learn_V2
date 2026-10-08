import { test, expect } from '@playwright/test';

test.describe('Swag Labs Authenticated Tests', () => {
  
  test('should load the inventory page directly using stored session', async ({ page }) => {
    // 1. Navigate directly to the inventory page (no login required!)
    await page.goto('https://www.saucedemo.com/inventory.html');

    // 2. Verify that the inventory list is visible, proving authentication worked
    await expect(page.locator('.inventory_list')).toBeVisible();

    // 3. Verify page title or header element specific to logged-in users
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('should display product items', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Verify there are multiple items listed in the catalog
    const inventoryItems = page.locator('.inventory_item');
    await expect(inventoryItems).toHaveCount(6);
  });

});