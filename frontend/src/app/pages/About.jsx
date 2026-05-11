import { motion, useScroll, useTransform } from "motion/react";
import { Zap, Leaf, Users, Shield, Award, Target, Eye } from "lucide-react";
import { useRef } from "react";
import { useTilt } from "../../hooks/useAnimations";
function TiltCard({ children, className }) {
  const ref = useTilt(8);
  return <div ref={ref} className={`relative ${className}`} style={{ transformStyle: "preserve-3d" }}>
      <div className="tilt-shine absolute inset-0 rounded-lg pointer-events-none opacity-0 transition-opacity duration-300 z-10" />
      {children}
    </div>;
}
function About() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);
  const values = [
    { icon: <Zap className="w-8 h-8" />, title: "Innovation", description: "We push boundaries in piezoelectric and kinetic energy harvesting technology." },
    { icon: <Leaf className="w-8 h-8" />, title: "Sustainability", description: "Every product is designed to be eco-friendly and reduce electronic waste." },
    { icon: <Users className="w-8 h-8" />, title: "Accessibility", description: "We build solutions for underserved communities, hikers, and everyday users." },
    { icon: <Shield className="w-8 h-8" />, title: "Reliability", description: "Built for 10,000+ cycles \u2014 durable, waterproof, and impact-resistant." }
  ];
  const milestones = [
    { phase: "01", year: "2023", title: "Foundation & R&D", description: "Tech development started", color: "bg-aw-teal" },
    { phase: "02", year: "Academic", title: "1st Prize", description: "Prototype Project Recognition", color: "bg-aw-green" },
    { phase: "03", year: "Competition", title: "College Shark Tank", description: "1st Prize Winner", color: "bg-aw-lime" },
    { phase: "04", year: "Validation", title: "Market Feedback", description: "Hackathons, events & positive response", color: "bg-[#FFA500]" },
    { phase: "05", year: "Current", title: "AI Impact Summit", description: "Strong industry demand", color: "bg-[#DC143C]" }
  ];
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };
  return <div className="overflow-x-hidden">

      {
    /* ── HERO ────────────────────────────────────────────────────────── */
  }
      <section className="bg-aw-navy text-white py-28 relative overflow-hidden">
        {
    /* Animated diagonal lines */
  }
        {[...Array(5)].map((_, i) => <motion.div
    key={i}
    className="absolute h-px bg-gradient-to-r from-transparent via-aw-green/20 to-transparent"
    style={{ width: "200%", top: `${15 + i * 18}%`, left: "-50%" }}
    animate={{ x: ["-10%", "10%"] }}
    transition={{ duration: 6 + i * 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
  />)}

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
            <motion.p
    className="text-aw-green text-sm font-semibold uppercase tracking-widest mb-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
              Our Story
            </motion.p>
            <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight">
              About{" "}
              <motion.span
    className="text-aw-green inline-block"
    animate={{ textShadow: ["0 0 0px rgba(76,175,80,0)", "0 0 30px rgba(76,175,80,0.5)", "0 0 0px rgba(76,175,80,0)"] }}
    transition={{ duration: 3, repeat: Infinity }}
  >
                AmpereWalk
              </motion.span>
            </h1>
            <motion.p
    className="text-xl text-aw-lime max-w-3xl mx-auto"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.7 }}
  >
              Pioneering smart footwear that converts kinetic energy into usable electrical power
            </motion.p>
          </motion.div>
        </div>
      </section>

      {
    /* ── COMPANY OVERVIEW ────────────────────────────────────────────── */
  }
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className="max-w-4xl mx-auto text-center"
  >
            <p className="text-lg text-aw-dark-gray leading-relaxed text-balance">
              AmpereWalk is a pioneering smart footwear company under NextGen Shoes, dedicated to converting the kinetic energy of human locomotion into usable electrical power. Born from a vision to eliminate personal energy poverty, AmpereWalk creates shoes that work while you walk — generating electricity, tracking health, and empowering users wherever they go.
            </p>
          </motion.div>
        </div>
      </section>

      {
    /* ── MISSION & VISION ────────────────────────────────────────────── */
  }
      <section className="py-24 bg-aw-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">

            <TiltCard className="bg-white p-8 rounded-2xl border-l-4 border-aw-green shadow-sm">
              <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
  >
                <div className="flex items-center gap-3 mb-5">
                  <motion.div
    className="w-12 h-12 bg-aw-green rounded-xl flex items-center justify-center"
    whileInView={{ rotateY: [0, 360] }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.3 }}
  >
                    <Target className="w-6 h-6 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-black text-aw-navy">Mission</h2>
                </div>
                <p className="text-lg text-aw-dark-gray leading-relaxed">
                  To democratize access to portable, sustainable energy through innovative footwear technology — empowering communities, adventurers, and professionals alike.
                </p>
              </motion.div>
            </TiltCard>

            <TiltCard className="bg-aw-navy p-8 rounded-2xl text-white shadow-sm">
              <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
  >
                <div className="flex items-center gap-3 mb-5">
                  <motion.div
    className="w-12 h-12 bg-aw-green rounded-xl flex items-center justify-center"
    whileInView={{ rotateY: [0, 360] }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.5 }}
  >
                    <Eye className="w-6 h-6 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-black">Vision</h2>
                </div>
                <p className="text-lg text-white/80 leading-relaxed">
                  A world where every step generates clean, usable power — eliminating energy poverty and reducing carbon dependence through wearable innovation.
                </p>
              </motion.div>
            </TiltCard>
          </div>
        </div>
      </section>

      {
    /* ── CORE VALUES ─────────────────────────────────────────────────── */
  }
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-20"
  >
            <p className="text-aw-green text-sm font-semibold uppercase tracking-widest mb-4">What Drives Us</p>
            <h2 className="text-5xl font-black text-aw-navy mb-4">Core Values</h2>
            <p className="text-lg text-aw-dark-gray">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => <motion.div
    key={index}
    initial={{ opacity: 0, y: 40, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className="bg-aw-light-gray p-7 rounded-2xl cursor-default group relative overflow-hidden"
  >
                {
    /* Hover bg sweep */
  }
                <motion.div
    className="absolute inset-0 bg-aw-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  />
                <div className="relative z-10">
                  <motion.div
    className="w-16 h-16 bg-aw-green/10 text-aw-green group-hover:bg-aw-green group-hover:text-white rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300"
    whileHover={{ rotate: [0, -10, 10, 0] }}
    transition={{ duration: 0.4 }}
  >
                    {value.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-aw-navy group-hover:text-white mb-3 transition-colors duration-300">{value.title}</h3>
                  <p className="text-aw-dark-gray group-hover:text-white/70 text-sm leading-relaxed transition-colors duration-300">{value.description}</p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {
    /* ── MILESTONE TIMELINE ───────────────────────────────────────────── */
  }
      <section className="py-24 bg-aw-navy text-white relative overflow-hidden" ref={timelineRef}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
    backgroundImage: `linear-gradient(rgba(76,175,80,1) 1px, transparent 1px), linear-gradient(90deg, rgba(76,175,80,1) 1px, transparent 1px)`,
    backgroundSize: "50px 50px"
  }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-20"
  >
            <p className="text-aw-green text-sm font-semibold uppercase tracking-widest mb-4">Traction</p>
            <h2 className="text-5xl font-black mb-4">Our Journey</h2>
            <p className="text-lg text-white/60">Milestones & Traction Timeline</p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {milestones.map((milestone, index) => <motion.div
    key={index}
    initial={{ opacity: 0, y: 50, scale: 0.85 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -10, transition: { duration: 0.25 } }}
    className="relative cursor-default"
  >
                <div className={`${milestone.color} p-6 rounded-2xl h-full flex flex-col relative overflow-hidden`}>
                  {
    /* Shimmer */
  }
                  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
    animate={{ x: ["-100%", "200%"] }}
    transition={{ duration: 2, delay: index * 0.4, repeat: Infinity, repeatDelay: 3 }}
  />
                  <div className="text-5xl font-black text-white/20 mb-3">{milestone.phase}</div>
                  <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2">{milestone.year}</div>
                  <h3 className="text-base font-bold mb-2">{milestone.title}</h3>
                  <p className="text-sm text-white/80">{milestone.description}</p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {
    /* ── MARKET OPPORTUNITY ───────────────────────────────────────────── */
  }
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-20"
  >
            <p className="text-aw-green text-sm font-semibold uppercase tracking-widest mb-4">Opportunity</p>
            <h2 className="text-5xl font-black text-aw-navy mb-4">Market Opportunity</h2>
            <p className="text-lg text-aw-dark-gray">Positioned at the intersection of growing markets</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
    { title: "Smart Shoes Market", value: "$1.10B", sub: "by 2030", note: "15.3% CAGR (2023\u20132030)", color: "bg-aw-navy" },
    { title: "Wearable Tech Market", value: "$177B", sub: "by 2030", note: "15% CAGR globally", color: "bg-aw-green" },
    { title: "India Wearables", value: "18.3%", sub: "CAGR", note: "Through 2031 \u2014 high demand", color: "bg-aw-teal" }
  ].map((market, index) => <TiltCard key={index} className={`${market.color} text-white p-8 rounded-2xl text-center`}>
                <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15, duration: 0.7 }}
  >
                  <h3 className="text-base mb-4 font-semibold text-white/80">{market.title}</h3>
                  <motion.p
    className="text-5xl font-black mb-2"
    initial={{ scale: 0.5, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
  >
                    {market.value}
                  </motion.p>
                  <p className="text-white/70 mb-3">{market.sub}</p>
                  <p className="text-xs text-aw-lime font-semibold">{market.note}</p>
                </motion.div>
              </TiltCard>)}
          </div>
        </div>
      </section>

      {
    /* ── QUOTE ───────────────────────────────────────────────────────── */
  }
      <section className="py-24 bg-aw-green text-white relative overflow-hidden">
        <motion.div
    className="absolute inset-0"
    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    style={{ background: "linear-gradient(135deg, #4CAF50, #8DC63F, #00BCD4, #4CAF50)", backgroundSize: "300% 300%" }}
  />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
  >
            <motion.div
    animate={{ rotate: [0, 5, -5, 0] }}
    transition={{ duration: 5, repeat: Infinity }}
    className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-8"
  >
              <Award className="w-8 h-8" />
            </motion.div>
            <blockquote className="text-3xl lg:text-4xl font-black mb-6 leading-tight">
              "The ground beneath your feet is full of potential."
            </blockquote>
            <p className="text-xl text-white/90">AmpereWalk unlocks it — one step at a time.</p>
          </motion.div>
        </div>
      </section>
    </div>;
}
export {
  About
};
