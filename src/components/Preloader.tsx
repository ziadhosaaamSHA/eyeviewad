'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Optional: remove from DOM once finished
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
      }
    });

    // Smooth curtain reveal
    tl.to(logoRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      delay: 0.5, // give it a moment initially
      ease: 'power2.inOut'
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut'
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[var(--color-brand-orange)] flex items-center justify-center"
    >
      <img 
        ref={logoRef}
        src="/logo.png" 
        alt="EYEVIEW" 
        className="w-32 md:w-48 brightness-0 invert" // Make it white on the orange background
      />
    </div>
  );
}
