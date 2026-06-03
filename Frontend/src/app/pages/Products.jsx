import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import {
  Activity,
  ArrowRight,
  Baby,
  Bike,
  CheckCircle2,
  ChevronRight,
  Footprints,
  Globe,
  Mountain,
  Shield,
  User,
  Wrench,
  Zap
} from "lucide-react";
import { useRef, useState } from "react";
import heroShoe from "../../assets/products/hero-shoe.png";
import energySeriesShoe from "../../assets/products/energy-series-shoe.png";
import fitnessSeriesShoe from "../../assets/products/fitness-series-shoe.png";
import safetySeriesShoe from "../../assets/products/safety-series-shoe.png";
import adventureSeriesShoe from "../../assets/products/adventure-series-shoe.png";
import professionalSeriesShoe from "../../assets/products/professional-series-shoe.png";
import solutionShoe from "../../assets/products/solution-shoe.png";
import technologyShoe from "../../assets/products/technology-shoe.png";
import { useTilt, useParticles } from "../../hooks/useAnimations";

const ease = [0.22, 1, 0.36, 1];

function TiltCard({ children, className }) {
  const ref = useTilt(12);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ transformStyle: "preserve-3d" }}>
      <div className="tilt-shine absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 transition-opacity duration-300 z-10" />
      {children}
    </div>
  );
}

function Orb({ size, color, x, y, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, background: color, left: x, top: y, filter: `blur(${size / 2.5}px)` }}
      animate={{ y: [0, -30, 0], scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 7 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function RotatableShoe({ src, alt, glowColor, className = "", imageStyle = {}, float = true }) {
  const [rotation, setRotation] = useState({ x: -4, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOrigin, setDragOrigin] = useState(null);

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
    setDragOrigin({
      x: event.clientX,
      y: event.clientY,
      rotateX: rotation.x,
      rotateY: rotation.y
    });
  };

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    if (isDragging && dragOrigin) {
      const deltaX = event.clientX - dragOrigin.x;
      const deltaY = event.clientY - dragOrigin.y;

      setRotation({
        x: clamp(dragOrigin.rotateX - deltaY * 0.12, -28, 28),
        y: clamp(dragOrigin.rotateY + deltaX * 0.18, -55, 55)
      });
      return;
    }

    const pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
    const pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * -18;

    setRotation({
      x: clamp(pointerY, -18, 18),
      y: clamp(pointerX, -24, 24)
    });
  };

  const shineX = 50 + rotation.y * 1.2;
  const shineY = 42 - rotation.x * 1.4;

  const handlePointerUp = (event) => {
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setIsDragging(false);
    setDragOrigin(null);
  };

  const handlePointerLeave = () => {
    if (!isDragging) {
      setRotation({ x: -4, y: 0 });
    }
  };

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center select-none touch-none ${isDragging ? "cursor-grabbing" : "cursor-grab"} ${className}`}
      style={{ perspective: 1200 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="relative flex h-full w-full items-center justify-center"
        animate={isDragging ? void 0 : { y: float ? [0, -10, 0] : 0 }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          rotateZ: rotation.y * 0.02,
          scale: isDragging ? 1.02 : 1,
          transformStyle: "preserve-3d",
          willChange: "transform"
        }}
      >
        <motion.div
          className="absolute inset-x-[18%] bottom-[8%] h-8 rounded-full blur-2xl opacity-70"
          style={{
            background: `radial-gradient(circle, ${glowColor}, transparent 72%)`,
            transform: "translateZ(6px)"
          }}
          animate={isDragging ? void 0 : { scaleX: [0.9, 1.08, 0.9], opacity: [0.45, 0.72, 0.45] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <img
          src={src}
          alt={alt}
          draggable="false"
          className="block object-contain"
          style={{
            width: "88%",
            maxWidth: "34rem",
            maxHeight: "88%",
            height: "auto",
            filter: `drop-shadow(0 28px 48px rgba(0,0,0,0.35)) drop-shadow(0 0 24px ${glowColor})`,
            transform: "translateZ(24px)",
            ...imageStyle
          }}
        />
        <div
          className="pointer-events-none absolute inset-[12%] rounded-[2rem] mix-blend-screen opacity-60"
          style={{
            background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.28), transparent 24%)`,
            transform: "translateZ(18px)"
          }}
        />
        <div
          className="pointer-events-none absolute inset-[18%] rounded-[2.25rem] border border-white/10"
          style={{ transform: "translateZ(14px)" }}
        />
      </motion.div>
    </div>
  );
}

