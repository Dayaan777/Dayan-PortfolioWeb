'use client';

import { motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { socials } from '@/lib/site';

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/[0.06] px-5 pb-10 pt-20 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-2.5 md:justify-start">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-hover to-accent text-sm font-bold text-white">
                D
              </span>
              <span className="font-display text-lg font-semibold text-white">
                Dayan Khan
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground-secondary">
              Full-Stack Developer crafting fast, modern and meaningful digital
              experiences.
            </p>
          </div>

          {/* Socials */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] text-foreground-secondary transition-all duration-300 hover:border-accent/30 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>

          {/* Back to top */}
          <button
            onClick={toTop}
            className="group flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-[13px] text-foreground-secondary transition-colors hover:border-white/25 hover:text-white"
            data-cursor="hover"
          >
            Back to top
            <FiArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/[0.05] pt-7 text-center text-[12px] text-foreground-secondary/70 sm:flex-row sm:text-left"
        >
          <p>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> Dayan Khan. All rights reserved.</p>
          <p>Designed & built with care.</p>
        </motion.div>
      </div>
    </footer>
  );
}
