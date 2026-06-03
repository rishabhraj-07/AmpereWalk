import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, LogOut } from "lucide-react";
import { getAllApplications } from "../lib/careersApplicationStorage";
import { useCareerAuth } from "../context/CareerAuthContext";

const statusStageMap = {
  Applied: 2,
  'Resume Submitted': 2,
  'Under Review': 3,
  Shortlisted: 4,
  'Interview Scheduled': 5,
  Selected: 6,
  Rejected: 6
};

const timelineTemplate = [
  {
    step: 1,
    title: 'Candidate Registration',
    subtitle: 'Registered',
    description: 'Your profile has been recorded and is ready for review.'
  },
  {
    step: 2,
    title: 'Applied for Drive',
    subtitle: 'Applied for Drive',
    description: 'Your application has been submitted and is now in the queue.'
  },
  {
    step: 3,
    title: 'Application Received',
    subtitle: 'Application Received',
    description: 'Our team has received your application and started the evaluation.'
  },
  {
    step: 4,
    title: 'Candidate Batched',
    subtitle: 'Batched',
    description: 'Your profile is grouped into the next review batch.'
  },
  {
    step: 5,
    title: 'Offer Letter',
    subtitle: 'Offer Letter Generated',
    description: 'An offer letter will be issued once your application is approved.'
  },
  {
    step: 6,
    title: 'Final Decision',
    subtitle: 'Offer Letter Accepted',
    description: 'This step displays the final outcome of your application.'
  }
];

const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

function getTimelineSteps(application) {
  const submittedDate = application.appliedDate || application.submittedDate;
  const updatedDate = application.updatedDate;

  return timelineTemplate.map((item) => {
    const isFinalDecision = item.step === 6;
    const subtitle = isFinalDecision && application.status === 'Rejected'
      ? 'Rejected'
      : isFinalDecision && application.status !== 'Rejected'
      ? 'Offer Letter Accepted'
      : item.subtitle;

    const date = item.step === 1 || item.step === 2
      ? submittedDate
      : item.step === 3
      ? updatedDate || submittedDate
      : item.step === 4
      ? (application.status === 'Shortlisted' || application.status === 'Interview Scheduled' || application.status === 'Selected' || application.status === 'Rejected') ? updatedDate : null
      : item.step === 5
      ? (application.status === 'Interview Scheduled' || application.status === 'Selected' || application.status === 'Rejected') ? updatedDate : null
      : item.step === 6
      ? (application.status === 'Selected' || application.status === 'Rejected') ? updatedDate : null
      : null;

    return {
      ...item,
      subtitle,
      date,
      isFinalDecision,
      completed: item.step < statusStageMap[application.status] || (item.step === statusStageMap[application.status] && application.status !== 'Rejected'),
      isActive: item.step === statusStageMap[application.status]
    };
  });
}

