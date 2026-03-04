"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import WaveformCanvas from "./WaveformCanvas";

export default function ContactFooter() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!marqueeRef.current) return;
    const anim = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
    return () => { anim.kill(); };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const marqueeText = "VOICE FIRST \u2022 ENTERPRISE READY \u2022 ";

  return (
    <section id="contact" className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 scale-y-[-1] opacity-30">
        <WaveformCanvas />
      </div>
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent z-10" />

      {/* Marquee */}
      <div className="relative z-20 overflow-hidden mb-16">
        <div ref={marqueeRef} className="whitespace-nowrap">
          <span className="text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary/10">
            {marqueeText.repeat(10)}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-20 text-center max-w-2xl mx-auto px-6">
        <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">
          EARLY ACCESS
        </p>

        <h2 className="text-4xl md:text-6xl font-display italic text-text-primary mb-4">
          Ready to kill{" "}
          <span className="accent-gradient-text">the tax?</span>
        </h2>

        <p className="text-base text-muted mb-8">
          Join the waitlist. First 100 developers get lifetime pro access and a
          direct line to the team.
        </p>

        {submitted ? (
          <p className="text-accent font-semibold">You&apos;re on the list. &#10003;</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="bg-surface border border-stroke rounded-full px-6 py-3 text-sm text-text-primary w-full max-w-sm placeholder:text-muted outline-none focus:border-accent/50"
            />
            <button
              type="submit"
              className="bg-accent text-bg font-semibold rounded-full px-6 py-3 text-sm hover:scale-105 transition-transform whitespace-nowrap"
            >
              Join the Waitlist
            </button>
          </form>
        )}

        <p className="text-xs text-muted mt-4">
          No spam. No BS. Unsubscribe anytime.
        </p>
      </div>

      {/* Footer Bar */}
      <div className="relative z-20 border-t border-stroke mt-16 pt-8 max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-6">
          {["GitHub", "Twitter / X", "npm"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-muted hover:text-text-primary hover:-translate-y-0.5 transition-all"
            >
              {link}
            </a>
          ))}
        </div>

        <p className="text-xs text-muted">
          &copy; 2026 Conscious. Built for developers.
        </p>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-sm text-muted">SDK in active development</span>
        </div>
      </div>
    </section>
  );
}
