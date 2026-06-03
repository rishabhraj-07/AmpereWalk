const express = require("express");
const router = express.Router();
const {
  getCandidateApplications,
  getAllApplications,
  updateApplicationStatus,
  getJobApplications
} = require("../controllers/applicationControllers");
const { protect, authorize } = require("../middleware/authMiddleware");

// Get all applications for the logged-in candidate
router.get("/", protect, authorize("Candidate"), getCandidateApplications);

// Get all applications for admin
router.get("/get-applications", protect, authorize("Admin"), getAllApplications);

// Get all applications of a specific job for admin
router.get("/get-applications/:jobId", protect, authorize("Admin"), getJobApplications);

//  Update application status for admin
router.patch("/update-status/:id", protect, authorize("Admin"), updateApplicationStatus);

module.exports = router;
