//Setting up my axios Instance for api calling
import axios from "axios"; // Importing the Axios library for making HTTP requests

const adminAxiosInstance = axios.create({
  // Creating an instance of the Axios client for making requests to the server API
  baseURL: process.env.REACT_APP_API, // Setting the base URL for the server API using an environment variable
  timeout: 25000, // Setting a timeout of 25 seconds for each request
});

export default adminAxiosInstance; // Exporting the Axios client instance for use in other parts of the application
