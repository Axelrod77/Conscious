"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "npm install @conscious/react",
    description: "Add the package",
  },
  {
    number: 2,
    title: "Wrap with <ConsciousProvider>",
    description: "Configure your proxy endpoint",
  },
  {
    number: 3,
    title: "Use <ConsciousInput>",
    description: "Drop-in replacement, zero prop changes needed",
  },
];

const codeLines = [
  { tokens: [{ text: "import", color: "text-violet-400" }, { text: " { ", color: "text-text-primary/60" }, { text: "ConsciousProvider", color: "text-sky-400" }, { text: ", ", color: "text-text-primary/60" }, { text: "ConsciousInput", color: "text-sky-400" }, { text: " } ", color: "text-text-primary/60" }, { text: "from", color: "text-violet-400" }, { text: " ", color: "text-text-primary/60" }, { text: "'@conscious/react'", color: "text-emerald-400" }] },
  { tokens: [] },
  { tokens: [{ text: "function", color: "text-violet-400" }, { text: " App", color: "text-sky-400" }, { text: "() {", color: "text-text-primary/60" }] },
  { tokens: [{ text: "  ", color: "" }, { text: "return", color: "text-violet-400" }, { text: " (", color: "text-text-primary/60" }] },
  { tokens: [{ text: "    <", color: "text-text-primary/60" }, { text: "ConsciousProvider", color: "text-sky-400" }] },
  { tokens: [{ text: "      ", color: "" }, { text: "apiUrl", color: "text-amber-300" }, { text: "=", color: "text-text-primary/60" }, { text: "\"/api/voice\"", color: "text-emerald-400" }] },
  { tokens: [{ text: "      ", color: "" }, { text: "theme", color: "text-amber-300" }, { text: "=", color: "text-text-primary/60" }, { text: "\"dark\"", color: "text-emerald-400" }] },
  { tokens: [{ text: "      ", color: "" }, { text: "hotkey", color: "text-amber-300" }, { text: "=", color: "text-text-primary/60" }, { text: "\"Space\"", color: "text-emerald-400" }] },
  { tokens: [{ text: "    >", color: "text-text-primary/60" }] },
  { tokens: [{ text: "      <", color: "text-text-primary/60" }, { text: "form", color: "text-sky-400" }, { text: ">", color: "text-text-primary/60" }] },
  { tokens: [{ text: "        <", color: "text-text-primary/60" }, { text: "ConsciousInput", color: "text-sky-400" }] },
  { tokens: [{ text: "          ", color: "" }, { text: "type", color: "text-amber-300" }, { text: "=", color: "text-text-primary/60" }, { text: "\"text\"", color: "text-emerald-400" }] },
  { tokens: [{ text: "          ", color: "" }, { text: "placeholder", color: "text-amber-300" }, { text: "=", color: "text-text-primary/60" }, { text: "\"Hold Space to speak...\"", color: "text-emerald-400" }] },
  { tokens: [{ text: "          ", color: "" }, { text: "name", color: "text-amber-300" }, { text: "=", color: "text-text-primary/60" }, { text: "\"company\"", color: "text-emerald-400" }] },
  { tokens: [{ text: "        />", color: "text-text-primary/60" }] },
  { tokens: [{ text: "        <", color: "text-text-primary/60" }, { text: "ConsciousInput", color: "text-sky-400" }] },
  { tokens: [{ text: "          ", color: "" }, { text: "type", color: "text-amber-300" }, { text: "=", color: "text-text-primary/60" }, { text: "\"email\"", color: "text-emerald-400" }] },
  { tokens: [{ text: "          ", color: "" }, { text: "placeholder", color: "text-amber-300" }, { text: "=", color: "text-text-primary/60" }, { text: "\"your@email.com\"", color: "text-emerald-400" }] },
  { tokens: [{ text: "          ", color: "" }, { text: "name", color: "text-amber-300" }, { text: "=", color: "text-text-primary/60" }, { text: "\"email\"", color: "text-emerald-400" }] },
  { tokens: [{ text: "        />", color: "text-text-primary/60" }] },
  { tokens: [{ text: "      </", color: "text-text-primary/60" }, { text: "form", color: "text-sky-400" }, { text: ">", color: "text-text-primary/60" }] },
  { tokens: [{ text: "    </", color: "text-text-primary/60" }, { text: "ConsciousProvider", color: "text-sky-400" }, { text: ">", color: "text-text-primary/60" }] },
  { tokens: [{ text: "  )", color: "text-text-primary/60" }] },
  { tokens: [{ text: "}", color: "text-text-primary/60" }] },
];

const rawCode = `import { ConsciousProvider, ConsciousInput } from '@conscious/react'

function App() {
  return (
    <ConsciousProvider
      apiUrl="/api/voice"
      theme="dark"
      hotkey="Space"
    >
      <form>
        <ConsciousInput
          type="text"
          placeholder="Hold Space to speak..."
          name="company"
        />
        <ConsciousInput
          type="email"
          placeholder="your@email.com"
          name="email"
        />
      </form>
    </ConsciousProvider>
  )
}`;

export default function CodeSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API may fail
    }
  };

  return (
    <section id="code" className="bg-surface/50 py-16 md:py-24 border-y border-stroke">
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
              Integration
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-4">
            Three lines.{" "}
            <span className="accent-gradient-text">Every field.</span>
          </h2>

          <p className="text-base md:text-lg text-muted max-w-2xl mb-12">
            No new infrastructure. One npm install. Works with any React app.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col"
          >
            {steps.map((step, i) => (
              <div key={step.number}>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full accent-gradient text-bg text-sm font-bold flex items-center justify-center shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <p className="font-mono text-sm text-accent">
                      {step.title}
                    </p>
                    <p className="text-sm text-muted">{step.description}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px h-6 bg-stroke ml-4" />
                )}
              </div>
            ))}
          </motion.div>

          {/* Right — Code Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-bg border border-stroke rounded-2xl overflow-hidden"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-stroke">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-muted font-mono">App.tsx</span>
              <button
                onClick={handleCopy}
                className="text-xs text-muted hover:text-text-primary cursor-pointer transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Code content */}
            <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
              <table className="border-collapse">
                <tbody>
                  {codeLines.map((line, i) => (
                    <tr key={i}>
                      <td className="text-muted/40 text-right pr-4 select-none align-top w-8">
                        {i + 1}
                      </td>
                      <td className="whitespace-pre">
                        {line.tokens.length === 0 ? (
                          <span>&nbsp;</span>
                        ) : (
                          line.tokens.map((token, j) => (
                            <span key={j} className={token.color}>
                              {token.text}
                            </span>
                          ))
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
