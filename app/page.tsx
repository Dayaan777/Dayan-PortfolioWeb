'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
import Cursor from '@/components/Cursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Timeline from '@/components/sections/Timeline';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      <Cursor />
      <Navbar />

      <main className="relative">
        <div className="relative h-[260vh]">
          <Hero />
          <About />
        </div>
        <Marquee />
        <Projects />
        <Skills />
        <Timeline />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
