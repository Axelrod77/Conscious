import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Speak.", "Transcribe.", "Ship."];
const DURATION_MS = 2700;
const CYCLE_MS = 900;
const COMPLETE_DELAY_MS = 400;

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const completedRef = useRef(false);

  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setTimeout(onComplete, COMPLETE_DELAY_MS);
  }, [onComplete]);

  // Counter animation via requestAnimationFrame
  useEffect(() => {
    const tick = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / DURATION_MS, 1);
      const value = Math.round(progress * 150);

      setCount(value);

      if (value >= 150) {
        handleComplete();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [handleComplete]);

  // Word cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between overflow-hidden">
      {/* Top-left: brand */}
      <motion.div
        className="p-6 md:p-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="text-xs text-muted uppercase tracking-[0.3em]">
          conscious
        </span>
      </motion.div>

      {/* Center: rotating words */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom section */}
      <div>
        {/* Counter — bottom right */}
        <div className="flex justify-end px-6 md:px-10 pb-6">
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums">
            {String(count).padStart(3, "0")}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[3px] bg-stroke/50 w-full">
          <div
            className="h-full accent-gradient origin-left"
            style={{
              transform: `scaleX(${count / 150})`,
              boxShadow: "0 0 8px rgba(0, 200, 150, 0.35)",
              transition: "transform 0.05s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
