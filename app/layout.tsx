import './globals.css';
import type { Metadata } from 'next';
import { Inter, Syne, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const display = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = 'https://dayankhan.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Dayan Khan — Full-Stack Developer',
    template: '%s — Dayan Khan',
  },
  description:
    'Dayan Khan is a full-stack developer and frontend engineer crafting fast, modern and meaningful digital experiences.',
  keywords: [
    'Dayan Khan',
    'Full-Stack Developer',
    'Frontend Engineer',
    'UI/UX',
    'React',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: 'Dayan Khan' }],
  creator: 'Dayan Khan',
  themeColor: '#050505',
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Dayan Khan — Full-Stack Developer',
    description:
      'Crafting fast, modern and meaningful digital experiences.',
    siteName: 'Dayan Khan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dayan Khan — Full-Stack Developer',
    description:
      'Crafting fast, modern and meaningful digital experiences.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
