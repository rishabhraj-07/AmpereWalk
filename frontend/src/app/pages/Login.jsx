import { Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { AuthShell } from "../components/AuthShell";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthed = window.localStorage.getItem("amperewalk:session") === "active";
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  if (isAuthed) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    window.localStorage.setItem("amperewalk:session", "active");
    navigate(location.state?.from || "/dashboard", { replace: true });
  };

  return <AuthShell
      title="Welcome Back"
      subtitle="Sign in to access your dashboard"
      footer={<p className="text-center text-sm text-aw-dark-gray">
          By continuing, you agree to AmpereWalk&apos;s Terms of Service and Privacy Policy
        </p>}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-aw-navy">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-aw-dark-gray" />
            <input
    type="email"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    className="w-full rounded-lg bg-aw-light-gray py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-aw-green"
    placeholder="your@email.com"
    required
  />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-aw-navy">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-aw-dark-gray" />
            <input
    type="password"
    value={formData.password}
    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    className="w-full rounded-lg bg-aw-light-gray py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-aw-green"
    placeholder="********"
    required
  />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded text-aw-green focus:ring-aw-green" />
            <span className="text-aw-dark-gray">Remember me</span>
          </label>
          <button type="button" className="text-aw-green transition-colors hover:text-aw-navy">
            Forgot password?
          </button>
        </div>

        <button
    type="submit"
    className="group flex w-full items-center justify-center gap-2 rounded-lg bg-aw-green px-6 py-4 text-white transition-colors hover:bg-aw-lime"
  >
          Sign In
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-aw-dark-gray">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-semibold text-aw-green transition-colors hover:text-aw-navy">
            Sign Up
          </Link>
        </p>
      </div>
    </AuthShell>;
}

export {
  Login
};
