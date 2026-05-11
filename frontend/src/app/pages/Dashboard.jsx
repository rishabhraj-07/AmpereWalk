import { motion } from "motion/react";
import { Zap, Battery, Footprints, TrendingUp, Calendar } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useRef, useState } from "react";
function LiveNumber({ value, suffix = "" }) {
  const [display, setDisplay] = useState("0");
  const hasAnimated = useRef(false);
  const ref = useRef(null);
  useEffect(() => {
    if (hasAnimated.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      hasAnimated.current = true;
      const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
      if (isNaN(numeric)) {
        setDisplay(value);
        return;
      }
      let start = 0;
      const startTime = performance.now();
      const duration = 1800;
      const tick = (now) => {
        const t = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 4);
        const cur = eased * numeric;
        setDisplay(value.includes(",") ? Math.floor(cur).toLocaleString() : cur >= 10 ? Math.floor(cur).toString() : cur.toFixed(1));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>{display}{suffix}</span>;
}
function StatCard({ stat, index }) {
  return <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -4, transition: { duration: 0.25 } }}
    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm group cursor-default relative overflow-hidden"
  >
      {
    /* Animated background glow on hover */
  }
      <motion.div
    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    style={{ background: `radial-gradient(circle at 50% 50%, ${stat.glowColor}15, transparent 70%)` }}
  />
      <div className="flex items-center justify-between mb-5 relative z-10">
        <motion.div
    className={`${stat.color} text-white p-3 rounded-xl shadow-md`}
    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
    transition={{ duration: 0.4 }}
  >
          {stat.icon}
        </motion.div>
        <motion.span
    className={`text-sm font-bold px-2 py-1 rounded-full ${stat.positive ? "text-green-700 bg-green-100" : "text-red-600 bg-red-100"}`}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: index * 0.1 + 0.4, type: "spring", stiffness: 300 }}
  >
          {stat.change}
        </motion.span>
      </div>
      <p className="text-sm text-gray-500 mb-1 relative z-10">{stat.label}</p>
      <p className="text-3xl font-black text-aw-navy relative z-10">
        <LiveNumber value={stat.rawValue} suffix={stat.suffix} />
      </p>
    </motion.div>;
}
function Dashboard() {
  const energyData = [
    { time: "6am", energy: 12 },
    { time: "9am", energy: 45 },
    { time: "12pm", energy: 78 },
    { time: "3pm", energy: 92 },
    { time: "6pm", energy: 125 },
    { time: "9pm", energy: 148 }
  ];
  const weeklySteps = [
    { day: "Mon", steps: 8432 },
    { day: "Tue", steps: 9876 },
    { day: "Wed", steps: 7234 },
    { day: "Thu", steps: 10542 },
    { day: "Fri", steps: 8965 },
    { day: "Sat", steps: 12345 },
    { day: "Sun", steps: 6789 }
  ];
  const batteryHistory = [
    { hour: "1h", level: 45 },
    { hour: "2h", level: 52 },
    { hour: "3h", level: 61 },
    { hour: "4h", level: 73 },
    { hour: "5h", level: 85 },
    { hour: "6h", level: 92 }
  ];
  const stats = [
    { icon: <Zap className="w-5 h-5" />, label: "Energy Generated Today", rawValue: "148", suffix: " Wh", change: "+12%", positive: true, color: "bg-aw-green", glowColor: "#4CAF50" },
    { icon: <Battery className="w-5 h-5" />, label: "Current Battery Level", rawValue: "92", suffix: "%", change: "+8%", positive: true, color: "bg-aw-teal", glowColor: "#00BCD4" },
    { icon: <Footprints className="w-5 h-5" />, label: "Steps Today", rawValue: "12,345", suffix: "", change: "+5%", positive: true, color: "bg-aw-lime", glowColor: "#8DC63F" },
    { icon: <TrendingUp className="w-5 h-5" />, label: "Weekly Average", rawValue: "9,169", suffix: "", change: "-2%", positive: false, color: "bg-aw-navy", glowColor: "#0D1B4B" }
  ];
  const recentActivity = [
    { time: "2 hours ago", activity: "Charged device to 100%", energy: "45 Wh used", icon: "\u26A1" },
    { time: "5 hours ago", activity: "Morning walk completed", energy: "32 Wh generated", icon: "\u{1F45F}" },
    { time: "1 day ago", activity: "Device synced successfully", energy: "Data updated", icon: "\u{1F4E1}" }
  ];
  const chartTooltipStyle = {
    contentStyle: { backgroundColor: "#0D1B4B", border: "none", borderRadius: "12px", color: "#fff", fontSize: 13 }
  };
  return <div className="min-h-screen bg-aw-light-gray py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {
    /* Header */
  }
        <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-10 flex items-start justify-between"
  >
          <div>
            <h1 className="text-4xl font-black text-aw-navy mb-2">Energy Dashboard</h1>
            <p className="text-aw-dark-gray flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              {(/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          {
    /* Live indicator */
  }
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <motion.div
    className="w-2 h-2 bg-aw-green rounded-full"
    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  />
            <span className="text-xs font-semibold text-aw-navy">LIVE</span>
          </div>
        </motion.div>

        {
    /* Stats Grid */
  }
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, i) => <StatCard key={i} stat={stat} index={i} />)}
        </div>

        {
    /* Charts */
  }
        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          {
    /* Energy Chart */
  }
          <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
    whileHover={{ boxShadow: "0 8px 40px rgba(76,175,80,0.12)" }}
    className="bg-white p-6 rounded-2xl border border-gray-100 transition-shadow"
  >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-aw-navy">Energy Generation Today</h2>
              <span className="text-xs font-semibold text-aw-green bg-aw-green/10 px-3 py-1 rounded-full">Wh</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={energyData}>
                <defs>
                  <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis dataKey="time" stroke="#9E9E9E" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9E9E9E" tick={{ fontSize: 12 }} />
                <Tooltip {...chartTooltipStyle} />
                <Area type="monotone" dataKey="energy" stroke="#4CAF50" fill="url(#energyGrad)" strokeWidth={2.5} dot={{ fill: "#4CAF50", r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {
    /* Steps Chart */
  }
          <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.5 }}
    whileHover={{ boxShadow: "0 8px 40px rgba(0,188,212,0.12)" }}
    className="bg-white p-6 rounded-2xl border border-gray-100 transition-shadow"
  >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-aw-navy">Weekly Steps</h2>
              <span className="text-xs font-semibold text-aw-teal bg-aw-teal/10 px-3 py-1 rounded-full">Steps</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={weeklySteps}>
                <defs>
                  <linearGradient id="stepsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00BCD4" stopOpacity={1} />
                    <stop offset="95%" stopColor="#00BCD4" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis dataKey="day" stroke="#9E9E9E" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9E9E9E" tick={{ fontSize: 12 }} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="steps" fill="url(#stepsGrad)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {
    /* Battery + Activity */
  }
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.6 }}
    whileHover={{ boxShadow: "0 8px 40px rgba(141,198,63,0.12)" }}
    className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 transition-shadow"
  >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-aw-navy">Battery Status</h2>
              <span className="text-xs font-semibold text-aw-lime bg-aw-lime/10 px-3 py-1 rounded-full">% Level</span>
            </div>
            <ResponsiveContainer width="100%" height={190}>
              <LineChart data={batteryHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis dataKey="hour" stroke="#9E9E9E" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9E9E9E" tick={{ fontSize: 12 }} />
                <Tooltip {...chartTooltipStyle} />
                <Line type="monotone" dataKey="level" stroke="#8DC63F" strokeWidth={3} dot={{ fill: "#8DC63F", r: 5, strokeWidth: 2, stroke: "#fff" }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.7 }}
    className="bg-white p-6 rounded-2xl border border-gray-100"
  >
            <h2 className="text-lg font-bold text-aw-navy mb-6">Recent Activity</h2>
            <div className="space-y-5">
              {recentActivity.map((item, index) => <motion.div
    key={index}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.8 + index * 0.1 }}
    className="flex gap-3 items-start group"
  >
                  <div className="w-8 h-8 rounded-lg bg-aw-light-gray flex items-center justify-center text-base flex-shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="border-l-2 border-aw-green/30 pl-3 group-hover:border-aw-green transition-colors">
                    <p className="text-xs text-gray-400 mb-0.5">{item.time}</p>
                    <p className="font-semibold text-aw-navy text-sm">{item.activity}</p>
                    <p className="text-xs text-aw-green mt-0.5">{item.energy}</p>
                  </div>
                </motion.div>)}
            </div>
          </motion.div>
        </div>

        {
    /* Device Info */
  }
        <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.8 }}
    className="bg-aw-navy text-white p-7 rounded-2xl relative overflow-hidden"
  >
          {
    /* Animated shimmer */
  }
          <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-aw-green/10 to-transparent"
    animate={{ x: ["-100%", "200%"] }}
    transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
  />
          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            <div>
              <p className="text-white/50 text-sm mb-1">Device Model</p>
              <p className="text-base font-bold">AmpereWalk Energy Series Pro</p>
            </div>
            <div>
              <p className="text-white/50 text-sm mb-1">Total Energy Generated</p>
              <p className="text-2xl font-black text-aw-green">
                <LiveNumber value="2456" suffix=" Wh" />
              </p>
            </div>
            <div>
              <p className="text-white/50 text-sm mb-1">Device Cycles</p>
              <p className="text-base font-bold">
                <LiveNumber value="1234" /> <span className="text-white/50 font-normal">/ 10,000+</span>
              </p>
              <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
    className="h-full bg-gradient-to-r from-aw-green to-aw-teal rounded-full"
    initial={{ width: 0 }}
    animate={{ width: "12.34%" }}
    transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
  />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>;
}
export {
  Dashboard
};
