'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '@/lib/skills';
import { SectionHeading, SectionShell } from '../primitives';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Skills() {
  const [active, setActive] = useState(skillCategories[0].id);
  const current = skillCategories.find((c) => c.id === active) ?? skillCategories[0];

  return (
    <SectionShell id="skills">
      <SectionHeading
        eyebrow="Capabilities"
        title="The full stack, end to end."
        description="Technologies I reach for to design, build, and ship — organized by the part of the product they serve."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Category selector */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                onMouseEnter={() => setActive(cat.id)}
                onClick={() => setActive(cat.id)}
                className={`group relative flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all duration-300 ${
                  isActive
                    ? 'border-accent/40 bg-accent/[0.06]'
                    : 'border-white/[0.07] bg-card/40 hover:border-white/15'
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                    isActive
                      ? 'bg-accent-hover text-white'
                      : 'bg-white/[0.04] text-foreground-secondary group-hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">{cat.label}</div>
                  <div className="mt-1 text-[11px] leading-snug text-foreground-secondary">
                    {cat.description}
                  </div>
                </div>
                {isActive && (
                  <motion.span
                    layoutId="skill-active"
                    className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-accent-hover"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Skill chips */}
        <div className="relative min-h-[280px] rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.02] to-transparent p-7">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold text-white">
              {current.label}
            </h3>
            <span className="text-[11px] uppercase tracking-[0.2em] text-foreground-secondary/70">
              {current.skills.length} tools
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease }}
              className="flex flex-wrap gap-3"
            >
              {current.skills.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.04 * i, duration: 0.4, ease }}
                    whileHover={{ y: -4 }}
                    className="group/chip flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-card px-4 py-3 transition-colors hover:border-white/20"
                    data-cursor="hover"
                  >
                    <Icon
                      size={18}
                      className="transition-transform group-hover/chip:scale-110"
                      style={{ color: skill.color }}
                    />
                    <span className="text-sm font-medium text-white/90">{skill.name}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        </div>
      </div>
    </SectionShell>
  );
}
