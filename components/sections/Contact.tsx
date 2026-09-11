'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { socials, contactMeta, EMAIL } from '@/lib/site';
import { supabase } from '@/lib/supabase';
import { SectionHeading, SectionShell, Reveal } from '../primitives';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setErrorMsg('');

    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });

      if (error) throw error;

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <SectionShell id="contact">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* Left — info */}
        <div>
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Let&apos;s build
                <br />
                something great.
              </>
            }
            description="Have a project in mind, a role to fill, or just want to talk shop? My inbox is always open."
          />

          <Reveal delay={0.1}>
            <div className="mt-8 space-y-3">
              {contactMeta.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-card/30 px-4 py-3"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-accent-hover">
                      <Icon size={16} />
                    </span>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-foreground-secondary/70">
                        {m.label}
                      </div>
                      <div className="text-sm font-medium text-white">{m.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-card/30 px-4 py-3 transition-all duration-300 hover:border-accent/30 hover:bg-accent/[0.05]"
                    data-cursor="hover"
                  >
                    <Icon size={16} className="text-foreground-secondary transition-colors group-hover:text-white" />
                    <span className="text-sm text-white/80 transition-colors group-hover:text-white">
                      {s.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-6 inline-block font-display text-xl font-semibold text-white/90 underline decoration-accent/40 decoration-2 underline-offset-4 transition-colors hover:text-white hover:decoration-accent-hover"
            >
              {EMAIL}
            </a>
          </Reveal>
        </div>

        {/* Right — form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-card/40 p-7 sm:p-9"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" htmlFor="name">
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Your name"
                    className="input"
                  />
                </Field>
                <Field label="Email" htmlFor="email">
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@email.com"
                    className="input"
                  />
                </Field>
              </div>

              <Field label="Subject" htmlFor="subject">
                <input
                  id="subject"
                  required
                  value={form.subject}
                  onChange={update('subject')}
                  placeholder="What's this about?"
                  className="input"
                />
              </Field>

              <Field label="Message" htmlFor="message">
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell me a little about it..."
                  className="input resize-none"
                />
              </Field>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className="group relative flex items-center justify-center gap-2 rounded-full bg-accent-hover px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-accent disabled:opacity-70 glow-accent"
                data-cursor="hover"
              >
                <AnimatePresence mode="wait">
                  {status === 'submitting' && (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <FiLoader className="animate-spin" size={16} /> Sending...
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <FiCheckCircle size={16} /> Message sent
                    </motion.span>
                  )}
                  {(status === 'idle' || status === 'error') && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      Send Message
                      <FiSend size={15} className="transition-transform group-hover:translate-x-0.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-red-400"
                  >
                    <FiAlertCircle size={14} /> {errorMsg}
                  </motion.p>
                )}
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-emerald-400"
                  >
                    Thanks for reaching out — I&apos;ll get back to you shortly.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[11px] uppercase tracking-[0.18em] text-foreground-secondary/80">
        {label}
      </label>
      {children}
    </div>
  );
}
