import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';

gsap.registerPlugin(ScrollTrigger);

// Enhanced scroll reveal animation utility with better defaults
export const scrollReveal = (element, options = {}) => {
  if (!element) return;

  const defaults = {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      end: "bottom 15%",
      toggleActions: "play none none reverse",
      markers: false, // Set to true for debugging
      refreshPriority: -1
    }
  };

  const config = { ...defaults, ...options };
  
  // Ensure element is visible before animation
  gsap.set(element, { opacity: 0, y: config.y });
  
  return gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: config.duration,
    ease: config.ease,
    scrollTrigger: config.scrollTrigger
  });
};

// Enhanced stagger scroll reveal for multiple elements
export const staggerScrollReveal = (elements, options = {}) => {
  if (!elements || elements.length === 0) return;

  const defaults = {
    opacity: 0,
    y: 60,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: elements[0],
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  };

  const config = { ...defaults, ...options };
  
  // Set initial state
  gsap.set(elements, { opacity: 0, y: config.y });
  
  return gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration: config.duration,
    stagger: config.stagger,
    ease: config.ease,
    scrollTrigger: config.scrollTrigger
  });
};

// Floating animation utility
export const floatingAnimation = (element, options = {}) => {
  if (!element) return;

  const defaults = {
    y: -20,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
  };

  const config = { ...defaults, ...options };
  
  return gsap.to(element, config);
};

// Pulse animation utility
export const pulseAnimation = (element, options = {}) => {
  if (!element) return;

  const defaults = {
    scale: 1.05,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
  };

  const config = { ...defaults, ...options };
  
  return gsap.to(element, config);
};

// Enhanced Anime.js utilities
export const slideInAnimation = (targets, options = {}) => {
  if (!targets) return;

  const defaults = {
    translateY: [60, 0],
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(120),
    easing: 'easeOutCubic'
  };

  const config = { ...defaults, ...options };
  
  return anime({
    targets,
    ...config
  });
};

export const fadeInAnimation = (targets, options = {}) => {
  if (!targets) return;

  const defaults = {
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(80),
    easing: 'easeOutQuad'
  };

  const config = { ...defaults, ...options };
  
  return anime({
    targets,
    ...config
  });
};

export const scaleInAnimation = (targets, options = {}) => {
  if (!targets) return;

  const defaults = {
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(120),
    easing: 'easeOutElastic(1, .6)'
  };

  const config = { ...defaults, ...options };
  
  return anime({
    targets,
    ...config
  });
};

// Enhanced scroll animations initialization
export const initScrollAnimations = () => {
  // Refresh ScrollTrigger to ensure proper calculations
  ScrollTrigger.refresh();

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initAnimations, 100);
    });
  } else {
    setTimeout(initAnimations, 100);
  }
};

const initAnimations = () => {
  // Animate all elements with data-animate attribute
  const animateElements = document.querySelectorAll('[data-animate]');
  
  animateElements.forEach((element, index) => {
    const animationType = element.getAttribute('data-animate');
    const delay = parseFloat(element.getAttribute('data-delay')) || 0;
    
    // Add a small additional delay based on element index to prevent conflicts
    const finalDelay = delay + (index * 0.05);
    
    switch (animationType) {
      case 'fadeIn':
        scrollReveal(element, { 
          delay: finalDelay,
          y: 30
        });
        break;
      case 'slideUp':
        scrollReveal(element, { 
          y: 80, 
          delay: finalDelay,
          duration: 1.2
        });
        break;
      case 'slideLeft':
        scrollReveal(element, { 
          x: -80, 
          y: 0, 
          delay: finalDelay,
          duration: 1
        });
        break;
      case 'slideRight':
        scrollReveal(element, { 
          x: 80, 
          y: 0, 
          delay: finalDelay,
          duration: 1
        });
        break;
      case 'scaleIn':
        scrollReveal(element, { 
          scale: 0.8, 
          delay: finalDelay,
          duration: 1,
          ease: "back.out(1.7)"
        });
        break;
      default:
        scrollReveal(element, { delay: finalDelay });
    }
  });

  // Animate sections automatically
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    if (!section.hasAttribute('data-animate')) {
      scrollReveal(section, {
        delay: index * 0.1,
        y: 40,
        duration: 1
      });
    }
  });

  // Animate cards and grid items
  const cards = document.querySelectorAll('.card, [class*="card"], .grid > div');
  if (cards.length > 0) {
    staggerScrollReveal(cards, {
      stagger: 0.1,
      y: 50,
      duration: 0.8
    });
  }
};

// Enhanced cleanup function
export const cleanupAnimations = () => {
  // Kill all GSAP animations
  gsap.killTweensOf("*");
  
  // Kill all ScrollTrigger instances
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // Clear ScrollTrigger
  ScrollTrigger.clearMatchMedia();
  
  // Reset any inline styles that might have been set
  const animatedElements = document.querySelectorAll('[data-animate], section, .card, [class*="card"]');
  animatedElements.forEach(element => {
    gsap.set(element, { clearProps: "all" });
  });
};

// Utility to refresh animations when content changes
export const refreshAnimations = () => {
  ScrollTrigger.refresh();
  
  // Re-initialize after a short delay
  setTimeout(() => {
    initScrollAnimations();
  }, 100);
};

// Utility to check if element is in viewport
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Debug utility to show ScrollTrigger markers
export const enableScrollTriggerDebug = () => {
  ScrollTrigger.getAll().forEach(trigger => {
    trigger.vars.scrollTrigger.markers = true;
  });
  ScrollTrigger.refresh();
};