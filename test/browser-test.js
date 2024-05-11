/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer = require('puppeteer');

async function getHeadingsFromURL(page, url) {
  try {
    await page.goto(url);

    // Get all <h> tags
    const headings = await page.evaluate(() => {
      const headings = [];
      const hTags = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      hTags.forEach(tag => {
        headings.push(tag.textContent.trim());
      });
      return headings;
    });

    return headings;
  } catch (error) {
    console.error(`Error while processing ${url}: ${error}`);
    return null;
  }
}

async function processURLs(urls) {
  let successCount = 0;
  let failureCount = 0;

  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    for (const url of urls) {
      const headings = await getHeadingsFromURL(page, url);
      if (headings !== null) {
        const output = `Headings from ${url}: ${headings}`;
        console.log(output);
        process.env.SUMMARY = (process.env.SUMMARY || '') + '\n' + output;
        successCount++;
      } else {
        const output = `Failed to process ${url}`;
        console.log(output);
        process.env.SUMMARY = (process.env.SUMMARY || '') + '\n' + output;
        failureCount++;
      }
    }

    if (failureCount > 0) {
      console.log(`Failed to load ${failureCount} out of ${urls.length} URLs.`);
      process.exitCode = 1; // Set exit code to 1 indicating failure
    } else {
      console.log(`All ${urls.length} URLs processed successfully.`);
    }
  } finally {
    await browser.close();
  }
}

const urls = [
  'http://localhost:5172/',
  'http://localhost:5172/contact',
  'http://localhost:5172/about',
  'http://localhost:5172/signup',
  'http://localhost:5172/login'
];

processURLs(urls);

