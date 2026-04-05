import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AgencyOverview from '@/components/AgencyOverview';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="text-gray-900 min-h-screen font-sans flex flex-col relative">
      <Navbar />
      
      {/* Sticky wrapper for Parallax Hero Entrance */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <Hero />
      </div>

      {/* The rest of the page slides OVER the static Hero */}
      <div className="relative z-10 bg-white">
        <AgencyOverview />
        <Services />
        <HowItWorks />
        <FinalCTA />
        <FAQ />
      </div>

      {/* Footer Parallax Container - Home only animation */}
      <Footer isHome={true} />
    </main>
  );
}
