// load dependencies
const path = require("path");
var cors = require("cors"); // Importing the CORS middleware for handling Cross-Origin Resource Sharing
var cors = require("cors"); // This is a duplicate import of the same middleware, it can be removed
const env = require("dotenv"); // Importing the dotenv package for managing environment variables
const express = require("express"); // Importing the Express.js framework for building web applications
const bodyParser = require("body-parser"); // Importing the body-parser middleware for parsing HTTP request body

// default options
const app = express(); // Creating an instance of the Express application

//Loading Routes
const assessmentRoutes = require("./routes/assesment"); // Importing the assessment routes module

app.use(cors()); // Using the CORS middleware for handling Cross-Origin Resource Sharing

//configuring the env file
env.config(); // Configuring the environment variables from the .env file

app.use(cors()); // Using the CORS middleware for handling Cross-Origin Resource Sharing

app.use(bodyParser.urlencoded({ extended: true })); // Parsing the URL-encoded HTTP request body

//this is our route for Assessments
app.use("/api", assessmentRoutes); // Using the assessment routes module for the "/api" path

//Server listning to Port defined in env
app.listen(process.env.PORT, () => {
  // Starting the server and listening on the port defined in the environment variable
  console.log(`Server listening on port ${process.env.PORT}`);
});
