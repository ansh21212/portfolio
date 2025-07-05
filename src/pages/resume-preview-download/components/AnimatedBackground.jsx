import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedBackground = () => {
  const containerRef = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating shapes
    const createShape = (index) => {
      const shape = document.createElement('div');
      const size = Math.random() * 60 + 20;
      const isCircle = Math.random() > 0.5;
      
      shape.className = `absolute ${isCircle ? 'rounded-full' : 'rounded-lg'} opacity-10`;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      
      // Random colors
      const colors = ['bg-blue-500', 'bg-purple-500', 'bg-indigo-500', 'bg-cyan-500'];
      shape.classList.add(colors[Math.floor(Math.random() * colors.length)]);
      
      container.appendChild(shape);
      shapesRef.current.push(shape);
      
      // Animate shape
      gsap.to(shape, {
        x: `${(Math.random() - 0.5) * 200}px`,
        y: `${(Math.random() - 0.5) * 200}px`,
        rotation: Math.random() * 360,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });
      
      // Fade in/out animation
      gsap.to(shape, {
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    };

    // Create multiple shapes
    for (let i = 0; i < 15; i++) {
      createShape(i);
    }

    // Cleanup function
    return () => {
      shapesRef.current.forEach(shape => {
        if (shape && shape.parentNode) {
          shape.parentNode.removeChild(shape);
        }
      });
      shapesRef.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;