'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MenuOverlay from './MenuOverlay';

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [useLightControls, setUseLightControls] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useGSAP(() => {
        gsap.fromTo(
            navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        );
    }, { scope: navRef });

    useEffect(() => {
        const updateThemeByZone = () => {
            if (!navRef.current) return;

            const probeRect = navRef.current.getBoundingClientRect();
            // Probe exactly the visual center of the navbar and screen
            const probeY = probeRect.top + (probeRect.height / 2);
            const probeX = window.innerWidth / 2;

            const orangeZones = Array.from(
                document.querySelectorAll<HTMLElement>('[data-orange-zone="true"]')
            );
            
            let inOrangeZone = false;

            // Math collision check - much safer than elementFromPoint over GSAP tracks
            for (const zone of orangeZones) {
                const rect = zone.getBoundingClientRect();
                if (
                    probeX >= rect.left &&
                    probeX <= rect.right &&
                    probeY >= rect.top &&
                    probeY <= rect.bottom
                ) {
                    inOrangeZone = true;
                    break;
                }
            }

            setUseLightControls(inOrangeZone);
        };

        updateThemeByZone();
        window.addEventListener('scroll', updateThemeByZone, { passive: true });
        window.addEventListener('resize', updateThemeByZone);

        return () => {
            window.removeEventListener('scroll', updateThemeByZone);
            window.removeEventListener('resize', updateThemeByZone);
        };
    }, []);

    return (
        <>
        <nav ref={navRef} className="fixed top-6 left-0 right-0 z-50 px-6 py-4 md:px-12 bg-transparent">
            <div className="grid grid-cols-3 items-center">
                <button
                    type="button"
                    onClick={() => setIsMenuOpen(true)}
                    aria-label="Open menu"
                    className="justify-self-start inline-flex flex-col items-start gap-2 p-2 -ml-2 group"
                >
                    <span className={`block h-[2px] w-8 transition-all duration-300 group-hover:w-10 ${useLightControls ? 'bg-white' : 'bg-[var(--color-brand-orange)]'}`} />
                    <span className={`block h-[2px] w-5 transition-all duration-300 group-hover:w-8 ${useLightControls ? 'bg-white' : 'bg-[var(--color-brand-orange)]'}`} />
                </button>

                <div className="justify-self-center flex items-center">
                    <div 
                        className={`h-8 w-32 md:h-10 md:w-40 transition-colors duration-300 ${useLightControls ? 'bg-white' : 'bg-[var(--color-brand-orange)]'}`}
                        style={{
                            maskImage: 'url(/logo.png)',
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskImage: 'url(/logo.png)',
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                        }}
                        aria-label="EYEVIEW"
                        role="img"
                    />
                </div>

                <div className="justify-self-end inline-flex items-center gap-2">
                    <button
                        type="button"
                        aria-label="Get in touch"
                        className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors duration-300 ${
                            useLightControls
                                ? 'bg-white text-[var(--color-brand-orange)]'
                                : 'bg-[var(--color-brand-orange)] text-white'
                        }`}
                    >
                        Get in touch
                    </button>

                    <button
                        type="button"
                        aria-label="Change language"
                        className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 border-2 ${
                            useLightControls
                                ? 'border-white text-white hover:bg-white hover:text-[var(--color-brand-orange)]'
                                : 'border-[var(--color-brand-orange)] text-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange)] hover:text-white'
                        }`}
                    >
                        EN
                    </button>
                </div>
            </div>
        </nav>
        <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}
