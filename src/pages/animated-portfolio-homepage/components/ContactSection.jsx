import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ContactFormInterface from '../../../components/ui/ContactFormInterface';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });
  const [showContactModal, setShowContactModal] = useState(false);

  const contactMethods = [
    {
      icon: 'Mail',
      title: 'Email',
      description: 'Drop me a line anytime',
      value: 'john.doe@example.com',
      href: 'mailto:john.doe@example.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'Phone',
      title: 'Phone',
      description: 'Call me for urgent matters',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: 'MapPin',
      title: 'Location',
      description: 'Based in San Francisco',
      value: 'San Francisco, CA',
      href: null,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: 'Calendar',
      title: 'Schedule',
      description: 'Book a meeting',
      value: 'Available Mon-Fri',
      href: 'https://calendly.com/johndoe',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const socialLinks = [
    { icon: 'Github', href: 'https://github.com/johndoe', label: 'GitHub', color: 'hover:text-gray-900' },
    { icon: 'Linkedin', href: 'https://linkedin.com/in/johndoe', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: 'Twitter', href: 'https://twitter.com/johndoe', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: 'Instagram', href: 'https://instagram.com/johndoe', label: 'Instagram', color: 'hover:text-pink-600' }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-slate-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-slate-400 rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-slate-400 rounded-lg"></div>
        <div className="absolute top-1/4 right-1/3 w-20 h-20 border-2 border-slate-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Let's <span className="text-blue-600">Connect</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you. Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Get in Touch
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                I'm always open to discussing new opportunities, creative projects, 
                or just having a chat about technology and design. Choose your preferred 
                way to reach out!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="group"
                >
                  {method.href ? (
                    <a
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block bg-slate-50 hover:bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                    >
                      <ContactMethodContent method={method} />
                    </a>
                  ) : (
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                      <ContactMethodContent method={method} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8 border-t border-slate-200"
            >
              <h4 className="text-lg font-semibold text-slate-900 mb-4">
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 text-slate-600 ${social.color}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                    aria-label={social.label}
                  >
                    <Icon name={social.icon} size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MessageSquare" size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Send Me a Message
              </h3>
              <p className="text-slate-600 mb-6">
                Ready to start a conversation? Use the contact form to send me a detailed message 
                about your project or inquiry.
              </p>
            </div>

            <div className="space-y-4">
              <Button
                variant="primary"
                size="lg"
                iconName="Send"
                iconPosition="right"
                onClick={() => setShowContactModal(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
              >
                Open Contact Form
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="md"
                  iconName="Mail"
                  onClick={() => window.open('mailto:john.doe@example.com', '_blank')}
                  className="border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white"
                >
                  Quick Email
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  iconName="Calendar"
                  onClick={() => window.open('https://calendly.com/johndoe', '_blank')}
                  className="border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white"
                >
                  Schedule Call
                </Button>
              </div>
            </div>

            {/* Response Time */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
                <Icon name="Clock" size={16} />
                <span>I typically respond within 24 hours</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16"
        >
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              My Location
            </h3>
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="San Francisco Location"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=37.7749,-122.4194&z=12&output=embed"
                className="border-0"
              />
            </div>
            <p className="text-center text-slate-600 mt-4">
              Based in San Francisco, CA - Available for remote work worldwide
            </p>
          </div>
        </motion.div>
      </div>

      {/* Contact Form Modal */}
      {showContactModal && (
        <ContactFormInterface
          isModal={true}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </section>
  );
};

// Helper component for contact method content
const ContactMethodContent = ({ method }) => (
  <>
    <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
      <Icon name={method.icon} size={20} className="text-white" />
    </div>
    <h4 className="font-semibold text-slate-900 mb-1">{method.title}</h4>
    <p className="text-sm text-slate-600 mb-2">{method.description}</p>
    <p className="text-sm font-medium text-slate-800">{method.value}</p>
  </>
);

export default ContactSection;