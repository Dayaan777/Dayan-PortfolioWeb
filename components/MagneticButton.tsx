'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function MagneticButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  strength = 0.35,
  cursor,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'ghost' | 'outline';
  className?: string;
  strength?: number;
  cursor?: 'hover' | 'view';
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20 });
  const sy = useSpring(y, { stiffness: 260, damping: 20 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors duration-300 will-change-transform';
  const variants = {
    primary: 'bg-accent-hover text-white hover:bg-accent glow-accent',
    outline:
      'border border-white/15 text-white/90 hover:border-white/30 hover:bg-white/5',
    ghost: 'text-white/80 hover:text-white',
  };

  const content = (
    <motion.span
      ref={ref as never}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      data-cursor={cursor ?? 'hover'}
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}
      role={href ? undefined : 'button'}
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) onClick();
      }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="inline-block"
      >
        {content}
      </motion.a>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="inline-block"
    >
      {content}
    </motion.div>
  );
}
