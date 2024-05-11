/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch');

// Define URLs to test
const urls = {
    back: 'http://localhost:3000/hello',
    name: 'http://localhost:3000/hello/name',
    dbHealth: 'http://localhost:3000/db/health',
    dbTables: 'http://localhost:3000/db/tables',
    parents: 'http://localhost:3000/api/parents',
    recommendations: 'http://localhost:3000/api/recommendations/'
};

// Function to perform HTTP GET request and check status code
async function testUrl(url) {
    try {
        const response = await fetch(url);
        if (response.status !== 200) {
            const output = JSON.stringify(response.json())
            process.env.SUMMARY = (process.env.SUMMARY || '') + '\n' + output;
            throw new Error(`Error Code: ${response.status}`);
        } else {
            const output = `Loaded: ${url}`
            process.env.SUMMARY = (process.env.SUMMARY || '') + '\n' + output;
            console.log(output);
        }
    } catch (error) {
        console.error(error);
        process.exit(1); // Exit with code 1 if any error occurs
    }
}
console.log(process.env.SUMMARY);

// Perform tests for each URL
(async () => {
    for (const url of Object.values(urls)) {
        await testUrl(url);
    }
})();
