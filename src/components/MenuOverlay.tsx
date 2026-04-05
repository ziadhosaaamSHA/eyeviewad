'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import TransitionLink from '@/components/TransitionLink';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_LINKS = [
  { name: 'HOME', href: '/' },
  { name: 'PORTFOLIO', href: '/portfolio' },
  { name: 'CONTACT', href: '/contact' },
  { name: 'POLICIES', href: '/policies' },
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLHeadingElement[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      // Menu Open Animation
      gsap.set(overlayRef.current, { display: 'flex' });
      
      const tl = gsap.timeline();
      
      tl.to(overlayRef.current, {
        yPercent: 0,
        duration: 0.8,
        ease: 'power4.inOut'
      })
      .fromTo(linksRef.current, 
        { y: 100, opacity: 0, rotateZ: 5 },
        { y: 0, opacity: 1, rotateZ: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        "-=0.4"
      )
      .fromTo(footerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        "-=0.6"
      );
      
    } else {
      // Menu Close Animation
      const tl = gsap.timeline({
        onComplete: () => {
          if(overlayRef.current) gsap.set(overlayRef.current, { display: 'none' });
        }
      });
      
      tl.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut'
      });
    }
  }, [isOpen]);

  // Initial State Setup
  useEffect(() => {
    if (!isOpen && overlayRef.current) {
        gsap.set(overlayRef.current, { yPercent: -100, display: 'none' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[var(--color-brand-black)] flex-col px-6 py-6 md:px-12 items-center justify-center text-white hidden"
    >
      {/* Header bar mirroring Navbar */}
      <div className="absolute top-4 md:top-6 left-0 right-0 px-5 md:px-12 w-full">
        
        {/* Desktop Layout (Close button left, Logo center) */}
        <div className="hidden md:grid grid-cols-3 items-center">
            <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="justify-self-start inline-flex flex-col items-start gap-[6px] group p-2 -ml-2"
            >
                <span className="block h-[2px] w-8 bg-white transition-transform duration-300 group-hover:rotate-6 origin-left" />
                <span className="block h-[2px] w-8 bg-white transition-transform duration-300 group-hover:-rotate-6 origin-left" />
            </button>

            <div className="justify-self-center flex items-center">
                <div 
                    className="h-8 w-32 md:h-10 md:w-40 bg-[var(--color-brand-orange)]"
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
                />
            </div>
            <div className="justify-self-end"></div>
        </div>

        {/* Mobile Layout (Logo left, Close button right) */}
        <div className="flex md:hidden items-center justify-between bg-white/5 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
            <div 
                className="h-7 w-28 bg-[var(--color-brand-orange)]"
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
            />
            
            <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="relative w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-white/10 transition-colors group"
            >
                <span className="absolute block h-[2.5px] w-6 bg-white rotate-45 transition-transform duration-300 group-hover:rotate-[135deg]" />
                <span className="absolute block h-[2.5px] w-6 bg-white -rotate-45 transition-transform duration-300 group-hover:rotate-[45deg]" />
            </button>
        </div>

      </div>

      {/* Center Huge Links */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 mt-12 w-full max-w-4xl text-center">
        {MENU_LINKS.map((link, index) => (
          <div key={link.name} className="overflow-hidden p-2">
            <TransitionLink href={link.href}>
                <h2 
                    ref={el => { if(el) linksRef.current[index] = el; }}
                    className="ey-heading-xl text-white hover:text-[var(--color-brand-orange)] transition-colors duration-300 cursor-pointer block"
                    onClick={onClose}
                >
                    {link.name}
                </h2>
            </TransitionLink>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div ref={footerRef} className="w-full flex justify-center text-center md:text-left md:flex-row items-center md:justify-between mt-auto mb-4 opacity-0 pt-8 border-t border-white/10">
        <p className="ey-subheading text-white/50 text-xs hidden md:block">
          TURN ATTENTION INTO REVENUE
        </p>
        <div className="flex gap-6">
           <a href="mailto:INFO@EYEVIEW.COM" className="ey-body text-white hover:text-[var(--color-brand-orange)] transition-colors text-sm uppercase tracking-widest font-bold">INFO@EYEVIEW.COM</a>
           <a href="#" className="ey-body text-white hover:text-[var(--color-brand-orange)] transition-colors text-sm uppercase tracking-widest font-bold">INSTAGRAM</a>
        </div>
      </div>
    </div>
  );
}
