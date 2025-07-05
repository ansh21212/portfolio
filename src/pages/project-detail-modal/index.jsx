import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import ProjectNavigation from './components/ProjectNavigation';
import ProjectGallery from './components/ProjectGallery';
import ProjectDetails from './components/ProjectDetails';
import TechnologyStack from './components/TechnologyStack';
import AnimatedCursor from './components/AnimatedCursor';
import BackgroundAnimation from './components/BackgroundAnimation';

const ProjectDetailModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const modalRef = useRef(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  // Mock project data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern, responsive e-commerce platform built with React and Node.js, featuring real-time inventory management and secure payment processing.",
      longDescription: `This comprehensive e-commerce solution was designed to handle high-traffic scenarios while maintaining optimal performance. The platform features a microservices architecture that allows for scalable growth and easy maintenance.\n\nThe frontend utilizes React 18 with advanced state management through Redux Toolkit, while the backend is powered by Node.js and Express with MongoDB for data persistence. The application includes real-time features using WebSocket connections for live inventory updates and customer notifications.\n\nSpecial attention was paid to user experience, with smooth animations, intuitive navigation, and responsive design that works seamlessly across all devices.`,
      technologies: ["React", "Node.js", "MongoDB", "Express", "Redux", "Tailwind CSS", "Stripe API", "Socket.io", "JWT", "Cloudinary"],
      features: [
        "Real-time inventory management with live stock updates",
        "Secure payment processing with multiple gateway support",
        "Advanced product filtering and search functionality",
        "User authentication with social login options",
        "Admin dashboard with comprehensive analytics",
        "Mobile-responsive design with PWA capabilities",
        "Automated email notifications and order tracking",
        "Multi-language and multi-currency support"
      ],
      challenges: [
        "Handling high concurrent user sessions during peak sales",
        "Implementing real-time inventory synchronization across multiple warehouses",
        "Ensuring PCI compliance for payment processing",
        "Optimizing database queries for large product catalogs"
      ],
      solutions: [
        "Implemented Redis caching and database indexing for improved performance",
        "Used WebSocket connections with event-driven architecture for real-time updates",
        "Integrated with certified payment processors and implemented tokenization",
        "Applied database sharding and implemented efficient pagination strategies"
      ],
      images: [
        { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop", alt: "E-commerce homepage" },
        { url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop", alt: "Product catalog" },
        { url: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop", alt: "Shopping cart" },
        { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop", alt: "Admin dashboard" }
      ],
      liveUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/username/ecommerce-platform",
      figmaUrl: "https://figma.com/design/ecommerce-platform",
      status: "Completed",
      timeline: "6 months",
      role: "Full Stack Developer",
      teamSize: "4 developers"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      longDescription: `This task management application was built to streamline team productivity and project coordination. The app features an intuitive Kanban-style interface with drag-and-drop functionality, making it easy for teams to visualize and manage their workflow.\n\nThe application supports real-time collaboration, allowing team members to see updates instantly as they happen. Advanced features include time tracking, file attachments, comment threads, and customizable project templates.\n\nThe backend architecture uses Node.js with PostgreSQL for robust data management, while the frontend leverages React with modern hooks and context API for state management.`,
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io", "Express", "JWT", "Multer", "React DnD"],
      features: [
        "Drag-and-drop task management with Kanban boards",
        "Real-time collaboration with live updates",
        "Time tracking and productivity analytics",
        "File attachments and document sharing",
        "Team member assignment and notifications",
        "Custom project templates and workflows",
        "Advanced filtering and search capabilities",
        "Mobile-responsive design with offline support"
      ],
      challenges: [
        "Implementing smooth drag-and-drop across different screen sizes",
        "Managing real-time state synchronization between multiple users",
        "Handling large file uploads and storage optimization",
        "Creating intuitive user experience for complex workflows"
      ],
      solutions: [
        "Used React DnD library with custom mobile touch handlers",
        "Implemented operational transformation for conflict resolution",
        "Integrated cloud storage with progressive upload and compression",
        "Conducted extensive user testing and iterative design improvements"
      ],
      images: [
        { url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop", alt: "Task board overview" },
        { url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop", alt: "Task details" },
        { url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop", alt: "Team collaboration" }
      ],
      liveUrl: "https://taskmanager-demo.com",
      githubUrl: "https://github.com/username/task-manager",
      status: "Completed",
      timeline: "4 months",
      role: "Lead Frontend Developer",
      teamSize: "3 developers"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A comprehensive weather dashboard with interactive maps, detailed forecasts, and customizable widgets for weather enthusiasts.",
      longDescription: `This weather dashboard provides comprehensive meteorological data through an intuitive and visually appealing interface. The application integrates multiple weather APIs to provide accurate forecasts, historical data, and real-time weather conditions.\n\nThe dashboard features interactive maps with weather overlays, customizable widgets, and detailed analytics. Users can create personalized weather stations, set up alerts for specific conditions, and access historical weather patterns.\n\nBuilt with modern web technologies, the application emphasizes performance and user experience, with smooth animations and responsive design that works across all devices.`,
      technologies: ["React", "D3.js", "OpenWeather API", "Mapbox", "Chart.js", "Tailwind CSS", "PWA", "Service Workers"],
      features: [
        "Interactive weather maps with multiple overlay options",
        "Detailed 7-day forecasts with hourly breakdowns",
        "Customizable dashboard widgets and layouts",
        "Weather alerts and notification system",
        "Historical weather data and trend analysis",
        "Location-based weather tracking",
        "Offline functionality with cached data",
        "Dark/light theme with accessibility features"
      ],
      challenges: [
        "Integrating multiple weather APIs with different data formats",
        "Creating smooth map interactions with large datasets",
        "Implementing accurate location-based weather detection",
        "Optimizing performance for data-heavy visualizations"
      ],
      solutions: [
        "Built a unified data layer to normalize API responses",
        "Implemented data virtualization and lazy loading for maps",
        "Used geolocation API with fallback to IP-based detection",
        "Applied memoization and efficient rendering techniques"
      ],
      images: [
        { url: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop", alt: "Weather dashboard" },
        { url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop", alt: "Interactive map" },
        { url: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop", alt: "Weather widgets" }
      ],
      liveUrl: "https://weather-dashboard-demo.com",
      githubUrl: "https://github.com/username/weather-dashboard",
      status: "In Progress",
      timeline: "3 months",
      role: "Full Stack Developer",
      teamSize: "Solo Project"
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description: "A powerful analytics platform for social media managers to track engagement, analyze trends, and optimize content strategy.",
      longDescription: `This social media analytics platform empowers content creators and marketing teams with comprehensive insights into their social media performance. The application aggregates data from multiple social platforms and presents it through intuitive dashboards and detailed reports.\n\nThe platform features advanced data visualization, automated reporting, and AI-powered content recommendations. Users can track engagement metrics, analyze audience demographics, and identify optimal posting times for maximum reach.\n\nBuilt with scalability in mind, the application handles large volumes of social media data while maintaining fast query performance and real-time updates.`,
      technologies: ["React", "Python", "Django", "PostgreSQL", "Redis", "Celery", "Chart.js", "Social Media APIs", "Machine Learning"],
      features: [
        "Multi-platform social media data aggregation",
        "Advanced analytics with custom metrics and KPIs",
        "Automated report generation and scheduling",
        "AI-powered content optimization recommendations",
        "Competitor analysis and benchmarking",
        "Team collaboration and client reporting tools",
        "Real-time monitoring and alert system",
        "White-label solution for agencies"
      ],
      challenges: [
        "Handling rate limits across multiple social media APIs",
        "Processing and analyzing large volumes of social data",
        "Creating meaningful insights from complex datasets",
        "Ensuring data privacy and compliance with platform policies"
      ],
      solutions: [
        "Implemented intelligent API rate limiting and queue management",
        "Used distributed processing with Celery for data analysis",
        "Applied machine learning algorithms for pattern recognition",
        "Built comprehensive data governance and privacy controls"
      ],
      images: [
        { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", alt: "Analytics dashboard" },
        { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", alt: "Data visualization" },
        { url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop", alt: "Report generation" }
      ],
      liveUrl: "https://social-analytics-demo.com",
      githubUrl: "https://github.com/username/social-analytics",
      status: "Completed",
      timeline: "8 months",
      role: "Technical Lead",
      teamSize: "6 developers"
    }
  ];

  const currentProject = projects[currentProjectIndex];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowLeft':
          if (currentProjectIndex > 0) {
            setCurrentProjectIndex(currentProjectIndex - 1);
            setCurrentImageIndex(0);
          }
          break;
        case 'ArrowRight':
          if (currentProjectIndex < projects.length - 1) {
            setCurrentProjectIndex(currentProjectIndex + 1);
            setCurrentImageIndex(0);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentProjectIndex, projects.length]);

  // Focus management
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      navigate('/animated-portfolio-homepage');
    }, 300);
  };

  const handlePrevious = () => {
    if (currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1);
      setCurrentImageIndex(0);
    }
  };

  const handleNext = () => {
    if (currentProjectIndex < projects.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1);
      setCurrentImageIndex(0);
    }
  };

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-200 bg-slate-900">
      {/* Background Animation */}
      <BackgroundAnimation />
      
      {/* Animated Cursor */}
      <AnimatedCursor />

      {/* Modal Container */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosing ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ 
              scale: isClosing ? 0.9 : 1, 
              opacity: isClosing ? 0 : 1, 
              y: isClosing ? 20 : 0 
            }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3
            }}
            className="relative w-full h-full max-w-7xl mx-auto bg-slate-800 shadow-2xl overflow-hidden md:my-8 md:h-[calc(100vh-4rem)] md:rounded-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
          >
            {/* Navigation Header */}
            <ProjectNavigation
              currentProject={currentProjectIndex}
              totalProjects={projects.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onClose={handleClose}
              projectTitle={currentProject?.title}
            />

            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row h-[calc(100%-80px)] overflow-hidden">
              {/* Left Panel - Project Gallery */}
              <div className="lg:w-1/2 bg-slate-800 p-6 overflow-y-auto scrollbar-hide">
                <ProjectGallery
                  images={currentProject?.images || []}
                  currentIndex={currentImageIndex}
                  onImageChange={handleImageChange}
                />
              </div>

              {/* Right Panel - Project Details */}
              <div className="lg:w-1/2 bg-slate-900 overflow-y-auto scrollbar-hide">
                <div className="p-6 space-y-8">
                  {/* Project Details */}
                  <ProjectDetails project={currentProject} />

                  {/* Technology Stack */}
                  <TechnologyStack technologies={currentProject?.technologies || []} />
                </div>
              </div>
            </div>

            {/* Loading State for Project Transitions */}
            <AnimatePresence>
              {isClosing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center"
                >
                  <div className="flex items-center space-x-3 text-slate-300">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span>Closing...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Hints */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-210">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-slate-300 border border-slate-700"
        >
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">←</kbd>
              <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">→</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Esc</kbd>
              <span>Close</span>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;