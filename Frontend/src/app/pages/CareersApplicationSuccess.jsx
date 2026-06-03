import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function CareersApplicationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-aw-light-gray py-10">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-12 shadow-sm text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-aw-green/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-aw-green" />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-aw-green"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-aw-navy mb-4"
          >
            Application Submitted!
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-aw-dark-gray mb-8 max-w-xl mx-auto"
          >
            Thank you for your interest in AmpereWalk! Your application has been successfully submitted.
          </motion.p>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-aw-green/10 rounded-lg p-6 mb-8 border border-aw-green/20"
          >
            <p className="text-aw-dark-gray mb-4">
              <span className="font-semibold text-aw-navy">Next Steps:</span>
            </p>
            <ul className="text-left space-y-3 max-w-lg mx-auto">
              <li className="flex items-start gap-3">
                <span className="text-aw-green font-bold flex-shrink-0">✓</span>
                <span className="text-aw-dark-gray">Our team will review your application and qualifications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-aw-green font-bold flex-shrink-0">✓</span>
                <span className="text-aw-dark-gray">Shortlisted candidates will be contacted via email or phone</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-aw-green font-bold flex-shrink-0">✓</span>
                <span className="text-aw-dark-gray">Track your application status in your dashboard anytime</span>
              </li>
            </ul>
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-aw-light-gray rounded-lg p-6 mb-8"
          >
            <p className="text-sm text-aw-dark-gray mb-3">
              <span className="font-semibold text-aw-navy">💡 Pro Tip:</span>
            </p>
            <p className="text-sm text-aw-dark-gray">
              You can track the status of all your applications and updates in your careers dashboard. We'll notify you as soon as there's any progress on your application.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/careers/dashboard')}
              className="flex items-center justify-center gap-2 bg-aw-green text-white font-bold py-3 px-8 rounded-lg hover:bg-aw-navy transition-colors"
            >
              View Dashboard
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/careers')}
              className="flex items-center justify-center gap-2 border-2 border-aw-green text-aw-green font-bold py-3 px-8 rounded-lg hover:bg-aw-green/5 transition-colors"
            >
              Back to Careers
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="my-8 border-t border-aw-mid-gray"
          />

          {/* More Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-sm text-aw-dark-gray"
          >
            <p className="mb-2">Have questions? Check out our</p>
            <button
              onClick={() => navigate('/contact')}
              className="text-aw-green hover:text-aw-navy transition-colors font-semibold"
            >
              Contact Us
            </button>
            <p className="mt-4">or visit our Careers page for more opportunities</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
