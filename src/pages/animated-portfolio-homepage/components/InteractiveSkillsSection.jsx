import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const InteractiveSkillsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: 'Monitor',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', level: 95, icon: 'Code', projects: 25, description: 'Advanced React development with hooks, context, and performance optimization' },
        { name: 'TypeScript', level: 90, icon: 'FileCode', projects: 20, description: 'Type-safe JavaScript development with advanced TypeScript features' },
        { name: 'Next.js', level: 88, icon: 'Zap', projects: 15, description: 'Full-stack React framework with SSR, SSG, and API routes' },
        { name: 'Tailwind CSS', level: 92, icon: 'Palette', projects: 30, description: 'Utility-first CSS framework for rapid UI development' },
        { name: 'Vue.js', level: 82, icon: 'Layers', projects: 12, description: 'Progressive JavaScript framework with composition API' },
        { name: 'Sass/SCSS', level: 85, icon: 'Paintbrush', projects: 18, description: 'Advanced CSS preprocessing with mixins and functions' }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: 'Server',
      color: 'from-green-500 to-teal-500',
      skills: [
        { name: 'Node.js', level: 88, icon: 'Server', projects: 20, description: 'Server-side JavaScript with Express.js and microservices' },
        { name: 'Python', level: 85, icon: 'Code', projects: 15, description: 'Backend development with Django/Flask and data processing' },
        { name: 'PostgreSQL', level: 82, icon: 'Database', projects: 18, description: 'Advanced SQL database design and optimization' },
        { name: 'MongoDB', level: 80, icon: 'Database', projects: 12, description: 'NoSQL database with aggregation pipelines' },
        { name: 'GraphQL', level: 78, icon: 'Share2', projects: 10, description: 'Query language for APIs with Apollo Server' },
        { name: 'Redis', level: 75, icon: 'Zap', projects: 8, description: 'In-memory data structure store for caching' }
      ]
    },
    tools: {
      title: 'Tools & DevOps',
      icon: 'Settings',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Git & GitHub', level: 92, icon: 'GitBranch', projects: 50, description: 'Version control with advanced Git workflows' },
        { name: 'Docker', level: 85, icon: 'Package', projects: 15, description: 'Containerization and deployment with Docker Compose' },
        { name: 'AWS', level: 80, icon: 'Cloud', projects: 12, description: 'Cloud services including EC2, S3, Lambda, and RDS' },
        { name: 'Webpack', level: 78, icon: 'Package2', projects: 20, description: 'Module bundling and build optimization' },
        { name: 'Jest', level: 82, icon: 'CheckCircle', projects: 25, description: 'Unit testing and test-driven development' },
        { name: 'Figma', level: 90, icon: 'Figma', projects: 30, description: 'UI/UX design with prototyping and design systems' }
      ]
    }
  };

  const categories = Object.keys(skillCategories);

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="py-24 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border-2 border-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 border-2 border-purple-500 rotate-45 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-green-500 rounded-lg animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Technical <span className="text-blue-600">Expertise</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and the tools I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-xl p-2 shadow-lg border border-slate-200">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon name={skillCategories[category].icon} size={18} />
                <span>{skillCategories[category].title}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group hover:border-blue-300 cursor-pointer"
            >
              {/* Skill Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${skillCategories[activeCategory].color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={skill.icon} size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-slate-500">{skill.projects} projects</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-blue-600">{skill.level}%</span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skillCategories[activeCategory].color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Skill Description */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: hoveredSkill === skill.name ? 1 : 0,
                  height: hoveredSkill === skill.name ? "auto" : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                  {skill.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Continuous Learning & Growth
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Technology evolves rapidly, and so do I. I'm constantly exploring new tools, 
              frameworks, and best practices to stay at the forefront of web development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Learning', 'Experimenting', 'Building', 'Sharing'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="bg-white rounded-lg px-4 py-2 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200"
                >
                  <span className="text-slate-700 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveSkillsSection;