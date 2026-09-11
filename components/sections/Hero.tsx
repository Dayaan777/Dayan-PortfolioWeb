'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowDown, FiDownload, FiArrowUpRight } from 'react-icons/fi';
import MagneticButton from '@/components/MagneticButton';
import { RESUME_URL } from '@/lib/site';

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const scrollToWork = () =>
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5"
    >
      {/* Atmospheric overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_82%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-grid opacity-[0.04]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-[#050505] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-[#050505] to-transparent" />

      <motion.div
        style={{ y: yText, opacity, scale }}
        className="relative z-30 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[12px] text-foreground-secondary backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-hover opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-hover" />
            </span>
            Available for select projects
          </motion.div>

          <motion.h1
            variants={item}
            className="flex items-center justify-center gap-3 font-display text-5xl font-bold leading-[0.95] tracking-tight text-white sm:gap-5 sm:text-7xl md:gap-7 md:text-8xl"
          >
            <span>DAYAN</span>
            <span className="relative inline-flex h-20 w-16 shrink-0 rotate-[-4deg] overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 shadow-2xl shadow-black/40 sm:h-28 sm:w-24 md:h-36 md:w-28">
              <img
                src="/WhatsApp_Image_2026-07-24_at_12.34.43_AM.jpeg"
                alt="Dayan Khan"
                className="h-full w-full object-cover object-center"
              />
            </span>
            <span>KHAN</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-sm uppercase tracking-[0.3em] text-foreground-secondary sm:text-base"
          >
            Full-Stack Developer · Frontend Engineer · UI/UX
          </motion.p>

          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/75 text-balance sm:text-xl"
          >
            &ldquo;I build fast, modern and meaningful digital experiences.&rdquo;
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton onClick={scrollToWork} variant="primary">
              View Projects
              <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            <MagneticButton href={RESUME_URL} variant="outline">
              <FiDownload className="transition-transform group-hover:translate-y-0.5" />
              Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost" cursor="hover">
              Contact Me
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollToWork}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-foreground-secondary"
        aria-label="Scroll to projects"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease }}
        >
          <FiArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
