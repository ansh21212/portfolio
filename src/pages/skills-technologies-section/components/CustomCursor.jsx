import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e) => {
      const target = e.target;
      
      if (target.matches('button, a, .cursor-pointer, [role="button"]')) {
        setCursorVariant('button');
      } else if (target.matches('input, textarea, select')) {
        setCursorVariant('input');
      } else if (target.matches('.skill-card, .category-tab')) {
        setCursorVariant('card');
      } else {
        setCursorVariant('default');
      }
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [isVisible]);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: 'rgba(59, 130, 246, 0.3)',
      border: '2px solid rgba(59, 130, 246, 0.6)',
      mixBlendMode: 'normal',
    },
    button: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: 'rgba(147, 51, 234, 0.3)',
      border: '2px solid rgba(147, 51, 234, 0.6)',
      mixBlendMode: 'normal',
    },
    input: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 12,
      scaleX: 0.1,
      scaleY: 1.5,
      backgroundColor: 'rgba(16, 185, 129, 0.6)',
      border: '1px solid rgba(16, 185, 129, 0.8)',
      mixBlendMode: 'normal',
    },
    card: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.2,
      backgroundColor: 'rgba(245, 158, 11, 0.3)',
      border: '2px solid rgba(245, 158, 11, 0.6)',
      mixBlendMode: 'normal',
    }
  };

  // Hide cursor on mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile || !isVisible) {
    return null;
  }

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;