import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Zap, Footprints, Shield, Mountain, Wrench,
  Baby, User, Bike, Globe, CheckCircle2, ChevronRight, ArrowRight,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import img23 from "../../imports/img23.jpg";
import img33 from "../../imports/img33.jpg";
import img36 from "../../imports/img36.jpg";
import img40 from "../../imports/img40.jpg";
import img43 from "../../imports/img43.jpg";
import { useTilt, useParticles } from "../../hooks/useAnimations";

const ease = [0.22, 1, 0.36, 1] as const;

// ─── 3D Tilt Card ──────────────────────────────────────────────────────────
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useTilt(12);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="tilt-shine absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-300 z-10" />
      {children}
    </div>
  );
}

// ─── Floating Orb ──────────────────────────────────────────────────────────
function Orb({ size, color, x, y, delay }: { size: number; color: string; x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, background: color, left: x, top: y, filter: `blur(${size / 2.5}px)` }}
      animate={{ y: [0, -30, 0], scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 7 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

// ─── 3D Rotating Tech Ring ─────────────────────────────────────────────────
function TechRing({ label, value, color, angle }: { label: string; value: string; color: string; angle: number }) {
  return (
    <motion.div
      className="absolute flex flex-col items-center justify-center"
      style={{
        width: 90, height: 90,
        left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 130}px - 45px)`,
        top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 130}px - 45px)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: angle / 360, duration: 0.6, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.15 }}
    >
      <div className={`w-full h-full rounded-full border-2 ${color} flex flex-col items-center justify-center bg-aw-navy/80 backdrop-blur-sm`}>
        <span className="text-white font-black text-sm leading-none">{value}</span>
        <span className="text-white/50 text-[9px] text-center leading-tight mt-0.5 px-1">{label}</span>
      </div>
    </motion.div>
  );
}

// ─── Product Series Data ───────────────────────────────────────────────────
const productSeries = [
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Energy Series",
    tagline: "Charge Devices On-the-Go",
    description: "Convert every step into power for your devices. Perfect for daily commuters and urban professionals who need reliable on-the-go charging.",
    features: ["USB-C charging output", "500mAh integrated battery", "3–5 hours charging from a full day's walk", "Real-time power generation display"],
    color: "bg-aw-navy", textColor: "text-aw-navy", borderColor: "border-aw-navy",
    glowColor: "rgba(13,27,75,0.6)", accentHex: "#0D1B4B",
  },
  {
    icon: <Footprints className="w-7 h-7" />,
    title: "Fitness Series",
    tagline: "Track Steps & Activity",
    description: "Health monitoring meets energy generation. Track your fitness while powering your devices with every stride.",
    features: ["Step counter & distance tracker", "Calorie burn estimation", "BLE sync with mobile app", "7-day activity history"],
    color: "bg-aw-green", textColor: "text-aw-green", borderColor: "border-aw-green",
    glowColor: "rgba(76,175,80,0.6)", accentHex: "#4CAF50",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Safety Series",
    tagline: "GPS & Emergency Alerts",
    description: "Keep your loved ones safe with real-time GPS tracking and emergency SOS features built directly into the footwear.",
    features: ["Real-time GPS tracking", "SOS emergency button", "Geo-fencing alerts", "Parent mobile app integration"],
    color: "bg-[#9C27B0]", textColor: "text-[#9C27B0]", borderColor: "border-[#9C27B0]",
    glowColor: "rgba(156,39,176,0.6)", accentHex: "#9C27B0",
  },
  {
    icon: <Mountain className="w-7 h-7" />,
    title: "Adventure Series",
    tagline: "Rugged & Waterproof",
    description: "Built for outdoor enthusiasts. Waterproof, durable, and perfect for off-grid adventures where power outlets don't exist.",
    features: ["IP67 waterproof rating", "Reinforced toe & heel protection", "Extended battery capacity", "Extreme temperature resistant"],
    color: "bg-aw-teal", textColor: "text-aw-teal", borderColor: "border-aw-teal",
    glowColor: "rgba(0,188,212,0.6)", accentHex: "#00BCD4",
  },
  {
    icon: <Wrench className="w-7 h-7" />,
    title: "Professional Series",
    tagline: "Built for Hard Workers",
    description: "Designed for professionals who are on their feet all day. Maximum durability, comfort, and safety compliance.",
    features: ["Industrial-grade materials", "All-day comfort padding", "Anti-slip sole technology", "15,000+ cycle durability"],
    color: "bg-aw-dark-gray", textColor: "text-aw-dark-gray", borderColor: "border-aw-dark-gray",
    glowColor: "rgba(66,66,66,0.6)", accentHex: "#424242",
  },
];

const specs = [
  { label: "Energy per Step", value: "0.3–5J", sub: "3J target" },
  { label: "Battery Capacity", value: "500mAh", sub: "Li-Po @ 3.7V" },
  { label: "Output Port", value: "USB-C", sub: "& USB-A" },
  { label: "Connectivity", value: "BLE", sub: "ESP32" },
  { label: "Durability", value: "10K+", sub: "cycles" },
  { label: "Lifetime", value: "182.5", sub: "kWh potential" },
];

const targetMarkets = [
  { icon: <Baby className="w-8 h-8" />, title: "Children", description: "GPS tracking, safety alerts, geo-fencing, parental peace of mind." },
  { icon: <User className="w-8 h-8" />, title: "Adults", description: "On-the-go device charging, health monitoring, fitness tracking." },
  { icon: <Bike className="w-8 h-8" />, title: "Outdoor Enthusiasts", description: "Reliable off-grid power for hikers, campers, and trekkers." },
  { icon: <Globe className="w-8 h-8" />, title: "Underserved Communities", description: "Energy access for remote areas without reliable charging infrastructure." },
];

// ─── 3D Flip Product Card ──────────────────────────────────────────────────
function FlipCard({ product, index }: { product: typeof productSeries[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // mouse-track tilt only on front face when not flipped
  useEffect(() => {
    const el = ref.current;
    if (!el || flipped) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
      el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.04,1.04,1.04)`;
      el.style.transition = "transform 0.1s ease-out";
      const shine = el.querySelector<HTMLElement>(".card-shine");
      if (shine) {
        const angle = Math.atan2(e.clientY - rect.top - rect.height / 2, e.clientX - rect.left - rect.width / 2) * (180 / Math.PI);
        shine.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.18) 0%, transparent 60%)`;
        shine.style.opacity = "1";
      }
    };
    const handleLeave = () => {
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
      el.style.transition = "transform 0.7s cubic-bezier(0.22,1,0.36,1)";
      const shine = el.querySelector<HTMLElement>(".card-shine");
      if (shine) shine.style.opacity = "0";
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => { el.removeEventListener("mousemove", handleMove); el.removeEventListener("mouseleave", handleLeave); };
  }, [flipped]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease }}
      className="cursor-pointer"
      style={{ perspective: 900 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        ref={ref}
        style={{ transformStyle: "preserve-3d", transition: flipped ? "transform 0.7s cubic-bezier(0.22,1,0.36,1)" : undefined,
          transform: flipped ? "perspective(900px) rotateY(180deg)" : undefined }}
        className="relative h-80"
      >
        {/* ── FRONT ─────────────────────────────────────────── */}
        <div
          className={`absolute inset-0 ${product.color} rounded-2xl overflow-hidden flex flex-col justify-between p-7`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Animated shine overlay */}
          <div className="card-shine absolute inset-0 rounded-2xl pointer-events-none opacity-0 z-10 transition-opacity duration-200" />

          {/* Animated grid bg */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }} />

          {/* Glow orb */}
          <motion.div
            className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent)" }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
          />

          <div className="relative z-10">
            <motion.div
              className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-5 text-white"
              animate={{ rotateY: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: index * 0.4 }}
            >
              {product.icon}
            </motion.div>
            <h3 className="text-2xl font-black text-white mb-1">{product.title}</h3>
            <p className="text-white/70 text-sm">{product.tagline}</p>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <p className="text-white/50 text-xs uppercase tracking-widest">Tap to explore</p>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5 text-white/60" />
            </motion.div>
          </div>

          {/* Animated border sweep */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/0"
            whileHover={{ borderColor: "rgba(255,255,255,0.3)" }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* ── BACK ──────────────────────────────────────────── */}
        <div
          className="absolute inset-0 bg-white rounded-2xl overflow-hidden flex flex-col p-7"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className={`w-10 h-10 ${product.color} rounded-lg flex items-center justify-center text-white mb-4`}>
            {product.icon}
          </div>
          <h3 className={`text-lg font-black ${product.textColor} mb-3`}>{product.title}</h3>
          <p className="text-aw-dark-gray text-sm mb-4 leading-relaxed">{product.description}</p>
          <ul className="space-y-2 flex-1">
            {product.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-aw-dark-gray">
                <CheckCircle2 className={`w-3.5 h-3.5 ${product.textColor} flex-shrink-0`} />
                {f}
              </li>
            ))}
          </ul>
          <p className="text-xs text-aw-dark-gray/50 mt-3 text-center">Tap to flip back</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── 3D Spec Cube ──────────────────────────────────────────────────────────
function SpecCube({ spec, index }: { spec: typeof specs[0]; index: number }) {
  const ref = useTilt(15);
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 40, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.7, ease }}
      style={{ transformStyle: "preserve-3d", perspective: 600 }}
      className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm overflow-hidden group cursor-default"
    >
      {/* Animated glow bg */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-aw-green/5 to-aw-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
      />
      {/* Left accent bar that grows on hover */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-aw-green rounded-l-2xl"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 + 0.3, duration: 0.5, ease }}
        style={{ transformOrigin: "top" }}
      />
      <div className="relative z-10 pl-2">
        <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest">{spec.label}</p>
        <motion.p
          className="text-3xl font-black text-aw-navy"
          style={{ transform: "translateZ(20px)" }}
        >
          {spec.value}
        </motion.p>
        <p className="text-xs text-aw-green font-semibold mt-1">{spec.sub}</p>
      </div>
    </motion.div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export function Products() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef as React.RefObject<HTMLCanvasElement>);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // 3D rotating orbit for the "technology" section
  const orbitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: orbitProgress } = useScroll({ target: orbitRef, offset: ["start end", "end start"] });
  const orbitRotate = useTransform(orbitProgress, [0, 1], [0, 360]);

  const keyBenefits = [
    { label: "Impact Resistant", sub: "Durability" },
    { label: "Waterproof", sub: "Moisture Protection" },
    { label: "Ergonomic Design", sub: "Long-Wear Comfort" },
    { label: "10,000+ Cycles", sub: "Long Life" },
  ];

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative bg-aw-navy text-white min-h-screen flex items-center overflow-hidden">
        {/* Particle network */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" />

        {/* Floating orbs */}
        <Orb size={350} color="rgba(76,175,80,0.15)" x="55%" y="5%" delay={0} />
        <Orb size={220} color="rgba(0,188,212,0.2)" x="75%" y="55%" delay={2.5} />
        <Orb size={180} color="rgba(141,198,63,0.12)" x="5%" y="65%" delay={4} />

        {/* Animated grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(76,175,80,0.04) 1px, transparent 1px), linear-gradient(90deg,rgba(76,175,80,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full py-28"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-aw-teal/20 text-aw-teal px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-aw-teal/30"
              >
                <motion.span
                  className="w-1.5 h-1.5 bg-aw-teal rounded-full"
                  animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                AmpereWalk Smart Shoes
              </motion.span>

              <motion.h1
                className="text-6xl lg:text-7xl font-black mb-8 leading-[0.92]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {["Shoes That", "Work", "While You", "Walk"].map((word, i) => (
                  <motion.span
                    key={i}
                    className={`block ${i === 1 ? "text-aw-green" : i === 3 ? "text-aw-teal" : "text-white"}`}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.8, ease }}
                    style={i === 1 ? { textShadow: "0 0 40px rgba(76,175,80,0.4)" } : undefined}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                className="text-lg text-white/60 mb-10 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.7 }}
              >
                Five intelligent product series engineered for different lifestyles — all powered by the same revolutionary kinetic energy harvesting technology.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {["Generate Electricity", "Track Health", "Stay Safe"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="flex items-center gap-1.5 bg-white/8 border border-white/10 px-4 py-2 rounded-full text-sm text-white/80 backdrop-blur-sm"
                    whileHover={{ scale: 1.06, background: "rgba(76,175,80,0.15)", borderColor: "rgba(76,175,80,0.4)" }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    // @ts-ignore
                    style={{ "--tw-bg-opacity": 0.08 }}
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-aw-green" />
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* 3D Hero Image */}
            <motion.div
              initial={{ opacity: 0, rotateY: -25, scale: 0.85 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease }}
              style={{ perspective: 1000 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative" style={{ perspective: 1000 }}>
                {/* Rotating rings */}
                {[1.08, 1.16, 1.24].map((scale, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-3xl border border-aw-green/20"
                    style={{ scale }}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 18 + i * 8, repeat: Infinity, ease: "linear" }}
                  />
                ))}

                {/* Glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{ background: "radial-gradient(circle, rgba(76,175,80,0.25), transparent 70%)", scale: 1.3 }}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Image with float */}
                <motion.img
                  src={img23}
                  alt="AmpereWalk Smart Shoe"
                  className="relative w-full max-w-lg rounded-3xl object-cover shadow-2xl z-10"
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: "drop-shadow(0 30px 60px rgba(76,175,80,0.2))" }}
                />

                {/* Floating badge */}
                <motion.div
                  className="absolute -top-4 -right-4 z-20 bg-aw-green text-white px-4 py-2 rounded-full text-xs font-black shadow-lg"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  ⚡ 5 Series
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 z-20 bg-aw-teal text-white px-4 py-2 rounded-full text-xs font-black shadow-lg"
                  initial={{ scale: 0, rotate: 20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.5, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  🔋 182.5 kWh
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-aw-green rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ── COMPLETE RANGE — Full image reveal ─────────────────────────── */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="text-aw-green text-xs font-bold uppercase tracking-widest mb-4">Full Range</p>
            <h2 className="text-5xl font-black text-aw-navy mb-4">
              The Complete <span className="text-aw-green">Product Range</span>
            </h2>
            <p className="text-lg text-aw-dark-gray max-w-2xl mx-auto">
              Range of Smart Shoes with Task-Specific Intelligent Features for Every Need
            </p>
          </motion.div>

          {/* 3D tilted image reveal */}
          <motion.div
            initial={{ opacity: 0, rotateX: 20, y: 60 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            style={{ perspective: 1200 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 relative group"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease }}
              className="relative"
            >
              <img src={img43} alt="All 5 Product Series" className="w-full object-cover" />
              {/* Hover overlay with shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 group-hover:opacity-100"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FLIP CARDS — 5 Series ──────────────────────────────────────── */}
      <section className="py-28 bg-aw-light-gray relative overflow-hidden">
        {/* Decorative circuit lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" preserveAspectRatio="none">
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#4CAF50" strokeWidth="1" strokeDasharray="10 6" />
          <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#4CAF50" strokeWidth="1" strokeDasharray="10 6" />
          <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#4CAF50" strokeWidth="1" strokeDasharray="10 6" />
          <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#4CAF50" strokeWidth="1" strokeDasharray="10 6" />
        </svg>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-aw-green text-xs font-bold uppercase tracking-widest mb-4">Tap Any Card</p>
            <h2 className="text-5xl font-black text-aw-navy mb-4">
              Explore Each <span className="text-aw-green">Series</span>
            </h2>
            <p className="text-aw-dark-gray">Hover to see the 3D effect · Tap to flip and discover features</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productSeries.map((product, index) => (
              <FlipCard key={index} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SMART SHOES SOLUTION — side-by-side with parallax ─────────── */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <p className="text-aw-green text-xs font-bold uppercase tracking-widest mb-5">The Solution</p>
            <h2 className="text-5xl font-black text-aw-navy mb-7 leading-tight">
              AmpereWalk Smart Shoes
            </h2>
            <p className="text-aw-dark-gray mb-10 leading-relaxed">
              Smart shoes that generate electricity with each step, solving durability, moisture protection, impact resistance, and long-wear comfort — all while harvesting renewable energy.
            </p>
            <div className="space-y-6">
              {[
                { title: "Generates Usable Electricity", desc: "Converts human motion into electricity to charge small devices like phones, smartwatches or GPS trackers." },
                { title: "Eco-Friendly Energy Harvesting", desc: "Electricity generated by the wearer is cost-effective and environmentally friendly." },
                { title: "Rugged & Comfortable Design", desc: "Long-lasting, impact-resistant, and moisture-protected for extended wear." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease }}
                  className="flex gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 12 }}
                    transition={{ duration: 0.25 }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-aw-green flex-shrink-0 mt-0.5" />
                  </motion.div>
                  <div>
                    <p className="font-bold text-aw-navy group-hover:text-aw-green transition-colors">{item.title}</p>
                    <p className="text-aw-dark-gray text-sm mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3D floating image */}
          <motion.div
            initial={{ opacity: 0, rotateY: 20, x: 60 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            style={{ perspective: 1000 }}
            className="relative"
          >
            <TiltCard className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={img33} alt="AmpereWalk Smart Shoes Solution" className="w-full object-cover" />
            </TiltCard>
            {/* Decorative dot grid */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 pointer-events-none opacity-20" style={{
              backgroundImage: "radial-gradient(circle, #4CAF50 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }} />
          </motion.div>
        </div>
      </section>

      {/* ── POWER YOUR JOURNEY image + benefits ────────────────────────── */}
      <section className="py-28 bg-aw-light-gray overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-5xl font-black text-aw-navy mb-4">
              Smart Shoes That{" "}
              <span className="text-aw-green">Power Your Journey</span>
            </h2>
            <p className="text-lg text-aw-dark-gray">Generate Electricity · Track · Stay Fit & Safe</p>
          </motion.div>

          {/* Image with 3D lift */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            style={{ perspective: 1200 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 mb-16 group relative"
          >
            <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.5, ease }}>
              <img src={img36} alt="Smart Shoes That Power Your Journey" className="w-full object-cover" />
            </motion.div>
            {/* Bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-aw-navy/30 to-transparent pointer-events-none" />
          </motion.div>

          {/* 3D benefit cubes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {keyBenefits.map((b, i) => {
              const ref = useTilt(18);
              return (
                <motion.div
                  key={b.label}
                  ref={ref as React.RefObject<HTMLDivElement>}
                  initial={{ opacity: 0, y: 30, rotateY: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease }}
                  style={{ transformStyle: "preserve-3d", perspective: 600 }}
                  className="relative bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm cursor-default group overflow-hidden"
                >
                  <div className="tilt-shine absolute inset-0 rounded-2xl pointer-events-none opacity-0 z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-aw-green/5 to-aw-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  />
                  <motion.p
                    className="font-black text-aw-navy mb-1 relative z-10"
                    style={{ transform: "translateZ(15px)" }}
                  >
                    {b.label}
                  </motion.p>
                  <p className="text-xs text-aw-green font-semibold relative z-10">{b.sub}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY — 3D Orbit + Image ──────────────────────────────── */}
      <section className="py-28 bg-white overflow-hidden" ref={orbitRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-aw-teal text-xs font-bold uppercase tracking-widest mb-4">How It Works</p>
            <h2 className="text-5xl font-black text-aw-navy mb-4">
              Technology That Converts{" "}
              <span className="text-aw-teal">Steps into Power</span>
            </h2>
          </motion.div>

          {/* 3D image */}
          <motion.div
            initial={{ opacity: 0, rotateX: 20, y: 60 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            style={{ perspective: 1200 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 mb-16 relative group"
          >
            <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.5, ease }}>
              <img src={img40} alt="Steps into Power" className="w-full object-cover" />
            </motion.div>
          </motion.div>

          {/* 3D tech step cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Kinetic Capture", desc: "Embedded piezoelectric sensors generate electricity from every movement.", color: "text-aw-teal", border: "border-aw-teal", bg: "bg-aw-teal" },
              { step: "02", title: "Energy Storage", desc: "Stored in a built-in mini battery or capacitor for immediate or later use.", color: "text-aw-green", border: "border-aw-green", bg: "bg-aw-green" },
              { step: "03", title: "Power Output", desc: "USB/Type-C charging port in the shoe's heel or tongue delivers power.", color: "text-aw-navy", border: "border-aw-navy", bg: "bg-aw-navy" },
            ].map((step, i) => {
              const ref = useTilt(14);
              return (
                <motion.div
                  key={step.step}
                  ref={ref as React.RefObject<HTMLDivElement>}
                  initial={{ opacity: 0, y: 50, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.8, ease }}
                  style={{ transformStyle: "preserve-3d", perspective: 800 }}
                  className={`relative bg-aw-light-gray p-7 rounded-2xl border-l-4 ${step.border} overflow-hidden group cursor-default`}
                >
                  <div className="tilt-shine absolute inset-0 rounded-2xl pointer-events-none opacity-0 z-10" />

                  {/* Animated counter number that sweeps in */}
                  <motion.div
                    className={`text-6xl font-black ${step.color} mb-4 opacity-20`}
                    style={{ transform: "translateZ(10px)" }}
                    whileInView={{ opacity: [0, 0.3, 0.2] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.4 }}
                  >
                    {step.step}
                  </motion.div>

                  {/* Icon dot */}
                  <motion.div
                    className={`w-10 h-10 ${step.bg} rounded-lg flex items-center justify-center mb-4`}
                    style={{ transform: "translateZ(20px)" }}
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Zap className="w-5 h-5 text-white" />
                  </motion.div>

                  <h3 className={`font-black text-aw-navy mb-2 text-lg ${step.color} group-hover:${step.color}`}
                    style={{ transform: "translateZ(15px)" }}>
                    {step.title}
                  </h3>
                  <p className="text-aw-dark-gray text-sm leading-relaxed" style={{ transform: "translateZ(8px)" }}>
                    {step.desc}
                  </p>

                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TECH SPECS — 3D Spec Grid ──────────────────────────────────── */}
      <section className="py-28 bg-aw-light-gray relative overflow-hidden">
        <Orb size={300} color="rgba(76,175,80,0.07)" x="80%" y="10%" delay={0} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-aw-green text-xs font-bold uppercase tracking-widest mb-4">Under the Hood</p>
            <h2 className="text-5xl font-black text-aw-navy mb-4">Technical Specifications</h2>
            <p className="text-aw-dark-gray">Core technology across all product series</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {specs.map((spec, i) => <SpecCube key={i} spec={spec} index={i} />)}
          </div>

          {/* Lifetime energy hero block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            style={{ perspective: 800 }}
            className="relative overflow-hidden"
          >
            <TiltCard className="bg-gradient-to-br from-aw-green to-aw-teal text-white p-10 rounded-3xl text-center shadow-2xl">
              {/* Animated rings */}
              {[1.05, 1.12].map((s, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-3xl border border-white/10"
                  style={{ scale: s }}
                  animate={{ rotate: i === 0 ? 360 : -360 }}
                  transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
                />
              ))}
              <div className="relative z-10">
                <p className="text-white/70 text-sm uppercase tracking-widest mb-3">Lifetime Energy Potential</p>
                <motion.p
                  className="text-7xl font-black mb-2"
                  animate={{ textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 30px rgba(255,255,255,0.3)", "0 0 0px rgba(255,255,255,0)"] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  ~182.5 kWh
                </motion.p>
                <p className="text-white/80 text-lg">Approximately 12,166 smartphone charges per person</p>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ── WHO WE SERVE — 3D Hover Cards ─────────────────────────────── */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-aw-green text-xs font-bold uppercase tracking-widest mb-4">Our Customers</p>
            <h2 className="text-5xl font-black text-aw-navy mb-4">Who We Serve</h2>
            <p className="text-aw-dark-gray">Solutions for diverse user needs</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {targetMarkets.map((market, index) => {
              const ref = useTilt(16);
              return (
                <motion.div
                  key={index}
                  ref={ref as React.RefObject<HTMLDivElement>}
                  initial={{ opacity: 0, y: 50, scale: 0.88 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.8, ease }}
                  style={{ transformStyle: "preserve-3d", perspective: 700 }}
                  className="relative bg-aw-light-gray p-7 rounded-2xl text-center group cursor-default overflow-hidden"
                >
                  <div className="tilt-shine absolute inset-0 rounded-2xl pointer-events-none opacity-0 z-10" />

                  {/* Hover background sweep */}
                  <motion.div
                    className="absolute inset-0 bg-aw-navy opacity-0 group-hover:opacity-100 transition-opacity duration-350 rounded-2xl"
                  />

                  <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-aw-green text-white rounded-2xl mb-5 group-hover:bg-white group-hover:text-aw-green transition-colors duration-350"
                      animate={{ rotateY: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.6 }}
                    >
                      {market.icon}
                    </motion.div>
                    <h3 className="text-lg font-black text-aw-navy mb-3 group-hover:text-white transition-colors duration-350">
                      {market.title}
                    </h3>
                    <p className="text-aw-dark-gray group-hover:text-white/70 text-sm leading-relaxed transition-colors duration-350">
                      {market.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-28 bg-aw-navy text-white relative overflow-hidden">
        <Orb size={400} color="rgba(76,175,80,0.1)" x="20%" y="10%" delay={0} />
        <Orb size={300} color="rgba(0,188,212,0.08)" x="70%" y="40%" delay={2} />

        {/* Animated diagonal grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(76,175,80,1) 1px, transparent 1px), linear-gradient(90deg,rgba(76,175,80,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            {/* 3D spinning shoe icon */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-aw-green/20 rounded-2xl mb-8 border border-aw-green/30"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ perspective: 400 }}
            >
              <Zap className="w-10 h-10 text-aw-green" />
            </motion.div>

            <h2 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Ready to Power <br />
              <motion.span
                className="text-aw-green"
                animate={{ textShadow: ["0 0 0px rgba(76,175,80,0)", "0 0 30px rgba(76,175,80,0.5)", "0 0 0px rgba(76,175,80,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                Your Steps?
              </motion.span>
            </h2>
            <p className="text-xl text-white/60 mb-12">
              Explore our product series and find the perfect fit for your lifestyle
            </p>
            <div className="flex flex-wrap gap-5 justify-center">
              <motion.button
                className="relative px-10 py-4 bg-aw-green text-white rounded-xl font-bold text-lg overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  className="absolute inset-0 bg-aw-lime"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative">Contact Sales</span>
              </motion.button>
              <motion.button
                className="px-10 py-4 border-2 border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/10 backdrop-blur-sm transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}