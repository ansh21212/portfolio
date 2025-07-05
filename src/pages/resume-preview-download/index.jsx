import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet';
import ResumeDocument from './components/ResumeDocument';
import DownloadControls from './components/DownloadControls';
import AnimatedBackground from './components/AnimatedBackground';
import ScrollIndicator from './components/ScrollIndicator';
import NavigationHeader from './components/NavigationHeader';

gsap.registerPlugin(ScrollTrigger);

const ResumePreviewDownload = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // Page entrance animation
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }
    );

    // Parallax effect for the main container
    gsap.to('.resume-container', {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: '.resume-container',
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Cleanup ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Resume Preview & Download - Alex Johnson</title>
        <meta name="description" content="Preview and download Alex Johnson's professional resume. Senior Full Stack Developer with 6+ years of experience in React, Node.js, and cloud technologies." />
        <meta name="keywords" content="resume, cv, full stack developer, react, node.js, download, portfolio" />
        <meta property="og:title" content="Resume Preview & Download - Alex Johnson" />
        <meta property="og:description" content="Preview and download Alex Johnson's professional resume. Senior Full Stack Developer with expertise in modern web technologies." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${window.location.origin}/resume-preview-download`} />
      </Helmet>

      <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground />
        
        {/* Navigation Header */}
        <NavigationHeader />
        
        {/* Scroll Indicator */}
        <ScrollIndicator />

        {/* Main Content */}
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div ref={titleRef} className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Professional Resume
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Preview my complete professional background and download in your preferred format. 
                Updated with the latest experience and achievements.
              </p>
            </div>

            {/* Resume Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Resume Document */}
              <div className="lg:col-span-3">
                <div className="resume-container">
                  <ResumeDocument />
                </div>
              </div>

              {/* Download Controls Sidebar */}
              <div className="lg:col-span-1">
                <DownloadControls />
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-16 text-center">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About This Resume
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Always Updated</h3>
                    <p className="text-gray-600 text-sm">
                      This resume is automatically updated with my latest experience and achievements.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Multiple Formats</h3>
                    <p className="text-gray-600 text-sm">
                      Available in PDF and DOCX formats for different application requirements.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Easy Sharing</h3>
                    <p className="text-gray-600 text-sm">
                      Share this page directly or download for offline viewing and applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Alex Johnson</h3>
                <p className="text-gray-300 text-sm">
                  Senior Full Stack Developer passionate about creating exceptional digital experiences.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>alex.johnson@email.com</p>
                  <p>+1 (555) 987-6543</p>
                  <p>San Francisco, CA</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <a href="https://linkedin.com/in/alexjohnson" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://github.com/alexjohnson" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} Alex Johnson. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ResumePreviewDownload;