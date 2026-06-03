import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { AuthShell } from "../components/AuthShell";
import { useCareerAuth } from "../context/CareerAuthContext";

export function CareersSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isInitializing, signup } = useCareerAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isInitializing) {
    return <div className="min-h-screen bg-aw-light-gray grid place-items-center text-aw-navy">
        <div className="text-sm font-semibold tracking-wide">Restoring session...</div>
      </div>;
  }

  if (isAuthenticated) {
    const redirectPath = location.state?.from || "/careers/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsSubmitting(true);

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      const redirectPath = location.state?.from || "/careers/dashboard";
      navigate(redirectPath, { replace: true });
    } catch (requestError) {
      setError(requestError.message || "Unable to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <AuthShell
      title="Create Your Account"
      subtitle="Join AmpereWalk careers"
      footer={<div className="text-center">
          <p className="text-sm text-aw-dark-gray mb-4">
            By signing up, you agree to AmpereWalk&apos;s Terms of Service and Privacy Policy
          </p>
          <p className="text-sm">
            Already have an account? <Link to="/careers/login" className="text-aw-green hover:text-aw-navy transition-colors font-semibold">Sign in here</Link>
          </p>
        </div>}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error ? <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div> : null}

        <div>
          <label className="mb-2 block text-sm font-semibold text-aw-navy">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-aw-dark-gray" />
            <input
    type="text"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    className="w-full rounded-lg bg-aw-light-gray py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-aw-green"
    placeholder="Your full name"
    required
  />
          </div>
        </div>

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
    placeholder="At least 6 characters"
    required
  />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-aw-navy">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-aw-dark-gray" />
            <input
    type="password"
    value={formData.confirmPassword}
    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
    className="w-full rounded-lg bg-aw-light-gray py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-aw-green"
    placeholder="Confirm your password"
    required
  />
          </div>
        </div>

        <label className="flex items-start gap-3">
          <input type="checkbox" className="h-4 w-4 rounded text-aw-green focus:ring-aw-green mt-1" required />
          <span className="text-xs text-aw-dark-gray">
            I agree to AmpereWalk&apos;s Terms of Service and Privacy Policy
          </span>
        </label>

        <button
    type="submit"
    disabled={isSubmitting}
    className="w-full flex items-center justify-center gap-2 rounded-lg bg-aw-green py-3 font-bold text-white transition-all hover:bg-aw-navy disabled:opacity-50 disabled:cursor-not-allowed"
  >
          {isSubmitting ? "Creating account..." : <>
              Create Account
              <ArrowRight className="h-4 w-4" />
            </>}
        </button>
      </form>
    </AuthShell>;
}
