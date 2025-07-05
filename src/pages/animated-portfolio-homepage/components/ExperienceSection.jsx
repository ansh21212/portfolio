import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });

  const experiences = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      period: '2022 - Present',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Leading frontend development for enterprise-level applications serving 100K+ users. Architected and implemented scalable React applications with focus on performance optimization and user experience.',
      achievements: [
        'Improved application performance by 40% through code splitting and lazy loading',
        'Led a team of 5 developers in migrating legacy codebase to modern React architecture',
        'Implemented comprehensive testing strategy reducing bugs by 60%',
        'Mentored junior developers and established coding standards across the team'
      ],
      technologies: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'AWS'],
      icon: 'Briefcase'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Digital Innovations Inc.',
      period: '2020 - 2022',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Developed responsive web applications and collaborated with cross-functional teams to deliver high-quality digital products for various clients across different industries.',
      achievements: [
        'Built 15+ responsive websites and web applications from scratch',
        'Collaborated with UX/UI designers to implement pixel-perfect designs',
        'Optimized website loading times by 50% through performance best practices',
        'Integrated third-party APIs and payment gateways for e-commerce solutions'
      ],
      technologies: ['React', 'JavaScript', 'Sass', 'Node.js', 'MongoDB'],
      icon: 'Code'
    },
    {
      id: 3,
      title: 'Junior Web Developer',
      company: 'StartupHub',
      period: '2019 - 2020',
      location: 'Austin, TX',
      type: 'Full-time',
      description: 'Started my professional journey as a junior developer, working on various web projects and learning modern development practices in a fast-paced startup environment.',
      achievements: [
        'Developed and maintained company website and internal tools',
        'Learned modern JavaScript frameworks and development workflows',
        'Contributed to open-source projects and company blog',
        'Participated in code reviews and agile development processes'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'PHP'],
      icon: 'Rocket'
    },
    {
      id: 4,
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      period: '2018 - 2019',
      location: 'Remote',
      type: 'Freelance',
      description: 'Provided web development services to small businesses and startups, creating custom websites and web applications tailored to client needs.',
      achievements: [
        'Completed 20+ freelance projects with 100% client satisfaction',
        'Developed e-commerce solutions for local businesses',
        'Created responsive websites for various industries',
        'Built long-term relationships with repeat clients'
      ],
      technologies: ['WordPress', 'HTML', 'CSS', 'JavaScript', 'PHP'],
      icon: 'User'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="experience" 
      className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden"
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
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My <span className="text-blue-400">Journey</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A timeline of my professional growth and the experiences that shaped my career in web development.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400 transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:flex-row`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-400 rounded-full transform md:-translate-x-1/2 z-10 border-4 border-slate-900">
                  <motion.div
                    className="absolute inset-0 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                {/* Experience Card */}
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                }`}>
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Icon name={exp.icon} size={20} className="text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                          <p className="text-blue-300 font-medium">{exp.company}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400 bg-white/10 px-3 py-1 rounded-full">
                        {exp.type}
                      </span>
                    </div>

                    {/* Period and Location */}
                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="text-white font-semibold mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-300">
                            <Icon name="Check" size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-white font-semibold mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Want to know more about my professional journey?
          </p>
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Connect
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;