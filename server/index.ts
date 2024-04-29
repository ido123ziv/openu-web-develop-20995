// Importing required modules
import express from "express";
import path from "path";
import bodyParser from "body-parser";

import router from "./routes/indexRoutes";
import loginRouter from "./routes/login/loginRoutes";

// Creating an Express app
const app = express();

// Define a port number
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../client")));

// Middlewares Setup
app.use(bodyParser.json());

console.log(process.env.DATABASE_URL);
console.log(process.env.DATABASE_USERNAME, process.env.DATABASE_NAME);
console.log(process.env.DATABASE_PASSWORD);
console.log(process.env.DATABASE_PORT);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Define routes
app.use("/api", loginRouter);
app.use("/", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
