import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectNavigation = ({ 
  currentProject, 
  totalProjects, 
  onPrevious, 
  onNext, 
  onClose,
  projectTitle = "Project"
}) => {
  const hasPrevious = currentProject > 0;
  const hasNext = currentProject < totalProjects - 1;

  return (
    <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
      {/* Project Counter & Title */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Icon name="FolderOpen" size={16} color="white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-100 truncate max-w-xs sm:max-w-md">
              {projectTitle}
            </h2>
            <p className="text-sm text-slate-400">
              Project {currentProject + 1} of {totalProjects}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Project */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            onClick={onPrevious}
            disabled={!hasPrevious}
            iconName="ChevronLeft"
            className={`p-2 ${
              hasPrevious 
                ? 'text-slate-300 hover:text-white hover:bg-slate-700' :'text-slate-600 cursor-not-allowed'
            }`}
            aria-label="Previous project"
          />
        </motion.div>

        {/* Project Indicator Dots */}
        <div className="hidden sm:flex items-center space-x-1 mx-4">
          {Array.from({ length: Math.min(totalProjects, 5) }, (_, index) => {
            let dotIndex;
            if (totalProjects <= 5) {
              dotIndex = index;
            } else if (currentProject < 2) {
              dotIndex = index;
            } else if (currentProject > totalProjects - 3) {
              dotIndex = totalProjects - 5 + index;
            } else {
              dotIndex = currentProject - 2 + index;
            }

            const isActive = dotIndex === currentProject;
            return (
              <motion.div
                key={dotIndex}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  isActive ? 'bg-blue-500 scale-125' : 'bg-slate-600'
                }`}
                animate={{ scale: isActive ? 1.25 : 1 }}
              />
            );
          })}
          {totalProjects > 5 && currentProject < totalProjects - 2 && (
            <div className="text-slate-500 text-xs ml-1">...</div>
          )}
        </div>

        {/* Next Project */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            onClick={onNext}
            disabled={!hasNext}
            iconName="ChevronRight"
            className={`p-2 ${
              hasNext 
                ? 'text-slate-300 hover:text-white hover:bg-slate-700' :'text-slate-600 cursor-not-allowed'
            }`}
            aria-label="Next project"
          />
        </motion.div>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-600 mx-2" />

        {/* Close Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            onClick={onClose}
            iconName="X"
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-700"
            aria-label="Close modal"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectNavigation;