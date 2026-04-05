'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertCircle, LineChart, Clock, Shuffle, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const segments = [
    { icon: <AlertCircle />, text: 'Struggling with low social engagement', desc: 'Lots of posts, negligible meaningful interaction.' },
    { icon: <LineChart />, text: 'Running ads with no clear ROI', desc: 'Burning cash without tracking conversions properly.' },
    { icon: <Clock />, text: 'No time for continuous content creation', desc: 'You are managing operations, not marketing.' },
    { icon: <Shuffle />, text: 'Scaling fast but marketing is messy', desc: 'Sales are good, but the brand feels disjointed.' },
    { icon: <Rocket />, text: 'Launching a serious new brand', desc: 'You want it done right from day one.' },
];

export default function WhoItIsFor() {
    const containerRef = useRef<HTMLDivElement>(null);

    /*
    useGSAP(() => {
        gsap.from('.who-card', {
            scrollTrigger: {
                trigger: '.who-card',
                start: 'top 85%',
            },
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out',
        });
    }, { scope: containerRef });
    */

    return (
        <section data-orange-zone="true" ref={containerRef} className="py-24 px-6 md:px-12 bg-[var(--color-brand-orange)] relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-orange/5 to-transparent blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="ey-heading-lg mb-4 text-white">
                        IS YOUR BUSINESS <span className="bg-white text-brand-orange px-4 py-1 mb-2 inline-block rounded-xl lg:rounded-2xl">STUCK?</span>
                    </h2>
                    <p className="ey-body text-xl text-white/90 mb-8">
                        You don't need another generic agency. You need a conversion system designed for your exact roadblocks.
                    </p>
                    <div className="inline-block px-6 py-3 rounded-full bg-white text-[var(--color-brand-orange)] font-bold uppercase tracking-[0.1em] text-sm">
                        Identify your challenge →
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {segments.map((seg, i) => (
                        <div
                            key={i}
                            className="who-card ey-card flex items-center gap-6 p-6 transition-all duration-300 group cursor-default"
                        >
                            <div className="text-gray-400 group-hover:text-brand-orange transition-colors">
                                {seg.icon}
                            </div>
                            <div>
                                <h4 className="ey-heading-md text-lg text-gray-900 normal-case">{seg.text}</h4>
                                <p className="ey-body text-sm text-gray-600 transition-colors">{seg.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
