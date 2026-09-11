import type { IconType } from 'react-icons';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiThreedotjs,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiPrisma,
  SiRedis,
  SiVercel,
  SiDocker,
  SiGithubactions,
  SiJavascript,
  SiPython,
  SiHtml5,
  SiCss,
  SiGit,
  SiFigma,
  SiVite,
  SiStripe,
  SiGraphql,
} from 'react-icons/si';
import { FiCode, FiServer, FiDatabase, FiCloud, FiTool, FiLayers } from 'react-icons/fi';

export type Skill = {
  name: string;
  icon: IconType;
  color: string;
};

export type SkillCategory = {
  id: string;
  label: string;
  icon: IconType;
  description: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: FiCode,
    description: 'Interfaces that feel instant and intentional.',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Framer Motion', icon: SiFramer, color: '#FF0080' },
      { name: 'Three.js', icon: SiThreedotjs, color: '#FFFFFF' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: FiServer,
    description: 'Systems that stay fast under real load.',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
      { name: 'Prisma', icon: SiPrisma, color: '#2D3748' },
      { name: 'Stripe', icon: SiStripe, color: '#635BFF' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    icon: FiDatabase,
    description: 'Models that scale with the product.',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'Supabase', icon: SiSupabase, color: '#3FCF8E' },
      { name: 'Redis', icon: SiRedis, color: '#FF4438' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    icon: FiCloud,
    description: 'Deployments that ship and sleep easy.',
    skills: [
      { name: 'Vercel', icon: SiVercel, color: '#FFFFFF' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: FiTool,
    description: 'The kit behind the craft.',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    icon: FiLayers,
    description: 'The grammar of everything I build.',
    skills: [
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', icon: SiCss, color: '#1572B6' },
    ],
  },
];
