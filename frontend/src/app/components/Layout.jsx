import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Menu, X, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import logo from "../../imports/image.png";
import { useAuth } from "../context/AuthContext";
function NavLink({ to, label, isActive }) {
  return <Link to={to} className="relative px-4 py-2 group">
      <span className={`relative z-10 text-sm font-medium transition-colors duration-200 ${isActive ? "text-aw-green" : "text-white/80 group-hover:text-white"}`}>
        {label}
      </span>
      {
    /* Underline bar */
  }
      <motion.span
    className="absolute bottom-0 left-4 right-4 h-0.5 bg-aw-green rounded-full"
    initial={false}
    animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
    transition={{ duration: 0.25 }}
    style={{ transformOrigin: "left" }}
  />
      {
    /* Hover bg */
  }
      <motion.span
    className="absolute inset-0 bg-white/5 rounded-lg"
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 1 }}
    transition={{ duration: 0.15 }}
  />
    </Link>;
}
function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, logout } = useAuth();
  const { scrollY } = useScroll();
  const scrollProgressWidth = useTransform(scrollY, [0, 1e3], ["0%", "100%"]);
  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 20));
    return unsub;
  }, [scrollY]);
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/products", label: "Products" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
    { path: "/careers", label: "Careers" }
  ];
  const isActive = (path) => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
  const pageVariants = {
    initial: { opacity: 0, y: 16, filter: "blur(4px)" },
    enter: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -16, filter: "blur(4px)", transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }
  };
  const handleLogout = () => {
    logout().finally(() => {
      navigate("/login", { replace: true });
    });
  };
  const isAuthed = isAuthenticated && !isInitializing;
  return <div className="min-h-screen flex flex-col">

      {
    /* ── HEADER ─────────────────────────────────────────────────────── */
  }
      <motion.header
    className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? "bg-aw-navy/88 backdrop-blur-xl border-white/10 shadow-xl shadow-black/20" : "bg-aw-navy/95 border-transparent"}`}
    initial={{ y: -80 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
        {
    /* Energy progress bar */
  }
        <motion.div
    className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-aw-green via-aw-teal to-aw-lime"
    style={{ width: scrollProgressWidth }}
  />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {
    /* Logo */
  }
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.4 }}>
                <img src={logo} alt="AmpereWalk Logo" className="w-8 h-8" />
              </motion.div>
              <span className="font-black text-lg tracking-tight">
                <span className="text-white">Ampere</span>
                <motion.span
    className="text-aw-green"
    animate={{ textShadow: ["0 0 0px rgba(76,175,80,0)", "0 0 12px rgba(76,175,80,0.6)", "0 0 0px rgba(76,175,80,0)"] }}
    transition={{ duration: 3, repeat: Infinity }}
  >
                  Walk
                </motion.span>
              </span>
            </Link>

            {
    /* Desktop Nav */
  }
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => <NavLink key={link.path} to={link.path} label={link.label} isActive={isActive(link.path)} />)}
            </nav>

            {
    /* CTA Buttons */
  }
            <div className="hidden md:flex items-center gap-3">
              {!isAuthed && <Link to="/login" className="inline-flex min-w-20 items-center justify-center rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white/85 transition-colors hover:border-aw-green/60 hover:bg-white/10 hover:text-white">
                  Login
                </Link>}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
    to="/dashboard"
    className="inline-flex min-w-28 items-center justify-center rounded-lg bg-aw-green px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-aw-green/20 transition-colors hover:bg-aw-lime"
  >
                  Dashboard
                </Link>
              </motion.div>
              {isAuthed && <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex min-w-20 items-center justify-center rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white/85 transition-colors hover:border-red-400/60 hover:bg-white/10 hover:text-white"
                >
                  Logout
                </button>}
            </div>

            {
    /* Mobile Menu Button */
  }
            <motion.button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
    whileTap={{ scale: 0.9 }}
    aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
    aria-expanded={mobileMenuOpen}
  >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
    key={mobileMenuOpen ? "close" : "open"}
    initial={{ rotate: -90, opacity: 0 }}
    animate={{ rotate: 0, opacity: 1 }}
    exit={{ rotate: 90, opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
                  {mobileMenuOpen ? <X /> : <Menu />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {
    /* Mobile Menu */
  }
        <AnimatePresence>
          {mobileMenuOpen && <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className="md:hidden bg-aw-navy/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
  >
              <nav className="flex flex-col px-6 py-4 gap-1">
                {navLinks.map((link, i) => <motion.div
    key={link.path}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.05 }}
  >
                    <Link
    to={link.path}
    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${isActive(link.path) ? "bg-aw-green text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
  >
                      {link.label}
                    </Link>
                  </motion.div>)}
                <div className="border-t border-white/10 my-2" />
                {!isAuthed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                    <Link to="/login" className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                      Login
                    </Link>
                  </motion.div>}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  <Link to="/dashboard" className="block px-4 py-3 bg-aw-green text-white rounded-lg hover:bg-aw-lime transition-colors text-center font-semibold">
                    Dashboard
                  </Link>
                </motion.div>
                {isAuthed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
                    <button
    type="button"
    onClick={handleLogout}
    className="block w-full px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-left"
  >
                      Logout
                    </button>
                  </motion.div>}
              </nav>
            </motion.div>}
        </AnimatePresence>
      </motion.header>

      {
    /* ── PAGE TRANSITIONS ────────────────────────────────────────────── */
  }
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
    key={location.pathname}
    variants={pageVariants}
    initial="initial"
    animate="enter"
    exit="exit"
  >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {
    /* ── FOOTER ─────────────────────────────────────────────────────── */
  }
      <footer className="bg-[#071333] text-white relative overflow-hidden border-t border-white/10">
        {
    /* Subtle grid */
  }
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{
    backgroundImage: `linear-gradient(rgba(76,175,80,1) 1px, transparent 1px), linear-gradient(90deg, rgba(76,175,80,1) 1px, transparent 1px)`,
    backgroundSize: "40px 40px"
  }} />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-aw-navy via-[#0a1844]/95 to-[#0a3d42]/90" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <img src={logo} alt="AmpereWalk Logo" className="w-8 h-8" />
                <span className="font-black">
                  <span className="text-white">Ampere</span>
                  <span className="text-aw-green">Walk</span>
                </span>
              </div>
              <p className="text-sm text-white/75 mb-4">Power Every Step</p>
              {
    /* Animated energy bar */
  }
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
    className="h-full bg-gradient-to-r from-aw-green to-aw-teal rounded-full"
    animate={{ x: ["-100%", "100%"] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  />
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-5 text-sm uppercase tracking-widest text-white/85">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                {[{ to: "/about", label: "About Us" }, { to: "/products", label: "Products" }, { to: "/careers", label: "Careers" }].map((l) => <li key={l.to}>
                    <Link to={l.to} className="text-white/70 hover:text-aw-lime transition-colors flex items-center gap-2 group">
                      <motion.span className="w-0 h-px bg-aw-green group-hover:w-3 transition-all duration-300" />
                      {l.label}
                    </Link>
                  </li>)}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-5 text-sm uppercase tracking-widest text-white/85">Support</h3>
              <ul className="space-y-3 text-sm">
                {[{ to: "/contact", label: "Contact Us" }, { to: "/blog", label: "Blog" }].map((l) => <li key={l.to}>
                    <Link to={l.to} className="text-white/70 hover:text-aw-lime transition-colors flex items-center gap-2 group">
                      <motion.span className="w-0 h-px bg-aw-green group-hover:w-3 transition-all duration-300" />
                      {l.label}
                    </Link>
                  </li>)}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-5 text-sm uppercase tracking-widest text-white/85">Connect</h3>
              <p className="text-sm text-white/70 mb-4">Follow our journey</p>
              <motion.a
    href="https://linkedin.com/company/amperewalk-pvt-ltd/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-aw-lime hover:text-white transition-colors text-sm font-semibold"
    whileHover={{ x: 4 }}
  >
                LinkedIn <span aria-hidden="true">-&gt;</span>
              </motion.a>
            </div>
          </div>

          <div className="border-t border-white/15 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/65">
            <p>&copy; 2026 AmpereWalk Pvt. Ltd. | NextGen Shoes | All rights reserved.</p>
            <motion.div
    className="flex items-center gap-2"
    animate={{ opacity: [0.3, 0.7, 0.3] }}
    transition={{ duration: 3, repeat: Infinity }}
  >
              <Zap className="w-3 h-3 text-aw-green" />
              <span>Powered by every step</span>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>;
}
export {
  Layout
};
