"use client";

import { motion } from "framer-motion";

type WaveformProps = {
  active?: boolean;
  className?: string;
};

const bars = [28, 44, 32, 58, 38, 68, 46, 54, 34, 64, 42, 52, 30, 48];

export function Waveform({ active = false, className }: WaveformProps) {
  return (
    <div className={className} aria-label={active ? "Recording audio" : "Audio idle"}>
      <div className="flex h-16 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-4">
        {bars.map((height, index) => (
          <motion.span
            key={`${height}-${index}`}
            className={active ? "w-1.5 rounded-full bg-blue-600" : "w-1.5 rounded-full bg-slate-300"}
            animate={
              active
                ? {
                    height: [16, height, 20 + ((index * 7) % 28), height - 8],
                    opacity: [0.45, 1, 0.65, 0.9],
                  }
                : { height: 18, opacity: 0.45 }
            }
            transition={{
              delay: index * 0.04,
              duration: 0.9,
              ease: "easeInOut",
              repeat: active ? Infinity : 0,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>
    </div>
  );
}
