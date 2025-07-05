import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });
  const skillsRef = useRef([]);
  const statsRef = useRef([]);
  const imageRef = useRef(null);

  const stats = [
    { number: '5+', label: 'Years Experience', icon: 'Calendar', color: 'from-blue-500 to-cyan-500' },
    { number: '50+', label: 'Projects Completed', icon: 'FolderOpen', color: 'from-purple-500 to-pink-500' },
    { number: '30+', label: 'Happy Clients', icon: 'Users', color: 'from-green-500 to-teal-500' },
    { number: '15+', label: 'Technologies', icon: 'Code', color: 'from-orange-500 to-red-500' }
  ];

  const skills = [
    { name: 'React & Next.js', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'TypeScript', level: 90, color: 'from-indigo-500 to-purple-500' },
    { name: 'Node.js', level: 85, color: 'from-green-500 to-teal-500' },
    { name: 'UI/UX Design', level: 88, color: 'from-pink-500 to-rose-500' },
    { name: 'Animation & Motion', level: 92, color: 'from-purple-500 to-violet-500' },
    { name: 'Performance Optimization', level: 87, color: 'from-amber-500 to-orange-500' }
  ];

  useEffect(() => {
    if (isInView) {
      // Enhanced image animation
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, 
          { scale: 0.8, opacity: 0, rotation: -5 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)" }
        );
      }

      // Enhanced skills animation with anime.js
      anime({
        targets: skillsRef.current,
        translateY: [50, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 800,
        delay: anime.stagger(100),
        easing: 'easeOutElastic(1, .8)'
      });

      // Enhanced stats animation
      anime({
        targets: statsRef.current,
        translateY: [60, 0],
        opacity: [0, 1],
        rotate: [10, 0],
        duration: 1000,
        delay: anime.stagger(150),
        easing: 'easeOutBack'
      });

      // Animate skill bars
      skillsRef.current.forEach((skill, index) => {
        const progressBar = skill?.querySelector('.progress-bar');
        if (progressBar) {
          gsap.to(progressBar, {
            width: `${skills[index].level}%`,
            duration: 1.5,
            delay: 0.5 + index * 0.1,
            ease: "power2.out"
          });
        }
      });
    }
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden"
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-10 left-10 w-40 h-40 border-2 border-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 border-2 border-purple-500 rotate-45 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-green-500 rounded-lg animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 border-2 border-pink-500 rounded-full animate-pulse"></div>
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-300/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-slate-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600">
              Me
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Passionate about creating exceptional digital experiences through innovative design, 
            cutting-edge technology, and user-centered solutions.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          {/* Enhanced Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Enhanced Decorative Elements */}
              <motion.div
                className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl shadow-2xl"
                animate={{ 
                  rotate: [0, 2, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl"
                animate={{ 
                  rotate: [0, -2, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Enhanced Profile Image */}
              <div className="relative bg-white rounded-3xl p-3 shadow-2xl backdrop-blur-sm border border-white/20">
                <Image
                  ref={imageRef}
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face"
                  alt="John Doe - Frontend Developer"
                  className="w-full h-[400px] object-cover rounded-2xl"
                />
              </div>

              {/* Enhanced Floating Skills */}
              <motion.div
                className="absolute -top-8 -right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Icon name="Code" size={24} className="text-white" />
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20"
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Icon name="Palette" size={24} className="text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <motion.h3 
              className="text-3xl font-bold text-slate-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Creative Developer & Designer
            </motion.h3>
            
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                I'm a passionate frontend developer with over 5 years of experience creating beautiful, 
                functional, and user-centered digital experiences. My expertise spans across modern web 
                technologies, with a special focus on React ecosystem and creative animations.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                When I'm not coding, you'll find me exploring new design trends, contributing to open-source 
                projects, or sharing knowledge with the developer community. I believe in the power of 
                clean code, thoughtful design, and continuous learning.
              </motion.p>
            </div>

            {/* Enhanced Skills Grid */}
            <div className="space-y-6 mt-10">
              <h4 className="text-xl font-semibold text-slate-900 mb-4">Technical Skills</h4>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    ref={el => skillsRef.current[index] = el}
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                      <span className="text-sm font-bold text-slate-900">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`progress-bar h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000`}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={el => statsRef.current[index] = el}
              className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 group hover:scale-105"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                <Icon name={stat.icon} size={28} className="text-white" />
              </div>
              <h4 className="text-4xl font-bold text-slate-900 mb-3">{stat.number}</h4>
              <p className="text-slate-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;