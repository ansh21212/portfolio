import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import AnimatedBackground from './components/AnimatedBackground';
import AnimatedInput from './components/AnimatedInput';
import AnimatedButton from './components/AnimatedButton';
import SuccessAnimation from './components/SuccessAnimation';
import ContactInfo from './components/ContactInfo';
import AnimatedCursor from './components/AnimatedCursor';

const ContactFormInterface = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Navigation items
  const navigationItems = [
    { label: 'Home', path: '/animated-portfolio-homepage', icon: 'Home' },
    { label: 'Projects', path: '/project-detail-modal', icon: 'FolderOpen' },
    { label: 'Skills', path: '/skills-technologies-section', icon: 'Code' },
    { label: 'Contact', path: '/contact-form-interface', icon: 'Mail', active: true },
    { label: 'Resume', path: '/resume-preview-download', icon: 'FileText' }
  ];

  // Form validation
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'subject':
        return value.trim().length < 3 ? 'Subject must be at least 3 characters' : '';
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleInputFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
    setFocusedField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      
      // Hide success animation after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Page animations
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const navigationVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Animated Cursor */}
      <AnimatedCursor />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50"
        variants={navigationVariants}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Icon name="Code" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-slate-50">Portfolio</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    item.active
                      ? 'text-blue-400 bg-blue-400/10' :'text-slate-400 hover:text-slate-50 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span className="font-body font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <motion.main
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            variants={sectionVariants}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-bold text-slate-50 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Let's Create Something
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 block">
                Amazing Together
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-slate-400 font-body max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can bring your vision to life with cutting-edge technology and creative design.
            </motion.p>
          </motion.div>

          {/* Contact Form and Info */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
              variants={sectionVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-slate-50 mb-2">
                  Send a Message
                </h2>
                <p className="text-slate-400 font-body">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <AnimatedInput
                    type="text"
                    name="name"
                    label="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleInputFocus('name')}
                    onBlur={handleInputBlur}
                    error={errors.name}
                    required
                    icon="User"
                    placeholder="Enter your full name"
                  />
                  
                  <AnimatedInput
                    type="email"
                    name="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleInputFocus('email')}
                    onBlur={handleInputBlur}
                    error={errors.email}
                    required
                    icon="Mail"
                    placeholder="your.email@example.com"
                  />
                </div>

                <AnimatedInput
                  type="text"
                  name="subject"
                  label="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('subject')}
                  onBlur={handleInputBlur}
                  error={errors.subject}
                  required
                  icon="MessageSquare"
                  placeholder="What's this about?"
                />

                <AnimatedInput
                  type="textarea"
                  name="message"
                  label="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('message')}
                  onBlur={handleInputBlur}
                  error={errors.message}
                  required
                  rows={6}
                  placeholder="Tell me about your project or idea..."
                />

                {errors.submit && (
                  <motion.div
                    className="flex items-center space-x-2 text-red-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon name="AlertCircle" size={16} />
                    <span className="text-sm font-body">{errors.submit}</span>
                  </motion.div>
                )}

                <AnimatedButton
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  icon="Send"
                  iconPosition="right"
                  className="w-full"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </AnimatedButton>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={sectionVariants}
            >
              <ContactInfo />
            </motion.div>
          </div>

          {/* Additional Features */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={sectionVariants}
          >
            {[
              {
                icon: 'Zap',
                title: 'Quick Response',
                description: 'I typically respond to all inquiries within 24 hours during business days.',
                color: 'text-yellow-400'
              },
              {
                icon: 'Shield',
                title: 'Confidential',
                description: 'Your project details and personal information are kept strictly confidential.',
                color: 'text-green-400'
              },
              {
                icon: 'Heart',
                title: 'Collaborative',
                description: 'I believe in working closely with clients to achieve the best possible results.',
                color: 'text-red-400'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-slate-800/20 rounded-xl border border-slate-700/30"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center ${feature.color}`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon name={feature.icon} size={24} />
                </motion.div>
                <h3 className="text-lg font-heading font-semibold text-slate-50 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 font-body text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.main>

      {/* Success Animation */}
      <SuccessAnimation
        isVisible={showSuccess}
        onComplete={() => setShowSuccess(false)}
      />

      {/* Footer */}
      <motion.footer
        className="relative z-10 bg-slate-800/50 border-t border-slate-700/50 py-8"
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
                <Icon name="Code" size={14} color="white" />
              </div>
              <span className="font-body text-slate-400">
                © {new Date().getFullYear()} Portfolio. All rights reserved.
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-slate-400">
                <Icon name="MapPin" size={16} />
                <span className="font-body text-sm">San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Icon name="Mail" size={16} />
                <span className="font-body text-sm">hello@portfolio.dev</span>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default ContactFormInterface;