// Import required modules
const fs = require("fs");
const path = require("path");

// Define constants
const PAGE_SIZE = 2;
const SORT_BY = "id";

// Load parent and child transaction data from JSON files
const parentFilePath = path.join(__dirname, "..", "database", "Parent.json");
const childFilePath = path.join(__dirname, "..", "database", "Child.json");

// Define the function to get parent transactions
exports.getParentTranscations = async (req, res) => {
  try {
    // Get page number from request params or default to 1
    const currentPage = parseInt(req.params.id) || 1;

    // Read the parent and child data from their respective files
    const parentData = JSON.parse(fs.readFileSync(parentFilePath));
    const childData = JSON.parse(fs.readFileSync(childFilePath));

    // Calculate start and end indices for the current page
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    // Loop through the parent transaction data and create a result object
    const result = {};
    parentData.data.forEach((parent) => {
      const parentId = parent.id;

      // Filter child transactions by parent ID
      const childItems = childData.data.filter(
        (child) => child.parentId === parentId
      );

      // Calculate total paid amount for this parent ID
      const totalPaidAmount = childItems.reduce(
        (total, child) => total + child.paidAmount,
        0
      );

      // Add the parent transaction and related child transaction data to the result object
      result[parentId] = {
        parentId: parentId,
        sender: parent.sender,
        receiver: parent.receiver,
        totalAmount: parent.totalAmount,
        totalPaidAmount: totalPaidAmount,
      };
    });

    // Sort the result object by parent ID if requested
    let rows = Object.values(result);
    if (SORT_BY === "id") {
      rows = rows.sort((a, b) => a.parentId - b.parentId);
    }

    // Get the current page of data
    const rowsPerPage = rows.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const pageCount = Math.ceil(rows.length / PAGE_SIZE);

    // Send the response back to the client
    res.status(200).send({
      success: true,
      message: "Parent Transactions are",
      rows: rowsPerPage,
      pageCount: pageCount,
      currentPage: currentPage,
      rowsLength: parentData.data.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

exports.getChildTransactions = async (req, res) => {
  try {
    //Parent ID to get its child transactions
    const parentID = req.params.id;

    // Read the parent and child data from their respective files
    const parentData = JSON.parse(fs.readFileSync(parentFilePath));
    const childData = JSON.parse(fs.readFileSync(childFilePath));

    // Find the parent transaction with the given ID
    const parentTransaction = parentData.data.find(
      (item) => item.id == parentID
    );

    // If parent transaction not found, return error response
    if (!parentTransaction) {
      return res
        .status(404)
        .send({ success: false, message: "Parent transaction not found" });
    }

    const result = [];

    // Loop through the child array and filter by the given parent ID
    const childItems = childData.data.filter((item) => {
      console.log(`parentId ${item.parentId} parentID ${parentID}`);
      if (item.parentId == parentID) {
        return item;
      }
    });

    // Loop through the filtered child items
    for (const item of childItems) {
      const childID = item.id;
      const parentId = item.parentId;

      // Calculate the total amount from the parent transaction or set to 0 if not found
      const totalAmount = parentTransaction ? parentTransaction.totalAmount : 0;

      // Add the result to the object
      result.push({
        id: childID,
        parentId: parentId,
        sender: parentTransaction?.sender,
        receiver: parentTransaction?.receiver,
        paidAmount: item?.paidAmount,
        totalAmount: totalAmount,
      });
    }

    // Sort the result on the basis of child ID
    const sortedResult = result.sort((a, b) => {
      if (SORT_BY === "id") {
        return a.id - b.id;
      } else {
        return 0;
      }
    });

    // Send the response to the client
    res.status(200).send({
      success: true,
      result: sortedResult,
      parentData,
      childData,
      new: result,
      childItems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};
