'use client';

import { useRef, type MouseEvent } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiArrowUpRight, FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects, type Project } from '@/lib/projects';
import { Reveal, SectionHeading, SectionShell } from '../primitives';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });
  const glowX = useTransform(mx, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(my, [-0.5, 0.5], ['0%', '100%']);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const isOdd = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.06 * (index % 3), ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${isOdd ? 'md:mt-24' : ''}`}
      data-cursor="view"
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-card"
      >
        {/* Mouse-following glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(420px circle at ${gx} ${gy}, ${project.accent}22, transparent 60%)`
            ),
          }}
        />

        <div className="grid md:grid-cols-2">
          {/* Preview */}
          <div className="relative aspect-[16/11] overflow-hidden md:aspect-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent" />
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
              <span className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white/90 backdrop-blur-md">
                {String(index + 1).padStart(2, '0')} —
              </span>
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider backdrop-blur-md"
                style={{ backgroundColor: `${project.accent}22`, color: '#fff' }}
              >
                {project.category}
              </span>
              <span className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/70 backdrop-blur-md">
                {project.year}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="relative flex flex-col justify-between p-7 sm:p-9">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-accent-hover">
                {project.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground-secondary">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-[11px] text-foreground-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px] font-medium text-black transition-transform hover:scale-[1.03] active:scale-95"
              >
                <FiExternalLink size={14} />
                Live Demo
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-[13px] text-white/80 transition-colors hover:border-white/25 hover:text-white"
              >
                <FiGithub size={14} />
                Source Code
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <SectionShell id="work">
      <SectionHeading
        eyebrow="Featured Projects"
        title={
          <>
            Projects that showcase
            <br />
            my development journey.
          </>
        }
        description="A collection of projects that demonstrate my skills in building modern, responsive, and user-focused web applications. From frontend interfaces to complete full-stack solutions, each project highlights a different aspect of my development experience."
      />

      <div className="mt-16 flex flex-col gap-10 md:gap-14">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      <Reveal delay={0.1} className="mt-16 flex justify-center">
        <a
          href="https://github.com/dayankhan"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-foreground-secondary transition-colors hover:border-white/25 hover:text-white"
        >
          More on GitHub
          <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </SectionShell>
  );
}
