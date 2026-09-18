'use client';

import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

const tickerItems = ['Designing with intention', 'Building for the web', 'Dayan Khan'];

export default function About() {
  return (
    <section id="about" className="relative z-20 h-[calc(260vh-100vh)] min-h-[calc(260vh-100vh)] overflow-hidden bg-black text-white">
      <div className="flex h-full flex-col justify-between px-6 py-7 sm:px-10 sm:py-9 md:px-14 lg:px-16">
        <div className="flex items-start justify-between text-[11px] uppercase tracking-[0.2em] text-white/45">
          <span>About</span>
          <span>02/05</span>
        </div>

        <div className="grid gap-12 pb-20 pt-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20 lg:pb-28 lg:pt-28">
          <h2 className="font-condensed text-[clamp(5.5rem,16vw,13rem)] font-bold uppercase leading-[0.78] tracking-[-0.05em] text-white">
            /ABOUT
          </h2>

          <div className="max-w-2xl lg:justify-self-end">
            <div className="flex items-start gap-5">
              <FiArrowUpRight aria-hidden="true" className="mt-1 shrink-0 text-white/55" size={38} strokeWidth={1.2} />
              <p className="max-w-xl text-lg leading-[1.45] text-white/65 sm:text-xl lg:text-2xl">
                I&apos;m Dayan Khan, a full-stack developer and frontend engineer who treats the browser like a canvas. I care about the parts most people never notice: the easing on a hover, the millisecond a page becomes interactive, the way a layout breathes. My work sits at the intersection of engineering and design. I&apos;ve shipped real-time collaboration tools, headless storefronts, analytics platforms, and the design systems that hold them together — always chasing that rare feeling of software that just works.
              </p>
            </div>
            <p className="mt-8 pl-[58px] text-xs uppercase tracking-[0.18em] text-white/40">
              CURRENTLY WORKING WITH X AS A FULL-STACK DEVELOPER
            </p>
          </div>
        </div>

        <div className="-mx-6 overflow-hidden border-t border-white/15 py-4 sm:-mx-10 md:-mx-14 lg:-mx-16">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
            className="flex w-max items-center whitespace-nowrap"
          >
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-8 px-5 text-sm uppercase tracking-[0.18em] text-white/55 sm:text-base">
                {item}
                <span aria-hidden="true" className="text-white/75">✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