function ApplicationTimelineCard({ application, index }) {
  const steps = getTimelineSteps(application);
  const isRejected = application.status === 'Rejected';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm"
    >
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] font-semibold text-aw-teal/80 mb-2">Application Tracker</p>
          <h3 className="text-2xl font-black text-aw-navy">
            {application.type === 'Job Application' ? application.jobTitle : 'General Application'}
          </h3>
          <p className="mt-2 text-sm text-aw-dark-gray max-w-xl">
            Track every stage of your application with a clean, website-native timeline and clear progress indicators.
          </p>
        </div>

        <div className="rounded-3xl border border-aw-mid-gray/60 bg-aw-light-gray px-5 py-4 text-right">
          <p className="text-xs uppercase tracking-[0.32em] text-aw-dark-gray/80">Current Status</p>
          <p className={`mt-2 text-base font-semibold ${isRejected ? 'text-red-600' : 'text-aw-green'}`}>
            {application.status}
          </p>
          {application.updatedDate && (
            <p className="text-xs text-aw-dark-gray/70 mt-1">
              Updated {formatDate(application.updatedDate)}
            </p>
          )}
        </div>
      </div>

      <div className="relative pl-12 md:pl-0">
        <div className="absolute left-6 top-5 hidden h-[calc(100%-40px)] w-px bg-aw-teal/20 md:block" />

        <div className="space-y-8">
          {steps.map((step) => {
            const completed = step.completed;
            const active = step.isActive;
            const stepColor = completed ? 'bg-aw-green/10 border-aw-green/20' : active ? 'bg-aw-teal/10 border-aw-teal/30' : 'bg-white border-gray-100';
            const iconColor = completed ? 'text-aw-green' : active ? 'text-aw-teal' : 'text-aw-mid-gray';

            return (
              <div key={step.step} className="grid gap-4 md:grid-cols-[160px_40px_minmax(0,1fr)] items-start">
                <div className="text-sm text-aw-dark-gray">
                  {step.date ? (
                    <>
                      <p className="font-semibold text-aw-navy">{formatDate(step.date)}</p>
                      <p className="mt-1 uppercase tracking-[0.2em] text-xs text-aw-dark-gray/70">IST</p>
                    </>
                  ) : (
                    <p className="font-semibold text-aw-dark-gray/80">Pending</p>
                  )}
                </div>

                <div className="relative flex justify-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${completed ? 'border-aw-green bg-aw-green/10' : active ? 'border-aw-teal bg-aw-teal/10' : 'border-aw-mid-gray bg-white'}`}>
                    <CheckCircle2 className={`h-6 w-6 ${iconColor}`} />
                  </div>
                </div>

                <div className={`rounded-[28px] border p-5 ${stepColor}`}>
                  <p className="text-xs uppercase tracking-[0.32em] font-semibold text-aw-dark-gray/70">
                    {step.title}
                  </p>
                  <h4 className="mt-3 text-lg font-semibold text-aw-navy">
                    {step.subtitle}
                  </h4>
                  <p className="mt-2 text-sm text-aw-dark-gray/80">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export function CareersDashboard() {
  const navigate = useNavigate();
  const { user, logout, isInitializing } = useCareerAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isInitializing) {
      const apps = getAllApplications(user?.id);
      setApplications(apps);
      setLoading(false);
    }
  }, [user?.id, isInitializing]);

  const handleLogout = () => {
    logout().finally(() => {
      navigate("/careers/login", { replace: true });
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-aw-light-gray py-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid place-items-center h-96">
            <div className="text-center">
              <div className="flex items-center gap-3 text-sm font-semibold text-aw-navy justify-center mb-4">
                <span className="h-2 w-2 rounded-full bg-aw-green animate-pulse" />
                Loading dashboard
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aw-light-gray py-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-start justify-between mb-10"
        >
          <div>
            <h1 className="text-4xl font-black text-aw-navy mb-2">Applications Dashboard</h1>
            <p className="text-aw-dark-gray">
              Welcome back, <span className="font-semibold text-aw-navy">{user?.name}</span>
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg font-semibold transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-10"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-aw-green/20">
            <p className="text-sm text-aw-dark-gray mb-2">Total Applications</p>
            <p className="text-3xl font-black text-aw-green">{applications.length}</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-aw-teal/20">
            <p className="text-sm text-aw-dark-gray mb-2">Under Review</p>
            <p className="text-3xl font-black text-aw-teal">
              {applications.filter(a => a.status === 'Under Review').length}
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-aw-lime/20">
            <p className="text-sm text-aw-dark-gray mb-2">Shortlisted</p>
            <p className="text-3xl font-black text-aw-lime">
              {applications.filter(a => a.status === 'Shortlisted' || a.status === 'Interview Scheduled').length}
            </p>
          </div>
        </motion.div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-12 shadow-sm text-center"
          >
            <AlertCircle className="w-16 h-16 text-aw-dark-gray/30 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-aw-navy mb-2">No Applications Yet</h2>
            <p className="text-aw-dark-gray mb-8">
              You haven't submitted any applications yet. Explore opportunities and start your journey with AmpereWalk!
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/careers')}
              className="inline-flex items-center gap-2 bg-aw-green text-white font-bold py-3 px-8 rounded-lg hover:bg-aw-navy transition-colors"
            >
              Browse Open Positions
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-aw-navy mb-6">Your Applications</h2>
            {applications.map((app, idx) => (
              <ApplicationTimelineCard key={app.id} application={app} index={idx} />
            ))}
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid md:grid-cols-2 gap-6"
        >
          <div className="bg-aw-green/10 rounded-xl p-6 border border-aw-green/20">
            <h3 className="font-bold text-aw-navy mb-3">What's Next?</h3>
            <ul className="text-sm text-aw-dark-gray space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-aw-green font-bold">✓</span>
                <span>Your application status will update as our team reviews</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-aw-green font-bold">✓</span>
                <span>Shortlisted candidates will be contacted for interviews</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-aw-green font-bold">✓</span>
                <span>Check back regularly for status updates</span>
              </li>
            </ul>
          </div>

          <div className="bg-aw-navy text-white rounded-xl p-6">
            <h3 className="font-bold mb-3">Explore More Opportunities</h3>
            <p className="text-sm text-white/80 mb-4">
              Looking for other roles? Browse all open positions in our careers section.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/careers')}
              className="w-full bg-aw-green text-aw-navy font-bold py-2 rounded-lg hover:bg-aw-lime transition-colors"
            >
              View All Jobs
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
