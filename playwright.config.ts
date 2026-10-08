import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

//Load environment variables from .env file
dotenv.config();

export default defineConfig({
  testDir: './tests',
  //timeout: 90_000,
  //expect: {
    //timeout: 30_000,
  //},
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //baseURL: 'https://the-internet.herokuapp.com',
    baseURL:'https://www.saucedemo.com/',
    //navigationTimeout: 60_000,
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
projects: [
    // Step A: Run this setup file first to log in and save the .json file
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    // Step B: Run the actual tests using the saved login state
    {
      name: 'chromium',
      use: { 
        browserName: 'chromium',
        storageState: 'playwright/.auth/user.json', // Automatically injects session cookies
      },
      dependencies: ['setup'], // Ensures 'setup' runs before tests start
    },
  ],
});
