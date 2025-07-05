import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import anime from 'animejs';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const heroRef = useRef(null);
  const particlesRef = useRef([]);
  const bouncingBallRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Enhanced bouncing ball animation with better physics
    if (bouncingBallRef.current) {
      gsap.set(bouncingBallRef.current, {
        x: window.innerWidth * 0.1,
        y: window.innerHeight * 0.3
      });

      // Smoother, more realistic bouncing animation
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(bouncingBallRef.current, {
        duration: 2.5,
        x: window.innerWidth * 0.8,
        y: window.innerHeight * 0.6,
        ease: "power2.inOut"
      })
      .to(bouncingBallRef.current, {
        duration: 2.5,
        x: window.innerWidth * 0.2,
        y: window.innerHeight * 0.2,
        ease: "power2.inOut"
      })
      .to(bouncingBallRef.current, {
        duration: 2.5,
        x: window.innerWidth * 0.7,
        y: window.innerHeight * 0.7,
        ease: "power2.inOut"
      });

      // Add pulsing effect to the ball
      gsap.to(bouncingBallRef.current, {
        scale: 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    // Enhanced floating particles with anime.js
    const animateParticles = () => {
      anime({
        targets: particlesRef.current,
        translateY: [0, -50, 0],
        translateX: [0, 20, 0],
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.8, 0.3],
        duration: 4000,
        loop: true,
        delay: anime.stagger(200),
        easing: 'easeInOutSine'
      });
    };

    animateParticles();

    // Text animation with GSAP
    if (textRef.current) {
      gsap.fromTo(textRef.current.children, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }

    // Cleanup
    return () => {
      gsap.killTweensOf([bouncingBallRef.current, textRef.current]);
    };
  }, []);

  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 3,
    opacity: Math.random() * 0.6 + 0.2
  }));

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {particles.map((particle, index) => (
          <div
            key={particle.id}
            ref={el => particlesRef.current[index] = el}
            className="absolute bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      {/* Enhanced Bouncing Ball */}
      <div
        ref={bouncingBallRef}
        className="absolute w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
          zIndex: 1
        }}
      >
        <div className="absolute inset-2 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full opacity-70" />
        <div className="absolute inset-4 bg-white rounded-full opacity-30" />
      </div>

      {/* Enhanced Geometric Shapes */}
      <motion.div
        className="absolute top-20 left-20 w-40 h-40 border-2 border-cyan-400/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-4 border border-cyan-400/20 rounded-full" />
        <div className="absolute inset-8 border border-cyan-400/10 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm"
        animate={{ rotate: -360, scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-2 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-xl" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-1/3 w-20 h-20 border-2 border-amber-400/40 rotate-45 rounded-lg"
        animate={{ 
          y: [-15, 15, -15],
          rotateZ: [45, 90, 45]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Left Content */}
          <div ref={textRef} className="text-center lg:text-left space-y-6">
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="block">John</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Doe
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 font-medium"
            >
              Creative Frontend Developer & UI/UX Designer
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg text-blue-100 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Crafting beautiful, interactive web experiences with modern technologies, 
              creative animations, and user-centered design solutions that make a difference.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6"
            >
              <Button
                variant="primary"
                size="lg"
                iconName="Eye"
                iconPosition="right"
                onClick={() => scrollToSection('projects')}
                className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 text-white font-semibold px-8 py-4"
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="right"
                onClick={() => scrollToSection('resume')}
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 font-semibold px-8 py-4"
              >
                Download Resume
              </Button>
            </motion.div>

            {/* Enhanced Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex justify-center lg:justify-start space-x-6 pt-8"
            >
              {[
                { icon: 'Github', href: 'https://github.com', label: 'GitHub', color: 'hover:bg-gray-700' },
                { icon: 'Linkedin', href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-blue-600' },
                { icon: 'Twitter', href: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-blue-500' },
                { icon: 'Mail', href: 'mailto:john@example.com', label: 'Email', color: 'hover:bg-red-600' }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 bg-white/10 ${social.color} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  aria-label={social.label}
                >
                  <Icon name={social.icon} size={22} className="text-white" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Enhanced Right Content - Abstract Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-96">
              {/* Enhanced Animated Code Blocks */}
              <motion.div
                className="absolute top-0 right-0 w-72 h-40 bg-slate-800/90 rounded-xl p-6 backdrop-blur-lg border border-white/20 shadow-2xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
                </div>
                <div className="space-y-3">
                  <div className="w-full h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg"></div>
                  <div className="w-4/5 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg"></div>
                  <div className="w-3/5 h-2 bg-gradient-to-r from-green-400 to-teal-500 rounded-full shadow-lg"></div>
                  <div className="w-2/3 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg"></div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 w-56 h-32 bg-slate-800/90 rounded-xl p-4 backdrop-blur-lg border border-white/20 shadow-2xl"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="space-y-3">
                  <div className="w-full h-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full shadow-lg"></div>
                  <div className="w-3/4 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full shadow-lg"></div>
                  <div className="w-1/2 h-2 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full shadow-lg"></div>
                </div>
              </motion.div>

              {/* Enhanced Floating Icons */}
              <motion.div
                className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center backdrop-blur-lg border border-white/20 shadow-2xl"
                animate={{ 
                  rotate: 360, 
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 40px rgba(59, 130, 246, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Icon name="Code" size={28} className="text-white" />
              </motion.div>

              <motion.div
                className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center backdrop-blur-lg border border-white/20 shadow-2xl"
                animate={{ 
                  rotate: -360, 
                  y: [0, -25, 0],
                  boxShadow: [
                    "0 0 20px rgba(139, 92, 246, 0.3)",
                    "0 0 40px rgba(139, 92, 246, 0.5)",
                    "0 0 20px rgba(139, 92, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon name="Palette" size={24} className="text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <p className="text-white/70 text-sm mb-3 font-medium">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            onClick={() => scrollToSection('about')}
          >
            <Icon name="ChevronDown" size={24} className="text-white/70 hover:text-white transition-colors duration-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;