import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const AnimatedCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Add hover effects for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, select, [role="button"], .cursor-pointer'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setCursorVariant('hover');
        });
        
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorVariant('default');
        });
      });
    };

    // Add click effect
    const handleMouseDown = () => setCursorVariant('click');
    const handleMouseUp = () => setCursorVariant(isHovering ? 'hover' : 'default');

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    addHoverListeners();

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isHovering]);

  const variants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      border: '2px solid rgba(59, 130, 246, 0.8)',
    },
    hover: {
      scale: 1.5,
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      border: '2px solid rgba(59, 130, 246, 1)',
    },
    click: {
      scale: 0.8,
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      border: '2px solid rgba(59, 130, 246, 1)',
    }
  };

  // Hide on mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] rounded-full mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={cursorVariant}
      variants={variants}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Inner dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: cursorVariant === 'click' ? 2 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: cursorVariant === 'hover' ? 1.2 : 1,
          rotate: cursorVariant === 'hover' ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
        }}
      />
    </motion.div>
  );
};

export default AnimatedCursor;