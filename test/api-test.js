/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch');

// Define URLs to test
const urls = {
    back: 'http://localhost:3000/api/hello',
    name: 'http://localhost:3000/api/hello/name',
    dbHealth: 'http://localhost:3000/api//db/health',
    dbTables: 'http://localhost:3000/api/db/tables'
};

// Function to perform HTTP GET request and check status code
async function testUrl(url) {
    try {
        const response = await fetch(url);
        if (response.status !== 200) {
            throw new Error(`Error Code: ${response.status}`);
        } else {
            console.log(`Loaded: ${url}`);
        }
    } catch (error) {
        console.error(error);
        process.exit(1); // Exit with code 1 if any error occurs
    }
}

// Perform tests for each URL
(async () => {
    for (const url of Object.values(urls)) {
        await testUrl(url);
    }
})();
