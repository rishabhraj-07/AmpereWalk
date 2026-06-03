const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyJob
} = require("../controllers/jobControllers");
const upload = require("../middleware/uploadMiddleware");
const { protect, authorize } = require("../middleware/authMiddleware");

// GET /api/jobs & POST /api/jobs
router.route("/")
  .get(getAllJobs)
  .post(protect, authorize("Admin"), createJob);

// GET, PUT, DELETE /api/jobs/:id
router.route("/:id")
  .get(getJobById)
  .put(protect, authorize("Admin"), updateJob)
  .delete(protect, authorize("Admin"), deleteJob);

// POST /api/jobs/:jobId/apply
router.post("/:jobId/apply", protect, authorize("Candidate"), upload.single("resumeUrl"), applyJob);

module.exports = router;
