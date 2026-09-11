'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

const items = [
  'React',
  'Next.js',
  'TypeScript',
  'Three.js',
  'Tailwind',
  'Node.js',
  'Supabase',
  'Framer Motion',
  'PostgreSQL',
  'UI/UX',
  'Design Systems',
  'WebGL',
];

export default function Marquee() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-28%']);
  const xRev = useTransform(scrollYProgress, [0, 1], ['-14%', '14%']);

  return (
    <div className="relative overflow-hidden border-y border-white/[0.05] bg-bg-secondary py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0E0E0E] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0E0E0E] to-transparent" />

      <motion.div style={{ x }} className="flex gap-8 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-2xl font-semibold text-white/15 sm:text-3xl">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent/30" />
          </span>
        ))}
      </motion.div>

      <motion.div style={{ x: xRev }} className="mt-5 flex gap-6 whitespace-nowrap">
        {[...items].reverse().map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="text-sm uppercase tracking-[0.2em] text-foreground-secondary/30">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/10" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
