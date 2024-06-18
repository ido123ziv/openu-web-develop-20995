// Importing required modules
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';

import router from "./routes/indexRoutes";
import parentsRouter from "./routes/api/parents/parentsRoutes";
import moderatorRouter from "./routes/api/moderator/moderatorRoutes";
import loginRouter from "./routes/login/loginRoutes";
import headerSetup from "./middlewares/headerSetup";
import securitySetup from "./middlewares/security";
import signupRouter from "./routes/signup/signupRoutes";
import recommendationsRouter from "./routes/api/recommendations/recommendationsRoutes";
import deleteRouter from "./routes/api/delete/deleteUserRoutes";
import profileRouter from "./routes/api/profile/profileRoutes";
import babysitterRouter from "./routes/api/babysitter/babysitterRoutes";
import contactRouter from "./routes/contact/contactRoutes";

// Creating an Express app
const app = express();

// Define a port number
const port = 3000;

dotenv.config({ path: `/run/secrets/server-keys` });

// Verify that the required environment variable is set
if (!process.env.LOCATION_API_KEY) {
  console.error("ERROR: LOCATION_API_KEY is not set.");
  process.exit(1); // Exit the process with an error code
}

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../client")));

// Middlewares Setup
app.use(bodyParser.json());
securitySetup(app);
headerSetup(app);

// Define routes
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/contact", contactRouter);
app.use("/api/parents", parentsRouter);
app.use("/api/recommendations", recommendationsRouter);
app.use("/api/delete", deleteRouter);
app.use("/api/moderator", moderatorRouter);
app.use("/api/profile", profileRouter);
app.use("/api/babysitter", babysitterRouter);
app.use("/", router);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
