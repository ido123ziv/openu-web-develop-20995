/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch');
const fs = require('fs');

const outputFile = 'output.txt';

// Define URLs to test
const urls = {
    back: 'http://localhost:3000/hello',
    name: 'http://localhost:3000/hello/name',
    dbHealth: 'http://localhost:3000/db/health',
    dbTables: 'http://localhost:3000/db/tables',
    parents: 'http://localhost:3000/api/parents',
    allUsers: 'http://localhost:3000/api/moderator/allUsers',
    recommendations: 'http://localhost:3000/api/recommendations/',
    profileBaby: 'http://localhost:3000/api/profile/babysitter/1',
    profileParent: 'http://localhost:3000/api/profile/parent/1',
    rating: 'http://localhost:3000/api/recommendations/babysitter/rating/1'
};

// Function to perform HTTP GET request and check status code
async function testUrl(url, outputFile) {
    try {
        const response = await fetch(url);
        if (response.status !== 200) {
            const output = `**Error with: ${url} ->` +  JSON.stringify(response.json()) + ` -> Error Code: ${response.status}**`
            fs.appendFileSync(outputFile, output + '\n');
            throw new Error(`Error Code: ${response.status}`);
        } else {
            const output = `Loaded: ${url}`
            fs.appendFileSync(outputFile, output + '\n');
            console.log(output);
        }
    } catch (error) {
        console.error(error);
        process.exit(1); // Exit with code 1 if any error occurs
    }
}

// Perform tests for each URL
(async () => {
    for (const url of Object.values(urls)) {
        await testUrl(url, outputFile);
    }
})();
