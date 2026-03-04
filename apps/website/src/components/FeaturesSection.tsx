"use client";

import { motion } from "framer-motion";

const colSpanClass: Record<number, string> = {
  4: "md:col-span-4",
  6: "md:col-span-6",
  12: "md:col-span-12",
};

const features = [
  {
    icon: "\uD83C\uDFA4",
    title: "White-Label by Default",
    body: "Your domain. Your brand. Zero vendor bleed. The STT engine never touches the client.",
    cols: 4,
  },
  {
    icon: "\u26A1",
    title: "<300ms Latency",
    body: "Audio streams in 1-second PCM chunks over WebSocket. Partials appear in real time.",
    cols: 4,
  },
  {
    icon: "\uD83D\uDD12",
    title: "API Key Never in Browser",
    body: "Architecture enforces security. The proxy layer is not optional \u2014 it\u2019s load-bearing.",
    cols: 4,
  },
  {
    icon: "\uD83E\uDDE0",
    title: "Conscious Confidence Score",
    body: "Our 3-signal CCS decides: auto-commit, suggest, or disambiguate. No bad writes.",
    cols: 6,
  },
  {
    icon: "\uD83E\udDE9",
    title: "Field-Type Aware",
    body: "10-step detection tree. \u2018Forty two\u2019 becomes 42. \u2018John at gmail dot com\u2019 becomes john@gmail.com.",
    cols: 6,
  },
  {
    icon: "\uD83D\uDD04",
    title: "Swap STT in One Line",
    body: "ISTTProvider interface means Deepgram, AssemblyAI, or your own engine \u2014 zero SDK changes.",
    cols: 12,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-bg py-16 md:py-24">
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
              Features
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-4">
            Enterprise <span className="accent-gradient-text">ready.</span>
          </h2>

          <p className="text-base md:text-lg text-muted max-w-2xl mb-12">
            Built for the stack complexity that real SaaS teams deal with every
            day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`bg-surface border border-stroke rounded-3xl p-7 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_0_1px_rgba(0,200,150,0.3)] ${colSpanClass[feature.cols]}`}
            >
              <div className="bg-bg rounded-xl w-10 h-10 flex items-center justify-center text-xl border border-stroke">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-text-primary mt-4 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {feature.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
