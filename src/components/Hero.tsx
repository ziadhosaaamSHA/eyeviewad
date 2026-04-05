'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FloatingIconsHero } from '@/components/ui/floating-icons-hero-section';
import { demoIcons } from '@/components/FloatingIconsHeroDemo';
import EyesSvg from '@/components/EyesSvg';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const eyesContainerRef = useRef<HTMLDivElement>(null);
    const leftEyeRef = useRef<SVGGElement | null>(null);
    const rightEyeRef = useRef<SVGGElement | null>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.h1-anim', { y: 40, opacity: 0, scale: 0.95, duration: 0.6 }, '-=0.2')
            .from('.p-anim', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
            .from('.proof-anim', { opacity: 0, y: 10, duration: 0.5, stagger: 0.1 }, '+=0.2');

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
            className="!bg-transparent pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen"
        >
            <div
                ref={containerRef}
                className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-4 mt-4 sm:mt-6"
            >

                <EyesSvg
                    containerRef={eyesContainerRef}
                    className="p-anim flex justify-center [&>svg]:h-auto [&>svg]:w-[min(60vw,360px)] [&>svg]:max-h-[30vh]"
                />

                <h1 className="h1-anim ey-heading-lg text-balance text-[var(--color-brand-orange)]">
                    WE MAKE PEOPLE CHOOSE <span className="text-brand-black">YOU.</span>
                </h1>

                <p className="p-anim ey-subheading text-[var(--color-brand-orange)] text-sm sm:text-base md:text-lg text-balance">
                    ONLINE OR OFFLINE, THEY WILL REACH OUT TO YOU NO MATTER WHAT.
                </p>

                <div className="w-full max-w-sm sm:max-w-md pt-2">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <button className="group ey-btn-outline w-full">
                            Our Portfolio
                        </button>

                        <button className="group ey-btn-primary w-full">
                            Book Your Call
                        </button>
                    </div>
                </div>
            </div>
        </FloatingIconsHero>
    );
}
