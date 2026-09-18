'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowDown, FiDownload, FiArrowUpRight } from 'react-icons/fi';
import { RESUME_URL } from '@/lib/site';

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 65]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const scrollToWork = () =>
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero-section"
      ref={ref}
      className="sticky top-0 z-10 flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#ffffff] pt-24 pb-8 px-6 sm:px-10 md:px-14 lg:px-16"
    >
      {/* Top row: Availability badge left · Developer / Role label right */}
      <div className="relative z-30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease }}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-black/50"
        >
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1fa89b]" />
          </span>
          <span>Available for select projects</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease }}
          className="text-[11px] sm:text-xs uppercase tracking-[0.24em] font-medium text-black/50"
        >
          Developer · Full-Stack · Frontend · UI/UX
        </motion.p>
      </div>

      {/* Centerpiece: 2-Line Massive Stacked Headline with Centered Layered Portrait Photo */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 my-auto flex flex-col items-center justify-center py-4 w-full select-none"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative flex flex-col items-center w-full"
        >
          {/* Relative wrapper holding both the typography and the centered overlapping portrait */}
          <div className="relative flex items-center justify-center w-full overflow-visible">
            {/* Massive 2-Line Headline: DAYAN / KHAN extending towards viewport edges */}
            <motion.h1
              variants={item}
              style={{ y: yText, fontSize: 'clamp(5.5rem, 21.5vw, 24rem)' }}
              className="relative z-10 flex flex-col items-center text-center font-condensed font-bold uppercase leading-[0.8] tracking-[-0.03em] text-[#0a0a0a] w-full"
            >
              <span className="block w-full">DAYAN</span>
              <span className="block w-full">KHAN</span>
            </motion.h1>

            {/* Centered Portrait Photo overlapping/interrupting the typography */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <motion.img
                src="/images/hero/dayan-khan-portrait.png"
                alt="Dayan Khan"
                initial={{ filter: 'grayscale(100%)', opacity: 0, scale: 0.94 }}
                animate={{ filter: 'grayscale(0%)', opacity: 1, scale: 1 }}
                transition={{
                  filter: { duration: 1.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.8, delay: 0.15 },
                  scale: { duration: 1.0, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
                }}
                style={{ y: yPhoto }}
                className="h-[320px] sm:h-[400px] md:h-[480px] lg:h-[540px] xl:h-[580px] w-auto max-w-none object-contain select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            variants={item}
            className="relative z-30 mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={scrollToWork}
              className="inline-flex items-center gap-2 rounded-full bg-[#0d0d0d] px-6 py-2.5 text-xs font-medium tracking-wide text-white transition-all hover:bg-black/80 hover:scale-[1.02] active:scale-95"
            >
              View Projects <FiArrowUpRight size={14} />
            </button>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#0d0d0d]/30 bg-transparent px-6 py-2.5 text-xs font-medium tracking-wide text-[#0d0d0d] transition-all hover:bg-[#0d0d0d]/5 hover:border-[#0d0d0d] active:scale-95"
            >
              <FiDownload size={13} className="text-[#0d0d0d]" /> Resume
            </a>
            <a
              href="#contact"
              className="px-4 py-2.5 text-xs font-medium tracking-wide text-[#222222] rounded-full transition-colors hover:text-black hover:bg-[#0d0d0d]/5"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Utility Bar: Site name left, Scroll to explore right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        style={{ opacity }}
        className="relative z-30 flex items-center justify-between pt-4"
      >
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-black/40">
          Dayan Khan
        </span>

        <button
          onClick={scrollToWork}
          aria-label="Scroll to explore projects"
          className="group flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-black/40 transition-colors hover:text-black"
        >
          <span>Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex"
          >
            <FiArrowDown size={13} />
          </motion.span>
        </button>
      </motion.div>

      {/* Right-Edge Vertical Badge (Matching reference image teal tag) */}
      <div
        className="pointer-events-none fixed right-0 top-1/2 z-40 -translate-y-1/2 hidden md:block"
        aria-hidden
      >
        <div className="flex items-center justify-center rounded-l-md bg-[#1fa89b] px-1.5 py-4 shadow-sm">
          <span
            className="text-[8px] font-bold uppercase tracking-[0.22em] text-white"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Portfolio · 2026
          </span>
        </div>
      </div>
    </section>
  );
}

