/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require("node-fetch");
const fs = require("fs");
const APP_PORT = process.env.APP_PORT || 3000;
const outputFile = "output.txt";
const badInputs = ["a", "@", "[", "1c"];
const numericInputs = [-1, 7777, 0];
// Define URLs to test
const urls = {
  name: `http://localhost:${APP_PORT}/hello/name`,
  dbHealth: `http://localhost:${APP_PORT}/db/health`,
  dbTables: `http://localhost:${APP_PORT}/db/tables`,
  awsHealth: `http://localhost:${APP_PORT}/aws/health`,
  parents: `http://localhost:${APP_PORT}/api/parents/allBabysitters`,
  allUsers: `http://localhost:${APP_PORT}/api/moderator/allUsers`,
  recommendations: `http://localhost:${APP_PORT}/api/recommendations/`,
  profileBaby: `http://localhost:${APP_PORT}/api/profile/babysitter/:id`,
  profileParent: `http://localhost:${APP_PORT}/api/profile/parent/:id`,
  rating: `http://localhost:${APP_PORT}/api/recommendations/babysitter/rating/:id`,
  allContactRequests: `http://localhost:${APP_PORT}/api/moderator/allContactRequests`,
  babySitterImage: `http://localhost:${APP_PORT}/api/babysitter/image/:id`,
  getInteraction: `http://localhost:${APP_PORT}/api/babysitter/interactions/:id`,
  getAllPendingUsers: `http://localhost:${APP_PORT}/api/moderator/pending/`
};

const inputUrls = {
  babysitters: `http://localhost:${APP_PORT}/api/babysitter/:id`,
  parentProfile: `http://localhost:${APP_PORT}/api/profile/parent/:id`,
  babysitterProfile: `http://localhost:${APP_PORT}/api/profile/babysitter/:id`,
  babysitterRecommendation:
    `http://localhost:${APP_PORT}/api/recommendations/babysitter/:id`,
  parentRecommendation: `http://localhost:${APP_PORT}/api/recommendations/parent/:id`,
  RecommendationStart:
    `http://localhost:${APP_PORT}/api/recommendations/parent/1/babysitter/:id`,
  RecommendationEnd:
    `http://localhost:${APP_PORT}/api/recommendations/parent/:id/babysitter/1`,
  RecommendationBoth:
    `http://localhost:${APP_PORT}/api/recommendations/parent/:id/babysitter/:id`,
  profileBaby: `http://localhost:${APP_PORT}/api/profile/babysitter/:id`,
  profileParent: `http://localhost:${APP_PORT}/api/profile/parent/:id`,
  babysitters: `http://localhost:${APP_PORT}/api/babysitter/:id`,
  parentProfile: `http://localhost:${APP_PORT}/api/profile/parent/:id`,
  babysitterProfile: `http://localhost:${APP_PORT}/api/profile/babysitter/:id`,
  babysitterRecommendation:
    `http://localhost:${APP_PORT}/api/recommendations/babysitter/:id`,
  parentRecommendation: `http://localhost:${APP_PORT}/api/recommendations/parent/:id`,
  RecommendationStart:
    `http://localhost:${APP_PORT}/api/recommendations/parent/1/babysitter/:id`,
  RecommendationEnd:
    `http://localhost:${APP_PORT}/api/recommendations/parent/:id/babysitter/1`,
  RecommendationBoth:
    `http://localhost:${APP_PORT}/api/recommendations/parent/:id/babysitter/:id`,
  profileBaby: `http://localhost:${APP_PORT}/api/profile/babysitter/:id`,
  profileParent: `http://localhost:${APP_PORT}/api/profile/parent/:id`,
};

// Function to perform HTTP GET request and check status code
async function testUrl(url, outputFile) {
  try {
    const response = await fetch(url);
    if (response.status > 299) {
      const output =
        `**Error with: ${url} ->` +
        JSON.stringify(response.json()) +
        ` -> Error Code: ${response.status}**`;
      fs.appendFileSync(outputFile, output + "\n");
      throw new Error(`Error Code: ${response.status}`);
    } else {
      const output = `Loaded: ${url}`;
      fs.appendFileSync(outputFile, output + "\n");
      console.log(output);
    }
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit with code 1 if any error occurs
  }
}

async function testApiBadInput(url, outputFile) {
  console.log(`Testing ${url}`);
  try {
    const response = await fetch(url);
    if (response.status < 399) {
      const text = await response.text();
      console.log(text);
      const output = `**Error with: ${url} -> missed bad input ${text} -> Error Code: ${response.status}**`;
      fs.appendFileSync(outputFile, output + "\n");
      throw new Error(`${url} -> Status Code: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit with code 1 if any error occurs
  }
}

// Perform tests for each URL
(async () => {
  console.log("--Testing Valid Requests--");
  for (const url of Object.values(urls)) {
    await testUrl(url.replace(":id", "1"), outputFile);
  }
  console.log("--Finished with valid, playing with inputs--");
  for (const url of Object.values(inputUrls)) {
    await Promise.all(
      badInputs.map(async (input) => {
        await testApiBadInput(url.replace(":id", input), outputFile);
      })
    );
  }
  console.log("--Finished with non numeric, playing with numbers--");
  for (const url of Object.values(inputUrls)) {
    if (!url.includes("/api/babysitter/")) {
      await Promise.all(
        numericInputs.map(async (input) => {
          await testApiBadInput(url.replace(":id", input), outputFile);
        })
      );
    }
  }
})();
