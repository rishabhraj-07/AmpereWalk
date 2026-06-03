import { motion } from "motion/react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Upload, AlertCircle } from "lucide-react";
import { useState } from "react";
import { getJobById, saveApplication } from "../lib/careersApplicationStorage";
import { useCareerAuth } from "../context/CareerAuthContext";

export function CareersApplicationForm() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useCareerAuth();
  const job = getJobById(jobId);

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    resume: null,
    resumeFileName: "",
    whyJoin: "",
    whyHire: "",
    skills: "",
    experience: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  if (!job) {
    return (
      <div className="min-h-screen bg-aw-light-gray py-10">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <button
            onClick={() => navigate('/careers')}
            className="flex items-center gap-2 text-aw-green hover:text-aw-navy transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Careers
          </button>
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-aw-navy">Job not found</h2>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        resume: file,
        resumeFileName: file.name
      }));
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.resume) newErrors.resume = "Resume is required";
    if (!formData.whyJoin.trim()) newErrors.whyJoin = "This field is required";
    if (!formData.whyHire.trim()) newErrors.whyHire = "This field is required";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (!formData.noticePeriod.trim()) newErrors.noticePeriod = "Notice period is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const applicationData = {
        ...formData,
        resume: formData.resumeFileName, // Store filename instead of file object
        jobTitle: job.title,
        department: job.department
      };

      await saveApplication(job.id, applicationData, user?.id);
      navigate('/careers/application-success');
    } catch (error) {
      setErrors({ submit: "Failed to submit application. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-aw-light-gray py-10">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(`/careers/job/${job.id}`)}
          className="flex items-center gap-2 text-aw-green hover:text-aw-navy transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Job Details
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-aw-navy mb-2">Apply for {job.title}</h1>
          <p className="text-aw-dark-gray">{job.department} • {job.location}</p>
        </motion.div>

        {/* Application Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-sm space-y-8"
        >
          {errors.submit && (
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-red-700">{errors.submit}</span>
            </div>
          )}

          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-bold text-aw-navy mb-6">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-aw-navy mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg px-4 py-3 border transition-colors ${
                    errors.fullName
                      ? "border-red-500 bg-red-50"
                      : "border-aw-mid-gray bg-aw-light-gray focus:border-aw-green focus:bg-white"
                  } focus:outline-none focus:ring-2 focus:ring-aw-green/20`}
                  placeholder="Your full name"
                />
                {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-aw-navy mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg px-4 py-3 border transition-colors ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-aw-mid-gray bg-aw-light-gray focus:border-aw-green focus:bg-white"
                  } focus:outline-none focus:ring-2 focus:ring-aw-green/20`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-aw-navy mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg px-4 py-3 border transition-colors ${
                    errors.phone
                      ? "border-red-500 bg-red-50"
                      : "border-aw-mid-gray bg-aw-light-gray focus:border-aw-green focus:bg-white"
                  } focus:outline-none focus:ring-2 focus:ring-aw-green/20`}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-aw-navy mb-2">LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border border-aw-mid-gray bg-aw-light-gray focus:border-aw-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-aw-green/20 transition-colors"
                  placeholder="linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-aw-navy mb-2">Portfolio Website</label>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border border-aw-mid-gray bg-aw-light-gray focus:border-aw-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-aw-green/20 transition-colors"
                  placeholder="yourportfolio.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-aw-navy mb-2">Notice Period *</label>
                <select
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg px-4 py-3 border transition-colors ${
                    errors.noticePeriod
                      ? "border-red-500 bg-red-50"
                      : "border-aw-mid-gray bg-aw-light-gray focus:border-aw-green focus:bg-white"
                  } focus:outline-none focus:ring-2 focus:ring-aw-green/20`}
                >
                  <option value="">Select notice period</option>
                  <option value="Immediate">Immediate</option>
                  <option value="15 days">15 days</option>
                  <option value="1 month">1 month</option>
                  <option value="2 months">2 months</option>
                  <option value="3 months">3 months</option>
                </select>
                {errors.noticePeriod && <p className="text-red-600 text-xs mt-1">{errors.noticePeriod}</p>}
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <h2 className="text-xl font-bold text-aw-navy mb-6">Resume</h2>
            <label className={`block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
              errors.resume
                ? "border-red-500 bg-red-50"
                : "border-aw-green bg-aw-green/5 hover:bg-aw-green/10"
            }`}>
              <Upload className={`w-8 h-8 mx-auto mb-3 ${errors.resume ? "text-red-600" : "text-aw-green"}`} />
              <p className="text-sm font-semibold text-aw-navy mb-1">
                {formData.resumeFileName || "Upload your resume"}
              </p>
              <p className="text-xs text-aw-dark-gray">PDF or DOC, max 5MB</p>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
            </label>
            {errors.resume && <p className="text-red-600 text-xs mt-2">{errors.resume}</p>}
          </div>

          {/* Professional Details */}
          <div>
            <h2 className="text-xl font-bold text-aw-navy mb-6">Professional Details</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-aw-navy mb-2">Current CTC</label>
                <input
                  type="text"
                  name="currentCTC"
                  value={formData.currentCTC}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border border-aw-mid-gray bg-aw-light-gray focus:border-aw-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-aw-green/20 transition-colors"
                  placeholder="e.g., 10,00,000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-aw-navy mb-2">Expected CTC</label>
                <input
                  type="text"
                  name="expectedCTC"
                  value={formData.expectedCTC}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border border-aw-mid-gray bg-aw-light-gray focus:border-aw-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-aw-green/20 transition-colors"
                  placeholder="e.g., 15,00,000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-aw-navy mb-2">Skills *</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                rows="3"
                className={`w-full rounded-lg px-4 py-3 border transition-colors ${
                  errors.skills
                    ? "border-red-500 bg-red-50"
                    : "border-aw-mid-gray bg-aw-light-gray focus:border-aw-green focus:bg-white"
                } focus:outline-none focus:ring-2 focus:ring-aw-green/20`}
                placeholder="List your key technical and soft skills"
              />
              {errors.skills && <p className="text-red-600 text-xs mt-1">{errors.skills}</p>}
            </div>
          </div>

          {/* Experience & Motivation */}
          <div>
            <h2 className="text-xl font-bold text-aw-navy mb-6">Experience & Motivation</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-aw-navy mb-2">Tell us about your experience *</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                rows="4"
                className={`w-full rounded-lg px-4 py-3 border transition-colors ${
                  errors.experience
                    ? "border-red-500 bg-red-50"
                    : "border-aw-mid-gray bg-aw-light-gray focus:border-aw-green focus:bg-white"
                } focus:outline-none focus:ring-2 focus:ring-aw-green/20`}
                placeholder="Share your professional background and key achievements"
              />
              {errors.experience && <p className="text-red-600 text-xs mt-1">{errors.experience}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-aw-navy mb-2">Why do you want to join AmpereWalk? *</label>
              <textarea
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleInputChange}
                rows="4"
                className={`w-full rounded-lg px-4 py-3 border transition-colors ${
                  errors.whyJoin
                    ? "border-red-500 bg-red-50"
                    : "border-aw-mid-gray bg-aw-light-gray focus:border-aw-green focus:bg-white"
                } focus:outline-none focus:ring-2 focus:ring-aw-green/20`}
                placeholder="Tell us what excites you about AmpereWalk's mission and this role"
              />
              {errors.whyJoin && <p className="text-red-600 text-xs mt-1">{errors.whyJoin}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-aw-navy mb-2">Why should we hire you? *</label>
              <textarea
                name="whyHire"
                value={formData.whyHire}
                onChange={handleInputChange}
                rows="4"
                className={`w-full rounded-lg px-4 py-3 border transition-colors ${
                  errors.whyHire
                    ? "border-red-500 bg-red-50"
                    : "border-aw-mid-gray bg-aw-light-gray focus:border-aw-green focus:bg-white"
                } focus:outline-none focus:ring-2 focus:ring-aw-green/20`}
                placeholder="Highlight what makes you the right fit for this position"
              />
              {errors.whyHire && <p className="text-red-600 text-xs mt-1">{errors.whyHire}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-aw-navy mb-2">Cover Letter</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows="4"
                className="w-full rounded-lg px-4 py-3 border border-aw-mid-gray bg-aw-light-gray focus:border-aw-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-aw-green/20 transition-colors"
                placeholder="Optional: Add any additional information you'd like us to know"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/careers/job/${job.id}`)}
              className="flex-1 border-2 border-aw-green text-aw-green font-bold py-3 rounded-lg hover:bg-aw-green/5 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-aw-green text-white font-bold py-3 rounded-lg hover:bg-aw-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
