'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
    isHome?: boolean;
}

export default function Footer({ isHome = false }: FooterProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!isHome) return;

        gsap.fromTo(contentRef.current, 
            { yPercent: -50 },
            {
                yPercent: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                }
            }
        );
    }, { scope: containerRef, dependencies: [isHome] });

    return (
        <footer 
            ref={containerRef} 
            data-orange-zone="true"
            className={`w-full bg-[var(--color-brand-orange)] text-white ${isHome ? 'h-screen overflow-hidden' : 'min-h-screen py-16'} relative flex flex-col`}
        >
            <div 
                ref={contentRef} 
                className={`w-full h-full flex flex-col justify-between px-6 py-12 md:px-12 md:py-16 ${isHome ? 'absolute inset-0' : ''}`}
            >
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 max-w-[1400px] mx-auto w-full z-10 mt-20 md:mt-24">
                    <div className="flex flex-col gap-6 max-w-sm">
                        <h3 className="ey-heading-md text-white uppercase leading-tight">
                            The end is just<br/>the beginning.
                        </h3>
                        <p className="ey-body text-white/90 text-lg">
                            Ready to dominate your market? Let's build your predictable revenue engine together.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-12 lg:gap-24">
                        <div className="flex flex-col gap-4">
                            <h4 className="ey-subheading text-black font-black uppercase tracking-widest">Socials</h4>
                            <a href="#" className="ey-body text-white/80 hover:text-white hover:translate-x-1 transition-transform">Instagram</a>
                            <a href="#" className="ey-body text-white/80 hover:text-white hover:translate-x-1 transition-transform">LinkedIn</a>
                            <a href="#" className="ey-body text-white/80 hover:text-white hover:translate-x-1 transition-transform">Twitter</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="ey-subheading text-black font-black uppercase tracking-widest">Company</h4>
                            <a href="/" className="ey-body text-white/80 hover:text-white hover:translate-x-1 transition-transform">Home</a>
                            <a href="/portfolio" className="ey-body text-white/80 hover:text-white hover:translate-x-1 transition-transform">Portfolio</a>
                            <a href="/contact" className="ey-body text-white/80 hover:text-white hover:translate-x-1 transition-transform">Contact</a>
                            <a href="/policies" className="ey-body text-white/80 hover:text-white hover:translate-x-1 transition-transform">Policies</a>
                        </div>
                    </div>
                </div>
                
                {/* Bottom Massive Logo */}
                <div className="w-full mt-auto flex flex-col items-center justify-end z-10 pt-16">
                    <h1 className="text-[17vw] leading-[0.75] font-black tracking-tighter w-full text-center text-white pointer-events-none select-none">
                        EYEVIEW
                    </h1>
                    <div className="w-full flex justify-between items-center mt-6 text-xs sm:text-sm font-bold tracking-widest uppercase border-t border-white/30 pt-6">
                        <span>© {new Date().getFullYear()} EYEVIEW Ads</span>
                        <span>All Rights Reserved</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
