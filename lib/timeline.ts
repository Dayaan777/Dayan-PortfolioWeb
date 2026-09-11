export type TimelineEntry = {
  year: string;
  title: string;
  org: string;
  description: string;
  tag: 'Work' | 'Learning' | 'Project' | 'Milestone';
};

export const timeline: TimelineEntry[] = [
  {
    year: '2025',
    title: 'Independent Full-Stack Engineering',
    org: 'Freelance / Open Source',
    description:
      'Shipping end-to-end products for startups — from data modeling and auth flows to design systems and motion. Building Lumen Analytics and contributing to open-source UI primitives.',
    tag: 'Work',
  },
  {
    year: '2024',
    title: 'Frontend & Product Engineer',
    org: 'Product Studio',
    description:
      'Led the rebuild of a real-time collaboration surface, cutting render latency by 60% and introducing a reusable component layer adopted across three product lines.',
    tag: 'Work',
  },
  {
    year: '2023',
    title: 'Released Pulse Design System',
    org: 'Open Source',
    description:
      'Published an accessible React component library with 60+ primitives, full keyboard navigation, and live documentation playgrounds.',
    tag: 'Project',
  },
  {
    year: '2022',
    title: 'Dived into Systems & Cloud',
    org: 'Self-directed',
    description:
      'Went deep on backend architecture — Postgres modeling, caching strategy, containerized deployments, and CI pipelines that made shipping feel boring in the best way.',
    tag: 'Learning',
  },
  {
    year: '2021',
    title: 'First Production App',
    org: 'Personal Milestone',
    description:
      'Designed, built, and shipped a finance tracker end-to-end. The moment building stopped being a hobby and became a craft I wanted to master.',
    tag: 'Milestone',
  },
  {
    year: '2019',
    title: 'Started Building for the Web',
    org: 'The beginning',
    description:
      'Wrote my first lines of HTML and JavaScript. Spent nights reverse-engineering interfaces I admired, learning how pixels become experiences.',
    tag: 'Learning',
  },
];
