const Job = require("../models/jobModel");
const Application = require("../models/applicationModel");
const cloudinary = require("../config/cloudinary");

// Create a new job
const createJob = async (req, res) => {
  try {
    const { title, department, location, experience, description, responsibilities, skills, qualifications, CTC, employmentType, status } = req.body;

    if (!title || !department || !location || !experience || !description || !qualifications || !CTC || !employmentType) {
      return res.status(400).json({ message: "All required fields must be filled", success: false });
    }

    const job = await Job.create({
      title,
      department,
      location,
      experience,
      description,
      responsibilities: responsibilities || [],
      skills: skills || [],
      qualifications,
      CTC,
      employmentType,
      status: status || "OPEN"
    });

    res.status(201).json({
      message: "Job created successfully",
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

//Get single job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

// Update a job by ID
const updateJob = async (req, res) => {
  try {
    const { title, department, location, experience, description, responsibilities, skills, qualifications, CTC, employmentType, status } = req.body;

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    if (title !== undefined) job.title = title;
    if (department !== undefined) job.department = department;
    if (location !== undefined) job.location = location;
    if (experience !== undefined) job.experience = experience;
    if (description !== undefined) job.description = description;
    if (responsibilities !== undefined) job.responsibilities = responsibilities;
    if (skills !== undefined) job.skills = skills;
    if (qualifications !== undefined) job.qualifications = qualifications;
    if (CTC !== undefined) job.CTC = CTC;
    if (employmentType !== undefined) job.employmentType = employmentType;
    if (status !== undefined) job.status = status;

    const updatedJob = await job.save();

    res.status(200).json({
      message: "Job updated successfully",
      success: true,
      job: updatedJob
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    await Application.deleteMany({ jobId: job._id });
    await job.deleteOne();

    res.status(200).json({
      message: "Job deleted successfully",
      success: true
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

const deleteCloudinaryFile = async (file) => {
  if (file && file.filename) {
    try {
      await cloudinary.uploader.destroy(file.filename, { resource_type: "raw" });
    } catch (err) {
      console.error("Failed to delete file from Cloudinary:", err.message);
    }
  }
};

// Apply for a job
const applyJob = async (req, res) => {
  const file = req.file;
  try {
    const { jobId } = req.params;
    const { name, email, phone, resumeUrl } = req.body;
    const finalResumeUrl = file ? file.path : resumeUrl;

    if (!name || !email || !phone || !finalResumeUrl) {
      if (file) await deleteCloudinaryFile(file);
      return res.status(400).json({
        message: "All required fields (name, email, phone, resume/resumeUrl) must be filled",
        success: false
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      if (file) await deleteCloudinaryFile(file);
      return res.status(404).json({ message: "Job not found", success: false });
    }

    if (job.status === "CLOSED") {
      if (file) await deleteCloudinaryFile(file);
      return res.status(400).json({ message: "Cannot apply to a closed job", success: false });
    }

    const existingApplication = await Application.findOne({ jobId, email });
    if (existingApplication) {
      if (file) await deleteCloudinaryFile(file);
      return res.status(400).json({
        message: "You have already applied for this job with this email",
        success: false
      });
    }

    const application = await Application.create({
      jobId,
      name,
      email,
      phone,
      resumeUrl: finalResumeUrl
    });

    res.status(201).json({
      message: "Application submitted successfully",
      success: true,
      application
    });
  } catch (error) {
    if (file) {
      try {
        await deleteCloudinaryFile(file);
      } catch (err) {
        // ignore
      }
    }
    if (error.name === 'CastError') {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyJob
};
