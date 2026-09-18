'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current: string | null = null;
      for (const link of links) {
        const id = link.href.slice(1);
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setActive(href.slice(1));
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[90] flex justify-center px-4 pt-4 md:px-8"
      >
        <nav
          className={`flex w-full items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'max-w-5xl rounded-2xl border border-white/10 bg-background/80 px-4 py-2.5 backdrop-blur-xl shadow-2xl'
              : 'max-w-7xl border-transparent bg-transparent px-2 py-4 md:px-6'
          }`}
        >
          <button
            onClick={() => go('#work')}
            className="group flex items-center gap-2.5"
            aria-label="Dayan Khan — home"
          >
            <span
              className={`relative flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all duration-300 ${
                scrolled
                  ? 'bg-gradient-to-br from-accent-hover to-accent text-white'
                  : 'border border-black/20 bg-black/5 text-black font-display'
              }`}
            >
              DK
            </span>
            <span
              className={`font-display text-sm font-semibold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-white/90' : 'text-neutral-900'
              }`}
            >
              Dayan Khan
            </span>
          </button>

          <div className="hidden items-center gap-2 md:flex lg:gap-3">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className={`relative rounded-lg px-3.5 py-2 text-[12px] uppercase tracking-[0.2em] font-medium transition-colors ${
                  scrolled
                    ? 'text-foreground-secondary hover:text-white'
                    : 'text-neutral-700 hover:text-black'
                }`}
              >
                {active === l.href.slice(1) && (
                  <motion.span
                    layoutId="nav-active"
                    className={`absolute inset-0 rounded-lg ${
                      scrolled ? 'bg-white/5' : 'bg-black/[0.04]'
                    }`}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => go('#contact')}
            className={`hidden rounded-full px-5 py-2 text-[12px] font-medium tracking-wide transition-all hover:scale-[1.03] active:scale-95 md:block ${
              scrolled
                ? 'bg-white text-black'
                : 'bg-[#0c0c0c] text-white hover:opacity-80'
            }`}
          >
            Let&apos;s talk
          </button>

          <button
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors md:hidden ${
              scrolled
                ? 'border-white/10 text-white'
                : 'border-black/15 text-black bg-black/5'
            }`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[88] bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2 px-6 pt-28">
              {links.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => go(l.href)}
                  className="border-b border-white/5 py-5 text-left font-display text-3xl font-semibold text-white/90"
                >
                  {l.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
