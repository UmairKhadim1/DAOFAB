const express = require("express");
const AssessmentController = require("../controller/assessmentController");
const router = express.Router();

//routes for assessmets
router.get("/transactions/:id", AssessmentController.getParentTranscations);
router.get("/childtransactions/:id", AssessmentController.getChildTransactions);

module.exports = router;
