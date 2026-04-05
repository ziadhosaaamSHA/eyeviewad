import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Portfolio() {
  return (
    <main className="text-gray-900 min-h-screen font-sans flex flex-col bg-white">
      <Navbar />
      
      {/* Spacer to push content down below fixed Navbar */}
      <div className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow">
        <h1 className="ey-heading-lg text-gray-900 mb-6">
          OUR <span className="text-brand-orange">PORTFOLIO</span>
        </h1>
        <p className="ey-body text-xl text-gray-600 max-w-2xl mb-12">
          A showcase of the revenue-generating systems, cinematic visuals, and scrolling-stopping content we've built for GCC businesses.
        </p>
        
        {/* Placeholder Grid for Portfolio Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((item) => (
             <div key={item} className="aspect-[4/3] bg-gray-100 rounded-3xl border border-gray-200 flex items-center justify-center">
                <span className="ey-subheading text-gray-400">Project {item}</span>
             </div>
          ))}
        </div>
      </div>

      <Footer isHome={false} />
    </main>
  );
}
