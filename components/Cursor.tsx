'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState<'default' | 'hover' | 'view'>('default');
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-cursor="view"]')) {
        setVariant('view');
      } else if (target?.closest('a, button, [data-cursor="hover"]')) {
        setVariant('hover');
      } else {
        setVariant('default');
      }
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (!enabled) return null;

  const sizes = {
    default: { width: 8, height: 8, label: '' },
    hover: { width: 44, height: 44, label: '' },
    view: { width: 84, height: 84, label: 'View' },
  } as const;
  const size = sizes[variant];

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      aria-hidden
    >
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-white/30 backdrop-invert-0"
        animate={{
          x: position.x - size.width / 2,
          y: position.y - size.height / 2,
          width: size.width,
          height: size.height,
          opacity: visible ? 1 : 0,
          backgroundColor:
            variant === 'view' ? 'rgba(160,40,77,0.18)' : 'rgba(255,255,255,0.04)',
        }}
        transition={{ type: 'spring', mass: 0.3, stiffness: 600, damping: 34 }}
      >
        <AnimatePresence>
          {size.label && (
            <motion.span
              key={size.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/90"
            >
              {size.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
