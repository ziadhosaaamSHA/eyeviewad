'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TransitionLink from '@/components/TransitionLink';
import { FloatingIconsHero } from '@/components/ui/floating-icons-hero-section';
import { demoIcons } from '@/components/FloatingIconsHeroDemo';
import EyesSvg from '@/components/EyesSvg';
import { trackEvent } from '@/lib/analytics';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const eyesContainerRef = useRef<HTMLDivElement>(null);
    const leftEyeRef = useRef<SVGGElement | null>(null);
    const rightEyeRef = useRef<SVGGElement | null>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo('.h1-anim', 
            { y: 40, opacity: 0, scale: 0.95 }, 
            { y: 0, opacity: 1, scale: 1, duration: 0.6 }, 
            '-=0.2'
        )
        .fromTo('.p-anim', 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5 }, 
            '-=0.3'
        )
        .fromTo('.proof-anim', 
            { opacity: 0, y: 10 }, 
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 
            '+=0.2'
        );
    }, { scope: containerRef });

    useEffect(() => {
        if (!eyesContainerRef.current) return;
        leftEyeRef.current = eyesContainerRef.current.querySelector('g[clip-path="url(#742703dc48)"]') as SVGGElement | null;
        rightEyeRef.current = eyesContainerRef.current.querySelector('g[clip-path="url(#611d928bf9)"]') as SVGGElement | null;
    }, []);

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!eyesContainerRef.current || !leftEyeRef.current || !rightEyeRef.current) return;
        const rect = eyesContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;

        const maxOffset = 8;
        const baseOffsetX = -14; // Correcting for the SVG pupils being drawn too far right
        const rangeX = rect.width / 2;
        const rangeY = rect.height / 2;
        const normX = rangeX ? dx / rangeX : 0;
        const normY = rangeY ? dy / rangeY : 0;
        const offsetX = Math.max(-maxOffset, Math.min(maxOffset, normX * maxOffset));
        const offsetY = Math.max(-maxOffset, Math.min(maxOffset, normY * maxOffset));
        const rightScale = 0.6;

        gsap.to(leftEyeRef.current, {
            x: baseOffsetX + offsetX,
            y: offsetY,
            duration: 0.2,
            ease: 'power3.out',
            overwrite: true,
        });

        gsap.to(rightEyeRef.current, {
            x: baseOffsetX + (offsetX * rightScale),
            y: offsetY * rightScale,
            duration: 0.2,
            ease: 'power3.out',
            overwrite: true,
        });
    };

    const handlePointerLeave = () => {
        if (!leftEyeRef.current || !rightEyeRef.current) return;
        const baseOffsetX = -14;
        gsap.to([leftEyeRef.current, rightEyeRef.current], {
            x: baseOffsetX,
            y: 0,
            duration: 0.25,
            ease: 'power3.out',
            overwrite: true,
        });
    };

    return (
        <FloatingIconsHero
            icons={demoIcons}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="!bg-transparent pt-[12vh] pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[100dvh]"
        >
            <div
                ref={containerRef}
                className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-0 sm:mt-6"
            >
                {/* SVG Eyes Container adjusted for mobile */}
                <div className="w-full flex justify-center mb-2 md:mb-6">
                    <EyesSvg
                        containerRef={eyesContainerRef}
                        className="p-anim flex justify-center [&>svg]:h-auto [&>svg]:w-[min(70vw,360px)] [&>svg]:max-h-[25vh] md:[&>svg]:max-h-[30vh]"
                    />
                </div>

                <h1 className="h1-anim ey-heading-lg text-balance text-[unset] text-[var(--color-brand-orange)] leading-[0.85] tracking-[-0.04em] px-2 text-[clamp(2.75rem,8vw,4rem)]">
                    WE MAKE PEOPLE CHOOSE <span className="text-brand-black">YOU.</span>
                </h1>

                <p className="p-anim ey-subheading text-[var(--color-brand-orange)] text-[10px] sm:text-xs md:text-sm tracking-[0.1em] text-balance mt-4 md:mt-6 max-w-[280px] sm:max-w-sm md:max-w-none opacity-80 mx-auto">
                    ONLINE OR OFFLINE, THEY WILL REACH OUT TO YOU NO MATTER WHAT.
                </p>

                {/* Hero CTA Buttons - Chunkier on mobile, Stacked */}
                <div className="w-full max-w-[280px] sm:max-w-md pt-8 md:pt-10 mx-auto transition-all p-anim">
                    <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 md:gap-4">
                        <TransitionLink
                            href="/portfolio"
                            className="group w-full flex-1 inline-flex items-center justify-center rounded-full border-2 border-[var(--color-brand-black)] px-6 py-[18px] md:py-4 font-sans text-xs md:text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-brand-black)] transition-all hover:bg-[var(--color-brand-black)] hover:text-white active:scale-95"
                            onClick={() => trackEvent('cta_clicked', { location: 'hero', cta_text: 'Our Portfolio', destination: '/portfolio' })}
                        >
                            <span>
                                Our Portfolio
                            </span>
                        </TransitionLink>

                        <TransitionLink
                            href="/contact"
                            className="group w-full flex-1 inline-flex items-center justify-center rounded-full bg-[var(--color-brand-orange)] px-6 py-[18px] md:py-4 font-sans text-xs md:text-sm font-bold uppercase tracking-[0.12em] text-white transition-all shadow-[0_8px_20px_rgba(251,105,2,0.25)] hover:bg-[var(--color-brand-black)] hover:shadow-none hover:-translate-y-1 active:scale-95"
                            onClick={() => trackEvent('cta_clicked', { location: 'hero', cta_text: 'Book Your Call', destination: '/contact' })}
                        >
                            <span>
                                Book Your Call
                            </span>
                        </TransitionLink>
                    </div>
                </div>
            </div>
        </FloatingIconsHero>
    );
}
