'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  {
    label: "01",
    title: "Social Media Marketing",
    body: "Engage your audience with scroll-stopping content, data-driven strategy, and targeted campaigns that convert followers into fiercely loyal customers.",
    accent: "#fb6902", // brand-orange
    bg: "#ffffff", // white
    dark: "#050505", // brand-black
  },
  {
    label: "02",
    title: "Web Development",
    body: "Lightning-fast, highly-converting digital experiences. We build scalable websites and applications perfectly aligned with your brand's unique identity.",
    accent: "#050505", // brand-black
    bg: "#fb6902", // brand-orange
    dark: "#ffffff", // white
  },
  {
    label: "03",
    title: "Media Production",
    body: "Cinematic videography and high-end photography that capture your brand's essence. Elevate your presence with stunning visuals that tell your story.",
    accent: "#fb6902", // brand-orange
    bg: "#111111", // brand-dark
    dark: "#ffffff", // white
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;
    
    const mm = gsap.matchMedia();

    // Intro panel entrance animation (not tied to horizontal track scrub)
    gsap.from(".intro-content > *", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%", 
      }
    });

    mm.add("(min-width: 1024px)", () => {
        const totalWidth = track.scrollWidth - window.innerWidth;
    
        const tween = gsap.to(track, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: track,
            pin: true,
            scrub: 1,
            end: () => `+=${totalWidth}`,
            invalidateOnRefresh: true,
          },
        });
    
        track.querySelectorAll(".service-panel-content").forEach((el) => {
          gsap.from(el.children, {
            y: 40, 
            opacity: 0, 
            duration: 0.8, 
            stagger: 0.12, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: el.closest(".panel"),
              containerAnimation: tween,
              start: "left center",
              toggleActions: "play none none none",
            },
          });
        });
    
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
    });

  }, { scope: containerRef });

    return (
    <section ref={containerRef} className="relative w-full bg-[#050505] overflow-x-hidden" id="services">
        <div ref={trackRef} className="flex flex-col lg:flex-row w-full lg:w-max will-change-transform">
            
            {/* Intro panel */}
            <div className="panel flex-shrink-0 flex items-center justify-center relative w-full lg:w-screen h-auto min-h-[70vh] py-24 lg:py-0 lg:h-screen bg-[#050505]" data-orange-zone="false">
                <div className="intro-content text-center px-4 relative z-10 w-full">
                     <p className="ey-subheading text-white/40 mb-4 tracking-[0.2em]">OUR CAPABILITIES</p>
                     <h2 className="ey-heading-xl text-white">
                        <span className="bg-white text-brand-orange px-4 py-2 rounded-lg inline-block mr-2 md:mr-4 transform -rotate-2">OUR</span>
                        <span className="text-white block md:inline mt-2 md:mt-0">SERVICES</span>
                     </h2>
                     <p className="ey-body text-white/60 mt-8 max-w-md mx-auto text-base md:text-lg">
                         Scroll to discover how we transform brands and scale revenue through our core pillars.
                     </p>
                </div>
            </div>

            {PANELS.map((panel, i) => (
            <div 
                key={i} 
                className="panel flex-shrink-0 flex items-center relative overflow-hidden w-full lg:w-screen min-h-[90vh] py-24 lg:py-0 lg:h-screen" 
                style={{ background: panel.bg }}
                data-orange-zone={panel.bg === "#fb6902" ? "true" : "false"}
            >
                <span className="absolute font-outfit font-black select-none pointer-events-none" 
                    style={{ 
                        right: "6%", 
                        bottom: "-2%",
                        fontSize: "clamp(120px, 20vw, 360px)", 
                        color: panel.accent, 
                        opacity: 0.05,
                        lineHeight: 1 
                    }}>
                    {panel.label}
                </span>

                <div className="service-panel-content px-6 md:px-12 lg:px-24 w-full max-w-[1200px] mx-auto relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="font-sans font-bold uppercase tracking-[0.15em] text-xs md:text-sm" style={{ color: panel.accent }}>Service {panel.label}</span>
                        <div className="h-[1px] w-12" style={{ background: panel.accent, opacity: 0.3 }} />
                    </div>
                    <h2 className="ey-heading-lg mb-6 lg:mb-8 max-w-3xl" style={{ color: panel.dark }}>{panel.title}</h2>
                    <p className="ey-body text-base lg:text-2xl max-w-2xl leading-relaxed" style={{ color: panel.dark, opacity: 0.85 }}>{panel.body}</p>
                    
                    {/* Progress dots - hidden on mobile since it's unneeded for vertical scroll */}
                    <div className="hidden lg:flex gap-3 mt-12">
                        {PANELS.map((_, j) => (
                        <div key={j} className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                            style={{ 
                                background: panel.accent, 
                                opacity: j === i ? 1 : 0.2,
                                transform: j === i ? 'scale(1.2)' : 'scale(1)'
                            }} 
                        />
                        ))}
                    </div>
                </div>

                {/* Decorative shape */}
                <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none rounded-full" 
                    style={{ 
                        right: i % 2 === 0 ? "-10%" : "auto", 
                        left: i % 2 !== 0 ? "-10%" : "auto",
                        width: "clamp(300px, 40vw, 600px)", 
                        height: "clamp(300px, 40vw, 600px)",
                        border: `1px solid ${panel.accent}`, 
                        opacity: 0.1 
                    }} 
                />
            </div>
            ))}
        </div>
    </section>
  );
}
