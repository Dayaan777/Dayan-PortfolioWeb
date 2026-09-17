'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('work');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = links.map((l) => l.href.slice(1));
      let current = sections[0];
      for (const id of sections) {
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
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[90] flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-500 ${
            scrolled
              ? 'border-white/10 bg-background/80 backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <button
            onClick={() => go('#work')}
            className="group flex items-center gap-2.5"
            aria-label="Dayan Khan — home"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-hover to-accent text-sm font-bold text-white">
              D
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-white/90">
              Dayan Khan
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="relative rounded-lg px-3.5 py-2 text-[13px] text-foreground-secondary transition-colors hover:text-white"
              >
                {active === l.href.slice(1) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-white/5"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => go('#contact')}
            className="hidden rounded-lg bg-white px-4 py-2 text-[13px] font-medium text-black transition-transform hover:scale-[1.03] active:scale-95 md:block"
          >
            Let&apos;s talk
          </button>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
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
