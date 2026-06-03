const Application = require("../models/applicationModel");
const User = require("../models/userModel");
const Job = require("../models/jobModel");

// Get all applications for the logged-in candidate
const getCandidateApplications = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const applications = await Application.find({ email: user.email })
      .populate("jobId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

// Get all applications (Admin)
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find({})
      .populate("jobId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

// Update application status (Admin)
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required", success: false });
    }

    if (!["Pending", "Selected", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value", success: false });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found", success: false });
    }

    application.status = status;
    const updatedApplication = await application.save();
    await updatedApplication.populate("jobId");

    res.status(200).json({
      message: "Application status updated successfully",
      success: true,
      application: updatedApplication
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Application not found", success: false });
    }
    res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

// Get all applications of a specific job (Admin)
const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    const applications = await Application.find({ jobId })
      .populate("jobId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

module.exports = {
  getCandidateApplications,
  getAllApplications,
  updateApplicationStatus,
  getJobApplications
};
