const puppeteer = require('puppeteer');
const fs = require('fs');

const time = new Date().getTime();
const name = `testuser${time}`;
const city = "Holon";
const street = "main";
const phoneNumber = `+${time}`;
const youngestChild = "1";
const oldestChild = "8";
const kidsNumber = "6";
const age = "16";
const comments = "testing this test and making it amazing test, test test test test!!!!";

async function selectDropdownOption(page, dropdownSelector, optionText) {
  await page.click(dropdownSelector);
  await page.waitForSelector(`${dropdownSelector} .menu.transition`);
  await page.evaluate((dropdownSelector, optionText) => {
    const options = document.querySelectorAll(`${dropdownSelector} .menu.transition > .item`);
    options.forEach(option => {
      if (option.innerText.trim() === optionText) {
        option.click();
      }
    });
  }, dropdownSelector, optionText);
}

async function fillFormFields(page, fields) {
  for (const [selector, value] of Object.entries(fields)) {
    await page.type(selector, value);
  }
}

async function signUpToPage(url, email, password) {
  // const browser = await puppeteer.launch({ headless: false }); // headless: false to see the browser in action
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url);
    await page.waitForSelector('input[name="email"]');

    await fillFormFields(page, {
      'input[name="name"]': name,
      'input[name="email"]': email,
      'input[name="password"]': password,
      'input[name="confirmPassword"]': password,
      'input[name="city"]': city,
      'input[name="street"]': street,
      'input[name="phoneNumber"]': phoneNumber,
    });

    if (url.includes("parent")) {
      await fillFormFields(page, {
        'input[name="minKidAge"]': youngestChild,
        'input[name="maxKidAge"]': oldestChild,
        'input[name="numOfKids"]': kidsNumber,
      });
    } else {
      await fillFormFields(page, { 'input[name="age"]': age });
      await selectDropdownOption(page, 'div.ui.selection.dropdown', '1-3');
    }

    await page.type('textarea[name="comments"]', comments);
    await selectDropdownOption(page, 'div.field:nth-of-type(2) .ui.selection.dropdown', 'Female');
    await page.click('.ui.checkbox input[type="checkbox"]');
    if (url.includes("parent")) {
      await page.click('button[type="submit"]');
    }
    else {
      await page.waitForSelector('.ui.large.button');
      await page.click('.ui.large.button');
    }
    await page.waitForNavigation();
    return true;
  } catch (error) {
    console.error('Error during signup:', error);
    return false;
  } finally {
    await browser.close();
  }
}

async function loginToPage(url, email, password, outputFile) {
  // const browser = await puppeteer.launch({ headless: false }); // headless: false to see the browser in action
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url);
    await page.waitForSelector('input[name="email"]');

    await fillFormFields(page, {
      'input[name="email"]': email,
      'input[name="password"]': password,
    });

    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    if (email.includes("parent")) {
      await page.waitForSelector('.ui.card');
      const cardElements = await page.$$('.ui.card');

      for (const cardElement of cardElements) {
        const headerText = await cardElement.$eval('.header', header => header.textContent.trim());
        const descriptionText = await cardElement.$eval('.description', description => description.textContent.trim());
        const output = `Header: ${headerText}\nDescription: ${descriptionText}`;
        console.log(output);
        fs.appendFileSync(outputFile, output + '\n');
      }
    } else {
      const headings = await getTextFromURL(page, page.url());
      if (headings !== null) {
        const output = `Headings from ${page.url()}: ${headings}`;
        console.log(output);
        fs.appendFileSync(outputFile, output + '\n');
      } else {
        const output = `__Failed to process ${page.url()}__`;
        console.log(output);
        fs.appendFileSync(outputFile, output + '\n');
      }
    }
    return true;
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  } finally {
    await browser.close();
  }
}

async function getTextFromURL(page, url) {
  try {
    await page.goto(url);
    const headings = await page.evaluate(() => {
      const hTags = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
      return Array.from(hTags).map(tag => tag.textContent.trim());
    });
    return headings;
  } catch (error) {
    console.error(`Error while processing ${url}: ${error}`);
    return null;
  }
}

async function test(outputFile) {
  const types = ["babysitter", "parents"];
  for (const element of types) {
    const signUpSuccess = await signUpToPage(`http://localhost:5172/signup/${element}`, `${time}+${element}@test.com`, '1234');
    if (signUpSuccess) {
      console.log(`${element} signup successful!`);
    } else {
      console.log(`${element} signup failed.`);
      throw new Error("Signup Failed.");
    }

    const loginSuccess = await loginToPage('http://localhost:5172/login', `${time}+${element}@test.com`, '1234', outputFile);
    if (loginSuccess) {
      console.log(`${element} login successful!`);
    } else {
      console.log(`${element} login failed.`);
      throw new Error("Login Failed.");
    }
  }

  return true;
}

async function runTest(outputFile) {
  try {
    const result = await test(outputFile);
    console.log('Test completed successfully:', result);
  } catch (error) {
    console.error('Test encountered an error:', error);
    process.exitCode = 1;
  }
}

const outputFile = 'output.txt';
runTest(outputFile);
