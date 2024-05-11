// Importing required modules
import express from "express";
import path from "path";
import bodyParser from "body-parser";

import router from "./routes/indexRoutes";
import parentsRouter from "./routes/api/parents/parentsRoutes";
import loginRouter from "./routes/login/loginRoutes";
import headerSetup from "./middlewares/headerSetup";
import securitySetup from "./middlewares/security";
import signupRouter from "./routes/signup/signupRoutes";
import recommendationsRouter from "./routes/api/recommendations/recommendationsRoutes";

// Creating an Express app
const app = express();

// Define a port number
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../client")));

// Middlewares Setup
app.use(bodyParser.json());
securitySetup(app);
headerSetup(app);

// Define routes
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/api/parents", parentsRouter);
app.use("/api/recommendations", recommendationsRouter);
app.use("/", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
