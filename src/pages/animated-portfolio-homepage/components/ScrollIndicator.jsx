import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = Math.min((scrolled / scrollHeight) * 100, 100);
      
      setScrollProgress(progress);
      setIsVisible(scrolled > 100);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[150] h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ 
        scaleX: scrollProgress / 100,
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ 
        scaleX: { duration: 0.1 },
        opacity: { duration: 0.3 }
      }}
      style={{
        transformOrigin: 'left center'
      }}
    />
  );
};

export default ScrollIndicator;