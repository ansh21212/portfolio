import React, { useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const ProjectModal = ({ isOpen, onClose, project }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleTabTrap = (e) => {
      if (!isOpen || e.key !== 'Tab') return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabIndex="-1"])'
      );
      
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabTrap);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabTrap);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-200 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md animate-fade-in" />
      
      {/* Modal Content */}
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-4xl max-h-[90vh] bg-surface rounded-xl elevation-modal animate-scale-in overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 
            id="modal-title"
            className="text-2xl font-heading font-heading-semibold text-text-primary"
          >
            {project.title}
          </h2>
          <Button
            variant="ghost"
            onClick={onClose}
            iconName="X"
            className="p-2"
            aria-label="Close modal"
          />
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-hide">
          <div className="p-6 space-y-6">
            {/* Project Image */}
            {project.image && (
              <div className="aspect-video rounded-lg overflow-hidden bg-background">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Project Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
                About This Project
              </h3>
              <p className="text-text-secondary font-body leading-relaxed">
                {project.description || "This project showcases modern web development techniques with a focus on user experience and performance optimization. Built with cutting-edge technologies and following best practices for scalability and maintainability."}
              </p>
            </div>

            {/* Technologies Used */}
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {(project.technologies || ['React', 'TypeScript', 'Tailwind CSS', 'Node.js']).map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-body font-body-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
                Key Features
              </h3>
              <ul className="space-y-2">
                {(project.features || [
                  'Responsive design optimized for all devices',
                  'Performance-focused architecture',
                  'Accessible user interface',
                  'Modern animation and interactions'
                ]).map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
                    <span className="text-text-secondary font-body">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Project Links */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {project.liveUrl && (
                <Button
                  variant="primary"
                  iconName="ExternalLink"
                  iconPosition="right"
                  onClick={() => window.open(project.liveUrl, '_blank')}
                  className="flex-1"
                >
                  View Live Project
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="outline"
                  iconName="Github"
                  iconPosition="right"
                  onClick={() => window.open(project.githubUrl, '_blank')}
                  className="flex-1"
                >
                  View Source Code
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;