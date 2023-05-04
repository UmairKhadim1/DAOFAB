import adminAxiosInstance from "./index"; // Importing the Axios instance for making API requests to the server

//Axios Api to call the parent transactions api
export const viewAllParentTranscations = async (page) => {
  // Declaring a function that retrieves all parent transactions from the server
  try {
    let res = await adminAxiosInstance.get(`/api/transactions/${page}`, {}); // Making a GET request to the server's parent transactions API with the specified page number

    return res; // Returning the server response
  } catch (error) {
    console.log("view parent transactions error"); // Logging an error message if the request fails
    console.log(error);
    throw error; // Rethrowing the error for handling at a higher level
  }
};

//Axios Api to call the child transactions api
export const viewAllChildTranscations = async (parentId) => {
  // Declaring a function that retrieves all child transactions for a given parent transaction ID
  try {
    let res = await adminAxiosInstance.get(
      `/api/childtransactions/${parentId}`,
      {} // Making a GET request to the server's child transactions API with the specified parent ID
    );

    console.log("res is ", res); // Logging the server response

    return res; // Returning the server response
  } catch (error) {
    console.log("view child transactions error"); // Logging an error message if the request fails
    console.log(error);
    throw error; // Rethrowing the error for handling at a higher level
  }
};
