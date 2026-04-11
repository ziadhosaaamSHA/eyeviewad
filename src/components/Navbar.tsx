'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TransitionLink from '@/components/TransitionLink';
import MenuOverlay from './MenuOverlay';
import { trackEvent } from '@/lib/analytics';

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
            const probeY = probeRect.top + (probeRect.height / 2);
            const probeX = window.innerWidth / 2;

            const orangeZones = Array.from(
                document.querySelectorAll<HTMLElement>('[data-orange-zone="true"]')
            );
            
            let inOrangeZone = false;

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
        <nav ref={navRef} className="fixed top-4 md:top-6 left-0 right-0 z-50 px-5 py-3 md:px-12 bg-transparent">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-3 items-center">
                <button
                    type="button"
                    onClick={() => setIsMenuOpen(true)}
                    aria-label="Open menu"
                    className="justify-self-start inline-flex flex-col items-start gap-2 p-2 -ml-2 group"
                >
                    <span className={`block h-[2px] w-8 transition-all duration-300 group-hover:w-10 ${useLightControls ? 'bg-white' : 'bg-[var(--color-brand-orange)]'}`} />
                    <span className={`block h-[2px] w-5 transition-all duration-300 group-hover:w-8 ${useLightControls ? 'bg-white' : 'bg-[var(--color-brand-orange)]'}`} />
                </button>

                <div className="justify-self-center flex items-center cursor-pointer">
                    <TransitionLink href="/">
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
                    </TransitionLink>
                </div>

                <div className="justify-self-end inline-flex items-center gap-2">
                    <TransitionLink
                        href="/contact"
                        onClick={() => trackEvent('cta_clicked', { location: 'navbar', cta_text: 'Get in touch', destination: '/contact' })}
                    >
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
                    </TransitionLink>

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

            {/* Mobile Layout */}
            <div className="flex md:hidden items-center justify-between bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-sm border border-black/5 transition-colors duration-300">
                <TransitionLink href="/">
                    <div 
                        className="h-7 w-28 transition-colors duration-300 bg-[var(--color-brand-orange)]"
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
                </TransitionLink>
                
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open menu"
                        className="inline-flex flex-col items-end gap-1.5 p-2 rounded-full hover:bg-black/5 transition-colors"
                    >
                        <span className="block h-[2.5px] w-6 bg-[var(--color-brand-black)] rounded-full transition-colors duration-300" />
                        <span className="block h-[2.5px] w-4 bg-[var(--color-brand-orange)] rounded-full transition-colors duration-300" />
                    </button>
                </div>
            </div>
        </nav>
        <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}
