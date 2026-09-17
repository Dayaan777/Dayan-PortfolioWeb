'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timeline } from '@/lib/timeline';
import { SectionHeading, SectionShell } from '../primitives';

const tagStyles: Record<string, string> = {
  Work: 'bg-accent/15 text-accent-hover border-accent/20',
  Learning: 'bg-blue-500/10 text-blue-300 border-blue-400/20',
  Project: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20',
  Milestone: 'bg-amber-500/10 text-amber-300 border-amber-400/20',
};

function TimelineItem({ entry, index }: { entry: (typeof timeline)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.4'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const dotScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative pl-12 sm:pl-20">
      {/* Dot */}
      <motion.div
        style={{ scale: dotScale }}
        className="absolute left-[14px] top-2 z-10 sm:left-[34px]"
      >
        <div className="relative flex h-3 w-3 items-center justify-center">
          <span className="absolute h-full w-full rounded-full bg-accent-hover/40 blur-[6px]" />
          <span className="relative h-3 w-3 rounded-full border-2 border-accent-hover bg-background" />
        </div>
      </motion.div>

      <div className="group rounded-2xl border border-white/[0.06] bg-card/30 p-6 transition-colors duration-300 hover:border-white/[0.12] hover:bg-card/50">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-2xl font-bold text-white">{entry.year}</span>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${tagStyles[entry.tag]}`}
          >
            {entry.tag}
          </span>
        </div>
        <h3 className="mt-3 text-base font-semibold text-white">{entry.title}</h3>
        <p className="text-[13px] text-accent-hover/90">{entry.org}</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
          {entry.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 0.8', 'end 0.5'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <SectionShell id="journey">
      <SectionHeading
        eyebrow="Journey"
        title="The path so far."
        description="Six years of learning, building, and shipping — the milestones that shaped how I work."
      />

      <div ref={lineRef} className="relative mt-16">
        {/* Track */}
        <div className="absolute left-[20px] top-0 h-full w-px bg-white/[0.06] sm:left-[40px]">
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: 'top' }}
            className="h-full w-full bg-gradient-to-b from-accent-hover via-accent to-transparent"
          />
        </div>

        <div className="space-y-8">
          {timeline.map((entry, i) => (
            <TimelineItem key={entry.year + entry.title} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
