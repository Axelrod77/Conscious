"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Install",
    body: "One command. One provider. Wrap your app root.",
    code: 'npm install @conscious/react\n\n<ConsciousProvider apiUrl="/api/voice">\n  {children}\n</ConsciousProvider>',
    cols: 7,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    step: "02",
    title: "Replace",
    body: "Swap any <input> for <ConsciousInput>. That's it.",
    code: '// Before\n<input type="text" />\n\n// After\n<ConsciousInput type="text" />',
    cols: 5,
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
  },
  {
    step: "03",
    title: "Speak",
    body: "Users hold Space. Speak. Release. Text appears.",
    code: "// Hold Space → speak → release\n// <300ms transcription latency\n// Auto-commits at 90%+ confidence",
    cols: 5,
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
  },
  {
    step: "04",
    title: "Ship",
    body: "Your brand. Your domain. Wispr Flow never visible.",
    code: "// White-labeled\n// API key server-side only\n// Swap STT engines: 1 line",
    cols: 7,
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              How It Works
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-4">
            Ship in{" "}
            <span className="accent-gradient-text">three steps</span>.
          </h2>

          <p className="text-base md:text-lg text-muted max-w-2xl mb-12">
            No new infrastructure. No DevOps. No user training. Your forms,
            upgraded.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`md:col-span-${s.cols} bg-surface border border-stroke rounded-3xl overflow-hidden p-7 relative transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_0_1px_rgba(0,200,150,0.3)]`}
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${s.gradient} rounded-3xl pointer-events-none opacity-60`}
              />

              <p className="text-xs text-muted font-mono mb-4">{s.step}</p>
              <h3 className="text-2xl font-semibold text-text-primary mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-muted mb-6">{s.body}</p>

              <pre className="font-mono text-xs bg-bg rounded-xl p-4 text-accent/80 border border-stroke whitespace-pre overflow-x-auto">
                {s.code}
              </pre>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
