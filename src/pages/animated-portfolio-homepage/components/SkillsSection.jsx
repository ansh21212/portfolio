import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });
  const [activeTab, setActiveTab] = useState('frontend');

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: 'Monitor',
      skills: [
        { name: 'React', level: 95, icon: 'Code', color: 'from-blue-500 to-blue-600' },
        { name: 'TypeScript', level: 90, icon: 'FileCode', color: 'from-blue-600 to-indigo-600' },
        { name: 'Next.js', level: 88, icon: 'Zap', color: 'from-gray-700 to-gray-800' },
        { name: 'Tailwind CSS', level: 92, icon: 'Palette', color: 'from-cyan-500 to-blue-500' },
        { name: 'JavaScript', level: 94, icon: 'Code2', color: 'from-yellow-500 to-orange-500' },
        { name: 'HTML/CSS', level: 96, icon: 'Layout', color: 'from-orange-500 to-red-500' }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: 'Server',
      skills: [
        { name: 'Node.js', level: 85, icon: 'Server', color: 'from-green-500 to-green-600' },
        { name: 'Express.js', level: 82, icon: 'Zap', color: 'from-gray-600 to-gray-700' },
        { name: 'PostgreSQL', level: 78, icon: 'Database', color: 'from-blue-600 to-indigo-600' },
        { name: 'MongoDB', level: 80, icon: 'Database', color: 'from-green-600 to-green-700' },
        { name: 'GraphQL', level: 75, icon: 'Share2', color: 'from-pink-500 to-purple-500' },
        { name: 'REST APIs', level: 88, icon: 'Globe', color: 'from-blue-500 to-purple-500' }
      ]
    },
    tools: {
      title: 'Tools & Technologies',
      icon: 'Settings',
      skills: [
        { name: 'Git', level: 90, icon: 'GitBranch', color: 'from-orange-500 to-red-500' },
        { name: 'Docker', level: 75, icon: 'Package', color: 'from-blue-500 to-blue-600' },
        { name: 'AWS', level: 70, icon: 'Cloud', color: 'from-yellow-500 to-orange-500' },
        { name: 'Figma', level: 85, icon: 'Figma', color: 'from-purple-500 to-pink-500' },
        { name: 'Jest', level: 80, icon: 'CheckCircle', color: 'from-green-500 to-green-600' },
        { name: 'Webpack', level: 72, icon: 'Package2', color: 'from-blue-600 to-indigo-600' }
      ]
    },
    design: {
      title: 'Design & Animation',
      icon: 'Palette',
      skills: [
        { name: 'UI/UX Design', level: 88, icon: 'Paintbrush', color: 'from-purple-500 to-pink-500' },
        { name: 'Framer Motion', level: 85, icon: 'Zap', color: 'from-blue-500 to-purple-500' },
        { name: 'GSAP', level: 82, icon: 'Play', color: 'from-green-500 to-blue-500' },
        { name: 'Adobe XD', level: 78, icon: 'Square', color: 'from-pink-500 to-purple-500' },
        { name: 'Responsive Design', level: 94, icon: 'Smartphone', color: 'from-green-500 to-teal-500' },
        { name: 'Accessibility', level: 86, icon: 'Eye', color: 'from-blue-500 to-indigo-500' }
      ]
    }
  };

  const tabs = Object.keys(skillCategories);

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-gray-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-gray-400 rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-gray-400 rounded-lg"></div>
        <div className="absolute top-1/4 right-1/3 w-20 h-20 border-2 border-gray-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            My <span className="text-blue-600">Skills</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and the tools I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center mb-12"
        >
          <div className="bg-slate-100 rounded-xl p-2 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon name={skillCategories[tab].icon} size={18} />
                <span className="hidden sm:inline">{skillCategories[tab].title}</span>
                <span className="sm:hidden">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories[activeTab].skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group hover:border-blue-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={skill.icon} size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{skill.name}</h3>
                    <p className="text-sm text-slate-600">{skill.level}% Proficiency</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                  />
                </div>
                <motion.div
                  className="absolute top-0 right-0 -mt-8 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                >
                  {skill.level}%
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Always Learning & Growing
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
                  className="bg-white rounded-lg px-4 py-2 shadow-sm border border-slate-200"
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

export default SkillsSection;