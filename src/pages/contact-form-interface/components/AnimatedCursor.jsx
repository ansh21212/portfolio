import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const AnimatedCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e) => {
      const target = e.target;
      
      // Check for interactive elements
      if (target.matches('button, a, input, textarea, [role="button"]')) {
        setIsHovering(true);
        
        // Set cursor text based on element type
        if (target.matches('button[type="submit"]')) {
          setCursorText('Send');
        } else if (target.matches('a')) {
          setCursorText('Click');
        } else if (target.matches('input, textarea')) {
          setCursorText('Type');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const handleElementLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Add hover listeners to all interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, [cursorX, cursorY]);

  // Hide default cursor on interactive elements
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(37, 99, 235, 0.8)',
      border: '2px solid rgba(37, 99, 235, 0.4)'
    },
    hover: {
      scale: 1.5,
      backgroundColor: 'rgba(37, 99, 235, 0.2)',
      border: '2px solid rgba(37, 99, 235, 0.8)'
    },
    click: {
      scale: 0.8,
      backgroundColor: 'rgba(37, 99, 235, 1)',
      border: '2px solid rgba(37, 99, 235, 1)'
    }
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        variants={cursorVariants}
        animate={isHovering ? 'hover' : 'default'}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Cursor Text */}
      {cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] text-white text-xs font-body font-medium px-2 py-1 bg-blue-600 rounded-md"
          style={{
            x: cursorXSpring,
            y: useSpring(cursorY.get() - 40, springConfig),
          }}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {cursorText}
        </motion.div>
      )}

      {/* Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-blue-400 rounded-full pointer-events-none z-[9998]"
        style={{
          x: useSpring(cursorX, { damping: 30, stiffness: 200 }),
          y: useSpring(cursorY, { damping: 30, stiffness: 200 }),
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.8, 0.4, 0.8]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </>
  );
};

export default AnimatedCursor;