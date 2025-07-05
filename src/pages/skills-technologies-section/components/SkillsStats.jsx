import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillsStats = ({ skills }) => {
  const statsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    totalSkills: 0,
    totalExperience: 0,
    totalProjects: 0,
    averageLevel: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const totalSkills = skills.length;
      const totalExperience = Math.max(...skills.map(skill => skill.experience));
      const totalProjects = skills.reduce((sum, skill) => sum + skill.projects, 0);
      const averageLevel = Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length);

      const animateValue = (start, end, duration, callback) => {
        const startTime = performance.now();
        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const value = Math.floor(start + (end - start) * progress);
          callback(value);
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      };

      // Animate each stat with different durations
      animateValue(0, totalSkills, 1000, (value) => {
        setAnimatedStats(prev => ({ ...prev, totalSkills: value }));
      });

      animateValue(0, totalExperience, 1200, (value) => {
        setAnimatedStats(prev => ({ ...prev, totalExperience: value }));
      });

      animateValue(0, totalProjects, 1500, (value) => {
        setAnimatedStats(prev => ({ ...prev, totalProjects: value }));
      });

      animateValue(0, averageLevel, 1300, (value) => {
        setAnimatedStats(prev => ({ ...prev, averageLevel: value }));
      });
    }
  }, [isVisible, skills]);

  const statsData = [
    {
      icon: 'Code',
      label: 'Total Skills',
      value: animatedStats.totalSkills,
      suffix: '',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: 'Calendar',
      label: 'Years Experience',
      value: animatedStats.totalExperience,
      suffix: '+',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: 'FolderOpen',
      label: 'Projects Completed',
      value: animatedStats.totalProjects,
      suffix: '+',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: 'TrendingUp',
      label: 'Average Proficiency',
      value: animatedStats.averageLevel,
      suffix: '%',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      ref={statsRef}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
    >
      {statsData.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          className={`${stat.bgColor} rounded-xl p-6 text-center relative overflow-hidden group cursor-pointer`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
              <div className={`w-full h-full bg-gradient-to-br ${stat.color} rounded-full`} />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <Icon name={stat.icon} size={28} color="white" />
            </div>

            {/* Value */}
            <div className="mb-2">
              <span className="text-3xl font-heading font-heading-bold text-gray-900">
                {stat.value}
              </span>
              <span className="text-2xl font-heading font-heading-bold text-gray-600">
                {stat.suffix}
              </span>
            </div>

            {/* Label */}
            <p className="text-sm font-body font-body-medium text-gray-600 uppercase tracking-wide">
              {stat.label}
            </p>
          </div>

          {/* Hover Effect */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkillsStats;