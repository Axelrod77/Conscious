"use client";

import { motion } from "framer-motion";

const colSpanClass: Record<number, string> = {
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  12: "md:col-span-12",
};

const steps = [
  {
    step: "01",
    title: "Install",
    body: "One command. One provider. Wrap your app root.",
    code: 'npm install @conscious/react\n\n<ConsciousProvider apiUrl="/api/voice">\n  {children}\n</ConsciousProvider>',
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    step: "02",
    title: "Replace",
    body: "Swap any <input> for <ConsciousInput>. That's it.",
    code: '// Before\n<input type="text" />\n\n// After\n<ConsciousInput type="text" />',
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
  },
  {
    step: "03",
    title: "Ship",
    body: "Users hold Space, speak, release — text appears. White-labeled, your brand, your domain.",
    code: "// Hold Space → speak → release\n// <300ms latency, 90%+ confidence\n// White-labeled — swap STT engines in 1 line",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-surface border border-stroke rounded-3xl overflow-hidden p-7 relative transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_0_1px_rgba(0,200,150,0.3)]"
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
