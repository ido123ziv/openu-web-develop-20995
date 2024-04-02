// Importing required modules
const express = require('express');
const path = require('path');

// Creating an Express app
const app = express();

// Define a port number
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Define routes
const indexRoute = require('./routes/index');
app.use('/', indexRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
