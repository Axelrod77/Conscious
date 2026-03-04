import { useEffect, useRef } from "react";

interface WaveformCanvasProps {
  className?: string;
}

const BAR_COUNT = 60;
const BAR_WIDTH = 3;
const BAR_GAP = 4;
const ACTIVE_START = 24;
const ACTIVE_END = 35;

export default function WaveformCanvas({ className }: WaveformCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const totalWidth = BAR_COUNT * BAR_WIDTH + (BAR_COUNT - 1) * BAR_GAP;

    const draw = (time: number) => {
      const t = time * 0.001;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const startX = (w - totalWidth) / 2;
      const centerY = h / 2;
      const maxBarHeight = h * 0.6;

      for (let i = 0; i < BAR_COUNT; i++) {
        const x = startX + i * (BAR_WIDTH + BAR_GAP);
        const wave = Math.sin(t + i * 0.3);
        const barHeight = Math.abs(wave) * maxBarHeight * 0.5 + maxBarHeight * 0.05;

        const isActive = i >= ACTIVE_START && i <= ACTIVE_END;

        if (isActive) {
          ctx.fillStyle = "rgba(0, 200, 150, 0.6)";
        } else {
          const ratio = i / (BAR_COUNT - 1);
          const r = Math.round(0 + ratio * 14);
          const g = Math.round(200 + ratio * (165 - 200));
          const b = Math.round(150 + ratio * (233 - 150));
          const a = 0.15 + ratio * (0.08 - 0.15);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        }

        ctx.fillRect(x, centerY - barHeight / 2, BAR_WIDTH, barHeight);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className ?? ""}`}
    />
  );
}
