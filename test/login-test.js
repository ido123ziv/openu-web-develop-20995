const puppeteer = require('puppeteer');

const time = new Date().getTime()
const name = `testuser${time}`
const city = "Holon";
const street = "main";
const phoneNumber = `+${time}`;
const youngestChild="1";
const oldestChild="8";
const kidsNumber="6";
const comments="testing this test and making it amazing test, test test test test!!!!"
async function signUpToPage(url, email, password, optionText) {
    const browser = await puppeteer.launch({ headless: false }); // headless: false to see the browser in action
    const page = await browser.newPage();
  
    try {
      await page.goto(url);
  
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
      await page.screenshot({ path: 'pass.png' });
      await page.type('input[name="minKidAge"]', youngestChild);
      await page.screenshot({ path: 'kid.png' });
      await page.type('input[name="maxKidAge"]', oldestChild);
      await page.type('input[name="numOfKids"]', kidsNumber);
      await page.screenshot({ path: 'pre-comment.png' });
      await page.type('textarea[name="comments"]', comments);
      await page.screenshot({ path: 'details.png' });
      await page.waitForSelector('.ui.selection.dropdown');
      await page.screenshot({ path: 'selection.png' });

    //   // Click on the dropdown to open it
      await page.click('.ui.selection.dropdown');
  
    //   // Wait for the dropdown menu options to appear
    //   await page.waitForSelector('.menu.transition');
  
      // Click on the option with the given text
      // await page.click(`.menu.transition .item:has(span.text:contains("Male"))`);
      await page.screenshot({ path: 'dropdown.png' });
      await page.waitForSelector('.ui.checkbox');
      // // Click on the checkbox
      await page.click('.ui.checkbox input[type="checkbox"]');
      await page.screenshot({ path: 'checkbox.png' });
      // Click the signup button
      await page.click('button[type="submit"]');
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
    await page.waitForSelector('.ui.card');

    // Get all the card elements
    const cardElements = await page.$$('.ui.card');

    // Loop through each card element
    for (const cardElement of cardElements) {
      // Extract header, meta, and description text from each card
      const headerText = await cardElement.$eval('.header', header => header.textContent.trim());
      const metaText = await cardElement.$eval('.meta', meta => meta.textContent.trim());
      const descriptionText = await cardElement.$eval('.description', description => description.textContent.trim());

      // Print the extracted information to the console
      console.log('Header:', headerText);
      console.log('Meta:', metaText);
      console.log('Description:', descriptionText);
    }
    return true; // Return true if login was successful
  } catch (error) {
    console.error('Error during login:', error);
    return false; // Return false if login was not successful
  } finally {
    await browser.close();
  }
}

async function test(){
    await signUpToPage('http://localhost:5172/signup/parents', `${time}+test@test.com`, '1234', "Male")
    .then(success => {
        if (success) {
            console.log('signup successful!');
        } else {
            console.log('signup failed.');
            process.exitCode = 1;
        }
    });
    // Example usage:
    // await loginToPage('http://localhost:5172/login', `${time}+test@test.com`, '1234')
    // .then(success => {
    //     if (success) {
    //         console.log('Login successful!');
    //     } else {
    //         console.log('Login failed.');
    //     }
    // });
    return true;

}

test().then(success => {
    if (success) {
        console.log('test successful!');
    } else {
        console.log('test failed.');
        process.exitCode = 1;
    }
});