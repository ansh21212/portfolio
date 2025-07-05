import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: 'Mail',
      label: 'Email',
      value: 'hello@portfolio.dev',
      href: 'mailto:hello@portfolio.dev',
      color: 'text-blue-400'
    },
    {
      icon: 'Phone',
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      color: 'text-green-400'
    },
    {
      icon: 'MapPin',
      label: 'Location',
      value: 'San Francisco, CA',
      href: null,
      color: 'text-purple-400'
    },
    {
      icon: 'Clock',
      label: 'Response Time',
      value: 'Within 24 hours',
      href: null,
      color: 'text-amber-400'
    }
  ];

  const socialLinks = [
    { icon: 'Github', href: 'https://github.com', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: 'Linkedin', href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: 'Twitter', href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: 'Instagram', href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-400' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: { duration: 0.2 }
    }
  };

  const cardVariants = {
    initial: { y: 0 },
    hover: { 
      y: -5,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center lg:text-left">
        <h2 className="text-3xl font-heading font-bold text-slate-50 mb-4">
          Let's Connect
        </h2>
        <p className="text-slate-400 font-body leading-relaxed max-w-md">
          Ready to bring your ideas to life? I'm here to help you create something amazing. Let's discuss your project and make it happen.
        </p>
      </motion.div>

      {/* Contact Details */}
      <motion.div variants={itemVariants} className="space-y-4">
        {contactDetails.map((detail, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
          >
            <motion.div
              className={`w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center ${detail.color}`}
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
            >
              <Icon name={detail.icon} size={20} />
            </motion.div>
            <div className="flex-1">
              <p className="text-sm font-body font-medium text-slate-400 mb-1">
                {detail.label}
              </p>
              {detail.href ? (
                <a
                  href={detail.href}
                  className="text-slate-50 font-body hover:text-blue-400 transition-colors duration-200"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="text-slate-50 font-body">{detail.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Social Links */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-slate-50">
          Follow Me
        </h3>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 bg-slate-800/50 rounded-lg border border-slate-700/50 flex items-center justify-center text-slate-400 transition-all duration-200 ${social.color}`}
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <Icon name={social.icon} size={20} />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Availability Status */}
      <motion.div
        variants={itemVariants}
        className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
      >
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-3 h-3 bg-green-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <div>
            <p className="text-green-400 font-body font-medium">Available for new projects</p>
            <p className="text-slate-400 text-sm font-body">
              Currently accepting freelance and full-time opportunities
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;