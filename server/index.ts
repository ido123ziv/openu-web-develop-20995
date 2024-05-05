// Importing required modules
import express from "express";
import path from "path";

import router from "./routes/indexRoutes";
import parentsRouter from "./routes/app/parents/parentsRoutes";

// Creating an Express app
const app = express();

// Define a port number
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../client")));

// Define routes
app.use("/", router);
app.use('/api', router);
app.use("/app/parents", parentsRouter)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
