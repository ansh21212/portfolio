import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ResumePreviewModal from '../../../components/ui/ResumePreviewModal';

const ResumeSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });
  const [showPreview, setShowPreview] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const resumeHighlights = [
    {
      icon: 'Briefcase',
      title: '5+ Years Experience',
      description: 'Professional frontend development across various industries'
    },
    {
      icon: 'GraduationCap',
      title: 'Computer Science Degree',
      description: 'Bachelor\'s degree with focus on software engineering'
    },
    {
      icon: 'Award',
      title: 'Certified Developer',
      description: 'AWS Certified and React Professional certifications'
    },
    {
      icon: 'Users',
      title: 'Team Leadership',
      description: 'Led development teams and mentored junior developers'
    }
  ];

  const handleDownload = async (format = 'pdf') => {
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="resume" 
      className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 border border-white rotate-45"
          animate={{ rotate: 405 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-lg"></div>
        <div className="absolute top-1/4 right-1/3 w-20 h-20 border border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My <span className="text-blue-400">Resume</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Download my resume to learn more about my professional experience, skills, and achievements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Resume Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Professional Highlights
            </h3>
            
            <div className="space-y-6">
              {resumeHighlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={highlight.icon} size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {highlight.title}
                    </h4>
                    <p className="text-gray-300">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Resume Preview & Download */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            {/* Resume Preview Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
              <motion.div
                className="bg-white rounded-xl p-6 shadow-2xl mb-6 cursor-pointer hover:shadow-3xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowPreview(true)}
              >
                {/* Resume Preview */}
                <div className="aspect-[8.5/11] bg-gradient-to-b from-slate-50 to-white rounded-lg p-4 text-left">
                  <div className="border-b-2 border-slate-200 pb-3 mb-4">
                    <h4 className="text-lg font-bold text-slate-900">John Doe</h4>
                    <p className="text-sm text-slate-600">Full Stack Developer</p>
                  </div>
                  
                  <div className="space-y-3 text-xs text-slate-700">
                    <div>
                      <h5 className="font-semibold text-slate-900 mb-1">Experience</h5>
                      <div className="space-y-1">
                        <p className="font-medium">Senior Frontend Developer</p>
                        <p className="text-slate-500">TechCorp Solutions • 2022-Present</p>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-slate-900 mb-1">Skills</h5>
                      <div className="flex flex-wrap gap-1">
                        {['React', 'TypeScript', 'Node.js'].map((skill) => (
                          <span key={skill} className="bg-slate-200 px-1 py-0.5 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Preview Overlay */}
                <div className="absolute inset-0 bg-blue-600/90 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                  <div className="text-white text-center">
                    <Icon name="Eye" size={32} className="mx-auto mb-2" />
                    <p className="font-semibold">Preview Resume</p>
                  </div>
                </div>
              </motion.div>

              {/* Download Buttons */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white mb-4">
                  Download Resume
                </h4>
                
                {downloadSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center space-x-2 text-green-400 mb-4"
                  >
                    <Icon name="Check" size={20} />
                    <span>Resume downloaded successfully!</span>
                  </motion.div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    iconName="Download"
                    iconPosition="left"
                    onClick={() => handleDownload('pdf')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/25"
                  >
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="FileText"
                    iconPosition="left"
                    onClick={() => handleDownload('docx')}
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    Download DOCX
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="lg"
                  iconName="Eye"
                  iconPosition="left"
                  onClick={() => setShowPreview(true)}
                  className="w-full text-white hover:bg-white/10"
                >
                  Preview Resume
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <p className="text-gray-300 mb-4">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Icon name="FileText" size={16} />
                  <span>2 pages</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Download" size={16} />
                  <span>PDF & DOCX</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={16} />
                  <span>ATS Friendly</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Resume Preview Modal */}
      <ResumePreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </section>
  );
};

export default ResumeSection;