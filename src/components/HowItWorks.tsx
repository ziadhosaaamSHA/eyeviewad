'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    { num: '01', title: 'Strategy Call', desc: 'We dissect your numbers, offers, and bottlenecks.' },
    { num: '02', title: 'Brand Alignment', desc: 'Extracting the exact visual language that suits your GCC market.' },
    { num: '03', title: 'Content & Planning', desc: 'Pre-production to post—building assets that convert.' },
    { num: '04', title: 'Systems Launch', desc: 'Deploying the ad campaigns, funnels, and organic engine.' },
    { num: '05', title: 'Scale & Optimize', desc: 'Ruthless optimization based on ROAS and booked appointments.' },
];

export default function HowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Line drawing animation
        gsap.from(lineRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 60%',
                end: 'bottom 80%',
                scrub: 1,
            },
            height: 0,
            ease: 'none',
        });

        // Step by step reveal
        gsap.utils.toArray('.step-item').forEach((step: any, i) => {
            gsap.from(step, {
                scrollTrigger: {
                    trigger: step,
                    start: 'top 85%',
                },
                x: -50,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out',
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 px-6 md:px-12 bg-white w-full relative">
            <div className="max-w-4xl mx-auto z-10 relative">
                <h2 className="ey-heading-lg mb-16 text-gray-900">
                    How We <span className="text-brand-orange">Execute</span>
                </h2>

                <div className="relative pl-8 md:pl-12">
                    {/* Vertical progress line */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 rounded-full" />
                    <div
                        ref={lineRef}
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-orange to-gray-400 rounded-full z-10"
                    />

                    <div className="space-y-12">
                        {steps.map((step, i) => (
                            <div key={i} className="step-item relative group pb-4">
                                {/* Connector Dot */}
                                <div className="absolute -left-[39px] md:-left-[55px] top-1 w-5 h-5 rounded-full bg-white border-4 border-brand-orange z-20 group-hover:scale-150 transition-transform duration-300" />

                                <h3 className="ey-heading-md text-2xl md:text-3xl mb-2 flex items-baseline gap-4 text-gray-900 normal-case">
                                    <span className="text-sm font-black text-brand-orange uppercase tracking-widest">{step.num}</span>
                                    {step.title}
                                </h3>
                                <p className="ey-body text-gray-600 text-lg">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
