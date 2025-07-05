import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProjectModal from '../../../components/ui/ProjectModal';

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      description: 'A modern e-commerce platform built with React and Node.js, featuring real-time inventory management, secure payment processing, and an intuitive admin dashboard.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
      liveUrl: 'https://example-ecommerce.com',
      githubUrl: 'https://github.com/johndoe/ecommerce',
      features: [
        'Responsive design optimized for all devices',
        'Real-time inventory tracking',
        'Secure payment integration with Stripe',
        'Advanced search and filtering',
        'Admin dashboard with analytics'
      ],
      status: 'completed'
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'mobile',
      description: 'A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      technologies: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
      liveUrl: 'https://example-taskapp.com',
      githubUrl: 'https://github.com/johndoe/taskapp',
      features: [
        'Real-time collaboration',
        'Cross-platform mobile app',
        'Offline functionality',
        'Push notifications',
        'Team management system'
      ],
      status: 'completed'
    },
    {
      id: 3,
      title: 'Portfolio Website',
      category: 'web',
      description: 'A creative portfolio website with advanced animations, smooth scrolling effects, and interactive elements to showcase creative work.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      technologies: ['React', 'Framer Motion', 'GSAP', 'Tailwind CSS'],
      liveUrl: 'https://example-portfolio.com',
      githubUrl: 'https://github.com/johndoe/portfolio',
      features: [
        'Advanced scroll-triggered animations',
        'Interactive cursor effects',
        'Smooth page transitions',
        'Responsive design',
        'Performance optimized'
      ],
      status: 'completed'
    },
    {
      id: 4,
      title: 'Analytics Dashboard',
      category: 'web',
      description: 'A comprehensive analytics dashboard for tracking business metrics with real-time data visualization and customizable reports.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Chart.js'],
      liveUrl: 'https://example-dashboard.com',
      githubUrl: 'https://github.com/johndoe/dashboard',
      features: [
        'Real-time data visualization',
        'Customizable dashboard widgets',
        'Export functionality',
        'Multi-user support',
        'Advanced filtering options'
      ],
      status: 'completed'
    },
    {
      id: 5,
      title: 'Social Media App',
      category: 'mobile',
      description: 'A social media application with photo sharing, real-time messaging, and community features built for mobile-first experience.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
      technologies: ['React Native', 'GraphQL', 'Apollo', 'AWS', 'TypeScript'],
      liveUrl: 'https://example-social.com',
      githubUrl: 'https://github.com/johndoe/social',
      features: [
        'Photo and video sharing',
        'Real-time messaging',
        'Social networking features',
        'Push notifications',
        'Cloud storage integration'
      ],
      status: 'in-progress'
    },
    {
      id: 6,
      title: 'Learning Management System',
      category: 'web',
      description: 'An educational platform for online learning with course management, progress tracking, and interactive learning tools.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      liveUrl: 'https://example-lms.com',
      githubUrl: 'https://github.com/johndoe/lms',
      features: [
        'Course creation and management',
        'Progress tracking',
        'Interactive quizzes',
        'Video streaming',
        'Certificate generation'
      ],
      status: 'completed'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: 'Grid3x3' },
    { id: 'web', label: 'Web Apps', icon: 'Monitor' },
    { id: 'mobile', label: 'Mobile Apps', icon: 'Smartphone' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-20 bg-slate-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border-2 border-slate-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 border-2 border-slate-400 rotate-45"
          animate={{ rotate: 405 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Featured <span className="text-blue-600">Projects</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A showcase of my recent work, demonstrating expertise in modern web technologies and creative problem-solving.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-xl p-2 shadow-lg border border-slate-200">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  filter === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon name={category.icon} size={18} />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'completed' 
                        ? 'bg-green-100 text-green-800' :'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Icon name="Eye" size={32} className="mx-auto mb-2" />
                      <p className="font-semibold">View Details</p>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <Icon name="ExternalLink" size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>
                  
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      size="sm"
                      iconName="Eye"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project);
                      }}
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ExternalLink"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.liveUrl, '_blank');
                      }}
                      className="px-3"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            iconName="Github"
            iconPosition="right"
            onClick={() => window.open('https://github.com/johndoe', '_blank')}
            className="border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900"
          >
            View All Projects on GitHub
          </Button>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};

export default ProjectsSection;