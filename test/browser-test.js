/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer = require('puppeteer');
const fs = require('fs');

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

async function processURLs(urls, outputFile) {
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
        fs.appendFileSync(outputFile, output + '\n');
        successCount++;
      } else {
        const output = `__Failed to process ${url}__`;
        console.log(output);
        fs.appendFileSync(outputFile, output + '\n');
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
const APP_PORT = process.env.APP_PORT || 5172;
const urls = [
  `http://localhost:${APP_PORT}/`,
  `http://localhost:${APP_PORT}/contact`,
  `http://localhost:${APP_PORT}/about`,
  `http://localhost:${APP_PORT}/signup`,
  `http://localhost:${APP_PORT}/login`
];
const outputFile = 'output.txt';

processURLs(urls, outputFile);


