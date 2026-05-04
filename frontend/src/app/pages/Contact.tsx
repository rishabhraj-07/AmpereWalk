import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare, Linkedin } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      detail: "info@amperewalk.com",
      link: "mailto:info@amperewalk.com",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      title: "LinkedIn",
      detail: "AmpereWalk Pvt. Ltd.",
      link: "https://linkedin.com/company/amperewalk-pvt-ltd/",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Support",
      detail: "support@amperewalk.com",
      link: "mailto:support@amperewalk.com",
    },
  ];

  const reasons = [
    "General Inquiry",
    "Product Information",
    "Partnership Opportunity",
    "Sales & Distribution",
    "Media & Press",
    "Technical Support",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-aw-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Get in <span className="text-aw-green">Touch</span>
            </h1>
            <p className="text-xl text-aw-lime max-w-3xl mx-auto">
              Have questions about our products? Want to partner with us? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                target={info.link.startsWith("http") ? "_blank" : undefined}
                rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-aw-light-gray p-6 rounded-lg text-center hover:bg-aw-navy hover:text-white transition-all group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-aw-green text-white rounded-full mb-4 group-hover:bg-white group-hover:text-aw-green transition-colors">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-aw-navy mb-2 group-hover:text-white">
                  {info.title}
                </h3>
                <p className="text-aw-dark-gray group-hover:text-white/90">
                  {info.detail}
                </p>
              </motion.a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-aw-navy mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-aw-navy mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-aw-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-aw-green"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-aw-navy mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-aw-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-aw-green"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-aw-navy mb-2">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-aw-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-aw-green"
                    required
                  >
                    <option value="">Select a reason</option>
                    {reasons.map((reason, index) => (
                      <option key={index} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-aw-navy mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-aw-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-aw-green h-32 resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-aw-green text-white rounded-lg hover:bg-aw-lime transition-colors flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-aw-navy text-white p-8 rounded-lg"
            >
              <h2 className="text-3xl font-bold mb-6">
                Let's Connect
              </h2>
              <p className="text-white/90 mb-8">
                Whether you're interested in our products, exploring partnership opportunities, or just want to learn more about our technology, we're here to help.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-aw-green mb-2">
                    Business Hours
                  </h3>
                  <p className="text-white/80">
                    Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                    Saturday: 10:00 AM - 4:00 PM IST<br />
                    Sunday: Closed
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-aw-green mb-2">
                    Response Time
                  </h3>
                  <p className="text-white/80">
                    We typically respond to all inquiries within 24-48 hours during business days.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-aw-green mb-2">
                    Follow Our Journey
                  </h3>
                  <p className="text-white/80 mb-4">
                    Stay updated with our latest innovations and milestones on LinkedIn.
                  </p>
                  <a
                    href="https://linkedin.com/company/amperewalk-pvt-ltd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-aw-green hover:text-aw-lime transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    Visit our LinkedIn page
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 bg-aw-green text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            AmpereWalk Pvt. Ltd.
          </h2>
          <p className="text-xl text-white/90 mb-2">
            NextGen Shoes
          </p>
          <p className="text-white/80">
            Pioneering smart footwear technology for a sustainable future
          </p>
        </div>
      </section>
    </div>
  );
}
