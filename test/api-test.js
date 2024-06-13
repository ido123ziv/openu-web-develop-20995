/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require("node-fetch");
const fs = require("fs");

const outputFile = "output.txt";
const badInputs = ["a", "@", "[", "1c"];
const numericInputs = [-1, 7777, 0];
// Define URLs to test
const urls = {
  back: "http://localhost:3000/hello",
  name: "http://localhost:3000/hello/name",
  dbHealth: "http://localhost:3000/db/health",
  dbTables: "http://localhost:3000/db/tables",
  awsHealth: "http://localhost:3000/aws/health",
  parents: "http://localhost:3000/api/parents/allBabysitters",
  allUsers: "http://localhost:3000/api/moderator/allUsers",
  recommendations: "http://localhost:3000/api/recommendations/",
  profileBaby: "http://localhost:3000/api/profile/babysitter/:id",
  profileParent: "http://localhost:3000/api/profile/parent/:id",
  rating: "http://localhost:3000/api/recommendations/babysitter/rating/:id",
  allContactRequests: "http://localhost:3000/api/moderator/allContactRequests",
  babySitterImage: "http://localhost:3000/api/babysitter/image/:id"
};
const inputUrls = {
  babysitters: "http://localhost:3000/api/babysitter/:id",
  parentProfile: "http://localhost:3000/api/profile/parent/:id",
  babysitterProfile: "http://localhost:3000/api/profile/babysitter/:id",
  babysitterRecommendation:
    "http://localhost:3000/api/recommendations/babysitter/:id",
  parentRecommendation: "http://localhost:3000/api/recommendations/parent/:id",
  RecommendationStart:
    "http://localhost:3000/api/recommendations/parent/1/babysitter/:id",
  RecommendationEnd:
    "http://localhost:3000/api/recommendations/parent/:id/babysitter/1",
  RecommendationBoth:
    "http://localhost:3000/api/recommendations/parent/:id/babysitter/:id",
  profileBaby: "http://localhost:3000/api/profile/babysitter/:id",
  profileParent: "http://localhost:3000/api/profile/parent/:id",
};

// Function to perform HTTP GET request and check status code
async function testUrl(url, outputFile) {
  try {
    const response = await fetch(url);
    if (response.status !== 200) {
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
