"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "150",
    unit: "WPM",
    label: "Average speech speed",
    sublabel: "How fast your users can think out loud.",
  },
  {
    number: "40",
    unit: "WPM",
    label: "Average typing speed",
    sublabel: "How fast your forms let them express it.",
  },
  {
    number: "3.75×",
    unit: "",
    label: "The gap Conscious closes",
    sublabel: "Three lines of code. Every field. Zero friction.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-bg py-16 md:py-24">
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
              The Problem
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-4">
            The <span className="italic">invisible tax</span> on every form.
          </h2>

          <p className="text-base md:text-lg text-muted max-w-2xl mb-12">
            Enterprise SaaS teams spend millions building beautiful interfaces.
            Then users spend thousands of hours typing into them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`bg-surface border border-stroke rounded-3xl p-8 transition-all duration-300 hover:scale-[1.01]${i === 2 ? " hover:shadow-[0_0_0_1px_rgba(0,200,150,0.3)]" : ""}`}
            >
              <p className="text-6xl md:text-8xl font-display italic text-text-primary">
                {stat.number}
                {stat.unit && (
                  <span className="text-accent ml-1">{stat.unit}</span>
                )}
              </p>

              <div className="h-px bg-stroke my-6" />

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
