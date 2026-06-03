import { Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { AuthShell } from "../components/AuthShell";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
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
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await signup(formData);
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(requestError.message || "Unable to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <AuthShell
      title="Create Account"
      subtitle="Join the energy revolution"
      footer={<p className="text-center text-sm text-aw-dark-gray">
          By continuing, you agree to AmpereWalk&apos;s Terms of Service and Privacy Policy
        </p>}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error ? <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div> : null}
        <div>
          <label className="mb-2 block text-sm font-semibold text-aw-navy">
            Full Name
          </label>
          <input
    type="text"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    className="w-full rounded-lg bg-aw-light-gray px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aw-green"
    placeholder="Your name"
    required
  />
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
    placeholder="********"
    required
  />
          </div>
        </div>

        <button
    type="submit"
    disabled={isSubmitting}
    aria-busy={isSubmitting}
    className="group flex w-full items-center justify-center gap-2 rounded-lg bg-aw-green px-6 py-4 text-white transition-colors hover:bg-aw-lime"
  >
          {isSubmitting ? "Creating Account..." : "Create Account"}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-aw-dark-gray">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-aw-green transition-colors hover:text-aw-navy">
            Sign In
          </Link>
        </p>
      </div>
    </AuthShell>;
}

export {
  Signup
};
