const fetch = require('node-fetch');
const fs = require('fs');
const APP_PORT = process.env.APP_PORT || 3000;


const outputFile = "output.txt";
const postUrlsMap = {

    contact: `http://localhost:${APP_PORT}/contact`,
    login: `http://localhost:${APP_PORT}/login`,
    signupBabysitter: `http://localhost:${APP_PORT}/signup/babysitters`,
    signupParent: `http://localhost:${APP_PORT}/signup/parents`,
    recommendationText: `http://localhost:${APP_PORT}/api/recommendations/:id`
};

const putUrlsMap = {
    signupBabysitter: `http://localhost:${APP_PORT}/api/profile/babysitter/update/:id`,
    signupParent: `http://localhost:${APP_PORT}/api/profile/parent/update/:id`,
    deleteBabysitter: `http://localhost:${APP_PORT}/api/delete/babysitter/:id`,
    deleteParent: `http://localhost:${APP_PORT}/api/delete/parent/:id`,
    moderatorRequest: `http://localhost:${APP_PORT}/api/moderator/editContactRequestStatus/:id`
}

const openBugs = {
  PUT: {},
  POST: {
    testInValidRequest: ["recommendationText"],
  },
};
const badIds = [-1, "@", "]", 77777, 0];
const badAttributes = ["email", "id", "name"];

const schemas = {
  contact: {
    name: "string",
    email: "email",
    title: "string",
    message: "string",
  },
  recommendationText: {
    babysitterId: "number",
    parentId: "number",
    rating: "number",
    recommendationText: "string",
  },
  login: {
    email: "email",
    password: "string",
  },
  signupParent: {
    name: "string",
    email: "email",
    password: "string",
    city: "Holon",
    street: "Ben Yehuda",
    gender: "string",
    phoneNumber: "string",
    minKidAge: "number",
    maxKidAge: "number",
    numOfKids: "number",
    imageString: "string",
    comments: "string",
    },
  signupBabysitter: {
    name: "string",
    email: "email",
    password: "string",
    city: "Holon",
    street: "Sokolov",
    experience: "mid",
    age: "number",
    phoneNumber: "string",
    gender: "female",
    imageString: "string",
    comments: "string",
  },
  // deleteBabysitter: {},
  // deleteParent: {},
  // moderatorRequest: {
  //     "status": "done"
  // }
};

async function getBabysitterCount() {
  const responseParents = await fetch(
    `http://localhost:${APP_PORT}/api/parents/countParents`
  );
  const responseBaby = await fetch(
    `http://localhost:${APP_PORT}/api/babysitter/countBabysitters`
  );
  const parents = await responseParents.json();
  const babysitters = await responseBaby.json();
  const result = {
    babysitters: babysitters.babysittersCount,
    parents: parents.parentCount,
  };
  console.log(JSON.stringify(result));
  return result;
}
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getGoodInputs(schema, min, max) {
  const parsedData = {};
  for (const [key, type] of Object.entries(schema)) {
    if (type === "string") parsedData[key] = generateRandomString(12);
    else if (type === "number")
      parsedData[key] = Math.floor(Math.random() * (max - min + 1) + min);
    else if (type === "email")
      parsedData[key] = `${generateRandomString(8)}@${generateRandomString(
        6
      )}.com`;
    else parsedData[key] = type;
    if (key === "rating") parsedData[key] = 4;
  }
  return parsedData;
}

function getBadId() {
  return badIds[Math.floor(Math.random() * badIds.length)];
}

function getBadInputs(schema, attribute, min, max) {
  const parsedData = getGoodInputs(schema, min, max);
  for (const [key, type] of Object.entries(schema)) {
    if (type === "email" && attribute === "email")
      parsedData[key] = "notAnEmail.";
    if (key.includes("Id") && attribute === "id") parsedData[key] = getBadId();
    if (key.includes("name") && attribute === "name") parsedData[key] = 11;
    if (attribute === "id" && !key.includes("Id"))
      parsedData[key] = ".............";
  }
  return parsedData;
}

