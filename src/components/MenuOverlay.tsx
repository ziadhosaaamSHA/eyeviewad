'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

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
  }, []);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[var(--color-brand-black)] flex-col px-6 py-6 md:px-12 items-center justify-center text-white hidden"
    >
      {/* Header bar mirroring Navbar */}
      <div className="absolute top-6 left-0 right-0 px-6 md:px-12 grid grid-cols-3 items-center w-full">
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
      </div>

      {/* Center Huge Links */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 mt-12 w-full max-w-4xl text-center">
        {MENU_LINKS.map((link, index) => (
          <div key={link.name} className="overflow-hidden p-2">
            <h2 
                ref={el => { if(el) linksRef.current[index] = el; }}
                className="ey-heading-xl text-white hover:text-brand-orange transition-colors duration-300 cursor-pointer"
                onClick={onClose}
            >
                {link.name}
            </h2>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div ref={footerRef} className="w-full flex flex-col md:flex-row items-center justify-between mt-auto mb-4 opacity-0 pt-8 border-t border-white/10">
        <p className="ey-subheading text-white/50 text-xs mb-4 md:mb-0">
          TURN ATTENTION INTO REVENUE
        </p>
        <div className="flex gap-6">
           <a href="#" className="ey-body text-white hover:text-brand-orange transition-colors text-sm uppercase tracking-widest font-bold">INFO@EYEVIEW.COM</a>
           <a href="#" className="ey-body text-white hover:text-brand-orange transition-colors text-sm uppercase tracking-widest font-bold">INSTAGRAM</a>
        </div>
      </div>
    </div>
  );
}
