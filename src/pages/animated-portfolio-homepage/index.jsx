import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { initScrollAnimations, cleanupAnimations, refreshAnimations } from '../../utils/animations';
import LoadingScreen from './components/LoadingScreen';
import AnimatedCursor from './components/AnimatedCursor';
import ScrollIndicator from './components/ScrollIndicator';
import StickyNavigation from '../../components/ui/StickyNavigation';
import ParticleBackground from './components/ParticleBackground';
import EnhancedHeroSection from './components/EnhancedHeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import InteractiveSkillsSection from './components/InteractiveSkillsSection';
import EnhancedProjectsSection from './components/EnhancedProjectsSection';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ScrollToTop from '../../components/ui/ScrollToTop';

const AnimatedPortfolioHomepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Preload critical resources
    const preloadImages = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop'
    ];

    const imagePromises = preloadImages.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      // Minimum loading time for smooth experience
      setTimeout(() => {
        setIsReady(true);
      }, 1500);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Initialize scroll animations after loading with proper delay
      const initTimer = setTimeout(() => {
        initScrollAnimations();
      }, 500);

      // Refresh animations when window resizes
      const handleResize = () => {
        refreshAnimations();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        clearTimeout(initTimer);
        window.removeEventListener('resize', handleResize);
        cleanupAnimations();
      };
    }
  }, [isLoading]);

  // Re-initialize animations when content changes
  useEffect(() => {
    if (!isLoading) {
      const observer = new MutationObserver(() => {
        refreshAnimations();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      });

      return () => observer.disconnect();
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>John Doe - Creative Frontend Developer & UI/UX Designer</title>
        <meta name="description" content="Creative Frontend Developer specializing in React, TypeScript, and modern web technologies. Building beautiful, interactive web experiences with advanced animations and user-centered design." />
        <meta name="keywords" content="frontend developer, react developer, ui/ux designer, web developer, javascript, typescript, portfolio" />
        <meta name="author" content="John Doe" />
        <meta property="og:title" content="John Doe - Creative Frontend Developer" />
        <meta property="og:description" content="Creative Frontend Developer specializing in React and modern web technologies" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://johndoe.dev" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="John Doe - Creative Frontend Developer" />
        <meta name="twitter:description" content="Creative Frontend Developer specializing in React and modern web technologies" />
        <link rel="canonical" href="https://johndoe.dev" />
      </Helmet>

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Main Content */}
      {!isLoading && (
        <div className="relative">
          {/* Particle Background */}
          <ParticleBackground />
          
          {/* Animated Cursor */}
          <AnimatedCursor />
          
          {/* Scroll Progress Indicator */}
          <ScrollIndicator />
          
          {/* Sticky Navigation */}
          <StickyNavigation />
          
          {/* Scroll to Top Button */}
          <ScrollToTop />
          
          {/* Main Sections */}
          <main className="relative">
            <EnhancedHeroSection />
            
            <div data-animate="fadeIn" data-delay="0.2">
              <AboutSection />
            </div>
            
            <div data-animate="slideUp" data-delay="0.1">
              <ExperienceSection />
            </div>
            
            <div data-animate="slideLeft" data-delay="0.3">
              <InteractiveSkillsSection />
            </div>
            
            <div data-animate="scaleIn" data-delay="0.2">
              <EnhancedProjectsSection />
            </div>
            
            <div data-animate="slideRight" data-delay="0.4">
              <ResumeSection />
            </div>
            
            <div data-animate="fadeIn" data-delay="0.1">
              <ContactSection />
            </div>
          </main>
          
          {/* Footer */}
          <div data-animate="slideUp" data-delay="0.3">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default AnimatedPortfolioHomepage;