function MagneticGlassButton({ children, active, accentClass, onClick }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    setOffset({ x, y });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      animate={{ x: offset.x, y: offset.y, scale: active ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 18, mass: 0.5 }}
      className={`group relative overflow-hidden rounded-full border px-5 py-3 text-sm font-semibold backdrop-blur-xl transition-colors duration-300 ${
        active
          ? `${accentClass} text-white border-white/10 shadow-[0_12px_30px_rgba(15,23,42,0.18)]`
          : "bg-white/55 text-aw-navy border-white/60 shadow-[0_12px_30px_rgba(15,23,42,0.08)] hover:bg-white/75"
      }`}
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.45),rgba(255,255,255,0.1))]" />
      <span className="pointer-events-none absolute inset-[1px] rounded-full border border-white/30" />
      <motion.span
        className="pointer-events-none absolute -inset-x-8 top-0 h-full bg-gradient-to-r from-transparent via-white/45 to-transparent"
        initial={{ x: "-120%" }}
        whileHover={{ x: "120%" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

const productSeries = [
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Energy Series",
    tagline: "Walk, charge, keep moving",
    description: "A commuter-ready line that turns everyday motion into practical backup power for phones, earbuds, and small wearables.",
    features: ["USB-C quick top-up output", "Power reserve indicator", "Responsive cushioning for long commutes", "Balanced daily-wear profile"],
    color: "bg-aw-navy",
    textColor: "text-aw-navy",
    borderColor: "border-aw-navy",
    accentBg: "bg-aw-navy/10",
    glowColor: "rgba(13,27,75,0.45)",
    accentHex: "#0D1B4B",
    badge: "Daily charging",
    stat: "City motion, usable power",
    audience: "Best for urban professionals and students",
    spotlight: "Built for urban commuters who want practical backup power in a sleek, everyday silhouette.",
    shoeImage: energySeriesShoe
  },
  {
    icon: <Footprints className="w-7 h-7" />,
    title: "Fitness Series",
    tagline: "Performance with live wellness feedback",
    description: "A lighter silhouette built for training days, recovery walks, and users who want activity insights without giving up a premium look.",
    features: ["Stride and activity tracking", "Comfort foam for high repetition use", "Companion app sync", "Form-focused ergonomic fit"],
    color: "bg-aw-green",
    textColor: "text-aw-green",
    borderColor: "border-aw-green",
    accentBg: "bg-aw-green/10",
    glowColor: "rgba(76,175,80,0.45)",
    accentHex: "#4CAF50",
    badge: "Fitness insight",
    stat: "Training-ready energy return",
    audience: "Best for runners, walkers, and active lifestyles",
    spotlight: "Optimized for movement-focused users who care about wellness data, comfort, and a clean athletic look.",
    shoeImage: fitnessSeriesShoe
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Safety Series",
    tagline: "Reassurance built into every step",
    description: "A protective smart shoe concept designed around visibility, location-aware support, and dependable comfort for families and vulnerable users.",
    features: ["Geo-aware safety prompts", "Emergency-ready design language", "Stability-focused outsole", "High-confidence day-to-night comfort"],
    color: "bg-[#6C3DFF]",
    textColor: "text-[#6C3DFF]",
    borderColor: "border-[#6C3DFF]",
    accentBg: "bg-[#6C3DFF]/10",
    glowColor: "rgba(108,61,255,0.45)",
    accentHex: "#6C3DFF",
    badge: "Protective design",
    stat: "Built for peace of mind",
    audience: "Best for family safety and location-aware mobility",
    spotlight: "Created for reassurance-led use cases where visibility, stability, and connected support matter most.",
    shoeImage: safetySeriesShoe
  },
  {
    icon: <Mountain className="w-7 h-7" />,
    title: "Adventure Series",
    tagline: "Off-grid confidence",
    description: "A rugged trail build for wet surfaces, uneven terrain, and long days where durability and dependable stored power both matter.",
    features: ["Trail-grip outsole geometry", "Weather-ready upper construction", "More rugged structural support", "Extended outdoor durability"],
    color: "bg-aw-teal",
    textColor: "text-aw-teal",
    borderColor: "border-aw-teal",
    accentBg: "bg-aw-teal/10",
    glowColor: "rgba(0,188,212,0.45)",
    accentHex: "#00BCD4",
    badge: "Outdoor ready",
    stat: "Rugged traction and stored power",
    audience: "Best for trekkers, hikers, and field work",
    spotlight: "Shaped for trails, wet conditions, and long off-grid days where traction and resilience are essential.",
    shoeImage: adventureSeriesShoe
  },
  {
    icon: <Wrench className="w-7 h-7" />,
    title: "Professional Series",
    tagline: "Durability for all-day duty",
    description: "A tougher, more structured line created for work environments that demand comfort, resilience, and a reliable energy-harvesting platform.",
    features: ["Reinforced workwear construction", "All-day underfoot comfort", "Slip-aware tread profile", "Hardwearing materials palette"],
    color: "bg-aw-dark-gray",
    textColor: "text-aw-dark-gray",
    borderColor: "border-aw-dark-gray",
    accentBg: "bg-aw-dark-gray/10",
    glowColor: "rgba(66,66,66,0.45)",
    accentHex: "#424242",
    badge: "Shift-ready build",
    stat: "Made for long hours on your feet",
    audience: "Best for technicians, operators, and on-floor teams",
    spotlight: "Engineered for demanding work environments that need toughness, comfort, and reliable energy support.",
    shoeImage: professionalSeriesShoe
  }
];

const solutionPoints = [
  {
    title: "Energy that feels invisible",
    desc: "The system is designed to work in the background, harvesting motion without asking the wearer to change how they move."
  },
  {
    title: "Built around comfort and durability",
    desc: "Shock management, moisture-aware materials, and practical structural support keep the concept premium and wearable."
  },
  {
    title: "Flexible for multiple user journeys",
    desc: "The same core platform adapts to commuting, fitness, safety, adventure, and workwear use cases."
  }
];

const journeyStories = [
  {
    icon: <Zap className="w-5 h-5" />,
    eyebrow: "Everyday energy",
    title: "Power for everyday carry",
    copy: "A polished daily-wear concept that keeps your essentials alive during commutes, campus runs, and long city days.",
    accent: "text-aw-green",
    border: "border-aw-green/20",
    image: energySeriesShoe,
    panel: "bg-white",
    text: "text-aw-navy",
    body: "text-aw-dark-gray"
  },
  {
    icon: <Shield className="w-5 h-5" />,
    eyebrow: "Reassurance-led design",
    title: "Confidence for families and care",
    copy: "A calmer, safer design language built around reassurance, visibility, and connected support for more sensitive users.",
    accent: "text-[#6C3DFF]",
    border: "border-[#6C3DFF]/20",
    image: safetySeriesShoe,
    panel: "bg-gradient-to-br from-[#07163f] via-aw-navy to-[#0f2470]",
    text: "text-white",
    body: "text-white/72"
  },
  {
    icon: <Activity className="w-5 h-5" />,
    eyebrow: "Performance lifestyle",
    title: "Wellness without looking clinical",
    copy: "An athletic silhouette that feels modern and premium while quietly supporting movement, tracking, and recovery routines.",
    accent: "text-aw-teal",
    border: "border-aw-teal/20",
    image: fitnessSeriesShoe,
    panel: "bg-white",
    text: "text-aw-navy",
    body: "text-aw-dark-gray"
  }
];

const technologySteps = [
  {
    step: "01",
    title: "Capture motion",
    desc: "Embedded harvesters respond to gait pressure and repeated movement, converting small bursts of mechanical input into electrical energy.",
    color: "text-aw-teal",
    border: "border-aw-teal",
    bg: "bg-aw-teal"
  },
  {
    step: "02",
    title: "Store and regulate",
    desc: "Power is buffered through an onboard storage layer, then managed so the system stays stable, efficient, and ready for use.",
    color: "text-aw-green",
    border: "border-aw-green",
    bg: "bg-aw-green"
  },
  {
    step: "03",
    title: "Deliver useful output",
    desc: "That stored energy can support smart functions or practical charging moments without turning the shoe into a bulky gadget.",
    color: "text-aw-navy",
    border: "border-aw-navy",
    bg: "bg-aw-navy"
  }
];

const specs = [
  { label: "Energy per step", value: "0.3-5J", sub: "Target harvest window" },
  { label: "Battery profile", value: "500mAh", sub: "Compact onboard storage" },
  { label: "Charging output", value: "USB-C", sub: "Convenient everyday top-up" },
  { label: "Connectivity", value: "BLE", sub: "App-ready smart layer" },
  { label: "Durability", value: "10K+", sub: "Wear cycles potential" },
  { label: "Lifetime impact", value: "182.5", sub: "kWh projected potential" }
];

const targetMarkets = [
  { icon: <Baby className="w-8 h-8" />, title: "Children", description: "Concepts centered on reassuring visibility, family support, and calmer everyday safety." },
  { icon: <User className="w-8 h-8" />, title: "Adults", description: "Urban and lifestyle users who want convenient energy support wrapped in premium footwear." },
  { icon: <Bike className="w-8 h-8" />, title: "Outdoor Users", description: "Trekkers, riders, and explorers who benefit from rugged build quality and off-grid practicality." },
  { icon: <Globe className="w-8 h-8" />, title: "Access-Limited Regions", description: "Communities where even modest wearable power can make daily charging more dependable." }
];

function ProductCard({ product, index, isActive, isDimmed, isIdleBlurred, onToggle }) {
  const ref = useRef(null);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.75, ease }}
      animate={{
        opacity: isDimmed ? 0.38 : 1,
        scale: isDimmed ? 0.96 : isActive ? 1.02 : 1,
        y: isActive ? -6 : 0,
        filter: isDimmed ? "blur(1.5px)" : "blur(0px)"
      }}
      className="text-left cursor-pointer"
      style={{ perspective: 900 }}
      onClick={onToggle}
    >
      <div
        ref={ref}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          transform: isActive ? "perspective(900px) rotateY(180deg)" : "perspective(900px) rotateY(0deg)"
        }}
        className="relative h-[22.5rem] min-w-0"
      >
        <div className={`absolute inset-0 ${product.color} rounded-3xl overflow-hidden p-7 flex flex-col justify-between`} style={{ backfaceVisibility: "hidden" }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.45) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <motion.div
            className="absolute -right-10 -bottom-12 w-40 h-40 rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent 68%)" }}
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.3 }}
          />
          <motion.div
            className="absolute inset-0 z-[5] bg-white/10 backdrop-blur-[2px]"
            animate={{ opacity: isIdleBlurred && !isActive ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center text-white mb-6">
              {product.icon}
            </div>
            <p className="text-white/70 text-xs uppercase tracking-[0.25em] mb-3">{product.badge}</p>
            <h3 className="text-[1.8rem] leading-tight font-black text-white mb-2 break-words">{product.title}</h3>
            <p className="text-white/80 text-[15px] leading-relaxed mb-4">{product.tagline}</p>
            <p className="text-white font-semibold text-sm leading-relaxed max-w-[14rem]">{product.stat}</p>
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-white/60 text-xs uppercase tracking-[0.25em]">{isActive ? "Tap to close" : isIdleBlurred ? "Tap to focus" : "Tap to reveal"}</span>
            <ArrowRight className="w-5 h-5 text-white/70" />
          </div>
        </div>

        <div className="absolute inset-0 bg-white rounded-3xl overflow-hidden p-7 flex flex-col" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div className={`inline-flex w-12 h-12 items-center justify-center rounded-2xl ${product.accentBg} ${product.textColor} mb-5`}>
            {product.icon}
          </div>
          <p className={`text-[10px] font-bold uppercase tracking-[0.14em] mb-3 ${product.textColor}`}>{product.tagline}</p>
          <h3 className="text-lg font-black text-aw-navy mb-2 break-words">{product.title}</h3>
          <p className="text-aw-dark-gray text-sm leading-relaxed mb-4">{product.audience}</p>
          <ul className="space-y-2.5 flex-1">
            {product.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-aw-dark-gray">
                <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${product.textColor}`} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-aw-dark-gray/50 pt-4">Flip back to hide the preview panel.</p>
        </div>
      </div>
    </motion.button>
  );
}

const rangeHighlights = [
  { value: "5", label: "Distinct product directions" },
  { value: "1", label: "Shared energy platform" },
  { value: "360", label: "Lifestyle-led product design" }
];

function SpecCube({ spec, index }) {
  const ref = useTilt(15);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.7, ease }}
      style={{ transformStyle: "preserve-3d", perspective: 600 }}
      className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm overflow-hidden group cursor-default"
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-aw-green/5 to-aw-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-aw-green rounded-l-2xl"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 + 0.3, duration: 0.45, ease }}
        style={{ transformOrigin: "top" }}
      />
      <div className="relative z-10 pl-2">
        <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest">{spec.label}</p>
        <p className="text-3xl font-black text-aw-navy">{spec.value}</p>
        <p className="text-xs text-aw-green font-semibold mt-1">{spec.sub}</p>
      </div>
    </motion.div>
  );
}

function TechStepCard({ step, index }) {
  const ref = useTilt(14);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.8, ease }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      className={`relative bg-aw-light-gray p-7 rounded-2xl border-l-4 ${step.border} overflow-hidden group cursor-default`}
    >
      <div className="tilt-shine absolute inset-0 rounded-2xl pointer-events-none opacity-0 z-10" />
      <motion.div className={`text-6xl font-black ${step.color} mb-4 opacity-15`} style={{ transform: "translateZ(10px)" }}>
        {step.step}
      </motion.div>
      <motion.div
        className={`w-10 h-10 ${step.bg} rounded-lg flex items-center justify-center mb-4`}
        style={{ transform: "translateZ(20px)" }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.5 }}
      >
        <Zap className="w-5 h-5 text-white" />
      </motion.div>
      <h3 className={`font-black mb-2 text-lg ${step.color}`} style={{ transform: "translateZ(15px)" }}>
        {step.title}
      </h3>
      <p className="text-aw-dark-gray text-sm leading-relaxed" style={{ transform: "translateZ(8px)" }}>
        {step.desc}
      </p>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 2.5 }}
      />
    </motion.div>
  );
}

function MarketCard({ market, index }) {
  const ref = useTilt(16);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease }}
      style={{ transformStyle: "preserve-3d", perspective: 700 }}
      className="relative bg-aw-light-gray p-7 rounded-2xl text-center group cursor-default overflow-hidden"
    >
      <div className="tilt-shine absolute inset-0 rounded-2xl pointer-events-none opacity-0 z-10" />
      <motion.div className="absolute inset-0 bg-aw-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      <div className="relative z-10" style={{ transform: "translateZ(18px)" }}>
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 bg-aw-green text-white rounded-2xl mb-5 group-hover:bg-white group-hover:text-aw-green transition-colors duration-300"
          animate={{ rotateY: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
        >
          {market.icon}
        </motion.div>
        <h3 className="text-lg font-black text-aw-navy mb-3 group-hover:text-white transition-colors duration-300">{market.title}</h3>
        <p className="text-aw-dark-gray group-hover:text-white/75 text-sm leading-relaxed transition-colors duration-300">{market.description}</p>
      </div>
    </motion.div>
  );
}

function Products() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const orbitRef = useRef(null);
  const [activeSeries, setActiveSeries] = useState(null);
  const [rangeFocus, setRangeFocus] = useState(0);

  useParticles(canvasRef);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const { scrollYProgress: orbitProgress } = useScroll({ target: orbitRef, offset: ["start end", "end start"] });
  const orbitRotate = useTransform(orbitProgress, [0, 1], [0, 360]);

  const activeProduct = activeSeries !== null ? productSeries[activeSeries] : null;
  const featuredRangeProduct = productSeries[rangeFocus];

  return (
    <div className="overflow-x-hidden">
      <section ref={heroRef} className="relative bg-aw-navy text-white min-h-screen flex items-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" />
        <Orb size={340} color="rgba(76,175,80,0.16)" x="58%" y="6%" delay={0} />
        <Orb size={220} color="rgba(0,188,212,0.18)" x="74%" y="58%" delay={2.2} />
        <Orb size={180} color="rgba(141,198,63,0.12)" x="6%" y="66%" delay={4} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(76,175,80,0.04) 1px, transparent 1px), linear-gradient(90deg,rgba(76,175,80,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
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

              <motion.h1 className="text-6xl lg:text-7xl font-black mb-8 leading-[0.92]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                {["Shoes That", "Work", "While You", "Walk"].map((word, i) => (
                  <motion.span
                    key={word}
                    className={`block ${i === 1 ? "text-aw-green" : i === 3 ? "text-aw-teal" : "text-white"}`}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.8, ease }}
                    style={i === 1 ? { textShadow: "0 0 40px rgba(76,175,80,0.4)" } : void 0}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                className="text-lg text-white/65 mb-10 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.7 }}
              >
                A cleaner, sharper product story for five distinct smart shoe directions, all built on one motion-to-energy platform designed to feel premium instead of experimental.
              </motion.p>

              <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                {["Generate electricity", "Track movement", "Support safety"].map((tag) => (
                  <motion.span
                    key={tag}
                    className="flex items-center gap-1.5 bg-white/8 border border-white/10 px-4 py-2 rounded-full text-sm text-white/80 backdrop-blur-sm"
                    whileHover={{ scale: 1.06, background: "rgba(76,175,80,0.15)", borderColor: "rgba(76,175,80,0.4)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-aw-green" />
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, rotateY: -20, scale: 0.88 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              transition={{ duration: 1.05, delay: 0.3, ease }}
              style={{ perspective: 1000 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[38rem] aspect-[1.05/0.82] rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                {[1.04, 1.12, 1.2].map((scale, i) => (
                  <motion.div
                    key={scale}
                    className="absolute inset-8 rounded-[2rem] border border-aw-green/15"
                    style={{ scale }}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 18 + i * 8, repeat: Infinity, ease: "linear" }}
                  />
                ))}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,188,212,0.18), transparent 58%), radial-gradient(circle at 65% 35%, rgba(76,175,80,0.22), transparent 35%)" }}
                  animate={{ opacity: [0.55, 0.85, 0.55] }}
                  transition={{ duration: 3.2, repeat: Infinity }}
                />
                <div className="absolute inset-0 z-10">
                  <RotatableShoe
                    src={heroShoe}
                    alt="AmpereWalk hero smart shoe"
                    glowColor="rgba(0,188,212,0.35)"
                    imageStyle={{ width: "88%", maxWidth: "34rem", maxHeight: "86%" }}
                  />
                </div>
                <motion.div
                  className="absolute top-6 right-6 z-20 bg-aw-green text-white px-4 py-2 rounded-full text-xs font-black shadow-lg"
                  initial={{ scale: 0, rotate: -16 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.1, type: "spring", stiffness: 300 }}
                >
                  5 refined series
                </motion.div>
                <motion.div
                  className="absolute bottom-6 left-6 z-20 bg-aw-teal text-white px-4 py-2 rounded-full text-xs font-black shadow-lg"
                  initial={{ scale: 0, rotate: 16 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.35, type: "spring", stiffness: 300 }}
                >
                  Motion powered
                </motion.div>
                <div className="absolute bottom-6 right-6 z-20 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm">
                  Drag to rotate
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0], opacity: [0.6, 0.2, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-aw-green rounded-full" />
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-10">
            <p className="text-aw-green text-xs font-bold uppercase tracking-widest mb-4">Full Range</p>
            <h2 className="text-4xl lg:text-5xl font-black text-aw-navy mb-4">
              The Complete <span className="text-aw-green">Product Range</span>
            </h2>
            <p className="text-base lg:text-lg text-aw-dark-gray max-w-3xl mx-auto">
              Explore five clear shoe directions built on one shared motion-to-energy system, without the auto-cycling spotlight or cramped content blocks.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-5">
            {productSeries.map((product, index) => (
              <MagneticGlassButton
                key={product.title}
                onClick={() => setRangeFocus(index)}
                active={rangeFocus === index}
                accentClass={product.color}
              >
                {product.title}
              </MagneticGlassButton>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            {rangeHighlights.map((item) => (
              <div key={item.label} className="rounded-[1.75rem] border border-gray-100 bg-aw-light-gray px-5 py-5 text-center">
                <p className="text-3xl font-black text-aw-navy">{item.value}</p>
                <p className="text-sm text-aw-dark-gray mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          <motion.div
            key={`${featuredRangeProduct.title}-showcase`}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="relative overflow-hidden rounded-[2.4rem] border border-[#152a63] bg-[radial-gradient(circle_at_18%_20%,rgba(0,188,212,0.16),transparent_24%),radial-gradient(circle_at_70%_68%,rgba(76,175,80,0.2),transparent_26%),linear-gradient(135deg,#05122f_0%,#0d1b4b_48%,#132a6b_100%)] shadow-[0_24px_80px_rgba(5,18,47,0.18)]"
          >
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.7) 1px, transparent 1px)",
                backgroundSize: "34px 34px"
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/10 to-transparent" />
            <div className="relative z-10 grid lg:grid-cols-[0.78fr_1.22fr] gap-8 items-center px-7 py-8 md:px-10 md:py-10">
              <div className="text-white">
                <p className="text-aw-teal text-xs font-bold uppercase tracking-[0.28em] mb-4">Featured Series</p>
                <h3 className="text-4xl md:text-5xl font-black leading-[0.96] mb-4">{featuredRangeProduct.title}</h3>
                <p className={`text-lg font-semibold mb-4 ${featuredRangeProduct.textColor.replace("text-", "text-")}`}>{featuredRangeProduct.tagline}</p>
                <p className="text-white/72 leading-relaxed text-base md:text-lg mb-6">{featuredRangeProduct.spotlight}</p>

                <div className="space-y-3 mb-7">
                  {featuredRangeProduct.features.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-start gap-3 rounded-2xl bg-white/8 border border-white/10 px-4 py-3 backdrop-blur-sm">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-aw-green flex-shrink-0" />
                      <span className="text-sm text-white/88">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="rounded-full bg-white text-aw-navy px-5 py-3 text-sm font-bold shadow-[0_10px_30px_rgba(255,255,255,0.18)]">
                    Explore {featuredRangeProduct.title}
                  </button>
                  <button className="rounded-full border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold text-white/88 backdrop-blur-sm">
                    View Use Case
                  </button>
                </div>
              </div>

              <div className="relative min-h-[28rem] lg:min-h-[32rem] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(255,255,255,0.12),transparent_34%)]" />
                <div className="absolute left-5 top-5 z-20 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm">
                  Drag to rotate
                </div>
                <div className="absolute right-5 bottom-5 z-20 rounded-2xl bg-black/20 border border-white/10 px-4 py-3 backdrop-blur-sm max-w-[16rem]">
                  <p className="text-white font-bold text-sm">{featuredRangeProduct.badge}</p>
                  <p className="text-white/65 text-xs mt-1">{featuredRangeProduct.audience}</p>
                </div>
                <RotatableShoe
                  src={featuredRangeProduct.shoeImage}
                  alt={featuredRangeProduct.title}
                  glowColor={featuredRangeProduct.glowColor}
                  className="absolute inset-0"
                  imageStyle={{ width: "88%", maxWidth: "34rem", maxHeight: "88%" }}
                />
              </div>
            </div>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 mt-8 items-stretch">
            <motion.div
              key={`meta-${featuredRangeProduct.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease }}
              className="xl:col-span-1 rounded-[2rem] bg-aw-light-gray p-7 border border-gray-100 flex flex-col"
            >
              <div className={`inline-flex w-12 h-12 items-center justify-center rounded-2xl ${featuredRangeProduct.accentBg} ${featuredRangeProduct.textColor} mb-5`}>
                {featuredRangeProduct.icon}
              </div>
              <p className={`text-xs font-bold uppercase tracking-[0.24em] mb-3 ${featuredRangeProduct.textColor}`}>{featuredRangeProduct.badge}</p>
              <h3 className="text-2xl font-black text-aw-navy mb-3">Why this series stands out</h3>
              <p className="text-aw-dark-gray leading-relaxed">{featuredRangeProduct.description}</p>
            </motion.div>

            {featuredRangeProduct.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06, ease }}
                className="rounded-[2rem] bg-white p-6 border border-gray-100 shadow-sm flex flex-col justify-start min-h-[11.5rem]"
              >
                <div className={`inline-flex w-10 h-10 items-center justify-center rounded-2xl ${featuredRangeProduct.accentBg} ${featuredRangeProduct.textColor} mb-4`}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-[1.35rem] font-black text-aw-navy leading-tight text-balance">{feature}</p>
                <p className="text-sm text-aw-dark-gray mt-3">
                  Designed to reinforce the {featuredRangeProduct.title.toLowerCase()} identity with clearer use-case context and less generic presentation.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-aw-light-gray relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" preserveAspectRatio="none">
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#4CAF50" strokeWidth="1" strokeDasharray="10 6" />
          <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#4CAF50" strokeWidth="1" strokeDasharray="10 6" />
          <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#4CAF50" strokeWidth="1" strokeDasharray="10 6" />
          <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#4CAF50" strokeWidth="1" strokeDasharray="10 6" />
        </svg>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-aw-green text-xs font-bold uppercase tracking-widest mb-4">Tap Any Card</p>
            <h2 className="text-4xl lg:text-5xl font-black text-aw-navy mb-4">
              Explore Each <span className="text-aw-green">Series</span>
            </h2>
            <p className="text-aw-dark-gray max-w-3xl mx-auto">
              Cards stay softly blurred until you choose one, then the selected series opens with a larger interactive 3D preview.
            </p>
          </motion.div>

          <AnimatePresence>
            {activeProduct ? (
              <motion.div
                key={activeProduct.title}
                initial={{ opacity: 0, y: -18, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -12, height: 0 }}
                transition={{ duration: 0.45, ease }}
                className="overflow-hidden"
              >
                <div className="mt-8 rounded-[2rem] bg-aw-navy text-white p-7 md:p-8 overflow-hidden relative border border-white/5">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,188,212,0.18),transparent_34%),radial-gradient(circle_at_50%_70%,rgba(76,175,80,0.18),transparent_34%)]" />
                  <div className="relative z-10 grid lg:grid-cols-[0.95fr_1.05fr] gap-6 items-center">
                    <div>
                      <p className="text-aw-teal text-xs font-bold uppercase tracking-widest mb-3">Live product preview</p>
                      <h3 className="text-3xl font-black mb-3">{activeProduct.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed mb-6">
                        The preview is shown only while this card is open. Drag the shoe to rotate the presentation and inspect it from different angles.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {activeProduct.features.map((feature) => (
                          <div key={feature} className="rounded-2xl bg-white/8 border border-white/10 px-4 py-3 text-sm text-white/80 flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 mt-0.5 text-aw-green flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative min-h-[21rem] rounded-[1.75rem] border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                      <div className="absolute left-5 top-5 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 z-20">
                        Drag to rotate
                      </div>
                      <motion.div
                        className="absolute inset-[10%] rounded-[2rem] border"
                        style={{ borderColor: `${activeProduct.accentHex}55` }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-[18%] rounded-[2rem] border"
                        style={{ borderColor: `${activeProduct.accentHex}35` }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                      />
                      <RotatableShoe
                        src={activeProduct.shoeImage}
                        alt={activeProduct.title}
                        glowColor={activeProduct.glowColor}
                        imageStyle={{ width: "92%", maxWidth: "32rem", maxHeight: "88%" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.div
            animate={{
              y: activeProduct ? 30 : 0,
              opacity: activeProduct ? 0.98 : 1
            }}
            transition={{ duration: 0.45, ease }}
            className="relative z-10 mt-6"
          >
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
              {productSeries.map((product, index) => (
                <ProductCard
                  key={product.title}
                  product={product}
                  index={index}
                  isActive={activeSeries === index}
                  isDimmed={activeProduct !== null && activeSeries !== index}
                  isIdleBlurred={activeProduct === null}
                  onToggle={() => setActiveSeries((current) => (current === index ? null : index))}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}>
            <p className="text-aw-green text-xs font-bold uppercase tracking-widest mb-5">The Solution</p>
            <h2 className="text-5xl font-black text-aw-navy mb-7 leading-tight">A smarter shoe platform with a cleaner value story</h2>
            <p className="text-aw-dark-gray mb-10 leading-relaxed text-lg">
              AmpereWalk works best when the visual story stays grounded in real use cases: one shared energy platform, adapted across daily, fitness, safety, outdoor, and professional wear.
            </p>
            <div className="space-y-6">
              {solutionPoints.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.14, duration: 0.6, ease }}
                  className="flex gap-4 group"
                >
                  <motion.div whileHover={{ scale: 1.25, rotate: 10 }} transition={{ duration: 0.25 }}>
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

          <motion.div
            initial={{ opacity: 0, rotateY: 20, x: 60 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            style={{ perspective: 1000 }}
            className="relative"
          >
            <TiltCard className="rounded-[2rem] border border-gray-100 bg-gradient-to-br from-[#07163f] via-aw-navy to-[#0e2f6a] shadow-2xl overflow-hidden min-h-[34rem]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(76,175,80,0.2),transparent_25%),radial-gradient(circle_at_70%_65%,rgba(0,188,212,0.2),transparent_24%)]" />
              <motion.div className="absolute inset-[10%] rounded-[2rem] border border-aw-green/20" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
              <motion.div className="absolute inset-[19%] rounded-[2rem] border border-aw-teal/15" animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
              <div className="absolute inset-0 z-10">
                <RotatableShoe
                  src={solutionShoe}
                  alt="AmpereWalk solution shoe"
                  glowColor="rgba(0,188,212,0.28)"
                  imageStyle={{ width: "88%", maxWidth: "31rem", maxHeight: "90%" }}
                />
              </div>
              <div className="absolute top-7 left-7 z-20 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-white text-sm font-bold">Shared energy platform</p>
                <p className="text-white/65 text-xs mt-1">Motion harvesting integrated into a wearable everyday form.</p>
              </div>
              <div className="absolute right-7 bottom-7 z-20 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 backdrop-blur-sm max-w-[14rem]">
                <p className="text-aw-teal text-xs font-bold uppercase tracking-widest mb-1">Multi-series foundation</p>
                <p className="text-white/75 text-sm">One platform supporting five distinct product directions.</p>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      <section className="py-28 bg-aw-light-gray overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-5xl font-black text-aw-navy mb-4">
              Smart Shoes That <span className="text-aw-green">Power Real Journeys</span>
            </h2>
            <p className="text-lg text-aw-dark-gray max-w-3xl mx-auto">
              A more premium showcase flow that lets each use case breathe like a flagship product story instead of compressing everything into equal cards.
            </p>
          </motion.div>

          <div className="space-y-8">
            {journeyStories.map((story, index) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.75, ease }}
              >
                <TiltCard className={`rounded-[2.2rem] border ${story.border} ${story.panel} shadow-[0_18px_50px_rgba(15,23,42,0.08)] overflow-hidden`}>
                  <div className={`grid lg:grid-cols-[${index % 2 === 1 ? "1.04fr_0.96fr" : "0.96fr_1.04fr"}] items-center`}>
                    <div className={`relative min-h-[22rem] lg:min-h-[26rem] p-8 md:p-10 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <div className={`inline-flex w-11 h-11 items-center justify-center rounded-2xl ${index % 2 === 1 ? "bg-white/10" : "bg-aw-light-gray"} ${story.accent} mb-5`}>
                        {story.icon}
                      </div>
                      <p className={`text-xs font-bold uppercase tracking-[0.24em] mb-4 ${story.accent}`}>{story.eyebrow}</p>
                      <h3 className={`text-3xl md:text-4xl font-black leading-tight mb-4 ${story.text}`}>{story.title}</h3>
                      <p className={`text-base md:text-lg leading-relaxed max-w-xl ${story.body}`}>{story.copy}</p>
                      <div className="flex flex-wrap gap-3 mt-8">
                        <button className={`rounded-full px-5 py-3 text-sm font-bold ${index % 2 === 1 ? "bg-white text-aw-navy" : "bg-aw-navy text-white"}`}>
                          Discover More
                        </button>
                        <button className={`rounded-full px-5 py-3 text-sm font-semibold border ${index % 2 === 1 ? "border-white/20 text-white/85 bg-white/8" : "border-aw-navy/10 text-aw-navy bg-white"}`}>
                          See the Experience
                        </button>
                      </div>
                    </div>

                    <div className={`relative min-h-[22rem] lg:min-h-[26rem] overflow-hidden ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      <div className={`absolute inset-0 ${index % 2 === 1 ? "bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.12),transparent_36%),linear-gradient(135deg,#07163f,#0d1b4b,#173891)]" : "bg-[radial-gradient(circle_at_50%_45%,rgba(0,188,212,0.12),transparent_34%),linear-gradient(180deg,#f7fafc,#eef4ff)]"}`} />
                      <div className={`absolute right-[10%] top-[12%] h-[62%] w-[20%] rounded-[2rem] ${index % 2 === 1 ? "bg-[linear-gradient(180deg,rgba(87,117,255,0.75),rgba(124,82,255,0.18)_42%,rgba(255,132,82,0.6)_100%)]" : "bg-[linear-gradient(180deg,rgba(64,255,229,0.45),rgba(77,129,255,0.1)_40%,rgba(255,255,255,0.2)_100%)]"} blur-sm opacity-80`} />
                      <div className={`absolute left-[10%] bottom-[11%] h-10 w-[55%] rounded-full ${index % 2 === 1 ? "bg-[linear-gradient(90deg,rgba(255,167,64,0.95),rgba(255,245,133,0.95),rgba(81,147,255,0.85))]" : "bg-[linear-gradient(90deg,rgba(0,188,212,0.85),rgba(76,175,80,0.82),rgba(255,255,255,0.55))]"} blur-2xl opacity-75`} />
                      <div className={`absolute left-5 top-5 z-20 rounded-full px-4 py-2 text-xs font-semibold backdrop-blur-sm ${index % 2 === 1 ? "bg-white/10 border border-white/10 text-white/80" : "bg-white/70 border border-white text-aw-navy/70"}`}>
                        Interactive product view
                      </div>
                      <RotatableShoe
                        src={story.image}
                        alt={story.title}
                        glowColor={index % 2 === 1 ? "rgba(87,117,255,0.28)" : "rgba(0,188,212,0.22)"}
                        className="absolute inset-0"
                        imageStyle={{ width: "84%", maxWidth: "30rem", maxHeight: "86%" }}
                      />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-white overflow-hidden" ref={orbitRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-aw-teal text-xs font-bold uppercase tracking-widest mb-4">How It Works</p>
            <h2 className="text-5xl font-black text-aw-navy mb-4">
              Technology That Converts <span className="text-aw-teal">Steps into Power</span>
            </h2>
            <p className="text-lg text-aw-dark-gray max-w-3xl mx-auto">
              The visual has been rebuilt around a cleaner product render, sharper copy, and layered motion instead of a pasted technical poster.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="rounded-[2rem] bg-aw-light-gray p-8 md:p-10 border border-gray-100"
            >
              <p className="text-aw-teal text-xs font-bold uppercase tracking-widest mb-4">System flow</p>
              <h3 className="text-3xl font-black text-aw-navy mb-5">A compact architecture designed to feel practical, not complicated.</h3>
              <div className="space-y-5">
                {[
                  "Pressure and movement create small bursts of usable electrical energy.",
                  "That energy is buffered through a compact storage and power-management layer.",
                  "Output can support smart features, data syncing, or convenient top-up charging moments.",
                  "The footwear still has to look premium and feel comfortable, which is why the hardware story stays visually disciplined."
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-aw-green mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed text-aw-dark-gray">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotateX: 14, y: 40 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
              style={{ perspective: 1200 }}
              className="relative"
            >
              <div className="rounded-[2rem] border border-gray-100 bg-gradient-to-br from-[#07163f] via-aw-navy to-[#0e2f6a] min-h-[34rem] overflow-hidden shadow-2xl relative">
                <motion.div
                  className="absolute left-1/2 top-1/2 w-[72%] aspect-square rounded-full border border-aw-teal/20"
                  style={{ translateX: "-50%", translateY: "-50%", rotate: orbitRotate }}
                />
                <motion.div
                  className="absolute left-1/2 top-1/2 w-[54%] aspect-square rounded-full border border-aw-green/20"
                  style={{ translateX: "-50%", translateY: "-50%", rotate: orbitRotate }}
                />
                <div className="absolute inset-0 z-10">
                  <RotatableShoe
                    src={technologyShoe}
                    alt="Technology shoe"
                    glowColor="rgba(0,188,212,0.28)"
                    imageStyle={{ width: "76%", maxWidth: "28rem", maxHeight: "88%" }}
                  />
                </div>
                {[
                  { label: "Motion input", value: "Kinetic", className: "left-7 top-7" },
                  { label: "Stored energy", value: "Buffered", className: "right-7 top-20" },
                  { label: "User output", value: "Practical", className: "left-10 bottom-12" },
                  { label: "Inspectable", value: "Drag to rotate", className: "right-7 bottom-10" }
                ].map((item) => (
                  <div key={item.label} className={`absolute ${item.className} rounded-2xl bg-white/10 border border-white/10 px-4 py-3 backdrop-blur-sm z-20`}>
                    <p className="text-white/55 text-[11px] uppercase tracking-[0.2em]">{item.label}</p>
                    <p className="text-white font-bold text-sm mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {technologySteps.map((step, index) => (
              <TechStepCard key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-aw-light-gray relative overflow-hidden">
        <Orb size={300} color="rgba(76,175,80,0.07)" x="80%" y="10%" delay={0} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-aw-green text-xs font-bold uppercase tracking-widest mb-4">Under the Hood</p>
            <h2 className="text-5xl font-black text-aw-navy mb-4">Technical Specifications</h2>
            <p className="text-aw-dark-gray">Core technology signals across all product series</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {specs.map((spec, i) => (
              <SpecCube key={spec.label} spec={spec} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotateX: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            style={{ perspective: 800 }}
            className="relative overflow-hidden"
          >
            <TiltCard className="bg-gradient-to-br from-aw-green to-aw-teal text-white p-10 rounded-3xl text-center shadow-2xl">
              {[1.05, 1.12].map((scale) => (
                <motion.div
                  key={scale}
                  className="absolute inset-0 rounded-3xl border border-white/10"
                  style={{ scale }}
                  animate={{ rotate: scale === 1.05 ? 360 : -360 }}
                  transition={{ duration: scale === 1.05 ? 20 : 30, repeat: Infinity, ease: "linear" }}
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
                <p className="text-white/80 text-lg">A stronger way to frame long-term value beyond a single product visual.</p>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-aw-green text-xs font-bold uppercase tracking-widest mb-4">Our Customers</p>
            <h2 className="text-5xl font-black text-aw-navy mb-4">Who We Serve</h2>
            <p className="text-aw-dark-gray">Solutions designed for different environments and user expectations</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {targetMarkets.map((market, index) => (
              <MarketCard key={market.title} market={market} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-aw-navy text-white relative overflow-hidden">
        <Orb size={400} color="rgba(76,175,80,0.1)" x="20%" y="10%" delay={0} />
        <Orb size={300} color="rgba(0,188,212,0.08)" x="70%" y="40%" delay={2} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(76,175,80,1) 1px, transparent 1px), linear-gradient(90deg,rgba(76,175,80,1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-aw-green/20 rounded-2xl mb-8 border border-aw-green/30"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ perspective: 400 }}
            >
              <Zap className="w-10 h-10 text-aw-green" />
            </motion.div>

            <h2 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Ready to power
              <br />
              <motion.span
                className="text-aw-green"
                animate={{ textShadow: ["0 0 0px rgba(76,175,80,0)", "0 0 30px rgba(76,175,80,0.5)", "0 0 0px rgba(76,175,80,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                your next step?
              </motion.span>
            </h2>
            <p className="text-xl text-white/60 mb-12">Explore the refined lineup and choose the product direction that best matches the story you want to tell.</p>
            <div className="flex flex-wrap gap-5 justify-center">
              <motion.button className="relative px-10 py-4 bg-aw-green text-white rounded-xl font-bold text-lg overflow-hidden group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <motion.span className="absolute inset-0 bg-aw-lime" initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
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

export { Products };
