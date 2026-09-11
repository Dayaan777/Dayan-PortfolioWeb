import type { IconType } from 'react-icons';
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiMapPin, FiZap } from 'react-icons/fi';

export type Social = {
  label: string;
  href: string;
  icon: IconType;
  handle: string;
};

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/dayankhan', icon: FiGithub, handle: '@dayankhan' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/dayankhan', icon: FiLinkedin, handle: 'in/dayankhan' },
  { label: 'Instagram', href: 'https://instagram.com/dayankhan', icon: FiInstagram, handle: '@dayankhan' },
  { label: 'Email', href: 'mailto:hello@dayankhan.dev', icon: FiMail, handle: 'hello@dayankhan.dev' },
];

export const contactMeta = [
  { label: 'Location', value: 'Remote · Worldwide', icon: FiMapPin },
  { label: 'Availability', value: 'Open to opportunities', icon: FiZap },
];

export type Stat = {
  label: string;
  value: number;
  suffix: string;
  hint: string;
};

export const stats: Stat[] = [
  { label: 'Technologies', value: 24, suffix: '+', hint: 'Across the full stack' },
  { label: 'Projects Shipped', value: 30, suffix: '+', hint: 'From prototypes to production' },
  { label: 'GitHub Contributions', value: 1200, suffix: '+', hint: 'In the last year' },
  { label: 'Years Learning', value: 6, suffix: '', hint: 'And still curious' },
];

export const RESUME_URL = '/resume.pdf';
export const EMAIL = 'hello@dayankhan.dev';
