import { test, expect } from '@playwright/test';

test('Login and add iPhone X to cart', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // Fill in login credentials and sign in
  await page.fill('#username', 'rahulshettyacademy'); // Replace with valid username
  await page.fill('#password', 'Learning@830$3mK2'); // Replace with valid password
  await page.click('#signInBtn');

  // Wait for navigation to complete after login
  await page.waitForURL(/.*angularpractice\/shop/);

  // Find and click on the iPhone X product
  const cards = await page.locator('.card');
  const cardCount = await cards.count();

  for (let i = 0; i < cardCount; i++) {
    const cardTitle = await cards.nth(i).locator('.card-title a').textContent();
    if (cardTitle && cardTitle.includes('iphone X')) {
      // Add the iPhone X to cart
      await cards.nth(i).locator('button').click();
      break;
    }
  }

  // Proceed to checkout
  await page.click('a.nav-link.btn.btn-primary');

  // Verify the product is in the cart  
  const productInCart = await page.locator('h4.media-heading').textContent();
  expect(productInCart).toContain('iphone X');
});
