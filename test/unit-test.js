const fetch = require('node-fetch');

const postUrlsMap = {
    contact: "http://localhost:3000/contact",
    login: "http://localhost:3000/login",
    signupBabysitter: "http://localhost:3000/signup/babysitter",
    signupParent: "http://localhost:3000/signup/parent",
    recommendationText: "http://localhost:3000/api/recommendations/:id"
};
const putUrlmap = {
    signupBabysitter: "http://localhost:3000/api/profile/babysitter/update/:id",
    signupParent: "http://localhost:3000/api/profile/parent/update/:id",
    deleteBabysitter: "http://localhost:3000/api/delete/babysitter/:id",
    deleteParent: "http://localhost:3000/api/delete/parent/:id"
}

const badIds = [-1, "@", ']', 77777, 0];

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
    const parsedData = {};
    for (const [key, type] of Object.entries(schema)) {
        if (type === "string") parsedData[key] = generateRandomString(12);
        if (type === "number") parsedData[key] = Math.floor(Math.random() * 10);
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

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (plan === "fail"){
            if (response.ok) 
                throw new Error(`Validation error! check: ${url}, status: ${response.status}`);
            else 
                console.log(`Nice handle for ${url}!`)
        }
        else if (!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            else{
                console.log(`Nice handle for ${url}!`)
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
(async () => {
    console.log("--Testing Valid Requests--");
    for (const [key, schema] of Object.entries(schemas)) {
        try {
            let url = postUrlsMap[key];
            if (url.includes(":id")) url = url.replace(":id", 1);
            const response = await sendData(url, getGoodInputs(schema), 'POST', "success");
            console.log(`${key} Response:`, response);
        } catch (error) {
            console.error(error);
            exitOnError(`${key} Error in vaild post request`)
        }
    }
    for (const [key, schema] of Object.entries(schemas)) {
        try {
            let url = postUrlsMap[key];
            if (url.includes(":id")) url = url.replace(":id", 2);
            const response = await sendData(url, getGoodInputs(schema), 'PUT', "success");
            console.log(`${key} Response:`, response);
        } catch (error) {
            console.error( error);
            exitOnError(`${key} Error in vaild put request`)

        }
    }

    console.log("--Testing Invalid Requests--");
    const badAttributes = ['email', 'id', 'name'];
    for (const [key, schema] of Object.entries(schemas)) {
        for (const attribute of badAttributes) {
            try {
                let url = postUrlsMap[key];
                if (url.includes(":id")) url = url.replace(":id", 1);
                const response = await sendData(key, getBadInputs(schema, attribute), 'POST', "fail");
                console.log(`${key} with bad ${attribute} Response:`, response);
            } catch (error) {
                console.error( error);
                exitOnError(`${key} with bad ${attribute} Error POST`)
            }
        }
    }
    for (const [key, schema] of Object.entries(schemas)) {
        for (const attribute of badAttributes) {
            try {
                let url = postUrlsMap[key];
                for (const badId of badIds) {
                    if (url.includes(":id")) url = url.replace(":id", badId);
                    const response = await sendData(url, getBadInputs(schema, attribute), 'POST', "fail");
                    console.log(`${url} with bad ${attribute} Response:`, response);
                }
            } catch (error) {
                console.error( error);
                exitOnError(`${key} with bad ${attribute} Error POST bad id`)         
            }
        }
    }
    for (const [key, schema] of Object.entries(schemas)) {
        for (const attribute of badAttributes) {
            try {
                let url = putUrlsMap[key];
                for (const badId of badIds) {
                    if (url.includes(":id")) url = url.replace(":id", badId);
                    const response = await sendData(url, getBadInputs(schema, attribute), 'PUT', "fail");
                    console.log(`${url} with bad ${attribute} Response:`, response);
                }
            } catch (error) {
                console.error( error);
                exitOnError(`${key} with bad ${attribute} Error put bad id`)
            }
        }
    }
    for (const [key, schema] of Object.entries(schemas)) {
        for (const attribute of badAttributes) {
            try {
                let url = putUrlsMap[key];
                if (url.includes(":id")) url = url.replace(":id", 1);
                const response = await sendData(url, getBadInputs(schema, attribute), 'PUT', "fail");
                console.log(`${url} with bad ${attribute} Response:`, response);
            } catch (error) {
                console.error( error);
                exitOnError(`${key} with bad ${attribute} Error PUT`)
        }
        }
    }
})();
