import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Policies() {
  return (
    <main className="text-gray-900 min-h-screen font-sans flex flex-col bg-white">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto w-full flex-grow">
        
        <h1 className="ey-heading-lg text-gray-900 mb-6">
          OUR <span className="text-brand-orange">POLICIES</span>
        </h1>
        <p className="ey-body text-xl text-gray-600 mb-16 shadow-sm pb-8 border-b border-gray-200">
          Transparency and trust are at the core of everything we do. Please review our operating guidelines, privacy rules, and terms of service below.
        </p>

        <div className="space-y-12">
            <section>
                <h2 className="ey-heading-sm text-brand-orange mb-4">1. Privacy Policy</h2>
                <p className="ey-body text-gray-700 leading-relaxed mb-4">
                    We collect required operational data (such as analytics tracking and form submissions) to serve you better. We deploy this data strictly for performance marketing optimizations and never sell your private information to third parties.
                </p>
                <p className="ey-body text-gray-700 leading-relaxed">
                    By using our digital platforms, you consent to the strictly necessary cookies required for our session management and system tracking.
                </p>
            </section>

            <section>
                <h2 className="ey-heading-sm text-brand-orange mb-4">2. Terms of Service</h2>
                <p className="ey-body text-gray-700 leading-relaxed mb-4">
                    Our digital agency operates on performance and retained models. Projects are scoped and quoted based on rigorous audits. Our deliverables are strictly bounded by signed Master Service Agreements (MSAs). 
                </p>
            </section>

            <section>
                <h2 className="ey-heading-sm text-brand-orange mb-4">3. Refund Policy</h2>
                <p className="ey-body text-gray-700 leading-relaxed">
                    Due to the highly specialized and labor-intensive nature of digital marketing, content production, and strategy consulting, Eyeview operates under a strict no-refund policy post-kickoff unless explicitly stated otherwise in your individual contract.
                </p>
            </section>
        </div>
      </div>

      <Footer isHome={false} />
    </main>
  );
}
