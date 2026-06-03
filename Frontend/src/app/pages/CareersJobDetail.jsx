import { motion } from "motion/react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, MapPin, Briefcase, Users, Heart, Lightbulb, CheckCircle2 } from "lucide-react";
import { getJobById } from "../lib/careersApplicationStorage";

export function CareersJobDetail() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = getJobById(jobId);

  if (!job) {
    return (
      <div className="min-h-screen bg-aw-light-gray py-10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
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

  return (
    <div className="min-h-screen bg-aw-light-gray py-10">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/careers')}
          className="flex items-center gap-2 text-aw-green hover:text-aw-navy transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Careers
        </motion.button>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-aw-navy text-white rounded-2xl p-8 lg:p-12 mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{job.title}</h1>
          <p className="text-aw-lime text-xl mb-6 max-w-2xl">{job.description}</p>
          
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-aw-green" />
              <span className="text-white/90">{job.department}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-aw-green" />
              <span className="text-white/90">{job.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-aw-green" />
              <span className="text-white/90">{job.type}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/careers/apply/${job.id}`)}
            className="bg-aw-green text-aw-navy font-bold py-3 px-8 rounded-lg hover:bg-aw-lime transition-colors"
          >
            Apply Now
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* About the Role */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-aw-navy mb-4">About the Role</h2>
              <p className="text-aw-dark-gray leading-relaxed mb-6">{job.fullDescription}</p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-aw-navy mb-6">Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex items-start gap-3 text-aw-dark-gray"
                  >
                    <CheckCircle2 className="w-5 h-5 text-aw-green flex-shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-aw-navy mb-6">Requirements</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-aw-navy mb-4">Skills Required</h3>
                <div className="grid grid-cols-2 gap-3">
                  {job.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.05 * idx }}
                      className="bg-aw-green/10 text-aw-green px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-aw-navy mb-4">Qualifications</h3>
                <ul className="space-y-2">
                  {job.qualifications.map((qual, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-aw-dark-gray">
                      <CheckCircle2 className="w-4 h-4 text-aw-green flex-shrink-0 mt-1" />
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Experience */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-aw-navy mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-aw-green" />
                Experience
              </h3>
              <p className="text-aw-dark-gray">{job.experience}</p>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-aw-navy mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-aw-green" />
                Benefits
              </h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-aw-dark-gray">
                    <span className="text-aw-green font-bold">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply Card */}
            <div className="bg-aw-green/10 border border-aw-green rounded-xl p-6">
              <p className="text-sm text-aw-dark-gray mb-4">
                Ready to join our team? Click the button below to start your application.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/careers/apply/${job.id}`)}
                className="w-full bg-aw-green text-white font-bold py-3 rounded-lg hover:bg-aw-navy transition-colors"
              >
                Apply Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
