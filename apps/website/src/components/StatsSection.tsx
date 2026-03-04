"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "185",
    unit: "",
    label: "Tests Passing",
    sublabel: "Across 21 test files. Unit, integration, and E2E.",
  },
  {
    number: "<300",
    unit: "ms",
    label: "Transcription Latency",
    sublabel: "WebSocket streaming, 1s audio chunks, real-time partials.",
  },
  {
    number: "3",
    unit: "",
    label: "Lines to Integrate",
    sublabel: "Provider. Component. Done. No DevOps required.",
  },
];

export default function StatsSection() {
  return (
    <section id="stats" className="bg-bg py-16 md:py-24">
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
              By the Numbers
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-4">
            Built to{" "}
            <span className="accent-gradient-text">production standard.</span>
          </h2>

          <p className="text-base md:text-lg text-muted max-w-2xl mb-12">
            Conscious isn&apos;t a prototype. 185 passing tests, strict
            TypeScript, monorepo architecture, and a CI pipeline that validates
            the full stack on every commit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic tracking-tighter text-text-primary">
                {stat.number}
                {stat.unit && (
                  <span className="text-accent">{stat.unit}</span>
                )}
              </p>

              <div className="h-px bg-stroke my-4" />

              <p className="text-sm font-semibold text-text-primary mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-muted">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
