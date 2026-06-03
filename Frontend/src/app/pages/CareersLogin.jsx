import { Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { AuthShell } from "../components/AuthShell";
import { useCareerAuth } from "../context/CareerAuthContext";

export function CareersLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isInitializing, login } = useCareerAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
    setIsSubmitting(true);

    try {
      await login(formData);
      const redirectPath = location.state?.from || "/careers/dashboard";
      navigate(redirectPath, { replace: true });
    } catch (requestError) {
      setError(requestError.message || "Unable to sign in");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <AuthShell
      title="Welcome Back"
      subtitle="Sign in to your careers account"
      footer={<div className="text-center">
          <p className="text-sm text-aw-dark-gray mb-4">
            By continuing, you agree to AmpereWalk&apos;s Terms of Service and Privacy Policy
          </p>
          <p className="text-sm">
            Don't have an account? <Link to="/careers/signup" className="text-aw-green hover:text-aw-navy transition-colors font-semibold">Sign up here</Link>
          </p>
        </div>}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error ? <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div> : null}
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
    disabled={isSubmitting}
    className="w-full flex items-center justify-center gap-2 rounded-lg bg-aw-green py-3 font-bold text-white transition-all hover:bg-aw-navy disabled:opacity-50 disabled:cursor-not-allowed"
  >
          {isSubmitting ? "Signing in..." : <>
              Sign In
              <ArrowRight className="h-4 w-4" />
            </>}
        </button>
      </form>
    </AuthShell>;
}
