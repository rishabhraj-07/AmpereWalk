import { motion } from "motion/react";
import { Briefcase, MapPin, Clock, ArrowRight, Users, Rocket, Heart, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router";
import { MOCK_JOBS } from "../lib/careersApplicationStorage";

function Careers() {
  const navigate = useNavigate();
  const openings = MOCK_JOBS;
  const benefits = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Innovation First",
      description: "Work on cutting-edge technology that's changing the world."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Culture",
      description: "Join a team of passionate innovators and problem solvers."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Impact Driven",
      description: "Make a real difference in solving global energy poverty."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Growth Opportunities",
      description: "Continuous learning and career development support."
    }
  ];
  return <div>
      {
    /* Hero Section */
  }
      <section className="bg-aw-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Join <span className="text-aw-green">AmpereWalk</span>
            </h1>
            <p className="text-xl text-aw-lime max-w-3xl mx-auto">
              Build the future of sustainable energy with a team that's passionate about innovation and impact
            </p>
          </motion.div>
        </div>
      </section>

      {
    /* Why Join Us */
  }
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-aw-navy mb-4">
              Why Work With Us
            </h2>
            <p className="text-lg text-aw-dark-gray max-w-2xl mx-auto">
              Be part of a mission-driven team revolutionizing wearable energy technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="text-center"
  >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-aw-green/10 text-aw-green rounded-full mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-aw-navy mb-2">
                  {benefit.title}
                </h3>
                <p className="text-aw-dark-gray">
                  {benefit.description}
                </p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {
    /* Open Positions */
  }
      <section className="py-20 bg-aw-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-aw-navy mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-aw-dark-gray">
              Explore opportunities to make an impact
            </p>
          </div>

          <div className="grid gap-6">
            {openings.map((job, index) => <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="bg-white p-6 rounded-lg hover:shadow-lg transition-all group cursor-pointer"
    onClick={() => navigate(`/careers/job/${job.id}`)}
  >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Briefcase className="w-5 h-5 text-aw-green" />
                      <span className="text-sm text-aw-green font-semibold">{job.department}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-aw-navy mb-2 group-hover:text-aw-green transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-aw-dark-gray mb-4">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-aw-dark-gray">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/careers/job/${job.id}`);
                    }}
                    className="px-6 py-3 bg-aw-green text-white rounded-lg hover:bg-aw-lime transition-colors flex items-center gap-2 group-hover:gap-3 self-start lg:self-center whitespace-nowrap"
                  >
                    View Details
                    <ArrowRight className="w-5 h-5 transition-all" />
                  </motion.button>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {
    /* Company Culture */
  }
      <section className="py-20 bg-aw-navy text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Our <span className="text-aw-green">Culture</span>
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-white/90">
                  At AmpereWalk, we believe in the power of collaboration, innovation, and purpose-driven work. Every team member plays a crucial role in our mission to eliminate energy poverty through wearable technology.
                </p>
                <p className="text-lg text-white/90">
                  We're building more than products — we're building a movement. Join us in creating technology that empowers billions of people around the world.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
    { label: "Team Members", value: "50+" },
    { label: "Countries", value: "3" },
    { label: "Awards Won", value: "5+" },
    { label: "Patents Filed", value: "2" }
  ].map((stat, index) => <div key={index} className="bg-white/10 p-6 rounded-lg text-center">
                  <p className="text-4xl font-bold text-aw-green mb-2">{stat.value}</p>
                  <p className="text-white/80">{stat.label}</p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {
    /* CTA Section */
  }
      <section className="py-20 bg-aw-green text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Don't See the Right Role?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            We're always looking for talented individuals who share our passion. Send us your resume and let's talk.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/careers/general-application')}
            className="px-10 py-4 bg-white text-aw-green rounded-lg hover:bg-aw-light-gray transition-colors text-lg font-semibold"
          >
            Send Your Resume
          </motion.button>
        </div>
      </section>
    </div>;
}
export {
  Careers
};
