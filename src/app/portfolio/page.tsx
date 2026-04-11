'use client';

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EyesSvg from '@/components/EyesSvg';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'branding', label: 'Branding' },
  { id: 'software', label: 'Software Development' },
  { id: 'social', label: 'Social Media' },
];

const PROJECTS = [
  { 
    id: 1, 
    category: 'branding', 
    title: 'Luxury Automotive Campaign', 
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1200',
    description: 'A deeply immersive and cinematic visual experience shot for an ultra-luxury automotive brand.',
    contents: [
      { type: 'video', src: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800', platform: 'vimeo', url: '#' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=800' },
      { type: 'link', label: 'View Live Site', url: '#' }
    ]
  },
  { 
    id: 2, 
    category: 'social', 
    title: 'Viral Fitness App Promo', 
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200',
    description: 'High-energy, fast-paced ad creatives designed for TikTok and Instagram Reels.',
    contents: [
      { type: 'video', src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800', platform: 'youtube', url: '#' }
    ]
  },
  { 
    id: 3, 
    category: 'software', 
    title: 'B2B SaaS Lead Gen', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    description: 'A complete funnel overhaul that generated a 300% increase in qualified sales calls.',
    contents: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800' },
      { type: 'link', label: 'Read Case Study', url: '#' }
    ]
  },
  { 
    id: 4, 
    category: 'branding', 
    title: 'High-End Real Estate', 
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    description: 'Drone and FPV cinematic tours of luxury properties in Dubai.',
    contents: []
  },
  { 
    id: 5, 
    category: 'social', 
    title: 'Fashion E-commerce Reels', 
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1200',
    description: 'Trend-setting social media content for a streetwear brand.',
    contents: []
  },
  { 
    id: 6, 
    category: 'software', 
    title: 'E-com CRO Overhaul', 
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200',
    description: 'Data-driven landing pages increasing average order value by 45%.',
    contents: []
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  
  const eyesContainerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<SVGGElement | null>(null);
  const rightEyeRef = useRef<SVGGElement | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const filteredProjects = PROJECTS.filter((project) => 
    activeCategory === 'all' || project.category === activeCategory
  );

  useEffect(() => {
    if (!eyesContainerRef.current) return;
    leftEyeRef.current = eyesContainerRef.current.querySelector('g[clip-path="url(#742703dc48)"]') as SVGGElement | null;
    rightEyeRef.current = eyesContainerRef.current.querySelector('g[clip-path="url(#611d928bf9)"]') as SVGGElement | null;
  }, []);

  useEffect(() => {
    const targetId = hoveredCategory || activeCategory;
    const targetElement = categoryRefs.current[targetId];
    
    if (!eyesContainerRef.current || !leftEyeRef.current || !rightEyeRef.current || !targetElement) return;
    
    const eyesRect = eyesContainerRef.current.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    
    const eyesCenterX = eyesRect.left + eyesRect.width / 2;
    const eyesCenterY = eyesRect.top + eyesRect.height / 2;

    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    const dx = targetCenterX - eyesCenterX;
    const dy = targetCenterY - eyesCenterY;

    // Use trigonometry for precise looking angle
    const angle = Math.atan2(dy, dx);
    const dist = Math.sqrt(dx*dx + dy*dy);
    const distanceNorm = Math.min(1, dist / 200);

    const maxOffset = 16; 
    const baseOffsetX = -14; 
    
    const offsetX = Math.cos(angle) * maxOffset * distanceNorm;
    const offsetY = Math.sin(angle) * maxOffset * distanceNorm;
    const rightScale = 0.8;

    gsap.to(leftEyeRef.current, {
        x: baseOffsetX + offsetX,
        y: offsetY,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: true,
    });

    gsap.to(rightEyeRef.current, {
        x: baseOffsetX + (offsetX * rightScale),
        y: offsetY * rightScale,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: true,
    });
  }, [activeCategory, hoveredCategory]);

  return (
    <main className="text-brand-black min-h-screen font-sans flex flex-col bg-white transition-colors duration-500">
      <Navbar />      {/* Container: increased max-w for larger horizontal real estate */}
      <div className="pt-32 pb-16 px-6 md:px-12 max-w-[1800px] mx-auto w-full flex-grow flex flex-col lg:flex-row gap-10 xl:gap-20 items-start">
        
        {/* Left Sidebar (Sticky) */}
        {/* Increased width to 45% -> 40% natively to give more room and prevent overlap */}
        <div className="w-full lg:w-[45%] xl:w-[40%] lg:sticky lg:top-32 flex flex-col gap-6 flex-shrink-0 self-start z-10 bg-white lg:bg-transparent pb-6 lg:pb-0 transition-colors duration-500">
          
          <div className="mb-6 w-full">
             {/* Full width heading */}
             <h1 className="ey-heading-lg text-brand-black text-center leading-none tracking-tighter w-full uppercase">
                OUR <span className="text-brand-orange">PORTFOLIO</span>
             </h1>
          </div>

          {/* Increased margin and defined flex-row explicitly */}
          <div className="flex flex-row items-start justify-between border-t border-black/10 pt-8 xl:pt-10 relative w-full">
            
            {/* The Eyes Container Positioned Next to the List permanently */}
            {/* Added solid right-margin so eyes never overlap the text */}
            <div className="w-16 h-16 xl:w-20 xl:h-20 flex-shrink-0 mt-2">
              <EyesSvg containerRef={eyesContainerRef} className="w-full h-full drop-shadow-md" />
            </div>

            {/* Categories / Navigation */}
            <nav className="flex flex-col gap-6 flex-grow ml-[40%]">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  ref={(el) => { categoryRefs.current[cat.id] = el; }}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedProject(null); // Return to grid if switching category
                  }}
                  onMouseEnter={() => setHoveredCategory(cat.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={`text-left group flex items-center justify-between py-1 transition-colors duration-300 ${
                    activeCategory === cat.id ? 'text-brand-orange' : 'text-gray-400  hover:text-brand-black'
                  }`}
                >
                  {/* Styled with heading logic: font-outfit uppercase extrabold tracking-tighter */}
                  <span className={`font-outfit font-extrabold uppercase tracking-[-0.02em] leading-tight text-2xl xl:text-[2rem] relative z-10 transition-transform duration-300 ${activeCategory === cat.id ? 'translate-x-2' : ''} group-hover:translate-x-2`}>
                    {cat.label}
                  </span>
                </button>
              ))}
            </nav>

          </div>
        </div>

        {/* Right Side: Scrollable Content Region */}
        <section className="flex-grow w-full lg:w-1/2 min-h-[60vh] pt-4 lg:pt-0">
          <AnimatePresence mode="wait">
            {!selectedProject ? (
               // GRID VIEW
               <motion.div
                 key="grid-view"
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 transition={{ duration: 0.4 }}
                 className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 xl:gap-10"
               >
                 {filteredProjects.map((project, index) => (
                   <motion.div
                     key={project.id}
                     layoutId={`project-container-${project.id}`}
                     onClick={() => setSelectedProject(project)}
                     initial={{ opacity: 0, y: 50 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ 
                       duration: 0.5, 
                       delay: index * 0.05,
                       ease: [0.22, 1, 0.36, 1] 
                     }}
                     className={`cursor-pointer relative group overflow-hidden rounded-2xl bg-black/5  aspect-[4/3] shadow-sm hover:shadow-xl transition-shadow ${index % 2 === 1 ? 'md:mt-16' : ''}`}
                   >
                      <motion.img 
                        layoutId={`project-image-${project.id}`}
                        src={project.image} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* UI graphic to make it look slightly folder/card like */}
                      <div className="absolute top-0 left-0 w-1/3 h-6 bg-background/30 backdrop-blur-md rounded-br-xl transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10 hidden sm:block border-b border-r border-white/20"></div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8 z-20">
                         <span className="text-white/80 font-outfit uppercase tracking-widest text-xs lg:text-sm font-semibold mb-2">
                            {CATEGORIES.find(c => c.id === project.category)?.label}
                         </span>
                         <h3 className="text-white font-outfit font-extrabold uppercase leading-tight text-2xl lg:text-3xl tracking-[-0.02em]">
                            {project.title}
                         </h3>
                         <div className="mt-6 flex items-center text-brand-orange gap-2 font-bold uppercase tracking-widest text-xs">
                            <span>Open Folder</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                         </div>
                      </div>
                   </motion.div>
                 ))}
               </motion.div>
            ) : (
               // FOLDER DETAILS / OPEN VIEW
               <motion.div
                 key="detail-view"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 20 }}
                 transition={{ duration: 0.4 }}
                 className="flex flex-col w-full bg-white rounded-[2rem] p-6 md:p-8 lg:p-12 shadow-2xl border border-black/5 relative overflow-hidden"
               >
                 {/* Internal Navigation */}
                 <button 
                    onClick={() => setSelectedProject(null)}
                    className="group flex items-center gap-3 text-gray-500  hover:text-brand-orange  transition-colors mb-10 self-start font-outfit font-extrabold uppercase tracking-widest text-sm"
                 >
                    <div className="bg-gray-100  group-hover:bg-brand-orange/10  p-2.5 rounded-full transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    </div>
                    Back to Folders
                 </button>

                 <motion.div layoutId={`project-container-${selectedProject?.id}`} className="rounded-2xl overflow-hidden mb-10 relative shadow-md">
                   <motion.img 
                     layoutId={`project-image-${selectedProject?.id}`}
                     src={selectedProject?.image} 
                     alt={selectedProject?.title} 
                     className="w-full aspect-[21/9] object-cover"
                   />
                 </motion.div>
                 
                 <div className="max-w-4xl mb-12">
                   <span className="text-brand-orange font-outfit font-extrabold tracking-widest uppercase mb-4 block text-sm">
                      {CATEGORIES.find(c => c.id === selectedProject?.category)?.label}
                   </span>
                   <h2 className="ey-heading-md text-brand-black mb-6 leading-none">{selectedProject?.title}</h2>
                   <p className="text-gray-600  text-lg md:text-xl xl:text-2xl max-w-3xl leading-relaxed">
                      {selectedProject?.description}
                   </p>
                 </div>

                 {/* Inside the Folder: Dynamic Assets */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {selectedProject?.contents?.map((content, idx) => (
                      <div key={idx} className="flex flex-col w-full">
                        
                        {content.type === 'image' && (
                           <div className="w-full aspect-video rounded-xl bg-gray-100 bg-brand-black overflow-hidden shadow-inner relative group border border-black/5 ">
                              <img src={content.src} alt="Project Media" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           </div>
                        )}
                        
                        {content.type === 'video' && (
                           <div className="w-full aspect-video rounded-xl overflow-hidden relative group bg-black shadow-lg border border-black/10 ">
                              <img src={content.src} alt="Video Thumbnail" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300 shadow-[0_0_25px_rgba(251,105,2,0.5)]">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                 </div>
                              </div>
                              {content.url && (
                                <a href={content.url} target="_blank" rel="noreferrer" className="absolute inset-0 z-10"><span className="sr-only">Play Video</span></a>
                              )}
                           </div>
                        )}

                        {content.type === 'link' && (
                           <a href={content.url} target="_blank" rel="noreferrer" className="w-full aspect-video rounded-xl bg-brand-black  flex flex-col items-center justify-center text-white hover:bg-brand-orange transition-colors duration-300 group shadow-lg border border-transparent ">
                               <svg className="mb-6 transform group-hover:-translate-y-2 transition-transform duration-300 opacity-80" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                               <span className="font-outfit font-extrabold tracking-widest uppercase text-sm">{content.label}</span>
                               <span className="text-white/50 text-xs mt-2 font-mono tracking-wider">{content.url === '#' ? 'HTTPS://EXAMPLE.COM' : content.url}</span>
                           </a>
                        )}
                        
                      </div>
                    ))}
                    
                    {(!selectedProject?.contents || selectedProject?.contents.length === 0) && (
                      <div className="col-span-full py-20 text-center bg-gray-50/50  border border-dashed border-gray-300  rounded-2xl flex flex-col items-center justify-center gap-5">
                         <svg className="text-gray-300 " width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                         <p className="text-gray-400  tracking-widest uppercase text-sm font-outfit font-bold">Assets empty or pending</p>
                      </div>
                    )}
                 </div>

               </motion.div>
            )}
          </AnimatePresence>
        </section>

      </div>

      <Footer isHome={false} />
    </main>
  );
}
