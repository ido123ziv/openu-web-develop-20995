// Importing required modules
import express from "express";
import path from "path";

import router from "./routes/indexRoutes";

// Creating an Express app
const app = express();

// Define a port number
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../client/public")));

// Define routes
app.use("/", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
