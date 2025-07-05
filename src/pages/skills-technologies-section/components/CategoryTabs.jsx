import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  const tabVariants = {
    inactive: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      color: "#6B7280",
      scale: 1
    },
    active: {
      backgroundColor: "#3B82F6",
      color: "#FFFFFF",
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const indicatorVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 }
  };

  return (
    <div className="flex flex-col items-center space-y-6 mb-12">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-3 p-2 bg-gray-100 rounded-xl">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="relative"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={activeCategory === category.id ? "primary" : "ghost"}
              onClick={() => onCategoryChange(category.id)}
              iconName={category.icon}
              iconPosition="left"
              className={`px-6 py-3 rounded-lg font-body font-body-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {category.name}
            </Button>
            
            {/* Active Indicator */}
            {activeCategory === category.id && (
              <motion.div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"
                variants={indicatorVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Category Description */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-2xl"
      >
        {categories.map((category) => (
          activeCategory === category.id && (
            <div key={category.id} className="space-y-3">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon name={category.icon} size={24} color="white" />
                </div>
                <h2 className="text-2xl font-heading font-heading-bold text-gray-900">
                  {category.name}
                </h2>
              </div>
              <p className="text-gray-600 font-body leading-relaxed">
                {category.description}
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Icon name="Code" size={16} />
                  <span className="font-body">{category.skillCount} Skills</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span className="font-body">{category.totalExperience}+ Years</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="FolderOpen" size={16} />
                  <span className="font-body">{category.projectCount}+ Projects</span>
                </div>
              </div>
            </div>
          )
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryTabs;