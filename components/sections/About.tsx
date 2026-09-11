'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { stats } from '@/lib/site';
import { SectionHeading, SectionShell, Reveal } from '../primitives';

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        setDisplay(
          value >= 1000 ? Math.round(v).toLocaleString() : Math.round(v).toString()
        );
      },
    });
    return controls.stop;
  }, [inView, value, count]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <SectionShell id="about">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Portrait */}
        <Reveal>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/[0.08] bg-card">
              <img
                src="/WhatsApp_Image_2026-07-24_at_12.34.43_AM.jpeg"
                alt="Dayan Khan"
                className="h-full w-full object-cover opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-3xl" />

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div>
                  <p className="font-display text-lg font-semibold text-white">Dayan Khan</p>
                  <p className="text-xs text-foreground-secondary">Full-Stack Developer</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                  <span className="text-[11px] text-white/80">Available</span>
                </div>
              </div>
            </div>

            {/* Accent frame offset */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl border border-accent/20" />
          </div>
        </Reveal>

        {/* Content */}
        <div>
          <SectionHeading
            eyebrow="About"
            title={
              <>
                I turn ideas into
                <br />
                polished products.
              </>
            }
          />

          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground-secondary">
              <p>
                I&apos;m Dayan Khan, a full-stack developer and frontend engineer who
                treats the browser like a canvas. I care about the parts most people
                never notice: the easing on a hover, the millisecond a page becomes
                interactive, the way a layout breathes.
              </p>
              <p>
                My work sits at the intersection of engineering and design. I&apos;ve
                shipped real-time collaboration tools, headless storefronts, analytics
                platforms, and the design systems that hold them together — always
                chasing that rare feeling of software that just works.
              </p>
            </div>
          </Reveal>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.08 * i}>
                <div className="group relative bg-card/40 p-5 transition-colors hover:bg-white/[0.03]">
                  <div className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    <AnimatedNumber value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1.5 text-[12px] font-medium text-white/80">
                    {s.label}
                  </div>
                  <div className="mt-0.5 text-[11px] text-foreground-secondary/70">
                    {s.hint}
                  </div>
                  <div className="absolute left-5 top-5 h-1 w-1 rounded-full bg-accent-hover opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
