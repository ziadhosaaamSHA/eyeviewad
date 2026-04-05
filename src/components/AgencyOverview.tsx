'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AgencyOverview() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heading1Ref = useRef<HTMLHeadingElement>(null);
    const heading2Ref = useRef<HTMLHeadingElement>(null);
    const clientsRef = useRef<HTMLSpanElement>(null);
    const revenueRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        // Fix for mobile address bar resize jumps
        ScrollTrigger.config({ ignoreMobileResize: true });

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Cross scrolling headings on desktop only
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom', 
                    end: 'bottom top', 
                    scrub: 1, 
                },
            });

            tl.fromTo(
                heading1Ref.current,
                { x: '-30vw' },
                { x: '30vw', ease: 'none' },
                0
            ).fromTo(
                heading2Ref.current,
                { x: '30vw' },
                { x: '-30vw', ease: 'none' },
                0
            );
            
            return () => {
                tl.kill();
            };
        });

        mm.add("(max-width: 767px)", () => {
            // Cross scrolling headings on mobile
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom', 
                    end: 'bottom top', 
                    scrub: 1, 
                },
            });

            // Using percentages or constrained pixels to avoid viewport calculation jumps
            tl.fromTo(
                heading1Ref.current,
                { xPercent: -30 },
                { xPercent: 10, ease: 'none' },
                0
            ).fromTo(
                heading2Ref.current,
                { xPercent: 10 },
                { xPercent: -10, ease: 'none' },
                0
            );
            
            return () => {
                tl.kill();
            };
        });

        // Animate the cards and text entering (allowed on all devices)
        gsap.fromTo('.overview-reveal', 
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: '.overview-reveal',
                    start: 'top 85%',
                }
            }
        );

        /*
        // Number count up disabled temporarily
        gsap.fromTo(clientsRef.current, 
            { innerText: 0 },
            {
                innerText: 42,
                duration: 2,
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: clientsRef.current,
                    start: 'top 85%',
                },
                ease: 'power2.out',
            }
        );

        gsap.fromTo(revenueRef.current, 
            { innerText: 0 },
            {
                innerText: 100,
                duration: 2,
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: revenueRef.current,
                    start: 'top 85%',
                },
                ease: 'power2.out',
            }
        );
        */
    }, { scope: containerRef });

    return (
        <section
            data-orange-zone="true"
            ref={containerRef}
            className="pt-24 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 bg-[var(--color-brand-orange)] relative overflow-hidden rounded-none lg:rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] flex flex-col items-center"
        >
            {/* DECORATIVE BACKGROUND ACCENTS */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[100px] rounded-full mix-blend-overlay pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-black/10 blur-[120px] rounded-full mix-blend-overlay pointer-events-none" />
            
            {/* CROSS SCROLLING HEADING SECTION - REDESIGNED */}
            <div className="relative mb-20 md:mb-32 flex flex-col items-center justify-center min-h-[20vh] md:min-h-[30vh] pt-12 pb-12 w-full">
                <div className="relative w-full max-w-[100vw] flex flex-col items-center justify-center pointer-events-none">
                    {/* "Digital Agency" moving Left -> Right, in background with Hollow Stroke Style */}
                    <h2
                        ref={heading1Ref}
                        className="font-outfit font-black whitespace-nowrap z-0 text-transparent text-[3.5rem] md:text-[clamp(4.5rem,14vw,14rem)] leading-[0.8] mix-blend-overlay opacity-50 md:opacity-100"
                        style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)' }}
                    >
                        <span className="hidden md:inline">DIGITAL AGENCY</span>
                        <span className="md:hidden">DIGITAL AGENCY • DIGITAL AGENCY • DIGITAL AGENCY • DIGITAL AGENCY</span>
                    </h2>
                    {/* "Creative Partner" moving Right -> Left, overlapping, Solid Bold */}
                    <h2
                        ref={heading2Ref}
                        className="font-outfit font-black whitespace-nowrap z-10 -mt-[4%] pb-8 text-white text-[2.5rem] md:text-[clamp(3rem,8vw,10rem)] leading-[0.8] drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                    >
                        CREATIVE PARTNER
                    </h2>
                </div>
            </div>

            {/* SPLIT LAYOUT SECTION */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 relative z-20">
                {/* LEFT: What Is EyeView */}
                <div className="flex flex-col items-start text-left ml-0 lg:ml-8 overview-reveal">
                    <div className="mb-6 flex flex-col items-start gap-3">
                        <div className="inline-flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <span className="ey-heading-sm font-black text-white/80 tracking-widest text-sm">WHAT IS</span>
                        </div>
                        <div className="relative w-[280px] h-[60px] md:w-[360px] md:h-[80px]">
                            <Image
                                src="/logo.png"
                                alt="EYEVIEW"
                                fill
                                className="brightness-0 invert object-left object-contain"
                            />
                        </div>
                    </div>
                    <p className="font-sans text-white/90 text-xl md:text-2xl leading-relaxed max-w-xl font-light">
                        A modern and innovative advertising agency specializing in delivering <strong className="font-bold text-white">creative and bold</strong> advertising solutions across digital platforms. We build high-quality, engaging, and visually compelling ads that capture the essence of your brand while driving <strong className="font-bold text-white">measurable business growth.</strong>
                    </p>
                </div>

                {/* RIGHT: Our Numbers */}
                <div className="flex flex-col items-start text-left mr-0 lg:mr-8 w-full overview-reveal">
                    <div className="inline-flex items-center gap-3 mb-6 w-full">
                        <div className="h-[1px] flex-1 bg-white/20" />
                        <span className="ey-heading-sm font-black text-white/80 tracking-widest text-sm">
                            OUR NUMBERS
                        </span>
                        <div className="h-[1px] w-8 bg-white/20" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full max-h-[160px]">
                        {/* Card 1: Clients */}
                        <div className="ey-card bg-white p-6 md:p-8 flex flex-col justify-center border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)] hover:-translate-y-2 transition-all duration-500 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="font-outfit font-black text-sm tracking-wider uppercase text-brand-orange mb-1 relative z-10">
                                Clients
                            </span>
                            <div className="ey-heading-lg font-black text-[var(--color-brand-black)] flex items-baseline relative z-10">
                                <span ref={clientsRef}>42</span>
                            </div>
                        </div>

                        {/* Card 2: Revenue */}
                        <div className="ey-card bg-white p-6 md:p-8 flex flex-col justify-center border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)] hover:-translate-y-2 transition-all duration-500 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="font-outfit font-black text-sm tracking-wider uppercase text-brand-orange mb-1 relative z-10">
                                Revenue Generated
                            </span>
                            <div className="ey-heading-lg font-black text-[var(--color-brand-black)] flex items-baseline relative z-10">
                                $<span ref={revenueRef}>100</span>K+
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
