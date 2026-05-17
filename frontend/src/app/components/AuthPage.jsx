import { motion } from "motion/react";
import { Mail, Lock, Zap, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

function AuthPage({ mode }) {
  const isLogin = mode === "login";
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    window.localStorage.setItem("amperewalk:session", "active");
    navigate(location.state?.from || "/dashboard", { replace: true });
  };

  return <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-aw-light-gray py-12">
      <div className="max-w-6xl w-full mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="hidden lg:block"
  >
            <div className="bg-aw-navy text-white p-12 rounded-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-12 h-12 bg-aw-green rounded">
                  <Zap className="w-7 h-7 text-white" fill="white" />
                </div>
                <span className="text-2xl font-bold">
                  <span className="text-white">Ampere</span>
                  <span className="text-aw-green">Walk</span>
                </span>
              </div>

              <h2 className="text-4xl font-bold mb-6">Power Every Step</h2>

              <p className="text-lg text-white/90 mb-8">
                Access your energy dashboard, track your steps, and monitor the power you generate with every walk.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-aw-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-4 h-4 text-aw-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Real-time Energy Tracking</h3>
                    <p className="text-white/70 text-sm">Monitor power generation and battery status</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-aw-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-4 h-4 text-aw-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Health & Fitness Insights</h3>
                    <p className="text-white/70 text-sm">Track steps, distance, and calories burned</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-aw-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-4 h-4 text-aw-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Sync Across Devices</h3>
                    <p className="text-white/70 text-sm">Access your data from anywhere</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg"
  >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-aw-navy mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-aw-dark-gray">
                {isLogin ? "Sign in to access your dashboard" : "Join the energy revolution"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && <div>
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
                </div>}

              <div>
                <label className="block text-sm font-semibold text-aw-navy mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-aw-dark-gray" />
                  <input
    type="email"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    className="w-full pl-12 pr-4 py-3 bg-aw-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-aw-green"
    placeholder="your@email.com"
    required
  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-aw-navy mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-aw-dark-gray" />
                  <input
    type="password"
    value={formData.password}
    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    className="w-full pl-12 pr-4 py-3 bg-aw-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-aw-green"
    placeholder="********"
    required
  />
                </div>
              </div>

              {isLogin && <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-aw-green rounded focus:ring-aw-green" />
                    <span className="text-aw-dark-gray">Remember me</span>
                  </label>
                  <button type="button" className="text-aw-green hover:text-aw-navy transition-colors">
                    Forgot password?
                  </button>
                </div>}

              <button
    type="submit"
    className="w-full px-6 py-4 bg-aw-green text-white rounded-lg hover:bg-aw-lime transition-colors flex items-center justify-center gap-2 group"
  >
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-aw-dark-gray">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Link
    to={isLogin ? "/signup" : "/login"}
    className="text-aw-green hover:text-aw-navy transition-colors font-semibold"
  >
                  {isLogin ? "Sign Up" : "Sign In"}
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-aw-mid-gray">
              <p className="text-sm text-aw-dark-gray text-center">
                By continuing, you agree to AmpereWalk&apos;s Terms of Service and Privacy Policy
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>;
}

export {
  AuthPage
};
