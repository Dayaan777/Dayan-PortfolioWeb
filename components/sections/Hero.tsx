'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowDown, FiDownload, FiArrowUpRight } from 'react-icons/fi';
import { RESUME_URL } from '@/lib/site';

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const scrollToWork = () =>
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero-section"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#ebeae7] pt-24 pb-8 px-6 sm:px-10 md:px-14 lg:px-16"
    >
      {/* 3D Scene — z-20 so it directly overlaps the typography in the center */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" aria-hidden>
        <Scene transparent />
      </div>

      {/* Top subtle availability badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease }}
        className="relative z-10 flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.2em] text-black/45"
      >
        <span className="relative flex h-2 w-2">
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1fa89b]" />
        </span>
        <span>Available for select projects</span>
      </motion.div>

      {/* Center 3-Line Massive Stacked Typography */}
      <motion.div
        style={{ y: yText, opacity, scale }}
        className="relative z-10 my-auto flex flex-col items-center justify-center py-6 select-none"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative flex flex-col items-center"
        >
          {/* Subtle left indicator matching reference image */}
          <span
            className="absolute -left-6 sm:-left-10 md:-left-12 top-4 hidden sm:block font-mono text-xl font-bold text-black/35"
            aria-hidden
          >
            &lt;
          </span>

          {/* 3 Lines of Bold, Tightly-Stacked Headline */}
          <motion.h1
            variants={item}
            className="font-display font-black tracking-[-0.04em] leading-[0.82] text-[#0d0d0d] text-center"
            style={{ fontSize: 'clamp(4.2rem, 14.5vw, 15rem)' }}
          >
            <span className="block">DAYAN</span>
            <span className="block">KHAN</span>
            <span className="block text-[#141414]">DEVELOPER</span>
          </motion.h1>

          {/* Role + Quote + CTAs seamlessly integrated */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center text-center gap-4 max-w-2xl"
          >
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] font-medium text-black/50">
              Full-Stack Developer · Frontend Engineer · UI/UX
            </p>

            <p className="text-[13px] sm:text-sm leading-relaxed text-black/45 max-w-md italic">
              &ldquo;I build fast, modern and meaningful digital experiences.&rdquo;
            </p>

            {/* CTAs */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
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
                className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-black/[0.02] px-6 py-2.5 text-xs font-medium tracking-wide text-black/70 transition-all hover:bg-black/5 hover:text-black hover:border-black/35"
              >
                <FiDownload size={13} /> Resume
              </a>
              <a
                href="#contact"
                className="px-3 py-2 text-xs font-medium tracking-wide text-black/45 transition-colors hover:text-black"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Utility Bar: Site name left, Scroll to explore right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
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

      {/* Optional Right-Edge Vertical Badge (Matching reference image teal tag) */}
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

