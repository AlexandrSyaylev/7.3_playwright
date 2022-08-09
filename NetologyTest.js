const { expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { timeout } = require("./playwright.config");
const { getEmail, getPass } = require("./user");

( async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 2000,
    devtools: false
  });
  const page = await browser.newPage();

  await page.goto("https://netology.ru/?modal=sign_in", {waitUntil: 'domcontentloaded', timeout: 45000});
  await page.click('input[name="email"]');
  await page.fill('input[name="email"]', getEmail());
  await page.click('input[name="password"]');
  await page.fill('input[name="password"]', getPass());
  await page.click('button[data-testid="login-submit-btn"]');

   //assertion
  await expect(page.url()).toBe("https://netology.ru/profile");
  await expect(page.locator("h2")).toHaveText("Мои курсы и профессии");

  await browser.close();
})();
