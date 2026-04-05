'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { XCircle, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const failures = [
    { bad: "Posting just to post", good: "Growth through engineered content" },
    { bad: "Ads without strategy burning money", good: "Data-driven creative validating CAC" },
    { bad: "No system means no scale", good: "Unified pipeline predictable revenue" }
];

export default function Education() {
    const containerRef = useRef<HTMLDivElement>(null);

    /*
    useGSAP(() => {
        gsap.from('.edu-card', {
            scrollTrigger: {
                trigger: '.edu-card',
                start: 'top 85%',
            },
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power3.out',
        });
    }, { scope: containerRef });
    */

    return (
        <section data-orange-zone="true" ref={containerRef} className="py-24 px-6 md:px-12 bg-[var(--color-brand-orange)] relative">
            <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />

            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="ey-heading-lg mb-4 text-white">
                        WHY MOST MARKETING <span className="bg-white text-brand-orange px-4 py-1 mb-2 inline-block rounded-xl lg:rounded-2xl">FAILS</span>
                    </h2>
                    <p className="ey-body text-white/90 text-lg max-w-2xl mx-auto">
                        Commodity agencies treat your business like a creative playground. We treat it like an investment portfolio.
                    </p>
                </div>

                <div className="space-y-6">
                    {failures.map((f, i) => (
                        <div key={i} className="edu-card grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="ey-card p-8 flex items-start gap-4 transition-colors">
                                <XCircle className="w-8 h-8 text-gray-400 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="ey-heading-md text-xl text-gray-900 mb-2">The Old Way</h4>
                                    <p className="ey-body text-gray-700">{f.bad}</p>
                                </div>
                            </div>

                            <div className="ey-card p-8 flex items-start gap-4 border-[var(--color-brand-orange)]/30 bg-white">
                                <CheckCircle className="w-8 h-8 text-brand-orange flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="ey-heading-md text-xl text-[var(--color-brand-orange)] mb-2">EYEVIEW SYSTEM</h4>
                                    <p className="ey-body text-gray-900 font-medium">{f.good}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
