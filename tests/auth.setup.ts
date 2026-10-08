import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // 1. Go to the Swag Labs login page
  await page.goto('https://www.saucedemo.com/');

  // 2. Fill in credentials pulled safely from your .env file
  await page.fill('#user-name', process.env.TEST_USERNAME!);
  await page.fill('#password', process.env.TEST_PASSWORD!);
  
  // 3. Click login and wait for the inventory dashboard URL
  await page.click('#login-button');
  await page.waitForURL(/\/inventory\.html/);

  // 4. Verify the login worked by checking for the inventory container
  await expect(page.locator('.inventory_list')).toBeVisible();

  // 5. Capture cookies/tokens and save them to the JSON file template
  await page.context().storageState({ path: authFile });
});