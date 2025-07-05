import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import anime from 'animejs';
import Icon from '../AppIcon';

const StickyNavigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const backgroundRef = useRef(null);
  const itemsRef = useRef([]);

  const navigationItems = [
    { label: 'Home', path: '#hero', icon: 'Home', color: 'from-blue-500 to-cyan-500' },
    { label: 'About', path: '#about', icon: 'User', color: 'from-blue-500 to-cyan-500' },
    { label: 'Experience', path: '#experience', icon: 'Briefcase', color: 'from-purple-500 to-pink-500' },
    { label: 'Skills', path: '#skills', icon: 'Code', color: 'from-green-500 to-teal-500' },
    { label: 'Projects', path: '#projects', icon: 'FolderOpen', color: 'from-orange-500 to-red-500' },
    { label: 'Resume', path: '#resume', icon: 'FileText', color: 'from-indigo-500 to-purple-500' },
    { label: 'Contact', path: '#contact', icon: 'Mail', color: 'from-pink-500 to-rose-500' },
  ];

  useEffect(() => {
    // Initialize background animation
    if (backgroundRef.current) {
      gsap.set(backgroundRef.current, {
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
      });
    }

    // Animate navigation items on mount
    gsap.fromTo(itemsRef.current, 
      { y: -20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.5 }
    );

    // Floating animation for navigation items
    anime({
      targets: itemsRef.current,
      translateY: [0, -2, 0],
      duration: 3000,
      loop: true,
      delay: anime.stagger(300),
      easing: 'easeInOutSine'
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scroll state for styling
      setIsScrolled(currentScrollY > 50);
      
      // Enhanced hide/show navigation with smooth animation
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
        if (navRef.current) {
          gsap.to(navRef.current, { y: -100, duration: 0.3, ease: "power2.inOut" });
        }
      } else {
        setIsVisible(true);
        if (navRef.current) {
          gsap.to(navRef.current, { y: 0, duration: 0.3, ease: "power2.inOut" });
        }
      }
      
      setLastScrollY(currentScrollY);

      // Update active section with enhanced background animation
      const sections = navigationItems.map(item => item.path.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
        const activeItem = navigationItems.find(item => item.path.substring(1) === currentSection);
        if (activeItem && backgroundRef.current) {
          // Animate background gradient based on active section
          gsap.to(backgroundRef.current, {
            duration: 0.8,
            background: `linear-gradient(135deg, ${activeItem.color.replace('from-', '').replace('to-', '').replace('-500', '/0.15').replace('-500', '/0.1')})`
          });
        }
      }
    };

    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [lastScrollY, activeSection]);

  const handleNavClick = (path, index) => {
    const targetId = path.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      // Enhanced scroll animation
      const offsetTop = element.offsetTop - 100; // Account for fixed nav height
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });

      // Pulse animation for clicked item
      if (itemsRef.current[index]) {
        gsap.to(itemsRef.current[index], {
          scale: 1.1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
      }
    }
    
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    if (!isMobileMenuOpen) {
      // Animate mobile menu items
      setTimeout(() => {
        const mobileItems = document.querySelectorAll('.mobile-nav-item');
        gsap.fromTo(mobileItems, 
          { x: -30, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }
        );
      }, 100);
    }
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ease-smooth ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div 
          ref={backgroundRef}
          className={`relative backdrop-blur-lg border-b border-white/10 overflow-hidden transition-all duration-300 ${
            isScrolled ? 'bg-slate-900/95 shadow-lg' : 'bg-slate-900/80'
          }`}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center justify-between h-16">
              {/* Enhanced Logo with proper spacing */}
              <div className="flex-shrink-0 min-w-0">
                <button
                  onClick={() => handleNavClick('#hero', 0)}
                  className="group flex items-center space-x-3 text-white hover:text-blue-400 transition-all duration-300"
                >
                  <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Icon name="Code" size={24} color="white" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </div>
                  <span className="font-heading font-heading-bold text-xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent whitespace-nowrap">
                    John Doe
                  </span>
                </button>
              </div>

              {/* Enhanced Desktop Navigation with proper spacing */}
              <div className="hidden lg:block flex-1 max-w-4xl mx-8">
                <div className="flex items-center justify-center space-x-1">
                  {navigationItems.map((item, index) => (
                    <button
                      key={item.path}
                      ref={el => itemsRef.current[index] = el}
                      onClick={() => handleNavClick(item.path, index)}
                      className={`relative px-3 py-2 rounded-xl text-sm font-body font-body-medium transition-all duration-300 flex items-center space-x-2 group overflow-hidden ${
                        activeSection === item.path.substring(1)
                          ? 'text-white shadow-lg' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {/* Animated background for active item */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl ${
                        activeSection === item.path.substring(1) ? 'opacity-30' : ''
                      }`} />
                      
                      {/* Animated border */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-xl transition-all duration-300" />
                      
                      <Icon name={item.icon} size={16} className="relative z-10 flex-shrink-0" />
                      <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 rounded-xl" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Medium screens navigation (simplified) */}
              <div className="hidden md:block lg:hidden flex-1 max-w-2xl mx-4">
                <div className="flex items-center justify-center space-x-1">
                  {navigationItems.slice(0, 4).map((item, index) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavClick(item.path, index)}
                      className={`relative px-2 py-2 rounded-lg text-xs font-body font-body-medium transition-all duration-300 flex items-center space-x-1 group ${
                        activeSection === item.path.substring(1)
                          ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon name={item.icon} size={14} className="flex-shrink-0" />
                      <span className="hidden sm:inline whitespace-nowrap">{item.label}</span>
                    </button>
                  ))}
                  <div className="w-px h-6 bg-white/20 mx-1" />
                  <button
                    onClick={toggleMobileMenu}
                    className="relative px-2 py-2 rounded-lg text-xs font-body font-body-medium transition-all duration-300 flex items-center space-x-1 text-white/80 hover:text-white hover:bg-white/5"
                  >
                    <Icon name="MoreHorizontal" size={14} />
                  </button>
                </div>
              </div>

              {/* Enhanced Mobile menu button */}
              <div className="md:hidden flex-shrink-0">
                <button
                  onClick={toggleMobileMenu}
                  className="relative inline-flex items-center justify-center p-3 rounded-xl text-white hover:text-blue-400 hover:bg-white/10 transition-all duration-300"
                  aria-expanded="false"
                >
                  <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        <div 
          className={`md:hidden transition-all duration-500 ease-smooth ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="bg-slate-900/95 backdrop-blur-lg border-b border-white/10">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigationItems.map((item, index) => (
                <button
                  key={item.path}
                  className="mobile-nav-item w-full text-left px-4 py-3 rounded-xl text-base font-body font-body-medium transition-all duration-300 flex items-center space-x-3 text-white hover:bg-white/10 group"
                  onClick={() => handleNavClick(item.path, index)}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <Icon name={item.icon} size={16} className="text-white" />
                  </div>
                  <span className="group-hover:text-blue-400 transition-colors duration-300">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-90 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default StickyNavigation;