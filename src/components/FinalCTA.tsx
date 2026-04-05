'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
    return (
        <section className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] bg-[radial-gradient(circle,rgba(251,105,2,0.12)_0%,transparent_50%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="flex flex-col items-start text-left">
                    <h2 className="ey-heading-lg mb-6 text-gray-900 leading-tight">
                        READY TO SCALE YOUR <br className="hidden lg:block"/><span className="text-brand-orange block sm:inline">REVENUE?</span>
                    </h2>

                    <p className="ey-body text-xl md:text-2xl text-gray-600 font-medium max-w-xl text-balance">
                        Book your free 30-minute growth audit call directly with our calendar. Let's find your hidden revenue and map out a bulletproof scaling strategy.
                    </p>
                </div>

                {/* Calendly Inline Widget Mockup */}
                <div className="w-full bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden" style={{ minHeight: '700px' }}>
                    {/* Using a placeholder iframe pointing to Calendly's demo or a real scheduling link */}
                    <div 
                        className="calendly-inline-widget w-full h-[700px]" 
                        data-url="https://calendly.com/acmesales" 
                    >
                        <iframe 
                            src="https://calendly.com/acmesales?embed_domain=eyeview.com&embed_type=Inline" 
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            title="Select a Date & Time - Calendly"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
