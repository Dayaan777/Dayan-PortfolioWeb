'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    let start = 0;
    const duration = 2000;

    const tick = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start;
      const eased = 1 - Math.pow(1 - Math.min(elapsed / duration, 1), 3);
      const next = Math.round(eased * 100);
      setProgress((p) => (next > p ? next : p));
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => setDone(true), 520);
        setTimeout(onComplete, 1200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[#050505]"
          exit={{ opacity: 0, transition: { duration: 0.6, ease } }}
        >
          <div className="absolute inset-0 bg-grid mask-radial opacity-30" />
          <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px] animate-pulse-glow" />

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease }}
              className="mb-10"
            >
              <LogoMark />
            </motion.div>

            <div className="relative h-px w-[240px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-accent-hover to-accent-hover"
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear', duration: 0.1 }}
              />
            </div>

            <div className="mt-5 flex w-[240px] items-center justify-between text-[11px] uppercase tracking-[0.2em] text-foreground-secondary">
              <span>Loading</span>
              <span className="tabular-nums text-foreground/80">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LogoMark() {
  return (
    <div className="relative h-16 w-16">
      <motion.div
        className="absolute inset-0 rounded-[14px] border border-white/15"
        animate={{ rotate: 180 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-[7px] rounded-[9px] bg-gradient-to-br from-accent-hover to-accent"
        animate={{ scale: [1, 0.9, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-xl font-bold text-white">D</span>
      </div>
    </div>
  );
}
