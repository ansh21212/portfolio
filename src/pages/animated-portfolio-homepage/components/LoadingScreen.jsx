import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import anime from 'animejs';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const logoRef = useRef(null);
  const particlesRef = useRef([]);
  const progressBarRef = useRef(null);

  const loadingTexts = [
    'Initializing...',
    'Loading Assets...',
    'Preparing Interface...',
    'Optimizing Performance...',
    'Almost Ready...',
    'Welcome!'
  ];

  useEffect(() => {
    // Enhanced logo animation
    if (logoRef.current) {
      gsap.set(logoRef.current, { scale: 0.5, opacity: 0 });
      gsap.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)"
      });

      // Continuous pulsing animation
      gsap.to(logoRef.current, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    // Enhanced progress bar animation
    if (progressBarRef.current) {
      gsap.set(progressBarRef.current, { width: "0%" });
    }

    // Enhanced particle animation with anime.js
    anime({
      targets: particlesRef.current,
      translateY: [0, -80, 0],
      translateX: [0, 30, 0],
      scale: [0.5, 1.5, 0.5],
      opacity: [0.2, 1, 0.2],
      rotate: [0, 360],
      duration: 3000,
      loop: true,
      delay: anime.stagger(100),
      easing: 'easeInOutQuad'
    });

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setLoadingText('Welcome!');
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 800);
          }, 1000);
          return 100;
        }
        
        // Update loading text based on progress
        const textIndex = Math.floor(prev / 20);
        if (textIndex < loadingTexts.length) {
          setLoadingText(loadingTexts[textIndex]);
        }
        
        return prev + 1.5;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    // Animate progress bar
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [progress]);

  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 4 + 3,
    color: [
      'from-cyan-400 to-blue-500',
      'from-purple-400 to-pink-500',
      'from-green-400 to-teal-500',
      'from-amber-400 to-orange-500',
      'from-indigo-400 to-purple-500'
    ][Math.floor(Math.random() * 5)]
  }));

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center overflow-hidden"
        >
          {/* Enhanced Animated Background Particles */}
          <div className="absolute inset-0">
            {particles.map((particle, index) => (
              <div
                key={particle.id}
                ref={el => particlesRef.current[index] = el}
                className={`absolute bg-gradient-to-r ${particle.color} rounded-full blur-sm`}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>

          {/* Enhanced Abstract Shapes */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-40 h-40 border-2 border-cyan-400/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-4 border border-cyan-400/20 rounded-full" />
            <div className="absolute inset-8 border border-cyan-400/10 rounded-full" />
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm"
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-2 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-xl" />
          </motion.div>

          <motion.div
            className="absolute top-1/2 right-1/3 w-24 h-24 border-2 border-amber-400/40 rotate-45 rounded-lg"
            animate={{ 
              y: [-20, 20, -20],
              rotateZ: [45, 135, 45]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Enhanced Loading Content */}
          <div className="text-center z-10 max-w-md mx-auto px-6">
            <motion.div
              ref={logoRef}
              className="mb-12"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-200 mb-4">
                Portfolio
              </h1>
              <p className="text-xl text-cyan-200 font-medium">John Doe</p>
            </motion.div>

            {/* Enhanced Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <p className="text-white/80 text-lg mb-6 font-medium">{loadingText}</p>
              
              {/* Enhanced Progress Bar */}
              <div className="relative w-80 h-3 bg-white/10 rounded-full mx-auto overflow-hidden backdrop-blur-sm border border-white/20">
                <div 
                  ref={progressBarRef}
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: '0%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-cyan-200 text-sm font-medium">{progress.toFixed(0)}%</span>
                <span className="text-white/60 text-sm">Loading Experience</span>
              </div>
            </motion.div>

            {/* Loading Dots Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex justify-center space-x-2"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-white/60 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Enhanced Floating Elements */}
          <motion.div
            className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg"
            animate={{
              x: [0, 120, 0],
              y: [0, -60, 0],
              rotate: [0, 360],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg"
            animate={{
              x: [0, -100, 0],
              y: [0, 80, 0],
              rotate: [0, -360],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 right-20 w-5 h-5 bg-gradient-to-r from-green-400 to-teal-500 rounded-full shadow-lg"
            animate={{
              x: [0, -80, 0],
              y: [0, -40, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;