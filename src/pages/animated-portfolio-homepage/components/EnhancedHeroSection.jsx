import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EnhancedHeroSection = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Enhanced text animation
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll('.char');
      gsap.fromTo(chars, 
        { y: 100, opacity: 0, rotationX: -90 }, 
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 1.2, 
          stagger: 0.05, 
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced 3D Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes with parallax */}
        <motion.div
          className="absolute w-96 h-96 opacity-10"
          style={{
            left: '10%',
            top: '20%',
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        >
          <div className="w-full h-full border-2 border-cyan-400 rounded-full animate-spin-slow">
            <div className="absolute inset-8 border border-cyan-300 rounded-full">
              <div className="absolute inset-8 border border-cyan-200 rounded-full" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute w-64 h-64 opacity-10"
          style={{
            right: '10%',
            bottom: '20%',
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl rotate-45 animate-pulse">
            <div className="absolute inset-4 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-2xl" />
          </div>
        </motion.div>

        {/* Floating code elements */}
        <motion.div
          className="absolute top-1/4 right-1/3 opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
          }}
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-cyan-400/30">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-red-400 rounded-full" />
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              <div className="w-3 h-3 bg-green-400 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="w-24 h-2 bg-cyan-400 rounded" />
              <div className="w-16 h-2 bg-purple-400 rounded" />
              <div className="w-20 h-2 bg-pink-400 rounded" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Enhanced Main Title */}
          <motion.div
            ref={textRef}
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-tight mb-4">
              <div className="block">
                {splitText("Creative")}
              </div>
              <div className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {splitText("Developer")}
              </div>
            </h1>
          </motion.div>
          
          {/* Enhanced Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mb-8"
          >
            <p className="text-2xl md:text-3xl text-cyan-200 font-light mb-4">
              Crafting Digital Experiences
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed">
              Passionate about creating beautiful, functional, and user-centered 
              digital solutions that make a difference in people's lives.
            </p>
          </motion.div>

          {/* Enhanced Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <Button
              variant="primary"
              size="lg"
              iconName="Eye"
              iconPosition="right"
              onClick={() => scrollToSection('projects')}
              className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 text-white font-semibold px-8 py-4 text-lg"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="MessageSquare"
              iconPosition="right"
              onClick={() => scrollToSection('contact')}
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 font-semibold px-8 py-4 text-lg"
            >
              Let's Talk
            </Button>
          </motion.div>

          {/* Enhanced Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="flex justify-center space-x-6"
          >
            {[
              { icon: 'Github', href: 'https://github.com', label: 'GitHub', color: 'hover:bg-gray-700' },
              { icon: 'Linkedin', href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-blue-600' },
              { icon: 'Twitter', href: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-blue-500' },
              { icon: 'Mail', href: 'mailto:hello@example.com', label: 'Email', color: 'hover:bg-red-600' }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-14 h-14 bg-white/10 ${social.color} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 group`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                aria-label={social.label}
              >
                <Icon name={social.icon} size={22} className="text-white group-hover:scale-110 transition-transform duration-200" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <p className="text-white/70 text-sm mb-4 font-medium">Discover More</p>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20"
            onClick={() => scrollToSection('about')}
          >
            <Icon name="ChevronDown" size={24} className="text-white/70 hover:text-white transition-colors duration-300" />
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS for slow spin animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default EnhancedHeroSection;