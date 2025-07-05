import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import CategoryTabs from './components/CategoryTabs';
import SkillsGrid from './components/SkillsGrid';
import SkillsStats from './components/SkillsStats';
import AnimatedBackground from './components/AnimatedBackground';
import CustomCursor from './components/CustomCursor';

const SkillsTechnologiesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // GSAP ScrollTrigger animations would go here
    // For now, using Framer Motion alternatives
  }, []);

  const categories = [
    {
      id: 'all',
      name: 'All Skills',
      icon: 'Grid3X3',
      description: 'Complete overview of all technical competencies and expertise areas',
      skillCount: 24,
      totalExperience: 8,
      projectCount: 50
    },
    {
      id: 'frontend',
      name: 'Frontend',
      icon: 'Monitor',
      description: 'Modern frontend technologies for building responsive and interactive user interfaces',
      skillCount: 8,
      totalExperience: 6,
      projectCount: 25
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: 'Server',
      description: 'Server-side technologies and database management for robust application architecture',
      skillCount: 6,
      totalExperience: 5,
      projectCount: 15
    },
    {
      id: 'design',
      name: 'Design',
      icon: 'Palette',
      description: 'Design tools and methodologies for creating compelling visual experiences',
      skillCount: 5,
      totalExperience: 4,
      projectCount: 20
    },
    {
      id: 'tools',
      name: 'Dev Tools',
      icon: 'Settings',
      description: 'Development workflow tools and platforms for efficient project management',
      skillCount: 5,
      totalExperience: 6,
      projectCount: 30
    }
  ];

  const skills = [
    // Frontend Skills
    {
      id: 1,
      name: 'React',
      category: 'frontend',
      level: 95,
      experience: 5,
      projects: 15,
      icon: 'Code',
      description: 'Advanced React development with hooks, context, and performance optimization',
      tags: ['Hooks', 'Context', 'Redux'],
      recentProjects: ['E-commerce Platform', 'Dashboard App', 'Portfolio Site']
    },
    {
      id: 2,
      name: 'TypeScript',
      category: 'frontend',
      level: 90,
      experience: 4,
      projects: 12,
      icon: 'FileCode',
      description: 'Type-safe JavaScript development with advanced TypeScript features',
      tags: ['Generics', 'Interfaces', 'Decorators'],
      recentProjects: ['CRM System', 'API Client', 'Component Library']
    },
    {
      id: 3,
      name: 'Next.js',
      category: 'frontend',
      level: 88,
      experience: 3,
      projects: 8,
      icon: 'Zap',
      description: 'Full-stack React framework with SSR, SSG, and API routes',
      tags: ['SSR', 'SSG', 'API Routes'],
      recentProjects: ['Blog Platform', 'E-commerce Site', 'Landing Pages']
    },
    {
      id: 4,
      name: 'Vue.js',
      category: 'frontend',
      level: 82,
      experience: 3,
      projects: 6,
      icon: 'Layers',
      description: 'Progressive JavaScript framework with composition API and Vuex',
      tags: ['Composition API', 'Vuex', 'Vue Router'],
      recentProjects: ['Admin Panel', 'SPA Application', 'Component System']
    },
    {
      id: 5,
      name: 'Tailwind CSS',
      category: 'frontend',
      level: 93,
      experience: 4,
      projects: 20,
      icon: 'Paintbrush',
      description: 'Utility-first CSS framework for rapid UI development',
      tags: ['Responsive', 'Custom Components', 'Dark Mode'],
      recentProjects: ['Design System', 'Mobile App', 'Web Components']
    },
    {
      id: 6,
      name: 'Sass/SCSS',
      category: 'frontend',
      level: 85,
      experience: 5,
      projects: 18,
      icon: 'Palette',
      description: 'Advanced CSS preprocessing with mixins, functions, and modules',
      tags: ['Mixins', 'Functions', 'Modules'],
      recentProjects: ['Theme System', 'Component Library', 'Style Guide']
    },
    {
      id: 7,
      name: 'JavaScript ES6+',
      category: 'frontend',
      level: 92,
      experience: 6,
      projects: 25,
      icon: 'Code2',
      description: 'Modern JavaScript with async/await, modules, and advanced features',
      tags: ['ES6+', 'Async/Await', 'Modules'],
      recentProjects: ['API Integration', 'Data Processing', 'Animation Library']
    },
    {
      id: 8,
      name: 'HTML5 & CSS3',
      category: 'frontend',
      level: 95,
      experience: 8,
      projects: 30,
      icon: 'Globe',
      description: 'Semantic HTML and modern CSS with animations and responsive design',
      tags: ['Semantic HTML', 'CSS Grid', 'Flexbox'],
      recentProjects: ['Landing Pages', 'Email Templates', 'Web Components']
    },

    // Backend Skills
    {
      id: 9,
      name: 'Node.js',
      category: 'backend',
      level: 88,
      experience: 4,
      projects: 12,
      icon: 'Server',
      description: 'Server-side JavaScript with Express.js and microservices architecture',
      tags: ['Express.js', 'Microservices', 'REST APIs'],
      recentProjects: ['API Gateway', 'Microservice', 'Real-time Chat']
    },
    {
      id: 10,
      name: 'Python',
      category: 'backend',
      level: 85,
      experience: 3,
      projects: 8,
      icon: 'Code',
      description: 'Backend development with Django/Flask and data processing',
      tags: ['Django', 'Flask', 'Data Science'],
      recentProjects: ['Web API', 'Data Pipeline', 'ML Model']
    },
    {
      id: 11,
      name: 'PostgreSQL',
      category: 'backend',
      level: 82,
      experience: 4,
      projects: 10,
      icon: 'Database',
      description: 'Advanced SQL database design and optimization',
      tags: ['SQL', 'Indexing', 'Performance'],
      recentProjects: ['Database Design', 'Query Optimization', 'Data Migration']
    },
    {
      id: 12,
      name: 'MongoDB',
      category: 'backend',
      level: 80,
      experience: 3,
      projects: 7,
      icon: 'Database',
      description: 'NoSQL database with aggregation pipelines and indexing',
      tags: ['NoSQL', 'Aggregation', 'Indexing'],
      recentProjects: ['Content Management', 'User Analytics', 'Real-time Data']
    },
    {
      id: 13,
      name: 'GraphQL',
      category: 'backend',
      level: 78,
      experience: 2,
      projects: 5,
      icon: 'Share2',
      description: 'Query language for APIs with Apollo Server and client',
      tags: ['Apollo', 'Resolvers', 'Schema Design'],
      recentProjects: ['API Gateway', 'Mobile Backend', 'Data Federation']
    },
    {
      id: 14,
      name: 'Redis',
      category: 'backend',
      level: 75,
      experience: 2,
      projects: 6,
      icon: 'Zap',
      description: 'In-memory data structure store for caching and sessions',
      tags: ['Caching', 'Sessions', 'Pub/Sub'],
      recentProjects: ['Session Store', 'Cache Layer', 'Real-time Features']
    },

    // Design Skills
    {
      id: 15,
      name: 'Figma',
      category: 'design',
      level: 90,
      experience: 4,
      projects: 15,
      icon: 'Figma',
      description: 'UI/UX design with prototyping and design systems',
      tags: ['Prototyping', 'Design Systems', 'Collaboration'],
      recentProjects: ['Design System', 'Mobile App UI', 'Web Prototypes']
    },
    {
      id: 16,
      name: 'Adobe XD',
      category: 'design',
      level: 85,
      experience: 3,
      projects: 10,
      icon: 'Layers',
      description: 'User experience design and interactive prototyping',
      tags: ['UX Design', 'Prototyping', 'User Testing'],
      recentProjects: ['User Journey', 'Wireframes', 'Interactive Prototype']
    },
    {
      id: 17,
      name: 'Sketch',
      category: 'design',
      level: 80,
      experience: 3,
      projects: 8,
      icon: 'PenTool',
      description: 'Vector-based design tool for UI and icon design',
      tags: ['Vector Design', 'Symbols', 'Plugins'],
      recentProjects: ['Icon Set', 'UI Kit', 'Brand Guidelines']
    },
    {
      id: 18,
      name: 'Photoshop',
      category: 'design',
      level: 82,
      experience: 5,
      projects: 12,
      icon: 'Image',
      description: 'Photo editing and digital art creation',
      tags: ['Photo Editing', 'Digital Art', 'Web Graphics'],
      recentProjects: ['Web Graphics', 'Photo Retouching', 'Digital Artwork']
    },
    {
      id: 19,
      name: 'Illustrator',
      category: 'design',
      level: 78,
      experience: 4,
      projects: 9,
      icon: 'PenTool',
      description: 'Vector graphics and logo design',
      tags: ['Vector Graphics', 'Logo Design', 'Illustrations'],
      recentProjects: ['Logo Design', 'Vector Illustrations', 'Brand Identity']
    },

    // Development Tools
    {
      id: 20,
      name: 'Git & GitHub',
      category: 'tools',
      level: 92,
      experience: 6,
      projects: 30,
      icon: 'GitBranch',
      description: 'Version control with advanced Git workflows and collaboration',
      tags: ['Version Control', 'Collaboration', 'CI/CD'],
      recentProjects: ['Team Workflows', 'Release Management', 'Code Reviews']
    },
    {
      id: 21,
      name: 'Docker',
      category: 'tools',
      level: 85,
      experience: 3,
      projects: 8,
      icon: 'Package',
      description: 'Containerization and deployment with Docker Compose',
      tags: ['Containerization', 'Docker Compose', 'Deployment'],
      recentProjects: ['Microservices', 'Development Environment', 'Production Deploy']
    },
    {
      id: 22,
      name: 'AWS',
      category: 'tools',
      level: 80,
      experience: 2,
      projects: 6,
      icon: 'Cloud',
      description: 'Cloud services including EC2, S3, Lambda, and RDS',
      tags: ['EC2', 'S3', 'Lambda', 'RDS'],
      recentProjects: ['Serverless API', 'Static Hosting', 'Database Migration']
    },
    {
      id: 23,
      name: 'Webpack',
      category: 'tools',
      level: 78,
      experience: 4,
      projects: 12,
      icon: 'Package2',
      description: 'Module bundling and build optimization',
      tags: ['Bundling', 'Optimization', 'Plugins'],
      recentProjects: ['Build Pipeline', 'Performance Optimization', 'Custom Plugins']
    },
    {
      id: 24,
      name: 'Jest & Testing',
      category: 'tools',
      level: 82,
      experience: 3,
      projects: 10,
      icon: 'CheckCircle',
      description: 'Unit testing, integration testing, and test-driven development',
      tags: ['Unit Testing', 'Integration Testing', 'TDD'],
      recentProjects: ['Test Suite', 'E2E Testing', 'Test Automation']
    }
  ];

  const navigationRoutes = [
    { path: '/animated-portfolio-homepage', label: 'Home', icon: 'Home' },
    { path: '/project-detail-modal', label: 'Projects', icon: 'FolderOpen' },
    { path: '/skills-technologies-section', label: 'Skills', icon: 'Code' },
    { path: '/contact-form-interface', label: 'Contact', icon: 'Mail' },
    { path: '/resume-preview-download', label: 'Resume', icon: 'FileText' }
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.8
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto"
          >
            <Icon name="Code" size={32} color="white" />
          </motion.div>
          <h2 className="text-xl font-heading font-heading-semibold text-gray-900">
            Loading Skills & Technologies
          </h2>
          <p className="text-gray-600 font-body">
            Preparing your technical expertise showcase...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden"
    >
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Icon name="Code" size={20} color="white" />
              </div>
              <span className="font-heading font-heading-semibold text-lg text-gray-900">
                Skills & Technologies
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {navigationRoutes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    route.path === '/skills-technologies-section' ?'bg-blue-100 text-blue-600' :'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon name={route.icon} size={16} />
                  <span className="font-body font-body-medium">{route.label}</span>
                </Link>
              ))}
            </div>

            <div className="md:hidden">
              <Button variant="ghost" iconName="Menu" className="p-2" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-heading-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Skills & 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Technologies
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-600 font-body max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Explore my technical expertise across frontend development, backend systems, 
              design tools, and development workflows. Each skill represents years of hands-on 
              experience and continuous learning in the ever-evolving tech landscape.
            </motion.p>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center space-y-2 text-gray-400"
              >
                <span className="text-sm font-body">Scroll to explore</span>
                <Icon name="ChevronDown" size={20} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Skills Statistics */}
          <SkillsStats skills={skills} />

          {/* Category Tabs */}
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Skills Grid */}
          <SkillsGrid
            skills={skills}
            activeCategory={activeCategory}
          />

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-heading-bold mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-blue-100 font-body mb-6 max-w-2xl mx-auto">
              Let's discuss how these skills can bring value to your next project. I'm always excited to tackle new challenges and learn emerging technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-form-interface">
                <Button
                  variant="secondary"
                  iconName="Mail"
                  iconPosition="right"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Get In Touch
                </Button>
              </Link>
              <Link to="/resume-preview-download">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="right"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Download Resume
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon name="Code" size={20} color="white" />
                </div>
                <span className="font-heading font-heading-semibold text-lg">
                  Portfolio
                </span>
              </div>
              <p className="text-gray-400 font-body">
                Passionate developer creating exceptional digital experiences 
                with modern technologies and best practices.
              </p>
            </div>
            
            <div>
              <h3 className="font-heading font-heading-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                {navigationRoutes.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    className="block text-gray-400 hover:text-white transition-colors duration-200 font-body"
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-heading font-heading-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400 font-body">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>hello@portfolio.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 font-body">
            <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default SkillsTechnologiesSection;