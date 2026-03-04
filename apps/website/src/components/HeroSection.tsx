import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import WaveformCanvas from "./WaveformCanvas";

const ROLES = ["Salesforce.", "Workday.", "your SaaS.", "any React app."];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ ease: "power3.out" });

      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          stagger: 0.1,
        },
        0.3
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("npm install @conscious/react");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API may fail in some contexts
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 opacity-40">
        <WaveformCanvas />
      </div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6">
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          VOICE INPUT FOR ENTERPRISE SAAS
        </p>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Kill the
          <br />
          <span className="accent-gradient-text">Input Tax.</span>
        </h1>

        <p className="blur-in text-lg md:text-xl text-muted mb-4">
          Voice input for{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="font-display italic text-accent animate-role-fade-in inline-block"
            >
              {ROLES[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mx-auto mb-12">
          Users speak at 150 WPM. Forms force them to type at 40. Conscious
          closes the gap — three lines of code, every field, zero UI disruption.
        </p>

        <div className="blur-in flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Install button */}
          <div className="relative">
            <button
              onClick={handleCopy}
              className="rounded-full text-sm px-7 py-3.5 transition-all duration-300 bg-accent text-bg font-mono hover:scale-105 inline-flex items-center gap-2"
            >
              npm install @conscious/react
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-accent bg-surface px-2 py-1 rounded">
                Copied!
              </span>
            )}
          </div>

          {/* Docs button */}
          <a
            href="#docs"
            className="rounded-full text-sm px-7 py-3.5 transition-all duration-300 border-2 border-stroke bg-bg text-text-primary hover:scale-105 inline-flex items-center gap-2"
          >
            See the Docs
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-3 accent-gradient animate-scroll-down absolute" />
        </div>
      </div>
    </section>
  );
}
