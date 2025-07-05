import React, { useEffect, useRef, useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ResumePreviewModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

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

  const handleDownload = async (format = 'pdf') => {
    setIsDownloading(true);
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a temporary download link
      const link = document.createElement('a');
      link.href = '/assets/resume/john-doe-resume.pdf'; // Replace with actual resume file
      link.download = `john-doe-resume.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const resumeData = {
    personalInfo: {
      name: 'John Doe',
      title: 'Full Stack Developer',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'johndoe.dev',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe'
    },
    summary: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Strong focus on user experience and performance optimization.',
    experience: [
      {
        title: 'Senior Full Stack Developer',
        company: 'Tech Innovations Inc.',
        period: '2022 - Present',
        achievements: [
          'Led development of microservices architecture serving 1M+ users',
          'Improved application performance by 40% through optimization',
          'Mentored junior developers and established coding standards'
        ]
      },
      {
        title: 'Frontend Developer',
        company: 'Digital Solutions LLC',
        period: '2020 - 2022',
        achievements: [
          'Built responsive web applications using React and TypeScript',
          'Collaborated with design team to implement pixel-perfect UIs',
          'Reduced bundle size by 30% through code splitting and optimization'
        ]
      }
    ],
    skills: {
      'Frontend': ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      'Backend': ['Node.js', 'Express', 'Python', 'PostgreSQL'],
      'Cloud': ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      'Tools': ['Git', 'Jest', 'Figma', 'Jira']
    },
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Technology',
        period: '2016 - 2020',
        gpa: '3.8/4.0'
      }
    ]
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
        aria-labelledby="resume-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <h2 
              id="resume-title"
              className="text-2xl font-heading font-heading-semibold text-text-primary"
            >
              Resume Preview
            </h2>
            {downloadSuccess && (
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Check" size={16} />
                <span className="text-sm font-body">Downloaded!</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="primary"
              onClick={() => handleDownload('pdf')}
              loading={isDownloading}
              iconName="Download"
              iconPosition="left"
              disabled={isDownloading}
            >
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
              className="p-2"
              aria-label="Close modal"
            />
          </div>
        </div>

        {/* Resume Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-hide">
          <div className="p-8 bg-white text-gray-900 font-body">
            {/* Header */}
            <div className="text-center border-b-2 border-gray-200 pb-6 mb-6">
              <h1 className="text-3xl font-heading font-heading-bold text-gray-900 mb-2">
                {resumeData.personalInfo.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{resumeData.personalInfo.title}</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <Icon name="Mail" size={14} color="#6B7280" />
                  <span>{resumeData.personalInfo.email}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Phone" size={14} color="#6B7280" />
                  <span>{resumeData.personalInfo.phone}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} color="#6B7280" />
                  <span>{resumeData.personalInfo.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Globe" size={14} color="#6B7280" />
                  <span>{resumeData.personalInfo.website}</span>
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-6">
              <h2 className="text-lg font-heading font-heading-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
            </div>

            {/* Experience */}
            <div className="mb-6">
              <h2 className="text-lg font-heading font-heading-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                Professional Experience
              </h2>
              <div className="space-y-4">
                {resumeData.experience.map((job, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-heading font-heading-semibold text-gray-900">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
                      </div>
                      <span className="text-sm text-gray-500 font-mono">{job.period}</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-lg font-heading font-heading-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(resumeData.skills).map(([category, skills]) => (
                  <div key={category}>
                    <h3 className="font-heading font-heading-semibold text-gray-900 mb-2">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h2 className="text-lg font-heading font-heading-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                Education
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading font-heading-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.school}</p>
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-500 font-mono">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-background/50">
          <div className="text-sm text-text-secondary">
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => handleDownload('docx')}
              iconName="FileText"
              disabled={isDownloading}
            >
              Download DOCX
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.print()}
              iconName="Printer"
            >
              Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewModal;