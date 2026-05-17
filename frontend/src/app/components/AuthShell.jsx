import { motion } from "motion/react";
import { Zap } from "lucide-react";

function AuthShell({ title, subtitle, children, footer }) {
  return <div className="min-h-screen bg-aw-light-gray py-12">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="hidden lg:block"
  >
            <div className="rounded-2xl bg-aw-navy p-12 text-white">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-aw-green">
                  <Zap className="h-7 w-7 text-white" fill="white" />
                </div>
                <span className="text-2xl font-bold">
                  <span className="text-white">Ampere</span>
                  <span className="text-aw-green">Walk</span>
                </span>
              </div>

              <h2 className="mb-6 text-4xl font-bold">Power Every Step</h2>

              <p className="mb-8 text-lg text-white/90">
                Access your energy dashboard, track your steps, and monitor the power you generate with every walk.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-aw-green/20">
                    <Zap className="h-4 w-4 text-aw-green" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Real-time Energy Tracking</h3>
                    <p className="text-sm text-white/70">Monitor power generation and battery status</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-aw-green/20">
                    <Zap className="h-4 w-4 text-aw-green" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Health & Fitness Insights</h3>
                    <p className="text-sm text-white/70">Track steps, distance, and calories burned</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-aw-green/20">
                    <Zap className="h-4 w-4 text-aw-green" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Sync Across Devices</h3>
                    <p className="text-sm text-white/70">Access your data from anywhere</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="rounded-2xl bg-white p-8 shadow-lg lg:p-12"
  >
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold text-aw-navy">{title}</h1>
              <p className="text-aw-dark-gray">{subtitle}</p>
            </div>

            {children}

            <div className="mt-8 border-t border-aw-mid-gray pt-8">
              {footer}
            </div>
          </motion.div>
        </div>
      </div>
    </div>;
}

export {
  AuthShell
};
