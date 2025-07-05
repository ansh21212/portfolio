import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const ContactFormInterface = ({ isModal = false, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

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

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
    setFocusedField(null);
  };

  const handleInputFocus = (fieldName) => {
    setFocusedField(fieldName);
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
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Auto close modal after success if in modal mode
      if (isModal && onClose) {
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: 'Mail',
      label: 'Email',
      value: 'hello@portfolio.com',
      href: 'mailto:hello@portfolio.com'
    },
    {
      icon: 'Phone',
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: 'MapPin',
      label: 'Location',
      value: 'San Francisco, CA',
      href: null
    }
  ];

  const socialLinks = [
    { icon: 'Github', href: 'https://github.com', label: 'GitHub' },
    { icon: 'Linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: 'Twitter', href: 'https://twitter.com', label: 'Twitter' },
    { icon: 'Instagram', href: 'https://instagram.com', label: 'Instagram' }
  ];

  const FormContent = () => (
    <div className={`${isModal ? 'p-6' : 'space-y-8'}`}>
      {isSubmitted ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Check" size={32} className="text-success" />
          </div>
          <h3 className="text-xl font-heading font-heading-semibold text-text-primary">
            Message Sent Successfully!
          </h3>
          <p className="text-text-secondary font-body">
            Thank you for reaching out. I'll get back to you within 24 hours.
          </p>
        </div>
      ) : (
        <>
          {!isModal && (
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-heading font-heading-bold text-text-primary">
                Let's Work Together
              </h2>
              <p className="text-text-secondary font-body max-w-2xl mx-auto">
                Have a project in mind or want to discuss opportunities? 
                I'd love to hear from you. Send me a message and let's create something amazing together.
              </p>
            </div>
          )}

          <div className={`grid ${isModal ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-8`}>
            {/* Contact Form */}
            <div className="space-y-6">
              {isModal && (
                <h3 className="text-xl font-heading font-heading-semibold text-text-primary">
                  Send a Message
                </h3>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-body font-body-medium text-text-primary">
                      Name *
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus('name')}
                        onBlur={handleInputBlur}
                        placeholder="Your full name"
                        className={`w-full transition-all duration-200 ${
                          focusedField === 'name' ? 'ring-2 ring-primary/20' : ''
                        } ${errors.name ? 'border-error' : ''}`}
                        required
                      />
                      {focusedField === 'name' && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Icon name="User" size={16} className="text-primary" />
                        </div>
                      )}
                    </div>
                    {errors.name && (
                      <p className="text-error text-sm font-body flex items-center space-x-1">
                        <Icon name="AlertCircle" size={14} />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-body font-body-medium text-text-primary">
                      Email *
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus('email')}
                        onBlur={handleInputBlur}
                        placeholder="your.email@example.com"
                        className={`w-full transition-all duration-200 ${
                          focusedField === 'email' ? 'ring-2 ring-primary/20' : ''
                        } ${errors.email ? 'border-error' : ''}`}
                        required
                      />
                      {focusedField === 'email' && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Icon name="Mail" size={16} className="text-primary" />
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="text-error text-sm font-body flex items-center space-x-1">
                        <Icon name="AlertCircle" size={14} />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-body font-body-medium text-text-primary">
                    Subject *
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('subject')}
                      onBlur={handleInputBlur}
                      placeholder="What's this about?"
                      className={`w-full transition-all duration-200 ${
                        focusedField === 'subject' ? 'ring-2 ring-primary/20' : ''
                      } ${errors.subject ? 'border-error' : ''}`}
                      required
                    />
                    {focusedField === 'subject' && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Icon name="MessageSquare" size={16} className="text-primary" />
                      </div>
                    )}
                  </div>
                  {errors.subject && (
                    <p className="text-error text-sm font-body flex items-center space-x-1">
                      <Icon name="AlertCircle" size={14} />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-body font-body-medium text-text-primary">
                    Message *
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus('message')}
                      onBlur={handleInputBlur}
                      placeholder="Tell me about your project or idea..."
                      className={`w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary font-body resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                        focusedField === 'message' ? 'ring-2 ring-primary/20' : ''
                      } ${errors.message ? 'border-error' : ''}`}
                      required
                    />
                  </div>
                  {errors.message && (
                    <p className="text-error text-sm font-body flex items-center space-x-1">
                      <Icon name="AlertCircle" size={14} />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {errors.submit && (
                  <p className="text-error text-sm font-body flex items-center space-x-1">
                    <Icon name="AlertCircle" size={14} />
                    <span>{errors.submit}</span>
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  iconName="Send"
                  iconPosition="right"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            {!isModal && (
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-heading-semibold text-text-primary">
                  Get in Touch
                </h3>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name={info.icon} size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-body font-body-medium text-text-secondary">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-text-primary font-body hover:text-primary transition-colors duration-200"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-text-primary font-body">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-border">
                  <h4 className="text-lg font-heading font-heading-semibold text-text-primary mb-4">
                    Follow Me
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-surface hover:bg-primary/10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                        aria-label={social.label}
                      >
                        <Icon name={social.icon} size={18} className="text-text-secondary hover:text-primary transition-colors duration-200" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md animate-fade-in" onClick={onClose} />
        <div className="relative w-full max-w-2xl max-h-[90vh] bg-surface rounded-xl elevation-modal animate-scale-in overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-heading font-heading-semibold text-text-primary">
              Contact Me
            </h2>
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
              className="p-2"
              aria-label="Close modal"
            />
          </div>
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-hide">
            <FormContent />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <FormContent />
      </div>
    </section>
  );
};

export default ContactFormInterface;