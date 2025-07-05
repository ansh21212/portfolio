import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SkillCard = ({ skill, index, isVisible }) => {
  const cardRef = useRef(null);
  const progressRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [progressAnimated, setProgressAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !progressAnimated) {
      const timer = setTimeout(() => {
        setProgressAnimated(true);
      }, index * 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, progressAnimated, index]);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const hoverVariants = {
    rest: { 
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: 1.05,
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover="hover"
      variants={hoverVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-xl p-6 border border-gray-200 cursor-pointer relative overflow-hidden group"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Skill Icon/Logo */}
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
          {skill.icon ? (
            <Icon name={skill.icon} size={32} color="white" />
          ) : skill.logo ? (
            <Image
              src={skill.logo}
              alt={skill.name}
              className="w-8 h-8 object-contain"
            />
          ) : (
            <Icon name="Code" size={32} color="white" />
          )}
        </div>

        {/* Skill Name */}
        <h3 className="text-lg font-heading font-heading-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {skill.name}
        </h3>

        {/* Skill Category */}
        <p className="text-sm text-gray-500 mb-3 font-body">
          {skill.category}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-body font-body-medium text-gray-700">
              Proficiency
            </span>
            <span className="text-sm font-body font-body-semibold text-blue-600">
              {skill.level}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: progressAnimated ? `${skill.level}%` : 0 
              }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut",
                delay: 0.3
              }}
            />
          </div>
        </div>

        {/* Experience Years */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} />
            <span className="font-body">{skill.experience} years</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="FolderOpen" size={16} />
            <span className="font-body">{skill.projects} projects</span>
          </div>
        </div>

        {/* Hover Details */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600 font-body leading-relaxed">
              {skill.description}
            </p>
            {skill.recentProjects && skill.recentProjects.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-body font-body-semibold text-gray-700 mb-2">
                  Recent Projects:
                </p>
                <div className="flex flex-wrap gap-1">
                  {skill.recentProjects.map((project, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-body"
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Skill Tags */}
        {skill.tags && skill.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {skill.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-body"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Animated Corner Accent */}
      <motion.div
        className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-blue-500"
        initial={{ scale: 0 }}
        animate={{ scale: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default SkillCard;