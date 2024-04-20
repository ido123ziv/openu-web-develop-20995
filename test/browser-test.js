// Import Puppeteer
const puppeteer = require('puppeteer');

(async () => {
  // Launch a headless Chrome/Chromium browser
  const browser = await puppeteer.launch();
  
  // Create a new page
  const page = await browser.newPage();
  
  try {
    // Navigate to a website with options for waiting for the page to load
    await page.goto('https://example.com', {
      waitUntil: 'load', // Wait until the 'load' event completes
      timeout: 10000 // Set a timeout of 10 seconds for page load
    });

    // Take a screenshot and save it to a file
    await page.screenshot({ path: 'screenshot.png' });

    console.log('Screenshot taken and saved as screenshot.png');
  } catch (error) {
    // Handle the error if the page fails to load within the timeout
    console.error('Failed to load the page within the specified time:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();