async function sendData(url, data, method, plan) {
  if (!url) throw new Error(`URL for key "${url}" not found`);
  console.log(
    `testing: ${url}, with: ${JSON.stringify(
      data
    )}, method: ${method} and the plan is to ${plan}\n`
  );
  try {
    if (url.includes("login") && plan === "success") {
      data = {
        email: "ido@test.com",
        password: "1234",
      };
    }

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseJson = await response.text();
    if (plan === "fail") {
      if (response.ok) {
        const output = `Validation error! 
                    check: ${url},
                    data: ${JSON.stringify(data)},
                    status: ${response.status}\n
                    result: ${responseJson}`;
        console.error(output);
        fs.appendFileSync(outputFile, output + "\n");
      } else if (response.status > 499) {
        const output = `Server 5XX error! 
                    see api logs!!!!!!!!!!!
                    check: ${url},
                    data: ${JSON.stringify(data)},
                    status: ${response.status}\n
                    result: ${responseJson}`;
        console.error(output);
        fs.appendFileSync(outputFile, output + "\n");
      } else console.log(`Nice handle for ${url}!\n`);
    } else if (!response.ok) {
      const output = `HTTP error! 
                    check: ${url},
                    data: ${JSON.stringify(data)},
                    status: ${response.status}\n
                    result: ${responseJson}`;
      console.error(output);
      fs.appendFileSync(outputFile, output + "\n");
    } else {
      console.log(`Nice handle for ${url}!\n`);
    }
    if (responseJson.length > 0) {
      return responseJson;
    }
    return response.status;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
function exitOnError(msg) {
  console.error(msg);
  process.exit(1);
}
async function testValidRequests(urlMap, method, id, min, max) {
  for (const [key, schema] of Object.entries(schemas)) {
    try {
      let url = urlMap[key];
      if (url) {
        if (
          openBugs.hasOwnProperty(method) &&
          openBugs[method].hasOwnProperty("testValidRequests")
        ) {
          console.log(
            `method: ${method}, openBusg: ${JSON.stringify(
              openBugs[method]
            )} idoooooo`
          );
          if (openBugs[method].testValidRequests.includes(key)) break;
        }

        if (url.includes(":id")) url = url.replace(":id", id);
        let response = await sendData(
          url,
          getGoodInputs(schema, min, max),
          method,
          "success"
        );
        console.log(`${key} Response:`, response);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
async function testInValidRequest(urlMap, method, id, min, max) {
  for (const [key, schema] of Object.entries(schemas)) {
    for (const attribute of badAttributes) {
      try {
        let url = urlMap[key];
        if (url) {
          if (
            openBugs.hasOwnProperty(method) &&
            openBugs[method].hasOwnProperty("testInValidRequest")
          ) {
            console.log(
              `method: ${method}, openBusg: ${JSON.stringify(openBugs[method])}`
            );
            if (openBugs[method].testInValidRequest.includes(key)) break;
          }
          if (url.includes(":id")) url = url.replace(":id", id);
          let response = await sendData(
            url,
            getBadInputs(schema, attribute, min, max),
            method,
            "fail"
          );
          console.log(`${key} with bad ${attribute} Response:`, response);
        }
      } catch (error) {
        console.error(error);
        // exitOnError(`${key} with bad ${attribute} Error ${method}`)
      }
    }
  }
}
async function testInValidIdsRequest(urlMap, method, min, max) {
  for (const [key, schema] of Object.entries(schemas)) {
    for (const attribute of badAttributes) {
      try {
        let url = urlMap[key];
        for (const badId of badIds) {
          if (url) {
            if (url.includes(":id")) url = url.replace(":id", badId);
            const response = await sendData(
              url,
              getBadInputs(schema, attribute, min, max),
              method,
              "fail"
            );
            console.log(`${key} with bad ${attribute} Response:`, response);
          }
        }
      } catch (error) {
        console.error(error);
        // exitOnError(`${key} with bad ${attribute} Error ${method}`)
      }
    }
  }
}

(async () => {
  const usersCount = await getBabysitterCount();
  const min = 1;
  const max = Math.max(usersCount.babysitters, usersCount.parents);
  console.log(`max: ${max}, min: ${min}`);
  console.log("--Testing Valid Requests--\n");
  await testValidRequests(
    postUrlsMap,
    "POST",
    getRandomNumber(min, max),
    min,
    max
  );
  await testValidRequests(
    putUrlsMap,
    "PUT",
    getRandomNumber(min, max),
    min,
    max
  );

  console.log("--Testing Invalid Requests--\n");
  await testInValidRequest(
    postUrlsMap,
    "POST",
    getRandomNumber(min, max),
    min,
    max
  );
  await testInValidRequest(
    putUrlsMap,
    "PUT",
    getRandomNumber(min, max),
    min,
    max
  );
  console.log("--Testing Invalid Ids Requests--\n");
  await testInValidIdsRequest(postUrlsMap, "POST", min, max);
  await testInValidIdsRequest(putUrlsMap, "PUT", min, max);

  if (fs.existsSync(outputFile)) {
    if (fs.readFileSync(outputFile).length === 0)
      exitOnError(`Found Errors. please see ${outputFile} for more.`);
  }
})();
