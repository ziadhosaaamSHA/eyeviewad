import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Contact() {
  return (
    <main className="text-gray-900 min-h-screen font-sans flex flex-col bg-white">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Contact Intro */}
        <div className="flex flex-col">
          <h1 className="ey-heading-lg text-gray-900 mb-6">
            LET'S <span className="text-brand-orange">CONNECT</span>
          </h1>
          <p className="ey-body text-xl text-gray-600 mb-12 max-w-lg">
            Stop leaving revenue on the table. Drop us a message, and let's craft a system to dominate your market.
          </p>
          
          <div className="flex flex-col gap-6">
             <div>
                <h4 className="ey-subheading text-gray-400 mb-1 font-bold">EMAIL US</h4>
                <a href="mailto:info@eyeview.com" className="ey-body font-bold text-xl text-gray-900 hover:text-brand-orange transition-colors">info@eyeview.com</a>
             </div>
             <div>
                <h4 className="ey-subheading text-gray-400 mb-1 font-bold">CALL US</h4>
                <a href="tel:+9710000000" className="ey-body font-bold text-xl text-gray-900 hover:text-brand-orange transition-colors">+971 00 000 000</a>
             </div>
             <div>
                <h4 className="ey-subheading text-gray-400 mb-1 font-bold">LOCATION</h4>
                <p className="ey-body font-bold text-xl text-gray-900">GCC Region</p>
             </div>
          </div>
        </div>

        {/* Contact Form Scaffold */}
        <div className="ey-card bg-gray-50 border-gray-200 p-8 md:p-12 shadow-none rounded-3xl w-full relative">
            <h3 className="ey-heading-sm mb-8 text-brand-orange">SEND A MESSAGE</h3>
            <form className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-2">
                    <label className="ey-subheading text-gray-500 text-xs">Name</label>
                    <input type="text" className="bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-orange ey-body" placeholder="Your name" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="ey-subheading text-gray-500 text-xs">Email</label>
                    <input type="email" className="bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-orange ey-body" placeholder="your@email.com" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="ey-subheading text-gray-500 text-xs">Message</label>
                    <textarea rows={4} className="bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-orange ey-body resize-none" placeholder="Tell us about your project..."></textarea>
                </div>
                <button type="button" className="ey-btn-primary w-full mt-4">Submit Inquiry</button>
            </form>
        </div>

      </div>

      <Footer isHome={false} />
    </main>
  );
}
