'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const checkPointer = () => {
      if (window.matchMedia("(pointer: fine)").matches) {
        setIsVisible(true);
      }
    };
    
    checkPointer();

    if (window.matchMedia("(pointer: fine)").matches) {
      
      const moveCursor = (e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      };

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        
        // Hide custom cursor and restore default one for iframes/calendly
        if (target.tagName.toLowerCase() === 'iframe' || target.closest('iframe') || target.closest('.calendly-inline-widget')) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }

        if (target.closest('a') || target.closest('button') || target.closest('[role="button"]')) {
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      };

      const handleMouseOut = (e: MouseEvent) => {
        if (!e.relatedTarget) {
          setIsHidden(true);
        }
      };

      const handleMouseEnter = () => {
        setIsHidden(false);
      };
      
      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);
      document.addEventListener('mouseenter', handleMouseEnter);
      
      // Hide default cursor globally when this is active, except on iframes
      const style = document.createElement('style');
      style.innerHTML = `
        @media (pointer: fine) {
          body *:not(iframe) { cursor: none !important; }
          iframe, .calendly-inline-widget { cursor: auto !important; }
        }
      `;
      document.head.appendChild(style);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
        document.removeEventListener('mouseenter', handleMouseEnter);
        if (document.head.contains(style)) {
            document.head.removeChild(style);
        }
      };
    }
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isHidden ? 0 : 1
      }}
    >
      {/* Center Dot */}
      <motion.div 
        className="absolute bg-white rounded-full bg-blend-difference"
        animate={{ 
          width: isHovering ? 24 : 8, 
          height: isHovering ? 24 : 8,
          opacity: isHovering ? 0.5 : 1
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      
      {/* Rotating "SCROLL" text */}
      <motion.div 
        className="absolute w-[100px] h-[100px]"
        animate={{ 
          rotate: 360,
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 0 : 1 
        }}
        transition={{ 
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 0.2 },
          opacity: { duration: 0.2 }
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
          <path
            id="textPathCursor"
            d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
            fill="transparent"
          />
          <text fontSize="11" fontWeight="bold" style={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            <textPath href="#textPathCursor" startOffset="0%" textLength="200">
              SCROLL • SCROLL • SCROLL • 
            </textPath>
          </text>
        </svg>
      </motion.div>
    </motion.div>
  );
}
