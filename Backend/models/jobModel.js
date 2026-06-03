const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  responsibilities: {
    type: [String],
    default: []
  },
  skills: {
    type: [String],
    default: []
  },
  qualifications: {
    type: String,
    required: true,
    trim: true
  },
  CTC: {
    type: String,
    required: true,
    trim: true
  },
  employmentType: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Internship"],
    default: "Full-Time",
  },
  status: {
    type: String,
    enum: ['OPEN', 'CLOSED'],
    default: 'OPEN'
  }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
