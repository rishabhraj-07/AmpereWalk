import { Link } from "react-router";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Zap, Footprints, Battery, Leaf, ArrowRight, Award, Users, TrendingUp } from "lucide-react";
import heroShoeImage from "../../imports/Hero_shoe.png";
import { useRef, useState, useEffect } from "react";
import { useTilt, useParticles } from "../../hooks/useAnimations";
function AnimatedCounter({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!isInView) return;
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    let start = 0;
    const duration = 2200;
    const startTime = performance.now();
    const animate = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      const current = eased * numeric;
      const formatted = value.includes(",") ? Math.floor(current).toLocaleString() : current >= 100 ? Math.floor(current).toString() : current.toFixed(1);
      setDisplay(formatted + suffix);
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, suffix]);
  return <span ref={ref}>{display}</span>;
}
function TiltCard({ children, className }) {
  const ref = useTilt(10);
  return <div ref={ref} className={`relative ${className}`} style={{ transformStyle: "preserve-3d" }}>
      <div className="tilt-shine absolute inset-0 rounded-lg pointer-events-none opacity-0 transition-opacity duration-300 z-10" />
      {children}
    </div>;
}
function EnergyOrb({ size, color, delay, x, y }) {
  return <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, background: color, left: x, top: y, filter: `blur(${size / 3}px)` }}
    animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
    transition={{ duration: 6 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
  />;
}
function Home() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  useParticles(canvasRef);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const productSeries = [
    { icon: <Zap className="w-8 h-8" />, title: "Energy Series", description: "Charge devices on-the-go", color: "bg-aw-navy", accent: "#0D1B4B" },
    { icon: <Footprints className="w-8 h-8" />, title: "Fitness Series", description: "Track steps & activity", color: "bg-aw-green", accent: "#4CAF50" },
    { icon: <Battery className="w-8 h-8" />, title: "Adventure Series", description: "Rugged & waterproof", color: "bg-aw-teal", accent: "#00BCD4" }
  ];
  const stats = [
    { value: "10,000", suffix: "+", label: "Cycles Durability", icon: "\u26A1" },
    { value: "182.5", suffix: " kWh", label: "Lifetime Energy", icon: "\u{1F50B}" },
    { value: "12,166", suffix: "", label: "Phone Charges", icon: "\u{1F4F1}" }
  ];
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
  const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
  const fadeLeft = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
  return <div className="overflow-x-hidden">

      {
    /* ── HERO ─────────────────────────────────────────────────────────── */
  }
      <section ref={heroRef} className="relative bg-aw-navy text-white overflow-hidden min-h-[100vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-42"
          style={{ backgroundImage: `url(${heroShoeImage})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-aw-navy via-aw-navy/70 to-aw-navy/42" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-aw-navy/20 via-transparent to-aw-navy/48" aria-hidden="true" />
        {
    /* Particle canvas */
  }
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }} />

        {
    /* Floating orbs */
  }
        <EnergyOrb size={300} color="rgba(76,175,80,0.15)" delay={0} x="60%" y="10%" />
        <EnergyOrb size={200} color="rgba(0,188,212,0.2)" delay={2} x="80%" y="50%" />
        <EnergyOrb size={150} color="rgba(141,198,63,0.15)" delay={4} x="10%" y="70%" />

        {
    /* Animated grid lines */
  }
        <div className="absolute inset-0 pointer-events-none" style={{
    backgroundImage: `linear-gradient(rgba(76,175,80,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(76,175,80,0.05) 1px, transparent 1px)`,
    backgroundSize: "60px 60px"
  }} />

        <motion.div
    style={{ y: heroY, opacity: heroOpacity }}
    className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full"
  >
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {
    /* Hero Content */
  }
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
              <motion.div variants={fadeUp}>
                <motion.div
    className="inline-flex items-center gap-2 px-4 py-2 bg-aw-green/20 border border-aw-green/40 rounded-full backdrop-blur-sm"
    animate={{ boxShadow: ["0 0 0px rgba(76,175,80,0)", "0 0 20px rgba(76,175,80,0.3)", "0 0 0px rgba(76,175,80,0)"] }}
    transition={{ duration: 3, repeat: Infinity }}
  >
                  <motion.span
    className="w-2 h-2 bg-aw-green rounded-full"
    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
    transition={{ duration: 2, repeat: Infinity }}
  />
                  <p className="text-aw-green text-sm font-medium">NextGen Shoes by AmpereWalk Pvt. Ltd.</p>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h1 className="text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
                  <motion.span
    className="block text-white"
    initial={{ opacity: 0, x: -60 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.1 }}
  >
                    Ampere
                  </motion.span>
                  <motion.span
    className="block text-aw-green"
    initial={{ opacity: 0, x: 60 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.25 }}
    style={{ textShadow: "0 0 40px rgba(76,175,80,0.4)" }}
  >
                    Walk
                  </motion.span>
                </h1>
              </motion.div>

              <motion.p variants={fadeUp} className="text-2xl lg:text-3xl font-bold text-aw-lime tracking-wide">
                ACCELERATE ENERGY WITH EVERY STEP
              </motion.p>

              <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-xl leading-relaxed">
                Converting kinetic energy into usable electrical power. Smart footwear that generates electricity, tracks health, and empowers users wherever they go.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
    to="/products"
    className="group relative px-8 py-4 bg-aw-green text-white rounded-lg overflow-hidden flex items-center gap-2 font-semibold"
  >
                    <motion.span
    className="absolute inset-0 bg-aw-lime"
    initial={{ x: "-100%" }}
    whileHover={{ x: 0 }}
    transition={{ duration: 0.3 }}
  />
                    <span className="relative">Explore Products</span>
                    <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
    to="/about"
    className="px-8 py-4 border-2 border-white/30 text-white rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all font-semibold"
  >
                    Learn More
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {
    /* Hero Visual */
  }
            <motion.div
    initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="relative flex justify-center lg:justify-end"
    style={{ perspective: 1e3 }}
  >
              <div className="relative">
                {
    /* Rotating ring */
  }
                <motion.div
    className="absolute inset-0 rounded-3xl border border-aw-green/30"
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    style={{ scale: 1.05 }}
  />
                <motion.div
    className="absolute inset-0 rounded-3xl border border-aw-teal/20"
    animate={{ rotate: -360 }}
    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    style={{ scale: 1.1 }}
  />

                {
    /* Glow */
  }
                <motion.div
    className="absolute inset-0 bg-gradient-to-br from-aw-teal/30 to-aw-green/20 rounded-3xl blur-3xl"
    animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    style={{ scale: 1.2 }}
  />

                {/* <motion.img
    src={heroShoeImage}
    alt="AmpereWalk Smart Shoe"
    className="relative w-full max-w-4xl lg:max-w-5xl rounded-3xl object-contain drop-shadow-2xl"
    animate={{ y: [0, -12, 0] }}
    className="relative w-full max-w-4xl lg:max-w-5xl rounded-3xl drop-shadow-2xl"
    style={{ transform: "scale(1.5)" }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  /> */}
                <motion.img
    src={heroShoeImage}
    alt="AmpereWalk Smart Shoe"
    className="relative w-full max-w-4xl lg:max-w-5xl rounded-3xl object-contain drop-shadow-2xl"
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  />


                {
    /* Energy spark badge */
  }
                <motion.div
    className="absolute -top-4 -right-4 bg-aw-green text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
    initial={{ scale: 0, rotate: -20 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay: 1, type: "spring", stiffness: 300 }}
    whileHover={{ scale: 1.1, rotate: 5 }}
  >
                  ⚡ Live Generation
                </motion.div>
              </div>
            </motion.div>
          </div>

          {
    /* Stats Bar */
  }
          <motion.div
    variants={container}
    initial="hidden"
    animate="show"
    className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 border-t border-white/10 pt-12"
  >
            {stats.map((stat, i) => <motion.div key={i} variants={fadeUp} className="text-center group">
                <motion.div
    className="text-4xl mb-2"
    animate={{ rotate: [0, 10, -10, 0] }}
    transition={{ duration: 3, delay: i, repeat: Infinity }}
  >
                  {stat.icon}
                </motion.div>
                <p className="text-4xl lg:text-5xl font-black text-aw-green mb-2" style={{ fontVariantNumeric: "tabular-nums" }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/60 text-sm uppercase tracking-widest">{stat.label}</p>
              </motion.div>)}
          </motion.div>
        </motion.div>

        {
    /* Scroll indicator */
  }
        <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
    animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-aw-green rounded-full" />
          </div>
        </motion.div>
      </section>

      {
    /* ── PRODUCT SERIES ───────────────────────────────────────────────── */
  }
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7 }}
    className="text-center mb-20"
  >
            <p className="text-aw-green text-sm font-semibold uppercase tracking-widest mb-4">Our Products</p>
            <h2 className="text-5xl font-black text-aw-navy mb-6">Product Series</h2>
            <p className="text-lg text-aw-dark-gray max-w-2xl mx-auto">
              Engineered for different lifestyles, powered by the same revolutionary technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {productSeries.map((series, index) => <TiltCard key={index} className={`${series.color} text-white p-8 rounded-2xl cursor-default`}>
                <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ delay: index * 0.15, duration: 0.7 }}
  >
                  <motion.div
    className="mb-6 w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center"
    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
    transition={{ duration: 0.4 }}
  >
                    {series.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3">{series.title}</h3>
                  <p className="text-white/80 mb-6">{series.description}</p>
                  <motion.div
    className="flex items-center gap-2 text-sm font-semibold opacity-70 hover:opacity-100 transition-opacity"
    whileHover={{ x: 6 }}
  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              </TiltCard>)}
          </div>
        </div>
      </section>

      {
    /* ── HOW IT WORKS ─────────────────────────────────────────────────── */
  }
      <section className="py-28 bg-aw-light-gray relative overflow-hidden">
        {
    /* Decorative circuit lines */
  }
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5" preserveAspectRatio="none">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#4CAF50" strokeWidth="1" strokeDasharray="8 4" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#4CAF50" strokeWidth="1" strokeDasharray="8 4" />
        </svg>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.div
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
  >
                <p className="text-aw-green text-sm font-semibold uppercase tracking-widest mb-4">Technology</p>
                <h2 className="text-5xl font-black text-aw-navy mb-12">How It Works</h2>
              </motion.div>

              <div className="space-y-6 relative">
                {
    /* Vertical connector line */
  }
                <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-aw-green via-aw-teal to-transparent" />

                {[
    { step: "01", title: "Footstep Pressure", desc: "Mechanical pressure from walking activates our sensors" },
    { step: "02", title: "Piezo Transducers", desc: "Convert pressure to AC electricity efficiently" },
    { step: "03", title: "Power Management", desc: "Boost voltage & smart battery protection" },
    { step: "04", title: "USB/BLE Output", desc: "Charge devices & sync health data wirelessly" }
  ].map((item, index) => <motion.div
    key={index}
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.12, duration: 0.6 }}
    className="flex gap-5 items-start group relative"
  >
                    <motion.div
    className="flex-shrink-0 w-12 h-12 bg-aw-green text-white rounded-xl flex items-center justify-center font-black text-sm z-10 shadow-lg"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileInView={{ boxShadow: ["0 0 0 0 rgba(76,175,80,0)", "0 0 0 8px rgba(76,175,80,0.2)", "0 0 0 0 rgba(76,175,80,0)"] }}
    transition={{ delay: index * 0.3, duration: 1.5, repeat: Infinity }}
  >
                      {item.step}
                    </motion.div>
                    <div className="pt-1">
                      <h3 className="font-bold text-lg text-aw-navy group-hover:text-aw-green transition-colors">{item.title}</h3>
                      <p className="text-aw-dark-gray text-sm mt-1">{item.desc}</p>
                    </div>
                  </motion.div>)}
              </div>
            </div>

            {
    /* 3D Energy Display */
  }
            <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="relative"
    style={{ perspective: 1e3 }}
  >
              <motion.div
    animate={{ rotateY: [0, 8, -8, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    className="aspect-square bg-gradient-to-br from-aw-navy to-aw-teal rounded-3xl flex items-center justify-center relative overflow-hidden"
  >
                {
    /* Animated concentric rings */
  }
                {[1, 2, 3].map((ring) => <motion.div
    key={ring}
    className="absolute rounded-full border border-aw-green/20"
    style={{ inset: `${ring * 15}%` }}
    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 2 + ring, repeat: Infinity, delay: ring * 0.5 }}
  />)}

                {
    /* Central content */
  }
                <div className="text-center text-white relative z-10">
                  <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 3, repeat: Infinity }}
  >
                    <Battery className="w-20 h-20 mx-auto mb-6 text-aw-green" />
                  </motion.div>
                  <p className="text-base font-semibold text-white/70 mb-2">Lifetime Energy Potential</p>
                  <motion.p
    className="text-5xl font-black text-aw-lime"
    animate={{ textShadow: ["0 0 10px rgba(141,198,63,0)", "0 0 30px rgba(141,198,63,0.5)", "0 0 10px rgba(141,198,63,0)"] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
                    ~182.5 kWh
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {
    /* ── IMPACT SECTION ───────────────────────────────────────────────── */
  }
      <section className="py-28 bg-aw-navy text-white relative overflow-hidden">
        <EnergyOrb size={400} color="rgba(76,175,80,0.08)" delay={0} x="70%" y="20%" />
        <EnergyOrb size={300} color="rgba(0,188,212,0.06)" delay={3} x="-5%" y="60%" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-20"
  >
            <p className="text-aw-green text-sm font-semibold uppercase tracking-widest mb-4">Why It Matters</p>
            <h2 className="text-5xl font-black mb-6">Our Impact</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">Building technology that solves real-world problems</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
    { icon: <Leaf className="w-10 h-10" />, title: "Sustainability", desc: "Zero emissions, eco-friendly energy generation from human motion", color: "aw-green" },
    { icon: <Users className="w-10 h-10" />, title: "Accessibility", desc: "Solving energy poverty for 600M+ people globally", color: "aw-teal" },
    { icon: <TrendingUp className="w-10 h-10" />, title: "Innovation", desc: "Pioneering piezoelectric energy harvesting at consumer scale", color: "aw-lime" }
  ].map((impact, index) => <motion.div
    key={index}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15, duration: 0.7 }}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className="text-center p-8 rounded-2xl border border-white/10 hover:border-aw-green/40 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm cursor-default"
  >
                <motion.div
    className={`inline-flex items-center justify-center w-20 h-20 bg-aw-green/20 text-aw-green rounded-2xl mb-6`}
    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
    transition={{ duration: 0.4 }}
  >
                  {impact.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{impact.title}</h3>
                <p className="text-white/60 leading-relaxed">{impact.desc}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {
    /* ── CTA SECTION ──────────────────────────────────────────────────── */
  }
      <section className="py-28 bg-aw-green text-white relative overflow-hidden">
        <motion.div
    className="absolute inset-0"
    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    style={{
      background: "linear-gradient(135deg, #4CAF50, #00BCD4, #8DC63F, #4CAF50)",
      backgroundSize: "300% 300%"
    }}
  />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center z-10">
          <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
  >
            <motion.div
    animate={{ rotate: [0, 5, -5, 0] }}
    transition={{ duration: 4, repeat: Infinity }}
  >
              <Award className="w-16 h-16 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-5xl font-black mb-6">Join the Energy Revolution</h2>
            <p className="text-xl mb-10 text-white/90">Every step counts. Start powering your life today.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
    to="/products"
    className="px-10 py-4 bg-white text-aw-green rounded-xl hover:shadow-2xl transition-all font-bold text-lg"
  >
                  View Products
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
    to="/contact"
    className="px-10 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all font-bold text-lg"
  >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>;
}
export {
  Home
};