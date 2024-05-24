const puppeteer = require('puppeteer');
const fs = require('fs');

const time = new Date().getTime()
const name = `testuser${time}`
const city = "Holon";
const street = "main";
const phoneNumber = `+${time}`;
const youngestChild="1";
const oldestChild="8";
const kidsNumber="6";
const age="16";

const comments="testing this test and making it amazing test, test test test test!!!!"

async function getTextFromURL(page, url) {
  try {
    await page.goto(url);

    // Get all <h> tags
    const headings = await page.evaluate(() => {
      const headings = [];
      const hTags = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
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


async function signUpToPage(url, email, password) {
    const browser = await puppeteer.launch({ headless: false }); // headless: false to see the browser in action
    // const browser = await puppeteer.launch(); // headless: false to see the browser in action
    const page = await browser.newPage();
  
    try {
      await page.goto(url);
      async function selectDropdownOption(dropdownSelector, optionText) {
        // Click to expand the dropdown
        await page.click(dropdownSelector);

        // Wait for the dropdown options to be visible
        await page.waitForSelector(`${dropdownSelector} .menu.transition`);

        // Select the desired option
        await page.evaluate((dropdownSelector, optionText) => {
            const options = document.querySelectorAll(`${dropdownSelector} .menu.transition > .item`);
            options.forEach(option => {
                if (option.innerText.trim() === optionText) {
                    option.click();
                }
            });
        }, dropdownSelector, optionText);
        await page.screenshot({ path: `${optionText}_dropdown.png` });

    }


      // Wait for the login form to appear
      await page.waitForSelector('input[name="email"]');
      await page.screenshot({ path: 'before-signup.png' });
      // Fill in the email and password fields
      await page.type('input[name="name"]', name);
      await page.type('input[name="email"]', email);
      await page.type('input[name="password"]', password);
      await page.type('input[name="confirmPassword"]', password);
      
      await page.type('input[name="city"]', city);
      await page.type('input[name="street"]', street);
      await page.type('input[name="phoneNumber"]', phoneNumber);
     

      if (url.includes("parent")){
        await page.screenshot({ path: 'pass.png' });
        await page.type('input[name="minKidAge"]', youngestChild);
        await page.screenshot({ path: 'kid.png' });
        await page.type('input[name="maxKidAge"]', oldestChild);
        await page.type('input[name="numOfKids"]', kidsNumber);
        
      }
      else {
        await page.type('input[name="age"]', age);

        await selectDropdownOption('div.ui.selection.dropdown', '1-3');
      }
      await page.screenshot({ path: 'pre-comment.png' });

      await page.type('textarea[name="comments"]', comments);
      await page.screenshot({ path: 'details.png' });
      
      await selectDropdownOption('div.field:nth-of-type(2) .ui.selection.dropdown', 'Female'); 
      await page.waitForSelector('.ui.checkbox');
      // // Click on the checkbox
      await page.click('.ui.checkbox input[type="checkbox"]');
      await page.screenshot({ path: 'checkbox.png' });
      // Click the signup button
      if (url.includes("parent")){
      await page.click('button[type="submit"]');
      }
      else {
        await page.waitForSelector('.ui.large.button');
        await page.click('.ui.large.button');

      }
      await page.screenshot({ path: 'submit.png' });

      // Wait for navigation to complete
      await page.waitForNavigation();
      await page.screenshot({ path: 'post-signup.png' });
      // Optional: You can add code here to verify if login was successful
  
      return true; // Return true if login was successful
    } catch (error) {
      console.error('Error during signup:', error);
      return false; // Return false if login was not successful
    } finally {
      await browser.close();
    }
  }


async function loginToPage(url, email, password) {
  const browser = await puppeteer.launch({ headless: false }); // headless: false to see the browser in action
  // const browser = await puppeteer.launch(); // headless: false to see the browser in action
  const page = await browser.newPage();

  try {
    await page.goto(url);

    // Wait for the login form to appear
    await page.waitForSelector('input[name="email"]');
    await page.screenshot({ path: 'pre-login.png' });
    // Fill in the email and password fields
    await page.type('input[name="email"]', email);
    await page.type('input[name="password"]', password);

    // Click the login button
    await page.click('button[type="submit"]');

    // Wait for navigation to complete
    await page.waitForNavigation();
    await page.screenshot({ path: 'post-login.png' });
    // Optional: You can add code here to verify if login was successful
    if (url.includes("parent")){
      await page.waitForSelector('.ui.card');

      // Get all the card elements
      const cardElements = await page.$$('.ui.card');

      // Loop through each card element
      for (const cardElement of cardElements) {
        // Extract header, meta, and description text from each card
        const headerText = await cardElement.$eval('.header', header => header.textContent.trim());
        const descriptionText = await cardElement.$eval('.description', description => description.textContent.trim());

        // Print the extracted information to the console
        const output = `Header: ${headerText}\nDescription: ${descriptionText}`
        console.log(output);
        fs.appendFileSync(outputFile, output + '\n');
      }
    }
    else {
      const app = "http://localhost:5172/app/babysitter";
      const headings = await getTextFromURL(page, app);
      if (headings !== null) {
        const output = `Headings from ${app}: ${headings}`;
        console.log(output);
        fs.appendFileSync(outputFile, output + '\n');
      } else {
        const output = `__Failed to process ${app}__`;
        console.log(output);
        fs.appendFileSync(outputFile, output + '\n');

      }
    }
    return true; // Return true if login was successful
  } catch (error) {
    console.error('Error during login:', error);
    return false; // Return false if login was not successful
  } finally {
    await browser.close();
  }
}

async function test(outputFile) {
  const types = ["babysitter", "parent"];
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

const outputFile = 'output.txt';

async function runTest(outputFile) {
  try {
      const result = await test();
      console.log('Test completed successfully:', result);
  } catch (error) {
      console.error('Test encountered an error:', error);
      process.exitCode = 1;
  }
};

runTest(outputFile);