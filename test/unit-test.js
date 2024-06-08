const fetch = require('node-fetch');

const postUrlsMap = {
    contact: "http://localhost:3000/contact",
    login: "http://localhost:3000/login",
    signupBabysitter: "http://localhost:3000/signup/babysitter",
    signupParent: "http://localhost:3000/signup/parent",
    recommendationText: "http://localhost:3000/api/recommendations/:id"
};
const putUrlsMap = {
    signupBabysitter: "http://localhost:3000/api/profile/babysitter/update/:id",
    signupParent: "http://localhost:3000/api/profile/parent/update/:id",
    deleteBabysitter: "http://localhost:3000/api/delete/babysitter/:id",
    deleteParent: "http://localhost:3000/api/delete/parent/:id"
}

const badIds = [-1, "@", ']', 77777, 0];
const badAttributes = ['email', 'id', 'name'];

const schemas = {
    contact: {
        name: "string",
        email: "email",
        title: "string",
        message: "string"
    },
    recommendationText: {
        babysitterId: "number",
        parentId: "number",
        rating: "number",
        recommendationText: "string"
    },
    login: {
        email: "email",
        password: "string"
    },
    signupParent: {
        name: "string",
        email: "string",
        password: "string",
        city: "string",
        street: "string",
        gender: "string",
        phoneNumber: "string",
        minKidAge: "number",
        maxKidAge: "number",
        numOfKids: "number",
        comments: "string"
    },
    signupBabysitter: {
        name: "string",
        email: "string",
        password: "string",
        city: "string",
        street: "string",
        experience: "string",
        age: "number",
        phoneNumber: "string",
        gender: "string",
        comments: "string"
    }
};

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function getGoodInputs(schema) {
    const min = 1; 
    const max = 7;
    const parsedData = {};
    for (const [key, type] of Object.entries(schema)) {
        if (type === "string") parsedData[key] = generateRandomString(12);
        if (type === "number") parsedData[key] = Math.floor(Math.random() *(max - min + 1) + min);
        if (type === "email") parsedData[key] = `${generateRandomString(8)}@${generateRandomString(6)}.com`;
    }
    return parsedData;
}

function getBadId() {
    return badIds[Math.floor(Math.random() * badIds.length)];
}

function getBadInputs(schema, attribute) {
    const parsedData = getGoodInputs(schema);
    for (const [key, type] of Object.entries(schema)) {
        if (type === "email" && attribute === "email") parsedData[key] = "notAnEmail.";
        if (key.includes("Id") && attribute === "id") parsedData[key] = getBadId();
        if (key.includes("name") && attribute === "name") parsedData[key] = 11;
    }
    return parsedData;
}

async function sendData(url, data, method, plan) {
    if (!url) throw new Error(`URL for key "${url}" not found`);
    console.log(`testing: ${url}, with: ${JSON.stringify(data)}, method: ${method} and the plan is to ${plan}\n`)
    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (plan === "fail"){
            if (response.ok) {
                console.error(response.statusText);
                throw new Error(`Validation error! check: ${url}, status: ${response.status}`);
            }
            else 
                console.log(`Nice handle for ${url}!\n`)
        }
        else if (!response.ok){
                console.error(response.statusText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            else{
                console.log(`Nice handle for ${url}!\n`)
            }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
function exitOnError(msg){
    console.error(msg);
    process.exit(1);
}
async function testValidRequests(urlMap, method, id){
    for (const [key, schema] of Object.entries(schemas)) {
        try {
            let url = urlMap[key];
            if (url.includes(":id")) url = url.replace(":id", id);
            const response = await sendData(url, getGoodInputs(schema), method, "success");
            console.log(`${key} Response:`, response);
        } catch (error) {
            console.error(error);
            exitOnError(`${key} Error in a valid ${method} request`)
        }
    }
}
async function testInValidRequest(urlMap, method, id){
    for (const [key, schema] of Object.entries(schemas)) {
        for (const attribute of badAttributes) {
            try {
                let url = urlMap[key];
                if (url.includes(":id")) url = url.replace(":id", id);
                const response = await sendData(key, getBadInputs(schema, attribute), method, "fail");
                console.log(`${key} with bad ${attribute} Response:`, response);
            } catch (error) {
                console.error( error);
                exitOnError(`${key} with bad ${attribute} Error ${method}`)
            }
        }
    }
}
async function testInValidIdsRequest(urlMap, method){
    for (const [key, schema] of Object.entries(schemas)) {
        for (const attribute of badAttributes) {
            try {
                let url = urlMap[key];
                for (const badId of badIds) {
                if (url.includes(":id")) url = url.replace(":id", badId);
                const response = await sendData(key, getBadInputs(schema, attribute), method, "fail");
                console.log(`${key} with bad ${attribute} Response:`, response);
                }
            } catch (error) {
                console.error( error);
                exitOnError(`${key} with bad ${attribute} Error ${method}`)
            }
        }
    }
}

(async () => {
    console.log("--Testing Valid Requests--\n");
    await testValidRequests(postUrlsMap,'POST',1);
    await testValidRequests(putUrlsMap,'PUT',2);

    console.log("--Testing Invalid Requests--\n");
    await testInValidRequest(postUrlsMap, 'POST', 1);
    await testInValidRequest(putUrlsMap, 'PUT', 2);
    console.log("--Testing Invalid Ids Requests--\n");
    await testInValidIdsRequest(postUrlsMap, 'POST');
    await testInValidIdsRequest(putUrlsMap, 'PUT');


})();
