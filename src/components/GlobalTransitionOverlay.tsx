'use client';
import React from 'react';

export default function GlobalTransitionOverlay() {
  return (
    <div 
      id="transition-curtain"
      className="fixed inset-0 z-[9999] bg-[var(--color-brand-orange)] flex-col items-center justify-center pointer-events-none flex"
      style={{ transform: 'translateY(0%)' }} // Starts fully covering the page initially
    >
      <img src="/logo.png" alt="EYEVIEW" className="w-32 md:w-48 brightness-0 invert" id="transition-logo" />
    </div>
  );
}
