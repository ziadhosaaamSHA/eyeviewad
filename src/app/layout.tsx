import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';

const akzidenzGrotesk = localFont({
  variable: '--font-akzidenz',
  src: [
    {
      path: '../../public/fonts/Akzidenz Grotesk/Akzidenz-grotesk-light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Akzidenz Grotesk/Akzidenz-grotesk-roman.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Akzidenz Grotesk/Akzidenz-grotesk-bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Akzidenz Grotesk/Akzidenz-grotesk-black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
});

const agrandirTight = localFont({
  variable: '--font-agrandir',
  src: [
    {
      path: '../../public/fonts/Agrandir Tight/agrandir-tight.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Agrandir Tight/agrandir-tight-bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Agrandir Tight/agrandir-tight-italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Agrandir Tight/agrandir-tight-bold-italic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
});

const autheniaTextured = localFont({
  variable: '--font-authenia',
  src: [
    {
      path: '../../public/fonts/Authenia-Font (1)/Authenia.otf',
      weight: '400',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'EYEVIEW Ads | Marketing Agency',
  description: 'Social media, content, ads, and web — built as one system to scale your business. Tailored for GCC businesses.',
};

export const viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light bg-white text-gray-900 scroll-smooth selection:bg-brand-orange selection:text-white">
      <body className={`${akzidenzGrotesk.variable} ${agrandirTight.variable} ${autheniaTextured.variable} font-sans antialiased relative min-h-screen bg-white text-gray-900`}>
        <Preloader />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
