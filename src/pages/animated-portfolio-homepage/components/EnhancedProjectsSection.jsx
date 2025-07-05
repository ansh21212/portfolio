import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EnhancedProjectsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      description: 'A modern e-commerce platform with real-time inventory management, secure payments, and analytics dashboard.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
      liveUrl: 'https://example-ecommerce.com',
      githubUrl: 'https://github.com/username/ecommerce',
      featured: true,
      stats: { users: '10K+', revenue: '$500K+', uptime: '99.9%' }
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'mobile',
      description: 'Collaborative task management with real-time updates, team features, and advanced project tracking.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      technologies: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
      liveUrl: 'https://example-taskapp.com',
      githubUrl: 'https://github.com/username/taskapp',
      featured: true,
      stats: { downloads: '50K+', rating: '4.8/5', teams: '1K+' }
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      category: 'web',
      description: 'Comprehensive analytics dashboard with real-time data visualization and customizable reports.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
      liveUrl: 'https://example-dashboard.com',
      githubUrl: 'https://github.com/username/dashboard',
      featured: false,
      stats: { dataPoints: '1M+', clients: '100+', accuracy: '99.5%' }
    },
    {
      id: 4,
      title: 'Portfolio Website',
      category: 'web',
      description: 'Creative portfolio with advanced animations, smooth scrolling, and interactive elements.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      technologies: ['React', 'Framer Motion', 'GSAP', 'Tailwind'],
      liveUrl: 'https://example-portfolio.com',
      githubUrl: 'https://github.com/username/portfolio',
      featured: false,
      stats: { visitors: '25K+', bounce: '15%', speed: '95/100' }
    },
    {
      id: 5,
      title: 'Social Media App',
      category: 'mobile',
      description: 'Social media platform with photo sharing, real-time messaging, and community features.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
      technologies: ['React Native', 'GraphQL', 'Apollo', 'AWS'],
      liveUrl: 'https://example-social.com',
      githubUrl: 'https://github.com/username/social',
      featured: true,
      stats: { users: '75K+', posts: '500K+', engagement: '85%' }
    },
    {
      id: 6,
      title: 'Learning Platform',
      category: 'web',
      description: 'Educational platform with course management, progress tracking, and interactive learning tools.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'],
      liveUrl: 'https://example-lms.com',
      githubUrl: 'https://github.com/username/lms',
      featured: false,
      stats: { students: '5K+', courses: '200+', completion: '78%' }
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

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-24 bg-slate-50 relative overflow-hidden"
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
            A showcase of my recent work, demonstrating expertise in modern technologies and creative problem-solving.
          </p>
        </motion.div>

        {/* Featured Projects Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            🌟 Featured Work
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group cursor-pointer"
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
                    
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        ⭐ Featured
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-blue-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Icon name="Eye" size={32} className="mx-auto mb-2" />
                        <p className="font-semibold">View Project</p>
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
                    
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Project Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="bg-slate-50 rounded-lg p-2">
                          <div className="text-sm font-bold text-slate-900">{value}</div>
                          <div className="text-xs text-slate-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
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
                          window.open(project.liveUrl, '_blank');
                        }}
                        className="flex-1"
                      >
                        Live Demo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Github"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl, '_blank');
                        }}
                        className="px-3"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
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

        {/* All Projects Grid */}
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
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      size="sm"
                      iconName="ExternalLink"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                      className="flex-1 text-xs"
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Github"
                      onClick={() => window.open(project.githubUrl, '_blank')}
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
          transition={{ duration: 0.8, delay: 1.2 }}
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
    </section>
  );
};

export default EnhancedProjectsSection;