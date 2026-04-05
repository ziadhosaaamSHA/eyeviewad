import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const transitionCurtain = document.getElementById("transition-curtain");
  const transitionLogo = document.getElementById("transition-logo");

  if (transitionCurtain) {
    // Reset from the bottom
    gsap.set(transitionCurtain, { yPercent: 100, display: "flex" });
    if (transitionLogo) {
      gsap.set(transitionLogo, { opacity: 0, y: 20 });
    }

    // Bring curtain up
    gsap.to(transitionCurtain, {
      yPercent: 0,
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        router.push(href);
      },
    });

    if (transitionLogo) {
      gsap.to(transitionLogo, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay: 0.4,
        ease: "power2.out",
      });
    }
  } else {
    router.push(href);
  }
};

export const animatePageIn = () => {
  const transitionCurtain = document.getElementById("transition-curtain");
  const transitionLogo = document.getElementById("transition-logo");

  if (transitionCurtain) {
    // Logo goes away first, then curtain slides up
    const tl = gsap.timeline();

    if (transitionLogo) {
      tl.to(transitionLogo, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.inOut",
        delay: 0.2,
      });
    }

    tl.to(transitionCurtain, {
      yPercent: -100,
      duration: 1.0,
      ease: "power4.inOut",
      onComplete: () => {
        gsap.set(transitionCurtain, { display: "none" }); // hide pointer events safely
      }
    }, transitionLogo ? "-=0.2" : 0);
  }
};
